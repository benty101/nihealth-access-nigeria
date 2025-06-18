
import { supabase } from '@/integrations/supabase/client';

export interface InsurancePlan {
  id: string;
  name: string;
  provider: string;
  plan_type: string;
  premium_monthly: number;
  premium_annual: number;
  coverage_amount: number;
  features: string[];
  terms: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

class InsuranceService {
  async getAllInsurancePlans(): Promise<InsurancePlan[]> {
    console.log('Fetching all insurance plans from database...');
    try {
      const { data, error } = await supabase
        .from('insurance_plans')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching insurance plans:', error);
        throw error;
      }

      console.log(`Successfully fetched ${data?.length || 0} insurance plans`);
      return data || [];
    } catch (error) {
      console.error('Insurance service error:', error);
      throw error;
    }
  }

  async getInsurancePlanById(id: string): Promise<InsurancePlan | null> {
    console.log('Fetching insurance plan by ID:', id);
    try {
      const { data, error } = await supabase
        .from('insurance_plans')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          console.log('No insurance plan found with ID:', id);
          return null;
        }
        console.error('Error fetching insurance plan:', error);
        throw error;
      }

      console.log('Successfully fetched insurance plan:', data.name);
      return data;
    } catch (error) {
      console.error('Error in getInsurancePlanById:', error);
      throw error;
    }
  }

  async createInsurancePlan(plan: Omit<InsurancePlan, 'id' | 'created_at' | 'updated_at'>): Promise<InsurancePlan> {
    console.log('Creating new insurance plan:', plan.name);
    try {
      const { data, error } = await supabase
        .from('insurance_plans')
        .insert(plan)
        .select()
        .single();

      if (error) {
        console.error('Error creating insurance plan:', error);
        throw error;
      }

      console.log('Successfully created insurance plan:', data.id);
      return data;
    } catch (error) {
      console.error('Error in createInsurancePlan:', error);
      throw error;
    }
  }

  async updateInsurancePlan(id: string, updates: Partial<InsurancePlan>): Promise<void> {
    console.log('Updating insurance plan:', id);
    try {
      const { error } = await supabase
        .from('insurance_plans')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error('Error updating insurance plan:', error);
        throw error;
      }

      console.log('Successfully updated insurance plan');
    } catch (error) {
      console.error('Error in updateInsurancePlan:', error);
      throw error;
    }
  }

  async deleteInsurancePlan(id: string): Promise<void> {
    console.log('Deactivating insurance plan:', id);
    try {
      const { error } = await supabase
        .from('insurance_plans')
        .update({ is_active: false })
        .eq('id', id);

      if (error) {
        console.error('Error deactivating insurance plan:', error);
        throw error;
      }

      console.log('Successfully deactivated insurance plan');
    } catch (error) {
      console.error('Error in deleteInsurancePlan:', error);
      throw error;
    }
  }

  async searchInsurancePlans(searchTerm: string): Promise<InsurancePlan[]> {
    console.log('Searching insurance plans for:', searchTerm);
    try {
      const { data, error } = await supabase
        .from('insurance_plans')
        .select('*')
        .eq('is_active', true)
        .or(`name.ilike.%${searchTerm}%,provider.ilike.%${searchTerm}%,plan_type.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching insurance plans:', error);
        throw error;
      }

      console.log(`Found ${data?.length || 0} matching insurance plans`);
      return data || [];
    } catch (error) {
      console.error('Error in searchInsurancePlans:', error);
      throw error;
    }
  }

  async getInsurancePlansByProvider(provider: string): Promise<InsurancePlan[]> {
    console.log('Fetching insurance plans for provider:', provider);
    try {
      const { data, error } = await supabase
        .from('insurance_plans')
        .select('*')
        .eq('provider', provider)
        .eq('is_active', true)
        .order('premium_monthly', { ascending: true });

      if (error) {
        console.error('Error fetching plans by provider:', error);
        throw error;
      }

      console.log(`Found ${data?.length || 0} plans for provider: ${provider}`);
      return data || [];
    } catch (error) {
      console.error('Error in getInsurancePlansByProvider:', error);
      throw error;
    }
  }

  async getInsuranceStats(): Promise<any> {
    console.log('Fetching insurance statistics...');
    try {
      const { data, error } = await supabase
        .from('insurance_plans')
        .select('provider, plan_type, premium_monthly, coverage_amount')
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching insurance stats:', error);
        throw error;
      }

      const stats = {
        totalPlans: data?.length || 0,
        providers: [...new Set(data?.map(p => p.provider))].length,
        planTypes: [...new Set(data?.map(p => p.plan_type))].length,
        averagePremium: data?.length ? 
          Math.round(data.reduce((sum, p) => sum + (p.premium_monthly || 0), 0) / data.length) : 0,
        totalCoverage: data?.reduce((sum, p) => sum + (p.coverage_amount || 0), 0) || 0
      };

      console.log('Insurance statistics calculated:', stats);
      return stats;
    } catch (error) {
      console.error('Error in getInsuranceStats:', error);
      throw error;
    }
  }
}

export const insuranceService = new InsuranceService();
