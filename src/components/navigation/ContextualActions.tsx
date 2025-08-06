import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  ArrowRight,
  Calendar,
  TestTube,
  Shield,
  MapPin,
  Pill,
  Video,
  FileText,
  Heart,
  Clock,
  Star,
  TrendingUp,
  Zap,
  BookOpen
} from 'lucide-react';

interface ContextualAction {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  estimatedTime?: string;
  badge?: string;
}

export const useContextualActions = () => {
  const location = useLocation();
  const { user } = useAuth();

  const getActionsForPage = (): ContextualAction[] => {
    const path = location.pathname;
    const onboardingData = JSON.parse(localStorage.getItem('userOnboardingData') || '{}');
    
    // Dashboard context
    if (path === '/dashboard') {
      const actions: ContextualAction[] = [
        {
          id: 'book-appointment',
          label: 'Book Appointment',
          description: 'Schedule with a healthcare provider',
          icon: Calendar,
          path: '/appointments',
          priority: 'high',
          category: 'Healthcare',
          estimatedTime: '3 min',
          badge: 'Quick'
        },
        {
          id: 'lab-tests',
          label: 'Lab Tests',
          description: 'Order diagnostic tests',
          icon: TestTube,
          path: '/labs',
          priority: 'medium',
          category: 'Diagnostics',
          estimatedTime: '5 min'
        }
      ];

      // Add insurance if user doesn't have it
      if (!onboardingData.hasInsurance) {
        actions.unshift({
          id: 'get-insurance',
          label: 'Get Insurance',
          description: 'Protect your health with coverage',
          icon: Shield,
          path: '/insurance',
          priority: 'high',
          category: 'Protection',
          badge: 'Recommended'
        });
      }

      return actions;
    }

    // Appointments page context
    if (path === '/appointments') {
      return [
        {
          id: 'find-hospitals',
          label: 'Find Hospitals',
          description: 'Locate nearby healthcare facilities',
          icon: MapPin,
          path: '/hospitals',
          priority: 'high',
          category: 'Facilities',
          estimatedTime: '2 min'
        },
        {
          id: 'prepare-tests',
          label: 'Prepare Lab Tests',
          description: 'Order tests before your visit',
          icon: TestTube,
          path: '/labs',
          priority: 'medium',
          category: 'Preparation',
          badge: 'Smart'
        },
        {
          id: 'telemedicine',
          label: 'Virtual Consultation',
          description: 'Try online consultation instead',
          icon: Video,
          path: '/telemedicine',
          priority: 'medium',
          category: 'Alternative',
          badge: 'Instant'
        }
      ];
    }

    // Labs page context
    if (path === '/labs') {
      return [
        {
          id: 'book-followup',
          label: 'Book Follow-up',
          description: 'Schedule appointment for results',
          icon: Calendar,
          path: '/appointments',
          priority: 'high',
          category: 'Follow-up',
          estimatedTime: '3 min'
        },
        {
          id: 'view-records',
          label: 'View Records',
          description: 'Check previous test results',
          icon: FileText,
          path: '/records',
          priority: 'medium',
          category: 'History',
          estimatedTime: '2 min'
        }
      ];
    }

    // Insurance page context
    if (path === '/insurance') {
      return [
        {
          id: 'find-hospitals',
          label: 'Network Hospitals',
          description: 'Find covered healthcare facilities',
          icon: MapPin,
          path: '/hospitals',
          priority: 'high',
          category: 'Network',
          badge: 'Covered'
        },
        {
          id: 'book-appointment',
          label: 'Use Coverage',
          description: 'Book appointment with insurance',
          icon: Calendar,
          path: '/appointments',
          priority: 'medium',
          category: 'Benefits',
          estimatedTime: '3 min'
        }
      ];
    }

    // Pharmacy context
    if (path === '/pharmacy') {
      return [
        {
          id: 'get-prescription',
          label: 'Get Prescription',
          description: 'Consult doctor for medication',
          icon: Video,
          path: '/telemedicine',
          priority: 'high',
          category: 'Consultation',
          badge: 'Online'
        },
        {
          id: 'check-insurance',
          label: 'Check Coverage',
          description: 'Verify medication coverage',
          icon: Shield,
          path: '/insurance',
          priority: 'medium',
          category: 'Coverage'
        }
      ];
    }

    // Default actions for any page
    return [
      {
        id: 'dashboard',
        label: 'Health Overview',
        description: 'Return to your health dashboard',
        icon: Heart,
        path: '/dashboard',
        priority: 'medium',
        category: 'Overview',
        estimatedTime: '1 min'
      }
    ];
  };

  return { getActionsForPage };
};

interface ContextualActionsProps {
  className?: string;
  compact?: boolean;
}

export const ContextualActions: React.FC<ContextualActionsProps> = ({ 
  className = '', 
  compact = false 
}) => {
  const { getActionsForPage } = useContextualActions();
  const navigate = useNavigate();
  const actions = getActionsForPage();

  if (actions.length === 0) return null;

  if (compact) {
    return (
      <div className={`flex gap-2 ${className}`}>
        {actions.slice(0, 2).map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.id}
              variant="outline"
              size="sm"
              onClick={() => navigate(action.path)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {action.label}
              {action.badge && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {action.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Zap className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-sm">Quick Actions</h3>
      </div>
      <div className="grid gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          const isPriority = action.priority === 'high';
          
          return (
            <Button
              key={action.id}
              variant="ghost"
              className={`w-full justify-between h-auto p-3 text-left ${
                isPriority ? 'border border-primary/20 bg-primary/5' : ''
              }`}
              onClick={() => navigate(action.path)}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  isPriority 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{action.label}</span>
                    {action.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {action.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                  {action.estimatedTime && (
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {action.estimatedTime}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

// Quick action bar for bottom of pages
export const QuickActionBar: React.FC<{ className?: string }> = ({ className }) => {
  const { getActionsForPage } = useContextualActions();
  const navigate = useNavigate();
  const actions = getActionsForPage().filter(a => a.priority === 'high').slice(0, 3);

  if (actions.length === 0) return null;

  return (
    <div className={`fixed bottom-4 left-4 right-4 z-40 lg:hidden ${className}`}>
      <div className="bg-card/95 backdrop-blur-sm border rounded-full p-2 shadow-lg">
        <div className="flex justify-center gap-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                size="sm"
                variant="ghost"
                onClick={() => navigate(action.path)}
                className="flex-1 flex items-center gap-2 rounded-full"
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};