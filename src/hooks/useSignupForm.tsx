
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { signupSchema } from '@/lib/validation';
import { sanitizeErrorMessage } from '@/lib/security';

interface SignupFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface UseSignupFormProps {
  setError: (error: string) => void;
  setSuccess: (success: string) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useSignupForm = ({ setError, setSuccess, setIsLoading }: UseSignupFormProps) => {
  const { signUp, updateActivity } = useAuth();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [signupForm, setSignupForm] = useState<SignupFormData>({
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

  const handleInputChange = (field: string, value: string) => {
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
    setSignupForm(prev => ({ ...prev, [field]: value }));
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
      // Clear any existing onboarding data for fresh signup
      localStorage.removeItem('onboardingCompleted');
      localStorage.removeItem('userOnboardingData');
      console.log('SignupForm: Cleared existing onboarding data for fresh signup');

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

  return {
    signupForm,
    validationErrors,
    handleInputChange,
    handleSignup
  };
};
