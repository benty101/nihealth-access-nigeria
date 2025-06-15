
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
import { User, LogOut, Shield, Building2, Settings } from 'lucide-react';

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
      {/* Role Badge */}
      {role && (
        <Badge className={`${getRoleColor(role)} text-xs flex items-center gap-1 px-2 py-1`}>
          {getRoleIcon(role)}
          <span className="font-medium">{getRoleLabel(role)}</span>
        </Badge>
      )}

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 hover:bg-gray-100">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-full flex items-center justify-center shadow-sm">
              <User className="h-4 w-4 text-white" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end" forceMount>
          {/* User Info */}
          <div className="flex items-center space-x-3 p-3 border-b">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.user_metadata?.full_name || 'User'}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {user.email}
              </p>
              {role && (
                <Badge className={`${getRoleColor(role)} text-xs mt-1`}>
                  {getRoleIcon(role)}
                  <span className="ml-1">{getRoleLabel(role)}</span>
                </Badge>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex items-center py-2 px-3 cursor-pointer hover:bg-gray-50">
              <User className="mr-3 h-4 w-4 text-gray-500" />
              <span>My Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link to="/dashboard" className="flex items-center py-2 px-3 cursor-pointer hover:bg-gray-50">
              <Settings className="mr-3 h-4 w-4 text-gray-500" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem 
            onClick={handleSignOut}
            className="flex items-center py-2 px-3 cursor-pointer hover:bg-red-50 text-red-600 focus:text-red-600"
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
