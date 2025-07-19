
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { secureLogger } from '@/lib/secureLogger';

export type UserRole = 'super_admin' | 'hospital_admin' | 'patient' | 'broker';

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
        
        // Use the updated RPC function that handles recursion properly
        const { data: rpcResult, error: rpcError } = await supabase
          .rpc('get_user_role', { _user_id: user.id });

        console.log('RPC Result:', rpcResult, 'Error:', rpcError);

        if (!rpcError && rpcResult) {
          secureLogger.auth('role_fetched_securely_via_rpc', user.id, { role: rpcResult });
          setRole(rpcResult as UserRole);
        } else {
          // Check if user is super admin by email as fallback
          const { data: userData } = await supabase.auth.getUser();
          const userEmail = userData?.user?.email;
          
          if (userEmail === 'kosyezenekwe@gmail.com') {
            console.log('Setting super_admin role via email fallback');
            setRole('super_admin');
          } else {
            secureLogger.info('RPC failed, defaulting to patient for security', { 
              userId: user.id, 
              error: rpcError 
            });
            // SECURITY: Default to least privileged role
            setRole('patient');
          }
        }

      } catch (error) {
        console.error('Error in fetchUserRole:', error);
        secureLogger.error('Critical error in secure fetchUserRole', error, { userId: user.id });
        
        // Try email fallback as last resort
        try {
          const { data: userData } = await supabase.auth.getUser();
          const userEmail = userData?.user?.email;
          
          if (userEmail === 'kosyezenekwe@gmail.com') {
            console.log('Setting super_admin role via email fallback after error');
            setRole('super_admin');
          } else {
            setRole('patient');
          }
        } catch {
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
