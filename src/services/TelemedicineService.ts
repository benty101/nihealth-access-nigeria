
import { supabase } from '@/integrations/supabase/client';

export interface TelemedicineProvider {
  id: string;
  name: string;
  specialization?: string;
  license_number?: string;
  phone?: string;
  email?: string;
  consultation_fee?: number;
  available_hours?: any;
  languages?: string[];
  experience_years?: number;
  rating?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

class TelemedicineService {
  async getAllTelemedicineProviders(): Promise<TelemedicineProvider[]> {
    console.log('Fetching telemedicine providers...');
    const { data, error } = await supabase
      .from('telemedicine_providers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching telemedicine providers:', error);
      throw error;
    }
    
    console.log('Telemedicine providers loaded:', data?.length || 0);
    return data || [];
  }

  // Alias method for component compatibility
  async getAllProviders(): Promise<TelemedicineProvider[]> {
    return this.getAllTelemedicineProviders();
  }

  async createTelemedicineProvider(provider: Omit<TelemedicineProvider, 'id' | 'created_at' | 'updated_at'>): Promise<TelemedicineProvider> {
    console.log('Creating telemedicine provider:', provider);
    const { data, error } = await supabase
      .from('telemedicine_providers')
      .insert(provider)
      .select()
      .single();

    if (error) {
      console.error('Error creating telemedicine provider:', error);
      throw error;
    }
    
    console.log('Telemedicine provider created:', data);
    return data;
  }

  async updateTelemedicineProvider(id: string, updates: Partial<TelemedicineProvider>): Promise<void> {
    console.log('Updating telemedicine provider:', id, updates);
    const { error } = await supabase
      .from('telemedicine_providers')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating telemedicine provider:', error);
      throw error;
    }
    
    console.log('Telemedicine provider updated successfully');
  }

  // Alias method for component compatibility
  async updateProvider(id: string, updates: Partial<TelemedicineProvider>): Promise<void> {
    return this.updateTelemedicineProvider(id, updates);
  }

  async deleteTelemedicineProvider(id: string): Promise<void> {
    console.log('Deactivating telemedicine provider:', id);
    const { error } = await supabase
      .from('telemedicine_providers')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deactivating telemedicine provider:', error);
      throw error;
    }
    
    console.log('Telemedicine provider deactivated successfully');
  }
}

export const telemedicineService = new TelemedicineService();
