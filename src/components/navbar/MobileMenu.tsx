
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
      {/* Menu button - always visible on all screen sizes */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 w-80 max-w-[90vw] h-full bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Navigation Menu</h2>
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
                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center gap-3 ${
                      isActive(item.path)
                        ? 'bg-teal-50 text-teal-600 border border-teal-200'
                        : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    {item.label}
                  </Link>
                ))}

                {/* User-specific actions */}
                {user && (
                  <div className="border-t mt-6 pt-6">
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Signed in as:</p>
                      <p className="font-medium text-gray-900">{user.email}</p>
                      {role && (
                        <Badge className={`${getRoleColor(role)} text-xs flex items-center gap-1 mt-2 w-fit`}>
                          {getRoleIcon(role)}
                          {role.replace('_', ' ').toUpperCase()}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Link
                        to="/profile"
                        className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg flex items-center gap-3"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}

                {/* Auth actions for non-logged in users */}
                {!user && (
                  <div className="border-t mt-6 pt-6">
                    <Link
                      to="/auth"
                      className="block px-4 py-3 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg text-center transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In / Register
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
