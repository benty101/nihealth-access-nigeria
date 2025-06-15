
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { adminDataService, type SystemStats } from '@/services/AdminDataService';
import SystemOverview from './SystemOverview';
import HospitalManagement from './HospitalManagement';
import InsuranceManagement from './InsuranceManagement';
import PharmacyManagement from './PharmacyManagement';
import LabManagement from './LabManagement';
import TelemedicineManagement from './TelemedicineManagement';
import MedicationManagement from './MedicationManagement';
import LabTestManagement from './LabTestManagement';
import SuperAdminHeader from './dashboard/SuperAdminHeader';
import ConnectionErrorState from './dashboard/ConnectionErrorState';

const SuperAdminDashboard = () => {
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
    lastSyncTime: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const { toast } = useToast();

  useEffect(() => {
    initializeDashboard();
  }, []);

  const initializeDashboard = async () => {
    console.log('SuperAdminDashboard: Initializing comprehensive dashboard with frontend sync...');
    setLoading(true);
    setConnectionStatus('checking');

    try {
      // First check database connection
      const isConnected = await adminDataService.checkDatabaseConnection();
      
      if (!isConnected) {
        setConnectionStatus('disconnected');
        toast({
          title: "Connection Error",
          description: "Unable to connect to the database. Please check your connection.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      setConnectionStatus('connected');
      
      // Sync frontend data first
      await adminDataService.syncFrontendData();
      
      // Fetch comprehensive system statistics
      const systemStats = await adminDataService.getSystemStats();
      setStats(systemStats);

      // Show appropriate status toast
      if (systemStats.errors.length > 0) {
        toast({
          title: "Partial System Load",
          description: `${systemStats.loadedServices.length}/7 services loaded. ${systemStats.errors.length} error(s) detected.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "System Ready - Frontend Synced",
          description: "All services loaded and synced with frontend data. Dashboard reflects real listings.",
        });
      }

      console.log('SuperAdminDashboard: Dashboard initialization complete with frontend sync', {
        servicesLoaded: systemStats.loadedServices.length,
        errorsCount: systemStats.errors.length,
        frontendData: {
          activeHospitals: `${systemStats.activeHospitals}/${systemStats.totalHospitals}`,
          activePharmacies: `${systemStats.activePharmacies}/${systemStats.totalPharmacies}`,
          activeLabs: `${systemStats.activeLabs}/${systemStats.totalLabs}`,
          activeMedications: `${systemStats.activeMedications}/${systemStats.totalMedications}`,
          activeLabTests: `${systemStats.activeLabTests}/${systemStats.totalLabTests}`,
          lastSync: systemStats.lastSyncTime
        }
      });

    } catch (error) {
      console.error('SuperAdminDashboard: Critical initialization error:', error);
      setConnectionStatus('disconnected');
      toast({
        title: "System Error",
        description: "Failed to initialize dashboard or sync frontend data. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    console.log('SuperAdminDashboard: Manual refresh with frontend sync triggered');
    toast({
      title: "Syncing Frontend Data",
      description: "Updating all statistics to reflect current frontend listings...",
    });
    await initializeDashboard();
  };

  if (connectionStatus === 'disconnected') {
    return <ConnectionErrorState onRetry={handleRefresh} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <SuperAdminHeader loading={loading} onRefresh={handleRefresh} />

        {/* Management Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
            <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="labs">Laboratories</TabsTrigger>
            <TabsTrigger value="lab-tests">Test Catalog</TabsTrigger>
            <TabsTrigger value="telemedicine">Telemedicine</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <SystemOverview stats={stats} loading={loading} />
          </TabsContent>

          <TabsContent value="hospitals">
            <HospitalManagement onStatsChange={handleRefresh} />
          </TabsContent>

          <TabsContent value="pharmacies">
            <PharmacyManagement onStatsChange={handleRefresh} />
          </TabsContent>

          <TabsContent value="medications">
            <MedicationManagement onStatsChange={handleRefresh} />
          </TabsContent>

          <TabsContent value="labs">
            <LabManagement onStatsChange={handleRefresh} />
          </TabsContent>

          <TabsContent value="lab-tests">
            <LabTestManagement onStatsChange={handleRefresh} />
          </TabsContent>

          <TabsContent value="telemedicine">
            <TelemedicineManagement onStatsChange={handleRefresh} />
          </TabsContent>

          <TabsContent value="insurance">
            <InsuranceManagement onStatsChange={handleRefresh} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
