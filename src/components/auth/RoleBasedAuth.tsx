
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import LoginForm from './LoginForm';
import { secureLogger } from '@/lib/secureLogger';

const RoleBasedAuth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role, loading } = useUserRole();
  const [showSuperAdminLogin, setShowSuperAdminLogin] = useState(false);
  const [error, setError] = useState('');

  // Handle navigation after successful login
  useEffect(() => {
    if (user && role && !loading) {
      secureLogger.info('Handling post-login navigation', { 
        userId: user.id, 
        email: user.email, 
        role 
      });

      // Navigate based on role - SECURE ROLE-BASED ROUTING
      switch (role) {
        case 'super_admin':
          secureLogger.auth('navigating_super_admin_to_admin', user.id);
          navigate('/admin');
          break;
        case 'hospital_admin':
          secureLogger.auth('navigating_hospital_admin_to_hospital', user.id);
          navigate('/hospital');
          break;
        default:
          secureLogger.auth('navigating_patient_to_dashboard', user.id);
          navigate('/dashboard');
      }
    }
  }, [user, role, loading, navigate]);

  const handleLoginSuccess = () => {
    secureLogger.info('Login success triggered', { userId: user?.id });
    // Navigation will be handled by the useEffect above
  };

  // If user is logged in but we're still loading the role, show loading
  if (user && loading) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <p className="text-gray-600">Determining your access level...</p>
      </div>
    );
  }

  // If user is logged in and we have their role, they should be redirected
  // This component should only show for non-authenticated users
  if (user && role) {
    return (
      <div className="text-center">
        <p className="text-gray-600">Redirecting you to your dashboard...</p>
      </div>
    );
  }

  // Super Admin Login Form - SECURITY: Removed email-based detection
  if (showSuperAdminLogin) {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-red-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-red-600" />
                <div>
                  <CardTitle className="text-lg">Super Admin Access</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Administrative login for system management</p>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardContent className="pt-6">
            <LoginForm
              onSuccess={handleLoginSuccess}
              error={error}
              setError={setError}
              isLoading={false}
              setIsLoading={() => {}}
            />
          </CardContent>
        </Card>

        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => {
              setShowSuperAdminLogin(false);
              setError('');
            }}
            className="text-teal-600 hover:text-teal-700"
          >
            ← Back to User Login
          </Button>
        </div>
      </div>
    );
  }

  // Regular Patient/User Login
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-lg flex items-center justify-center">
              <User className="h-5 w-5 text-teal-600" />
            </div>
          </div>
          <CardTitle className="text-xl text-center">Welcome Back</CardTitle>
          <p className="text-center text-gray-600">
            Sign in to access your health dashboard and resources
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          <LoginForm
            onSuccess={handleLoginSuccess}
            error={error}
            setError={setError}
            isLoading={false}
            setIsLoading={() => {}}
          />
        </CardContent>
      </Card>

      {/* SECURITY: Hardened admin access - requires multiple clicks and no email-based detection */}
      <div className="text-center">
        <p 
          className="text-xs text-gray-400 cursor-pointer select-none"
          onClick={(e) => {
            if (e.detail === 3) { // Triple click
              setShowSuperAdminLogin(true);
            }
          }}
        >
          MeddyPal v2.0
        </p>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>New to MeddyPal? You'll be able to create an account after selecting sign up.</p>
      </div>
    </div>
  );
};

export default RoleBasedAuth;
