import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ModernNavigation from '@/components/modern/ModernNavigation';
import { Button } from '@/components/ui/enhanced/Button';
import { cn } from '@/lib/utils';
import { Search, Bell, Sparkles } from 'lucide-react';

interface ModernAppLayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
}

const ModernAppLayout: React.FC<ModernAppLayoutProps> = ({ 
  children, 
  className,
  showNavigation = true 
}) => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Pages that shouldn't have the navigation
  const noNavigationRoutes = ['/', '/auth', '/onboarding'];
  const shouldShowNavigation = showNavigation && !noNavigationRoutes.includes(location.pathname);

  if (!shouldShowNavigation) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/20 flex">
      {/* Modern Navigation Sidebar */}
      <ModernNavigation />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar - Mobile Only */}
        <header className="lg:hidden bg-white/80 backdrop-blur-md border-b border-neutral-200/50 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <h1 className="text-lg font-semibold text-primary-600">MeddyPal</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="relative"
            >
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
          </div>
        </header>

        {/* Desktop Header Bar */}
        <div className="hidden lg:block bg-white/60 backdrop-blur-md border-b border-neutral-200/30 sticky top-0 z-30">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <Button
                variant="outline"
                onClick={() => setIsSearchOpen(true)}
                className="w-full justify-start text-neutral-500 hover:text-neutral-700 bg-white/80 backdrop-blur-sm border-neutral-200/50"
              >
                <Search className="h-4 w-4 mr-3" />
                Search health services, information...
              </Button>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
              </Button>
              
              <Button 
                leftIcon={<Sparkles className="h-4 w-4" />}
                size="sm"
                className="shadow-sm"
              >
                AI Insights
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <main className={cn(
          "flex-1 overflow-auto",
          "pb-20 lg:pb-0", // Account for mobile bottom navigation
          className
        )}>
          {children}
        </main>
      </div>

      {/* Search Modal - You would implement this */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-xl shadow-2xl p-6 m-4 w-full max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search health services, doctors, medications..."
                className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
                autoFocus
              />
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                variant="ghost"
                onClick={() => setIsSearchOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernAppLayout;