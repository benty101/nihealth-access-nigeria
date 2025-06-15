
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, Lock } from 'lucide-react';

interface SignupFormFieldsProps {
  signupForm: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  };
  validationErrors: Record<string, string>;
  onInputChange: (field: string, value: string) => void;
}

const SignupFormFields = ({ signupForm, validationErrors, onInputChange }: SignupFormFieldsProps) => {
  return (
    <>
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
            onChange={(e) => onInputChange('fullName', e.target.value)}
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
            onChange={(e) => onInputChange('email', e.target.value)}
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
            onChange={(e) => onInputChange('phone', e.target.value)}
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
            onChange={(e) => onInputChange('password', e.target.value)}
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
            onChange={(e) => onInputChange('confirmPassword', e.target.value)}
            required
            maxLength={128}
          />
        </div>
        {validationErrors.confirmPassword && (
          <p className="text-sm text-red-600 mt-1">{validationErrors.confirmPassword}</p>
        )}
      </div>
    </>
  );
};

export default SignupFormFields;
