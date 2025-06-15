
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

export interface CreateMedicationRequest {
  name: string;
  category: string;
  price: number;
  description?: string;
  brand?: string;
  pack_size?: string;
  prescription_required: boolean;
  in_stock: boolean;
  active_ingredient?: string;
  dosage?: string;
  storage_instructions?: string;
  is_active: boolean;
}

export interface UpdateMedicationRequest {
  name?: string;
  category?: string;
  price?: number;
  description?: string;
  brand?: string;
  pack_size?: string;
  prescription_required?: boolean;
  in_stock?: boolean;
  active_ingredient?: string;
  dosage?: string;
  storage_instructions?: string;
  is_active?: boolean;
}

class MedicationService {
  async getAllMedications(): Promise<Medication[]> {
    console.log('MedicationService: Fetching all medications...');
    
    const { data, error } = await supabase
      .from('medications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('MedicationService: Error fetching medications:', error);
      throw error;
    }

    console.log('MedicationService: Successfully fetched', data?.length || 0, 'medications');
    return data || [];
  }

  async createMedication(medication: CreateMedicationRequest): Promise<Medication> {
    console.log('MedicationService: Creating medication:', medication);
    
    const { data, error } = await supabase
      .from('medications')
      .insert([medication])
      .select()
      .single();

    if (error) {
      console.error('MedicationService: Error creating medication:', error);
      throw error;
    }

    console.log('MedicationService: Successfully created medication:', data);
    return data;
  }

  async updateMedication(id: string, updates: UpdateMedicationRequest): Promise<Medication> {
    console.log('MedicationService: Updating medication:', id, updates);
    
    const { data, error } = await supabase
      .from('medications')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('MedicationService: Error updating medication:', error);
      throw error;
    }

    console.log('MedicationService: Successfully updated medication:', data);
    return data;
  }

  async deleteMedication(id: string): Promise<void> {
    console.log('MedicationService: Deleting medication:', id);
    
    const { error } = await supabase
      .from('medications')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('MedicationService: Error deleting medication:', error);
      throw error;
    }

    console.log('MedicationService: Successfully deleted medication');
  }
}

export const medicationService = new MedicationService();
