
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import NavLogo from './navbar/NavLogo';
import UserMenu from './navbar/UserMenu';
import MobileMenu from './navbar/MobileMenu';
import { useStreamlinedNavigation, StreamlinedDesktopNavigation } from './navbar/StreamlinedNavigation';

const Navbar = () => {
  const { user } = useAuth();
  const { primaryItems, secondaryItems } = useStreamlinedNavigation();
  
  // Combine for mobile menu
  const allItems = [...primaryItems, ...secondaryItems];

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
            <div className="hidden md:flex flex-1 justify-center animate-fade-in animation-delay-400">
              <StreamlinedDesktopNavigation 
                primaryItems={primaryItems} 
                secondaryItems={secondaryItems} 
              />
            </div>
          )}

          {/* Desktop User Menu - Right */}
          <div className="hidden md:flex items-center animate-fade-in animation-delay-600">
            <UserMenu />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden animate-fade-in animation-delay-400">
            <MobileMenu items={allItems} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
