
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import Hero from '@/components/Hero';
import WorldClassFeatures from '@/components/WorldClassFeatures';

const Index = () => {
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
        // Existing user - redirect to dashboard
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, loading, navigate]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Only show public landing page to unauthenticated users
  return (
    <div className="min-h-screen bg-background">
      <ContextualNavbar />
      <Hero />
      <WorldClassFeatures />
    </div>
  );
};

export default Index;
