import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SystemOverview from './SystemOverview';
import UserManagement from './UserManagement';
import HospitalManagement from './HospitalManagement';
import PharmacyManagement from './PharmacyManagement';
import LabManagement from './LabManagement';
import MedicationManagement from './MedicationManagement';
import LabTestManagement from './LabTestManagement';
import TelemedicineManagement from './TelemedicineManagement';
import InsuranceManagement from './InsuranceManagement';
import InsuranceApiManagement from './InsuranceApiManagement';
import SuperAdminHeader from './dashboard/SuperAdminHeader';
import { 
  Users, 
  Building2, 
  Pill, 
  TestTube, 
  Video, 
  Shield, 
  Settings,
  BarChart3,
  Database,
  Stethoscope,
  Bot
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <SuperAdminHeader />
      
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 mb-6">
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
            <TabsTrigger value="pharmacies" className="flex items-center gap-1 text-xs">
              <Pill className="h-3 w-3" />
              <span className="hidden sm:inline">Pharmacies</span>
            </TabsTrigger>
            <TabsTrigger value="labs" className="flex items-center gap-1 text-xs">
              <TestTube className="h-3 w-3" />
              <span className="hidden sm:inline">Labs</span>
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex items-center gap-1 text-xs">
              <Database className="h-3 w-3" />
              <span className="hidden sm:inline">Medications</span>
            </TabsTrigger>
            <TabsTrigger value="lab-tests" className="flex items-center gap-1 text-xs">
              <Stethoscope className="h-3 w-3" />
              <span className="hidden sm:inline">Tests</span>
            </TabsTrigger>
            <TabsTrigger value="telemedicine" className="flex items-center gap-1 text-xs">
              <Video className="h-3 w-3" />
              <span className="hidden sm:inline">Telemedicine</span>
            </TabsTrigger>
            <TabsTrigger value="insurance" className="flex items-center gap-1 text-xs">
              <Shield className="h-3 w-3" />
              <span className="hidden sm:inline">Insurance</span>
            </TabsTrigger>
            <TabsTrigger value="insurance-api" className="flex items-center gap-1 text-xs">
              <Bot className="h-3 w-3" />
              <span className="hidden sm:inline">API</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <SystemOverview />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="hospitals">
            <HospitalManagement />
          </TabsContent>

          <TabsContent value="pharmacies">
            <PharmacyManagement />
          </TabsContent>

          <TabsContent value="labs">
            <LabManagement />
          </TabsContent>

          <TabsContent value="medications">
            <MedicationManagement />
          </TabsContent>

          <TabsContent value="lab-tests">
            <LabTestManagement />
          </TabsContent>

          <TabsContent value="telemedicine">
            <TelemedicineManagement />
          </TabsContent>

          <TabsContent value="insurance">
            <InsuranceManagement />
          </TabsContent>

          <TabsContent value="insurance-api">
            <InsuranceApiManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
