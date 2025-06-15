
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
    console.log('AdminDataService: Fetching system stats using secure RPC...');
    
    const { data, error } = await supabase.rpc('get_system_stats_for_admin');

    if (error) {
      console.error('AdminDataService: Error calling get_system_stats_for_admin RPC:', error);
      throw new Error(`Failed to fetch system statistics: ${error.message}`);
    }

    if (!data) {
      throw new Error('No data returned from get_system_stats_for_admin RPC');
    }
    
    const fetchedStats = data as any;

    const stats: SystemStats = {
      totalHospitals: fetchedStats.totalHospitals || 0,
      activeHospitals: fetchedStats.activeHospitals || 0,
      totalPharmacies: fetchedStats.totalPharmacies || 0,
      activePharmacies: fetchedStats.activePharmacies || 0,
      totalLabs: fetchedStats.totalLabs || 0,
      activeLabs: fetchedStats.activeLabs || 0,
      totalInsurancePlans: fetchedStats.totalInsurancePlans || 0,
      activeInsurancePlans: fetchedStats.activeInsurancePlans || 0,
      totalTelemedicineProviders: fetchedStats.totalTelemedicineProviders || 0,
      activeTelemedicineProviders: fetchedStats.activeTelemedicineProviders || 0,
      totalMedications: fetchedStats.totalMedications || 0,
      activeMedications: fetchedStats.activeMedications || 0,
      totalLabTests: fetchedStats.totalLabTests || 0,
      activeLabTests: fetchedStats.activeLabTests || 0,
      errors: [], // No per-service errors anymore with this approach
      loadedServices: [ // Assume all are loaded if RPC succeeds
        'hospitals',
        'pharmacies',
        'labs',
        'insurance_plans',
        'telemedicine_providers',
        'medications',
        'lab_tests',
      ],
      lastSyncTime: new Date().toISOString(),
    };
    
    console.log('AdminDataService: Comprehensive system statistics collection complete via RPC', { stats });

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
