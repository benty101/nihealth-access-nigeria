
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
    console.log('Fetching pharmacies...');
    const { data, error } = await supabase
      .from('pharmacies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pharmacies:', error);
      throw error;
    }

    console.log('Pharmacies loaded:', data?.length || 0);
    return data || [];
  }

  async createPharmacy(pharmacy: Omit<Pharmacy, 'id' | 'created_at' | 'updated_at'>): Promise<Pharmacy> {
    console.log('Creating pharmacy:', pharmacy);
    const { data, error } = await supabase
      .from('pharmacies')
      .insert(pharmacy)
      .select()
      .single();

    if (error) {
      console.error('Error creating pharmacy:', error);
      throw error;
    }

    console.log('Pharmacy created:', data);
    return data;
  }

  async updatePharmacy(id: string, updates: Partial<Pharmacy>): Promise<void> {
    console.log('Updating pharmacy:', id, updates);
    const { error } = await supabase
      .from('pharmacies')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating pharmacy:', error);
      throw error;
    }

    console.log('Pharmacy updated successfully');
  }

  async deletePharmacy(id: string): Promise<void> {
    console.log('Deactivating pharmacy:', id);
    const { error } = await supabase
      .from('pharmacies')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deactivating pharmacy:', error);
      throw error;
    }

    console.log('Pharmacy deactivated successfully');
  }
}

export const pharmacyService = new PharmacyService();
