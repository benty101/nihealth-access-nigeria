
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Users, Package, Calendar } from 'lucide-react';
import SystemOverview from './SystemOverview';
import HospitalManagement from './HospitalManagement';
import OrderManagement from './OrderManagement';
import HospitalDashboard from '../hospital/HospitalDashboard';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your healthcare platform</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="hospitals" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Hospitals
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="hospital-ops" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Hospital Operations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <SystemOverview />
          </TabsContent>

          <TabsContent value="hospitals" className="mt-6">
            <HospitalManagement />
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="hospital-ops" className="mt-6">
            <HospitalDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
