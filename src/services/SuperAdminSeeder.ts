
import { supabase } from '@/integrations/supabase/client';

export class SuperAdminSeeder {
  static async createSuperAdmin() {
    try {
      console.log('Creating super admin account...');
      
      // Check if super admin already exists first
      const { data: existingUser } = await supabase.auth.admin.listUsers();
      const adminExists = existingUser?.users?.some(user => user.email === 'admin@meddypal.com');
      
      if (adminExists) {
        console.log('Super admin already exists');
        return { success: true };
      }
      
      // Create the super admin without signing them in
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: 'admin@meddypal.com',
        password: 'admin123',
        options: {
          data: {
            full_name: 'Super Administrator'
          },
          emailRedirectTo: undefined
        }
      });

      if (signUpError) {
        console.error('Error creating super admin:', signUpError);
        return { success: false, error: signUpError.message };
      }

      const userId = signUpData?.user?.id;
      
      if (!userId) {
        return { success: false, error: 'Could not determine user ID' };
      }

      // Set the super admin role
      const { error: roleError } = await supabase
        .from('user_roles')
        .upsert({
          user_id: userId,
          role: 'super_admin'
        });

      if (roleError) {
        console.error('Error setting super admin role:', roleError);
        return { success: false, error: roleError.message };
      }

      console.log('Super admin account created successfully');
      return { success: true };
    } catch (error: any) {
      console.error('Unexpected error:', error);
      return { success: false, error: error.message };
    }
  }
}
