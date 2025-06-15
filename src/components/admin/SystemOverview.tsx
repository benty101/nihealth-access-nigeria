
import React from 'react';
import { Building2, Pill, TestTube, Video, FileText, AlertTriangle, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import type { SystemStats } from '@/services/AdminDataService';
import StatCard from './overview/StatCard';
import ServiceStatusDetails from './overview/ServiceStatusDetails';

interface SystemOverviewProps {
  stats: SystemStats;
  loading: boolean;
}

const SystemOverview = ({ stats, loading }: SystemOverviewProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(7)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-16 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Frontend Sync Status */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Database className="h-5 w-5" />
            Frontend Data Sync Status
          </CardTitle>
          <CardDescription className="text-blue-600">
            Real-time reflection of all frontend listings and data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-800">{stats.loadedServices.length}/7</div>
              <div className="text-sm text-blue-600">Services Active</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-green-800">
                {stats.activePharmacies + stats.activeHospitals + stats.activeLabs}
              </div>
              <div className="text-sm text-green-600">Active Providers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-purple-800">
                {stats.activeMedications + stats.activeLabTests}
              </div>
              <div className="text-sm text-purple-600">Active Services</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-orange-800">
                {new Date(stats.lastSyncTime).toLocaleTimeString()}
              </div>
              <div className="text-sm text-orange-600">Last Sync</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Alerts */}
      {stats.errors.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="font-medium mb-2">System Issues Detected:</div>
            <ul className="space-y-1">
              {stats.errors.map((error, index) => (
                <li key={index} className="text-sm">• {error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* System Status */}
      <div className="flex items-center gap-4 mb-6">
        <Badge variant={stats.errors.length === 0 ? "default" : "destructive"} className="text-sm">
          {stats.errors.length === 0 ? 'All Systems Operational' : `${stats.errors.length} Service(s) Down`}
        </Badge>
        <Badge variant="outline" className="text-sm">
          Frontend Data: {stats.loadedServices.length}/7 Services Synced
        </Badge>
      </div>

      {/* Statistics Grid - Reflecting Frontend Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Hospitals"
          icon={Building2}
          total={stats.totalHospitals}
          active={stats.activeHospitals}
          description="Active medical facilities"
        />

        <StatCard
          title="Pharmacies"
          icon={Pill}
          total={stats.totalPharmacies}
          active={stats.activePharmacies}
          description="Active drug stores"
        />

        <StatCard
          title="Medications"
          icon={Pill}
          total={stats.totalMedications}
          active={stats.activeMedications}
          description="Available drugs"
        />

        <StatCard
          title="Laboratories"
          icon={TestTube}
          total={stats.totalLabs}
          active={stats.activeLabs}
          description="Active testing centers"
        />

        <StatCard
          title="Test Catalog"
          icon={TestTube}
          total={stats.totalLabTests}
          active={stats.activeLabTests}
          description="Available tests"
        />

        <StatCard
          title="Insurance Plans"
          icon={FileText}
          total={stats.totalInsurancePlans}
          active={stats.activeInsurancePlans}
          description="Available plans"
        />

        <StatCard
          title="Telemedicine"
          icon={Video}
          total={stats.totalTelemedicineProviders}
          active={stats.activeTelemedicineProviders}
          description="Online doctors"
        />
      </div>

      {/* Service Status Details */}
      <ServiceStatusDetails stats={stats} />
    </div>
  );
};

export default SystemOverview;
