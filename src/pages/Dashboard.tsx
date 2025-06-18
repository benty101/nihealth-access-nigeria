
import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import RealTimeHealthStats from '@/components/dashboard/RealTimeHealthStats';
import RealTimeUpcomingAppointments from '@/components/dashboard/RealTimeUpcomingAppointments';
import RealTimeHealthReminders from '@/components/dashboard/RealTimeHealthReminders';
import RecentActivity from '@/components/dashboard/RecentActivity';
import PersonalizedRecommendations from '@/components/dashboard/PersonalizedRecommendations';
import PersonalizedInsights from '@/components/dashboard/PersonalizedInsights';
import ProgressTracker from '@/components/dashboard/ProgressTracker';
import SmartRecommendations from '@/components/dashboard/SmartRecommendations';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';
import EmergencyContactCard from '@/components/dashboard/EmergencyContactCard';
import InsuranceStatusCard from '@/components/dashboard/InsuranceStatusCard';
import UserGuidance from '@/components/onboarding/UserGuidance';
import EnhancedQuickLinks from '@/components/dashboard/EnhancedQuickLinks';
import { PersonalizationService } from '@/services/PersonalizationService';

const Dashboard = () => {
  console.log('Dashboard: Component rendered');
  const appointmentsRef = useRef<{ loadAppointments: () => void } | null>(null);

  const onboardingData = PersonalizationService.getOnboardingData();
  const recommendations = PersonalizationService.getPersonalizedRecommendations(onboardingData);
  const greeting = PersonalizationService.getPersonalizedGreeting(onboardingData);

  console.log('Dashboard: Onboarding data', { onboardingData });

  const handleAppointmentBooked = () => {
    // Trigger refresh of appointments component
    if (appointmentsRef.current && 'loadAppointments' in appointmentsRef.current) {
      appointmentsRef.current.loadAppointments();
    }
  };

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
            <RealTimeHealthStats />
            <SmartRecommendations onboardingData={onboardingData} />
            <PersonalizedRecommendations 
              recommendations={recommendations} 
              onAppointmentBooked={handleAppointmentBooked}
            />
            <RealTimeUpcomingAppointments ref={appointmentsRef} />
            <RecentActivity />
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="xl:col-span-4 space-y-6">
            <InsuranceStatusCard />
            <EmergencyContactCard />
            <RealTimeHealthReminders />
            <EnhancedQuickLinks />
          </div>
        </div>
      </div>
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </div>
  );
};

export default Dashboard;
