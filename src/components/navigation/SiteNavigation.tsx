
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import {
  Heart,
  Calendar,
  FileText,
  Building2,
  Shield,
  Activity,
  Phone,
  Baby,
  Star,
  TrendingUp,
  Users,
  Stethoscope,
  Pill,
  TestTube,
  AlertTriangle
} from 'lucide-react';

export interface NavigationItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  requiresAuth?: boolean;
  roles?: string[];
}

export const useNavigationItems = () => {
  const { user } = useAuth();
  const { role } = useUserRole();

  const publicItems: NavigationItem[] = [
    {
      path: '/',
      label: 'Home',
      icon: Heart,
      description: 'MeddyPal Home Page'
    },
    {
      path: '/auth',
      label: 'Sign In / Sign Up',
      icon: Users,
      description: 'Authentication'
    }
  ];

  const patientItems: NavigationItem[] = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: Activity,
      description: 'Your health dashboard',
      requiresAuth: true
    },
    {
      path: '/appointments',
      label: 'Appointments',
      icon: Calendar,
      description: 'Book and manage appointments',
      requiresAuth: true
    },
    {
      path: '/records',
      label: 'Health Records',
      icon: FileText,
      description: 'Manage your health records',
      requiresAuth: true
    },
    {
      path: '/hospitals',
      label: 'Hospitals',
      icon: Building2,
      description: 'Find hospitals and healthcare providers',
      requiresAuth: true
    },
    {
      path: '/insurance',
      label: 'Insurance',
      icon: Shield,
      description: 'Health insurance plans and coverage',
      requiresAuth: true
    },
    {
      path: '/labs',
      label: 'Laboratory Services',
      icon: TestTube,
      description: 'Lab tests and diagnostics',
      requiresAuth: true
    },
    {
      path: '/pharmacy',
      label: 'Pharmacy',
      icon: Pill,
      description: 'Medications and prescriptions',
      requiresAuth: true
    },
    {
      path: '/telemedicine',
      label: 'Telemedicine',
      icon: Phone,
      description: 'Virtual consultations',
      requiresAuth: true
    },
    {
      path: '/diagnostics',
      label: 'Diagnostics',
      icon: Stethoscope,
      description: 'Diagnostic services and results',
      requiresAuth: true
    },
    {
      path: '/pediatric',
      label: 'Pediatric Care',
      icon: Baby,
      description: 'Child healthcare services',
      requiresAuth: true
    },
    {
      path: '/emergency',
      label: 'Emergency Services',
      icon: AlertTriangle,
      description: 'Emergency contacts and services',
      requiresAuth: true
    },
    {
      path: '/resources',
      label: 'Health Resources',
      icon: FileText,
      description: 'Educational health resources',
      requiresAuth: true
    },
    {
      path: '/premium',
      label: 'Premium Features',
      icon: Star,
      description: 'Upgrade to premium services',
      requiresAuth: true
    }
  ];

  const adminItems: NavigationItem[] = [
    {
      path: '/admin',
      label: 'System Administration',
      icon: Shield,
      description: 'System administration panel',
      requiresAuth: true,
      roles: ['super_admin']
    },
    {
      path: '/hospital-dashboard',
      label: 'Hospital Management',
      icon: Building2,
      description: 'Hospital administration dashboard',
      requiresAuth: true,
      roles: ['super_admin', 'hospital_admin']
    },
    {
      path: '/broker-dashboard',
      label: 'Insurance Broker',
      icon: TrendingUp,
      description: 'Insurance broker dashboard',
      requiresAuth: true,
      roles: ['super_admin', 'broker']
    },
    {
      path: '/ml-analytics',
      label: 'ML Analytics',
      icon: Activity,
      description: 'Machine learning analytics',
      requiresAuth: true,
      roles: ['super_admin']
    }
  ];

  const getVisibleItems = () => {
    if (!user) {
      return publicItems;
    }

    const userItems = [...patientItems];
    
    // Add admin items based on role
    if (role === 'super_admin') {
      userItems.push(...adminItems);
    } else if (role === 'hospital_admin') {
      userItems.push(adminItems.find(item => item.path === '/hospital-dashboard')!);
    } else if (role === 'broker') {
      userItems.push(adminItems.find(item => item.path === '/broker-dashboard')!);
    }

    return userItems;
  };

  return getVisibleItems();
};

interface SiteNavigationProps {
  className?: string;
  showDescriptions?: boolean;
  layout?: 'horizontal' | 'vertical' | 'grid';
}

const SiteNavigation: React.FC<SiteNavigationProps> = ({
  className = '',
  showDescriptions = false,
  layout = 'vertical'
}) => {
  const location = useLocation();
  const navigationItems = useNavigationItems();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'horizontal':
        return 'flex flex-wrap gap-2';
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
      default:
        return 'space-y-2';
    }
  };

  return (
    <nav className={`${className}`}>
      <div className={getLayoutClasses()}>
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center p-3 rounded-lg transition-all duration-200
                ${active 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'hover:bg-muted hover:shadow-sm'
                }
                ${layout === 'grid' ? 'flex-col text-center' : ''}
              `}
            >
              <IconComponent className={`
                h-5 w-5 
                ${layout === 'grid' ? 'mb-2' : 'mr-3'}
                ${active ? 'text-primary-foreground' : 'text-muted-foreground'}
              `} />
              <div className={layout === 'grid' ? 'text-center' : 'flex-1'}>
                <div className={`font-medium ${active ? 'text-primary-foreground' : ''}`}>
                  {item.label}
                </div>
                {showDescriptions && item.description && (
                  <div className={`text-sm ${active ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    {item.description}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default SiteNavigation;
