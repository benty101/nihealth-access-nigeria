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
  Video
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  contextualHints: string[];
}

export const PsychologicalNavigation: React.FC<{ className?: string }> = ({ className }) => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: '🏠 Health Hub',
      path: '/dashboard',
      icon: Activity,
      description: 'Your complete health overview & timeline',
      urgency: 'medium',
      contextualHints: ['Health timeline', 'Recent visits', 'Upcoming care', 'Health metrics']
    },
    {
      id: 'book-care',
      label: '⚡ Book Care',
      path: '/appointments',
      icon: Calendar,
      description: 'Schedule appointments & consultations fast',
      urgency: 'high',
      contextualHints: ['Quick appointment', 'Find doctors', 'Emergency booking', 'Telemedicine']
    },
    {
      id: 'insurance',
      label: '🛡️ Insurance',
      path: '/insurance',
      icon: Shield,
      description: 'Manage coverage & process claims',
      urgency: 'medium',
      contextualHints: ['Coverage details', 'Claims status', 'Compare plans', 'Benefits']
    },
    {
      id: 'find-care',
      label: '📍 Find Care',
      path: '/hospitals',
      icon: MapPin,
      description: 'Discover hospitals & specialists nearby',
      urgency: 'medium',
      contextualHints: ['Nearby hospitals', 'Specialist doctors', 'Reviews & ratings', 'Directions']
    }
  ];

  // Add admin navigation for super admins
  if (role === 'super_admin') {
    navigationItems.push({
      id: 'admin-console',
      label: '✨ Command Center',
      path: '/admin',
      icon: Sparkles,
      description: 'System administration & analytics',
      urgency: 'medium',
      contextualHints: ['User management', 'System health', 'Analytics', 'Settings']
    });
  }

  const isActive = (path: string) => location.pathname === path;

  const getUrgencyStyle = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'relative after:absolute after:-top-1 after:-right-1 after:w-2 after:h-2 after:bg-red-500 after:rounded-full after:animate-pulse';
      case 'medium':
        return 'relative after:absolute after:-top-1 after:-right-1 after:w-2 after:h-2 after:bg-yellow-500 after:rounded-full';
      default:
        return '';
    }
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {/* Core Navigation Items */}
      <div className="flex items-center space-x-1">
        {navigationItems.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            className="relative"
          >
            <Link
              to={item.path}
              className={`
                group relative flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200
                ${isActive(item.path)
                  ? 'bg-gradient-to-r from-primary/15 to-primary/10 text-primary shadow-md border border-primary/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:shadow-sm'
                }
                ${getUrgencyStyle(item.urgency)}
              `}
            >
              <item.icon className={`h-4 w-4 transition-transform duration-200 ${
                hoveredItem === item.id ? 'scale-110' : ''
              }`} />
              
              <span className="text-sm font-medium">{item.label}</span>

              {/* Enhanced Contextual Tooltip */}
              {hoveredItem === item.id && (
                <div className="absolute top-full left-0 mt-2 p-4 bg-white border shadow-xl rounded-lg z-50 min-w-72 animate-fade-in">
                  <div className="mb-2">
                    <p className="text-sm font-semibold text-foreground mb-1">{item.label.replace(/[^\w\s]/gi, '').trim()}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  
                  <div className="border-t pt-2">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Quick Actions:</p>
                    <div className="grid grid-cols-2 gap-1">
                      {item.contextualHints.map((hint, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground cursor-pointer p-1 rounded hover:bg-muted/50">
                          <ArrowRight className="h-2 w-2" />
                          {hint}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>

      {/* More Services Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 flex items-center gap-1"
          >
            More Services
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 bg-white border shadow-lg z-50">
          <div className="p-2">
            <p className="text-xs font-semibold text-muted-foreground mb-2">🧪 Lab & Testing</p>
            <DropdownMenuItem asChild>
              <Link to="/labs" className="flex items-center gap-3 w-full cursor-pointer hover:bg-primary/5 p-2 rounded">
                <TestTube className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="font-medium">Book Lab Test</p>
                  <p className="text-xs text-muted-foreground">Blood work, scans & more</p>
                </div>
              </Link>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator />

          <div className="p-2">
            <p className="text-xs font-semibold text-muted-foreground mb-2">💊 Pharmacy & Care</p>
            <DropdownMenuItem asChild>
              <Link to="/pharmacy" className="flex items-center gap-3 w-full cursor-pointer hover:bg-primary/5 p-2 rounded">
                <Pill className="h-4 w-4 text-green-600" />
                <div>
                  <p className="font-medium">Buy Medicine</p>
                  <p className="text-xs text-muted-foreground">Prescriptions & supplements</p>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link to="/pediatric" className="flex items-center gap-3 w-full cursor-pointer hover:bg-primary/5 p-2 rounded">
                <Baby className="h-4 w-4 text-pink-600" />
                <div>
                  <p className="font-medium">Mother & Child</p>
                  <p className="text-xs text-muted-foreground">Pregnancy & pediatric care</p>
                </div>
              </Link>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator />

          <div className="p-2">
            <p className="text-xs font-semibold text-muted-foreground mb-2">📱 Digital Health</p>
            <DropdownMenuItem asChild>
              <Link to="/telemedicine" className="flex items-center gap-3 w-full cursor-pointer hover:bg-primary/5 p-2 rounded">
                <Video className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="font-medium">Telemedicine</p>
                  <p className="text-xs text-muted-foreground">Virtual consultations</p>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link to="/records" className="flex items-center gap-3 w-full cursor-pointer hover:bg-primary/5 p-2 rounded">
                <Activity className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="font-medium">Health Records</p>
                  <p className="text-xs text-muted-foreground">Medical history & files</p>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link to="/resources" className="flex items-center gap-3 w-full cursor-pointer hover:bg-primary/5 p-2 rounded">
                <Heart className="h-4 w-4 text-red-600" />
                <div>
                  <p className="font-medium">Health Resources</p>
                  <p className="text-xs text-muted-foreground">Tips, guides & education</p>
                </div>
              </Link>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Contextual Quick Actions */}
      <div className="flex items-center gap-1 ml-4 border-l pl-4">
        {/* Emergency Access */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => window.location.href = '/emergency'}
          title="Emergency Services"
        >
          <Zap className="h-4 w-4" />
        </Button>

        {/* Quick Search */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          title="Search"
        >
          <Search className="h-4 w-4" />
        </Button>

        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};