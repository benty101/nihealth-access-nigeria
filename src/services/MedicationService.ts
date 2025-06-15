
import { supabase } from '@/integrations/supabase/client';

export interface Medication {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  brand?: string;
  pack_size?: string;
  prescription_required: boolean;
  in_stock: boolean;
  rating?: number;
  pharmacy_id?: string;
  active_ingredient?: string;
  dosage?: string;
  side_effects?: string[];
  contraindications?: string[];
  storage_instructions?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

class MedicationService {
  async getAllMedications(): Promise<Medication[]> {
    console.log('Fetching medications...');
    const { data, error } = await supabase
      .from('medications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching medications:', error);
      throw error;
    }

    console.log('Medications loaded:', data?.length || 0);
    return data || [];
  }

  async createMedication(medication: Omit<Medication, 'id' | 'created_at' | 'updated_at'>): Promise<Medication> {
    console.log('Creating medication:', medication);
    const { data, error } = await supabase
      .from('medications')
      .insert(medication)
      .select()
      .single();

    if (error) {
      console.error('Error creating medication:', error);
      throw error;
    }

    console.log('Medication created:', data);
    return data;
  }

  async updateMedication(id: string, updates: Partial<Medication>): Promise<void> {
    console.log('Updating medication:', id, updates);
    const { error } = await supabase
      .from('medications')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating medication:', error);
      throw error;
    }

    console.log('Medication updated successfully');
  }

  async deleteMedication(id: string): Promise<void> {
    console.log('Deactivating medication:', id);
    const { error } = await supabase
      .from('medications')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deactivating medication:', error);
      throw error;
    }

    console.log('Medication deactivated successfully');
  }
}

export const medicationService = new MedicationService();
