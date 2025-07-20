import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Book, ExternalLink, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MedicalInfo {
  title: string;
  summary: string;
  category: string;
  source: string;
  url?: string;
  severity?: 'low' | 'medium' | 'high';
}

export const MedicalKnowledgeSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MedicalInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const searchMedicalInfo = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      // Use multiple free medical APIs and databases
      const [meddraResults, pubmedResults, localResults] = await Promise.allSettled([
        searchMeddra(query),
        searchPubMed(query),
        searchLocalKnowledge(query)
      ]);

      const allResults: MedicalInfo[] = [];

      // Combine results from all sources
      if (meddraResults.status === 'fulfilled') {
        allResults.push(...meddraResults.value);
      }
      
      if (pubmedResults.status === 'fulfilled') {
        allResults.push(...pubmedResults.value);
      }
      
      if (localResults.status === 'fulfilled') {
        allResults.push(...localResults.value);
      }

      setResults(allResults);
      
      if (allResults.length === 0) {
        toast({
          title: "No results found",
          description: "Try different keywords or check spelling",
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search error",
        description: "Failed to search medical information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Free PubMed API search
  const searchPubMed = async (searchQuery: string): Promise<MedicalInfo[]> => {
    try {
      // PubMed's free eUtils API
      const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(searchQuery)}&retmax=5&retmode=json`;
      
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();
      
      if (!searchData.esearchresult?.idlist?.length) {
        return [];
      }

      // Get article details
      const ids = searchData.esearchresult.idlist.slice(0, 3);
      const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json`;
      
      const summaryResponse = await fetch(summaryUrl);
      const summaryData = await summaryResponse.json();

      return ids.map((id: string) => {
        const article = summaryData.result[id];
        return {
          title: article?.title || 'Medical Research Article',
          summary: `Research article from ${article?.source || 'PubMed'} - ${article?.pubdate || 'Recent'}`,
          category: 'Research',
          source: 'PubMed',
          url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
          severity: 'low' as const
        };
      });
    } catch (error) {
      console.error('PubMed search error:', error);
      return [];
    }
  };

  // Free medical terminology search
  const searchMeddra = async (searchQuery: string): Promise<MedicalInfo[]> => {
    try {
      // This would use a free medical terminology API
      // For now, using a mock implementation with common medical terms
      const medicalTerms = [
        {
          term: 'hypertension',
          definition: 'High blood pressure, often called the "silent killer"',
          category: 'Cardiovascular',
          severity: 'medium' as const
        },
        {
          term: 'diabetes',
          definition: 'A group of metabolic disorders characterized by high blood sugar levels',
          category: 'Endocrine',
          severity: 'medium' as const
        },
        {
          term: 'pneumonia',
          definition: 'Infection that inflames air sacs in one or both lungs',
          category: 'Respiratory',
          severity: 'high' as const
        },
        {
          term: 'malaria',
          definition: 'Mosquito-borne infectious disease common in Nigeria',
          category: 'Infectious Disease',
          severity: 'high' as const
        },
        {
          term: 'typhoid',
          definition: 'Bacterial infection caused by Salmonella typhi',
          category: 'Infectious Disease',
          severity: 'medium' as const
        }
      ];

      const matches = medicalTerms.filter(term => 
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return matches.map(match => ({
        title: match.term.charAt(0).toUpperCase() + match.term.slice(1),
        summary: match.definition,
        category: match.category,
        source: 'Medical Database',
        severity: match.severity
      }));
    } catch (error) {
      console.error('Medical terminology search error:', error);
      return [];
    }
  };

  // Local medical knowledge base
  const searchLocalKnowledge = async (searchQuery: string): Promise<MedicalInfo[]> => {
    const nigerianHealthInfo = [
      {
        title: 'Malaria Prevention',
        summary: 'Use insecticide-treated nets, clear stagnant water, and take preventive medication as prescribed.',
        category: 'Prevention',
        source: 'Nigerian Health Guidelines',
        severity: 'high' as const,
        keywords: ['malaria', 'mosquito', 'fever', 'prevention']
      },
      {
        title: 'Typhoid Fever Management',
        summary: 'Practice good hygiene, drink clean water, and seek immediate medical attention for persistent fever.',
        category: 'Infectious Disease',
        source: 'NCDC Guidelines',
        severity: 'medium' as const,
        keywords: ['typhoid', 'fever', 'hygiene', 'water']
      },
      {
        title: 'Hypertension Control',
        summary: 'Monitor blood pressure regularly, reduce salt intake, exercise, and take prescribed medications.',
        category: 'Cardiovascular',
        source: 'Nigerian Heart Foundation',
        severity: 'medium' as const,
        keywords: ['hypertension', 'blood pressure', 'heart', 'salt']
      },
      {
        title: 'Diabetes Management',
        summary: 'Monitor blood sugar, maintain healthy diet, exercise regularly, and follow medication schedule.',
        category: 'Endocrine',
        source: 'Diabetes Association of Nigeria',
        severity: 'medium' as const,
        keywords: ['diabetes', 'blood sugar', 'diet', 'exercise']
      }
    ];

    const matches = nigerianHealthInfo.filter(info =>
      info.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
        searchQuery.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    return matches.map(match => ({
      title: match.title,
      summary: match.summary,
      category: match.category,
      source: match.source,
      severity: match.severity
    }));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-6 w-6 text-primary" />
            Medical Knowledge Search
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Search medical information from multiple free databases
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for conditions, symptoms, treatments..."
              onKeyPress={(e) => e.key === 'Enter' && searchMedicalInfo()}
            />
            <Button 
              onClick={searchMedicalInfo}
              disabled={!query.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Search Results ({results.length})
          </h3>
          
          {results.map((result, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-lg">{result.title}</h4>
                    <div className="flex gap-2">
                      <Badge variant="outline">{result.category}</Badge>
                      {result.severity && (
                        <Badge className={getSeverityColor(result.severity)}>
                          {result.severity}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">{result.summary}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Source: {result.source}
                    </span>
                    {result.url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={result.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Read More
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};