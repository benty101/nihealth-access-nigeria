import React, { useState } from 'react';
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
import { 
  Calendar, 
  Users, 
  UserPlus, 
  Activity,
  Stethoscope,
  ClipboardList,
  TrendingUp,
  Clock,
  Heart
} from 'lucide-react';
import HospitalDashboard from './HospitalDashboard';
import DoctorManagement from './DoctorManagement';
import PatientRecords from './PatientRecords';
import ConsultationScheduler from './ConsultationScheduler';
import HospitalRecentActivity from './HospitalRecentActivity';

const hospitalMenuItems = [
  { 
    id: 'overview', 
    title: 'Overview', 
    icon: Activity, 
    description: 'Hospital analytics & insights'
  },
  { 
    id: 'appointments', 
    title: 'Appointments', 
    icon: Calendar, 
    description: 'Schedule & manage consultations'
  },
  { 
    id: 'doctors', 
    title: 'Doctors', 
    icon: UserPlus, 
    description: 'Medical staff management'
  },
  { 
    id: 'patients', 
    title: 'Patient Records', 
    icon: ClipboardList, 
    description: 'Patient information & history'
  },
  { 
    id: 'consultations', 
    title: 'Consultations', 
    icon: Stethoscope, 
    description: 'Active & scheduled consultations'
  }
];

interface HospitalSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const HospitalSidebar = ({ activeTab, onTabChange }: HospitalSidebarProps) => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar className="border-r border-border/40">
      <SidebarContent className="bg-card">
        <div className="p-6 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-foreground">Hospital Portal</h2>
                <p className="text-xs text-muted-foreground">Management Hub</p>
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

  const renderContent = () => {
    const dummyHospitalId = "hospital-1"; // This would come from auth context in real app
    const handleStatsUpdate = () => {
      // Handle stats update
      console.log('Stats updated');
    };

    switch (activeTab) {
      case 'overview':
        return <HospitalDashboard />;
      case 'appointments':
        return <ConsultationScheduler hospitalId={dummyHospitalId} onStatsUpdate={handleStatsUpdate} />;
      case 'doctors':
        return <DoctorManagement hospitalId={dummyHospitalId} onStatsUpdate={handleStatsUpdate} />;
      case 'patients':
        return <PatientRecords hospitalId={dummyHospitalId} onStatsUpdate={handleStatsUpdate} />;
      case 'consultations':
        return <HospitalRecentActivity hospitalId={dummyHospitalId} />;
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