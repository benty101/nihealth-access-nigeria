
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
import { User, LogOut, Shield, Building2 } from 'lucide-react';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const { role } = useUserRole();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
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

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link to="/auth">
          <Button variant="ghost">Sign In</Button>
        </Link>
        <Link to="/auth">
          <Button>Get Started</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {role && (
        <Badge className={`${getRoleColor(role)} text-xs flex items-center gap-1`}>
          {getRoleIcon(role)}
          {role.replace('_', ' ').toUpperCase()}
        </Badge>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
