
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
    const { data, error } = await supabase
      .from('telemedicine_providers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Alias method for component compatibility
  async getAllProviders(): Promise<TelemedicineProvider[]> {
    return this.getAllTelemedicineProviders();
  }

  async createTelemedicineProvider(provider: Omit<TelemedicineProvider, 'id' | 'created_at' | 'updated_at'>): Promise<TelemedicineProvider> {
    const { data, error } = await supabase
      .from('telemedicine_providers')
      .insert(provider)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateTelemedicineProvider(id: string, updates: Partial<TelemedicineProvider>): Promise<void> {
    const { error } = await supabase
      .from('telemedicine_providers')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  }

  // Alias method for component compatibility
  async updateProvider(id: string, updates: Partial<TelemedicineProvider>): Promise<void> {
    return this.updateTelemedicineProvider(id, updates);
  }

  async deleteTelemedicineProvider(id: string): Promise<void> {
    const { error } = await supabase
      .from('telemedicine_providers')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
  }
}

export const telemedicineService = new TelemedicineService();
