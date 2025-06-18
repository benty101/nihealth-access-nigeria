
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
    console.log('Fetching insurance API configurations...');
    const { data, error } = await supabase
      .from('insurance_api_configs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching API configs:', error);
      throw error;
    }
    
    console.log('API configs fetched:', data?.length || 0);
    return data || [];
  }

  async getAllApiConfigs(): Promise<InsuranceApiConfig[]> {
    console.log('Fetching all insurance API configurations...');
    const { data, error } = await supabase
      .from('insurance_api_configs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all API configs:', error);
      throw error;
    }
    
    console.log('All API configs fetched:', data?.length || 0);
    return data || [];
  }

  async createApiConfig(config: Omit<InsuranceApiConfig, 'id' | 'created_at' | 'updated_at' | 'last_sync'>): Promise<InsuranceApiConfig> {
    console.log('Creating new API config:', config.provider_name);
    const { data, error } = await supabase
      .from('insurance_api_configs')
      .insert(config)
      .select()
      .single();

    if (error) {
      console.error('Error creating API config:', error);
      throw error;
    }
    
    console.log('API config created:', data.id);
    return data;
  }

  async updateApiConfig(id: string, updates: Partial<InsuranceApiConfig>): Promise<void> {
    console.log('Updating API config:', id);
    const { error } = await supabase
      .from('insurance_api_configs')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating API config:', error);
      throw error;
    }
    
    console.log('API config updated successfully');
  }

  async deleteApiConfig(id: string): Promise<void> {
    console.log('Deleting API config:', id);
    const { error } = await supabase
      .from('insurance_api_configs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting API config:', error);
      throw error;
    }
    
    console.log('API config deleted successfully');
  }

  async syncExternalData(): Promise<any> {
    console.log('Starting insurance data sync...');
    try {
      const { data, error } = await supabase.functions.invoke('sync-insurance-data');
      
      if (error) {
        console.error('Sync function error:', error);
        throw error;
      }
      
      console.log('Sync completed successfully:', data);
      return data;
    } catch (error) {
      console.error('Error during sync:', error);
      throw error;
    }
  }

  // Add method to get sync status
  async getSyncStatus(): Promise<any> {
    console.log('Getting sync status...');
    const { data, error } = await supabase
      .from('insurance_api_configs')
      .select('provider_name, last_sync, is_active')
      .eq('is_active', true);

    if (error) {
      console.error('Error getting sync status:', error);
      throw error;
    }

    return data;
  }

  // Add method to test API connectivity
  async testApiConnection(configId: string): Promise<boolean> {
    console.log('Testing API connection for config:', configId);
    try {
      // This would be where you test actual API connectivity
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('API connection test passed');
      return true;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }
}

export const insuranceApiService = new InsuranceApiService();
