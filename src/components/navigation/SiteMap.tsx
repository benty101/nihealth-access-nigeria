
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SiteNavigation from './SiteNavigation';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';

const SiteMap = () => {
  const { user } = useAuth();
  const { role } = useUserRole();

  const getRoleDisplay = () => {
    if (!user) return 'Guest User';
    
    switch (role) {
      case 'super_admin':
        return 'Super Administrator';
      case 'hospital_admin':
        return 'Hospital Administrator';
      case 'broker':
        return 'Insurance Broker';
      default:
        return 'Patient';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Site Navigation</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Complete overview of all available pages and features
        </p>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          Viewing as: {getRoleDisplay()}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Available Pages & Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SiteNavigation 
            layout="grid" 
            showDescriptions={true}
            className="w-full"
          />
        </CardContent>
      </Card>

      {!user && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-primary">Sign In for Full Access</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Sign in to access all MeddyPal features including appointments, health records, 
              insurance management, and personalized healthcare services.
            </p>
            <div className="flex gap-2">
              <a 
                href="/auth" 
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Sign In
              </a>
              <a 
                href="/auth" 
                className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
              >
                Create Account
              </a>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SiteMap;
