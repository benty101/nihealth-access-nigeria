
import { supabase } from '@/integrations/supabase/client';

export interface MolecularDiagnosticTest {
  id: string;
  test_name: string;
  test_code: string;
  category: 'genomics' | 'proteomics' | 'metabolomics' | 'biomarkers';
  sample_type: 'blood' | 'saliva' | 'tissue' | 'urine' | 'swab';
  processing_time: string;
  price: number;
  requires_special_handling: boolean;
  temperature_requirements?: string;
  description?: string;
}

export interface SampleTracking {
  id: string;
  sample_id: string;
  order_id: string;
  collection_date: string;
  collection_location?: {
    latitude?: number;
    longitude?: number;
    address: string;
  };
  lab_partner_id: string;
  status: 'collected' | 'in_transit' | 'received' | 'processing' | 'completed';
  chain_of_custody: Array<{
    timestamp: string;
    handler: string;
    location: string;
    action: string;
  }>;
  temperature_log?: Array<{
    timestamp: string;
    temperature: number;
    humidity?: number;
  }>;
}

export interface MolecularDiagnosticOrder {
  id: string;
  user_id: string;
  order_number: string;
  consultation_id?: string;
  tests: MolecularDiagnosticTest[];
  sample_tracking: SampleTracking;
  total_amount: number;
  status: 'pending' | 'sample_requested' | 'sample_collected' | 'processing' | 'completed';
  collection_method: 'home_collection' | 'lab_visit' | 'clinic_referral';
  privacy_consent: {
    data_sharing: boolean;
    research_participation: boolean;
    geo_tagging_consent: boolean;
  };
  results?: {
    file_url: string;
    summary: string;
    clinical_significance: string;
    recommendations: string[];
    geo_tag?: {
      region: string; // Anonymized region for surveillance
      timestamp: string;
    };
  };
  created_at: string;
  updated_at: string;
}

class MolecularDiagnosticsService {
  async getAvailableTests(): Promise<MolecularDiagnosticTest[]> {
    // This would integrate with lab partners' APIs
    // For now, returning mock data that represents typical molecular diagnostic tests
    return [
      {
        id: '1',
        test_name: 'Comprehensive Genomic Profiling',
        test_code: 'CGP-001',
        category: 'genomics',
        sample_type: 'blood',
        processing_time: '10-14 business days',
        price: 45000,
        requires_special_handling: true,
        temperature_requirements: 'Store at 2-8°C',
        description: 'Analyzes 500+ genes for actionable mutations and biomarkers'
      },
      {
        id: '2',
        test_name: 'Liquid Biopsy Panel',
        test_code: 'LBP-002',
        category: 'biomarkers',
        sample_type: 'blood',
        processing_time: '7-10 business days',
        price: 35000,
        requires_special_handling: true,
        description: 'Circulating tumor DNA analysis for early detection'
      },
      {
        id: '3',
        test_name: 'Pharmacogenomics Profile',
        test_code: 'PGX-003',
        category: 'genomics',
        sample_type: 'saliva',
        processing_time: '5-7 business days',
        price: 25000,
        requires_special_handling: false,
        description: 'Personalized medication response analysis'
      }
    ];
  }

  async createOrder(orderData: Omit<MolecularDiagnosticOrder, 'id' | 'order_number' | 'created_at' | 'updated_at'>): Promise<string> {
    console.log('Creating molecular diagnostic order:', orderData);
    
    // Generate sample ID
    const sampleId = `MDP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const order = {
      ...orderData,
      sample_tracking: {
        ...orderData.sample_tracking,
        sample_id: sampleId,
        status: 'collected' as const,
        chain_of_custody: [{
          timestamp: new Date().toISOString(),
          handler: 'Patient',
          location: orderData.sample_tracking.collection_location?.address || 'Home',
          action: 'Sample collected'
        }]
      }
    };

    // In a real implementation, this would integrate with existing lab_test_orders table
    // and add molecular diagnostic specific fields
    return `order-${Date.now()}`;
  }

  async trackSample(sampleId: string): Promise<SampleTracking | null> {
    console.log('Tracking sample:', sampleId);
    // This would query the actual tracking system
    return null;
  }

  async updateSampleStatus(sampleId: string, status: SampleTracking['status'], location: string, handler: string): Promise<void> {
    console.log('Updating sample status:', { sampleId, status, location, handler });
    // Update chain of custody and status
  }

  async processResults(orderId: string, results: MolecularDiagnosticOrder['results']): Promise<void> {
    console.log('Processing molecular diagnostic results:', orderId);
    
    // Integrate with EMR system
    await this.integrateWithEMR(orderId, results);
    
    // Handle geo-tagging for surveillance if consent given
    if (results?.geo_tag) {
      await this.submitSurveillanceData(results.geo_tag);
    }
  }

  private async integrateWithEMR(orderId: string, results?: MolecularDiagnosticOrder['results']): Promise<void> {
    // Integration with existing medical records system
    console.log('Integrating results with EMR:', orderId);
  }

  private async submitSurveillanceData(geoTag: NonNullable<MolecularDiagnosticOrder['results']>['geo_tag']): Promise<void> {
    // Submit anonymized data for disease surveillance
    console.log('Submitting surveillance data:', geoTag);
  }
}

export const molecularDiagnosticsService = new MolecularDiagnosticsService();
