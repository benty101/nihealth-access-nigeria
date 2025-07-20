import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUserRole } from '@/hooks/useUserRole';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Heart, 
  Calendar, 
  Shield, 
  MapPin, 
  Activity,
  Sparkles,
  Zap,
  ArrowRight,
  Search,
  Bell,
  ChevronDown,
  TestTube,
  Pill,
  Baby,
  Video,
  Plus,
  BookOpen,
  TrendingUp,
  Phone,
  Users,
  Clock,
  Star,
  FlaskConical,
  Stethoscope
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const PsychologicalNavigation: React.FC<{ className?: string }> = ({ className }) => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;

  // Clean navigation flow
  const primaryNavigation = [
    {
      id: 'my-health',
      label: 'My Health',
      icon: Activity,
      path: '/dashboard',
      description: 'Your health overview'
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: Calendar,
      path: '/appointments',
      description: 'Book and manage appointments'
    },
    {
      id: 'insurance',
      label: 'Insurance',
      icon: Shield,
      path: '/insurance',
      description: 'Health insurance plans'
    },
    {
      id: 'hospitals',
      label: 'Hospitals',
      icon: MapPin,
      path: '/hospitals',
      description: 'Find healthcare providers'
    }
  ];

  // Add admin navigation for super admins
  if (role === 'super_admin') {
    primaryNavigation.push({
      id: 'admin',
      label: 'Admin',
      icon: Sparkles,
      path: '/admin',
      description: 'System administration'
    });
  }

  // Service categories
  const serviceCategories = [
    {
      title: 'Diagnostics & Tests',
      items: [
        {
          label: 'Lab Tests',
          icon: FlaskConical,
          path: '/labs',
          description: 'Home sample collection',
          badge: 'Same Day'
        },
        {
          label: 'Health Checkups',
          icon: Heart,
          path: '/checkups',
          description: 'Comprehensive screening',
          badge: 'Popular'
        }
      ]
    },
    {
      title: 'Treatment & Care',
      items: [
        {
          label: 'Online Pharmacy',
          icon: Pill,
          path: '/pharmacy',
          description: 'Medicine delivery',
          badge: null
        },
        {
          label: 'Telemedicine',
          icon: Video,
          path: '/telemedicine',
          description: 'Online consultations',
          badge: '24/7'
        }
      ]
    },
    {
      title: 'Records & Insights',
      items: [
        {
          label: 'Health Records',
          icon: BookOpen,
          path: '/records',
          description: 'Medical history',
          badge: null
        },
        {
          label: 'Health Insights',
          icon: TrendingUp,
          path: '/insights',
          description: 'Health analytics',
          badge: 'AI'
        }
      ]
    }
  ];

  // Emergency and support actions
  const urgentActions = [
    {
      label: 'Emergency',
      icon: Phone,
      action: () => window.location.href = 'tel:199',
      color: 'bg-red-500 hover:bg-red-600 text-white shadow-lg',
      description: 'Call emergency services'
    },
    {
      label: 'Health Support',
      icon: Users,
      path: '/support',
      color: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg',
      description: '24/7 health guidance'
    }
  ];

  return (
    <TooltipProvider>
      <nav className={`flex items-center gap-1 bg-white/80 backdrop-blur-sm px-4 py-2 border-b border-gray-100 ${className}`}>
        {/* Primary Navigation - Clean and Minimal */}
        {primaryNavigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <Link
                  to={item.path}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium
                    ${active 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-popover text-popover-foreground">
                <p className="text-sm">{item.description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}

        {/* Subtle separator */}
        <div className="h-4 w-px bg-border mx-2" />

        {/* All Services Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <Plus className="h-4 w-4" />
              <span>All Services</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-72 p-3">
            {serviceCategories.map((category, categoryIndex) => (
              <div key={category.title} className="space-y-2">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2">
                  {category.title.replace(/[^\w\s]/gi, '').trim()}
                </h4>
                <div className="space-y-1">
                  {category.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.path} asChild>
                        <Link
                          to={item.path}
                          className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted"
                        >
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{item.label}</span>
                              {item.badge && (
                                <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded font-medium">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </div>
                {categoryIndex < serviceCategories.length - 1 && (
                  <DropdownMenuSeparator className="my-2" />
                )}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Quick Actions */}
        <div className="flex items-center gap-1 ml-2 border-l border-border pl-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              >
                <Search className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Search</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground relative"
              >
                <Bell className="h-4 w-4" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </nav>
    </TooltipProvider>
  );
};