
import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingFlow from '@/components/OnboardingFlow';

const Onboarding = () => {
  const navigate = useNavigate();

  const handleOnboardingComplete = (data: any) => {
    console.log('Onboarding completed with data:', data);
    
    // Store user preferences (in a real app, this would go to a backend/database)
    localStorage.setItem('userOnboardingData', JSON.stringify(data));
    localStorage.setItem('onboardingCompleted', 'true');
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  return <OnboardingFlow onComplete={handleOnboardingComplete} />;
};

export default Onboarding;
