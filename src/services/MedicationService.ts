
import { supabase } from '@/integrations/supabase/client';
import type { Medication } from './AdminService';

class MedicationService {
  async getActiveMedications(): Promise<Medication[]> {
    console.log('MedicationService: Fetching all active medications for storefront...');
    
    const { data, error } = await supabase
      .from('medications')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('MedicationService: Error fetching active medications:', error);
      throw error;
    }

    console.log('MedicationService: Successfully fetched', data?.length || 0, 'active medications');
    return data || [];
  }
}

export const medicationService = new MedicationService();
