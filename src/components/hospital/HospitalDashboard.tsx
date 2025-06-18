
import React, { useState, useEffect } from 'react';
import { Building2, Users, Calendar, FileText, Settings, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { hospitalManagementService } from '@/services/HospitalManagementService';
import HospitalOnboarding from './HospitalOnboarding';
import DoctorManagement from './DoctorManagement';
import PatientRecords from './PatientRecords';
import ConsultationScheduler from './ConsultationScheduler';

interface HospitalStaff {
  id: string;
  hospital_id: string;
  user_id: string;
  position: string;
  is_active: boolean;
  hospital: {
    id: string;
    name: string;
    address?: string;
    phone?: string;
    email?: string;
  };
}

const HospitalDashboard = () => {
  const { user } = useAuth();
  const { role, loading: roleLoading } = useUserRole();
  const { toast } = useToast();
  const [hospitalStaff, setHospitalStaff] = useState<HospitalStaff | null>(null);
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    doctorsCount: 0,
    patientsCount: 0,
    consultationsToday: 0,
    activeRecords: 0
  });

  useEffect(() => {
    if (user && role === 'hospital_admin') {
      checkHospitalStaffStatus();
    } else if (!roleLoading) {
      setLoading(false);
    }
  }, [user, role, roleLoading]);

  const checkHospitalStaffStatus = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('hospital_staff')
        .select(`
          *,
          hospital:hospitals(
            id,
            name,
            address,
            phone,
            email
          )
        `)
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setHospitalStaff(data);
      if (data?.hospital_id) {
        loadDashboardStats(data.hospital_id);
      }
    } catch (error: any) {
      console.error('Error checking hospital staff status:', error);
      toast({
        title: "Error",
        description: "Failed to load hospital information",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardStats = async (hospitalId: string) => {
    try {
      const stats = await hospitalManagementService.getHospitalDashboardStats(hospitalId);
      setDashboardStats(stats);
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
      // Don't show error toast for stats, just log it
    }
  };

  const handleStatsUpdate = () => {
    if (hospitalStaff?.hospital_id) {
      loadDashboardStats(hospitalStaff.hospital_id);
    }
  };

  if (roleLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show onboarding if user is not linked to a hospital
  if (role === 'patient' || (role === 'hospital_admin' && !hospitalStaff)) {
    return <HospitalOnboarding />;
  }

  if (role !== 'hospital_admin' && role !== 'super_admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
              <p className="text-gray-600">
                You don't have permission to access the hospital dashboard.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
              {hospitalStaff?.hospital && (
                <p className="text-lg text-gray-600 mt-1">
                  {hospitalStaff.hospital.name}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Hospital Admin
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Doctors</p>
                  <p className="text-2xl font-bold">{dashboardStats.doctorsCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                  <p className="text-2xl font-bold">{dashboardStats.consultationsToday}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Records</p>
                  <p className="text-2xl font-bold">{dashboardStats.activeRecords}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold">{dashboardStats.patientsCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your hospital</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New patient registered</p>
                        <p className="text-xs text-gray-500">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Appointment scheduled</p>
                        <p className="text-xs text-gray-500">15 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Medical record updated</p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hospital Information</CardTitle>
                  <CardDescription>Your hospital details</CardDescription>
                </CardHeader>
                <CardContent>
                  {hospitalStaff?.hospital && (
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Name</p>
                        <p className="text-sm">{hospitalStaff.hospital.name}</p>
                      </div>
                      {hospitalStaff.hospital.address && (
                        <div>
                          <p className="text-sm font-medium text-gray-600">Address</p>
                          <p className="text-sm">{hospitalStaff.hospital.address}</p>
                        </div>
                      )}
                      {hospitalStaff.hospital.phone && (
                        <div>
                          <p className="text-sm font-medium text-gray-600">Phone</p>
                          <p className="text-sm">{hospitalStaff.hospital.phone}</p>
                        </div>
                      )}
                      {hospitalStaff.hospital.email && (
                        <div>
                          <p className="text-sm font-medium text-gray-600">Email</p>
                          <p className="text-sm">{hospitalStaff.hospital.email}</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="doctors">
            <DoctorManagement 
              hospitalId={hospitalStaff?.hospital_id} 
              onStatsUpdate={handleStatsUpdate}
            />
          </TabsContent>

          <TabsContent value="patients">
            <PatientRecords 
              hospitalId={hospitalStaff?.hospital_id} 
              onStatsUpdate={handleStatsUpdate}
            />
          </TabsContent>

          <TabsContent value="appointments">
            <ConsultationScheduler 
              hospitalId={hospitalStaff?.hospital_id} 
              onStatsUpdate={handleStatsUpdate}
            />
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Hospital Settings</CardTitle>
                <CardDescription>Manage your hospital configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HospitalDashboard;
