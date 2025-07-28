import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import {
  Activity,
  Heart,
  Calendar,
  Shield,
  Building2,
  TestTube2,
  Pill,
  Video,
  Bot,
  Search,
  TrendingUp,
  BookOpen,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  FileText,
  Sparkles,
  Baby,
  Phone,
  BarChart3,
  MessageCircle,
  Stethoscope,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface NavigationItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  badge?: string;
  external?: boolean;
}

interface NavigationSection {
  id: string;
  label: string;
  description: string;
  items: NavigationItem[];
  color: string;
  defaultExpanded?: boolean;
}

const SimplifiedNavigation = () => {
  const { user, signOut } = useAuth();
  const { role } = useUserRole();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['my-health']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(s => s !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getNavigationSections = (): NavigationSection[] => {
    const sections: NavigationSection[] = [
      {
        id: 'my-health',
        label: 'My Health',
        description: 'Personal health management & overview',
        color: 'text-emerald-600',
        defaultExpanded: true,
        items: [
          { 
            label: 'Health Dashboard', 
            path: '/dashboard', 
            icon: Activity,
            description: 'Your complete health overview'
          },
          { 
            label: 'My Health Portal', 
            path: '/patient-portal', 
            icon: Heart,
            description: 'Personal health records & timeline'
          },
          { 
            label: 'Medical Records', 
            path: '/records', 
            icon: FileText,
            description: 'Access your medical history'
          },
          { 
            label: 'Health Timeline', 
            path: '/health-timeline', 
            icon: TrendingUp,
            description: 'Track your health journey'
          },
          { 
            label: 'My Profile', 
            path: '/profile', 
            icon: User,
            description: 'Manage your personal information'
          }
        ]
      },
      {
        id: 'care-services',
        label: 'Care & Services',
        description: 'Healthcare interactions & services',
        color: 'text-blue-600',
        items: [
          { 
            label: 'Book Appointments', 
            path: '/appointments', 
            icon: Calendar,
            description: 'Schedule with healthcare providers'
          },
          { 
            label: 'Find Hospitals', 
            path: '/hospitals', 
            icon: Building2,
            description: 'Locate healthcare facilities'
          },
          { 
            label: 'Health Insurance', 
            path: '/insurance', 
            icon: Shield,
            description: 'Manage your coverage'
          },
          { 
            label: 'Book Lab Tests', 
            path: '/labs', 
            icon: TestTube2,
            description: 'Order diagnostic tests',
            badge: 'Popular'
          },
          { 
            label: 'Online Pharmacy', 
            path: '/pharmacy', 
            icon: Pill,
            description: 'Order medications'
          },
          { 
            label: 'Telemedicine', 
            path: '/telemedicine', 
            icon: Video,
            description: 'Virtual consultations',
            badge: '24/7'
          },
          { 
            label: 'Emergency Care', 
            path: '/emergency', 
            icon: Phone,
            description: 'Emergency services & contacts'
          },
          { 
            label: 'Specialized Care', 
            path: '/pediatric', 
            icon: Baby,
            description: 'Mother & child care'
          }
        ]
      },
      {
        id: 'insights-tools',
        label: 'Insights & Tools',
        description: 'AI assistance & health analytics',
        color: 'text-purple-600',
        items: [
          { 
            label: 'AI Health Chat', 
            path: '/ai-chat', 
            icon: MessageCircle,
            description: 'Chat with AI health assistant',
            badge: 'Smart'
          },
          { 
            label: 'Symptom Checker', 
            path: '/ai-assistant', 
            icon: Bot,
            description: 'AI-powered symptom analysis',
            badge: 'Free'
          },
          { 
            label: 'Medical Search', 
            path: '/medical-search', 
            icon: Search,
            description: 'Search medical knowledge'
          },
          { 
            label: 'Health Insights', 
            path: '/insights', 
            icon: TrendingUp,
            description: 'Personalized health analytics',
            badge: 'AI'
          },
          { 
            label: 'Diagnostics', 
            path: '/diagnostics', 
            icon: Stethoscope,
            description: 'Advanced diagnostic tools'
          },
          { 
            label: 'Health Resources', 
            path: '/resources', 
            icon: BookOpen,
            description: 'Educational content & guides'
          },
          { 
            label: 'Premium Features', 
            path: '/premium', 
            icon: Sparkles,
            description: 'Unlock advanced capabilities'
          }
        ]
      }
    ];

    // Add role-specific sections
    if (role === 'super_admin') {
      sections.push({
        id: 'administration',
        label: 'Administration',
        description: 'System management & analytics',
        color: 'text-orange-600',
        items: [
          { 
            label: 'Admin Dashboard', 
            path: '/admin', 
            icon: Settings,
            description: 'System administration'
          },
          { 
            label: 'ML Analytics', 
            path: '/ml-analytics', 
            icon: BarChart3,
            description: 'Machine learning insights'
          },
          { 
            label: 'Hospital Management', 
            path: '/hospital', 
            icon: Building2,
            description: 'Hospital admin tools'
          },
          { 
            label: 'Broker Dashboard', 
            path: '/broker', 
            icon: TrendingUp,
            description: 'Insurance broker tools'
          }
        ]
      });
    }

    if (role === 'hospital_admin') {
      sections.push({
        id: 'hospital-management',
        label: 'Hospital Management',
        description: 'Hospital administration tools',
        color: 'text-indigo-600',
        items: [
          { 
            label: 'Hospital Dashboard', 
            path: '/hospital', 
            icon: Building2,
            description: 'Hospital management portal'
          }
        ]
      });
    }

    if (role === 'broker') {
      sections.push({
        id: 'broker-tools',
        label: 'Broker Tools',
        description: 'Insurance broker management',
        color: 'text-cyan-600',
        items: [
          { 
            label: 'Broker Dashboard', 
            path: '/broker', 
            icon: TrendingUp,
            description: 'Insurance broker portal'
          }
        ]
      });
    }

    return sections;
  };

  const isActive = (path: string) => location.pathname === path;

  const navigationSections = getNavigationSections();

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full bg-card/95 backdrop-blur-md border-r border-border z-50 transition-all duration-300 ease-apple",
        isCollapsed ? "w-16" : "w-80",
        "lg:relative lg:z-auto"
      )}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card/50">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-primary">MeddyPal</h1>
                <p className="text-xs text-muted-foreground">Your Health Companion</p>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-9 w-9 p-0 hover:bg-muted"
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>

        {/* Quick Emergency Access - Always Visible */}
        {!isCollapsed && (
          <div className="p-4 border-b border-border">
            <Button
              onClick={() => window.location.href = '/emergency'}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg"
              size="sm"
            >
              <Zap className="h-4 w-4 mr-2" />
              Emergency SOS
            </Button>
          </div>
        )}

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto py-2">
          {navigationSections.map((section) => (
            <div key={section.id} className="mb-2">
              {!isCollapsed && (
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center space-x-2">
                    <span className={cn("text-sm font-bold", section.color)}>
                      {section.label}
                    </span>
                  </div>
                  <ChevronRight 
                    className={cn(
                      "h-4 w-4 transition-transform text-muted-foreground group-hover:text-foreground",
                      expandedSections.includes(section.id) && "rotate-90"
                    )} 
                  />
                </button>
              )}

              {(isCollapsed || expandedSections.includes(section.id)) && (
                <div className="space-y-1 px-2 pb-2">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                        isActive 
                          ? "bg-primary text-primary-foreground shadow-sm" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                      )}
                    >
                      <item.icon className={cn(
                        "h-5 w-5 flex-shrink-0",
                        isActive(item.path) ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                      )} />
                      
                      {!isCollapsed && (
                        <>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="truncate">{item.label}</span>
                              {item.badge && (
                                <Badge 
                                  variant="secondary" 
                                  className="px-1.5 py-0.5 text-xs bg-primary/10 text-primary border-0"
                                >
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-xs text-muted-foreground truncate mt-0.5">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* User Profile & Actions */}
        <div className="border-t border-border p-4 space-y-3 bg-card/50">
          {!isCollapsed && user && (
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 border border-border/50">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {user.email?.[0]?.toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{role}</p>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            onClick={signOut}
            className={cn(
              "w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/60",
              isCollapsed && "justify-center px-0"
            )}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SimplifiedNavigation;