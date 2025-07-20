import React from 'react';
import { useLocation } from 'react-router-dom';
import ModernSidebar from '@/components/navigation/ModernSidebar';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, className }) => {
  const location = useLocation();
  
  // Pages that shouldn't have the sidebar
  const noSidebarRoutes = ['/', '/auth', '/onboarding'];
  const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);

  if (!shouldShowSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <ModernSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Content Area */}
        <main className={cn(
          "flex-1 overflow-auto",
          "bg-gradient-to-br from-background via-background to-muted/20",
          className
        )}>
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;