import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Heart, User, Phone, Mail, Lock, AlertCircle } from 'lucide-react';
import { loginSchema, signupSchema } from '@/lib/validation';
import { sanitizeErrorMessage, isSessionExpired, shouldShowWarning } from '@/lib/security';

const Auth = () => {
  const navigate = useNavigate();
  const { user, signUp, signIn, signInWithGoogle, loading, lastActivity, updateActivity } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Session timeout warning
  const [showSessionWarning, setShowSessionWarning] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  // Session timeout monitoring
  useEffect(() => {
    if (!user) return;

    const checkSession = () => {
      if (isSessionExpired(lastActivity)) {
        setShowSessionWarning(false);
        navigate('/auth');
        return;
      }

      if (shouldShowWarning(lastActivity)) {
        setShowSessionWarning(true);
      } else {
        setShowSessionWarning(false);
      }
    };

    const interval = setInterval(checkSession, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [user, lastActivity, navigate]);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [signupForm, setSignupForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = (data: any, schema: any): boolean => {
    try {
      schema.parse(data);
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

    // Client-side validation
    if (!validateForm(loginForm, loginSchema)) {
      return;
    }

    setIsLoading(true);
    updateActivity();

    try {
      const { error } = await signIn(loginForm.email, loginForm.password);
      
      if (error) {
        setError(sanitizeErrorMessage(error));
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Connection error. Please check your internet and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    updateActivity();

    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        setError(sanitizeErrorMessage(error));
      }
    } catch (error) {
      setError('Connection error. Please check your internet and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setValidationErrors({});

    // Client-side validation
    if (!validateForm(signupForm, signupSchema)) {
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
        // Clear form on success
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

  const handleInputChange = (field: string, value: string, formType: 'login' | 'signup') => {
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }

    if (formType === 'login') {
      setLoginForm(prev => ({ ...prev, [field]: value }));
    } else {
      setSignupForm(prev => ({ ...prev, [field]: value }));
    }
  };

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
        {/* Session Warning */}
        {showSessionWarning && (
          <Alert className="mb-4 border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              Your session will expire soon. Please save any work and refresh the page to continue.
            </AlertDescription>
          </Alert>
        )}

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
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
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

              <TabsContent value="login">
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
                        onChange={(e) => handleInputChange('email', e.target.value, 'login')}
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
                        onChange={(e) => handleInputChange('password', e.target.value, 'login')}
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

                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                  </div>
                  <Button
                    onClick={handleGoogleSignIn}
                    variant="outline"
                    className="w-full mt-4"
                    disabled={isLoading}
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup">
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
                        onChange={(e) => handleInputChange('fullName', e.target.value, 'signup')}
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
                        onChange={(e) => handleInputChange('email', e.target.value, 'signup')}
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
                        onChange={(e) => handleInputChange('phone', e.target.value, 'signup')}
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
                        onChange={(e) => handleInputChange('password', e.target.value, 'signup')}
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
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value, 'signup')}
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

                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                  </div>
                  <Button
                    onClick={handleGoogleSignIn}
                    variant="outline"
                    className="w-full mt-4"
                    disabled={isLoading}
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign up with Google
                  </Button>
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
