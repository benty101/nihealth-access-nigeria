import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUserRole } from '@/hooks/useUserRole';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
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
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
        id: 'care-now',
        label: 'Get Care Now',
        path: '/care',
        icon: Zap,
        description: 'Immediate medical attention',
        urgency: 'high',
        category: 'care',
        contextualHints: ['Book appointment', 'Emergency care', 'Quick consultation'],
        visualWeight: 10
      },
      {
        id: 'health-hub',
        label: 'Health Hub',
        path: '/dashboard',
        icon: Activity,
        description: 'Your health overview',
        urgency: 'medium',
        category: 'manage',
        contextualHints: ['Health timeline', 'Recent visits', 'Upcoming care'],
        visualWeight: 8
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
        visualWeight: 7
      },
      {
        id: 'insurance',
        label: 'Insurance',
        path: '/insurance',
        icon: Shield,
        description: 'Manage your coverage',
        urgency: 'low',
        category: 'manage',
        contextualHints: ['Coverage details', 'Claims status', 'Compare plans'],
        visualWeight: 6
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
    
    if (context.userState === 'new') {
      actions.push({
        id: 'onboarding',
        label: 'Get Started',
        description: `${timeGreeting} Let's set up your health profile`,
        action: () => console.log('Start onboarding'),
        urgency: 'high' as const
      });
    }
    
    if (context.timeOfDay === 'morning') {
      actions.push({
        id: 'morning-checkup',
        label: 'Morning Health Check',
        description: 'Quick wellness assessment to start your day',
        action: () => console.log('Morning check'),
        urgency: 'medium' as const
      });
    }

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
  const [focusedCategory, setFocusedCategory] = useState<string | null>(null);

  // Principle: Visual hierarchy based on urgency and context
  const getItemScale = (item: NavigationItem, isHovered: boolean) => {
    const baseScale = item.visualWeight / 10;
    const hoverBoost = isHovered ? 0.1 : 0;
    const urgencyBoost = item.urgency === 'high' ? 0.05 : 0;
    return Math.min(1.0 + baseScale * 0.2 + hoverBoost + urgencyBoost, 1.3);
  };

  const getItemOpacity = (item: NavigationItem) => {
    if (!focusedCategory) return 1;
    return item.category === focusedCategory ? 1 : 0.4;
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`flex items-center ${className}`}>
      {/* Primary Navigation - Psychological grouping */}
      <div className="flex items-center space-x-2">
        <AnimatePresence>
          {navigationItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: getItemOpacity(item), 
                scale: getItemScale(item, hoveredItem === item.id)
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
              onFocus={() => setFocusedCategory(item.category)}
              onBlur={() => setFocusedCategory(null)}
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
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                <item.icon className={`h-4 w-4 transition-transform duration-200 ${
                  hoveredItem === item.id ? 'scale-110' : ''
                }`} />
                
                <span className="text-sm">{item.label}</span>

                {/* Contextual hints on hover */}
                <AnimatePresence>
                  {hoveredItem === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute top-full left-0 mt-2 p-3 bg-card border shadow-lg rounded-lg z-50 min-w-64"
                    >
                      <p className="text-xs font-medium text-foreground mb-1">{item.description}</p>
                      <div className="space-y-1">
                        {item.contextualHints.map((hint, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <ArrowRight className="h-3 w-3" />
                            {hint}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Contextual Actions - Adaptive to user state */}
      <div className="flex items-center gap-2 ml-6">
        <AnimatePresence>
          {contextualActions.map((action) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Button
                size="sm"
                variant={action.urgency === 'high' ? 'default' : 'outline'}
                className={`relative ${action.urgency === 'high' ? 'animate-pulse' : ''}`}
                onClick={action.action}
              >
                {action.urgency === 'high' && <Sparkles className="h-3 w-3 mr-1" />}
                {action.label}
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Quick actions - Anticipatory design */}
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