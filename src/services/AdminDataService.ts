
import { supabase } from '@/integrations/supabase/client';
import { frontendDataService } from './FrontendDataService';

export interface SystemStats {
  totalHospitals: number;
  totalPharmacies: number;
  totalLabs: number;
  totalInsurancePlans: number;
  totalTelemedicineProviders: number;
  totalMedications: number;
  totalLabTests: number;
  activeHospitals: number;
  activePharmacies: number;
  activeLabs: number;
  activeInsurancePlans: number;
  activeTelemedicineProviders: number;
  activeMedications: number;
  activeLabTests: number;
  errors: string[];
  loadedServices: string[];
  lastSyncTime: string;
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
    console.log('AdminDataService: Starting comprehensive system statistics collection...');
    
    const stats: SystemStats = {
      totalHospitals: 0,
      totalPharmacies: 0,
      totalLabs: 0,
      totalInsurancePlans: 0,
      totalTelemedicineProviders: 0,
      totalMedications: 0,
      totalLabTests: 0,
      activeHospitals: 0,
      activePharmacies: 0,
      activeLabs: 0,
      activeInsurancePlans: 0,
      activeTelemedicineProviders: 0,
      activeMedications: 0,
      activeLabTests: 0,
      errors: [],
      loadedServices: [],
      lastSyncTime: new Date().toISOString(),
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
        console.log(`AdminDataService: Fetching ${service.name} statistics...`);
        
        // Get total count
        const totalCount = await frontendDataService.getTotalCount(service.table);
        
        // Get active count
        const activeCount = await frontendDataService.getActiveCount(service.table);

        console.log(`AdminDataService: ${service.name} - Total: ${totalCount}, Active: ${activeCount}`);

        // Map counts to the correct properties
        switch (service.name) {
          case 'hospitals':
            stats.totalHospitals = totalCount;
            stats.activeHospitals = activeCount;
            break;
          case 'pharmacies':
            stats.totalPharmacies = totalCount;
            stats.activePharmacies = activeCount;
            break;
          case 'labs':
            stats.totalLabs = totalCount;
            stats.activeLabs = activeCount;
            break;
          case 'insurance_plans':
            stats.totalInsurancePlans = totalCount;
            stats.activeInsurancePlans = activeCount;
            break;
          case 'telemedicine_providers':
            stats.totalTelemedicineProviders = totalCount;
            stats.activeTelemedicineProviders = activeCount;
            break;
          case 'medications':
            stats.totalMedications = totalCount;
            stats.activeMedications = activeCount;
            break;
          case 'lab_tests':
            stats.totalLabTests = totalCount;
            stats.activeLabTests = activeCount;
            break;
        }

        stats.loadedServices.push(service.name);
        
      } catch (error) {
        console.error(`AdminDataService: Error loading ${service.name}:`, error);
        stats.errors.push(`Failed to load ${service.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    console.log('AdminDataService: Comprehensive system statistics collection complete', {
      loadedServices: stats.loadedServices.length,
      errors: stats.errors.length,
      totalStats: {
        hospitals: `${stats.activeHospitals}/${stats.totalHospitals}`,
        pharmacies: `${stats.activePharmacies}/${stats.totalPharmacies}`,
        labs: `${stats.activeLabs}/${stats.totalLabs}`,
        insurance: `${stats.activeInsurancePlans}/${stats.totalInsurancePlans}`,
        telemedicine: `${stats.activeTelemedicineProviders}/${stats.totalTelemedicineProviders}`,
        medications: `${stats.activeMedications}/${stats.totalMedications}`,
        labTests: `${stats.activeLabTests}/${stats.totalLabTests}`
      }
    });

    return stats;
  }

  async syncFrontendData(): Promise<void> {
    console.log('AdminDataService: Syncing frontend data...');
    try {
      const syncData = await frontendDataService.syncAllFrontendData();
      console.log('AdminDataService: Frontend data sync complete:', {
        pharmacies: syncData.pharmacies.length,
        hospitals: syncData.hospitals.length,
        labs: syncData.labs.length,
        medications: syncData.medications.length,
        labTests: syncData.labTests.length,
        insurance: syncData.insurancePlans.length,
        telemedicine: syncData.telemedicineProviders.length
      });
    } catch (error) {
      console.error('AdminDataService: Frontend data sync failed:', error);
      throw error;
    }
  }
}

export const adminDataService = new AdminDataService();
