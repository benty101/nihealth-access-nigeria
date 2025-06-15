
import { supabase } from '@/integrations/supabase/client';

export interface FrontendSyncData {
  pharmacies: any[];
  hospitals: any[];
  labs: any[];
  medications: any[];
  labTests: any[];
  insurancePlans: any[];
  telemedicineProviders: any[];
}

type CountableTable = 'hospitals' | 'pharmacies' | 'labs' | 'medications' | 'lab_tests' | 'insurance_plans' | 'telemedicine_providers';

class FrontendDataService {
  async syncAllFrontendData(): Promise<FrontendSyncData> {
    console.log('FrontendDataService: Syncing all frontend data...');
    
    try {
      const [
        pharmaciesResult,
        hospitalsResult,
        labsResult,
        medicationsResult,
        labTestsResult,
        insuranceResult,
        telemedicineResult
      ] = await Promise.allSettled([
        this.getAllPharmacies(),
        this.getAllHospitals(),
        this.getAllLabs(),
        this.getAllMedications(),
        this.getAllLabTests(),
        this.getAllInsurancePlans(),
        this.getAllTelemedicineProviders()
      ]);

      return {
        pharmacies: pharmaciesResult.status === 'fulfilled' ? pharmaciesResult.value : [],
        hospitals: hospitalsResult.status === 'fulfilled' ? hospitalsResult.value : [],
        labs: labsResult.status === 'fulfilled' ? labsResult.value : [],
        medications: medicationsResult.status === 'fulfilled' ? medicationsResult.value : [],
        labTests: labTestsResult.status === 'fulfilled' ? labTestsResult.value : [],
        insurancePlans: insuranceResult.status === 'fulfilled' ? insuranceResult.value : [],
        telemedicineProviders: telemedicineResult.status === 'fulfilled' ? telemedicineResult.value : []
      };
    } catch (error) {
      console.error('FrontendDataService: Error syncing data:', error);
      throw error;
    }
  }

  private async getAllPharmacies() {
    const { data, error } = await supabase
      .from('pharmacies')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  private async getAllHospitals() {
    const { data, error } = await supabase
      .from('hospitals')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  private async getAllLabs() {
    const { data, error } = await supabase
      .from('labs')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  private async getAllMedications() {
    const { data, error } = await supabase
      .from('medications')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  private async getAllLabTests() {
    const { data, error } = await supabase
      .from('lab_tests')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  private async getAllInsurancePlans() {
    const { data, error } = await supabase
      .from('insurance_plans')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  private async getAllTelemedicineProviders() {
    const { data, error } = await supabase
      .from('telemedicine_providers')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async getActiveCount(tableName: CountableTable): Promise<number> {
    const { count, error } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);
    
    if (error) {
      console.error(`Error getting active count for ${tableName}:`, error);
      return 0;
    }
    
    return count || 0;
  }

  async getTotalCount(tableName: CountableTable): Promise<number> {
    const { count, error } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error(`Error getting total count for ${tableName}:`, error);
      return 0;
    }
    
    return count || 0;
  }
}

export const frontendDataService = new FrontendDataService();
