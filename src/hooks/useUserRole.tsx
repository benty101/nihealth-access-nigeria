
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
        secureLogger.info('Starting secure role fetch for user', { userId: user.id });
        
        // SECURITY: Use only database-based role checking via RPC function
        const { data: rpcResult, error: rpcError } = await supabase
          .rpc('get_user_role', { _user_id: user.id });

        if (!rpcError && rpcResult) {
          secureLogger.auth('role_fetched_securely_via_rpc', user.id, { role: rpcResult });
          setRole(rpcResult as UserRole);
          setLoading(false);
          return;
        }

        secureLogger.info('RPC failed, trying direct query with enhanced security', { 
          userId: user.id, 
          error: rpcError 
        });

        // Fallback to direct query with enhanced security
        const { data: directResult, error: directError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();

        if (!directError && directResult) {
          secureLogger.auth('role_fetched_directly_with_security', user.id, { role: directResult.role });
          setRole(directResult.role as UserRole);
        } else {
          secureLogger.info('No role found, defaulting to patient for security', { 
            userId: user.id, 
            error: directError?.message 
          });
          // SECURITY: Default to least privileged role
          setRole('patient');
        }

      } catch (error) {
        secureLogger.error('Critical error in secure fetchUserRole', error, { userId: user.id });
        // SECURITY: On error, default to least privileged role
        setRole('patient');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  // Enhanced security logging
  useEffect(() => {
    if (!loading) {
      secureLogger.info('Final secure role state', { 
        userId: user?.id, 
        role,
        loading,
        timestamp: new Date().toISOString()
      });
    }
  }, [role, loading, user?.id]);

  return { role, loading };
};
