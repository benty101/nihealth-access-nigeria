
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { signupSchema } from '@/lib/validation';
import { sanitizeErrorMessage } from '@/lib/security';

interface SignupFormProps {
  error: string;
  setError: (error: string) => void;
  setSuccess: (success: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const SignupForm = ({ error, setError, setSuccess, isLoading, setIsLoading }: SignupFormProps) => {
  const { signUp, updateActivity } = useAuth();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [signupForm, setSignupForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = (data: any): boolean => {
    try {
      signupSchema.parse(data);
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setValidationErrors({});

    if (!validateForm(signupForm)) {
      return;
    }

    setIsLoading(true);
    updateActivity();

    try {
      const { error } = await signUp(
        signupForm.email,
        signupForm.password,
        signupForm.fullName,
        signupForm.phone
      );

      if (error) {
        setError(sanitizeErrorMessage(error));
      } else {
        setSuccess('Account created successfully! Please check your email to verify your account before signing in.');
        setSignupForm({
          fullName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: ''
        });
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
    setSignupForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div>
        <Label htmlFor="signup-name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="signup-name"
            type="text"
            placeholder="Enter your full name"
            className={`pl-10 ${validationErrors.fullName ? 'border-red-500' : ''}`}
            value={signupForm.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            required
            maxLength={100}
          />
        </div>
        {validationErrors.fullName && (
          <p className="text-sm text-red-600 mt-1">{validationErrors.fullName}</p>
        )}
      </div>
      <div>
        <Label htmlFor="signup-email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="signup-email"
            type="email"
            placeholder="Enter your email"
            className={`pl-10 ${validationErrors.email ? 'border-red-500' : ''}`}
            value={signupForm.email}
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
        <Label htmlFor="signup-phone">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="signup-phone"
            type="tel"
            placeholder="e.g. 08012345678 or +2348012345678"
            className={`pl-10 ${validationErrors.phone ? 'border-red-500' : ''}`}
            value={signupForm.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
            maxLength={14}
          />
        </div>
        {validationErrors.phone && (
          <p className="text-sm text-red-600 mt-1">{validationErrors.phone}</p>
        )}
      </div>
      <div>
        <Label htmlFor="signup-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="signup-password"
            type="password"
            placeholder="Create a strong password (min 8 characters)"
            className={`pl-10 ${validationErrors.password ? 'border-red-500' : ''}`}
            value={signupForm.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
            maxLength={128}
          />
        </div>
        {validationErrors.password && (
          <p className="text-sm text-red-600 mt-1">{validationErrors.password}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Must contain at least one uppercase letter, lowercase letter, and number
        </p>
      </div>
      <div>
        <Label htmlFor="signup-confirm">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="signup-confirm"
            type="password"
            placeholder="Confirm your password"
            className={`pl-10 ${validationErrors.confirmPassword ? 'border-red-500' : ''}`}
            value={signupForm.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            required
            maxLength={128}
          />
        </div>
        {validationErrors.confirmPassword && (
          <p className="text-sm text-red-600 mt-1">{validationErrors.confirmPassword}</p>
        )}
      </div>
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default SignupForm;
