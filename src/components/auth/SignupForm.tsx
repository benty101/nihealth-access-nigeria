
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSignupForm } from '@/hooks/useSignupForm';
import SignupFormFields from './SignupFormFields';

interface SignupFormProps {
  error: string;
  setError: (error: string) => void;
  setSuccess: (success: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const SignupForm = ({ error, setError, setSuccess, isLoading, setIsLoading }: SignupFormProps) => {
  const {
    signupForm,
    validationErrors,
    handleInputChange,
    handleSignup
  } = useSignupForm({ setError, setSuccess, setIsLoading });

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <SignupFormFields
        signupForm={signupForm}
        validationErrors={validationErrors}
        onInputChange={handleInputChange}
      />
      
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
