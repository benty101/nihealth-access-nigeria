
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Calendar, 
  Pill, 
  Activity, 
  Baby, 
  CheckCircle, 
  X,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const HealthNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'antenatal',
      title: 'Antenatal Check-up Reminder',
      message: 'Your 28-week check-up is scheduled for tomorrow at 10:00 AM',
      time: '1 day',
      priority: 'high',
      actionRequired: true,
      icon: Calendar
    },
    {
      id: 2,
      type: 'medication',
      title: 'Iron Supplement Reminder',
      message: 'Time to take your iron tablets - maintaining healthy blood levels!',
      time: '2 hours',
      priority: 'medium',
      actionRequired: true,
      icon: Pill
    },
    {
      id: 3,
      type: 'wellness',
      title: 'Wellness Check Milestone',
      message: 'Congratulations! You\'ve completed 8 out of 10 recommended check-ups',
      time: '3 hours',
      priority: 'low',
      actionRequired: false,
      icon: Activity
    },
    {
      id: 4,
      type: 'vaccination',
      title: 'Baby Vaccination Due',
      message: 'Your baby\'s 6-week vaccination is due next week',
      time: '5 days',
      priority: 'high',
      actionRequired: true,
      icon: Baby
    }
  ]);

  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    // Check if notifications are supported and request permission
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        setPermissionGranted(true);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          setPermissionGranted(permission === 'granted');
        });
      }
    }
  }, []);

  const sendNotification = (title: string, message: string) => {
    if (permissionGranted) {
      new Notification(title, {
        body: message,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      });
    }
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast({
      title: "Notification marked as read",
      description: "The notification has been dismissed.",
    });
  };

  const handleTakeAction = (notification: any) => {
    // Simulate taking action
    toast({
      title: "Action taken!",
      description: `You've responded to: ${notification.title}`,
    });
    
    // Note: Milestone notifications removed per user request
    if (notification.type === 'antenatal') {
      setTimeout(() => {
        sendNotification(
          "Great job! 🎉", 
          "You've successfully scheduled your antenatal appointment. Keep up the excellent care!"
        );
      }, 2000);
    }
    
    handleMarkAsRead(notification.id);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Bell className="h-5 w-5 mr-2 text-teal-600" />
          Health Reminders
        </h3>
        {!permissionGranted && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => Notification.requestPermission().then(permission => {
              setPermissionGranted(permission === 'granted');
            })}
          >
            Enable Notifications
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h4>
            <p className="text-gray-600">You have no pending health reminders.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <Card key={notification.id} className={`border-l-4 ${getPriorityColor(notification.priority)}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        notification.priority === 'high' ? 'bg-red-100' :
                        notification.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                      }`}>
                        <IconComponent className={`h-5 w-5 ${
                          notification.priority === 'high' ? 'text-red-600' :
                          notification.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">{notification.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getPriorityBadgeColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          <span className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {notification.time} ago
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                  <div className="flex space-x-2">
                    {notification.actionRequired && (
                      <Button 
                        size="sm" 
                        className="bg-teal-600 hover:bg-teal-700"
                        onClick={() => handleTakeAction(notification)}
                      >
                        Take Action
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      Mark as Read
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HealthNotifications;
