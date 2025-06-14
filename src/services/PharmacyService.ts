
import { supabase } from '@/integrations/supabase/client';

export interface Pharmacy {
  id: string;
  name: string;
  address?: string;
  state?: string;
  lga?: string;
  phone?: string;
  email?: string;
  license_number?: string;
  specialties?: string[];
  services?: string[];
  operating_hours?: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

class PharmacyService {
  async getAllPharmacies(): Promise<Pharmacy[]> {
    const { data, error } = await supabase
      .from('pharmacies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createPharmacy(pharmacy: Omit<Pharmacy, 'id' | 'created_at' | 'updated_at'>): Promise<Pharmacy> {
    const { data, error } = await supabase
      .from('pharmacies')
      .insert(pharmacy)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updatePharmacy(id: string, updates: Partial<Pharmacy>): Promise<void> {
    const { error } = await supabase
      .from('pharmacies')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  }

  async deletePharmacy(id: string): Promise<void> {
    const { error } = await supabase
      .from('pharmacies')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
  }
}

export const pharmacyService = new PharmacyService();
