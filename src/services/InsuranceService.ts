
import { supabase } from '@/integrations/supabase/client';

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

class InsuranceService {
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
}

export const insuranceService = new InsuranceService();
