
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
        
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          secureLogger.error('Error fetching user role', error, { userId: user.id });
          setRole('patient'); // Default fallback
        } else if (data) {
          secureLogger.auth('user_role_retrieved', user.id, { role: data.role });
          setRole(data.role as UserRole);
        } else {
          secureLogger.info('No role found, defaulting to patient', { userId: user.id });
          setRole('patient');
        }
      } catch (error) {
        secureLogger.error('Error fetching user role', error, { userId: user.id });
        setRole('patient');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  return { role, loading };
};
