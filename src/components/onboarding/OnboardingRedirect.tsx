
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const OnboardingRedirect = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    console.log('OnboardingRedirect: Checking user and onboarding status', { 
      user: user?.id, 
      email: user?.email 
    });

    if (user) {
      // Check if user has completed onboarding
      const onboardingCompleted = localStorage.getItem('onboardingCompleted');
      const userOnboardingData = localStorage.getItem('userOnboardingData');
      
      console.log('OnboardingRedirect: localStorage check', {
        onboardingCompleted,
        userOnboardingData: !!userOnboardingData
      });
      
      if (!onboardingCompleted || !userOnboardingData) {
        console.log('OnboardingRedirect: Redirecting to onboarding');
        // User hasn't completed onboarding, redirect them
        navigate('/onboarding');
      } else {
        console.log('OnboardingRedirect: Onboarding already completed');
      }
    } else {
      console.log('OnboardingRedirect: No user found');
    }
  }, [user, navigate]);

  return null; // This component doesn't render anything
};

export default OnboardingRedirect;
