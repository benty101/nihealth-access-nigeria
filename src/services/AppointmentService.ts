
import { supabase } from '@/integrations/supabase/client';

export interface Appointment {
  id: string;
  user_id: string;
  doctor_id?: string;
  hospital_id?: string;
  appointment_date: string;
  appointment_time: string;
  appointment_type: string;
  status: string;
  chief_complaint?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  doctor_name?: string;
  hospital_name?: string;
  specialty?: string;
}

export interface BookAppointmentData {
  doctor_id?: string;
  hospital_id?: string;
  appointment_date: string;
  appointment_time: string;
  appointment_type: string;
  chief_complaint?: string;
  notes?: string;
}

export const AppointmentService = {
  async getUserAppointments(userId: string): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        telemedicine_providers(name, specialization),
        hospitals(name)
      `)
      .eq('user_id', userId)
      .order('appointment_date', { ascending: true });

    if (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }

    return data.map(appointment => ({
      ...appointment,
      doctor_name: appointment.telemedicine_providers?.name,
      specialty: appointment.telemedicine_providers?.specialization,
      hospital_name: appointment.hospitals?.name
    }));
  },

  async bookAppointment(appointmentData: BookAppointmentData): Promise<Appointment> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('appointments')
      .insert({
        user_id: user.id,
        ...appointmentData
      })
      .select()
      .single();

    if (error) {
      console.error('Error booking appointment:', error);
      throw error;
    }

    return data;
  },

  async updateAppointment(appointmentId: string, updates: Partial<BookAppointmentData>): Promise<Appointment> {
    const { data, error } = await supabase
      .from('appointments')
      .update(updates)
      .eq('id', appointmentId)
      .select()
      .single();

    if (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }

    return data;
  },

  async cancelAppointment(appointmentId: string): Promise<void> {
    const { error } = await supabase
      .from('appointments')
      .update({ status: 'cancelled' })
      .eq('id', appointmentId);

    if (error) {
      console.error('Error cancelling appointment:', error);
      throw error;
    }
  }
};
