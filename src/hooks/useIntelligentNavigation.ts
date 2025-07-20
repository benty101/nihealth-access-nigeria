import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { Home, Activity, ArrowLeft } from 'lucide-react';

export interface NavigationContext {
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  userHomeRoute: string;
  userHomeLabel: string;
  userHomeIcon: React.ComponentType<{ className?: string }>;
  getBackRoute: () => string;
  getBackLabel: () => string;
}

export const useIntelligentNavigation = (): NavigationContext => {
  const { user } = useAuth();
  const location = useLocation();

  const isAuthenticated = !!user;
  const hasCompletedOnboarding = !!localStorage.getItem('onboardingCompleted');

  // Determine user's home route based on authentication and onboarding status
  const getUserHome = () => {
    if (!isAuthenticated) {
      return { route: '/', label: 'Home', icon: Home };
    }
    
    if (!hasCompletedOnboarding) {
      return { route: '/onboarding', label: 'Setup', icon: Activity };
    }
    
    return { route: '/dashboard', label: 'Dashboard', icon: Activity };
  };

  const userHome = getUserHome();

  // Intelligent back navigation logic
  const getBackRoute = (): string => {
    const currentPath = location.pathname;
    
    // Special cases for specific pages
    switch (currentPath) {
      case '/ai-chat':
      case '/ai-assistant':
      case '/medical-search':
        return isAuthenticated ? '/dashboard' : '/';
        
      case '/diagnostics':
      case '/labs':
      case '/pharmacy':
      case '/telemedicine':
        return '/dashboard';
        
      case '/book-appointment':
        return '/appointments';
        
      case '/book-lab-test':
        return '/labs';
        
      case '/profile':
        return '/dashboard';
        
      case '/premium':
        return '/dashboard';
        
      case '/emergency':
        return '/dashboard';
        
      case '/pediatric':
        return '/dashboard';
        
      case '/resources':
        return '/dashboard';
        
      case '/consultations':
      case '/my-orders':
        return '/dashboard';
        
      // Admin pages go back to their respective dashboards
      case '/admin':
        return '/dashboard';
        
      case '/hospital':
      case '/hospital-dashboard':
        return '/dashboard';
        
      case '/broker':
      case '/broker-dashboard':
        return '/dashboard';
        
      case '/ml-analytics':
        return '/admin';
        
      default:
        // Default back navigation
        if (isAuthenticated && hasCompletedOnboarding) {
          return '/dashboard';
        } else if (isAuthenticated && !hasCompletedOnboarding) {
          return '/onboarding';
        } else {
          return '/';
        }
    }
  };

  const getBackLabel = (): string => {
    const backRoute = getBackRoute();
    
    switch (backRoute) {
      case '/dashboard':
        return 'Dashboard';
      case '/appointments':
        return 'Appointments';
      case '/labs':
        return 'Lab Services';
      case '/onboarding':
        return 'Setup';
      case '/admin':
        return 'Admin';
      default:
        return 'Back';
    }
  };

  return {
    isAuthenticated,
    hasCompletedOnboarding,
    userHomeRoute: userHome.route,
    userHomeLabel: userHome.label,
    userHomeIcon: userHome.icon,
    getBackRoute,
    getBackLabel,
  };
};