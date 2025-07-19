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
  // For now, use mock data until types are updated
  static async createNotification(notification: Omit<Notification, 'id' | 'created_at' | 'is_read'>) {
    // Mock implementation
    const mockNotification = {
      id: Math.random().toString(),
      ...notification,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    
    return mockNotification;
  }

  static async getUserNotifications(userId: string): Promise<Notification[]> {
    // Mock data for demonstration
    return [
      {
        id: '1',
        user_id: userId,
        title: '📋 Lab Results Available',
        message: 'Your blood test results are ready for review',
        type: 'lab_result',
        is_read: false,
        created_at: new Date().toISOString(),
        action_url: '/records',
      },
      {
        id: '2',
        user_id: userId,
        title: '👨‍👩‍👧‍👦 Family Health Update',
        message: 'Family member shared their health timeline with you',
        type: 'family_update',
        is_read: true,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        action_url: '/records',
      },
    ];
  }

  static async markAsRead(notificationId: string) {
    // Mock implementation
    console.log('Marking notification as read:', notificationId);
  }

  static async markAllAsRead(userId: string) {
    // Mock implementation
    console.log('Marking all notifications as read for user:', userId);
  }

  static async getUnreadCount(userId: string): Promise<number> {
    const notifications = await this.getUserNotifications(userId);
    return notifications.filter(n => !n.is_read).length;
  }

  // Real-time subscription for notifications
  static subscribeToNotifications(userId: string, callback: (notification: Notification) => void) {
    // For now, simulate real-time updates
    const channel = {
      unsubscribe: () => {
        console.log('Unsubscribed from notifications');
      },
    };

    // Simulate a new notification after 5 seconds
    setTimeout(() => {
      callback({
        id: Math.random().toString(),
        user_id: userId,
        title: '🎉 Health Milestone Achieved!',
        message: 'Congratulations on completing your first week of health tracking!',
        type: 'milestone',
        is_read: false,
        created_at: new Date().toISOString(),
      });
    }, 5000);

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