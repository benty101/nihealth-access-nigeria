
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, User, Shield, Building2 } from 'lucide-react';

interface MobileMenuProps {
  items: Array<{
    path: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ items }) => {
  const { user, signOut } = useAuth();
  const { role } = useUserRole();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
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
      {/* Mobile menu button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && user && (
        <div className="md:hidden py-4 border-t">
          <div className="space-y-2">
            {items.map((item) => (
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
            <div className="px-3 py-2 border-t mt-4 pt-4">
              {role && (
                <Badge className={`${getRoleColor(role)} text-xs flex items-center gap-1 mb-2 w-fit`}>
                  {getRoleIcon(role)}
                  {role.replace('_', ' ').toUpperCase()}
                </Badge>
              )}
              <Link
                to="/profile"
                className="block py-2 text-sm font-medium text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
                className="block py-2 text-sm font-medium text-gray-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
