import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import {
  Home,
  Calendar,
  FileText,
  Building2,
  TestTube2,
  Pill,
  Video,
  Shield,
  Stethoscope,
  Baby,
  Sparkles,
  Bot,
  Search,
  MessageCircle,
  User,
  BookOpen,
  TrendingUp,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Heart,
  Activity,
  Users,
  BarChart3,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavigationItem[];
}

interface NavigationSection {
  label: string;
  items: NavigationItem[];
}

const ModernSidebar = () => {
  const { user, signOut } = useAuth();
  const { role } = useUserRole();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['core']);

  const toggleSection = (sectionLabel: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionLabel) 
        ? prev.filter(s => s !== sectionLabel)
        : [...prev, sectionLabel]
    );
  };

  const getNavigationSections = (): NavigationSection[] => {
    const sections: NavigationSection[] = [
      {
        label: 'Core',
        items: [
          { label: 'Dashboard', path: '/dashboard', icon: Home },
          { label: 'My Health Portal', path: '/patient-portal', icon: Activity },
          { label: 'Medical Records', path: '/records', icon: FileText },
        ]
      },
      {
        label: 'Medical Services',
        items: [
          { label: 'Appointments', path: '/appointments', icon: Calendar },
          { label: 'Hospitals', path: '/hospitals', icon: Building2 },
          { label: 'Insurance', path: '/insurance', icon: Shield },
          { label: 'Labs', path: '/labs', icon: TestTube2 },
          { label: 'Pharmacy', path: '/pharmacy', icon: Pill },
          { label: 'Telemedicine', path: '/telemedicine', icon: Video },
        ]
      },
      {
        label: 'AI Health Assistant',
        items: [
          { label: 'AI Chat', path: '/ai-chat', icon: MessageCircle, badge: 'New' },
          { label: 'Symptom Checker', path: '/ai-assistant', icon: Bot },
          { label: 'Medical Search', path: '/medical-search', icon: Search },
        ]
      },
      {
        label: 'Specialized Care',
        items: [
          { label: 'Emergency', path: '/emergency', icon: Zap },
          { label: 'Diagnostics', path: '/diagnostics', icon: Stethoscope },
          { label: 'Pediatric Care', path: '/pediatric', icon: Baby },
          { label: 'Health Checkups', path: '/checkups', icon: Heart },
        ]
      },
      {
        label: 'Insights & Analytics',
        items: [
          { label: 'Health Insights', path: '/insights', icon: TrendingUp },
          { label: 'Premium Features', path: '/premium', icon: Sparkles },
        ]
      },
      {
        label: 'Resources',
        items: [
          { label: 'Health Resources', path: '/resources', icon: BookOpen },
          { label: 'My Profile', path: '/profile', icon: User },
        ]
      }
    ];

    // Add role-specific sections
    if (role === 'super_admin') {
      sections.push({
        label: 'Administration',
        items: [
          { label: 'System Admin', path: '/admin', icon: Settings },
          { label: 'Hospital Tools', path: '/hospital', icon: Building2 },
          { label: 'Broker Dashboard', path: '/broker', icon: TrendingUp },
          { label: 'ML Analytics', path: '/ml-analytics', icon: BarChart3 },
        ]
      });
    }

    if (role === 'hospital_admin') {
      sections.push({
        label: 'Hospital Management',
        items: [
          { label: 'Hospital Dashboard', path: '/hospital', icon: Building2 },
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
        "fixed left-0 top-0 h-full bg-card border-r border-border z-50 transition-all duration-300 ease-apple",
        isCollapsed ? "w-16" : "w-72",
        "lg:relative lg:z-auto"
      )}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-lg">MeddyPal</h1>
                <p className="text-xs text-muted-foreground">Your Health Partner</p>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto py-4">
          {navigationSections.map((section) => (
            <div key={section.label} className="mb-6">
              {!isCollapsed && (
                <button
                  onClick={() => toggleSection(section.label)}
                  className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>{section.label}</span>
                  <ChevronRight 
                    className={cn(
                      "h-4 w-4 transition-transform",
                      expandedSections.includes(section.label) && "rotate-90"
                    )} 
                  />
                </button>
              )}

              {(isCollapsed || expandedSections.includes(section.label)) && (
                <div className="space-y-1 px-2">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                        isActive 
                          ? "bg-primary text-primary-foreground shadow-sm" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <item.icon className={cn(
                        "h-5 w-5 flex-shrink-0",
                        isActive(item.path) ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                      )} />
                      
                      {!isCollapsed && (
                        <>
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <span className="px-2 py-0.5 text-xs bg-health-success text-white rounded-full">
                              {item.badge}
                            </span>
                          )}
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
        <div className="border-t border-border p-4 space-y-2">
          {!isCollapsed && user && (
            <div className="flex items-center space-x-3 p-2 rounded-lg bg-muted/50">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-primary-foreground">
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
              "w-full justify-start text-muted-foreground hover:text-foreground",
              isCollapsed && "justify-center"
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

export default ModernSidebar;