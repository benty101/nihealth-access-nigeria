import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SimplifiedNavigation from '@/components/navigation/SimplifiedNavigation';
import MobileBottomNavigation from '@/components/navigation/MobileBottomNavigation';
import UnifiedSearch from '@/components/navigation/UnifiedSearch';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Search, Bell } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, className }) => {
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Pages that shouldn't have the sidebar
  const noSidebarRoutes = ['/', '/auth', '/onboarding'];
  const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);

  if (!shouldShowSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SimplifiedNavigation />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden">
          <SimplifiedNavigation />
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="lg:hidden bg-card/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-primary">MeddyPal</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="h-9 w-9 p-0"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 relative"
            >
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className={cn(
          "flex-1 overflow-auto pb-20 lg:pb-0",
          "bg-gradient-to-br from-background via-background to-muted/20",
          className
        )}>
          <div className="p-4 lg:p-8">
            {/* Desktop Search Bar */}
            <div className="hidden lg:block mb-6">
              <Button
                variant="outline"
                onClick={() => setIsSearchOpen(true)}
                className="w-full max-w-md h-11 justify-start text-muted-foreground hover:text-foreground"
              >
                <Search className="h-4 w-4 mr-3" />
                Search health services, information...
              </Button>
            </div>
            
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNavigation 
        onMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {/* Unified Search */}
      <UnifiedSearch 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};

export default AppLayout;