
import React, { useState, useEffect } from 'react';
import { PersonalizationService, OnboardingData } from '@/services/PersonalizationService';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import PersonalizedRecommendations from '@/components/dashboard/PersonalizedRecommendations';
import PersonalizedQuickActions from '@/components/dashboard/PersonalizedQuickActions';
import HealthStats from '@/components/dashboard/HealthStats';
import UpcomingAppointments from '@/components/dashboard/UpcomingAppointments';
import RecentActivity from '@/components/dashboard/RecentActivity';
import HealthProfile from '@/components/dashboard/HealthProfile';
import HealthReminders from '@/components/dashboard/HealthReminders';
import QuickLinks from '@/components/dashboard/QuickLinks';

const HealthDashboard = () => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);

  useEffect(() => {
    setOnboardingData(PersonalizationService.getOnboardingData());
  }, []);

  const quickActions = PersonalizationService.getPersonalizedQuickActions(onboardingData);
  const recommendations = PersonalizationService.getPersonalizedRecommendations(onboardingData);
  const greeting = PersonalizationService.getPersonalizedGreeting(onboardingData);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader onboardingData={onboardingData} greeting={greeting} />

        <PersonalizedRecommendations recommendations={recommendations} />

        <PersonalizedQuickActions quickActions={quickActions} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <HealthStats />
            <UpcomingAppointments />
            <RecentActivity />
          </div>

          <div className="space-y-6">
            <HealthProfile onboardingData={onboardingData} />
            <HealthReminders />
            <QuickLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;
