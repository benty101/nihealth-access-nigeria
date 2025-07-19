
import React from 'react';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import { Toaster } from '@/components/ui/toaster';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBreadcrumbs?: boolean;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  subtitle,
  showBreadcrumbs = true,
  className = ''
}) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
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

export default PageLayout;
