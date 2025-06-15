
import { supabase } from '@/integrations/supabase/client';

export interface SystemStats {
  totalHospitals: number;
  totalPharmacies: number;
  totalLabs: number;
  totalInsurancePlans: number;
  totalTelemedicineProviders: number;
  totalMedications: number;
  totalLabTests: number;
  errors: string[];
  loadedServices: string[];
}

class AdminDataService {
  async checkDatabaseConnection(): Promise<boolean> {
    try {
      console.log('AdminDataService: Testing database connection...');
      const { error } = await supabase.from('profiles').select('id').limit(1);
      
      if (error) {
        console.error('AdminDataService: Database connection failed:', error);
        return false;
      }
      
      console.log('AdminDataService: Database connection successful');
      return true;
    } catch (error) {
      console.error('AdminDataService: Database connection test failed:', error);
      return false;
    }
  }

  async getSystemStats(): Promise<SystemStats> {
    console.log('AdminDataService: Starting system statistics collection...');
    
    const stats: SystemStats = {
      totalHospitals: 0,
      totalPharmacies: 0,
      totalLabs: 0,
      totalInsurancePlans: 0,
      totalTelemedicineProviders: 0,
      totalMedications: 0,
      totalLabTests: 0,
      errors: [],
      loadedServices: [],
    };

    const services = [
      { name: 'hospitals', table: 'hospitals' as const },
      { name: 'pharmacies', table: 'pharmacies' as const },
      { name: 'labs', table: 'labs' as const },
      { name: 'insurance_plans', table: 'insurance_plans' as const },
      { name: 'telemedicine_providers', table: 'telemedicine_providers' as const },
      { name: 'medications', table: 'medications' as const },
      { name: 'lab_tests', table: 'lab_tests' as const },
    ];

    for (const service of services) {
      try {
        console.log(`AdminDataService: Fetching ${service.name} count...`);
        
        const { count, error } = await supabase
          .from(service.table)
          .select('*', { count: 'exact', head: true });

        if (error) {
          console.error(`AdminDataService: Error fetching ${service.name}:`, error);
          stats.errors.push(`Failed to load ${service.name}: ${error.message}`);
          continue;
        }

        const totalCount = count || 0;
        console.log(`AdminDataService: ${service.name} count: ${totalCount}`);

        // Map counts to the correct properties
        switch (service.name) {
          case 'hospitals':
            stats.totalHospitals = totalCount;
            break;
          case 'pharmacies':
            stats.totalPharmacies = totalCount;
            break;
          case 'labs':
            stats.totalLabs = totalCount;
            break;
          case 'insurance_plans':
            stats.totalInsurancePlans = totalCount;
            break;
          case 'telemedicine_providers':
            stats.totalTelemedicineProviders = totalCount;
            break;
          case 'medications':
            stats.totalMedications = totalCount;
            break;
          case 'lab_tests':
            stats.totalLabTests = totalCount;
            break;
        }

        stats.loadedServices.push(service.name);
        
      } catch (error) {
        console.error(`AdminDataService: Unexpected error loading ${service.name}:`, error);
        stats.errors.push(`Unexpected error loading ${service.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    console.log('AdminDataService: System statistics collection complete', {
      loadedServices: stats.loadedServices.length,
      errors: stats.errors.length,
      stats: {
        hospitals: stats.totalHospitals,
        pharmacies: stats.totalPharmacies,
        labs: stats.totalLabs,
        insurance: stats.totalInsurancePlans,
        telemedicine: stats.totalTelemedicineProviders,
        medications: stats.totalMedications,
        labTests: stats.totalLabTests
      }
    });

    return stats;
  }
}

export const adminDataService = new AdminDataService();
