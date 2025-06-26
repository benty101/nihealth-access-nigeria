
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  CheckCircle2, 
  AlertTriangle,
  Users,
  Eye,
  Lock,
  Scale,
  BookOpen,
  Award
} from 'lucide-react';
import { mlAnalyticsService } from '@/services/MLAnalyticsService';
import { useToast } from '@/hooks/use-toast';

const EthicalGuidelinesPanel = () => {
  const [guidelines, setGuidelines] = useState<any>(null);
  const [completedCheckpoints, setCompletedCheckpoints] = useState<string[]>([]);
  const [complianceResult, setComplianceResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadGuidelines();
  }, []);

  const loadGuidelines = async () => {
    try {
      const data = await mlAnalyticsService.getEthicalGuidelines();
      setGuidelines(data);
      
      // Load saved checkpoints from localStorage
      const saved = localStorage.getItem('ml-ethics-checkpoints');
      if (saved) {
        setCompletedCheckpoints(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load ethical guidelines:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCheckpoint = (checkpoint: string) => {
    const updated = completedCheckpoints.includes(checkpoint)
      ? completedCheckpoints.filter(cp => cp !== checkpoint)
      : [...completedCheckpoints, checkpoint];
    
    setCompletedCheckpoints(updated);
    localStorage.setItem('ml-ethics-checkpoints', JSON.stringify(updated));
  };

  const validateCompliance = async () => {
    try {
      const result = await mlAnalyticsService.validateEthicalCompliance(completedCheckpoints);
      setComplianceResult(result);
      
      if (result.passed) {
        toast({
          title: "Compliance Validated",
          description: `Ethical compliance score: ${result.score.toFixed(1)}%`,
        });
      } else {
        toast({
          title: "Compliance Issues",
          description: `Missing ${result.missing.length} required checkpoints`,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Validation Failed",
        description: "Failed to validate ethical compliance",
        variant: "destructive"
      });
    }
  };

  const getCategoryIcon = (title: string) => {
    if (title.includes('Privacy')) return <Lock className="h-5 w-5 text-blue-600" />;
    if (title.includes('Bias')) return <Scale className="h-5 w-5 text-orange-600" />;
    if (title.includes('Transparency')) return <Eye className="h-5 w-5 text-green-600" />;
    return <Shield className="h-5 w-5 text-gray-600" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  const completionPercentage = guidelines ? 
    (completedCheckpoints.length / guidelines.categories.reduce((acc: number, cat: any) => acc + cat.checkpoints.length, 0)) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Ethical Guidelines & Compliance</h2>
          <p className="text-gray-600">Ensure responsible AI development in healthcare</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-gray-600">Completion</div>
            <div className="flex items-center gap-2">
              <Progress value={completionPercentage} className="w-32" />
              <span className="text-sm font-medium">{completionPercentage.toFixed(0)}%</span>
            </div>
          </div>
          
          <Button onClick={validateCompliance} className="bg-green-600 hover:bg-green-700">
            <Award className="h-4 w-4 mr-2" />
            Validate Compliance
          </Button>
        </div>
      </div>

      {/* Compliance Status */}
      {complianceResult && (
        <Alert className={complianceResult.passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          {complianceResult.passed ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription className={complianceResult.passed ? 'text-green-800' : 'text-red-800'}>
            {complianceResult.passed ? (
              `Ethical compliance validated! Score: ${complianceResult.score.toFixed(1)}%`
            ) : (
              `Compliance incomplete. Missing ${complianceResult.missing.length} checkpoints: ${complianceResult.missing.slice(0, 2).join(', ')}${complianceResult.missing.length > 2 ? '...' : ''}`
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Guidelines Categories */}
      <div className="space-y-6">
        {guidelines?.categories.map((category: any, categoryIndex: number) => (
          <Card key={categoryIndex} className="border-l-4 border-l-teal-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {getCategoryIcon(category.title)}
                {category.title}
                <Badge variant="outline">
                  {category.checkpoints.filter((cp: string) => completedCheckpoints.includes(cp)).length}/{category.checkpoints.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Guidelines */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Guidelines
                </h4>
                <ul className="space-y-2">
                  {category.guidelines.map((guideline: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Checkpoints */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Compliance Checkpoints
                </h4>
                <div className="space-y-3">
                  {category.checkpoints.map((checkpoint: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border bg-gray-50">
                      <Checkbox
                        id={`checkpoint-${categoryIndex}-${index}`}
                        checked={completedCheckpoints.includes(checkpoint)}
                        onCheckedChange={() => toggleCheckpoint(checkpoint)}
                        className="mt-0.5"
                      />
                      <label 
                        htmlFor={`checkpoint-${categoryIndex}-${index}`}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {checkpoint}
                      </label>
                      {completedCheckpoints.includes(checkpoint) && (
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ethics Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Additional Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Recommended Reading</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• WHO Ethics and governance of artificial intelligence for health</li>
                <li>• FDA Guidance on AI/ML-Based Medical Device Software</li>
                <li>• IEEE Standards for Ethical AI Design</li>
                <li>• NEJM AI Ethics in Healthcare Applications</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Contact Ethics Board</h4>
              <p className="text-sm text-gray-600 mb-3">
                For complex ethical questions or review requests, contact our AI Ethics Review Board.
              </p>
              <Button variant="outline" size="sm">
                Request Ethics Review
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Onboarding Card */}
      <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <Award className="h-6 w-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Complete Your Ethics Training</h3>
              <p className="text-gray-600 mb-4">
                Achieve at least 80% compliance score to unlock advanced ML features and model deployment capabilities.
              </p>
              <div className="flex items-center gap-4">
                <Progress value={completionPercentage} className="flex-1" />
                <span className="text-sm font-medium">{completionPercentage.toFixed(0)}% Complete</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EthicalGuidelinesPanel;
