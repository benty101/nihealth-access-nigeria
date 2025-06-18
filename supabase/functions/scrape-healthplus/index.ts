
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ScrapedProduct {
  name: string;
  price: number;
  category: string;
  description?: string;
  brand?: string;
  image_url?: string;
  in_stock: boolean;
  original_url?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!firecrawlApiKey || !supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { action = 'scrape' } = await req.json();

    console.log('Starting Health Plus scraping process...');

    if (action === 'scrape') {
      // Start crawling the Health Plus website
      const crawlResponse = await fetch('https://api.firecrawl.dev/v0/crawl', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${firecrawlApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'https://healthplusnigeria.com/collections/all',
          crawlerOptions: {
            includes: ['healthplusnigeria.com/products/*', 'healthplusnigeria.com/collections/all*'],
            excludes: ['*cart*', '*checkout*', '*account*'],
            maxCrawlPages: 100,
            maxCrawlDepth: 3
          },
          pageOptions: {
            onlyMainContent: true,
            includeHtml: false,
            screenshot: false
          }
        })
      });

      const crawlData = await crawlResponse.json();
      
      if (!crawlData.success) {
        throw new Error(`Crawl failed: ${crawlData.error}`);
      }

      console.log('Crawl started with job ID:', crawlData.jobId);
      
      return new Response(JSON.stringify({ 
        success: true, 
        jobId: crawlData.jobId,
        message: 'Scraping started. Check status with the job ID.'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'status') {
      const { jobId } = await req.json();
      
      const statusResponse = await fetch(`https://api.firecrawl.dev/v0/crawl/status/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${firecrawlApiKey}`,
        },
      });

      const statusData = await statusResponse.json();
      console.log('Crawl status:', statusData.status, 'Completed:', statusData.completed, 'Total:', statusData.total);

      if (statusData.status === 'completed' && statusData.data) {
        console.log('Processing scraped data...');
        const products = await processScrapedData(statusData.data);
        
        if (products.length > 0) {
          console.log(`Importing ${products.length} products to database...`);
          const { error } = await supabase
            .from('medications')
            .insert(products);

          if (error) {
            console.error('Database insert error:', error);
            throw error;
          }

          console.log(`Successfully imported ${products.length} products`);
        }
      }

      return new Response(JSON.stringify(statusData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in scrape-healthplus function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function processScrapedData(crawlData: any[]): Promise<ScrapedProduct[]> {
  const products: ScrapedProduct[] = [];
  
  for (const page of crawlData) {
    if (!page.markdown || !page.metadata?.sourceURL?.includes('/products/')) {
      continue;
    }

    try {
      const product = extractProductInfo(page.markdown, page.metadata);
      if (product) {
        products.push(product);
      }
    } catch (error) {
      console.error('Error processing page:', page.metadata?.sourceURL, error);
    }
  }

  return products;
}

function extractProductInfo(markdown: string, metadata: any): ScrapedProduct | null {
  try {
    const lines = markdown.split('\n').filter(line => line.trim());
    let name = '';
    let price = 0;
    let description = '';
    let category = 'General';
    let brand = '';
    let inStock = true;

    // Extract title from metadata or first heading
    if (metadata?.title) {
      name = metadata.title.replace(' – Health Plus Nigeria', '').trim();
    } else {
      const titleLine = lines.find(line => line.startsWith('# '));
      if (titleLine) {
        name = titleLine.replace('# ', '').trim();
      }
    }

    if (!name) return null;

    // Extract price - look for Nigerian Naira patterns
    const pricePatterns = [
      /₦[\d,]+\.?\d*/g,
      /NGN[\s]*[\d,]+\.?\d*/g,
      /N[\s]*[\d,]+\.?\d*/g
    ];

    for (const pattern of pricePatterns) {
      const priceMatch = markdown.match(pattern);
      if (priceMatch) {
        const priceStr = priceMatch[0].replace(/[₦NGN,\s]/g, '');
        price = parseFloat(priceStr) || 0;
        break;
      }
    }

    // Extract description
    const descLines = lines.filter(line => 
      !line.startsWith('#') && 
      !line.includes('₦') && 
      line.length > 20 &&
      !line.toLowerCase().includes('add to cart')
    );
    
    if (descLines.length > 0) {
      description = descLines.slice(0, 3).join(' ').substring(0, 500);
    }

    // Determine category from product name or description
    const categoryKeywords = {
      'Pain Relief': ['paracetamol', 'ibuprofen', 'aspirin', 'pain', 'relief'],
      'Antibiotics': ['antibiotic', 'amoxicillin', 'penicillin', 'infection'],
      'Vitamins': ['vitamin', 'multivitamin', 'supplement', 'mineral'],
      'Cardiovascular': ['blood pressure', 'heart', 'cardiac', 'hypertension'],
      'Diabetes': ['diabetes', 'blood sugar', 'glucose', 'insulin'],
      'Skin Care': ['cream', 'lotion', 'ointment', 'skin', 'dermal'],
      'Respiratory': ['cough', 'cold', 'respiratory', 'lung', 'breathing'],
      'Digestive': ['stomach', 'digestive', 'antacid', 'diarrhea']
    };

    const searchText = (name + ' ' + description).toLowerCase();
    for (const [cat, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => searchText.includes(keyword))) {
        category = cat;
        break;
      }
    }

    // Extract brand if mentioned
    const brandKeywords = ['GSK', 'Pfizer', 'Merck', 'Roche', 'Novartis', 'Health Plus'];
    for (const brandKeyword of brandKeywords) {
      if (searchText.includes(brandKeyword.toLowerCase())) {
        brand = brandKeyword;
        break;
      }
    }

    // Check stock status
    if (markdown.toLowerCase().includes('out of stock') || 
        markdown.toLowerCase().includes('sold out')) {
      inStock = false;
    }

    return {
      name: name.substring(0, 255),
      price: price || 1000, // Default price if not found
      category,
      description: description || `${name} - Available at Health Plus Nigeria`,
      brand: brand || 'Health Plus',
      in_stock: inStock,
      original_url: metadata?.sourceURL
    };

  } catch (error) {
    console.error('Error extracting product info:', error);
    return null;
  }
}
