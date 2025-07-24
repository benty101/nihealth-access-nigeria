import React, { useRef } from 'react';
import AppLayout from '@/components/layout/AppLayout';
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
import NABDAPartnershipCard from '@/components/dashboard/NABDAPartnershipCard';
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
import { ModernCard } from '@/components/ui/modern-card';

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
      <AppLayout>
        <div className="max-w-4xl mx-auto py-12">
          <OnboardingPrompt />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <UserGuidance />
      
      <div className="space-y-8">
        <DashboardHeader onboardingData={onboardingData} greeting={greeting} />
        
        {/* Quick Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ModernCard variant="glass" hover={false}>
            <ProfileCompletion />
          </ModernCard>
          <ModernCard variant="gradient" hover={false}>
            <PremiumUpgradeCard />
          </ModernCard>
        </div>
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Primary Content - Health Overview */}
          <div className="xl:col-span-8 space-y-6">
            <ModernCard variant="elevated" className="p-0 overflow-hidden">
              <PersonalizedInsights onboardingData={onboardingData} />
            </ModernCard>
            
            <ModernCard variant="default">
              <ProgressTracker onboardingData={onboardingData} />
            </ModernCard>
            
            <ModernCard variant="glass">
              <HealthTimeline />
            </ModernCard>
            
            <ModernCard variant="elevated" className="p-0">
              <RealTimeHealthMetrics />
            </ModernCard>
            
            <ModernCard variant="default">
              <SmartRecommendations onboardingData={onboardingData} />
            </ModernCard>
            
            <ModernCard variant="glass">
              <PersonalizedRecommendations 
                recommendations={recommendations} 
                onAppointmentBooked={handleAppointmentBooked}
              />
            </ModernCard>
            
            <ModernCard variant="default">
              <RealTimeUpcomingAppointments ref={appointmentsRef} />
            </ModernCard>
            
            <ModernCard variant="default">
              <RecentActivity />
            </ModernCard>
          </div>
          
          {/* Secondary Content - Interactive Tools & Quick Access */}
          <div className="xl:col-span-4 space-y-6">
            <ModernCard variant="gradient" className="sticky top-6">
              <MedicalChat />
            </ModernCard>
            
            <ModernCard variant="elevated">
              <AIHealthInsights />
            </ModernCard>
            
            <ModernCard variant="default">
              <FamilyHealthHub />
            </ModernCard>
            
            <ModernCard variant="glass" className="border-0 bg-transparent">
              <InsuranceStatusCard />
            </ModernCard>
            
            <ModernCard variant="glass" className="border-0 bg-transparent">
              <NABDAPartnershipCard />
            </ModernCard>
            
            <ModernCard variant="default">
              <EmergencyContactCard />
            </ModernCard>
            
            <ModernCard variant="glass">
              <RealTimeHealthReminders />
            </ModernCard>
            
            <ModernCard variant="default">
              <EnhancedQuickLinks />
            </ModernCard>
          </div>
        </div>
      </div>
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </AppLayout>
  );
};

export default Dashboard;
