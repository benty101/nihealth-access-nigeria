
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Heart, AlertCircle } from 'lucide-react';
import { isSessionExpired, shouldShowWarning } from '@/lib/security';
import RoleBasedAuth from '@/components/auth/RoleBasedAuth';
import SignupForm from '@/components/auth/SignupForm';
import GoogleAuthButton from '@/components/auth/GoogleAuthButton';
import SessionWarning from '@/components/auth/SessionWarning';
import { SuperAdminSeeder } from '@/services/SuperAdminSeeder';
import { secureLogger } from '@/lib/secureLogger';

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading, lastActivity, updateActivity } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showSessionWarning, setShowSessionWarning] = useState(false);

  // Secure super admin creation - only in development and not already created
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const superAdminCreated = localStorage.getItem('superAdminCreated');
      
      if (!superAdminCreated) {
        SuperAdminSeeder.createSuperAdmin().then((result) => {
          if (result.success) {
            secureLogger.admin('super_admin_account_created');
            localStorage.setItem('superAdminCreated', 'true');
          } else {
            secureLogger.error('Super admin setup failed', result.error);
          }
        });
      }
    }
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !loading) {
      secureLogger.auth('authenticated_user_redirect', user.id);
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  // Session timeout monitoring
  useEffect(() => {
    if (!user) return;

    const checkSession = () => {
      if (isSessionExpired(lastActivity)) {
        setShowSessionWarning(false);
        secureLogger.auth('session_expired', user.id);
        navigate('/auth');
        return;
      }

      if (shouldShowWarning(lastActivity)) {
        setShowSessionWarning(true);
        secureLogger.auth('session_warning_shown', user.id);
      } else {
        setShowSessionWarning(false);
      }
    };

    const interval = setInterval(checkSession, 60000);
    return () => clearInterval(interval);
  }, [user, lastActivity, navigate]);

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

        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 group mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                MeddyPal
              </span>
              <span className="text-xs text-gray-500 -mt-1">Your Health Companion</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to MeddyPal</h1>
          <p className="text-gray-600">Your trusted maternal health companion in Nigeria</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-pink-500 mr-2" />
              <CardTitle className="text-lg text-center">Get Started</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {error && (
                <Alert className="mb-4 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4 border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="signin">
                <RoleBasedAuth />

                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                  </div>
                  <GoogleAuthButton
                    setError={setError}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </div>
              </TabsContent>

              <TabsContent value="signup">
                <SignupForm
                  error={error}
                  setError={setError}
                  setSuccess={setSuccess}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />

                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                  </div>
                  <GoogleAuthButton
                    setError={setError}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-teal-600 hover:text-teal-700">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
          <p className="mt-1">🇳🇬 Proudly serving Nigerian mothers and families</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
