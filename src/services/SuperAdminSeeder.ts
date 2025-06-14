
import { supabase } from '@/integrations/supabase/client';

export class SuperAdminSeeder {
  static async createSuperAdmin() {
    try {
      console.log('Creating super admin account...');
      
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
        // If user already exists, that's fine - just log it and continue
        if (signUpError.message.includes('already registered') || signUpError.message.includes('User already registered')) {
          console.log('Super admin already exists');
          return { success: true };
        }
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
