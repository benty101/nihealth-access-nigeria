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

  // Redesigned navigation flow based on user psychology and healthcare journey
  const primaryNavigation = [
    {
      id: 'wellness-hub',
      label: 'My Health',
      emoji: '🏠',
      icon: Activity,
      path: '/dashboard',
      gradient: 'from-emerald-500 to-teal-500',
      description: 'Your complete health overview',
      tip: 'Everything about your health in one place - tracking, insights, and progress',
      priority: 'high'
    },
    {
      id: 'quick-care',
      label: 'Quick Care',
      emoji: '⚡',
      icon: Zap,
      path: '/appointments',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Instant healthcare access',
      tip: 'Book appointments, teleconsults, or emergency care in under 2 minutes',
      priority: 'urgent',
      pulse: true
    },
    {
      id: 'protection',
      label: 'Protection',
      emoji: '🛡️',
      icon: Shield,
      path: '/insurance',
      gradient: 'from-purple-500 to-indigo-500',
      description: 'Health insurance & safety',
      tip: 'Protect yourself and family with smart insurance plans',
      priority: 'medium'
    },
    {
      id: 'discover',
      label: 'Discover',
      emoji: '🔍',
      icon: MapPin,
      path: '/hospitals',
      gradient: 'from-orange-500 to-red-500',
      description: 'Find the best healthcare',
      tip: 'Discover top-rated doctors, hospitals, and specialists near you',
      priority: 'medium'
    }
  ];

  // Add admin navigation for super admins
  if (role === 'super_admin') {
    primaryNavigation.push({
      id: 'admin-console',
      label: 'Admin',
      emoji: '✨',
      icon: Sparkles,
      path: '/admin',
      gradient: 'from-rose-500 to-pink-500',
      description: 'System administration',
      tip: 'Manage users, analytics, and system settings',
      priority: 'medium'
    });
  }

  // Enhanced services with better psychological grouping
  const serviceCategories = [
    {
      title: '🧪 Diagnostics & Tests',
      items: [
        {
          label: 'Lab Tests',
          icon: FlaskConical,
          path: '/labs',
          description: 'Home sample collection',
          badge: 'Same Day',
          color: 'text-green-600'
        },
        {
          label: 'Health Checkups',
          icon: Heart,
          path: '/checkups',
          description: 'Comprehensive health screening',
          badge: 'Popular',
          color: 'text-red-500'
        }
      ]
    },
    {
      title: '💊 Treatment & Care',
      items: [
        {
          label: 'Online Pharmacy',
          icon: Pill,
          path: '/pharmacy',
          description: 'Medicines delivered fast',
          badge: '30% Off',
          color: 'text-blue-600'
        },
        {
          label: 'Telemedicine',
          icon: Video,
          path: '/telemedicine',
          description: 'Doctor consultations online',
          badge: 'Available 24/7',
          color: 'text-purple-600'
        }
      ]
    },
    {
      title: '📋 Records & Insights',
      items: [
        {
          label: 'Health Records',
          icon: BookOpen,
          path: '/records',
          description: 'Your medical history',
          badge: null,
          color: 'text-gray-600'
        },
        {
          label: 'Health Insights',
          icon: TrendingUp,
          path: '/insights',
          description: 'Personalized health analytics',
          badge: 'AI Powered',
          color: 'text-indigo-600'
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
      <nav className={`flex items-center gap-2 bg-gradient-to-r from-white/95 to-gray-50/95 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-xl border border-white/30 ${className}`}>
        {/* Primary Navigation - Main User Journey */}
        {primaryNavigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <Link
                  to={item.path}
                  className={`
                    relative flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 group
                    ${active 
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg scale-105 font-semibold` 
                      : 'hover:bg-white/80 hover:shadow-md hover:scale-105 text-gray-700 hover:text-gray-900'
                    }
                    ${item.pulse ? 'animate-pulse' : ''}
                  `}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className={`relative ${item.priority === 'urgent' ? 'animate-bounce' : ''}`}>
                    <span className="text-base mr-1">{item.emoji}</span>
                    {item.priority === 'urgent' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-ping" />
                    )}
                  </div>
                  
                  <span className="font-medium text-sm whitespace-nowrap">
                    {item.label}
                  </span>
                  
                  {/* High priority sparkle effect */}
                  {item.priority === 'high' && hoveredItem === item.id && (
                    <Star className="h-4 w-4 text-yellow-400 animate-spin" />
                  )}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-gray-900 text-white p-4 max-w-sm rounded-xl">
                <div className="space-y-2">
                  <p className="font-semibold text-white">{item.description}</p>
                  <p className="text-sm text-gray-300">{item.tip}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}

        {/* Beautiful separator */}
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-3" />

        {/* Enhanced Services Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-white/80 hover:shadow-md hover:scale-105 transition-all duration-300 text-gray-700 hover:text-gray-900"
            >
              <div className="relative">
                <Plus className="h-5 w-5" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              </div>
              <span className="font-medium text-sm">All Services</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-80 p-4 bg-white/95 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl">
            {serviceCategories.map((category, categoryIndex) => (
              <div key={category.title} className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-800 flex items-center gap-2 px-2">
                  {category.title}
                </h4>
                <div className="grid gap-2">
                  {category.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.path} asChild className="p-0">
                        <Link
                          to={item.path}
                          className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group border border-transparent hover:border-blue-100"
                        >
                          <div className={`flex-shrink-0 p-2.5 bg-gradient-to-br from-gray-50 to-white rounded-lg group-hover:shadow-md transition-all ${item.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm text-gray-800">{item.label}</p>
                              {item.badge && (
                                <span className="px-2 py-1 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 text-xs rounded-full font-medium">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600">{item.description}</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </div>
                {categoryIndex < serviceCategories.length - 1 && (
                  <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                )}
              </div>
            ))}
            
            <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4" />
            
            {/* Emergency Actions */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-600 px-2 uppercase tracking-wide">🚨 Need Help?</p>
              <div className="grid gap-2">
                {urgentActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.label}
                      className={`w-full justify-start gap-3 h-auto px-4 py-3 rounded-xl ${action.color} transition-all duration-300 hover:scale-105`}
                      onClick={action.action}
                      asChild={action.path ? true : false}
                    >
                      {action.path ? (
                        <Link to={action.path} className="flex items-center gap-3">
                          <Icon className="h-5 w-5" />
                          <div className="text-left">
                            <div className="font-semibold text-sm">{action.label}</div>
                            <div className="text-xs opacity-90">{action.description}</div>
                          </div>
                        </Link>
                      ) : (
                        <>
                          <Icon className="h-5 w-5" />
                          <div className="text-left">
                            <div className="font-semibold text-sm">{action.label}</div>
                            <div className="text-xs opacity-90">{action.description}</div>
                          </div>
                        </>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-1 ml-2 border-l border-gray-200 pl-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 w-9 p-0 text-red-600 hover:text-white hover:bg-red-500 transition-all duration-300 rounded-full"
                onClick={() => window.location.href = 'tel:199'}
              >
                <Phone className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Emergency Call</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 w-9 p-0 hover:bg-gray-100 transition-all duration-300 rounded-full"
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
                className="h-9 w-9 p-0 hover:bg-gray-100 transition-all duration-300 rounded-full relative"
              >
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
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