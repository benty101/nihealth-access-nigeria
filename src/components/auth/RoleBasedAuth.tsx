
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Building2, User, Stethoscope, TrendingUp, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import LoginForm from './LoginForm';

const RoleBasedAuth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role } = useUserRole();
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [error, setError] = useState('');

  const roleOptions = [
    {
      value: 'patient',
      label: 'Patient / Mother',
      description: 'Access health records, appointments, and resources',
      icon: User,
      color: 'bg-green-100 text-green-800'
    },
    {
      value: 'hospital_admin',
      label: 'Hospital Administrator',
      description: 'Manage hospital operations and staff',
      icon: Building2,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      value: 'broker',
      label: 'Insurance Broker',
      description: 'Manage insurance plans and client relationships',
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      value: 'healthcare_provider',
      label: 'Healthcare Provider',
      description: 'Provide telemedicine and consultation services',
      icon: Stethoscope,
      color: 'bg-teal-100 text-teal-800'
    },
    {
      value: 'super_admin',
      label: 'System Administrator',
      description: 'Full system access and management',
      icon: Shield,
      color: 'bg-red-100 text-red-800'
    }
  ];

  const handleRoleSelection = (roleValue: string) => {
    setSelectedRole(roleValue);
    setShowLoginForm(true);
    setError('');
  };

  const handleLoginSuccess = () => {
    // Navigate based on user's actual role after login
    switch (role) {
      case 'super_admin':
        navigate('/admin');
        break;
      case 'hospital_admin':
        navigate('/hospital');
        break;
      default:
        navigate('/dashboard');
    }
  };

  const getSelectedRoleInfo = () => {
    return roleOptions.find(option => option.value === selectedRole);
  };

  if (user && role) {
    // User is already logged in, redirect them
    handleLoginSuccess();
    return null;
  }

  if (showLoginForm && selectedRole) {
    const roleInfo = getSelectedRoleInfo();
    
    return (
      <div className="space-y-6">
        <Card className="border-2 border-teal-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {roleInfo && <roleInfo.icon className="h-6 w-6 text-teal-600" />}
                <div>
                  <CardTitle className="text-lg">Sign in as {roleInfo?.label}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{roleInfo?.description}</p>
                </div>
              </div>
              <Badge className={roleInfo?.color}>
                {roleInfo?.label}
              </Badge>
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
              setShowLoginForm(false);
              setSelectedRole('');
              setError('');
            }}
            className="text-teal-600 hover:text-teal-700"
          >
            ← Choose Different Role
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">Choose Your Role</CardTitle>
          <p className="text-center text-gray-600">
            Select your role to access the appropriate dashboard
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {roleOptions.map((option) => (
            <Card 
              key={option.value}
              className="cursor-pointer hover:border-teal-300 transition-colors border-2 hover:shadow-md"
              onClick={() => handleRoleSelection(option.value)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-lg flex items-center justify-center">
                      <option.icon className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{option.label}</h3>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                  <Badge className={option.color}>
                    Select
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p>New to MeddyPal? You'll be able to create an account after selecting your role.</p>
      </div>
    </div>
  );
};

export default RoleBasedAuth;
