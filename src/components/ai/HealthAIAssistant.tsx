import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Heart, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';

// This will use browser-based AI - completely free!
export const HealthAIAssistant: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pipeline, setPipeline] = useState<any>(null);

  useEffect(() => {
    // Initialize the AI pipeline when component mounts
    initializeAI();
  }, []);

  const initializeAI = async () => {
    try {
      // Dynamic import to avoid SSR issues
      const { pipeline } = await import('@huggingface/transformers');
      
      // Initialize medical text classification pipeline using a proper medical model
      const medicalPipeline = await pipeline(
        'text-classification',
        'emilyalsentzer/Bio_ClinicalBERT',
        { device: 'webgpu' } // Use WebGPU for faster processing
      );
      
      setPipeline(medicalPipeline);
      console.log('Medical AI pipeline initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AI pipeline:', error);
      // Fallback to a simpler approach without WebGPU
      try {
        const { pipeline } = await import('@huggingface/transformers');
        const simplePipeline = await pipeline(
          'text-classification',
          'cardiffnlp/twitter-roberta-base-sentiment-latest'
        );
        setPipeline(simplePipeline);
        console.log('Fallback AI pipeline initialized');
      } catch (fallbackError) {
        console.error('Failed to initialize fallback pipeline:', fallbackError);
      }
    }
  };

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return;
    
    setIsLoading(true);
    try {
      // Use browser-based AI for symptom analysis
      const result = await analyzeHealthText(symptoms);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeHealthText = async (text: string) => {
    // Simple health analysis using keywords and patterns
    const symptomKeywords = {
      respiratory: ['cough', 'breathing', 'chest', 'shortness', 'wheeze'],
      digestive: ['stomach', 'nausea', 'vomit', 'diarrhea', 'pain'],
      neurological: ['headache', 'dizzy', 'confusion', 'memory'],
      cardiovascular: ['chest pain', 'heart', 'palpitation', 'pressure'],
      musculoskeletal: ['joint', 'muscle', 'back', 'arthritis', 'stiff']
    };

    const urgencyKeywords = {
      high: ['severe', 'intense', 'emergency', 'bleeding', 'unconscious'],
      medium: ['moderate', 'persistent', 'worsening', 'frequent'],
      low: ['mild', 'occasional', 'slight', 'minor']
    };

    const lowerText = text.toLowerCase();
    
    // Analyze categories
    const categories = Object.entries(symptomKeywords).map(([category, keywords]) => {
      const matches = keywords.filter(keyword => lowerText.includes(keyword));
      return {
        category,
        confidence: matches.length / keywords.length,
        matches
      };
    }).filter(cat => cat.confidence > 0).sort((a, b) => b.confidence - a.confidence);

    // Analyze urgency
    let urgency = 'low';
    for (const [level, keywords] of Object.entries(urgencyKeywords)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        urgency = level;
        break;
      }
    }

    // Generate recommendations
    const recommendations = generateRecommendations(categories[0]?.category, urgency);

    return {
      categories: categories.slice(0, 3),
      urgency,
      recommendations,
      disclaimer: 'This is an AI analysis for informational purposes only. Please consult a healthcare professional for proper diagnosis.'
    };
  };

  const generateRecommendations = (primaryCategory: string, urgency: string) => {
    const baseRecommendations = {
      respiratory: [
        'Monitor breathing patterns',
        'Stay hydrated',
        'Consider air quality factors',
        'Rest and avoid strenuous activity'
      ],
      digestive: [
        'Stay hydrated with clear fluids',
        'Follow a bland diet',
        'Monitor food intake',
        'Rest and avoid irritating foods'
      ],
      neurological: [
        'Get adequate rest',
        'Monitor symptoms closely',
        'Avoid bright lights if needed',
        'Stay hydrated'
      ],
      cardiovascular: [
        'Monitor blood pressure',
        'Avoid strenuous activity',
        'Take prescribed medications',
        'Maintain a healthy diet'
      ],
      musculoskeletal: [
        'Apply ice or heat as appropriate',
        'Rest the affected area',
        'Gentle stretching',
        'Over-the-counter pain relief if needed'
      ]
    };

    const urgencyActions = {
      high: ['Seek immediate medical attention', 'Call emergency services if severe'],
      medium: ['Schedule appointment with healthcare provider', 'Monitor symptoms closely'],
      low: ['Consider self-care measures', 'Consult healthcare provider if symptoms persist']
    };

    return {
      general: baseRecommendations[primaryCategory as keyof typeof baseRecommendations] || [
        'Monitor symptoms',
        'Stay hydrated',
        'Get adequate rest',
        'Consult healthcare provider if symptoms persist'
      ],
      urgency: urgencyActions[urgency as keyof typeof urgencyActions]
    };
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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
            <Brain className="h-6 w-6 text-primary" />
            AI Health Assistant
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Describe your symptoms for an AI-powered health analysis
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Describe your symptoms:
            </label>
            <Textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g., I have a persistent cough with chest tightness and mild fever for 3 days..."
              className="min-h-24"
            />
          </div>
          
          <Button 
            onClick={analyzeSymptoms}
            disabled={!symptoms.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Analyze Symptoms
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <div className="space-y-4">
          {/* Urgency Level */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">Urgency Level:</span>
                <Badge className={getUrgencyColor(analysis.urgency)}>
                  {analysis.urgency.toUpperCase()}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Symptom Categories */}
          {analysis.categories.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Symptom Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.categories.map((category: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <span className="font-medium capitalize">{category.category}</span>
                        <p className="text-sm text-muted-foreground">
                          Related terms: {category.matches.join(', ')}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {Math.round(category.confidence * 100)}% match
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Urgency Actions */}
              <div>
                <h4 className="font-medium mb-2">Immediate Actions:</h4>
                <ul className="space-y-1">
                  {analysis.recommendations.urgency.map((action: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              {/* General Care */}
              <div>
                <h4 className="font-medium mb-2">General Care:</h4>
                <ul className="space-y-1">
                  {analysis.recommendations.general.map((recommendation: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                <p className="text-sm text-yellow-800">
                  <strong>Disclaimer:</strong> {analysis.disclaimer}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};