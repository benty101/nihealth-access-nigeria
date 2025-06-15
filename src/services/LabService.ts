
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
    console.log('Fetching active labs for frontend...');
    const { data, error } = await supabase
      .from('labs')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching labs:', error);
      throw error;
    }

    console.log('Active labs loaded:', data?.length || 0);
    return data || [];
  }

  async createLab(lab: Omit<Lab, 'id' | 'created_at' | 'updated_at'>): Promise<Lab> {
    console.log('Creating lab:', lab);
    const { data, error } = await supabase
      .from('labs')
      .insert(lab)
      .select()
      .single();

    if (error) {
      console.error('Error creating lab:', error);
      throw error;
    }

    console.log('Lab created:', data);
    return data;
  }

  async updateLab(id: string, updates: Partial<Lab>): Promise<void> {
    console.log('Updating lab:', id, updates);
    const { error } = await supabase
      .from('labs')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating lab:', error);
      throw error;
    }

    console.log('Lab updated successfully');
  }

  async deleteLab(id: string): Promise<void> {
    console.log('Deactivating lab:', id);
    const { error } = await supabase
      .from('labs')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deactivating lab:', error);
      throw error;
    }

    console.log('Lab deactivated successfully');
  }
}

export const labService = new LabService();
