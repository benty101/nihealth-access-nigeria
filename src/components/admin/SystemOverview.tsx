
import React from 'react';
import { Building2, Shield, Pill, TestTube, Video, FileText, Users, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import type { SystemStats } from '@/services/AdminDataService';

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
          {stats.loadedServices.length}/7 Services Active
        </Badge>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hospitals</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalHospitals.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Medical facilities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pharmacies</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPharmacies.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Drug stores</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medications</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMedications.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Available drugs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Labs</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLabs.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Testing centers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lab Tests</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLabTests.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Available tests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Insurance Plans</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInsurancePlans.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Available plans</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Telemedicine</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTelemedicineProviders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Online doctors</p>
          </CardContent>
        </Card>
      </div>

      {/* Service Status Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Service Status
          </CardTitle>
          <CardDescription>Real-time status of all platform services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Hospitals', key: 'hospitals', count: stats.totalHospitals },
              { name: 'Pharmacies', key: 'pharmacies', count: stats.totalPharmacies },
              { name: 'Medications', key: 'medications', count: stats.totalMedications },
              { name: 'Labs', key: 'labs', count: stats.totalLabs },
              { name: 'Lab Tests', key: 'lab_tests', count: stats.totalLabTests },
              { name: 'Insurance', key: 'insurance_plans', count: stats.totalInsurancePlans },
              { name: 'Telemedicine', key: 'telemedicine_providers', count: stats.totalTelemedicineProviders },
            ].map((service) => (
              <div key={service.key} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{service.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{service.count} records</span>
                  <Badge 
                    variant={stats.loadedServices.includes(service.key) ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {stats.loadedServices.includes(service.key) ? 'Online' : 'Error'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemOverview;
