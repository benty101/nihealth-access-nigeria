
import { supabase } from '@/integrations/supabase/client';
import type { Pharmacy } from './AdminService';

class PharmacyService {
  async getActivePharmacies(): Promise<Pharmacy[]> {
    console.log('PharmacyService: Fetching all active pharmacies for storefront...');

    const { data, error } = await supabase
      .from('pharmacies')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('PharmacyService: Error fetching active pharmacies:', error);
      throw error;
    }

    console.log('PharmacyService: Successfully fetched', data?.length || 0, 'active pharmacies');
    return data || [];
  }
}

export const pharmacyService = new PharmacyService();
