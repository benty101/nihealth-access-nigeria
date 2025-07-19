import { supabase } from "@/integrations/supabase/client";

export interface HomeTestKit {
  id: string;
  user_id: string;
  kit_type: string;
  kit_name: string;
  order_number: string;
  status: string;
  shipping_address: string;
  tracking_number?: string;
  lab_id?: string;
  results_url?: string;
  results_available: boolean;
  collection_instructions?: string;
  return_shipping_label?: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface TestKitType {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  sample_type: string;
  turnaround_time: string;
  includes: string[];
}

export class HomeTestKitService {
  static async getAvailableTestKits(): Promise<TestKitType[]> {
    // For now, return static data. Later we can create a test_kit_types table
    return [
      {
        id: '1',
        name: 'Comprehensive Health Panel',
        type: 'blood_panel',
        description: 'Complete blood count, lipid panel, liver function, kidney function',
        price: 15000,
        sample_type: 'blood',
        turnaround_time: '3-5 days',
        includes: ['CBC', 'Lipid Panel', 'Liver Function', 'Kidney Function', 'Diabetes Panel']
      },
      {
        id: '2',
        name: 'Genomic Health Profile',
        type: 'genomic',
        description: 'Comprehensive genetic analysis for health insights and disease risk',
        price: 45000,
        sample_type: 'saliva',
        turnaround_time: '2-3 weeks',
        includes: ['Disease Risk Assessment', 'Pharmacogenomics', 'Carrier Status', 'Ancestry']
      },
      {
        id: '3',
        name: 'Hormone Balance Test',
        type: 'hormone',
        description: 'Comprehensive hormone panel for reproductive and metabolic health',
        price: 20000,
        sample_type: 'blood',
        turnaround_time: '5-7 days',
        includes: ['Thyroid Panel', 'Reproductive Hormones', 'Stress Hormones', 'Metabolic Markers']
      },
      {
        id: '4',
        name: 'Maternal Health Screening',
        type: 'maternal',
        description: 'Specialized tests for pregnant mothers and maternal health',
        price: 25000,
        sample_type: 'blood',
        turnaround_time: '3-5 days',
        includes: ['Prenatal Screening', 'Nutritional Status', 'Infection Panel', 'Genetic Screening']
      }
    ];
  }

  static async getUserTestKits(userId: string): Promise<HomeTestKit[]> {
    const { data, error } = await supabase
      .from('home_test_kits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async orderTestKit(kitOrder: Omit<HomeTestKit, 'id' | 'created_at' | 'updated_at'>): Promise<HomeTestKit> {
    const { data, error } = await supabase
      .from('home_test_kits')
      .insert(kitOrder)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateTestKitStatus(kitId: string, status: string, updates?: Partial<HomeTestKit>): Promise<HomeTestKit> {
    const updateData = { status, ...updates };
    
    const { data, error } = await supabase
      .from('home_test_kits')
      .update(updateData)
      .eq('id', kitId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getTestKitById(kitId: string): Promise<HomeTestKit | null> {
    const { data, error } = await supabase
      .from('home_test_kits')
      .select('*')
      .eq('id', kitId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  static async trackKit(orderNumber: string): Promise<HomeTestKit | null> {
    const { data, error } = await supabase
      .from('home_test_kits')
      .select('*')
      .eq('order_number', orderNumber)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  static getStatusColor(status: string): string {
    const statusColors: Record<string, string> = {
      'ordered': 'bg-blue-100 text-blue-800',
      'shipped': 'bg-yellow-100 text-yellow-800',
      'delivered': 'bg-green-100 text-green-800',
      'sample_collected': 'bg-purple-100 text-purple-800',
      'processing': 'bg-orange-100 text-orange-800',
      'completed': 'bg-emerald-100 text-emerald-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  }

  static getStatusMessage(status: string): string {
    const statusMessages: Record<string, string> = {
      'ordered': 'Order confirmed and being processed',
      'shipped': 'Test kit shipped to your address',
      'delivered': 'Kit delivered - please collect sample',
      'sample_collected': 'Sample collected and returned',
      'processing': 'Sample being analyzed in lab',
      'completed': 'Results available in your dashboard'
    };
    return statusMessages[status] || 'Status unknown';
  }
}