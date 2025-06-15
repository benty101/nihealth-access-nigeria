
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

type TableName = 'hospitals' | 'pharmacies' | 'labs' | 'insurance_plans' | 'telemedicine_providers';

interface ServiceConfig {
  tableName: TableName;
  label: string;
  statsKey: keyof Pick<SystemStats, 'totalHospitals' | 'totalPharmacies' | 'totalLabs' | 'totalInsurancePlans' | 'totalTelemedicineProviders'>;
}

class AdminDataService {
  private readonly services: ServiceConfig[] = [
    { tableName: 'hospitals', label: 'Hospitals', statsKey: 'totalHospitals' },
    { tableName: 'pharmacies', label: 'Pharmacies', statsKey: 'totalPharmacies' },
    { tableName: 'labs', label: 'Labs', statsKey: 'totalLabs' },
    { tableName: 'insurance_plans', label: 'Insurance Plans', statsKey: 'totalInsurancePlans' },
    { tableName: 'telemedicine_providers', label: 'Telemedicine Providers', statsKey: 'totalTelemedicineProviders' }
  ];

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

    // Fetch each service individually with comprehensive error handling
    for (const service of this.services) {
      try {
        console.log(`AdminDataService: Fetching ${service.tableName}...`);
        
        const { count, error } = await supabase
          .from(service.tableName)
          .select('id', { count: 'exact', head: true });

        if (error) {
          console.error(`AdminDataService: Error fetching ${service.tableName}:`, error);
          stats.errors.push(`${service.label}: ${error.message}`);
          continue;
        }

        const totalCount = count || 0;
        console.log(`AdminDataService: ${service.tableName} count: ${totalCount}`);

        // Update stats using the configured key
        stats[service.statsKey] = totalCount;
        stats.loadedServices.push(service.label);

      } catch (err) {
        console.error(`AdminDataService: Exception fetching ${service.tableName}:`, err);
        stats.errors.push(`${service.label}: Connection failed`);
      }
    }

    console.log('AdminDataService: Final stats:', stats);
    return stats;
  }

  async checkDatabaseConnection(): Promise<boolean> {
    try {
      console.log('AdminDataService: Checking database connection...');
      const { error } = await supabase.from('hospitals').select('id').limit(1);
      
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

  async getTableCount(tableName: TableName): Promise<number> {
    try {
      const { count, error } = await supabase
        .from(tableName)
        .select('id', { count: 'exact', head: true });

      if (error) {
        console.error(`AdminDataService: Error fetching count for ${tableName}:`, error);
        throw error;
      }

      return count || 0;
    } catch (err) {
      console.error(`AdminDataService: Exception fetching count for ${tableName}:`, err);
      throw err;
    }
  }
}

export const adminDataService = new AdminDataService();
