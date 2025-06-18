
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
    // Since user_health_metrics table doesn't exist yet, return sample data
    const sampleMetrics: HealthMetric[] = [
      {
        id: '1',
        user_id: userId,
        metric_type: 'heart_rate',
        value: 72,
        unit: 'bpm',
        recorded_at: new Date().toISOString(),
        notes: 'Normal resting heart rate'
      },
      {
        id: '2',
        user_id: userId,
        metric_type: 'blood_pressure_systolic',
        value: 120,
        unit: 'mmHg',
        recorded_at: new Date().toISOString(),
        notes: 'Normal blood pressure'
      },
      {
        id: '3',
        user_id: userId,
        metric_type: 'weight',
        value: 70,
        unit: 'kg',
        recorded_at: new Date().toISOString()
      }
    ];

    return sampleMetrics;
  },

  async addHealthMetric(metric: Omit<HealthMetric, 'id' | 'user_id' | 'recorded_at'>): Promise<HealthMetric> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // For now, return a mock response since the table doesn't exist
    const newMetric: HealthMetric = {
      id: Date.now().toString(),
      user_id: user.id,
      recorded_at: new Date().toISOString(),
      ...metric
    };

    return newMetric;
  },

  async getUserNotifications(userId: string): Promise<UserNotification[]> {
    // Since user_notifications table doesn't exist yet, return sample data
    const sampleNotifications: UserNotification[] = [
      {
        id: '1',
        user_id: userId,
        title: 'Medication Reminder',
        message: 'Time to take your morning vitamins',
        type: 'medication',
        is_read: false,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        user_id: userId,
        title: 'Health Checkup',
        message: 'Annual checkup is due next month',
        type: 'appointment',
        is_read: false,
        created_at: new Date().toISOString()
      }
    ];

    return sampleNotifications;
  },

  async markNotificationAsRead(notificationId: string): Promise<void> {
    // Mock implementation - in reality would update the database
    console.log(`Marking notification ${notificationId} as read`);
  },

  async getHealthScore(userId: string): Promise<number> {
    // Simple health score calculation
    const metrics = await this.getUserHealthMetrics(userId);
    
    if (metrics.length === 0) {
      return 75; // Default score for new users
    }

    // Basic scoring logic based on having health data
    const score = Math.min(100, Math.max(0, 75 + (metrics.length * 5)));
    
    return score;
  }
};
