
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useNavigationItems } from './SiteNavigation';
import { useIntelligentNavigation } from '@/hooks/useIntelligentNavigation';

interface BreadcrumbItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }> | null;
}

const Breadcrumbs = () => {
  const location = useLocation();
  const navigationItems = useNavigationItems();
  const { userHomeRoute, userHomeLabel, userHomeIcon } = useIntelligentNavigation();
  
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  
  // Don't show breadcrumbs on home/dashboard page
  if (location.pathname === '/' || location.pathname === '/dashboard') {
    return null;
  }

  // Start with intelligent home breadcrumb
  const breadcrumbs: BreadcrumbItem[] = [
    { path: userHomeRoute, label: userHomeLabel, icon: userHomeIcon }
  ];

  // Build breadcrumb trail
  let currentPath = '';
  pathSegments.forEach(segment => {
    currentPath += `/${segment}`;
    
    // Skip if this is the user's home route (already added)
    if (currentPath === userHomeRoute) return;
    
    const navItem = navigationItems.find(item => item.path === currentPath);
    
    if (navItem) {
      breadcrumbs.push({
        path: currentPath,
        label: navItem.label,
        icon: navItem.icon
      });
    } else {
      // Fallback for paths not in navigation
      const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
      breadcrumbs.push({
        path: currentPath,
        label,
        icon: null
      });
    }
  });

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg mb-6">
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const IconComponent = crumb.icon;
        
        return (
          <div key={crumb.path} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            )}
            
            {isLast ? (
              <span className="flex items-center font-medium text-foreground">
                {IconComponent && <IconComponent className="h-4 w-4 mr-1" />}
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="flex items-center hover:text-foreground transition-colors"
              >
                {IconComponent && <IconComponent className="h-4 w-4 mr-1" />}
                {crumb.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
