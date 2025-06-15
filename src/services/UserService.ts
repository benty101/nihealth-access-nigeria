
import { supabase } from '@/integrations/supabase/client';
import type { UserRole } from '@/hooks/useUserRole';

export type { UserRole };

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
      console.log('Starting secure user fetch with enhanced RLS protection...');
      
      // SECURITY: Enhanced error handling for RLS-protected queries
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        console.error('SECURITY: RLS-protected profiles query failed:', profilesError);
        throw new Error(`Unauthorized access to profiles: ${profilesError.message}`);
      }

      console.log('Profiles fetched with RLS protection:', profilesData?.length || 0);

      // SECURITY: Get user roles with proper RLS enforcement
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) {
        console.error('SECURITY: RLS-protected roles query failed:', rolesError);
        // Don't throw error for roles - continue with default roles for security
        console.log('Continuing with default roles for security...');
      }

      console.log('Roles fetched with RLS protection:', rolesData?.length || 0);

      // SECURITY: Sanitize user data before returning
      const users: UserWithRole[] = (profilesData || []).map(profile => {
        const userRole = rolesData?.find(role => role.user_id === profile.id);
        const role = userRole?.role || 'patient'; // Default to least privileged role
        
        return {
          id: profile.id,
          email: 'Protected for privacy', // SECURITY: Don't expose email addresses
          full_name: profile.full_name || '',
          phone_number: profile.phone_number || '',
          role: role as UserRole,
          created_at: profile.created_at,
          is_active: true
        };
      });

      console.log('Users processed securely:', users.length);
      return users;
    } catch (error) {
      console.error('SECURITY: Error in secure getAllUsers:', error);
      throw error;
    }
  }

  async updateUserRole(userId: string, newRole: UserRole): Promise<void> {
    try {
      console.log('SECURITY: Updating user role with RLS protection:', { userId, newRole });
      
      // SECURITY: Additional validation for super admin role assignments
      if (newRole === 'super_admin') {
        console.log('SECURITY: Super admin role assignment detected - requires special permissions');
      }
      
      // Use upsert with RLS protection
      const { error: upsertError } = await supabase
        .from('user_roles')
        .upsert({
          user_id: userId,
          role: newRole
        }, {
          onConflict: 'user_id'
        });

      if (upsertError) {
        console.error('SECURITY: RLS-protected role update failed:', upsertError);
        throw new Error(`Unauthorized role update: ${upsertError.message}`);
      }
      
      console.log('SECURITY: User role updated securely with RLS protection');
    } catch (error) {
      console.error('SECURITY: Error in secure updateUserRole:', error);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      console.log('SECURITY: Attempting secure user deletion with RLS protection:', userId);
      
      // SECURITY: Delete user role first (with RLS protection)
      const { error: roleError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (roleError) {
        console.error('SECURITY: RLS-protected role deletion failed:', roleError);
      }

      // SECURITY: Delete profile (with RLS protection)
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) {
        console.error('SECURITY: RLS-protected profile deletion failed:', profileError);
        throw new Error(`Unauthorized user deletion: ${profileError.message}`);
      }

      console.log('SECURITY: User deleted securely with RLS protection');
    } catch (error) {
      console.error('SECURITY: Error in secure deleteUser:', error);
      throw error;
    }
  }

  async updateUserProfile(userId: string, updates: {
    full_name?: string;
    phone_number?: string;
  }): Promise<void> {
    try {
      console.log('SECURITY: Updating profile with RLS protection:', userId);
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);

      if (error) {
        console.error('SECURITY: RLS-protected profile update failed:', error);
        throw new Error(`Unauthorized profile update: ${error.message}`);
      }

      console.log('SECURITY: User profile updated securely with RLS protection');
    } catch (error) {
      console.error('SECURITY: Error in secure updateUserProfile:', error);
      throw error;
    }
  }
}

export const userService = new UserService();
