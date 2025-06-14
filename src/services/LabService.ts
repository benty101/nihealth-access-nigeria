
import { supabase } from '@/integrations/supabase/client';

export interface Lab {
  id: string;
  name: string;
  address?: string;
  state?: string;
  lga?: string;
  phone?: string;
  email?: string;
  license_number?: string;
  test_types?: string[];
  equipment?: string[];
  certifications?: string[];
  operating_hours?: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

class LabService {
  async getAllLabs(): Promise<Lab[]> {
    const { data, error } = await supabase
      .from('labs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createLab(lab: Omit<Lab, 'id' | 'created_at' | 'updated_at'>): Promise<Lab> {
    const { data, error } = await supabase
      .from('labs')
      .insert(lab)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateLab(id: string, updates: Partial<Lab>): Promise<void> {
    const { error } = await supabase
      .from('labs')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  }

  async deleteLab(id: string): Promise<void> {
    const { error } = await supabase
      .from('labs')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
  }
}

export const labService = new LabService();
