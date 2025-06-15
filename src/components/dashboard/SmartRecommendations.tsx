
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Shield, 
  MapPin, 
  Star,
  TrendingUp,
  Users
} from 'lucide-react';
import { OnboardingData } from '@/services/PersonalizationService';

interface SmartRecommendationsProps {
  onboardingData: OnboardingData | null;
}

interface SmartRecommendation {
  id: string;
  type: 'insurance' | 'hospital' | 'service';
  title: string;
  description: string;
  reason: string;
  action: string;
  icon: any;
  priority: number;
  location?: string;
  rating?: number;
}

const SmartRecommendations = ({ onboardingData }: SmartRecommendationsProps) => {
  const getSmartRecommendations = (): SmartRecommendation[] => {
    const recommendations: SmartRecommendation[] = [];

    if (onboardingData?.lifeStage === 'pregnant') {
      recommendations.push(
        {
          id: 'maternal_insurance',
          type: 'insurance',
          title: 'Premium Maternal Care Plan',
          description: 'Comprehensive coverage for pregnancy and childbirth',
          reason: 'Based on your pregnancy status',
          action: 'Compare Plans',
          icon: Heart,
          priority: 1,
          rating: 4.8
        },
        {
          id: 'maternity_hospital',
          type: 'hospital',
          title: 'Lagos University Teaching Hospital',
          description: 'Top-rated maternity services in your area',
          reason: 'Excellent maternal care reviews',
          action: 'View Details',
          icon: MapPin,
          priority: 2,
          location: 'Idi-Araba, Lagos',
          rating: 4.9
        }
      );
    }

    if (onboardingData?.location) {
      recommendations.push({
        id: 'local_hospital',
        type: 'hospital',
        title: 'Recommended Hospitals Nearby',
        description: `Quality healthcare facilities in ${onboardingData.location}`,
        reason: 'Based on your location',
        action: 'Find Hospitals',
        icon: MapPin,
        priority: 3,
        rating: 4.5
      });
    }

    // Default recommendations
    recommendations.push(
      {
        id: 'basic_insurance',
        type: 'insurance',
        title: 'Essential Health Plan',
        description: 'Affordable basic coverage for everyday health needs',
        reason: 'Popular choice for new users',
        action: 'Learn More',
        icon: Shield,
        priority: 4,
        rating: 4.3
      },
      {
        id: 'telemedicine',
        type: 'service',
        title: 'Virtual Consultation',
        description: 'Connect with doctors from the comfort of your home',
        reason: 'Convenient and accessible',
        action: 'Book Now',
        icon: Users,
        priority: 5,
        rating: 4.6
      }
    );

    return recommendations.sort((a, b) => a.priority - b.priority).slice(0, 3);
  };

  const recommendations = getSmartRecommendations();

  if (recommendations.length === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
          Smart Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <rec.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                      {rec.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600">{rec.rating}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {rec.reason}
                      </Badge>
                      {rec.location && (
                        <Badge variant="outline" className="text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          {rec.location}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
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

export default SmartRecommendations;
