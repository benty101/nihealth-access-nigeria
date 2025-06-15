
import React, { useState, useEffect } from 'react';
import { Shield, Users, Building2, Database, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import UserManagement from './UserManagement';
import HospitalManagement from './HospitalManagement';
import InsuranceManagement from './InsuranceManagement';
import PharmacyManagement from './PharmacyManagement';
import LabManagement from './LabManagement';
import TelemedicineManagement from './TelemedicineManagement';

interface SystemStats {
  totalUsers: number;
  totalHospitals: number;
  totalPharmacies: number;
  totalLabs: number;
  totalInsurancePlans: number;
  totalTelemedicineProviders: number;
  errors: string[];
}

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 0,
    totalHospitals: 0,
    totalPharmacies: 0,
    totalLabs: 0,
    totalInsurancePlans: 0,
    totalTelemedicineProviders: 0,
    errors: [],
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      console.log('SuperAdmin: Fetching system statistics...');
      
      const errors: string[] = [];
      
      // Create individual fetch functions with error handling
      const fetchCount = async (table: string, label: string): Promise<number> => {
        try {
          console.log(`SuperAdmin: Fetching ${table} count...`);
          const { count, error } = await supabase
            .from(table)
            .select('id', { count: 'exact', head: true });
          
          if (error) {
            console.error(`SuperAdmin: Error fetching ${table}:`, error);
            errors.push(`Failed to load ${label}: ${error.message}`);
            return 0;
          }
          
          console.log(`SuperAdmin: ${table} count:`, count);
          return count || 0;
        } catch (err) {
          console.error(`SuperAdmin: Exception fetching ${table}:`, err);
          errors.push(`Failed to load ${label}`);
          return 0;
        }
      };

      // Fetch all counts with individual error handling
      const [
        totalUsers,
        totalHospitals,
        totalPharmacies,
        totalLabs,
        totalInsurancePlans,
        totalTelemedicineProviders
      ] = await Promise.all([
        fetchCount('profiles', 'Users'),
        fetchCount('hospitals', 'Hospitals'),
        fetchCount('pharmacies', 'Pharmacies'),
        fetchCount('labs', 'Labs'),
        fetchCount('insurance_plans', 'Insurance Plans'),
        fetchCount('telemedicine_providers', 'Telemedicine Providers')
      ]);

      const newStats: SystemStats = {
        totalUsers,
        totalHospitals,
        totalPharmacies,
        totalLabs,
        totalInsurancePlans,
        totalTelemedicineProviders,
        errors
      };

      setStats(newStats);
      console.log('SuperAdmin: System statistics loaded:', newStats);

      // Show errors if any
      if (errors.length > 0) {
        console.warn('SuperAdmin: Some data failed to load:', errors);
        toast({
          title: "Partial Data Load",
          description: `${errors.length} service(s) failed to load. Check console for details.`,
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error('SuperAdmin: Critical error fetching system statistics:', error);
      toast({
        title: "System Error",
        description: "Failed to load dashboard data. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">System Administration</h1>
              <p className="text-gray-600">Manage all platform services and configurations</p>
            </div>
          </div>
          
          {/* Error Summary */}
          {stats.errors.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">System Warnings</span>
              </div>
              <ul className="mt-2 text-sm text-yellow-700">
                {stats.errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stats.totalUsers.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Total registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Healthcare Facilities</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stats.totalHospitals}
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
                {loading ? '...' : (stats.totalPharmacies + stats.totalLabs + stats.totalTelemedicineProviders)}
              </div>
              <p className="text-xs text-muted-foreground">Pharmacies, labs & telemedicine</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
            <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
            <TabsTrigger value="labs">Labs</TabsTrigger>
            <TabsTrigger value="telemedicine">Telemedicine</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagement onStatsChange={fetchStats} />
          </TabsContent>

          <TabsContent value="hospitals">
            <HospitalManagement onStatsChange={fetchStats} />
          </TabsContent>

          <TabsContent value="pharmacies">
            <PharmacyManagement onStatsChange={fetchStats} />
          </TabsContent>

          <TabsContent value="labs">
            <LabManagement onStatsChange={fetchStats} />
          </TabsContent>

          <TabsContent value="telemedicine">
            <TelemedicineManagement onStatsChange={fetchStats} />
          </TabsContent>

          <TabsContent value="insurance">
            <InsuranceManagement onStatsChange={fetchStats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
