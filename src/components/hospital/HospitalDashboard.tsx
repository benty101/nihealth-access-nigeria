
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, FileText, Activity, Stethoscope, UserPlus } from 'lucide-react';
import { hospitalManagementService } from '@/services/HospitalManagementService';
import DoctorManagement from './DoctorManagement';
import PatientRecords from './PatientRecords';
import ConsultationScheduler from './ConsultationScheduler';
import DoctorAvailability from './DoctorAvailability';

interface DashboardStats {
  doctorsCount: number;
  patientsCount: number;
  consultationsToday: number;
  activeRecords: number;
}

const HospitalDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    doctorsCount: 0,
    patientsCount: 0,
    consultationsToday: 0,
    activeRecords: 0
  });
  const [loading, setLoading] = useState(true);

  // For demo purposes, using a mock hospital ID
  // In real implementation, this would come from user's hospital assignment
  const hospitalId = "demo-hospital-id";

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const dashboardStats = await hospitalManagementService.getHospitalDashboardStats(hospitalId);
      setStats(dashboardStats);
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hospital Management Dashboard</h1>
        <p className="text-gray-600">Manage your hospital operations, doctors, and patients</p>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.doctorsCount}</div>
            <p className="text-xs text-muted-foreground">Active medical staff</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.patientsCount}</div>
            <p className="text-xs text-muted-foreground">Registered patients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Consultations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.consultationsToday}</div>
            <p className="text-xs text-muted-foreground">Scheduled for today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Records</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRecords}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="doctors" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="patients">Patient Records</TabsTrigger>
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="doctors" className="mt-6">
          <DoctorManagement hospitalId={hospitalId} onStatsUpdate={loadDashboardStats} />
        </TabsContent>

        <TabsContent value="patients" className="mt-6">
          <PatientRecords hospitalId={hospitalId} onStatsUpdate={loadDashboardStats} />
        </TabsContent>

        <TabsContent value="consultations" className="mt-6">
          <ConsultationScheduler hospitalId={hospitalId} onStatsUpdate={loadDashboardStats} />
        </TabsContent>

        <TabsContent value="availability" className="mt-6">
          <DoctorAvailability hospitalId={hospitalId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HospitalDashboard;
