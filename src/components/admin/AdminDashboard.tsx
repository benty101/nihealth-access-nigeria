
import React, { useState, useEffect } from 'react';
import { Shield, Users, Building2, FileText, Settings, Pill, TestTube, Video, Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import UserManagement from './UserManagement';
import HospitalManagement from './HospitalManagement';
import InsuranceManagement from './InsuranceManagement';
import PharmacyManagement from './PharmacyManagement';
import LabManagement from './LabManagement';
import TelemedicineManagement from './TelemedicineManagement';

interface DashboardStats {
  totalUsers: number;
  totalHospitals: number;
  totalPharmacies: number;
  totalLabs: number;
  totalInsurancePlans: number;
  totalTelemedicineProviders: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
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
      
      // Fetch all stats in parallel
      const [
        usersResult,
        hospitalsResult,
        pharmaciesResult,
        labsResult,
        insuranceResult,
        telemedicineResult
      ] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('hospitals').select('id', { count: 'exact', head: true }),
        supabase.from('pharmacies').select('id', { count: 'exact', head: true }),
        supabase.from('labs').select('id', { count: 'exact', head: true }),
        supabase.from('insurance_plans').select('id', { count: 'exact', head: true }),
        supabase.from('telemedicine_providers').select('id', { count: 'exact', head: true })
      ]);

      setStats({
        totalUsers: usersResult.count || 0,
        totalHospitals: hospitalsResult.count || 0,
        totalPharmacies: pharmaciesResult.count || 0,
        totalLabs: labsResult.count || 0,
        totalInsurancePlans: insuranceResult.count || 0,
        totalTelemedicineProviders: telemedicineResult.count || 0,
      });

    } catch (error) {
      console.error('Error fetching stats:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics",
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
              <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
              <p className="text-gray-600">Manage all platform services and configurations</p>
            </div>
          </div>
        </div>

        {/* Real-time Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stats.totalUsers.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hospitals</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stats.totalHospitals}
              </div>
              <p className="text-xs text-muted-foreground">Medical facilities</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pharmacies</CardTitle>
              <Pill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stats.totalPharmacies}
              </div>
              <p className="text-xs text-muted-foreground">Drug stores</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Labs</CardTitle>
              <TestTube className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stats.totalLabs}
              </div>
              <p className="text-xs text-muted-foreground">Testing centers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Insurance Plans</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stats.totalInsurancePlans}
              </div>
              <p className="text-xs text-muted-foreground">Available plans</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Telemedicine</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stats.totalTelemedicineProviders}
              </div>
              <p className="text-xs text-muted-foreground">Online doctors</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
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

export default AdminDashboard;
