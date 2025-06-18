
import { supabase } from '@/integrations/supabase/client';

export interface HospitalActivity {
  id: string;
  type: 'patient_registered' | 'appointment_scheduled' | 'consultation_completed' | 'doctor_added' | 'record_updated';
  title: string;
  description: string;
  timestamp: string;
  relatedId?: string;
  hospitalId: string;
}

class HospitalActivityService {
  async getRecentActivities(hospitalId: string, limit = 10): Promise<HospitalActivity[]> {
    const activities: HospitalActivity[] = [];

    // Get recent patient records
    const { data: recentRecords } = await supabase
      .from('patient_records')
      .select(`
        id, 
        created_at, 
        patient_id,
        record_number
      `)
      .eq('hospital_id', hospitalId)
      .order('created_at', { ascending: false })
      .limit(3);

    if (recentRecords) {
      // Get patient names separately
      const patientIds = recentRecords.map(record => record.patient_id);
      const { data: patientProfiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', patientIds);

      recentRecords.forEach(record => {
        const patientProfile = patientProfiles?.find(p => p.id === record.patient_id);
        activities.push({
          id: `record_${record.id}`,
          type: 'patient_registered',
          title: 'New patient registered',
          description: `${patientProfile?.full_name || 'Patient'} added to hospital records`,
          timestamp: record.created_at,
          relatedId: record.patient_id,
          hospitalId
        });
      });
    }

    // Get recent consultations
    const { data: recentConsultations } = await supabase
      .from('consultations')
      .select(`
        id, 
        created_at, 
        scheduled_at, 
        status,
        patient_id,
        doctor_id,
        consultation_number
      `)
      .eq('hospital_id', hospitalId)
      .order('created_at', { ascending: false })
      .limit(3);

    if (recentConsultations) {
      // Get patient and doctor names separately
      const patientIds = recentConsultations.map(c => c.patient_id);
      const doctorIds = recentConsultations.map(c => c.doctor_id);
      
      const { data: patientProfiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', patientIds);

      const { data: doctorProfiles } = await supabase
        .from('telemedicine_providers')
        .select('id, name')
        .in('id', doctorIds);

      recentConsultations.forEach(consultation => {
        const patientProfile = patientProfiles?.find(p => p.id === consultation.patient_id);
        const doctorProfile = doctorProfiles?.find(d => d.id === consultation.doctor_id);
        const isCompleted = consultation.status === 'completed';
        
        activities.push({
          id: `consultation_${consultation.id}`,
          type: isCompleted ? 'consultation_completed' : 'appointment_scheduled',
          title: isCompleted ? 'Consultation completed' : 'Appointment scheduled',
          description: `${patientProfile?.full_name || 'Patient'} with Dr. ${doctorProfile?.name || 'Unknown'}`,
          timestamp: consultation.created_at,
          relatedId: consultation.id,
          hospitalId
        });
      });
    }

    // Get recent hospital doctors
    const { data: recentDoctors } = await supabase
      .from('hospital_doctors')
      .select(`
        id, 
        created_at, 
        doctor_id
      `)
      .eq('hospital_id', hospitalId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(2);

    if (recentDoctors) {
      // Get doctor details separately
      const doctorIds = recentDoctors.map(d => d.doctor_id);
      const { data: doctorProfiles } = await supabase
        .from('telemedicine_providers')
        .select('id, name, specialization')
        .in('id', doctorIds);

      recentDoctors.forEach(doctor => {
        const doctorProfile = doctorProfiles?.find(d => d.id === doctor.doctor_id);
        activities.push({
          id: `doctor_${doctor.id}`,
          type: 'doctor_added',
          title: 'Doctor added to hospital',
          description: `Dr. ${doctorProfile?.name || 'Unknown'} (${doctorProfile?.specialization || 'General'})`,
          timestamp: doctor.created_at,
          relatedId: doctor.id,
          hospitalId
        });
      });
    }

    // Sort all activities by timestamp and return limited results
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  getActivityIcon(type: HospitalActivity['type']): string {
    switch (type) {
      case 'patient_registered': return 'text-green-500';
      case 'appointment_scheduled': return 'text-blue-500';
      case 'consultation_completed': return 'text-purple-500';
      case 'doctor_added': return 'text-teal-500';
      case 'record_updated': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  }

  getTimeAgo(timestamp: string): string {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  }
}

export const hospitalActivityService = new HospitalActivityService();
