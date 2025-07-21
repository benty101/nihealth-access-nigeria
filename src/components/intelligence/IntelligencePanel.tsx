import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Lightbulb,
  Target,
  Activity
} from 'lucide-react';

interface IntelligencePanelProps {
  onboardingData: any;
}

export const IntelligencePanel: React.FC<IntelligencePanelProps> = ({ onboardingData }) => {
  const [insights, setInsights] = useState({
    riskFactors: [],
    recommendations: [],
    predictions: [],
    dataReadiness: 25
  });

  useEffect(() => {
    // Mock intelligence data - in real app this would be AI-generated
    setInsights({
      riskFactors: [
        {
          factor: 'Cardiovascular Risk',
          level: 'moderate',
          score: 65,
          description: 'Based on family history and current vitals'
        },
        {
          factor: 'Diabetes Risk',
          level: 'low',
          score: 30,
          description: 'Excellent glucose control and lifestyle factors'
        }
      ],
      recommendations: [
        {
          title: 'Increase Cardio Exercise',
          priority: 'high',
          impact: 'May reduce cardiovascular risk by 15%',
          type: 'lifestyle'
        },
        {
          title: 'Regular Blood Pressure Monitoring',
          priority: 'medium', 
          impact: 'Early detection of hypertension trends',
          type: 'preventive'
        },
        {
          title: 'Genomic Testing Available',
          priority: 'low',
          impact: 'Unlock personalized medicine insights',
          type: 'upgrade'
        }
      ],
      predictions: [
        {
          condition: 'Hypertension',
          probability: 35,
          timeframe: '5 years',
          confidence: 'medium'
        },
        {
          condition: 'Type 2 Diabetes',
          probability: 15,
          timeframe: '10 years',
          confidence: 'high'
        }
      ],
      dataReadiness: onboardingData ? 45 : 25
    });
  }, [onboardingData]);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Info className="w-4 h-4 text-yellow-500" />;
      case 'low': return <Lightbulb className="w-4 h-4 text-blue-500" />;
      default: return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* AI Readiness */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Brain className="w-4 h-4 text-primary" />
            AI Intelligence Level
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Data Completeness</span>
            <span className="font-medium">{insights.dataReadiness}%</span>
          </div>
          <Progress value={insights.dataReadiness} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Add more health data to unlock advanced AI insights
          </p>
          {insights.dataReadiness < 70 && (
            <Button variant="outline" size="sm" className="w-full">
              <Target className="w-3 h-3 mr-1" />
              Improve Intelligence
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-primary" />
            Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {insights.riskFactors.map((risk, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{risk.factor}</span>
                <Badge className={getRiskColor(risk.level)}>
                  {risk.level}
                </Badge>
              </div>
              <Progress value={risk.score} className="h-1.5" />
              <p className="text-xs text-muted-foreground">{risk.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Lightbulb className="w-4 h-4 text-primary" />
            Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {insights.recommendations.map((rec, index) => (
            <div key={index} className="p-3 rounded-lg border bg-card">
              <div className="flex items-start gap-2">
                {getPriorityIcon(rec.priority)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{rec.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{rec.impact}</p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {rec.type}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Predictive Insights */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Activity className="w-4 h-4 text-primary" />
            Future Health Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {insights.dataReadiness < 50 ? (
            <div className="text-center py-4">
              <Brain className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">
                Predictive insights available with more data
              </p>
            </div>
          ) : (
            insights.predictions.map((pred, index) => (
              <div key={index} className="p-3 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{pred.condition}</span>
                  <Badge variant="outline" className="text-xs">
                    {pred.confidence} confidence
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{pred.probability}% probability</span>
                  <span>in {pred.timeframe}</span>
                </div>
                <Progress value={pred.probability} className="h-1.5 mt-2" />
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Upgrade Prompt */}
      {insights.dataReadiness < 70 && (
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <Brain className="w-6 h-6 text-primary mx-auto" />
              <h4 className="text-sm font-semibold">Unlock Full AI Power</h4>
              <p className="text-xs text-muted-foreground">
                Genomic testing + more data = personalized insights
              </p>
              <Button size="sm" className="w-full">
                Explore Premium Features
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};