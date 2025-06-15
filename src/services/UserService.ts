
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
      // First get users from profiles with their roles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          phone_number,
          created_at,
          user_roles(role)
        `);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw profilesError;
      }

      // Get user emails from auth.users (this requires RLS bypass or admin access)
      const users: UserWithRole[] = [];
      
      for (const profile of profilesData || []) {
        const role = (profile.user_roles as any)?.[0]?.role || 'patient';
        
        users.push({
          id: profile.id,
          email: 'email@hidden.com', // Email is protected, we'll need to get this differently
          full_name: profile.full_name || '',
          phone_number: profile.phone_number || '',
          role: role as UserRole,
          created_at: profile.created_at,
          is_active: true
        });
      }

      return users;
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      throw error;
    }
  }

  async updateUserRole(userId: string, newRole: UserRole): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({
          user_id: userId,
          role: newRole
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Error updating user role:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in updateUserRole:', error);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      // Delete user role first
      await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      // Delete profile
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) {
        console.error('Error deleting user:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in deleteUser:', error);
      throw error;
    }
  }

  async createUser(userData: {
    full_name: string;
    email: string;
    phone_number?: string;
    role: UserRole;
  }): Promise<void> {
    try {
      // This would typically require admin SDK to create auth users
      // For now, we'll just show how the structure would work
      console.log('Creating user:', userData);
      throw new Error('User creation requires admin SDK implementation');
    } catch (error) {
      console.error('Error in createUser:', error);
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
        throw error;
      }
    } catch (error) {
      console.error('Error in updateUserProfile:', error);
      throw error;
    }
  }

  async toggleUserStatus(userId: string, isActive: boolean): Promise<void> {
    try {
      // We can add an is_active column to profiles if needed
      console.log(`Toggling user ${userId} status to ${isActive}`);
      // Implementation would depend on how we track user status
    } catch (error) {
      console.error('Error in toggleUserStatus:', error);
      throw error;
    }
  }
}

export const userService = new UserService();
