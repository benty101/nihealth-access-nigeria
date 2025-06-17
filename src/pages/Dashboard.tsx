
import React from 'react';
import Navbar from '@/components/Navbar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import HealthStats from '@/components/dashboard/HealthStats';
import UpcomingAppointments from '@/components/dashboard/UpcomingAppointments';
import HealthReminders from '@/components/dashboard/HealthReminders';
import RecentActivity from '@/components/dashboard/RecentActivity';
import PersonalizedQuickActions from '@/components/dashboard/PersonalizedQuickActions';
import PersonalizedRecommendations from '@/components/dashboard/PersonalizedRecommendations';
import PersonalizedInsights from '@/components/dashboard/PersonalizedInsights';
import ProgressTracker from '@/components/dashboard/ProgressTracker';
import SmartRecommendations from '@/components/dashboard/SmartRecommendations';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';
import UserGuidance from '@/components/onboarding/UserGuidance';
import { PersonalizationService } from '@/services/PersonalizationService';

const Dashboard = () => {
  console.log('Dashboard: Component rendered');

  const onboardingData = PersonalizationService.getOnboardingData();
  const quickActions = PersonalizationService.getPersonalizedQuickActions(onboardingData);
  const recommendations = PersonalizationService.getPersonalizedRecommendations(onboardingData);
  const greeting = PersonalizationService.getPersonalizedGreeting(onboardingData);

  console.log('Dashboard: Onboarding data', { onboardingData });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <UserGuidance />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DashboardHeader onboardingData={onboardingData} greeting={greeting} />
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-8 space-y-6">
            <PersonalizedInsights onboardingData={onboardingData} />
            <ProgressTracker onboardingData={onboardingData} />
            <PersonalizedQuickActions quickActions={quickActions} />
            <HealthStats />
            <SmartRecommendations onboardingData={onboardingData} />
            <PersonalizedRecommendations recommendations={recommendations} />
            <UpcomingAppointments />
            <RecentActivity />
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="xl:col-span-4 space-y-6">
            <HealthReminders />
          </div>
        </div>
      </div>
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </div>
  );
};

export default Dashboard;
