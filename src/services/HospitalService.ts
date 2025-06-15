
import { supabase } from '@/integrations/supabase/client';

export interface Hospital {
  id: string;
  name: string;
  address?: string;
  state?: string;
  lga?: string;
  phone?: string;
  email?: string;
  license_number?: string;
  facilities?: string[];
  specialties?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

class HospitalService {
  async getAllHospitals(): Promise<Hospital[]> {
    console.log('Fetching active hospitals...');
    const { data, error } = await supabase
      .from('hospitals')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching hospitals:', error);
      throw error;
    }

    console.log('Active Hospitals loaded:', data?.length || 0);
    return data || [];
  }

  async createHospital(hospital: Omit<Hospital, 'id' | 'created_at' | 'updated_at'>): Promise<Hospital> {
    console.log('Creating hospital:', hospital);
    const { data, error } = await supabase
      .from('hospitals')
      .insert(hospital)
      .select()
      .single();

    if (error) {
      console.error('Error creating hospital:', error);
      throw error;
    }

    console.log('Hospital created:', data);
    return data;
  }

  async updateHospital(id: string, updates: Partial<Hospital>): Promise<void> {
    console.log('Updating hospital:', id, updates);
    const { error } = await supabase
      .from('hospitals')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating hospital:', error);
      throw error;
    }

    console.log('Hospital updated successfully');
  }

  async deleteHospital(id: string): Promise<void> {
    console.log('Deactivating hospital:', id);
    const { error } = await supabase
      .from('hospitals')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deactivating hospital:', error);
      throw error;
    }

    console.log('Hospital deactivated successfully');
  }
}

export const hospitalService = new HospitalService();
