
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
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('insurance_purchases')
      .insert({
        ...purchaseData,
        user_id: user.id,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserPurchases(): Promise<InsurancePurchase[]> {
    const { data, error } = await supabase
      .from('insurance_purchases')
      .select(`
        *,
        insurance_plans (
          name,
          provider,
          plan_type,
          features
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async updatePurchaseStatus(purchaseId: string, status: InsurancePurchase['status']): Promise<void> {
    const { error } = await supabase
      .from('insurance_purchases')
      .update({ status })
      .eq('id', purchaseId);

    if (error) throw error;
  }

  async getActivePurchases(): Promise<InsurancePurchase[]> {
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
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}

export const insurancePurchaseService = new InsurancePurchaseService();
