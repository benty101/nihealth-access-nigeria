
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bell, Heart } from 'lucide-react';
import { OnboardingData } from '@/services/PersonalizationService';

interface DashboardHeaderProps {
  onboardingData: OnboardingData | null;
  greeting: string;
}

const DashboardHeader = ({ onboardingData, greeting }: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Health Dashboard</h1>
            {onboardingData && (
              <Badge className="ml-4 bg-teal-100 text-teal-800 capitalize">
                {onboardingData.lifeStage === 'pregnant' ? 'Expecting Mother' : 
                 onboardingData.lifeStage === 'mother' ? 'Mother' :
                 onboardingData.lifeStage === 'elderly' ? 'Senior Care' : 'General Health'}
              </Badge>
            )}
          </div>
          <p className="text-gray-600">{greeting}</p>
          {onboardingData?.location && (
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {onboardingData.location}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Heart className="h-4 w-4 mr-2" />
            Emergency Contacts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
