
import React from 'react';
import { Building2, Database, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SystemStats } from '@/services/AdminDataService';

interface SystemOverviewProps {
  stats: SystemStats;
  loading: boolean;
}

const SystemOverview: React.FC<SystemOverviewProps> = ({ stats, loading }) => {
  const totalServices = stats.totalPharmacies + stats.totalLabs + stats.totalTelemedicineProviders;
  const successRate = stats.loadedServices.length / 5 * 100;

  return (
    <div className="space-y-6">
      {/* System Health Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            System Health
          </CardTitle>
          <CardDescription>
            Overall platform status and service availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {stats.errors.length === 0 ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-700 font-medium">All Systems Operational</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <span className="text-yellow-700 font-medium">
                    {stats.errors.length} Service{stats.errors.length > 1 ? 's' : ''} Need Attention
                  </span>
                </>
              )}
            </div>
            <Badge variant={stats.errors.length === 0 ? "default" : "secondary"}>
              {successRate.toFixed(0)}% Services Online
            </Badge>
          </div>
          
          {stats.errors.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-medium text-yellow-800 mb-2">Service Issues:</p>
              <ul className="text-sm text-yellow-700 space-y-1">
                {stats.errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthcare Facilities</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.totalHospitals.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Active hospitals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Providers</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : totalServices.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Pharmacies ({stats.totalPharmacies}), Labs ({stats.totalLabs}), Telemedicine ({stats.totalTelemedicineProviders})
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Insurance Plans</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.totalInsurancePlans.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Available plans</p>
          </CardContent>
        </Card>
      </div>

      {/* Loaded Services Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Service Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['Hospitals', 'Pharmacies', 'Labs', 'Telemedicine Providers', 'Insurance Plans'].map((service) => (
              <Badge 
                key={service}
                variant={stats.loadedServices.includes(service) ? "default" : "destructive"}
                className="text-xs"
              >
                {service} {stats.loadedServices.includes(service) ? '✓' : '✗'}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemOverview;
