
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, User, Shield, Building2, Home, Calendar, FileText, MapPin, Heart } from 'lucide-react';

interface MobileMenuProps {
  items?: Array<{
    path: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ items = [] }) => {
  const { user, signOut } = useAuth();
  const { role } = useUserRole();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Default navigation items when no items are provided or user is not logged in
  const defaultNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/hospitals', label: 'Hospitals', icon: MapPin },
    { path: '/insurance', label: 'Insurance', icon: Shield },
    { path: '/resources', label: 'Resources', icon: FileText },
    { path: '/emergency', label: 'Emergency', icon: Heart },
  ];

  // Use provided items or fall back to default navigation
  const navigationItems = items.length > 0 ? items : (user ? [] : defaultNavItems);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const getRoleColor = (userRole: string | null) => {
    switch (userRole) {
      case 'super_admin':
        return 'bg-red-100 text-red-800';
      case 'hospital_admin':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (userRole: string | null) => {
    switch (userRole) {
      case 'super_admin':
        return <Shield className="h-3 w-3" />;
      case 'hospital_admin':
        return <Building2 className="h-3 w-3" />;
      default:
        return <User className="h-3 w-3" />;
    }
  };

  return (
    <>
      {/* Mobile menu button - always visible */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation Items */}
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                      isActive(item.path)
                        ? 'bg-teal-50 text-teal-600'
                        : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.label}
                  </Link>
                ))}

                {/* User-specific actions */}
                {user && (
                  <div className="border-t mt-4 pt-4">
                    {role && (
                      <Badge className={`${getRoleColor(role)} text-xs flex items-center gap-1 mb-2 w-fit`}>
                        {getRoleIcon(role)}
                        {role.replace('_', ' ').toUpperCase()}
                      </Badge>
                    )}
                    <Link
                      to="/profile"
                      className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md flex items-center gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md"
                    >
                      Sign Out
                    </button>
                  </div>
                )}

                {/* Auth actions for non-logged in users */}
                {!user && (
                  <div className="border-t mt-4 pt-4">
                    <Link
                      to="/auth"
                      className="block px-3 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-md text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
