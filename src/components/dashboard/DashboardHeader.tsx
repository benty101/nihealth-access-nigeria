
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
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Health Dashboard</h1>
            {onboardingData && (
              <Badge className="bg-teal-100 text-teal-800 capitalize w-fit">
                {onboardingData.lifeStage === 'pregnant' ? 'Expecting Mother' : 
                 onboardingData.lifeStage === 'mother' ? 'Mother' :
                 onboardingData.lifeStage === 'elderly' ? 'Senior Care' : 'General Health'}
              </Badge>
            )}
          </div>
          <p className="text-gray-600 text-sm sm:text-base">{greeting}</p>
          {onboardingData?.location && (
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{onboardingData.location}</span>
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Bell className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Notifications</span>
            <span className="sm:hidden">Alerts</span>
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 w-full sm:w-auto">
            <Heart className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Emergency Contacts</span>
            <span className="sm:hidden">Emergency</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
