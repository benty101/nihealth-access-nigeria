import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import NavLogo from './NavLogo';
import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';
import { useStreamlinedNavigation, StreamlinedDesktopNavigation } from './StreamlinedNavigation';
import { useSuperAdminNavigation, SuperAdminDesktopNavigation } from './SuperAdminNavigation';
import { Button } from '@/components/ui/button';
import { Star, Map, ArrowRight, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContextualNavbar = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const location = useLocation();
  
  // Determine navigation context
  const isHomePage = location.pathname === '/';
  const isAuthPage = location.pathname === '/auth';
  const isDashboardArea = location.pathname.startsWith('/dashboard') || 
                         location.pathname.startsWith('/admin') || 
                         location.pathname.startsWith('/hospital') || 
                         location.pathname.startsWith('/broker') ||
                         ['/appointments', '/insurance', '/hospitals', '/labs', '/pharmacy', 
                          '/telemedicine', '/resources', '/records', '/profile'].includes(location.pathname);
  
  // Use different navigation based on user role
  const isSuperAdmin = role === 'super_admin';
  const superAdminItems = useSuperAdminNavigation();
  const { primaryItems, secondaryItems } = useStreamlinedNavigation();

  const getDashboardPath = () => {
    switch (role) {
      case 'super_admin':
        return '/admin';
      case 'hospital_admin':
        return '/hospital';
      case 'broker':
        return '/broker';
      default:
        return '/dashboard';
    }
  };

  const getDashboardLabel = () => {
    switch (role) {
      case 'super_admin':
        return 'Admin Console';
      case 'hospital_admin':
        return 'Hospital Dashboard';
      case 'broker':
        return 'Broker Dashboard';
      default:
        return 'My Dashboard';
    }
  };

  // Don't show navbar on auth page
  if (isAuthPage) {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-sm bg-white/95 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="animate-fade-in animation-delay-200">
            <NavLogo />
          </div>

          {/* Center Navigation - Only show in dashboard areas for authenticated users */}
          {user && isDashboardArea && (
            <div className="hidden lg:flex flex-1 justify-center animate-fade-in animation-delay-400">
              {isSuperAdmin ? (
                <SuperAdminDesktopNavigation items={superAdminItems} />
              ) : (
                <StreamlinedDesktopNavigation 
                  primaryItems={primaryItems} 
                  secondaryItems={secondaryItems} 
                />
              )}
            </div>
          )}

          {/* Right side content - varies by context */}
          <div className="flex items-center gap-4">
            
            {/* Home page with authenticated user - show dashboard link */}
            {user && isHomePage && (
              <div className="hidden md:flex items-center gap-3 animate-fade-in animation-delay-400">
                <Link to={getDashboardPath()}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    {getDashboardLabel()}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            )}

            {/* Dashboard areas - show site map and premium links */}
            {user && isDashboardArea && (
              <>
                <div className="hidden md:block animate-fade-in animation-delay-400">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.location.href = '/sitemap'}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Map className="h-4 w-4 mr-1" />
                    Site Map
                  </Button>
                </div>

                {!isSuperAdmin && (
                  <div className="hidden md:block animate-fade-in animation-delay-500">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = '/premium'}
                      className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 font-medium"
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Premium
                    </Button>
                  </div>
                )}
              </>
            )}
            
            {/* User Menu - always show if authenticated */}
            <div className="flex items-center animate-fade-in animation-delay-600">
              <UserMenu />
            </div>
            
            {/* Mobile Menu - only in dashboard areas */}
            {user && isDashboardArea && (
              <div className="lg:hidden">
                <MobileMenu />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ContextualNavbar;