import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SuperAdminHeader from '@/components/admin/SuperAdminHeader';
import UserManagement from '@/components/admin/UserManagement';
import HospitalManagement from '@/components/admin/HospitalManagement';
import PharmacyManagement from '@/components/admin/PharmacyManagement';
import LabManagement from '@/components/admin/LabManagement';
import MedicationManagement from '@/components/admin/MedicationManagement';
import OrderManagement from '@/components/admin/OrderManagement';
import SystemOverview from '@/components/admin/SystemOverview';
import DataImportTools from '@/components/admin/DataImportTools';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { adminService } from '@/services/AdminService';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await adminService.getSystemStats();
      setStats(data);
    } catch (error) {
      console.error("AdminDashboard: Error loading stats", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SuperAdminHeader />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
            <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
            <TabsTrigger value="labs">Labs</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="import">Import Data</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <SystemOverview stats={stats} onStatsChange={loadStats} />
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <UserManagement />
          </TabsContent>

          <TabsContent value="hospitals" className="mt-6">
            <HospitalManagement onStatsChange={loadStats} />
          </TabsContent>

          <TabsContent value="pharmacies" className="mt-6">
            <PharmacyManagement onStatsChange={loadStats} />
          </TabsContent>

          <TabsContent value="labs" className="mt-6">
            <LabManagement onStatsChange={loadStats} />
          </TabsContent>

          <TabsContent value="medications" className="mt-6">
            <MedicationManagement onStatsChange={loadStats} />
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="import" className="mt-6">
            <DataImportTools />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
