
import { supabase } from '@/integrations/supabase/client';

export interface MedicationReminder {
  id: string;
  user_id: string;
  medication_id?: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  time_of_day?: string[];
  start_date: string;
  end_date?: string;
  reminder_enabled: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
  medications?: any;
}

export interface CreateReminderRequest {
  medication_id?: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  time_of_day?: string[];
  start_date: string;
  end_date?: string;
  notes?: string;
}

class MedicationReminderService {
  async createReminder(reminderData: CreateReminderRequest): Promise<void> {
    console.log('MedicationReminderService: Creating reminder...');
    
    const { error } = await supabase
      .from('medication_reminders')
      .insert([{
        ...reminderData,
        user_id: (await supabase.auth.getUser()).data.user?.id
      }]);

    if (error) {
      console.error('Error creating reminder:', error);
      throw error;
    }
  }

  async getUserReminders(): Promise<MedicationReminder[]> {
    console.log('MedicationReminderService: Fetching user reminders...');
    
    const { data, error } = await supabase
      .from('medication_reminders')
      .select(`
        *,
        medications(name, brand)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reminders:', error);
      throw error;
    }

    return data || [];
  }

  async updateReminder(id: string, updates: Partial<MedicationReminder>): Promise<void> {
    const { error } = await supabase
      .from('medication_reminders')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating reminder:', error);
      throw error;
    }
  }

  async deleteReminder(id: string): Promise<void> {
    const { error } = await supabase
      .from('medication_reminders')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting reminder:', error);
      throw error;
    }
  }

  async toggleReminder(id: string, enabled: boolean): Promise<void> {
    await this.updateReminder(id, { reminder_enabled: enabled });
  }
}

export const medicationReminderService = new MedicationReminderService();
