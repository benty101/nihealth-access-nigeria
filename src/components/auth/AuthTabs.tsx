
import React from 'react';
import { Heart, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import RoleBasedAuth from './RoleBasedAuth';
import SignupForm from './SignupForm';
import GoogleAuthButton from './GoogleAuthButton';

interface AuthTabsProps {
  error: string;
  success: string;
  isLoading: boolean;
  setError: (error: string) => void;
  setSuccess: (success: string) => void;
  setIsLoading: (loading: boolean) => void;
}

const AuthTabs = ({ 
  error, 
  success, 
  isLoading, 
  setError, 
  setSuccess, 
  setIsLoading 
}: AuthTabsProps) => {
  return (
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
      </CardContent>
    </Card>
  );
};

export default AuthTabs;
