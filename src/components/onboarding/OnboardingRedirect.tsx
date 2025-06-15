
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const OnboardingRedirect = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Check if user has completed onboarding
      const onboardingCompleted = localStorage.getItem('onboardingCompleted');
      const userOnboardingData = localStorage.getItem('userOnboardingData');
      
      if (!onboardingCompleted || !userOnboardingData) {
        // User hasn't completed onboarding, redirect them
        navigate('/onboarding');
      }
    }
  }, [user, navigate]);

  return null; // This component doesn't render anything
};

export default OnboardingRedirect;
