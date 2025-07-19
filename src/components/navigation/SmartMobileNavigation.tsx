import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X,
  Heart, 
  Zap,
  Calendar,
  Activity,
  MapPin,
  Shield,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Star,
  ArrowRight,
  Sparkles,
  Clock,
  Plus
} from 'lucide-react';

interface GestureNavigation {
  isGestureActive: boolean;
  direction: 'left' | 'right' | 'up' | 'down' | null;
  confidence: number;
}

interface SmartCategory {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: Array<{
    path: string;
    label: string;
    description: string;
    urgency: 'low' | 'medium' | 'high';
    lastUsed?: Date;
    frequency?: number;
  }>;
  color: string;
  priority: number;
}

export const useSmartMobileNavigation = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const [userBehavior, setUserBehavior] = useState({
    frequentPaths: [] as string[],
    timePreferences: {} as Record<string, number>,
    lastSession: null as Date | null
  });

  // Analyze user behavior for personalized navigation
  useEffect(() => {
    const savedBehavior = localStorage.getItem('meddypal_behavior');
    if (savedBehavior) {
      setUserBehavior(JSON.parse(savedBehavior));
    }
  }, []);

  const getSmartCategories = (): SmartCategory[] => {
    const now = new Date().getHours();
    
    const categories: SmartCategory[] = [
      {
        id: 'urgent',
        label: 'Urgent Care',
        icon: Zap,
        color: 'from-red-500 to-orange-500',
        priority: now >= 6 && now <= 22 ? 10 : 8, // Higher priority during day hours
        items: [
          {
            path: '/emergency',
            label: 'Emergency SOS',
            description: 'Immediate emergency assistance',
            urgency: 'high' as const
          },
          {
            path: '/appointments',
            label: 'Quick Appointment',
            description: 'Book urgent care appointment',
            urgency: 'high' as const
          },
          {
            path: '/telemedicine',
            label: 'Virtual Consultation',
            description: 'Talk to a doctor now',
            urgency: 'medium' as const
          }
        ]
      },
      {
        id: 'daily',
        label: 'Daily Health',
        icon: Activity,
        color: 'from-blue-500 to-teal-500',
        priority: 9,
        items: [
          {
            path: '/dashboard',
            label: 'Health Overview',
            description: 'Your health timeline',
            urgency: 'medium' as const
          },
          {
            path: '/records',
            label: 'Health Records',
            description: 'Medical history & documents',
            urgency: 'low' as const
          },
          {
            path: '/medications',
            label: 'Medications',
            description: 'Track your prescriptions',
            urgency: 'medium' as const
          }
        ]
      },
      {
        id: 'services',
        label: 'Health Services',
        icon: Heart,
        color: 'from-green-500 to-emerald-500',
        priority: 7,
        items: [
          {
            path: '/labs',
            label: 'Lab Tests',
            description: 'Book laboratory tests',
            urgency: 'medium' as const
          },
          {
            path: '/pharmacy',
            label: 'Pharmacy',
            description: 'Order medications',
            urgency: 'low' as const
          },
          {
            path: '/hospitals',
            label: 'Find Hospitals',
            description: 'Nearby healthcare facilities',
            urgency: 'low' as const
          }
        ]
      },
      {
        id: 'manage',
        label: 'Manage',
        icon: Settings,
        color: 'from-purple-500 to-indigo-500',
        priority: 5,
        items: [
          {
            path: '/insurance',
            label: 'Insurance',
            description: 'Manage coverage & claims',
            urgency: 'low' as const
          },
          {
            path: '/profile',
            label: 'Profile',
            description: 'Personal information',
            urgency: 'low' as const
          }
        ]
      }
    ];

    // Add admin category for super admins
    if (role === 'super_admin') {
      categories.unshift({
        id: 'admin',
        label: 'Admin Console',
        icon: Sparkles,
        color: 'from-yellow-500 to-amber-500',
        priority: 10,
        items: [
          {
            path: '/admin',
            label: 'System Admin',
            description: 'Platform management',
            urgency: 'medium' as const
          },
          {
            path: '/analytics',
            label: 'Analytics',
            description: 'Platform insights',
            urgency: 'low' as const
          }
        ]
      });
    }

    return categories.sort((a, b) => b.priority - a.priority);
  };

  return {
    categories: getSmartCategories(),
    userBehavior
  };
};

interface SmartMobileNavigationProps {
  className?: string;
}

export const SmartMobileNavigation: React.FC<SmartMobileNavigationProps> = ({ className }) => {
  const { user, signOut } = useAuth();
  const { role } = useUserRole();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [gestureNav, setGestureNav] = useState<GestureNavigation>({
    isGestureActive: false,
    direction: null,
    confidence: 0
  });
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  const { categories } = useSmartMobileNavigation();

  // Gesture-based navigation
  const handlePan = (event: any, info: PanInfo) => {
    const { offset, velocity } = info;
    const threshold = 50;
    const velocityThreshold = 500;

    if (Math.abs(offset.x) > threshold || Math.abs(velocity.x) > velocityThreshold) {
      if (offset.x > 0) {
        // Swipe right - could trigger back navigation
        setGestureNav({ isGestureActive: true, direction: 'right', confidence: Math.min(Math.abs(offset.x) / 100, 1) });
      } else {
        // Swipe left - could trigger forward navigation
        setGestureNav({ isGestureActive: true, direction: 'left', confidence: Math.min(Math.abs(offset.x) / 100, 1) });
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      setIsOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNavigation = (path: string) => {
    // Track user behavior
    const behavior = JSON.parse(localStorage.getItem('meddypal_behavior') || '{}');
    behavior.frequentPaths = behavior.frequentPaths || [];
    behavior.frequentPaths.push(path);
    behavior.lastSession = new Date();
    localStorage.setItem('meddypal_behavior', JSON.stringify(behavior));
    
    navigate(path);
    setIsOpen(false);
  };

  const getUrgencyIndicator = (urgency: 'low' | 'medium' | 'high') => {
    switch (urgency) {
      case 'high':
        return <motion.div 
          className="w-2 h-2 bg-red-500 rounded-full" 
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />;
      case 'medium':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full" />;
      default:
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={`lg:hidden ${className}`}>
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-full sm:w-96 p-0 bg-gradient-to-br from-background via-background to-muted/20"
      >
        <motion.div 
          className="flex flex-col h-full"
          onPan={handlePan}
          onPanEnd={() => setGestureNav({ isGestureActive: false, direction: null, confidence: 0 })}
        >
          {/* Header with psychological hierarchy */}
          <div className="relative p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-b">
            <motion.div 
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">MeddyPal</h1>
                  <p className="text-xs text-muted-foreground">Your health companion</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </motion.div>

            {/* User context - psychological anchoring */}
            {user && (
              <motion.div 
                className="mt-4 p-3 bg-card rounded-lg border"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold text-sm">
                      {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                  {role && role !== 'patient' && (
                    <Badge variant="secondary" className="text-xs">
                      {role.replace('_', ' ').toUpperCase()}
                    </Badge>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Smart categorized navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <AnimatePresence>
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-4"
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-4 h-auto"
                    onClick={() => setExpandedCategory(
                      expandedCategory === category.id ? null : category.id
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center shadow-md`}>
                        <category.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{category.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {category.items.length} services
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedCategory === category.id ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </Button>

                  <AnimatePresence>
                    {expandedCategory === category.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 mt-2 space-y-2"
                      >
                        {category.items.map((item) => (
                          <motion.button
                            key={item.path}
                            className="w-full text-left p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                            onClick={() => handleNavigation(item.path)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-sm">{item.label}</p>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                              </div>
                              {getUrgencyIndicator(item.urgency)}
                            </div>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Quick actions footer */}
          {user && (
            <div className="p-4 border-t bg-muted/20">
              <div className="flex gap-2 mb-3">
                <Button variant="outline" size="sm" className="flex-1">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Bell className="h-4 w-4 mr-2" />
                  Alerts
                </Button>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign Out
              </Button>
            </div>
          )}
        </motion.div>
      </SheetContent>
    </Sheet>
  );
};