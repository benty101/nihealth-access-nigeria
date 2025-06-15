
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { secureLogger } from '@/lib/secureLogger';

export type UserRole = 'super_admin' | 'hospital_admin' | 'patient';

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setLoading(false);
      return;
    }

    const fetchUserRole = async () => {
      try {
        secureLogger.info('Fetching role for user', { userId: user.id, email: user.email });
        
        // FIRST: Check if this is the super admin by email
        if (user.email === 'kosyezenekwe@gmail.com') {
          secureLogger.auth('super_admin_detected_by_email_first', user.id);
          setRole('super_admin');
          setLoading(false);
          return;
        }

        // Try to use the security definer function
        const { data: functionResult, error: functionError } = await supabase
          .rpc('get_user_role', { _user_id: user.id });

        if (!functionError && functionResult) {
          secureLogger.auth('user_role_retrieved_via_function', user.id, { role: functionResult });
          setRole(functionResult as UserRole);
          setLoading(false);
          return;
        }

        secureLogger.info('Function failed, trying direct query', { userId: user.id, error: functionError });
        
        // Try direct query
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error) {
          secureLogger.error('Error fetching user role directly', error, { userId: user.id });
          // Default fallback to patient
          setRole('patient');
        } else if (data) {
          secureLogger.auth('user_role_retrieved_direct', user.id, { role: data.role });
          setRole(data.role as UserRole);
        } else {
          secureLogger.info('No role found, defaulting to patient', { userId: user.id });
          setRole('patient');
        }
      } catch (error) {
        secureLogger.error('Error in fetchUserRole', error, { userId: user.id });
        // Final fallback
        setRole('patient');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  return { role, loading };
};
