
import { supabase } from '@/integrations/supabase/client';

export class SuperAdminSeeder {
  static async createSuperAdmin() {
    try {
      console.log('Creating super admin account...');
      
      // First, try to sign up the super admin
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: 'admin@meddypal.com',
        password: 'adimm',
        options: {
          data: {
            full_name: 'Super Administrator'
          }
        }
      });

      if (signUpError && !signUpError.message.includes('already registered')) {
        console.error('Error creating super admin:', signUpError);
        return { success: false, error: signUpError.message };
      }

      // If user was created or already exists, ensure they have super_admin role
      let userId = signUpData?.user?.id;
      
      if (!userId) {
        // Try to sign in to get the user ID if signup failed due to existing user
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: 'admin@meddypal.com',
          password: 'adimm'
        });

        if (signInError) {
          console.error('Error signing in super admin:', signInError);
          return { success: false, error: signInError.message };
        }

        userId = signInData?.user?.id;
      }

      if (!userId) {
        return { success: false, error: 'Could not determine user ID' };
      }

      // Ensure the super admin role exists
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
