
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Clock, Pill, Heart, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserHealthService, UserNotification } from '@/services/UserHealthService';
import { useToast } from '@/hooks/use-toast';

const RealTimeHealthReminders = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadNotifications();
      createSampleNotifications();
    }
  }, [user]);

  const loadNotifications = async () => {
    if (!user) return;

    try {
      const userNotifications = await UserHealthService.getUserNotifications(user.id);
      setNotifications(userNotifications.filter(n => !n.is_read));
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const createSampleNotifications = async () => {
    if (!user) return;

    try {
      // Check if user already has notifications
      const existing = await UserHealthService.getUserNotifications(user.id);
      if (existing.length > 0) return;

      // Create sample notifications for new users
      const sampleNotifications = [
        {
          title: 'Medication Reminder',
          message: 'Time to take your morning vitamins',
          type: 'medication'
        },
        {
          title: 'Health Checkup',
          message: 'Annual checkup is due next month',
          type: 'appointment'
        },
        {
          title: 'Exercise Goal',
          message: 'Complete 30 minutes of exercise today',
          type: 'info'
        }
      ];

      // Note: We'd need a function to create notifications for users
      // For now, this is just to show the UI structure
    } catch (error) {
      console.error('Error creating sample notifications:', error);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await UserHealthService.markNotificationAsRead(notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      toast({
        title: "Notification marked as read"
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast({
        title: "Error",
        description: "Failed to mark notification as read",
        variant: "destructive"
      });
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'medication':
        return <Pill className="h-4 w-4 text-blue-500" />;
      case 'appointment':
        return <Clock className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <Bell className="h-4 w-4 text-red-500" />;
      default:
        return <Heart className="h-4 w-4 text-purple-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'medication':
        return 'bg-blue-100 text-blue-800';
      case 'appointment':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-purple-100 text-purple-800';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-orange-600" />
            Health Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-orange-600" />
            Health Reminders
            {notifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {notifications.length}
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-6">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No active reminders</p>
            <p className="text-sm text-gray-500 mt-1">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.slice(0, 4).map((notification) => (
              <div key={notification.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 truncate">
                        {notification.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <Badge className={`text-xs mt-2 ${getNotificationColor(notification.type)}`}>
                        {notification.type}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="h-6 w-6 p-0 flex-shrink-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {notifications.length > 4 && (
              <Button variant="ghost" className="w-full text-sm">
                View All ({notifications.length}) Reminders
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeHealthReminders;
