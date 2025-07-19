import React, { useState, useEffect } from 'react';
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
  Clock,
  Star,
  ArrowRight,
  Plus,
  Search,
  Bell,
  ChevronDown,
  TestTube,
  Pill,
  Baby,
  Video
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Psychological principle: Progressive disclosure with contextual grouping
interface NavigationContext {
  intent: 'discover' | 'urgent' | 'manage' | 'learn';
  userState: 'new' | 'returning' | 'engaged';
  timeOfDay: 'morning' | 'afternoon' | 'evening';
}

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  category: 'care' | 'manage' | 'learn' | 'admin';
  contextualHints: string[];
  visualWeight: number; // 1-10, affects size and prominence
}

export const usePsychologicalNavigation = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const location = useLocation();
  const [context, setContext] = useState<NavigationContext>({
    intent: 'discover',
    userState: 'new',
    timeOfDay: 'morning'
  });

  // Principle: Context-aware navigation that adapts to user behavior
  useEffect(() => {
    const hour = new Date().getHours();
    const timeOfDay = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
    
    // Analyze user behavior patterns
    const userState = !user ? 'new' : 
                     localStorage.getItem('meddypal_visits') ? 'returning' : 'engaged';
    
    setContext(prev => ({ ...prev, timeOfDay, userState }));
  }, [user]);

  const getCoreNavigationItems = (): NavigationItem[] => {
    const baseItems: NavigationItem[] = [
      {
        id: 'dashboard',
        label: 'Health Hub',
        path: '/dashboard',
        icon: Activity,
        description: 'Your health overview & timeline',
        urgency: 'medium',
        category: 'manage',
        contextualHints: ['Health timeline', 'Recent visits', 'Upcoming care'],
        visualWeight: 9
      },
      {
        id: 'book-care',
        label: 'Book Care',
        path: '/appointments',
        icon: Calendar,
        description: 'Schedule appointments & consultations',
        urgency: 'high',
        category: 'care',
        contextualHints: ['Book appointment', 'Find doctors', 'Quick consultation'],
        visualWeight: 10
      },
      {
        id: 'insurance',
        label: 'Insurance',
        path: '/insurance',
        icon: Shield,
        description: 'Manage coverage & claims',
        urgency: 'medium',
        category: 'manage',
        contextualHints: ['Coverage details', 'Claims status', 'Compare plans'],
        visualWeight: 7
      },
      {
        id: 'find-care',
        label: 'Find Care',
        path: '/hospitals',
        icon: MapPin,
        description: 'Hospitals & specialists near you',
        urgency: 'medium',
        category: 'care',
        contextualHints: ['Nearby hospitals', 'Specialist doctors', 'Reviews & ratings'],
        visualWeight: 8
      }
    ];

    // Add role-specific items with psychological weighting
    if (role === 'super_admin') {
      baseItems.push({
        id: 'admin-console',
        label: 'Command Center',
        path: '/admin',
        icon: Sparkles,
        description: 'System administration',
        urgency: 'medium',
        category: 'admin',
        contextualHints: ['System health', 'User management', 'Analytics'],
        visualWeight: 9
      });
    }

    return baseItems;
  };

  const getContextualActions = () => {
    const timeGreeting = context.timeOfDay === 'morning' ? 'Good morning!' : 
                        context.timeOfDay === 'afternoon' ? 'Good afternoon!' : 'Good evening!';
    
    const actions = [];
    
    // Smart contextual actions based on user state and time
    if (context.userState === 'new') {
      actions.push({
        id: 'onboarding',
        label: 'Complete Profile',
        description: `${timeGreeting} Complete your health profile to get personalized recommendations`,
        action: () => window.location.href = '/profile',
        urgency: 'high' as const
      });
    }
    
    // Emergency action always available
    actions.push({
      id: 'emergency',
      label: 'Emergency',
      description: 'Quick access to emergency services',
      action: () => window.location.href = '/emergency',
      urgency: 'high' as const
    });

    return actions;
  };

  return {
    navigationItems: getCoreNavigationItems(),
    contextualActions: getContextualActions(),
    context
  };
};

interface PsychologicalNavigationProps {
  className?: string;
}

export const PsychologicalNavigation: React.FC<PsychologicalNavigationProps> = ({ className }) => {
  const { navigationItems, contextualActions, context } = usePsychologicalNavigation();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`flex items-center ${className}`}>
      {/* Primary Navigation - Clean and focused */}
      <div className="flex items-center space-x-2">
        {navigationItems.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            className="relative"
          >
            <Link
              to={item.path}
              className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-primary/10 to-primary/5 text-primary shadow-lg shadow-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {/* Urgency indicator */}
              {item.urgency === 'high' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              )}

              <item.icon className={`h-4 w-4 transition-transform duration-200 ${
                hoveredItem === item.id ? 'scale-110' : ''
              }`} />
              
              <span className="text-sm">{item.label}</span>

              {/* Contextual hints on hover */}
              {hoveredItem === item.id && (
                <div className="absolute top-full left-0 mt-2 p-3 bg-card border shadow-lg rounded-lg z-50 min-w-64 animate-fade-in">
                  <p className="text-xs font-medium text-foreground mb-1">{item.description}</p>
                  <div className="space-y-1">
                    {item.contextualHints.map((hint, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ArrowRight className="h-3 w-3" />
                        {hint}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Link>
          </div>
        ))}

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
          <DropdownMenuContent align="end" className="w-56 bg-white border shadow-lg z-50">
            <DropdownMenuItem asChild>
              <Link to="/labs" className="flex items-center gap-3 w-full cursor-pointer hover:bg-primary/5">
                <TestTube className="h-4 w-4 text-orange-600" />
                Book Lab Test
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/pharmacy" className="flex items-center gap-3 w-full cursor-pointer hover:bg-primary/5">
                <Pill className="h-4 w-4 text-green-600" />
                Buy Medicine
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/pediatric" className="flex items-center gap-3 w-full cursor-pointer hover:bg-primary/5">
                <Baby className="h-4 w-4 text-pink-600" />
                Mother & Child Care
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/telemedicine" className="flex items-center gap-3 w-full cursor-pointer hover:bg-primary/5">
                <Video className="h-4 w-4 text-purple-600" />
                Telemedicine
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/records" className="flex items-center gap-3 w-full cursor-pointer hover:bg-primary/5">
                <Activity className="h-4 w-4 text-blue-600" />
                Health Records
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/resources" className="flex items-center gap-3 w-full cursor-pointer hover:bg-primary/5">
                <Heart className="h-4 w-4 text-red-600" />
                Health Resources
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Contextual Actions */}
      <div className="flex items-center gap-2 ml-6">
        {contextualActions.map((action) => (
          <div key={action.id}>
            <Button
              size="sm"
              variant={action.urgency === 'high' ? 'default' : 'outline'}
              className={`relative ${action.urgency === 'high' ? 'animate-pulse' : ''}`}
              onClick={action.action}
            >
              {action.urgency === 'high' && <Sparkles className="h-3 w-3 mr-1" />}
              {action.label}
            </Button>
          </div>
        ))}

        {/* Quick actions */}
        <div className="flex items-center gap-1 ml-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};