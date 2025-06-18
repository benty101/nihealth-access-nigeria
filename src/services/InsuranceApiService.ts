
import { supabase } from '@/integrations/supabase/client';

export interface InsuranceApiConfig {
  id: string;
  provider_name: string;
  api_endpoint: string;
  api_key_reference: string | null;
  config_data: any;
  is_active: boolean;
  last_sync: string | null;
  created_at: string;
  updated_at: string;
}

class InsuranceApiService {
  async getApiConfigs(): Promise<InsuranceApiConfig[]> {
    const { data, error } = await supabase
      .from('insurance_api_configs')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createApiConfig(config: Omit<InsuranceApiConfig, 'id' | 'created_at' | 'updated_at' | 'last_sync'>): Promise<InsuranceApiConfig> {
    const { data, error } = await supabase
      .from('insurance_api_configs')
      .insert(config)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateApiConfig(id: string, updates: Partial<InsuranceApiConfig>): Promise<void> {
    const { error } = await supabase
      .from('insurance_api_configs')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  }

  async syncExternalData(): Promise<void> {
    // This will call our edge function to sync data from external APIs
    const { error } = await supabase.functions.invoke('sync-insurance-data');
    if (error) throw error;
  }
}

export const insuranceApiService = new InsuranceApiService();
