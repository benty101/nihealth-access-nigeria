import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const useAuthRedirect = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showSessionWarning, setShowSessionWarning] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      // Check if user has completed onboarding
      const onboardingCompleted = localStorage.getItem('onboardingCompleted');
      const userOnboardingData = localStorage.getItem('userOnboardingData');

      if (!onboardingCompleted || !userOnboardingData) {
        // Redirect to onboarding for new users
        navigate('/onboarding', { replace: true });
      } else {
        // Redirect to dashboard for existing users
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, loading, navigate]);

  const handleSessionExpiry = () => {
    setShowSessionWarning(true);
    setTimeout(() => {
      setShowSessionWarning(false);
      navigate('/auth');
    }, 3000);
  };

  return {
    showSessionWarning,
    handleSessionExpiry
  };
};