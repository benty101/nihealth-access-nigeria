
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, AlertCircle, Pill, Calendar, Baby, Trophy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const HealthReminders = () => {
  const reminders = [
    {
      id: 1,
      type: 'antenatal',
      title: 'Next Appointment',
      message: '28-week check-up tomorrow at 10:00 AM',
      priority: 'high',
      icon: Calendar,
      actionText: 'View Details'
    },
    {
      id: 2,
      type: 'medication',
      title: 'Iron Supplement',
      message: 'Take your daily iron tablets',
      priority: 'medium',
      icon: Pill,
      actionText: 'Mark as Taken'
    },
    {
      id: 3,
      type: 'milestone',
      title: 'Congratulations!',
      message: 'You\'ve reached 30 weeks - great job!',
      priority: 'celebration',
      icon: Trophy,
      actionText: 'View Milestone'
    }
  ];

  const handleReminderAction = (reminder: any) => {
    if (reminder.type === 'milestone') {
      toast({
        title: "🎉 Milestone Celebrated!",
        description: "You're doing an amazing job taking care of yourself and your baby!",
      });
    } else {
      toast({
        title: "Action taken!",
        description: `Handled: ${reminder.title}`,
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'celebration': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="h-5 w-5 mr-2 text-orange-600" />
          Health Reminders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reminders.map((reminder) => {
            const IconComponent = reminder.icon;
            return (
              <div 
                key={reminder.id} 
                className={`flex items-center p-3 rounded-lg ${getPriorityColor(reminder.priority)}`}
              >
                <IconComponent className="h-5 w-5 mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{reminder.title}</p>
                  <p className="text-xs opacity-75">{reminder.message}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleReminderAction(reminder)}
                  className="ml-2"
                >
                  {reminder.actionText}
                </Button>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 p-3 bg-teal-50 rounded-lg border border-teal-200">
          <div className="flex items-center text-teal-800">
            <Trophy className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Weekly Progress: 85% complete</span>
          </div>
          <p className="text-xs text-teal-700 mt-1">
            You're on track with your health goals this week!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthReminders;
