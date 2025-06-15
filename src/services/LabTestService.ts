
import { supabase } from '@/integrations/supabase/client';

export interface LabTest {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  lab_id?: string;
  sample_type?: string;
  preparation_required?: string;
  turnaround_time?: string;
  normal_range?: string;
  test_code?: string;
  is_fasting_required: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

class LabTestService {
  async getAllLabTests(): Promise<LabTest[]> {
    console.log('Fetching lab tests...');
    const { data, error } = await supabase
      .from('lab_tests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching lab tests:', error);
      throw error;
    }

    console.log('Lab tests loaded:', data?.length || 0);
    return data || [];
  }

  async createLabTest(labTest: Omit<LabTest, 'id' | 'created_at' | 'updated_at'>): Promise<LabTest> {
    console.log('Creating lab test:', labTest);
    const { data, error } = await supabase
      .from('lab_tests')
      .insert(labTest)
      .select()
      .single();

    if (error) {
      console.error('Error creating lab test:', error);
      throw error;
    }

    console.log('Lab test created:', data);
    return data;
  }

  async updateLabTest(id: string, updates: Partial<LabTest>): Promise<void> {
    console.log('Updating lab test:', id, updates);
    const { error } = await supabase
      .from('lab_tests')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating lab test:', error);
      throw error;
    }

    console.log('Lab test updated successfully');
  }

  async deleteLabTest(id: string): Promise<void> {
    console.log('Deactivating lab test:', id);
    const { error } = await supabase
      .from('lab_tests')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deactivating lab test:', error);
      throw error;
    }

    console.log('Lab test deactivated successfully');
  }
}

export const labTestService = new LabTestService();
