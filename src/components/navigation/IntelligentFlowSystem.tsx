import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  ArrowLeft, 
  Home, 
  Target,
  Clock,
  Sparkles,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

interface FlowStep {
  id: string;
  path: string;
  label: string;
  description: string;
  category: 'health' | 'appointment' | 'records' | 'services' | 'admin';
  nextSuggestions: string[];
  completionAction?: () => void;
}

interface UserJourney {
  id: string;
  title: string;
  description: string;
  steps: FlowStep[];
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  category: string;
}

interface FlowContextType {
  currentFlow: string | null;
  userJourneys: UserJourney[];
  suggestedNext: FlowStep[];
  breadcrumbs: FlowStep[];
  startFlow: (flowId: string) => void;
  completeStep: (stepId: string) => void;
  getSmartSuggestions: () => FlowStep[];
}

const FlowContext = createContext<FlowContextType | null>(null);

export const useIntelligentFlow = () => {
  const context = useContext(FlowContext);
  if (!context) throw new Error('useIntelligentFlow must be used within FlowProvider');
  return context;
};

export const FlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [currentFlow, setCurrentFlow] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [userBehavior, setUserBehavior] = useState({
    visitedPaths: [] as string[],
    timeSpent: {} as Record<string, number>,
    completedJourneys: [] as string[]
  });

  // Define intelligent user journeys
  const userJourneys: UserJourney[] = [
    {
      id: 'first-time-user',
      title: 'Get Started with MeddyPal',
      description: 'Complete your health profile and discover key features',
      priority: 'high',
      estimatedTime: '10 minutes',
      category: 'onboarding',
      steps: [
        {
          id: 'complete-profile',
          path: '/profile',
          label: 'Complete Profile',
          description: 'Add your health information',
          category: 'health',
          nextSuggestions: ['book-first-appointment', 'explore-services']
        },
        {
          id: 'book-first-appointment',
          path: '/appointments',
          label: 'Book Appointment',
          description: 'Schedule your first consultation',
          category: 'appointment',
          nextSuggestions: ['find-hospital', 'get-insurance']
        },
        {
          id: 'explore-services',
          path: '/services',
          label: 'Explore Services',
          description: 'Discover available health services',
          category: 'services',
          nextSuggestions: ['lab-tests', 'pharmacy']
        }
      ]
    },
    {
      id: 'health-checkup-flow',
      title: 'Complete Health Checkup',
      description: 'Book tests, appointments, and track results',
      priority: 'high',
      estimatedTime: '15 minutes',
      category: 'health',
      steps: [
        {
          id: 'book-lab-tests',
          path: '/labs',
          label: 'Book Lab Tests',
          description: 'Schedule necessary lab work',
          category: 'services',
          nextSuggestions: ['book-checkup-appointment', 'find-hospital']
        },
        {
          id: 'book-checkup-appointment',
          path: '/appointments',
          label: 'Book Doctor Visit',
          description: 'Schedule follow-up consultation',
          category: 'appointment',
          nextSuggestions: ['view-records', 'pharmacy']
        },
        {
          id: 'view-records',
          path: '/records',
          label: 'Track Results',
          description: 'Monitor your health progress',
          category: 'records',
          nextSuggestions: ['dashboard']
        }
      ]
    },
    {
      id: 'insurance-setup',
      title: 'Set Up Health Insurance',
      description: 'Compare plans and get coverage',
      priority: 'medium',
      estimatedTime: '8 minutes',
      category: 'insurance',
      steps: [
        {
          id: 'compare-insurance',
          path: '/insurance',
          label: 'Compare Plans',
          description: 'Find the right coverage',
          category: 'services',
          nextSuggestions: ['purchase-insurance', 'contact-broker']
        },
        {
          id: 'purchase-insurance',
          path: '/insurance/purchase',
          label: 'Purchase Plan',
          description: 'Complete your coverage',
          category: 'services',
          nextSuggestions: ['dashboard', 'appointments']
        }
      ]
    }
  ];

  // Track user behavior
  useEffect(() => {
    const behavior = JSON.parse(localStorage.getItem('user_behavior') || '{}');
    setUserBehavior(prev => ({
      ...prev,
      ...behavior,
      visitedPaths: [...(prev.visitedPaths || []), location.pathname]
    }));
  }, [location.pathname]);

  const getSmartSuggestions = (): FlowStep[] => {
    const currentPath = location.pathname;
    const onboardingData = JSON.parse(localStorage.getItem('userOnboardingData') || '{}');
    
    // Analyze user needs and suggest next best actions
    const suggestions: FlowStep[] = [];

    // Health-focused suggestions
    if (currentPath === '/dashboard') {
      if (!onboardingData.hasInsurance) {
        suggestions.push({
          id: 'get-insurance',
          path: '/insurance',
          label: 'Get Health Insurance',
          description: 'Protect yourself with comprehensive coverage',
          category: 'services',
          nextSuggestions: ['dashboard']
        });
      }
      
      suggestions.push({
        id: 'book-checkup',
        path: '/appointments',
        label: 'Book Health Checkup',
        description: 'Schedule your preventive care appointment',
        category: 'appointment',
        nextSuggestions: ['labs', 'records']
      });
    }

    if (currentPath === '/appointments') {
      suggestions.push({
        id: 'book-labs',
        path: '/labs',
        label: 'Book Lab Tests',
        description: 'Complete diagnostic tests before your visit',
        category: 'services',
        nextSuggestions: ['records']
      });
    }

    if (currentPath === '/labs') {
      suggestions.push({
        id: 'track-results',
        path: '/records',
        label: 'Track Results',
        description: 'Monitor your lab results and health trends',
        category: 'records',
        nextSuggestions: ['dashboard']
      });
    }

    return suggestions;
  };

  const startFlow = (flowId: string) => {
    setCurrentFlow(flowId);
    const flow = userJourneys.find(j => j.id === flowId);
    if (flow?.steps[0]) {
      navigate(flow.steps[0].path);
    }
  };

  const completeStep = (stepId: string) => {
    setCompletedSteps(prev => [...prev, stepId]);
    // Save progress
    localStorage.setItem('flow_progress', JSON.stringify([...completedSteps, stepId]));
  };

  const getBreadcrumbs = (): FlowStep[] => {
    // Generate intelligent breadcrumbs based on user journey
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: FlowStep[] = [];

    // Add home
    breadcrumbs.push({
      id: 'home',
      path: '/dashboard',
      label: 'Dashboard',
      description: 'Your health overview',
      category: 'health',
      nextSuggestions: []
    });

    // Add current path context
    if (pathSegments.length > 0) {
      const segment = pathSegments[0];
      const pathMap = {
        'appointments': { label: 'Appointments', description: 'Manage your healthcare visits' },
        'labs': { label: 'Lab Tests', description: 'Diagnostic testing services' },
        'pharmacy': { label: 'Pharmacy', description: 'Medication management' },
        'insurance': { label: 'Insurance', description: 'Health coverage plans' },
        'hospitals': { label: 'Hospitals', description: 'Healthcare facilities' },
        'records': { label: 'Health Records', description: 'Your medical history' },
        'telemedicine': { label: 'Telemedicine', description: 'Virtual consultations' }
      };

      if (pathMap[segment]) {
        breadcrumbs.push({
          id: segment,
          path: `/${segment}`,
          label: pathMap[segment].label,
          description: pathMap[segment].description,
          category: 'services' as const,
          nextSuggestions: []
        });
      }
    }

    return breadcrumbs;
  };

  return (
    <FlowContext.Provider value={{
      currentFlow,
      userJourneys,
      suggestedNext: getSmartSuggestions(),
      breadcrumbs: getBreadcrumbs(),
      startFlow,
      completeStep,
      getSmartSuggestions
    }}>
      {children}
    </FlowContext.Provider>
  );
};

// Smart suggestion component
export const SmartSuggestions: React.FC<{ className?: string }> = ({ className }) => {
  const { suggestedNext } = useIntelligentFlow();
  const navigate = useNavigate();

  if (suggestedNext.length === 0) return null;

  return (
    <div className={`bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-lg border ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-sm">Suggested Next Steps</h3>
      </div>
      <div className="space-y-2">
        {suggestedNext.map((suggestion) => (
          <Button
            key={suggestion.id}
            variant="ghost"
            className="w-full justify-between h-auto p-3 text-left"
            onClick={() => navigate(suggestion.path)}
          >
            <div>
              <p className="font-medium text-sm">{suggestion.label}</p>
              <p className="text-xs text-muted-foreground">{suggestion.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Button>
        ))}
      </div>
    </div>
  );
};

// Journey progress indicator
export const JourneyProgress: React.FC<{ className?: string }> = ({ className }) => {
  const { currentFlow, userJourneys } = useIntelligentFlow();
  
  if (!currentFlow) return null;

  const journey = userJourneys.find(j => j.id === currentFlow);
  if (!journey) return null;

  const completedSteps = JSON.parse(localStorage.getItem('flow_progress') || '[]');
  const progress = (completedSteps.length / journey.steps.length) * 100;

  return (
    <div className={`bg-card p-4 rounded-lg border ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-sm">{journey.title}</h3>
        <Badge variant="secondary" className="text-xs">
          {Math.round(progress)}% Complete
        </Badge>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">{journey.description}</p>
    </div>
  );
};

// Enhanced breadcrumb with context
export const IntelligentBreadcrumbs: React.FC<{ className?: string }> = ({ className }) => {
  const { breadcrumbs } = useIntelligentFlow();
  const navigate = useNavigate();

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`}>
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.id}>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-1 text-muted-foreground hover:text-foreground"
            onClick={() => navigate(crumb.path)}
          >
            {index === 0 && <Home className="h-3 w-3 mr-1" />}
            {crumb.label}
          </Button>
          {index < breadcrumbs.length - 1 && (
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};