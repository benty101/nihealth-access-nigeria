import React from 'react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import { Toaster } from '@/components/ui/toaster';

interface ProviderPageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBreadcrumbs?: boolean;
  className?: string;
  providerType?: 'hospital' | 'insurance' | 'admin';
}

const ProviderPageLayout: React.FC<ProviderPageLayoutProps> = ({
  children,
  title,
  subtitle,
  showBreadcrumbs = true,
  className = '',
  providerType = 'hospital'
}) => {
  const getProviderTheme = () => {
    switch (providerType) {
      case 'hospital':
        return 'bg-gradient-to-br from-blue-50 to-indigo-50';
      case 'insurance':
        return 'bg-gradient-to-br from-emerald-50 to-teal-50';
      case 'admin':
        return 'bg-gradient-to-br from-slate-50 to-gray-50';
      default:
        return 'bg-background';
    }
  };

  return (
    <div className={`min-h-screen ${getProviderTheme()}`}>
      <ContextualNavbar />
      
      <main className={`container mx-auto px-4 py-6 ${className}`}>
        {showBreadcrumbs && <Breadcrumbs />}
        
        {(title || subtitle) && (
          <div className="mb-8">
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
        )}
        
        {children}
      </main>
      
      <Toaster />
    </div>
  );
};

export default ProviderPageLayout;