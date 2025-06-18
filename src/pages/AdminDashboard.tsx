
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SuperAdminHeader from '@/components/admin/dashboard/SuperAdminHeader';
import UserManagement from '@/components/admin/UserManagement';
import HospitalManagement from '@/components/admin/HospitalManagement';
import LabManagement from '@/components/admin/LabManagement';
import MedicationManagement from '@/components/admin/MedicationManagement';
import OrderManagement from '@/components/admin/OrderManagement';
import SystemOverview from '@/components/admin/SystemOverview';
import InsuranceManagement from '@/components/admin/InsuranceManagement';
import LabTestManagement from '@/components/admin/LabTestManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { adminDataService } from '@/services/AdminDataService';
import type { SystemStats } from '@/services/AdminDataService';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await adminDataService.getSystemStats();
      setStats(data);
    } catch (error) {
      console.error("AdminDashboard: Error loading stats", error);
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SuperAdminHeader loading={loading} onRefresh={loadStats} />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
            <TabsTrigger value="test-catalog">Test Catalog</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <SystemOverview stats={stats} loading={loading} />
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <UserManagement />
          </TabsContent>

          <TabsContent value="hospitals" className="mt-6">
            <HospitalManagement onStatsChange={loadStats} />
          </TabsContent>

          <TabsContent value="test-catalog" className="mt-6">
            <LabTestManagement />
          </TabsContent>

          <TabsContent value="medications" className="mt-6">
            <MedicationManagement onStatsChange={loadStats} />
          </TabsContent>

          <TabsContent value="insurance" className="mt-6">
            <InsuranceManagement onStatsChange={loadStats} />
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <OrderManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
