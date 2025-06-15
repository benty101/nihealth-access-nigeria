
import { supabase } from '@/integrations/supabase/client';

export interface Pharmacy {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  license_number?: string;
  state?: string;
  lga?: string;
  specialties?: string[];
  services?: string[];
  operating_hours?: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePharmacyRequest {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  license_number?: string;
  state?: string;
  lga?: string;
  specialties?: string[];
  services?: string[];
  operating_hours?: any;
  is_active: boolean;
}

export interface UpdatePharmacyRequest {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  license_number?: string;
  state?: string;
  lga?: string;
  specialties?: string[];
  services?: string[];
  operating_hours?: any;
  is_active?: boolean;
}

class PharmacyService {
  async getAllPharmacies(): Promise<Pharmacy[]> {
    console.log('PharmacyService: Fetching all active pharmacies...');
    
    const { data, error } = await supabase
      .from('pharmacies')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('PharmacyService: Error fetching pharmacies:', error);
      throw error;
    }

    console.log('PharmacyService: Successfully fetched', data?.length || 0, 'active pharmacies');
    return data || [];
  }

  async createPharmacy(pharmacy: CreatePharmacyRequest): Promise<Pharmacy> {
    console.log('PharmacyService: Creating pharmacy:', pharmacy);
    
    const { data, error } = await supabase
      .from('pharmacies')
      .insert([pharmacy])
      .select()
      .single();

    if (error) {
      console.error('PharmacyService: Error creating pharmacy:', error);
      throw error;
    }

    console.log('PharmacyService: Successfully created pharmacy:', data);
    return data;
  }

  async updatePharmacy(id: string, updates: UpdatePharmacyRequest): Promise<Pharmacy> {
    console.log('PharmacyService: Updating pharmacy:', id, updates);
    
    const { data, error } = await supabase
      .from('pharmacies')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('PharmacyService: Error updating pharmacy:', error);
      throw error;
    }

    console.log('PharmacyService: Successfully updated pharmacy:', data);
    return data;
  }

  async deletePharmacy(id: string): Promise<void> {
    console.log('PharmacyService: Deleting pharmacy:', id);
    
    const { error } = await supabase
      .from('pharmacies')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('PharmacyService: Error deleting pharmacy:', error);
      throw error;
    }

    console.log('PharmacyService: Successfully deleted pharmacy');
  }
}

export const pharmacyService = new PharmacyService();
