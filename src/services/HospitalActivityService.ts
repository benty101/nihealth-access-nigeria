
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
      .select('id, created_at, patient_id, profiles(full_name)')
      .eq('hospital_id', hospitalId)
      .order('created_at', { ascending: false })
      .limit(3);

    if (recentRecords) {
      recentRecords.forEach(record => {
        activities.push({
          id: `record_${record.id}`,
          type: 'patient_registered',
          title: 'New patient registered',
          description: `${record.profiles?.full_name || 'Patient'} added to hospital records`,
          timestamp: record.created_at,
          relatedId: record.patient_id,
          hospitalId
        });
      });
    }

    // Get recent consultations
    const { data: recentConsultations } = await supabase
      .from('consultations')
      .select('id, created_at, scheduled_at, status, profiles(full_name), telemedicine_providers(name)')
      .eq('hospital_id', hospitalId)
      .order('created_at', { ascending: false })
      .limit(3);

    if (recentConsultations) {
      recentConsultations.forEach(consultation => {
        const isCompleted = consultation.status === 'completed';
        activities.push({
          id: `consultation_${consultation.id}`,
          type: isCompleted ? 'consultation_completed' : 'appointment_scheduled',
          title: isCompleted ? 'Consultation completed' : 'Appointment scheduled',
          description: `${consultation.profiles?.full_name || 'Patient'} with Dr. ${consultation.telemedicine_providers?.name || 'Unknown'}`,
          timestamp: consultation.created_at,
          relatedId: consultation.id,
          hospitalId
        });
      });
    }

    // Get recent hospital doctors
    const { data: recentDoctors } = await supabase
      .from('hospital_doctors')
      .select('id, created_at, telemedicine_providers(name, specialization)')
      .eq('hospital_id', hospitalId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(2);

    if (recentDoctors) {
      recentDoctors.forEach(doctor => {
        activities.push({
          id: `doctor_${doctor.id}`,
          type: 'doctor_added',
          title: 'Doctor added to hospital',
          description: `Dr. ${doctor.telemedicine_providers?.name || 'Unknown'} (${doctor.telemedicine_providers?.specialization || 'General'})`,
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
