import { supabase } from "@/integrations/supabase/client";

export interface HealthTimelineEvent {
  id: string;
  user_id: string;
  event_type: string;
  event_title: string;
  event_description?: string;
  event_date: string;
  related_id?: string;
  related_table?: string;
  metadata?: any;
  is_milestone: boolean;
  privacy_level: string;
  created_at: string;
}

export class HealthTimelineService {
  static async getUserTimeline(userId: string): Promise<HealthTimelineEvent[]> {
    const { data, error } = await supabase
      .from('health_timeline_events')
      .select('*')
      .eq('user_id', userId)
      .order('event_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async addTimelineEvent(event: Omit<HealthTimelineEvent, 'id' | 'created_at'>): Promise<HealthTimelineEvent> {
    const { data, error } = await supabase
      .from('health_timeline_events')
      .insert(event)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateTimelineEvent(id: string, updates: Partial<HealthTimelineEvent>): Promise<HealthTimelineEvent> {
    const { data, error } = await supabase
      .from('health_timeline_events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteTimelineEvent(id: string): Promise<void> {
    const { error } = await supabase
      .from('health_timeline_events')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Auto-create timeline events for various activities
  static async createLabTestEvent(userId: string, labOrder: any) {
    return this.addTimelineEvent({
      user_id: userId,
      event_type: 'lab_test',
      event_title: `Lab Test Ordered`,
      event_description: `Ordered lab tests for ${labOrder.patient_name}`,
      event_date: labOrder.created_at,
      related_id: labOrder.id,
      related_table: 'lab_test_orders',
      is_milestone: false,
      privacy_level: 'private'
    });
  }

  static async createMedicationEvent(userId: string, medicationOrder: any) {
    return this.addTimelineEvent({
      user_id: userId,
      event_type: 'medication',
      event_title: `Medication Ordered`,
      event_description: `Ordered medications - Order #${medicationOrder.order_number}`,
      event_date: medicationOrder.created_at,
      related_id: medicationOrder.id,
      related_table: 'medication_orders',
      is_milestone: false,
      privacy_level: 'private'
    });
  }

  static async createConsultationEvent(userId: string, consultation: any) {
    return this.addTimelineEvent({
      user_id: userId,
      event_type: 'consultation',
      event_title: `Medical Consultation`,
      event_description: `Consultation with doctor`,
      event_date: consultation.scheduled_at,
      related_id: consultation.id,
      related_table: 'consultations',
      is_milestone: true,
      privacy_level: 'private'
    });
  }

  static async createGenomicTestEvent(userId: string, testKit: any) {
    return this.addTimelineEvent({
      user_id: userId,
      event_type: 'genomic_test',
      event_title: `Genomic Test Kit Ordered`,
      event_description: `Ordered ${testKit.kit_name} test kit`,
      event_date: testKit.created_at,
      related_id: testKit.id,
      related_table: 'home_test_kits',
      is_milestone: true,
      privacy_level: 'private'
    });
  }
}