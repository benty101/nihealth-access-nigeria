
import { supabase } from '@/integrations/supabase/client';
import type { UserRole } from '@/hooks/useUserRole';

export interface Hospital {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  license_number?: string;
  state?: string;
  lga?: string;
  specialties?: string[];
  facilities?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

class HospitalService {
  async getAllHospitals(): Promise<Hospital[]> {
    const { data, error } = await supabase
      .from('hospitals')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createHospital(hospital: Omit<Hospital, 'id' | 'created_at' | 'updated_at'>): Promise<Hospital> {
    const { data, error } = await supabase
      .from('hospitals')
      .insert(hospital)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateHospital(id: string, updates: Partial<Hospital>): Promise<void> {
    const { error } = await supabase
      .from('hospitals')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  }

  async deleteHospital(id: string): Promise<void> {
    const { error } = await supabase
      .from('hospitals')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
  }

  async assignHospitalAdmin(userId: string, hospitalId: string): Promise<void> {
    // First update user role to hospital_admin
    const { error: roleError } = await supabase
      .from('user_roles')
      .upsert({
        user_id: userId,
        role: 'hospital_admin' as UserRole
      });

    if (roleError) throw roleError;

    // Then assign to hospital
    const { error } = await supabase
      .from('hospital_staff')
      .upsert({
        user_id: userId,
        hospital_id: hospitalId,
        position: 'admin'
      });

    if (error) throw error;
  }
}

export const hospitalService = new HospitalService();
