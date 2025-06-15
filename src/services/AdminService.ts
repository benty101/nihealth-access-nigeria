import { supabase } from '@/integrations/supabase/client';

export interface Hospital {
  id: string;
  name: string;
  address?: string;
  state?: string;
  lga?: string;
  phone?: string;
  email?: string;
  license_number?: string;
  specialties?: string[];
  facilities?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  address?: string;
  state?: string;
  lga?: string;
  phone?: string;
  email?: string;
  license_number?: string;
  services?: string[];
  specialties?: string[];
  operating_hours?: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Lab {
  id: string;
  name: string;
  address?: string;
  state?: string;
  lga?: string;
  phone?: string;
  email?: string;
  license_number?: string;
  test_types?: string[];
  equipment?: string[];
  certifications?: string[];
  operating_hours?: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TelemedicineProvider {
  id: string;
  name: string;
  specialization?: string;
  license_number?: string;
  phone?: string;
  email?: string;
  languages?: string[];
  consultation_fee?: number;
  experience_years?: number;
  rating?: number;
  available_hours?: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface InsurancePlan {
  id: string;
  name: string;
  provider: string;
  plan_type: string;
  coverage_amount?: number;
  premium_monthly?: number;
  premium_annual?: number;
  features?: string[];
  terms?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Medication {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  brand?: string;
  pack_size?: string;
  prescription_required: boolean;
  in_stock: boolean;
  rating?: number;
  pharmacy_id?: string;
  active_ingredient?: string;
  dosage?: string;
  side_effects?: string[];
  contraindications?: string[];
  storage_instructions?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type CreateMedicationRequest = Omit<Medication, 'id' | 'created_at' | 'updated_at' | 'rating' | 'side_effects' | 'contraindications'>;

export type CreatePharmacyRequest = Omit<Pharmacy, 'id' | 'created_at' | 'updated_at'>;

export interface LabTest {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  test_code?: string;
  sample_type?: string;
  turnaround_time?: string;
  is_fasting_required: boolean;
  lab_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

class AdminService {
  // Hospital Management
  async getAllHospitals(): Promise<Hospital[]> {
    const { data, error } = await supabase
      .from('hospitals')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async createHospital(hospital: Omit<Hospital, 'id' | 'created_at' | 'updated_at'>): Promise<void> {
    const { error } = await supabase
      .from('hospitals')
      .insert([hospital]);
    
    if (error) throw error;
  }

  async updateHospital(id: string, updates: Partial<Hospital>): Promise<void> {
    const { error } = await supabase
      .from('hospitals')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
  }

  async deleteHospital(id: string): Promise<void> {
    const { error } = await supabase
      .from('hospitals')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Pharmacy Management
  async getAllPharmacies(): Promise<Pharmacy[]> {
    const { data, error } = await supabase
      .from('pharmacies')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async createPharmacy(pharmacy: Omit<Pharmacy, 'id' | 'created_at' | 'updated_at'>): Promise<void> {
    const { error } = await supabase
      .from('pharmacies')
      .insert([pharmacy]);
    
    if (error) throw error;
  }

  async updatePharmacy(id: string, updates: Partial<Pharmacy>): Promise<void> {
    const { error } = await supabase
      .from('pharmacies')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
  }

  async deletePharmacy(id: string): Promise<void> {
    const { error } = await supabase
      .from('pharmacies')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Lab Management
  async getAllLabs(): Promise<Lab[]> {
    const { data, error } = await supabase
      .from('labs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async createLab(lab: Omit<Lab, 'id' | 'created_at' | 'updated_at'>): Promise<void> {
    const { error } = await supabase
      .from('labs')
      .insert([lab]);
    
    if (error) throw error;
  }

  async updateLab(id: string, updates: Partial<Lab>): Promise<void> {
    const { error } = await supabase
      .from('labs')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
  }

  async deleteLab(id: string): Promise<void> {
    const { error } = await supabase
      .from('labs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Telemedicine Management
  async getAllTelemedicineProviders(): Promise<TelemedicineProvider[]> {
    const { data, error } = await supabase
      .from('telemedicine_providers')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async createTelemedicineProvider(provider: Omit<TelemedicineProvider, 'id' | 'created_at' | 'updated_at'>): Promise<void> {
    const { error } = await supabase
      .from('telemedicine_providers')
      .insert([provider]);
    
    if (error) throw error;
  }

  async updateTelemedicineProvider(id: string, updates: Partial<TelemedicineProvider>): Promise<void> {
    const { error } = await supabase
      .from('telemedicine_providers')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
  }

  async deleteTelemedicineProvider(id: string): Promise<void> {
    const { error } = await supabase
      .from('telemedicine_providers')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Medication Management
  async getAllMedications(): Promise<Medication[]> {
    const { data, error } = await supabase
      .from('medications')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async createMedication(medication: CreateMedicationRequest): Promise<void> {
    const { error } = await supabase
      .from('medications')
      .insert([medication]);
    
    if (error) throw error;
  }

  async updateMedication(id: string, updates: Partial<Medication>): Promise<void> {
    const { error } = await supabase
      .from('medications')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
  }

  async deleteMedication(id: string): Promise<void> {
    const { error } = await supabase
      .from('medications')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Lab Test Management
  async getAllLabTests(): Promise<LabTest[]> {
    const { data, error } = await supabase
      .from('lab_tests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createLabTest(labTest: Omit<LabTest, 'id' | 'created_at' | 'updated_at'>): Promise<void> {
    const { error } = await supabase
      .from('lab_tests')
      .insert([labTest]);
    
    if (error) throw error;
  }

  async updateLabTest(id: string, updates: Partial<LabTest>): Promise<void> {
    const { error } = await supabase
      .from('lab_tests')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
  }

  async deleteLabTest(id: string): Promise<void> {
    const { error } = await supabase
      .from('lab_tests')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Insurance Management
  async getAllInsurancePlans(): Promise<InsurancePlan[]> {
    const { data, error } = await supabase
      .from('insurance_plans')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async createInsurancePlan(plan: Omit<InsurancePlan, 'id' | 'created_at' | 'updated_at'>): Promise<void> {
    const { error } = await supabase
      .from('insurance_plans')
      .insert([plan]);
    
    if (error) throw error;
  }

  async updateInsurancePlan(id: string, updates: Partial<InsurancePlan>): Promise<void> {
    const { error } = await supabase
      .from('insurance_plans')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
  }

  async deleteInsurancePlan(id: string): Promise<void> {
    const { error } = await supabase
      .from('insurance_plans')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
}

export const adminService = new AdminService();
