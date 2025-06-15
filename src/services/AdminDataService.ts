
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

    // Helper function to safely get count
    const getTableCount = async (tableName: string, displayName: string): Promise<number> => {
      try {
        console.log(`AdminDataService: Fetching ${displayName} stats...`);
        const { count, error } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          console.error(`AdminDataService: ${displayName} error:`, error);
          stats.errors.push(`${displayName}: ${error.message}`);
          return 0;
        }
        
        const totalCount = count || 0;
        stats.loadedServices.push(displayName);
        console.log(`AdminDataService: ${displayName} loaded successfully:`, totalCount);
        return totalCount;
      } catch (error) {
        console.error(`AdminDataService: ${displayName} unexpected error:`, error);
        stats.errors.push(`${displayName}: Unexpected error occurred`);
        return 0;
      }
    };

    // Load all stats with proper error handling
    stats.totalHospitals = await getTableCount('hospitals', 'Hospitals');
    stats.totalPharmacies = await getTableCount('pharmacies', 'Pharmacies');
    stats.totalLabs = await getTableCount('labs', 'Labs');
    stats.totalInsurancePlans = await getTableCount('insurance_plans', 'Insurance Plans');
    stats.totalTelemedicineProviders = await getTableCount('telemedicine_providers', 'Telemedicine Providers');

    console.log('AdminDataService: Final stats collected:', {
      loadedServices: stats.loadedServices.length,
      totalServices: 5,
      errors: stats.errors.length,
      stats: {
        hospitals: stats.totalHospitals,
        pharmacies: stats.totalPharmacies,
        labs: stats.totalLabs,
        insurance: stats.totalInsurancePlans,
        telemedicine: stats.totalTelemedicineProviders
      }
    });

    return stats;
  }
}

export const adminDataService = new AdminDataService();
