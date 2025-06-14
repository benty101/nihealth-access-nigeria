
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FileText } from 'lucide-react';
import { OnboardingData } from '@/services/PersonalizationService';

interface HealthProfileProps {
  onboardingData: OnboardingData | null;
}

const HealthProfile = ({ onboardingData }: HealthProfileProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-teal-600" />
          Health Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {onboardingData && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Health Focus</span>
                <Badge className="bg-teal-100 text-teal-800 capitalize">
                  {onboardingData.lifeStage}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Location</span>
                <span className="text-sm font-medium">{onboardingData.location}</span>
              </div>
              <div className="space-y-2">
                <span className="text-sm text-gray-600">Health Goals</span>
                <div className="flex flex-wrap gap-1">
                  {onboardingData.healthGoals.slice(0, 3).map((goal, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {goal}
                    </Badge>
                  ))}
                  {onboardingData.healthGoals.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{onboardingData.healthGoals.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Insurance Status</span>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Primary Doctor</span>
            <span className="text-sm font-medium">Dr. Amina Hassan</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Emergency Contact</span>
            <span className="text-sm font-medium">John Adebayo</span>
          </div>
          <Button variant="outline" className="w-full mt-4">
            <FileText className="h-4 w-4 mr-2" />
            Update Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthProfile;
