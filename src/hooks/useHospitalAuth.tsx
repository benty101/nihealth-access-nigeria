import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';

export interface HospitalStaff {
  id: string;
  user_id: string;
  hospital_id: string;
  position?: string;
  is_active: boolean;
  created_at?: string;
  hospitals?: {
    id: string;
    name: string;
    address?: string;
    phone?: string;
    email?: string;
  };
}

export const useHospitalAuth = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const [hospitalStaff, setHospitalStaff] = useState<HospitalStaff | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorizedHospitals, setAuthorizedHospitals] = useState<string[]>([]);

  useEffect(() => {
    if (!user) {
      setHospitalStaff(null);
      setAuthorizedHospitals([]);
      setLoading(false);
      return;
    }

    const fetchHospitalAuth = async () => {
      try {
        // Super admins have access to all hospitals
        if (role === 'super_admin') {
          const { data: hospitals } = await supabase
            .from('hospitals')
            .select('id')
            .eq('is_active', true);
          
          setAuthorizedHospitals(hospitals?.map(h => h.id) || []);
          setLoading(false);
          return;
        }

        // Check if user is hospital staff
        const { data: staffData, error } = await supabase
          .from('hospital_staff')
          .select(`
            *,
            hospitals (
              id,
              name,
              address,
              phone,
              email
            )
          `)
          .eq('user_id', user.id)
          .eq('is_active', true)
          .single();

        if (!error && staffData) {
          setHospitalStaff(staffData as HospitalStaff);
          setAuthorizedHospitals([staffData.hospital_id]);
        } else {
          setHospitalStaff(null);
          setAuthorizedHospitals([]);
        }
      } catch (error) {
        console.error('Error fetching hospital authorization:', error);
        setHospitalStaff(null);
        setAuthorizedHospitals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalAuth();
  }, [user, role]);

  const isAuthorizedForHospital = (hospitalId: string): boolean => {
    return role === 'super_admin' || authorizedHospitals.includes(hospitalId);
  };

  const getPrimaryHospitalId = (): string | null => {
    if (role === 'super_admin') return null; // Super admin can work with any hospital
    return hospitalStaff?.hospital_id || null;
  };

  return {
    hospitalStaff,
    authorizedHospitals,
    loading,
    isAuthorizedForHospital,
    getPrimaryHospitalId,
    isHospitalAdmin: role === 'hospital_admin' || role === 'super_admin'
  };
};