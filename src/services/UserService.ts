
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
      
      // First, get all profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw profilesError;
      }

      console.log('Profiles fetched:', profilesData?.length || 0);

      // Then get all user roles separately
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) {
        console.error('Error fetching user roles:', rolesError);
        console.log('Continuing without roles data...');
      }

      console.log('Roles fetched:', rolesData?.length || 0);

      // Combine the data manually
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

      console.log('Users processed:', users.length);
      return users;
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      throw error;
    }
  }

  async updateUserRole(userId: string, newRole: UserRole): Promise<void> {
    try {
      console.log('Updating user role:', { userId, newRole });
      
      // First, check if the user role exists
      const { data: existingRole, error: checkError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing role:', checkError);
        throw checkError;
      }

      if (existingRole) {
        // Update existing role
        const { error: updateError } = await supabase
          .from('user_roles')
          .update({ role: newRole })
          .eq('user_id', userId);

        if (updateError) {
          console.error('Error updating user role:', updateError);
          throw updateError;
        }
      } else {
        // Insert new role
        const { error: insertError } = await supabase
          .from('user_roles')
          .insert({
            user_id: userId,
            role: newRole
          });

        if (insertError) {
          console.error('Error inserting user role:', insertError);
          throw insertError;
        }
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
}

export const userService = new UserService();
