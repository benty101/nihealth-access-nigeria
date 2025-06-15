
import React from 'react';
import Navbar from '@/components/Navbar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import HealthStats from '@/components/dashboard/HealthStats';
import QuickLinks from '@/components/dashboard/QuickLinks';
import UpcomingAppointments from '@/components/dashboard/UpcomingAppointments';
import HealthReminders from '@/components/dashboard/HealthReminders';
import RecentActivity from '@/components/dashboard/RecentActivity';
import PersonalizedQuickActions from '@/components/dashboard/PersonalizedQuickActions';
import PersonalizedRecommendations from '@/components/dashboard/PersonalizedRecommendations';
import UserGuidance from '@/components/onboarding/UserGuidance';
import { PersonalizationService } from '@/services/PersonalizationService';

const Dashboard = () => {
  const onboardingData = PersonalizationService.getOnboardingData();
  const quickActions = PersonalizationService.getPersonalizedQuickActions(onboardingData);
  const recommendations = PersonalizationService.getPersonalizedRecommendations(onboardingData);
  const greeting = PersonalizationService.getPersonalizedGreeting(onboardingData);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <UserGuidance />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader onboardingData={onboardingData} greeting={greeting} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <HealthStats />
            <PersonalizedQuickActions quickActions={quickActions} />
            <UpcomingAppointments />
            <PersonalizedRecommendations recommendations={recommendations} />
            <RecentActivity />
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <QuickLinks />
            <HealthReminders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
