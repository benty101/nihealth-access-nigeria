import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface BreadcrumbNavigationProps {
  className?: string;
  items?: BreadcrumbItem[];
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({ className, items }) => {
  const location = useLocation();

  // Auto-generate breadcrumbs from current path if no items provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/dashboard', icon: Home }
    ];

    let currentPath = '';
    
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      
      // Map common paths to readable labels
      const labelMap: { [key: string]: string } = {
        'dashboard': 'Dashboard',
        'appointments': 'Appointments',
        'hospitals': 'Hospitals',
        'insurance': 'Insurance',
        'labs': 'Lab Tests',
        'pharmacy': 'Pharmacy',
        'telemedicine': 'Telemedicine',
        'records': 'Medical Records',
        'profile': 'My Profile',
        'ai-chat': 'AI Health Chat',
        'ai-assistant': 'Symptom Checker',
        'insights': 'Health Insights',
        'resources': 'Health Resources',
        'emergency': 'Emergency',
        'pediatric': 'Mother & Child',
        'admin': 'Administration',
        'hospital': 'Hospital Management',
        'broker': 'Broker Dashboard',
        'ml-analytics': 'ML Analytics',
        'premium': 'Premium Features',
        'health-timeline': 'Health Timeline',
        'patient-portal': 'My Health Portal'
      };

      const label = labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      
      breadcrumbs.push({
        label,
        path: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();
  
  // Don't show breadcrumbs for home/dashboard page
  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav className={cn("flex items-center space-x-1 text-sm mb-6", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const Icon = item.icon;
          
          return (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
              )}
              
              {isLast ? (
                <span className="flex items-center font-medium text-foreground">
                  {Icon && <Icon className="h-4 w-4 mr-1" />}
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {Icon && <Icon className="h-4 w-4 mr-1" />}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;