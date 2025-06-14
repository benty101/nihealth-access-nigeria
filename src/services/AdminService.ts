
import { supabase } from '@/integrations/supabase/client';
import type { UserRole } from '@/hooks/useUserRole';

export interface Hospital {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  license_number?: string;
  state?: string;
  lga?: string;
  specialties?: string[];
  facilities?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface InsurancePlan {
  id: string;
  name: string;
  provider: string;
  plan_type: string;
  premium_monthly?: number;
  premium_annual?: number;
  coverage_amount?: number;
  features?: string[];
  terms?: string;
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
  specialties?: string[];
  services?: string[];
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
  consultation_fee?: number;
  available_hours?: any;
  languages?: string[];
  experience_years?: number;
  rating?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserWithRole {
  id: string;
  email: string;
  full_name?: string;
  role: UserRole;
  created_at: string;
}

class AdminService {
  // User Management
  async getAllUsers(): Promise<UserWithRole[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        user_roles(role),
        created_at
      `);

    if (error) throw error;

    return data.map(user => ({
      id: user.id,
      email: '', // We can't access auth.users email directly
      full_name: user.full_name || '',
      role: (user.user_roles as any)?.[0]?.role || 'patient',
      created_at: user.created_at
    }));
  }

  async updateUserRole(userId: string, newRole: UserRole): Promise<void> {
    const { error } = await supabase
      .from('user_roles')
      .upsert({
        user_id: userId,
        role: newRole
      });

    if (error) throw error;
  }

  // Hospital Management
  async getAllHospitals(): Promise<Hospital[]> {
    const { data, error } = await supabase
      .from('hospitals')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createHospital(hospital: Omit<Hospital, 'id' | 'created_at' | 'updated_at'>): Promise<Hospital> {
    const { data, error } = await supabase
      .from('hospitals')
      .insert(hospital)
      .select()
      .single();

    if (error) throw error;
    return data;
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
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
  }

  // Hospital Staff Management
  async assignHospitalAdmin(userId: string, hospitalId: string): Promise<void> {
    // First update user role to hospital_admin
    await this.updateUserRole(userId, 'hospital_admin');

    // Then assign to hospital
    const { error } = await supabase
      .from('hospital_staff')
      .upsert({
        user_id: userId,
        hospital_id: hospitalId,
        position: 'admin'
      });

    if (error) throw error;
  }

  // Insurance Plan Management
  async getAllInsurancePlans(): Promise<InsurancePlan[]> {
    const { data, error } = await supabase
      .from('insurance_plans')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createInsurancePlan(plan: Omit<InsurancePlan, 'id' | 'created_at' | 'updated_at'>): Promise<InsurancePlan> {
    const { data, error } = await supabase
      .from('insurance_plans')
      .insert(plan)
      .select()
      .single();

    if (error) throw error;
    return data;
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
      .update({ is_active: false })
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

  async createPharmacy(pharmacy: Omit<Pharmacy, 'id' | 'created_at' | 'updated_at'>): Promise<Pharmacy> {
    const { data, error } = await supabase
      .from('pharmacies')
      .insert(pharmacy)
      .select()
      .single();

    if (error) throw error;
    return data;
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
      .update({ is_active: false })
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

  async createLab(lab: Omit<Lab, 'id' | 'created_at' | 'updated_at'>): Promise<Lab> {
    const { data, error } = await supabase
      .from('labs')
      .insert(lab)
      .select()
      .single();

    if (error) throw error;
    return data;
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
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
  }

  // Telemedicine Provider Management
  async getAllTelemedicineProviders(): Promise<TelemedicineProvider[]> {
    const { data, error } = await supabase
      .from('telemedicine_providers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createTelemedicineProvider(provider: Omit<TelemedicineProvider, 'id' | 'created_at' | 'updated_at'>): Promise<TelemedicineProvider> {
    const { data, error } = await supabase
      .from('telemedicine_providers')
      .insert(provider)
      .select()
      .single();

    if (error) throw error;
    return data;
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
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
  }
}

export const adminService = new AdminService();
