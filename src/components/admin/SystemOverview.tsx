
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Pill, 
  TestTube, 
  Shield, 
  Users,
  AlertCircle,
  RefreshCw,
  CheckCircle,
  XCircle
} from 'lucide-react';
import StatCard from './overview/StatCard';
import type { SystemStats } from '@/services/AdminDataService';

interface SystemOverviewProps {
  stats: SystemStats | null;
  loading: boolean;
}

const SystemOverview = ({ stats, loading }: SystemOverviewProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading system statistics...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load system statistics. Please try refreshing the page.
        </AlertDescription>
      </Alert>
    );
  }

  const hasErrors = stats.errors && stats.errors.length > 0;

  return (
    <div className="space-y-6">
      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            System Status
          </CardTitle>
          <CardDescription>
            Real-time overview of all platform services and data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {hasErrors ? (
                <XCircle className="h-5 w-5 text-red-500" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              <span className="font-medium">
                {hasErrors ? 'Issues Detected' : 'All Systems Operational'}
              </span>
            </div>
            <Badge variant="secondary">
              Last Updated: {new Date(stats.lastSyncTime).toLocaleTimeString()}
            </Badge>
          </div>
          
          {hasErrors && (
            <div className="mt-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    {stats.errors.map((error, index) => (
                      <div key={index}>• {error}</div>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Hospitals"
          icon={Building2}
          total={stats.totalHospitals}
          active={stats.activeHospitals}
          description="Active medical facilities"
        />
        
        <StatCard
          title="Medications"
          icon={Pill}
          total={stats.totalMedications}
          active={stats.activeMedications}
          description="Available medications"
        />
        
        <StatCard
          title="Laboratories"
          icon={TestTube}
          total={stats.totalLabs + stats.totalLabTests}
          active={stats.activeLabs + stats.activeLabTests}
          description="Labs & diagnostic tests"
        />
        
        <StatCard
          title="Insurance Plans"
          icon={Shield}
          total={stats.totalInsurancePlans}
          active={stats.activeInsurancePlans}
          description="Available insurance plans"
        />
      </div>

      {/* Detailed Service Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Healthcare Services</CardTitle>
            <CardDescription>Status of core healthcare services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Medical Facilities</span>
              <Badge variant={stats.activeHospitals > 0 ? "default" : "secondary"}>
                {stats.activeHospitals} Active
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Laboratory Network</span>
              <Badge variant={stats.activeLabs > 0 ? "default" : "secondary"}>
                {stats.activeLabs} Labs
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Diagnostic Tests</span>
              <Badge variant={stats.activeLabTests > 0 ? "default" : "secondary"}>
                {stats.activeLabTests} Tests
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Telemedicine</span>
              <Badge variant={stats.activeTelemedicineProviders > 0 ? "default" : "secondary"}>
                {stats.activeTelemedicineProviders} Providers
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commerce & Insurance</CardTitle>
            <CardDescription>Status of commerce and insurance services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Pharmacy Network</span>
              <Badge variant={stats.activePharmacies > 0 ? "default" : "secondary"}>
                {stats.activePharmacies} Active
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Available Medications</span>
              <Badge variant={stats.activeMedications > 0 ? "default" : "secondary"}>
                {stats.activeMedications} Active
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Insurance Plans</span>
              <Badge variant={stats.activeInsurancePlans > 0 ? "default" : "secondary"}>
                {stats.activeInsurancePlans} Plans
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemOverview;
