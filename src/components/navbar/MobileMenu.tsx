
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

  // User dashboard items
  const userDashboardItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/appointments', label: 'Appointments', icon: Calendar },
    { path: '/records', label: 'Health Records', icon: FileText },
    { path: '/pediatric', label: 'Mother & Child', icon: Heart },
    { path: '/hospitals', label: 'Hospitals', icon: MapPin },
    { path: '/insurance', label: 'Insurance', icon: Shield },
    { path: '/telemedicine', label: 'Telemedicine', icon: User },
    { path: '/pharmacy', label: 'Pharmacy', icon: Building2 },
    { path: '/labs', label: 'Labs', icon: FileText },
    { path: '/emergency', label: 'Emergency', icon: Heart },
  ];

  // Use provided items, or fall back to appropriate default navigation
  const navigationItems = items.length > 0 ? items : (user ? userDashboardItems : defaultNavItems);

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
      {/* Menu button - always visible */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="relative p-2 hover:bg-gray-100 transition-colors"
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? (
          <X className="h-6 w-6 text-gray-700" />
        ) : (
          <Menu className="h-6 w-6 text-gray-700" />
        )}
      </Button>

      {/* Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 w-80 max-w-[90vw] h-full bg-white shadow-2xl overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </Button>
              </div>

              {/* User Info (if logged in) */}
              {user && (
                <div className="mb-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <p className="text-sm text-gray-600 mb-1">Signed in as:</p>
                  <p className="font-medium text-gray-900 truncate">{user.email}</p>
                  {role && (
                    <Badge className={`${getRoleColor(role)} text-xs flex items-center gap-1 mt-2 w-fit`}>
                      {getRoleIcon(role)}
                      {role.replace('_', ' ').toUpperCase()}
                    </Badge>
                  )}
                </div>
              )}

              {/* Navigation Items */}
              <nav className="space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-teal-100 text-teal-700 border border-teal-200 shadow-sm'
                        : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && (
                      <item.icon className={`h-5 w-5 ${
                        isActive(item.path) ? 'text-teal-600' : 'text-gray-500'
                      }`} />
                    )}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>

              {/* User Actions (if logged in) */}
              {user && (
                <div className="mt-8 pt-6 border-t space-y-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 text-gray-500" />
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                    Sign Out
                  </button>
                </div>
              )}

              {/* Auth actions for non-logged in users */}
              {!user && (
                <div className="mt-8 pt-6 border-t">
                  <Link
                    to="/auth"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors shadow-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    Sign In / Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
