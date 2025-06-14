
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import LoginForm from './LoginForm';

const RoleBasedAuth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role } = useUserRole();
  const [showSuperAdminLogin, setShowSuperAdminLogin] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSuccess = () => {
    // Navigate based on user's actual role after login
    switch (role) {
      case 'super_admin':
        navigate('/admin');
        break;
      default:
        navigate('/dashboard');
    }
  };

  if (user && role) {
    // User is already logged in, redirect them
    handleLoginSuccess();
    return null;
  }

  // Super Admin Login Form
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

      {/* Hidden Super Admin Access - Triple click to reveal */}
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
