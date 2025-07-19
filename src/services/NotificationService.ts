import { supabase } from '@/integrations/supabase/client';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'health_reminder' | 'appointment' | 'lab_result' | 'medication' | 'family_update' | 'milestone';
  is_read: boolean;
  related_id?: string;
  related_type?: string;
  created_at: string;
  action_url?: string;
}

export class NotificationService {
  static async createNotification(notification: Omit<Notification, 'id' | 'created_at' | 'is_read'>) {
    const { data, error } = await supabase
      .from('notifications')
      .insert({
        ...notification,
        is_read: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating notification:', error);
      throw error;
    }

    return data;
  }

  static async getUserNotifications(userId: string): Promise<Notification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }

    return data || [];
  }

  static async markAsRead(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  static async markAllAsRead(userId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  static async getUnreadCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      console.error('Error getting unread count:', error);
      return 0;
    }

    return count || 0;
  }

  // Real-time subscription for notifications
  static subscribeToNotifications(userId: string, callback: (notification: Notification) => void) {
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(payload.new as Notification);
        }
      )
      .subscribe();

    return channel;
  }

  // Notification triggers for health events
  static async notifyHealthMilestone(userId: string, milestone: string, details: string) {
    return this.createNotification({
      user_id: userId,
      title: '🎉 Health Milestone Achieved!',
      message: `${milestone} - ${details}`,
      type: 'milestone',
    });
  }

  static async notifyLabResults(userId: string, testName: string, orderId: string) {
    return this.createNotification({
      user_id: userId,
      title: '📋 Lab Results Available',
      message: `Your ${testName} results are ready for review`,
      type: 'lab_result',
      related_id: orderId,
      related_type: 'lab_order',
      action_url: '/records',
    });
  }

  static async notifyFamilyUpdate(userId: string, familyMember: string, update: string) {
    return this.createNotification({
      user_id: userId,
      title: '👨‍👩‍👧‍👦 Family Health Update',
      message: `${familyMember} shared a health update: ${update}`,
      type: 'family_update',
      action_url: '/records',
    });
  }

  static async notifyAppointmentReminder(userId: string, doctorName: string, appointmentDate: string) {
    return this.createNotification({
      user_id: userId,
      title: '📅 Appointment Reminder',
      message: `Upcoming appointment with ${doctorName} on ${appointmentDate}`,
      type: 'appointment',
      action_url: '/appointments',
    });
  }
}