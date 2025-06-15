
import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import SessionWarning from '@/components/auth/SessionWarning';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthTabs from '@/components/auth/AuthTabs';
import AuthFooter from '@/components/auth/AuthFooter';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const Auth = () => {
  const { loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { showSessionWarning } = useAuthRedirect();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SessionWarning show={showSessionWarning} />

        <AuthHeader />

        <AuthTabs
          error={error}
          success={success}
          isLoading={isLoading}
          setError={setError}
          setSuccess={setSuccess}
          setIsLoading={setIsLoading}
        />

        <AuthFooter />
      </div>
    </div>
  );
};

export default Auth;
