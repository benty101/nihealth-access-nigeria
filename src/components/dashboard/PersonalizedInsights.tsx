
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { PersonalizationService, OnboardingData, PersonalizedInsight } from '@/services/PersonalizationService';

interface PersonalizedInsightsProps {
  onboardingData: OnboardingData | null;
}

const PersonalizedInsights = ({ onboardingData }: PersonalizedInsightsProps) => {
  const insights = PersonalizationService.getPersonalizedInsights(onboardingData);

  if (insights.length === 0) return null;

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
          Your Health Insights
        </CardTitle>
        <p className="text-sm text-gray-600">
          Personalized metrics based on your health profile
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <insight.icon className={`h-5 w-5 ${insight.color}`} />
                  <h4 className="font-semibold text-gray-900 text-sm">{insight.title}</h4>
                </div>
                {getTrendIcon(insight.trend)}
              </div>
              <div className="space-y-1">
                <p className={`text-2xl font-bold ${insight.color}`}>{insight.value}</p>
                <p className="text-xs text-gray-600">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalizedInsights;
