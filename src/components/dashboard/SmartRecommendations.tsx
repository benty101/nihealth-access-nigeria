
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { OnboardingData } from '@/types/personalization';
import { SmartRecommendationsService } from '@/services/SmartRecommendationsService';
import SmartRecommendationItem from './SmartRecommendationItem';

interface SmartRecommendationsProps {
  onboardingData: OnboardingData | null;
}

const SmartRecommendations = ({ onboardingData }: SmartRecommendationsProps) => {
  const recommendations = SmartRecommendationsService.getSmartRecommendations(onboardingData);

  if (recommendations.length === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
          Smart Recommendations for {onboardingData?.location}
        </CardTitle>
        <p className="text-sm text-gray-600">
          Personalized healthcare options based on your profile and location
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <SmartRecommendationItem key={rec.id} recommendation={rec} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartRecommendations;
