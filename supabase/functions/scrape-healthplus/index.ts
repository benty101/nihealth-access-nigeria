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

    console.log('Environment check:', {
      hasFirecrawlKey: !!firecrawlApiKey,
      hasSupabaseUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
      firecrawlKeyLength: firecrawlApiKey?.length || 0
    });

    if (!firecrawlApiKey || !supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { action = 'scrape' } = await req.json();

    console.log('Starting Health Plus scraping process...');

    if (action === 'scrape') {
      console.log('Making crawl request to Firecrawl API...');
      
      // Test with a simple scrape first to validate the API key
      const testResponse = await fetch('https://api.firecrawl.dev/v0/scrape', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${firecrawlApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'https://healthplusnigeria.com/collections/all',
          pageOptions: {
            onlyMainContent: true
          }
        })
      });

      console.log('Test scrape response status:', testResponse.status);
      
      if (!testResponse.ok) {
        const errorText = await testResponse.text();
        console.error('Test scrape failed:', errorText);
        
        try {
          const errorJson = JSON.parse(errorText);
          console.error('Parsed error:', errorJson);
          throw new Error(`Firecrawl API error: ${errorJson.error || errorJson.message || 'Invalid API key or service unavailable'}`);
        } catch (parseError) {
          throw new Error(`Firecrawl API error (${testResponse.status}): ${errorText || 'Service unavailable'}`);
        }
      }

      const testData = await testResponse.json();
      console.log('Test scrape successful, starting full crawl...');
      
      // Now start the full crawl
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
            excludes: ['healthplusnigeria.com/cart', 'healthplusnigeria.com/checkout', 'healthplusnigeria.com/account'],
            maxCrawlPages: 50,
            maxCrawlDepth: 2
          },
          pageOptions: {
            onlyMainContent: true,
            includeHtml: false,
            screenshot: false
          }
        })
      });

      console.log('Crawl response status:', crawlResponse.status);
      
      if (!crawlResponse.ok) {
        const errorText = await crawlResponse.text();
        console.error('Firecrawl crawl API error response:', errorText);
        
        try {
          const errorJson = JSON.parse(errorText);
          console.error('Parsed crawl error:', errorJson);
          throw new Error(`Firecrawl crawl error: ${errorJson.error || errorJson.message || 'Crawl request failed'}`);
        } catch (parseError) {
          throw new Error(`Firecrawl crawl error (${crawlResponse.status}): ${errorText || 'Crawl service unavailable'}`);
        }
      }

      const crawlData = await crawlResponse.json();
      console.log('Crawl response data:', JSON.stringify(crawlData, null, 2));
      
      // Check if we have a jobId - this indicates the crawl was accepted
      if (crawlData.jobId) {
        console.log('Crawl started with job ID:', crawlData.jobId);
        
        return new Response(JSON.stringify({ 
          success: true, 
          jobId: crawlData.jobId,
          message: 'Scraping started. Check status with the job ID.'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } else {
        // Log the full response to understand what Firecrawl is returning
        console.error('No jobId in response. Full response:', crawlData);
        throw new Error(`Crawl request failed: ${crawlData.error || crawlData.message || 'No job ID returned'}`);
      }
    }

    if (action === 'status') {
      const { jobId } = await req.json();
      
      if (!jobId) {
        throw new Error('Job ID is required for status check');
      }
      
      const statusResponse = await fetch(`https://api.firecrawl.dev/v0/crawl/status/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${firecrawlApiKey}`,
        },
      });

      if (!statusResponse.ok) {
        const errorText = await statusResponse.text();
        console.error('Status check error:', errorText);
        throw new Error(`Status check failed (${statusResponse.status}): ${errorText}`);
      }

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
      error: error.message || 'Unknown error occurred',
      success: false,
      details: error.toString()
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
