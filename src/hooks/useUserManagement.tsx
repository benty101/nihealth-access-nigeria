
import { useState, useEffect } from 'react';
import { userService, type UserWithRole } from '@/services/UserService';
import type { UserRole } from '@/hooks/useUserRole';
import { useToast } from '@/hooks/use-toast';
import { secureLogger } from '@/lib/secureLogger';
import { useAuth } from '@/contexts/AuthContext';

interface UseUserManagementProps {
  onStatsChange?: () => Promise<void>;
}

export const useUserManagement = ({ onStatsChange }: UseUserManagementProps = {}) => {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const { toast } = useToast();
  const { user: currentUser } = useAuth();

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      secureLogger.admin('users_list_accessed', currentUser?.id);
      
      const usersData = await userService.getAllUsers();
      setUsers(usersData);
      
      secureLogger.admin('users_list_loaded', currentUser?.id, { count: usersData.length });
      
      toast({
        title: "Success",
        description: `Loaded ${usersData.length} users successfully`
      });
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to load users';
      setError(errorMessage);
      
      secureLogger.error('Error loading users', error, { adminId: currentUser?.id });
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      secureLogger.admin('user_role_update_attempt', currentUser?.id, { 
        targetUserId: userId, 
        newRole 
      });
      
      await userService.updateUserRole(userId, newRole);
      await loadUsers(); // Refresh the list
      
      // Trigger stats refresh if callback provided
      if (onStatsChange) {
        await onStatsChange();
      }
      
      secureLogger.admin('user_role_updated', currentUser?.id, { 
        targetUserId: userId, 
        newRole 
      });
      
      toast({
        title: "Success",
        description: "User role updated successfully"
      });
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to update user role';
      
      secureLogger.error('Error updating user role', error, { 
        adminId: currentUser?.id,
        targetUserId: userId,
        attemptedRole: newRole
      });
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users: filteredUsers,
    loading,
    error,
    searchTerm,
    roleFilter,
    setSearchTerm,
    setRoleFilter,
    loadUsers,
    updateUserRole
  };
};
