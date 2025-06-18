
import { supabase } from '@/integrations/supabase/client';

export interface HealthMetric {
  id: string;
  user_id: string;
  metric_type: string;
  value: number;
  unit: string;
  recorded_at: string;
  notes?: string;
}

export interface UserNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

export const UserHealthService = {
  async getUserHealthMetrics(userId: string): Promise<HealthMetric[]> {
    const { data, error } = await supabase
      .from('user_health_metrics')
      .select('*')
      .eq('user_id', userId)
      .order('recorded_at', { ascending: false });

    if (error) {
      console.error('Error fetching health metrics:', error);
      throw error;
    }

    return data || [];
  },

  async addHealthMetric(metric: Omit<HealthMetric, 'id' | 'user_id' | 'recorded_at'>): Promise<HealthMetric> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('user_health_metrics')
      .insert({
        user_id: user.id,
        ...metric
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding health metric:', error);
      throw error;
    }

    return data;
  },

  async getUserNotifications(userId: string): Promise<UserNotification[]> {
    const { data, error } = await supabase
      .from('user_notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }

    return data || [];
  },

  async markNotificationAsRead(notificationId: string): Promise<void> {
    const { error } = await supabase
      .from('user_notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  async getHealthScore(userId: string): Promise<number> {
    // Simple health score calculation based on recent metrics
    const metrics = await this.getUserHealthMetrics(userId);
    
    if (metrics.length === 0) {
      return 75; // Default score for new users
    }

    // Basic scoring logic - can be enhanced
    const recentMetrics = metrics.slice(0, 10);
    const score = Math.min(100, Math.max(0, 75 + (recentMetrics.length * 2)));
    
    return score;
  }
};
