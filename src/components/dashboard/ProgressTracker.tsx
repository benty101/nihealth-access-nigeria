
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { OnboardingData } from '@/services/PersonalizationService';
import { useAuth } from '@/contexts/AuthContext';

interface ProgressTrackerProps {
  onboardingData: OnboardingData | null;
}

interface ProgressItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

const ProgressTracker = ({ onboardingData }: ProgressTrackerProps) => {
  const { user } = useAuth();

  const getProgressItems = (): ProgressItem[] => {
    const profileComplete = !!onboardingData;
    const emailVerified = user?.email_confirmed_at;
    
    return [
      {
        id: 'profile',
        title: 'Complete Health Profile',
        description: 'Set up your basic health information',
        completed: profileComplete,
        priority: 'high'
      },
      {
        id: 'email',
        title: 'Verify Email',
        description: 'Confirm your email address',
        completed: !!emailVerified,
        priority: 'high'
      },
      {
        id: 'insurance',
        title: 'Choose Insurance Plan',
        description: 'Select a health insurance plan that fits your needs',
        completed: false, // TODO: Check if user has selected insurance
        priority: 'medium'
      },
      {
        id: 'emergency',
        title: 'Set Emergency Contacts',
        description: 'Add emergency contact information',
        completed: false, // TODO: Check if emergency contacts are set
        priority: 'medium'
      }
    ];
  };

  const progressItems = getProgressItems();
  const completedItems = progressItems.filter(item => item.completed).length;
  const progressPercentage = (completedItems / progressItems.length) * 100;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Profile Completion</span>
          <span className="text-sm text-gray-500">{completedItems}/{progressItems.length}</span>
        </CardTitle>
        <Progress value={progressPercentage} className="w-full" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {progressItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              {item.completed ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className={`h-5 w-5 ${
                  item.priority === 'high' ? 'text-red-500' : 'text-gray-400'
                }`} />
              )}
              <div className="flex-1">
                <p className={`font-medium ${item.completed ? 'text-gray-600' : 'text-gray-900'}`}>
                  {item.title}
                </p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              {item.priority === 'high' && !item.completed && (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
