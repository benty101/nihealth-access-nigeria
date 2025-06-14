
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
        secureLogger.info('Fetching role for user', { userId: user.id });
        
        // Try to use the security definer function first
        const { data: functionResult, error: functionError } = await supabase
          .rpc('get_user_role', { _user_id: user.id });

        if (!functionError && functionResult) {
          secureLogger.auth('user_role_retrieved_via_function', user.id, { role: functionResult });
          setRole(functionResult as UserRole);
          setLoading(false);
          return;
        }

        // If function fails, try direct query (bypassing RLS temporarily)
        secureLogger.info('Function failed, trying direct query', { userId: user.id, error: functionError });
        
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error) {
          if (error.code === '42P17') {
            secureLogger.error('RLS infinite recursion detected, using fallback', error, { userId: user.id });
            // For super admin accounts created in development, check email
            if (user.email === 'admin@meddypal.com') {
              secureLogger.auth('super_admin_detected_by_email', user.id);
              setRole('super_admin');
            } else {
              setRole('patient'); // Safe fallback
            }
          } else {
            secureLogger.error('Error fetching user role', error, { userId: user.id });
            setRole('patient'); // Default fallback
          }
        } else if (data) {
          secureLogger.auth('user_role_retrieved_direct', user.id, { role: data.role });
          setRole(data.role as UserRole);
        } else {
          secureLogger.info('No role found, defaulting to patient', { userId: user.id });
          setRole('patient');
        }
      } catch (error) {
        secureLogger.error('Error fetching user role', error, { userId: user.id });
        // Check for super admin by email as fallback
        if (user.email === 'admin@meddypal.com') {
          secureLogger.auth('super_admin_fallback_by_email', user.id);
          setRole('super_admin');
        } else {
          setRole('patient');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  return { role, loading };
};
