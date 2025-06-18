
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, User, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileCompletionService, ProfileCompletionStatus, ProfileReminder } from '@/services/ProfileCompletionService';
import { useNavigate } from 'react-router-dom';

const ProfileCompletion = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [completionStatus, setCompletionStatus] = useState<ProfileCompletionStatus | null>(null);
  const [reminders, setReminders] = useState<ProfileReminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProfileData();
    }
  }, [user]);

  const loadProfileData = async () => {
    if (!user) return;

    try {
      const [status, remindersList] = await Promise.all([
        ProfileCompletionService.getProfileCompletionStatus(user.id),
        ProfileCompletionService.getProfileReminders(user.id)
      ]);

      setCompletionStatus(status);
      setReminders(remindersList);
    } catch (error) {
      console.error('Error loading profile completion data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReminderAction = (reminder: ProfileReminder) => {
    navigate(reminder.link);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!completionStatus) return null;

  const isComplete = completionStatus.overallProgress === 100;

  return (
    <Card className={`border-l-4 ${isComplete ? 'border-l-green-500' : 'border-l-orange-500'}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isComplete ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <User className="h-5 w-5 text-orange-600" />
            )}
            Profile Completion
          </div>
          <Badge variant="outline" className="text-sm">
            {completionStatus.overallProgress}% Complete
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-gray-500">{completionStatus.overallProgress}%</span>
            </div>
            <Progress value={completionStatus.overallProgress} className="h-2" />
          </div>

          {isComplete ? (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center text-green-800">
                <Heart className="h-4 w-4 mr-2" />
                <span className="font-medium">Profile Complete!</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Great job! Your health profile is complete and you're ready to get the most out of our platform.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Complete your profile to unlock all features:</h4>
              {reminders.slice(0, 3).map((reminder) => (
                <div key={reminder.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-sm">{reminder.title}</h5>
                      <p className="text-xs text-gray-600">{reminder.description}</p>
                      <Badge className={`text-xs mt-1 ${getPriorityColor(reminder.priority)}`}>
                        {reminder.category}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleReminderAction(reminder)}
                  >
                    {reminder.action}
                  </Button>
                </div>
              ))}
              
              {reminders.length > 3 && (
                <Button 
                  variant="ghost" 
                  className="w-full text-sm"
                  onClick={() => navigate('/profile')}
                >
                  View All Tasks ({reminders.length})
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletion;
