
import { supabase } from '@/integrations/supabase/client';
import type { UserRole } from '@/hooks/useUserRole';

export interface UserWithRole {
  id: string;
  email: string;
  full_name?: string;
  role: UserRole;
  created_at: string;
}

class UserService {
  async getAllUsers(): Promise<UserWithRole[]> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          created_at,
          user_roles!inner(role)
        `);

      if (error) {
        console.error('Error fetching users:', error);
        throw error;
      }

      return (data || []).map(user => ({
        id: user.id,
        email: '', // We can't access auth.users email directly
        full_name: user.full_name || '',
        role: (user.user_roles as any)?.role || 'patient',
        created_at: user.created_at
      }));
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
}

export const userService = new UserService();
