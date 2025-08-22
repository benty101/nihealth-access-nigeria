import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ModernLandingPage from '@/components/modern/ModernLandingPage';

const ModernIndex = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect authenticated users to appropriate dashboard
    if (!loading && user) {
      const onboardingCompleted = localStorage.getItem('onboardingCompleted');
      const userOnboardingData = localStorage.getItem('userOnboardingData');

      if (!onboardingCompleted || !userOnboardingData) {
        // New user - redirect to onboarding
        navigate('/onboarding', { replace: true });
      } else {
        // Existing user - redirect to modern dashboard
        navigate('/modern-dashboard', { replace: true });
      }
    }
  }, [user, loading, navigate]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50/30 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <p className="text-neutral-600 font-medium">Loading your health companion...</p>
        </div>
      </div>
    );
  }

  // Show modern landing page to unauthenticated users
  return <ModernLandingPage />;
};

export default ModernIndex;