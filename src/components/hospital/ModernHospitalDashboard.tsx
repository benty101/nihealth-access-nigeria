import React, { useState, useEffect } from 'react';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar 
} from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Calendar, 
  Users, 
  UserPlus, 
  Activity,
  Stethoscope,
  ClipboardList,
  TrendingUp,
  Clock,
  Heart,
  Building2,
  AlertCircle,
  Settings
} from 'lucide-react';
import { useHospitalAuth } from '@/hooks/useHospitalAuth';
import HospitalDashboard from './HospitalDashboard';
import DoctorManagement from './DoctorManagement';
import DoctorAvailability from './DoctorAvailability';
import PatientRecords from './PatientRecords';
import ConsultationScheduler from './ConsultationScheduler';
import HospitalRecentActivity from './HospitalRecentActivity';
import HospitalSettings from './HospitalSettings';

const hospitalMenuItems = [
  { 
    id: 'overview', 
    title: 'Dashboard', 
    icon: Activity, 
    description: 'Hospital performance & metrics'
  },
  { 
    id: 'doctors', 
    title: 'Medical Staff', 
    icon: UserPlus, 
    description: 'Doctor management & assignments'
  },
  { 
    id: 'availability', 
    title: 'Availability', 
    icon: Calendar, 
    description: 'Staff schedules & time slots'
  },
  { 
    id: 'consultations', 
    title: 'Consultations', 
    icon: Stethoscope, 
    description: 'Patient appointments & sessions'
  },
  { 
    id: 'patients', 
    title: 'Patient Records', 
    icon: ClipboardList, 
    description: 'Medical records & history'
  },
  { 
    id: 'settings', 
    title: 'Hospital Settings', 
    icon: Settings, 
    description: 'Facility configuration'
  }
];

interface HospitalSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  hospitalName?: string;
}

const HospitalSidebar = ({ activeTab, onTabChange, hospitalName }: HospitalSidebarProps) => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar className="border-r border-border/40">
      <SidebarContent className="bg-card">
        <div className="p-6 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-foreground">
                  {hospitalName || 'Hospital Portal'}
                </h2>
                <p className="text-xs text-muted-foreground">Management Dashboard</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-6 py-4">
            Hospital Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {hospitalMenuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    className={`mx-3 rounded-lg transition-all duration-200 ${
                      activeTab === item.id 
                        ? 'bg-primary text-primary-foreground shadow-md' 
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <button onClick={() => onTabChange(item.id)} className="w-full">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && (
                        <div className="flex-1 text-left">
                          <span className="font-medium">{item.title}</span>
                          <p className="text-xs opacity-70">{item.description}</p>
                        </div>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

const HospitalHeader = () => {
  return (
    <div className="border-b border-border/40 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="hover:bg-muted/50" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Hospital Management</h1>
            <p className="text-sm text-muted-foreground">
              Manage your healthcare facility operations
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModernHospitalDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { hospitalStaff, loading, isHospitalAdmin, getPrimaryHospitalId } = useHospitalAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying hospital access...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized access message for non-admin users
  if (!isHospitalAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You don't have permission to access the hospital management portal. 
            Please contact your administrator if you believe this is an error.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // For super admin, use a default hospital or show hospital selector
  const hospitalId = getPrimaryHospitalId() || "demo-hospital-id";
  const hospitalName = hospitalStaff?.hospitals?.name || "Hospital Management";

  const renderContent = () => {
    const handleStatsUpdate = () => {
      console.log('Stats updated for hospital:', hospitalId);
    };

    switch (activeTab) {
      case 'overview':
        return <HospitalDashboard />;
      case 'doctors':
        return <DoctorManagement hospitalId={hospitalId} onStatsUpdate={handleStatsUpdate} />;
      case 'availability':
        return <DoctorAvailability hospitalId={hospitalId} />;
      case 'consultations':
        return <ConsultationScheduler hospitalId={hospitalId} onStatsUpdate={handleStatsUpdate} />;
      case 'patients':
        return <PatientRecords hospitalId={hospitalId} onStatsUpdate={handleStatsUpdate} />;
      case 'settings':
        return <HospitalSettings hospitalId={hospitalId} />;
      default:
        return <HospitalDashboard />;
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <HospitalSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          hospitalName={hospitalName}
        />
        
        <div className="flex-1 flex flex-col">
          <HospitalHeader />
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="animate-fade-in">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ModernHospitalDashboard;