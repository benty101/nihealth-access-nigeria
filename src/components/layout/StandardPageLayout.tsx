import React from 'react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import BreadcrumbNavigation from '@/components/navigation/BreadcrumbNavigation';
import ContextualHelp from '@/components/navigation/ContextualHelp';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';
import { FlowProvider, SmartSuggestions, IntelligentBreadcrumbs } from '@/components/navigation/IntelligentFlowSystem';
import { ContextualActions, QuickActionBar } from '@/components/navigation/ContextualActions';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

interface StandardPageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBreadcrumbs?: boolean;
  showHelp?: boolean;
  showEmergencyButton?: boolean;
  className?: string;
  backgroundVariant?: 'default' | 'gradient' | 'glass';
}

const StandardPageLayout: React.FC<StandardPageLayoutProps> = ({
  children,
  title,
  subtitle,
  showBreadcrumbs = true,
  showHelp = true,
  showEmergencyButton = true,
  className = '',
  backgroundVariant = 'gradient'
}) => {
  const getBackgroundClass = () => {
    switch (backgroundVariant) {
      case 'glass':
        return 'bg-background';
      case 'gradient':
        return 'bg-gradient-to-br from-background via-background to-muted/20';
      default:
        return 'bg-background';
    }
  };

  return (
    <FlowProvider>
      <div className={cn("min-h-screen", getBackgroundClass())}>
        <ContextualNavbar />
        
        <main className={cn("container mx-auto px-4 py-6", className)}>
          {showBreadcrumbs && (
            <div className="mb-6">
              <IntelligentBreadcrumbs />
            </div>
          )}
          
          {(title || subtitle) && (
            <div className="mb-8">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {title && (
                    <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                      {title}
                    </h1>
                  )}
                  {subtitle && (
                    <p className="text-lg text-muted-foreground">
                      {subtitle}
                    </p>
                  )}
                </div>
                {showHelp && (
                  <div className="ml-4">
                    <ContextualHelp />
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Smart suggestions and contextual actions */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <div className="lg:col-span-3">
              <SmartSuggestions />
            </div>
            <div className="lg:col-span-1">
              <ContextualActions compact />
            </div>
          </div>
          
          <div className="glass-card rounded-xl border p-6">
            {children}
          </div>
        </main>
        
        {showEmergencyButton && <FloatingEmergencyButton />}
        <QuickActionBar />
        <Toaster />
      </div>
    </FlowProvider>
  );
};

export default StandardPageLayout;