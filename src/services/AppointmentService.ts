
import { supabase } from '@/integrations/supabase/client';
import { HealthTimelineService } from './HealthTimelineService';

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id?: string;
  hospital_id?: string;
  scheduled_at: string;
  consultation_type: string;
  status: string;
  chief_complaint?: string;
  consultation_notes?: string;
  created_at: string;
  updated_at: string;
  consultation_number: string;
  consultation_fee: number;
  // Joined data
  doctor_name?: string;
  hospital_name?: string;
  specialization?: string;
}

export interface BookAppointmentData {
  doctor_id?: string;
  hospital_id?: string;
  scheduled_at: string;
  consultation_type: string;
  chief_complaint?: string;
  consultation_notes?: string;
}

export const AppointmentService = {
  async getUserAppointments(userId: string): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('consultations')
      .select(`
        *,
        telemedicine_providers(name, specialization),
        hospitals(name)
      `)
      .eq('patient_id', userId)
      .order('scheduled_at', { ascending: true });

    if (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }

    return data.map(consultation => ({
      id: consultation.id,
      patient_id: consultation.patient_id,
      doctor_id: consultation.doctor_id,
      hospital_id: consultation.hospital_id,
      scheduled_at: consultation.scheduled_at,
      consultation_type: consultation.consultation_type,
      status: consultation.status,
      chief_complaint: consultation.chief_complaint,
      consultation_notes: consultation.consultation_notes,
      created_at: consultation.created_at,
      updated_at: consultation.updated_at,
      consultation_number: consultation.consultation_number,
      consultation_fee: consultation.consultation_fee,
      doctor_name: consultation.telemedicine_providers?.name,
      specialization: consultation.telemedicine_providers?.specialization,
      hospital_name: consultation.hospitals?.name
    }));
  },

  async bookAppointment(appointmentData: BookAppointmentData): Promise<Appointment> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Prepare the insert data - only include fields that should be manually set
    const insertData: any = {
      patient_id: user.id,
      scheduled_at: appointmentData.scheduled_at,
      consultation_type: appointmentData.consultation_type,
      consultation_fee: 5000, // Default fee
      status: 'scheduled'
    };

    // Only add optional fields if they have values
    if (appointmentData.doctor_id) {
      insertData.doctor_id = appointmentData.doctor_id;
    }
    if (appointmentData.hospital_id) {
      insertData.hospital_id = appointmentData.hospital_id;
    }
    if (appointmentData.chief_complaint) {
      insertData.chief_complaint = appointmentData.chief_complaint;
    }
    if (appointmentData.consultation_notes) {
      insertData.consultation_notes = appointmentData.consultation_notes;
    }

    const { data, error } = await supabase
      .from('consultations')
      .insert(insertData)
      .select('*')
      .single();

    if (error) {
      console.error('Error booking appointment:', error);
      throw error;
    }

    // Create timeline event
    await HealthTimelineService.createConsultationEvent(user.id, data);

    return {
      id: data.id,
      patient_id: data.patient_id,
      doctor_id: data.doctor_id,
      hospital_id: data.hospital_id,
      scheduled_at: data.scheduled_at,
      consultation_type: data.consultation_type,
      status: data.status,
      chief_complaint: data.chief_complaint,
      consultation_notes: data.consultation_notes,
      created_at: data.created_at,
      updated_at: data.updated_at,
      consultation_number: data.consultation_number,
      consultation_fee: data.consultation_fee
    };
  },

  async updateAppointment(appointmentId: string, updates: Partial<BookAppointmentData>): Promise<Appointment> {
    const updateData: any = {};
    
    if (updates.doctor_id !== undefined) updateData.doctor_id = updates.doctor_id;
    if (updates.hospital_id !== undefined) updateData.hospital_id = updates.hospital_id;
    if (updates.scheduled_at) updateData.scheduled_at = updates.scheduled_at;
    if (updates.consultation_type) updateData.consultation_type = updates.consultation_type;
    if (updates.chief_complaint !== undefined) updateData.chief_complaint = updates.chief_complaint;
    if (updates.consultation_notes !== undefined) updateData.consultation_notes = updates.consultation_notes;

    const { data, error } = await supabase
      .from('consultations')
      .update(updateData)
      .eq('id', appointmentId)
      .select('*')
      .single();

    if (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }

    return {
      id: data.id,
      patient_id: data.patient_id,
      doctor_id: data.doctor_id,
      hospital_id: data.hospital_id,
      scheduled_at: data.scheduled_at,
      consultation_type: data.consultation_type,
      status: data.status,
      chief_complaint: data.chief_complaint,
      consultation_notes: data.consultation_notes,
      created_at: data.created_at,
      updated_at: data.updated_at,
      consultation_number: data.consultation_number,
      consultation_fee: data.consultation_fee
    };
  },

  async cancelAppointment(appointmentId: string): Promise<void> {
    const { error } = await supabase
      .from('consultations')
      .update({ status: 'cancelled' })
      .eq('id', appointmentId);

    if (error) {
      console.error('Error cancelling appointment:', error);
      throw error;
    }
  }
};
