
import { supabase } from '@/integrations/supabase/client';
import type { UserRole } from '@/hooks/useUserRole';

export interface UserWithRole {
  id: string;
  email: string;
  full_name?: string;
  role: UserRole;
  created_at: string;
  phone_number?: string;
  is_active: boolean;
}

class UserService {
  async getAllUsers(): Promise<UserWithRole[]> {
    try {
      console.log('Starting to fetch all users...');
      
      // First, get all profiles with better error handling
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw new Error(`Failed to fetch profiles: ${profilesError.message}`);
      }

      console.log('Profiles fetched:', profilesData?.length || 0);

      // Get user roles using the new RLS-compliant approach
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) {
        console.error('Error fetching user roles:', rolesError);
        // Don't throw error, continue with default roles
        console.log('Continuing with default roles...');
      }

      console.log('Roles fetched:', rolesData?.length || 0);

      // Combine the data
      const users: UserWithRole[] = (profilesData || []).map(profile => {
        const userRole = rolesData?.find(role => role.user_id === profile.id);
        const role = userRole?.role || 'patient';
        
        return {
          id: profile.id,
          email: 'Protected for privacy',
          full_name: profile.full_name || '',
          phone_number: profile.phone_number || '',
          role: role as UserRole,
          created_at: profile.created_at,
          is_active: true
        };
      });

      console.log('Users processed successfully:', users.length);
      return users;
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      throw error;
    }
  }

  async updateUserRole(userId: string, newRole: UserRole): Promise<void> {
    try {
      console.log('Updating user role:', { userId, newRole });
      
      // Use upsert to handle both insert and update cases
      const { error: upsertError } = await supabase
        .from('user_roles')
        .upsert({
          user_id: userId,
          role: newRole
        }, {
          onConflict: 'user_id'
        });

      if (upsertError) {
        console.error('Error upserting user role:', upsertError);
        throw new Error(`Failed to update user role: ${upsertError.message}`);
      }
      
      console.log('User role updated successfully');
    } catch (error) {
      console.error('Error in updateUserRole:', error);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      // Delete user role first
      const { error: roleError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (roleError) {
        console.error('Error deleting user role:', roleError);
      }

      // Delete profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) {
        console.error('Error deleting user profile:', profileError);
        throw new Error(`Failed to delete user: ${profileError.message}`);
      }

      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error in deleteUser:', error);
      throw error;
    }
  }

  async updateUserProfile(userId: string, updates: {
    full_name?: string;
    phone_number?: string;
  }): Promise<void> {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);

      if (error) {
        console.error('Error updating user profile:', error);
        throw new Error(`Failed to update profile: ${error.message}`);
      }

      console.log('User profile updated successfully');
    } catch (error) {
      console.error('Error in updateUserProfile:', error);
      throw error;
    }
  }
}

export const userService = new UserService();
