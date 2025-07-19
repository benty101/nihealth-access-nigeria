import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Brain, TestTube } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const MedicalAITesting = () => {
  const [prompt, setPrompt] = useState('');
  const [context, setContext] = useState('');
  const [type, setType] = useState('general');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const testExamples = {
    consultation_summary: "Patient presented with chest pain for 2 days. Physical exam reveals normal heart sounds, no murmurs. ECG shows normal sinus rhythm. Vital signs stable. Patient reports stress at work lately. No family history of heart disease.",
    
    medical_record_analysis: "Patient: 45-year-old male with diabetes type 2, hypertension, BMI 32. Recent HbA1c: 8.2%. Blood pressure: 145/90. Medications: Metformin 1000mg BID, Lisinopril 10mg daily. Last visit: 3 months ago.",
    
    clinical_decision_support: "45-year-old female presents with fatigue, weight gain, cold intolerance, and dry skin for 6 months. TSH: 12.5 mIU/L (normal 0.4-4.0). Free T4: 0.8 ng/dL (normal 0.8-1.8). What are the next steps?",
    
    patient_education: "Explain what diabetes type 2 is and how to manage it with diet and exercise"
  };

  const handleTest = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt to test');
      return;
    }

    setLoading(true);
    setResponse('');

    try {
      console.log('Testing medical AI with:', { prompt, context, type });
      
      const { data, error } = await supabase.functions.invoke('medical-ai-assistant', {
        body: {
          prompt: prompt.trim(),
          context: context.trim() || undefined,
          type
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Medical AI response:', data);
      setResponse(data.response || 'No response received');
      toast.success('Medical AI response generated successfully');
      
    } catch (error) {
      console.error('Error testing medical AI:', error);
      toast.error(`Error: ${error.message}`);
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadExample = (exampleType: string) => {
    setType(exampleType);
    setPrompt(testExamples[exampleType as keyof typeof testExamples]);
    setContext('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Medical AI Assistant Testing
          </CardTitle>
          <CardDescription>
            Test the MedGemma-4B medical AI integration with different types of medical queries
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">AI Assistant Type</label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Medical Query</SelectItem>
                <SelectItem value="consultation_summary">Consultation Summary</SelectItem>
                <SelectItem value="medical_record_analysis">Medical Record Analysis</SelectItem>
                <SelectItem value="clinical_decision_support">Clinical Decision Support</SelectItem>
                <SelectItem value="patient_education">Patient Education</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quick Examples */}
          <div>
            <label className="block text-sm font-medium mb-2">Quick Test Examples</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(testExamples).map((exampleType) => (
                <Button
                  key={exampleType}
                  variant="outline"
                  size="sm"
                  onClick={() => loadExample(exampleType)}
                  className="text-xs"
                >
                  {exampleType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Button>
              ))}
            </div>
          </div>

          {/* Prompt Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Medical Prompt</label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your medical query, patient case, or consultation notes..."
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Context Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Additional Context (Optional)</label>
            <Textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Provide additional context like patient history, symptoms, etc..."
              rows={2}
              className="resize-none"
            />
          </div>

          {/* Test Button */}
          <Button 
            onClick={handleTest} 
            disabled={loading || !prompt.trim()}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing with MedGemma-4B...
              </>
            ) : (
              <>
                <TestTube className="mr-2 h-4 w-4" />
                Test Medical AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Response Display */}
      {response && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              AI Response
              <Badge variant="secondary">MedGemma-4B</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md">
              <pre className="whitespace-pre-wrap text-sm font-mono">
                {response}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Testing Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Testing Notes</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• The model may take 15-30 seconds to respond on first use as it loads</p>
          <p>• Each type optimizes the prompt for specific medical use cases</p>
          <p>• Responses include medical disclaimers for safety</p>
          <p>• Check the Edge Function logs for detailed debugging information</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalAITesting;