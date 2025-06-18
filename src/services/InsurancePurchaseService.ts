
import { supabase } from '@/integrations/supabase/client';

export interface InsurancePurchase {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'pending' | 'active' | 'expired' | 'cancelled';
  purchase_date: string;
  start_date: string;
  end_date: string;
  premium_amount: number;
  payment_frequency: 'monthly' | 'quarterly' | 'annually';
  policy_number: string | null;
  beneficiaries: any[];
  created_at: string;
  updated_at: string;
  insurance_plans?: {
    name: string;
    provider: string;
    plan_type: string;
    features: string[];
    coverage_amount: number;
  };
}

export interface CreateInsurancePurchase {
  plan_id: string;
  start_date: string;
  end_date: string;
  premium_amount: number;
  payment_frequency: 'monthly' | 'quarterly' | 'annually';
  beneficiaries?: any[];
}

class InsurancePurchaseService {
  async createPurchase(purchaseData: CreateInsurancePurchase): Promise<InsurancePurchase> {
    console.log('Creating insurance purchase...');
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('User authentication error:', userError);
        throw new Error('User not authenticated');
      }

      console.log('Creating purchase for user:', user.id);
      
      const { data, error } = await supabase
        .from('insurance_purchases')
        .insert({
          ...purchaseData,
          user_id: user.id,
          status: 'pending'
        })
        .select(`
          *,
          insurance_plans (
            name,
            provider,
            plan_type,
            features,
            coverage_amount
          )
        `)
        .single();

      if (error) {
        console.error('Error creating insurance purchase:', error);
        throw error;
      }

      console.log('Successfully created insurance purchase:', data.id);
      return data as InsurancePurchase;
    } catch (error) {
      console.error('Error in createPurchase:', error);
      throw error;
    }
  }

  async getUserPurchases(): Promise<InsurancePurchase[]> {
    console.log('Fetching user insurance purchases...');
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('User authentication error:', userError);
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('insurance_purchases')
        .select(`
          *,
          insurance_plans (
            name,
            provider,
            plan_type,
            features,
            coverage_amount
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user purchases:', error);
        throw error;
      }

      console.log(`Found ${data?.length || 0} insurance purchases for user`);
      return (data || []) as InsurancePurchase[];
    } catch (error) {
      console.error('Error in getUserPurchases:', error);
      throw error;
    }
  }

  async updatePurchaseStatus(purchaseId: string, status: InsurancePurchase['status']): Promise<void> {
    console.log('Updating purchase status:', purchaseId, 'to', status);
    try {
      const { error } = await supabase
        .from('insurance_purchases')
        .update({ status })
        .eq('id', purchaseId);

      if (error) {
        console.error('Error updating purchase status:', error);
        throw error;
      }

      console.log('Successfully updated purchase status');
    } catch (error) {
      console.error('Error in updatePurchaseStatus:', error);
      throw error;
    }
  }

  async getActivePurchases(): Promise<InsurancePurchase[]> {
    console.log('Fetching active insurance purchases...');
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('User authentication error:', userError);
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('insurance_purchases')
        .select(`
          *,
          insurance_plans (
            name,
            provider,
            plan_type,
            features,
            coverage_amount
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching active purchases:', error);
        throw error;
      }

      console.log(`Found ${data?.length || 0} active insurance purchases`);
      return (data || []) as InsurancePurchase[];
    } catch (error) {
      console.error('Error in getActivePurchases:', error);
      throw error;
    }
  }

  async getPurchaseById(purchaseId: string): Promise<InsurancePurchase | null> {
    console.log('Fetching purchase by ID:', purchaseId);
    try {
      const { data, error } = await supabase
        .from('insurance_purchases')
        .select(`
          *,
          insurance_plans (
            name,
            provider,
            plan_type,
            features,
            coverage_amount
          )
        `)
        .eq('id', purchaseId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          console.log('No purchase found with ID:', purchaseId);
          return null;
        }
        console.error('Error fetching purchase:', error);
        throw error;
      }

      console.log('Successfully fetched purchase:', data.id);
      return data as InsurancePurchase;
    } catch (error) {
      console.error('Error in getPurchaseById:', error);
      throw error;
    }
  }

  async cancelPurchase(purchaseId: string): Promise<void> {
    console.log('Cancelling insurance purchase:', purchaseId);
    try {
      const { error } = await supabase
        .from('insurance_purchases')
        .update({ status: 'cancelled' })
        .eq('id', purchaseId);

      if (error) {
        console.error('Error cancelling purchase:', error);
        throw error;
      }

      console.log('Successfully cancelled purchase');
    } catch (error) {
      console.error('Error in cancelPurchase:', error);
      throw error;
    }
  }
}

export const insurancePurchaseService = new InsurancePurchaseService();
