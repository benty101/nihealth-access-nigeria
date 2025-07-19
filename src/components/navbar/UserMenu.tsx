import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Shield, Building2, Settings, ChevronDown } from 'lucide-react';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const { role } = useUserRole();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getRoleColor = (userRole: string | null) => {
    switch (userRole) {
      case 'super_admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'hospital_admin':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const getDashboardPath = () => {
    switch (role) {
      case 'super_admin':
        return '/admin';
      case 'hospital_admin':
        return '/hospital';
      case 'broker':
        return '/broker';
      default:
        return '/dashboard';
    }
  };

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link to="/auth">
          <Button variant="ghost" className="text-gray-700 hover:text-teal-600">
            Sign In
          </Button>
        </Link>
        <Link to="/auth">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            Get Started
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      {/* Role Badge - Only show for admin roles */}
      {role && role !== 'patient' && (
        <Badge className={`${getRoleColor(role)} text-xs flex items-center gap-1 px-2 py-1 font-medium`}>
          {getRoleIcon(role)}
          <span>{getRoleLabel(role)}</span>
        </Badge>
      )}

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2 h-auto hover:bg-gray-100 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white font-semibold text-sm">
                {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium text-gray-900">
                {user.user_metadata?.full_name || 'User'}
              </span>
              <span className="text-xs text-gray-500">
                {user.email}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end" forceMount>
          {/* User Info Header */}
          <div className="flex items-center space-x-3 p-3 border-b">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
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
              {role && (
                <Badge className={`${getRoleColor(role)} text-xs mt-1 flex items-center gap-1 w-fit`}>
                  {getRoleIcon(role)}
                  <span>{getRoleLabel(role)}</span>
                </Badge>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex items-center py-2 px-3 cursor-pointer hover:bg-gray-50 w-full">
              <User className="mr-3 h-4 w-4 text-gray-500" />
              <span>My Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link to={getDashboardPath()} className="flex items-center py-2 px-3 cursor-pointer hover:bg-gray-50 w-full">
              <Settings className="mr-3 h-4 w-4 text-gray-500" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem 
            onClick={handleSignOut}
            className="flex items-center py-2 px-3 cursor-pointer hover:bg-red-50 text-red-600 focus:text-red-600 w-full"
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span className="font-medium">Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
