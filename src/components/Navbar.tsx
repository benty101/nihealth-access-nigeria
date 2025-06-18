
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import NavLogo from './navbar/NavLogo';
import UserMenu from './navbar/UserMenu';
import { useStreamlinedNavigation, StreamlinedDesktopNavigation } from './navbar/StreamlinedNavigation';
import { useSuperAdminNavigation, SuperAdminDesktopNavigation } from './navbar/SuperAdminNavigation';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

const Navbar = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  
  // Use different navigation based on user role
  const isSuperAdmin = role === 'super_admin';
  const superAdminItems = useSuperAdminNavigation();
  const { primaryItems, secondaryItems } = useStreamlinedNavigation();

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-sm bg-white/95 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="animate-fade-in animation-delay-200">
            <NavLogo />
          </div>

          {/* Desktop Navigation - Center */}
          {user && (
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

          {/* Right side - Premium Link + User Menu */}
          <div className="flex items-center gap-4">
            {user && !isSuperAdmin && (
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
            <div className="flex items-center animate-fade-in animation-delay-600">
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
