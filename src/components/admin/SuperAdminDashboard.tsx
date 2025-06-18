
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SystemOverview from './SystemOverview';
import UserManagement from './UserManagement';
import HospitalManagement from './HospitalManagement';
import MedicationManagement from './MedicationManagement';
import LabTestManagement from './LabTestManagement';
import InsuranceManagement from './InsuranceManagement';
import OrderManagement from './OrderManagement';
import SuperAdminHeader from './dashboard/SuperAdminHeader';
import { adminDataService, SystemStats } from '@/services/AdminDataService';
import { 
  Users, 
  Building2, 
  Pill, 
  TestTube, 
  Shield, 
  BarChart3,
  Stethoscope,
  Package
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<SystemStats>({
    totalHospitals: 0,
    totalPharmacies: 0,
    totalLabs: 0,
    totalInsurancePlans: 0,
    totalTelemedicineProviders: 0,
    totalMedications: 0,
    totalLabTests: 0,
    activeHospitals: 0,
    activePharmacies: 0,
    activeLabs: 0,
    activeInsurancePlans: 0,
    activeTelemedicineProviders: 0,
    activeMedications: 0,
    activeLabTests: 0,
    errors: [],
    loadedServices: [],
    lastSyncTime: new Date().toISOString()
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const systemStats = await adminDataService.getSystemStats();
      setStats(systemStats);
    } catch (error) {
      console.error('Error loading system stats:', error);
      setStats(prev => ({
        ...prev,
        errors: ['Failed to load system statistics']
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    await loadStats();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SuperAdminHeader loading={loading} onRefresh={handleRefresh} />
      
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-1 text-xs">
              <BarChart3 className="h-3 w-3" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-1 text-xs">
              <Users className="h-3 w-3" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="hospitals" className="flex items-center gap-1 text-xs">
              <Building2 className="h-3 w-3" />
              <span className="hidden sm:inline">Hospitals</span>
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex items-center gap-1 text-xs">
              <Pill className="h-3 w-3" />
              <span className="hidden sm:inline">Medications</span>
            </TabsTrigger>
            <TabsTrigger value="laboratories" className="flex items-center gap-1 text-xs">
              <TestTube className="h-3 w-3" />
              <span className="hidden sm:inline">Laboratories</span>
            </TabsTrigger>
            <TabsTrigger value="insurance" className="flex items-center gap-1 text-xs">
              <Shield className="h-3 w-3" />
              <span className="hidden sm:inline">Insurance</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-1 text-xs">
              <Package className="h-3 w-3" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <SystemOverview stats={stats} loading={loading} />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="hospitals">
            <HospitalManagement />
          </TabsContent>

          <TabsContent value="medications">
            <MedicationManagement />
          </TabsContent>

          <TabsContent value="laboratories">
            <LabTestManagement />
          </TabsContent>

          <TabsContent value="insurance">
            <InsuranceManagement />
          </TabsContent>

          <TabsContent value="orders">
            <OrderManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
