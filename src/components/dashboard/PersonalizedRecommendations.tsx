
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Recommendation } from '@/services/PersonalizationService';

interface PersonalizedRecommendationsProps {
  recommendations: Recommendation[];
}

const PersonalizedRecommendations = ({ recommendations }: PersonalizedRecommendationsProps) => {
  if (recommendations.length === 0) return null;

  return (
    <Card className="mb-8 border-l-4 border-l-teal-500">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="h-5 w-5 mr-2 text-teal-600" />
          Personalized Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((rec, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg border-l-4 ${
                rec.priority === 'high' ? 'bg-red-50 border-l-red-400' : 'bg-blue-50 border-l-blue-400'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <rec.icon className={`h-5 w-5 mr-3 ${
                    rec.priority === 'high' ? 'text-red-600' : 'text-blue-600'
                  }`} />
                  <div>
                    <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="ml-4">
                  {rec.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalizedRecommendations;
