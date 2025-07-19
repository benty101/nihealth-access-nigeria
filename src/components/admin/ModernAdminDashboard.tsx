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
import { 
  BarChart3, 
  Users, 
  Building2, 
  Pill, 
  TestTube, 
  Shield, 
  Package,
  Activity,
  RefreshCw,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

import SystemOverview from './SystemOverview';
import UserManagement from './UserManagement';
import HospitalManagement from './HospitalManagement';
import MedicationManagement from './MedicationManagement';
import LabTestManagement from './LabTestManagement';
import InsuranceManagement from './InsuranceManagement';
import UnifiedOrderManagement from './UnifiedOrderManagement';
import { adminDataService, type SystemStats } from '@/services/AdminDataService';

const adminMenuItems = [
  { 
    id: 'overview', 
    title: 'Overview', 
    icon: BarChart3, 
    description: 'System analytics & insights'
  },
  { 
    id: 'users', 
    title: 'Users', 
    icon: Users, 
    description: 'User management & roles'
  },
  { 
    id: 'hospitals', 
    title: 'Hospitals', 
    icon: Building2, 
    description: 'Healthcare providers'
  },
  { 
    id: 'medications', 
    title: 'Medications', 
    icon: Pill, 
    description: 'Drug catalog & inventory'
  },
  { 
    id: 'laboratories', 
    title: 'Lab Tests', 
    icon: TestTube, 
    description: 'Diagnostic services'
  },
  { 
    id: 'insurance', 
    title: 'Insurance', 
    icon: Shield, 
    description: 'Plans & coverage'
  },
  { 
    id: 'orders', 
    title: 'Orders', 
    icon: Package, 
    description: 'Transaction management'
  }
];

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  stats: SystemStats | null;
}

const AdminSidebar = ({ activeTab, onTabChange, stats }: AdminSidebarProps) => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const getStatusCount = (tabId: string) => {
    if (!stats) return 0;
    
    switch (tabId) {
      case 'hospitals': return stats.totalHospitals;
      case 'medications': return stats.totalMedications;
      case 'laboratories': return stats.totalLabTests;
      case 'insurance': return stats.totalInsurancePlans;
      default: return 0;
    }
  };

  return (
    <Sidebar className="border-r border-border/40">
      <SidebarContent className="bg-card">
        <div className="p-6 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-foreground">MeddyPal Admin</h2>
                <p className="text-xs text-muted-foreground">System Control</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-6 py-4">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
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
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{item.title}</span>
                            {getStatusCount(item.id) > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                {getStatusCount(item.id)}
                              </Badge>
                            )}
                          </div>
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

interface AdminHeaderProps {
  loading: boolean;
  onRefresh: () => void;
  stats: SystemStats | null;
}

const AdminHeader = ({ loading, onRefresh, stats }: AdminHeaderProps) => {
  const healthStatus = stats?.errors?.length === 0 ? 'healthy' : 'warning';
  
  return (
    <div className="border-b border-border/40 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="hover:bg-muted/50" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">System Administration</h1>
            <div className="flex items-center gap-4 mt-1">
              <p className="text-sm text-muted-foreground">
                Manage and monitor all platform services
              </p>
              <div className="flex items-center gap-2">
                {healthStatus === 'healthy' ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
                <span className="text-xs text-muted-foreground">
                  System {healthStatus === 'healthy' ? 'Healthy' : 'Needs Attention'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRefresh} 
            disabled={loading}
            className="hover:bg-muted/50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Sync Data
          </Button>
        </div>
      </div>
    </div>
  );
};

const ModernAdminDashboard = () => {
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

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <SystemOverview stats={stats} loading={loading} />;
      case 'users':
        return <UserManagement />;
      case 'hospitals':
        return <HospitalManagement onStatsChange={loadStats} />;
      case 'medications':
        return <MedicationManagement onStatsChange={loadStats} />;
      case 'laboratories':
        return <LabTestManagement onStatsChange={loadStats} />;
      case 'insurance':
        return <InsuranceManagement onStatsChange={loadStats} />;
      case 'orders':
        return <UnifiedOrderManagement />;
      default:
        return <SystemOverview stats={stats} loading={loading} />;
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          stats={stats}
        />
        
        <div className="flex-1 flex flex-col">
          <AdminHeader 
            loading={loading} 
            onRefresh={loadStats} 
            stats={stats}
          />
          
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

export default ModernAdminDashboard;