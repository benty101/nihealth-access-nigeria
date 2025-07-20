import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Heart, AlertTriangle, CheckCircle, Thermometer, Activity } from 'lucide-react';

interface SymptomAnalysis {
  urgency: 'low' | 'medium' | 'high';
  category: string;
  recommendations: string[];
  nextSteps: string[];
  disclaimer: string;
}

export const SimpleSymptomChecker: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simple rule-based symptom analysis for Nigerian health context
  const analyzeSymptoms = (symptomText: string): SymptomAnalysis => {
    const text = symptomText.toLowerCase();
    
    // High urgency symptoms
    if (text.includes('chest pain') || text.includes('difficulty breathing') || 
        text.includes('severe headache') || text.includes('blood') ||
        text.includes('unconscious') || text.includes('seizure') ||
        text.includes('severe abdominal pain')) {
      return {
        urgency: 'high',
        category: 'Emergency Care Needed',
        recommendations: [
          'Seek immediate medical attention',
          'Go to the nearest hospital emergency room',
          'Call for emergency medical services if available'
        ],
        nextSteps: [
          'Do not delay - get medical help now',
          'Have someone accompany you if possible',
          'Bring any medications you are taking'
        ],
        disclaimer: 'This appears to be a medical emergency. Seek immediate professional medical care.'
      };
    }

    // Medium urgency - common tropical diseases
    if (text.includes('fever') && (text.includes('headache') || text.includes('body ache') || text.includes('joint pain'))) {
      return {
        urgency: 'medium',
        category: 'Possible Tropical Disease',
        recommendations: [
          'Visit a healthcare facility within 24 hours',
          'Get tested for malaria, typhoid, or dengue',
          'Stay hydrated and rest',
          'Monitor temperature regularly'
        ],
        nextSteps: [
          'Book appointment with a doctor',
          'Prepare list of all symptoms',
          'Note when symptoms started'
        ],
        disclaimer: 'Fever with other symptoms in Nigeria often indicates tropical diseases that need professional diagnosis.'
      };
    }

    // Medium urgency - gastrointestinal
    if (text.includes('diarrhea') || text.includes('vomiting') || text.includes('stomach pain')) {
      return {
        urgency: 'medium',
        category: 'Gastrointestinal Issue',
        recommendations: [
          'Stay well hydrated with ORS (oral rehydration solution)',
          'Avoid solid foods temporarily',
          'See a doctor if symptoms persist beyond 48 hours',
          'Practice good hygiene to prevent spread'
        ],
        nextSteps: [
          'Monitor for dehydration signs',
          'Consider stool test if symptoms persist',
          'Consult pharmacist for ORS'
        ],
        disclaimer: 'Gastrointestinal symptoms can lead to dehydration. Seek medical care if severe or persistent.'
      };
    }

    // Respiratory symptoms
    if (text.includes('cough') || text.includes('cold') || text.includes('sore throat')) {
      return {
        urgency: 'low',
        category: 'Respiratory Symptoms',
        recommendations: [
          'Rest and get adequate sleep',
          'Increase fluid intake',
          'Use honey for cough relief',
          'Avoid cold drinks and air conditioning'
        ],
        nextSteps: [
          'Monitor symptoms for 3-5 days',
          'See doctor if fever develops',
          'Consider pharmacy consultation for symptom relief'
        ],
        disclaimer: 'Most respiratory symptoms resolve on their own. See a doctor if symptoms worsen or persist.'
      };
    }

    // Default analysis
    return {
      urgency: 'low',
      category: 'General Health Concern',
      recommendations: [
        'Monitor symptoms closely',
        'Maintain good hygiene',
        'Get adequate rest and nutrition',
        'Consider consulting a healthcare provider'
      ],
      nextSteps: [
        'Keep a symptom diary',
        'Note any changes or new symptoms',
        'Consult a doctor if symptoms worsen'
      ],
      disclaimer: 'For any health concerns, professional medical advice is recommended.'
    };
  };

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;

    setIsLoading(true);
    
    // Simulate analysis delay for better UX
    setTimeout(() => {
      const result = analyzeSymptoms(symptoms);
      setAnalysis(result);
      setIsLoading(false);
    }, 1500);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return <AlertTriangle className="h-5 w-5" />;
      case 'medium': return <Thermometer className="h-5 w-5" />;
      case 'low': return <CheckCircle className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Nduka Symptom Checker
            <Badge variant="secondary" className="ml-2">
              Free • Rule-Based Analysis
            </Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Get preliminary health guidance based on your symptoms. 
            <strong className="text-primary"> This is not a substitute for professional medical diagnosis.</strong>
          </p>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Describe Your Symptoms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Describe your symptoms in detail... (e.g., fever, headache, cough, stomach pain)"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-[120px]"
            />
            
            <Button 
              onClick={handleAnalyze}
              disabled={!symptoms.trim() || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Activity className="mr-2 h-4 w-4 animate-spin" />
                  Nduka is analyzing...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Ask Nduka
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {analysis && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getUrgencyIcon(analysis.urgency)}
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`p-3 rounded-lg border ${getUrgencyColor(analysis.urgency)}`}>
                <div className="flex items-center gap-2 mb-2">
                  {getUrgencyIcon(analysis.urgency)}
                  <span className="font-medium text-sm">
                    {analysis.urgency.toUpperCase()} PRIORITY
                  </span>
                </div>
                <p className="text-sm font-medium">{analysis.category}</p>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Recommendations:</h4>
                <ul className="text-sm space-y-1">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Next Steps:</h4>
                <ul className="text-sm space-y-1">
                  {analysis.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Heart className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded p-3">
                <p className="text-xs text-amber-800">
                  <strong>Disclaimer:</strong> {analysis.disclaimer}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {!analysis && (
        <Card>
          <CardContent className="py-8">
            <div className="text-center space-y-2">
              <Brain className="h-12 w-12 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-medium">Ready to Help</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Describe your symptoms and get preliminary health guidance tailored for Nigerian healthcare context.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};