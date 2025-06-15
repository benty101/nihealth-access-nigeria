
import React, { useState, useEffect } from 'react';
import { Shield, Users, Building2, Database, Activity, Settings } from 'lucide-react';
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
}

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 0,
    totalHospitals: 0,
    totalPharmacies: 0,
    totalLabs: 0,
    totalInsurancePlans: 0,
    totalTelemedicineProviders: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      console.log('Fetching system statistics...');
      
      // Fetch all stats in parallel with error handling for each
      const [
        usersResult,
        hospitalsResult,
        pharmaciesResult,
        labsResult,
        insuranceResult,
        telemedicineResult
      ] = await Promise.allSettled([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('hospitals').select('id', { count: 'exact', head: true }),
        supabase.from('pharmacies').select('id', { count: 'exact', head: true }),
        supabase.from('labs').select('id', { count: 'exact', head: true }),
        supabase.from('insurance_plans').select('id', { count: 'exact', head: true }),
        supabase.from('telemedicine_providers').select('id', { count: 'exact', head: true })
      ]);

      // Handle results with individual error logging
      const newStats: SystemStats = {
        totalUsers: usersResult.status === 'fulfilled' ? (usersResult.value.count || 0) : 0,
        totalHospitals: hospitalsResult.status === 'fulfilled' ? (hospitalsResult.value.count || 0) : 0,
        totalPharmacies: pharmaciesResult.status === 'fulfilled' ? (pharmaciesResult.value.count || 0) : 0,
        totalLabs: labsResult.status === 'fulfilled' ? (labsResult.value.count || 0) : 0,
        totalInsurancePlans: insuranceResult.status === 'fulfilled' ? (insuranceResult.value.count || 0) : 0,
        totalTelemedicineProviders: telemedicineResult.status === 'fulfilled' ? (telemedicineResult.value.count || 0) : 0,
      };

      // Log any failed queries
      [usersResult, hospitalsResult, pharmaciesResult, labsResult, insuranceResult, telemedicineResult].forEach((result, index) => {
        const tables = ['profiles', 'hospitals', 'pharmacies', 'labs', 'insurance_plans', 'telemedicine_providers'];
        if (result.status === 'rejected') {
          console.error(`Failed to fetch ${tables[index]} count:`, result.reason);
        }
      });

      setStats(newStats);
      console.log('System statistics loaded:', newStats);

    } catch (error) {
      console.error('Error fetching system statistics:', error);
      toast({
        title: "Warning",
        description: "Some statistics may not be available",
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
              <p className="text-gray-600">Manage all platform services and system configurations</p>
            </div>
          </div>
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
