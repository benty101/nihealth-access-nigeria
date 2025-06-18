
import { supabase } from '@/integrations/supabase/client';

export interface HospitalDoctor {
  id: string;
  hospital_id: string;
  doctor_id: string;
  department?: string;
  position: string;
  employment_type: string;
  is_active: boolean;
  joined_date: string;
  created_at: string;
  updated_at: string;
  telemedicine_providers?: any;
  hospitals?: any;
}

export interface Consultation {
  id: string;
  consultation_number: string;
  patient_id: string;
  doctor_id: string;
  hospital_id?: string;
  consultation_type: string;
  status: string;
  scheduled_at: string;
  started_at?: string;
  ended_at?: string;
  duration_minutes?: number;
  consultation_fee: number;
  payment_status: string;
  chief_complaint?: string;
  symptoms?: string;
  diagnosis?: string;
  treatment_plan?: string;
  prescription_notes?: string;
  follow_up_required: boolean;
  follow_up_date?: string;
  consultation_notes?: string;
  patient_satisfaction_rating?: number;
  created_at: string;
  updated_at: string;
  telemedicine_providers?: any;
  hospitals?: any;
  profiles?: any;
}

export interface PatientRecord {
  id: string;
  patient_id: string;
  hospital_id: string;
  record_number: string;
  admission_date?: string;
  discharge_date?: string;
  attending_doctor_id?: string;
  department?: string;
  room_number?: string;
  bed_number?: string;
  admission_type?: string;
  chief_complaint?: string;
  medical_history?: string;
  current_medications?: string;
  allergies?: string;
  vital_signs?: any;
  diagnosis?: string;
  treatment_plan?: string;
  discharge_summary?: string;
  follow_up_instructions?: string;
  status: string;
  created_at: string;
  updated_at: string;
  hospitals?: any;
  telemedicine_providers?: any;
  profiles?: any;
}

export interface DoctorAvailability {
  id: string;
  doctor_id: string;
  hospital_id?: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
  max_patients_per_slot: number;
  slot_duration_minutes: number;
  break_start_time?: string;
  break_end_time?: string;
  created_at: string;
  updated_at: string;
  telemedicine_providers?: any;
  hospitals?: any;
}

class HospitalManagementService {
  // Hospital Doctors Management
  async getHospitalDoctors(hospitalId?: string): Promise<HospitalDoctor[]> {
    let query = supabase
      .from('hospital_doctors')
      .select(`
        *,
        telemedicine_providers(id, name, specialization, license_number, consultation_fee, rating),
        hospitals(id, name, address)
      `)
      .eq('is_active', true);

    if (hospitalId) {
      query = query.eq('hospital_id', hospitalId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async addDoctorToHospital(hospitalId: string, doctorId: string, department?: string, employmentType = 'full_time'): Promise<void> {
    const { error } = await supabase
      .from('hospital_doctors')
      .insert({
        hospital_id: hospitalId,
        doctor_id: doctorId,
        department,
        employment_type: employmentType,
        is_active: true
      });

    if (error) throw error;
  }

  async removeDoctorFromHospital(hospitalDoctorId: string): Promise<void> {
    const { error } = await supabase
      .from('hospital_doctors')
      .update({ is_active: false })
      .eq('id', hospitalDoctorId);

    if (error) throw error;
  }

  // Doctor Availability Management
  async getDoctorAvailability(doctorId?: string, hospitalId?: string): Promise<DoctorAvailability[]> {
    let query = supabase
      .from('doctor_availability')
      .select(`
        *,
        telemedicine_providers(id, name, specialization),
        hospitals(id, name)
      `)
      .eq('is_available', true);

    if (doctorId) {
      query = query.eq('doctor_id', doctorId);
    }
    if (hospitalId) {
      query = query.eq('hospital_id', hospitalId);
    }

    const { data, error } = await query.order('day_of_week', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async setDoctorAvailability(availabilityData: Omit<DoctorAvailability, 'id' | 'created_at' | 'updated_at'>): Promise<void> {
    const { error } = await supabase
      .from('doctor_availability')
      .insert(availabilityData);

    if (error) throw error;
  }

  async updateDoctorAvailability(id: string, updates: Partial<DoctorAvailability>): Promise<void> {
    const { error } = await supabase
      .from('doctor_availability')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  }

  // Patient Records Management
  async getPatientRecords(hospitalId?: string, patientId?: string): Promise<PatientRecord[]> {
    let query = supabase
      .from('patient_records')
      .select(`
        *,
        hospitals(id, name, address),
        telemedicine_providers(id, name, specialization),
        profiles(id, full_name, phone_number, date_of_birth)
      `);

    if (hospitalId) {
      query = query.eq('hospital_id', hospitalId);
    }
    if (patientId) {
      query = query.eq('patient_id', patientId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createPatientRecord(recordData: Omit<PatientRecord, 'id' | 'record_number' | 'created_at' | 'updated_at'>): Promise<string> {
    // Add empty record_number since it will be auto-generated by the database trigger
    const insertData = {
      ...recordData,
      record_number: ''
    };

    const { data, error } = await supabase
      .from('patient_records')
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;
    return data.id;
  }

  async updatePatientRecord(id: string, updates: Partial<PatientRecord>): Promise<void> {
    const { error } = await supabase
      .from('patient_records')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  }

  // Consultations Management
  async getConsultations(hospitalId?: string, doctorId?: string, patientId?: string): Promise<Consultation[]> {
    let query = supabase
      .from('consultations')
      .select(`
        *,
        telemedicine_providers(id, name, specialization, consultation_fee),
        hospitals(id, name),
        profiles(id, full_name, phone_number)
      `);

    if (hospitalId) {
      query = query.eq('hospital_id', hospitalId);
    }
    if (doctorId) {
      query = query.eq('doctor_id', doctorId);
    }
    if (patientId) {
      query = query.eq('patient_id', patientId);
    }

    const { data, error } = await query.order('scheduled_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async scheduleConsultation(consultationData: Omit<Consultation, 'id' | 'consultation_number' | 'created_at' | 'updated_at'>): Promise<string> {
    // Add empty consultation_number since it will be auto-generated by the database trigger
    const insertData = {
      ...consultationData,
      consultation_number: ''
    };

    const { data, error } = await supabase
      .from('consultations')
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;
    return data.id;
  }

  async updateConsultation(id: string, updates: Partial<Consultation>): Promise<void> {
    const { error } = await supabase
      .from('consultations')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  }

  async startConsultation(id: string): Promise<void> {
    const { error } = await supabase
      .from('consultations')
      .update({
        status: 'in_progress',
        started_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
  }

  async endConsultation(id: string, diagnosis?: string, treatmentPlan?: string, prescriptionNotes?: string): Promise<void> {
    const startedAt = await this.getConsultationStartTime(id);
    const endedAt = new Date();
    const durationMinutes = startedAt ? Math.round((endedAt.getTime() - new Date(startedAt).getTime()) / 60000) : null;

    const { error } = await supabase
      .from('consultations')
      .update({
        status: 'completed',
        ended_at: endedAt.toISOString(),
        duration_minutes: durationMinutes,
        diagnosis,
        treatment_plan: treatmentPlan,
        prescription_notes: prescriptionNotes
      })
      .eq('id', id);

    if (error) throw error;
  }

  private async getConsultationStartTime(id: string): Promise<string | null> {
    const { data, error } = await supabase
      .from('consultations')
      .select('started_at')
      .eq('id', id)
      .single();

    if (error) return null;
    return data.started_at;
  }

  // Dashboard Analytics
  async getHospitalDashboardStats(hospitalId: string) {
    const [
      doctorsCount,
      patientsCount,
      consultationsToday,
      activeRecords
    ] = await Promise.all([
      this.getHospitalDoctorsCount(hospitalId),
      this.getHospitalPatientsCount(hospitalId),
      this.getTodayConsultationsCount(hospitalId),
      this.getActiveRecordsCount(hospitalId)
    ]);

    return {
      doctorsCount,
      patientsCount,
      consultationsToday,
      activeRecords
    };
  }

  private async getHospitalDoctorsCount(hospitalId: string): Promise<number> {
    const { count, error } = await supabase
      .from('hospital_doctors')
      .select('id', { count: 'exact' })
      .eq('hospital_id', hospitalId)
      .eq('is_active', true);

    if (error) throw error;
    return count || 0;
  }

  private async getHospitalPatientsCount(hospitalId: string): Promise<number> {
    const { count, error } = await supabase
      .from('patient_records')
      .select('patient_id', { count: 'exact' })
      .eq('hospital_id', hospitalId);

    if (error) throw error;
    return count || 0;
  }

  private async getTodayConsultationsCount(hospitalId: string): Promise<number> {
    const today = new Date().toISOString().split('T')[0];
    const { count, error } = await supabase
      .from('consultations')
      .select('id', { count: 'exact' })
      .eq('hospital_id', hospitalId)
      .gte('scheduled_at', today)
      .lt('scheduled_at', today + 'T23:59:59.999Z');

    if (error) throw error;
    return count || 0;
  }

  private async getActiveRecordsCount(hospitalId: string): Promise<number> {
    const { count, error } = await supabase
      .from('patient_records')
      .select('id', { count: 'exact' })
      .eq('hospital_id', hospitalId)
      .eq('status', 'active');

    if (error) throw error;
    return count || 0;
  }
}

export const hospitalManagementService = new HospitalManagementService();
