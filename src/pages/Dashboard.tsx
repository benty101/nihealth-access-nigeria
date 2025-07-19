import React, { useRef } from 'react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import RealTimeHealthMetrics from '@/components/dashboard/RealTimeHealthMetrics';
import RealTimeUpcomingAppointments, { AppointmentsRef } from '@/components/dashboard/RealTimeUpcomingAppointments';
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
import ProfileCompletion from '@/components/dashboard/ProfileCompletion';
import PremiumUpgradeCard from '@/components/dashboard/PremiumUpgradeCard';
import FamilyHealthHub from '@/components/dashboard/FamilyHealthHub';
import AIHealthInsights from '@/components/dashboard/AIHealthInsights';
import { HealthTimeline } from '@/components/health-timeline/HealthTimeline';
import { PersonalizationService } from '@/services/PersonalizationService';
import MedicalChat from '@/components/patient/MedicalChat';
import OnboardingPrompt from '@/components/dashboard/OnboardingPrompt';

const Dashboard = () => {
  console.log('Dashboard: Component rendered');
  const appointmentsRef = useRef<AppointmentsRef>(null);

  const onboardingData = PersonalizationService.getOnboardingData();
  const recommendations = PersonalizationService.getPersonalizedRecommendations(onboardingData);
  const greeting = PersonalizationService.getPersonalizedGreeting(onboardingData);

  console.log('Dashboard: Onboarding data', { onboardingData });

  const handleAppointmentBooked = () => {
    if (appointmentsRef.current) {
      appointmentsRef.current.loadAppointments();
    }
  };

  // If no onboarding data, show the prompt prominently
  if (!onboardingData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ContextualNavbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <OnboardingPrompt />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ContextualNavbar />
      <UserGuidance />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DashboardHeader onboardingData={onboardingData} greeting={greeting} />
        
        {/* Profile Completion Banner */}
        <div className="mb-6">
          <ProfileCompletion />
        </div>
        
        {/* Premium Upgrade Card */}
        <div className="mb-6">
          <PremiumUpgradeCard />
        </div>
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-8 space-y-6">
            <PersonalizedInsights onboardingData={onboardingData} />
            <ProgressTracker onboardingData={onboardingData} />
            
            {/* Health Timeline - New Social Health Experience */}
            <HealthTimeline />
            
            <RealTimeHealthMetrics />
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
            <MedicalChat />
            <AIHealthInsights />
            <FamilyHealthHub />
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
