
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import NavLogo from './navbar/NavLogo';
import UserMenu from './navbar/UserMenu';
import { SmartMobileNavigation } from './navigation/SmartMobileNavigation';
import { PsychologicalNavigation } from './navigation/PsychologicalNavigation';
import { Button } from '@/components/ui/button';
import { Star, Map } from 'lucide-react';

const Navbar = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  
  // Psychological navigation - adapts to user context and behavior

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-sm bg-white/95 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="animate-fade-in animation-delay-200">
            <NavLogo />
          </div>

          {/* Desktop Navigation - Psychological Design */}
          <div className="hidden lg:flex flex-1 justify-center animate-fade-in animation-delay-400">
            <PsychologicalNavigation />
          </div>

          {/* Right side - Site Map + Premium Link + User Menu */}
          <div className="flex items-center gap-4">
            {/* Site Map Link */}
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

            {user && role !== 'super_admin' && (
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
            
            {/* Smart Mobile Navigation */}
            <div className="lg:hidden">
              <SmartMobileNavigation />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
