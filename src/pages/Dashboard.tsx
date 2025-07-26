import React, { useRef, useEffect, useState } from 'react';
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
import { ProfileDataService } from '@/services/ProfileDataService';
import { useAuth } from '@/contexts/AuthContext';
import MedicalChat from '@/components/patient/MedicalChat';
import OnboardingPrompt from '@/components/dashboard/OnboardingPrompt';
import { ModernCard } from '@/components/ui/modern-card';
import ContextualServiceRecommendations from '@/components/intelligent-services/ContextualServiceRecommendations';

const Dashboard = () => {
  console.log('Dashboard: Component rendered');
  const { user } = useAuth();
  const appointmentsRef = useRef<AppointmentsRef>(null);
  const [onboardingData, setOnboardingData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    if (user) {
      initializeUserProfile();
    }
  }, [user]);

  const initializeUserProfile = async () => {
    setIsLoadingProfile(true);
    try {
      // Generate unique profile data
      const uniqueProfile = await ProfileDataService.generateUniqueProfileData(user.id);
      if (uniqueProfile) {
        setProfileData(uniqueProfile);
        
        // Update local storage with insurance status from profile
        const currentOnboarding = PersonalizationService.getOnboardingData() || {};
        const hasInsurance = !!(uniqueProfile.insurance_provider && uniqueProfile.insurance_number);
        
        const updatedOnboarding = {
          ...currentOnboarding,
          hasInsurance,
          insurance_provider: uniqueProfile.insurance_provider,
          full_name: uniqueProfile.full_name,
          phone_number: uniqueProfile.phone_number,
          state_of_residence: uniqueProfile.state_of_residence
        };
        
        localStorage.setItem('userOnboardingData', JSON.stringify(updatedOnboarding));
        setOnboardingData(updatedOnboarding);
      } else {
        // Fallback to existing onboarding data
        const data = PersonalizationService.getOnboardingData();
        setOnboardingData(data);
      }
    } catch (error) {
      console.error('Error initializing unique profile:', error);
      const data = PersonalizationService.getOnboardingData();
      setOnboardingData(data);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const recommendations = PersonalizationService.getPersonalizedRecommendations(onboardingData);
  const greeting = PersonalizationService.getPersonalizedGreeting(onboardingData);

  console.log('Dashboard: Onboarding data', { onboardingData, profileData });

  const handleAppointmentBooked = () => {
    if (appointmentsRef.current) {
      appointmentsRef.current.loadAppointments();
    }
  };

  if (isLoadingProfile) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Setting up your personalized experience...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

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
          <ModernCard variant="glass-strong" hover={false}>
            <ProfileCompletion />
          </ModernCard>
          <ModernCard variant="glass" hover={false}>
            <PremiumUpgradeCard />
          </ModernCard>
        </div>
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Primary Content - Health Overview */}
          <div className="xl:col-span-8 space-y-6">
            <ModernCard variant="glass-strong" className="p-0 overflow-hidden">
              <PersonalizedInsights onboardingData={onboardingData} />
            </ModernCard>
            
            <ModernCard variant="glass">
              <ProgressTracker onboardingData={onboardingData} />
            </ModernCard>
            
            <ModernCard variant="glass-strong">
              <HealthTimeline />
            </ModernCard>
            
            <ModernCard variant="glass" className="p-0">
              <RealTimeHealthMetrics />
            </ModernCard>
            
            <ModernCard variant="glass">
              <SmartRecommendations onboardingData={onboardingData} />
            </ModernCard>
            
            <ModernCard variant="glass-strong">
              <PersonalizedRecommendations 
                recommendations={recommendations} 
                onAppointmentBooked={handleAppointmentBooked}
              />
            </ModernCard>
            
            <ModernCard variant="glass">
              <RealTimeUpcomingAppointments ref={appointmentsRef} />
            </ModernCard>
            
            <ModernCard variant="glass">
              <RecentActivity />
            </ModernCard>
          </div>
          
          {/* Secondary Content - Interactive Tools & Quick Access */}
          <div className="xl:col-span-4 space-y-6">
            <ModernCard variant="gradient" className="sticky top-6">
              <MedicalChat />
            </ModernCard>
            
            <ModernCard variant="elevated">
              <ContextualServiceRecommendations />
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
