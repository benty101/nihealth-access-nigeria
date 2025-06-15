
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import NavLogo from './navbar/NavLogo';
import UserMenu from './navbar/UserMenu';
import MobileMenu from './navbar/MobileMenu';
import { useNavigationItems, DesktopNavigation } from './navbar/NavigationItems';

const Navbar = () => {
  const { user } = useAuth();
  const navigationItems = useNavigationItems();

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLogo />

          {/* Desktop Navigation - Center */}
          {user && (
            <div className="hidden md:flex flex-1 justify-center">
              <DesktopNavigation items={navigationItems} />
            </div>
          )}

          {/* Desktop User Menu - Right */}
          <div className="hidden md:flex items-center">
            <UserMenu />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu items={navigationItems} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
