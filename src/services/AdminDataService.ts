
import { supabase } from '@/integrations/supabase/client';

export interface SystemStats {
  totalHospitals: number;
  totalPharmacies: number;
  totalLabs: number;
  totalInsurancePlans: number;
  totalTelemedicineProviders: number;
  errors: string[];
  loadedServices: string[];
}

class AdminDataService {
  async checkDatabaseConnection(): Promise<boolean> {
    try {
      console.log('AdminDataService: Checking database connection...');
      const { data, error } = await supabase.from('hospitals').select('id').limit(1);
      
      if (error) {
        console.error('AdminDataService: Database connection failed:', error);
        return false;
      }
      
      console.log('AdminDataService: Database connection successful');
      return true;
    } catch (error) {
      console.error('AdminDataService: Database connection error:', error);
      return false;
    }
  }

  async getSystemStats(): Promise<SystemStats> {
    console.log('AdminDataService: Starting system stats collection...');
    
    const stats: SystemStats = {
      totalHospitals: 0,
      totalPharmacies: 0,
      totalLabs: 0,
      totalInsurancePlans: 0,
      totalTelemedicineProviders: 0,
      errors: [],
      loadedServices: []
    };

    // Hospital stats
    try {
      console.log('AdminDataService: Fetching hospital stats...');
      const { count, error } = await supabase
        .from('hospitals')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      
      stats.totalHospitals = count || 0;
      stats.loadedServices.push('Hospitals');
      console.log('AdminDataService: Hospital stats loaded successfully:', count);
    } catch (error) {
      console.error('AdminDataService: Hospital stats error:', error);
      stats.errors.push('Hospitals: Failed to load data');
    }

    // Pharmacy stats
    try {
      console.log('AdminDataService: Fetching pharmacy stats...');
      const { count, error } = await supabase
        .from('pharmacies')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      
      stats.totalPharmacies = count || 0;
      stats.loadedServices.push('Pharmacies');
      console.log('AdminDataService: Pharmacy stats loaded successfully:', count);
    } catch (error) {
      console.error('AdminDataService: Pharmacy stats error:', error);
      stats.errors.push('Pharmacies: Database access denied or table not found');
    }

    // Lab stats
    try {
      console.log('AdminDataService: Fetching lab stats...');
      const { count, error } = await supabase
        .from('labs')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      
      stats.totalLabs = count || 0;
      stats.loadedServices.push('Labs');
      console.log('AdminDataService: Lab stats loaded successfully:', count);
    } catch (error) {
      console.error('AdminDataService: Lab stats error:', error);
      stats.errors.push('Labs: Database access denied or table not found');
    }

    // Insurance stats
    try {
      console.log('AdminDataService: Fetching insurance stats...');
      const { count, error } = await supabase
        .from('insurance_plans')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      
      stats.totalInsurancePlans = count || 0;
      stats.loadedServices.push('Insurance Plans');
      console.log('AdminDataService: Insurance stats loaded successfully:', count);
    } catch (error) {
      console.error('AdminDataService: Insurance stats error:', error);
      stats.errors.push('Insurance Plans: Failed to load data');
    }

    // Telemedicine stats
    try {
      console.log('AdminDataService: Fetching telemedicine stats...');
      const { count, error } = await supabase
        .from('telemedicine_providers')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      
      stats.totalTelemedicineProviders = count || 0;
      stats.loadedServices.push('Telemedicine Providers');
      console.log('AdminDataService: Telemedicine stats loaded successfully:', count);
    } catch (error) {
      console.error('AdminDataService: Telemedicine stats error:', error);
      stats.errors.push('Telemedicine Providers: Database access denied or table not found');
    }

    console.log('AdminDataService: Final stats collected:', {
      loadedServices: stats.loadedServices.length,
      totalServices: 5,
      errors: stats.errors.length
    });

    return stats;
  }
}

export const adminDataService = new AdminDataService();
