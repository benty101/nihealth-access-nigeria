
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useNavigationItems } from './SiteNavigation';

interface BreadcrumbItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }> | null;
}

const Breadcrumbs = () => {
  const location = useLocation();
  const navigationItems = useNavigationItems();
  
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  
  // Don't show breadcrumbs on home page
  if (location.pathname === '/') {
    return null;
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { path: '/', label: 'Home', icon: Home }
  ];

  // Build breadcrumb trail
  let currentPath = '';
  pathSegments.forEach(segment => {
    currentPath += `/${segment}`;
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
          <React.Fragment key={crumb.path}>
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
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
