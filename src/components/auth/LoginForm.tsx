
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { loginSchema } from '@/lib/validation';
import { sanitizeErrorMessage } from '@/lib/security';

interface LoginFormProps {
  onSuccess: () => void;
  error: string;
  setError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoginForm = ({ onSuccess, error, setError, isLoading, setIsLoading }: LoginFormProps) => {
  const { signIn, updateActivity } = useAuth();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const validateForm = (data: any): boolean => {
    try {
      loginSchema.parse(data);
      setValidationErrors({});
      return true;
    } catch (error: any) {
      const errors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        if (err.path?.[0]) {
          errors[err.path[0]] = err.message;
        }
      });
      setValidationErrors(errors);
      return false;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});

    if (!validateForm(loginForm)) {
      return;
    }

    setIsLoading(true);
    updateActivity();

    try {
      const { error } = await signIn(loginForm.email, loginForm.password);
      
      if (error) {
        setError(sanitizeErrorMessage(error));
      } else {
        onSuccess();
      }
    } catch (error) {
      setError('Connection error. Please check your internet and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
    setLoginForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <Label htmlFor="login-email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            className={`pl-10 ${validationErrors.email ? 'border-red-500' : ''}`}
            value={loginForm.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            maxLength={254}
          />
        </div>
        {validationErrors.email && (
          <p className="text-sm text-red-600 mt-1">{validationErrors.email}</p>
        )}
      </div>
      <div>
        <Label htmlFor="login-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            className={`pl-10 ${validationErrors.password ? 'border-red-500' : ''}`}
            value={loginForm.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
            maxLength={128}
          />
        </div>
        {validationErrors.password && (
          <p className="text-sm text-red-600 mt-1">{validationErrors.password}</p>
        )}
      </div>
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;
