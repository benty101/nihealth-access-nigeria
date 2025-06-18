
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Clock, Pill, Heart, X, User, Calendar, FileText, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileCompletionService, ProfileReminder } from '@/services/ProfileCompletionService';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const RealTimeHealthReminders = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [reminders, setReminders] = useState<ProfileReminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadReminders();
    }
  }, [user]);

  const loadReminders = async () => {
    if (!user) return;

    try {
      const profileReminders = await ProfileCompletionService.getProfileReminders(user.id);
      setReminders(profileReminders);
    } catch (error) {
      console.error('Error loading reminders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReminderAction = (reminder: ProfileReminder) => {
    navigate(reminder.link);
    toast({
      title: "Opening Profile",
      description: `Complete your ${reminder.category.toLowerCase()} information`,
    });
  };

  const dismissReminder = (reminderId: string) => {
    setReminders(prev => prev.filter(r => r.id !== reminderId));
    toast({
      title: "Reminder dismissed",
      description: "You can always complete this later in your profile.",
    });
  };

  const getNotificationIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'profile setup':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'safety':
        return <Shield className="h-4 w-4 text-red-500" />;
      case 'health profile':
        return <Heart className="h-4 w-4 text-green-500" />;
      case 'medical history':
        return <FileText className="h-4 w-4 text-purple-500" />;
      case 'insurance':
        return <Shield className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getNotificationColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
            {reminders.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {reminders.length}
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {reminders.length === 0 ? (
          <div className="text-center py-6">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No active reminders</p>
            <p className="text-sm text-gray-500 mt-1">Your health profile looks complete!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reminders.slice(0, 4).map((reminder) => (
              <div key={reminder.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                {getNotificationIcon(reminder.category)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 truncate">
                        {reminder.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {reminder.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={`text-xs ${getNotificationColor(reminder.priority)}`}>
                          {reminder.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {reminder.priority} priority
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        onClick={() => handleReminderAction(reminder)}
                        className="h-7 text-xs"
                      >
                        {reminder.action}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissReminder(reminder.id)}
                        className="h-6 w-6 p-0 flex-shrink-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {reminders.length > 4 && (
              <Button 
                variant="ghost" 
                className="w-full text-sm"
                onClick={() => navigate('/profile')}
              >
                View All ({reminders.length}) Reminders
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeHealthReminders;
