
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  User, 
  LogOut, 
  Shield, 
  Building2, 
  TrendingUp,
  Heart,
  Calendar,
  FileText,
  Users,
  Activity,
  Star,
  Phone
} from 'lucide-react';

const MobileMenu = () => {
  const { user, signOut } = useAuth();
  const { role } = useUserRole();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      setIsOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

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

  const getRoleLabel = (userRole: string | null) => {
    switch (userRole) {
      case 'super_admin':
        return 'SUPER ADMIN';
      case 'hospital_admin':
        return 'HOSPITAL ADMIN';
      default:
        return 'PATIENT';
    }
  };

  const getNavigationItems = () => {
    if (!user) return [];

    const baseItems = [
      { path: '/dashboard', label: 'Dashboard', icon: Activity },
      { path: '/appointments', label: 'Appointments', icon: Calendar },
      { path: '/records', label: 'Health Records', icon: FileText },
      { path: '/hospitals', label: 'Hospitals', icon: Building2 },
      { path: '/insurance', label: 'Insurance', icon: Shield },
      { path: '/labs', label: 'Laboratory', icon: Activity },
      { path: '/pharmacy', label: 'Pharmacy', icon: Heart },
      { path: '/telemedicine', label: 'Telemedicine', icon: Phone },
      { path: '/diagnostics', label: 'Diagnostics', icon: Activity },
      { path: '/pediatric', label: 'Pediatric Care', icon: Heart },
      { path: '/emergency', label: 'Emergency', icon: Phone },
      { path: '/resources', label: 'Resources', icon: FileText },
    ];

    const roleSpecificItems = [];

    if (role === 'super_admin') {
      roleSpecificItems.push(
        { path: '/admin', label: 'System Admin', icon: Shield },
        { path: '/hospital-dashboard', label: 'Hospital Management', icon: Building2 },
        { path: '/broker-dashboard', label: 'Broker Dashboard', icon: TrendingUp },
        { path: '/ml-analytics', label: 'ML Analytics', icon: Activity }
      );
    }

    if (role === 'hospital_admin') {
      roleSpecificItems.push(
        { path: '/hospital-dashboard', label: 'Hospital Dashboard', icon: Building2 }
      );
    }

    return [...roleSpecificItems, ...baseItems];
  };

  const navigationItems = getNavigationItems();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-2 pb-6 border-b">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">MeddyPal</span>
          </div>

          {/* User Info */}
          {user && (
            <div className="py-4 border-b">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.user_metadata?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              {role && role !== 'patient' && (
                <Badge className={`${getRoleColor(role)} text-xs flex items-center gap-1 w-fit`}>
                  {getRoleIcon(role)}
                  <span>{getRoleLabel(role)}</span>
                </Badge>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex-1 py-4">
            {user ? (
              <div className="space-y-2">
                {/* Premium Link */}
                {role !== 'super_admin' && (
                  <Button
                    variant="outline"
                    className="w-full justify-start border-yellow-300 text-yellow-700 hover:bg-yellow-50 mb-4"
                    onClick={() => handleNavigation('/premium')}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Premium Features
                  </Button>
                )}

                {/* Navigation Items */}
                {navigationItems.map((item) => (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleNavigation(item.path)}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <Button
                  className="w-full"
                  onClick={() => handleNavigation('/auth')}
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleNavigation('/auth')}
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>

          {/* Footer */}
          {user && (
            <div className="pt-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
