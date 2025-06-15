
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
  async getSystemStats(): Promise<SystemStats> {
    console.log('AdminDataService: Starting system stats fetch...');
    
    const stats: SystemStats = {
      totalHospitals: 0,
      totalPharmacies: 0,
      totalLabs: 0,
      totalInsurancePlans: 0,
      totalTelemedicineProviders: 0,
      errors: [],
      loadedServices: []
    };

    // Define services to check
    const services = [
      { name: 'hospitals', label: 'Hospitals' },
      { name: 'pharmacies', label: 'Pharmacies' },
      { name: 'labs', label: 'Labs' },
      { name: 'insurance_plans', label: 'Insurance Plans' },
      { name: 'telemedicine_providers', label: 'Telemedicine Providers' }
    ];

    // Fetch each service individually with comprehensive error handling
    for (const service of services) {
      try {
        console.log(`AdminDataService: Fetching ${service.name}...`);
        
        const { count, error, data } = await supabase
          .from(service.name)
          .select('id', { count: 'exact', head: true });

        if (error) {
          console.error(`AdminDataService: Error fetching ${service.name}:`, error);
          stats.errors.push(`${service.label}: ${error.message}`);
          continue;
        }

        const totalCount = count || 0;
        console.log(`AdminDataService: ${service.name} count: ${totalCount}`);

        // Update stats based on service name
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
        }

        stats.loadedServices.push(service.label);

      } catch (err) {
        console.error(`AdminDataService: Exception fetching ${service.name}:`, err);
        stats.errors.push(`${service.label}: Connection failed`);
      }
    }

    console.log('AdminDataService: Final stats:', stats);
    return stats;
  }

  async checkDatabaseConnection(): Promise<boolean> {
    try {
      console.log('AdminDataService: Checking database connection...');
      const { error } = await supabase.from('user_roles').select('id').limit(1);
      
      if (error) {
        console.error('AdminDataService: Database connection failed:', error);
        return false;
      }
      
      console.log('AdminDataService: Database connection successful');
      return true;
    } catch (err) {
      console.error('AdminDataService: Database connection exception:', err);
      return false;
    }
  }
}

export const adminDataService = new AdminDataService();
