
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bell, Heart, User } from 'lucide-react';
import { OnboardingData } from '@/services/PersonalizationService';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface DashboardHeaderProps {
  onboardingData: OnboardingData | null;
  greeting: string;
}

interface UserProfile {
  full_name?: string;
  state_of_residence?: string;
  lga?: string;
}

const DashboardHeader = ({ onboardingData, greeting }: DashboardHeaderProps) => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, state_of_residence, lga')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching user profile:', error);
          return;
        }

        if (data) {
          setUserProfile(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  const getPersonalizedGreeting = () => {
    const userName = userProfile?.full_name ? userProfile.full_name.split(' ')[0] : 'there';
    
    if (onboardingData?.lifeStage === 'pregnant') {
      return `Welcome back, ${userName}! Here's your pregnancy care overview.`;
    } else if (onboardingData?.lifeStage === 'mother') {
      return `Welcome back, ${userName}! Here's your family's health overview.`;
    } else if (onboardingData?.lifeStage === 'elderly') {
      return `Welcome back, ${userName}! Here's your personalized health management.`;
    }
    
    return `Welcome back, ${userName}! Here's your health overview.`;
  };

  const displayLocation = userProfile?.state_of_residence || onboardingData?.location;
  const displayLga = userProfile?.lga;

  return (
    <div className="mb-6 sm:mb-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1 animate-fade-in animation-delay-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 hover:text-teal-600 transition-colors duration-300">
                Health Dashboard
              </h1>
              {userProfile?.full_name && (
                <div className="flex items-center text-sm text-gray-600 animate-fade-in animation-delay-400">
                  <User className="h-4 w-4 mr-1" />
                  <span className="font-medium">{userProfile.full_name}</span>
                </div>
              )}
            </div>
            {onboardingData && (
              <Badge className="bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800 capitalize w-fit hover:shadow-md transition-all duration-300 animate-fade-in animation-delay-600">
                {onboardingData.lifeStage === 'pregnant' ? 'Expecting Mother' : 
                 onboardingData.lifeStage === 'mother' ? 'Mother' :
                 onboardingData.lifeStage === 'elderly' ? 'Senior Care' : 'General Health'}
              </Badge>
            )}
          </div>
          
          <p className="text-gray-600 text-sm sm:text-base mb-1 animate-fade-in animation-delay-400">
            {loading ? 'Loading your personalized overview...' : getPersonalizedGreeting()}
          </p>
          
          {displayLocation && (
            <div className="flex items-center text-sm text-gray-500 animate-fade-in animation-delay-600 hover:text-teal-600 transition-colors duration-300">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">
                {displayLga ? `${displayLga}, ${displayLocation}` : displayLocation}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 animate-fade-in animation-delay-800">
          <Button variant="outline" size="sm" className="w-full sm:w-auto hover:scale-105 transition-all duration-300 hover:border-teal-500 hover:text-teal-600">
            <Bell className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Notifications</span>
            <span className="sm:hidden">Alerts</span>
          </Button>
          <Button className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 w-full sm:w-auto hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            <Heart className="h-4 w-4 mr-2 animate-heartbeat" />
            <span className="hidden sm:inline">Emergency Contacts</span>
            <span className="sm:hidden">Emergency</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
