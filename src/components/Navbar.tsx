
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import NavLogo from './navbar/NavLogo';
import UserMenu from './navbar/UserMenu';
import MobileMenu from './navbar/MobileMenu';
import { useStreamlinedNavigation, StreamlinedDesktopNavigation } from './navbar/StreamlinedNavigation';
import { useSuperAdminNavigation, SuperAdminDesktopNavigation } from './navbar/SuperAdminNavigation';

const Navbar = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  
  // Use different navigation based on user role
  const isSuperAdmin = role === 'super_admin';
  const superAdminItems = useSuperAdminNavigation();
  const { primaryItems, secondaryItems } = useStreamlinedNavigation();
  
  // Combine for mobile menu
  const allItems = isSuperAdmin ? superAdminItems : [...primaryItems, ...secondaryItems];

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

          {/* Right side - User Menu and Hamburger Menu */}
          <div className="flex items-center gap-4">
            {/* Desktop User Menu - Hidden on smaller screens */}
            <div className="hidden lg:flex items-center animate-fade-in animation-delay-600">
              <UserMenu />
            </div>

            {/* Hamburger Menu - Always visible for easy navigation */}
            <div className="animate-fade-in animation-delay-400">
              <MobileMenu items={user ? allItems : []} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
