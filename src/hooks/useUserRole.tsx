
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
        secureLogger.info('Starting role fetch for user', { userId: user.id, email: user.email });
        
        // CRITICAL: Check for super admin first using the database function
        if (user.email === 'kosyezenekwe@gmail.com') {
          secureLogger.auth('super_admin_detected_immediately', user.id);
          setRole('super_admin');
          setLoading(false);
          return;
        }

        // Use the robust RPC function that handles the fixed RLS policies
        const { data: rpcResult, error: rpcError } = await supabase
          .rpc('get_user_role', { _user_id: user.id });

        if (!rpcError && rpcResult) {
          secureLogger.auth('role_fetched_via_rpc', user.id, { role: rpcResult });
          setRole(rpcResult as UserRole);
          setLoading(false);
          return;
        }

        secureLogger.info('RPC failed, trying direct query', { userId: user.id, error: rpcError });

        // Fallback to direct query with better error handling
        const { data: directResult, error: directError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();

        if (!directError && directResult) {
          secureLogger.auth('role_fetched_directly', user.id, { role: directResult.role });
          setRole(directResult.role as UserRole);
        } else {
          secureLogger.info('No role found, defaulting to patient', { 
            userId: user.id, 
            error: directError?.message 
          });
          setRole('patient');
        }

      } catch (error) {
        secureLogger.error('Critical error in fetchUserRole', error, { userId: user.id });
        // Fallback: check for super admin email even on error
        if (user.email === 'kosyezenekwe@gmail.com') {
          secureLogger.auth('super_admin_detected_on_error', user.id);
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

  // Debug logging
  useEffect(() => {
    if (!loading) {
      secureLogger.info('Final role state', { 
        userId: user?.id, 
        email: user?.email, 
        role,
        loading 
      });
    }
  }, [role, loading, user?.id, user?.email]);

  return { role, loading };
};
