
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
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        user_roles(role),
        created_at
      `);

    if (error) throw error;

    return data.map(user => ({
      id: user.id,
      email: '', // We can't access auth.users email directly
      full_name: user.full_name || '',
      role: (user.user_roles as any)?.[0]?.role || 'patient',
      created_at: user.created_at
    }));
  }

  async updateUserRole(userId: string, newRole: UserRole): Promise<void> {
    const { error } = await supabase
      .from('user_roles')
      .upsert({
        user_id: userId,
        role: newRole
      });

    if (error) throw error;
  }
}

export const userService = new UserService();
