
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

export interface CreateLabTestRequest {
  name: string;
  category: string;
  price: number;
  description?: string;
  sample_type?: string;
  preparation_required?: string;
  turnaround_time?: string;
  normal_range?: string;
  test_code?: string;
  is_fasting_required: boolean;
  is_active: boolean;
}

export interface UpdateLabTestRequest {
  name?: string;
  category?: string;
  price?: number;
  description?: string;
  sample_type?: string;
  preparation_required?: string;
  turnaround_time?: string;
  normal_range?: string;
  test_code?: string;
  is_fasting_required?: boolean;
  is_active?: boolean;
}

class LabTestService {
  async getAllLabTests(): Promise<LabTest[]> {
    console.log('LabTestService: Fetching all lab tests...');
    
    const { data, error } = await supabase
      .from('lab_tests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('LabTestService: Error fetching lab tests:', error);
      throw error;
    }

    console.log('LabTestService: Successfully fetched', data?.length || 0, 'lab tests');
    return data || [];
  }

  async createLabTest(labTest: CreateLabTestRequest): Promise<LabTest> {
    console.log('LabTestService: Creating lab test:', labTest);
    
    const { data, error } = await supabase
      .from('lab_tests')
      .insert([labTest])
      .select()
      .single();

    if (error) {
      console.error('LabTestService: Error creating lab test:', error);
      throw error;
    }

    console.log('LabTestService: Successfully created lab test:', data);
    return data;
  }

  async updateLabTest(id: string, updates: UpdateLabTestRequest): Promise<LabTest> {
    console.log('LabTestService: Updating lab test:', id, updates);
    
    const { data, error } = await supabase
      .from('lab_tests')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('LabTestService: Error updating lab test:', error);
      throw error;
    }

    console.log('LabTestService: Successfully updated lab test:', data);
    return data;
  }

  async deleteLabTest(id: string): Promise<void> {
    console.log('LabTestService: Deleting lab test:', id);
    
    const { error } = await supabase
      .from('lab_tests')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('LabTestService: Error deleting lab test:', error);
      throw error;
    }

    console.log('LabTestService: Successfully deleted lab test');
  }
}

export const labTestService = new LabTestService();
