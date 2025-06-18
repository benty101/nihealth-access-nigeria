
import { supabase } from '@/integrations/supabase/client';

export interface RecentActivityItem {
  id: string;
  type: 'prescription' | 'test' | 'appointment' | 'consultation';
  title: string;
  description: string;
  time: string;
  icon: string;
  color: string;
  created_at: string;
}

export const RecentActivityService = {
  async getUserRecentActivity(userId: string): Promise<RecentActivityItem[]> {
    const activities: RecentActivityItem[] = [];

    try {
      // Fetch recent consultations
      const { data: consultations } = await supabase
        .from('consultations')
        .select(`
          *,
          telemedicine_providers(name, specialization),
          hospitals(name)
        `)
        .eq('patient_id', userId)
        .order('created_at', { ascending: false })
        .limit(3);

      if (consultations) {
        consultations.forEach(consultation => {
          const timeAgo = this.getTimeAgo(consultation.created_at);
          activities.push({
            id: consultation.id,
            type: 'consultation',
            title: consultation.status === 'completed' ? 'Consultation completed' : 'Consultation scheduled',
            description: `${consultation.telemedicine_providers?.name || 'General'} - ${consultation.consultation_type}`,
            time: timeAgo,
            icon: 'Calendar',
            color: 'text-blue-600',
            created_at: consultation.created_at
          });
        });
      }

      // Fetch recent medication orders
      const { data: medicationOrders } = await supabase
        .from('medication_orders')
        .select(`
          *,
          pharmacies(name)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(2);

      if (medicationOrders) {
        medicationOrders.forEach(order => {
          const timeAgo = this.getTimeAgo(order.created_at);
          activities.push({
            id: order.id,
            type: 'prescription',
            title: order.status === 'delivered' ? 'Prescription delivered' : 'Prescription ordered',
            description: `${order.pharmacies?.name || 'Pharmacy'} - Order #${order.order_number}`,
            time: timeAgo,
            icon: 'Pill',
            color: 'text-green-600',
            created_at: order.created_at
          });
        });
      }

      // Fetch recent lab test orders
      const { data: labOrders } = await supabase
        .from('lab_test_orders')
        .select(`
          *,
          labs(name)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(2);

      if (labOrders) {
        labOrders.forEach(order => {
          const timeAgo = this.getTimeAgo(order.created_at);
          activities.push({
            id: order.id,
            type: 'test',
            title: order.results_uploaded ? 'Lab results ready' : 'Lab test ordered',
            description: `${order.labs?.name || 'Laboratory'} - Order #${order.order_number}`,
            time: timeAgo,
            icon: 'TestTube',
            color: 'text-orange-600',
            created_at: order.created_at
          });
        });
      }

      // Sort all activities by creation date
      return activities.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ).slice(0, 5);

    } catch (error) {
      console.error('Error fetching recent activity:', error);
      return [];
    }
  },

  getTimeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  }
};
