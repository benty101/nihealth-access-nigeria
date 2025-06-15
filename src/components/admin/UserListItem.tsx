
import React from 'react';
import { Building2, Shield, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { UserWithRole, UserRole } from '@/services/UserService';

interface UserListItemProps {
  user: UserWithRole;
  onRoleUpdate: (userId: string, newRole: UserRole) => Promise<void>;
}

const UserListItem = ({ user, onRoleUpdate }: UserListItemProps) => {
  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return <Shield className="h-4 w-4" />;
      case 'hospital_admin':
        return <Building2 className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'hospital_admin':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3 mb-4 sm:mb-0">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">
            {user.full_name || 'Unnamed User'}
          </h3>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-xs text-gray-500">
            Joined {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Badge className={getRoleBadgeColor(user.role)}>
          {getRoleIcon(user.role)}
          <span className="ml-1 capitalize">{user.role.replace('_', ' ')}</span>
        </Badge>
        
        <Select
          value={user.role}
          onValueChange={(newRole: UserRole) => onRoleUpdate(user.id, newRole)}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="patient">Patient</SelectItem>
            <SelectItem value="hospital_admin">Hospital Admin</SelectItem>
            <SelectItem value="super_admin">Super Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UserListItem;
