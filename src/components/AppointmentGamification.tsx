
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Calendar, 
  CheckCircle, 
  Gift, 
  Heart,
  Baby,
  Activity,
  Target,
  Award,
  Zap
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AppointmentGamification = () => {
  const [userProgress, setUserProgress] = useState({
    totalPoints: 175,
    level: 2,
    appointmentsCompleted: 8,
    totalAppointments: 10,
    currentStreak: 5,
    longestStreak: 7
  });

  const achievements = [
    {
      id: 1,
      title: 'Early Bird',
      description: 'Completed your first antenatal appointment',
      icon: Calendar,
      earned: true,
      points: 25,
      date: '2024-12-01'
    },
    {
      id: 2,
      title: 'Consistency Champion',
      description: 'Attended 5 appointments on time',
      icon: Trophy,
      earned: true,
      points: 50,
      date: '2024-12-10'
    },
    {
      id: 3,
      title: 'Health Hero',
      description: 'Completed all first trimester check-ups',
      icon: Heart,
      earned: true,
      points: 100,
      date: '2024-12-15'
    },
    {
      id: 4,
      title: 'Milestone Master',
      description: 'Reached your 30-week check-up',
      icon: Star,
      earned: false,
      points: 75,
      progress: 85
    },
    {
      id: 5,
      title: 'Perfect Attendance',
      description: 'Complete all recommended appointments',
      icon: Award,
      earned: false,
      points: 200,
      progress: 80
    }
  ];

  const weeklyGoals = [
    {
      id: 1,
      title: 'Take Daily Vitamins',
      description: 'Take prenatal vitamins for 7 days',
      icon: Zap,
      completed: 5,
      target: 7,
      points: 20
    },
    {
      id: 2,
      title: 'Exercise Sessions',
      description: 'Complete 3 antenatal exercise sessions',
      icon: Activity,
      completed: 2,
      target: 3,
      points: 30
    },
    {
      id: 3,
      title: 'Health Education',
      description: 'Read 2 health articles',
      icon: Baby,
      completed: 2,
      target: 2,
      points: 15
    }
  ];

  const congratulateMilestone = (milestone: string) => {
    toast({
      title: `🎉 Congratulations!`,
      description: `Great job ${milestone}! You're taking excellent care of yourself and your baby.`,
    });
  };

  const handleCompleteGoal = (goalId: number) => {
    const updatedGoals = weeklyGoals.map(goal => 
      goal.id === goalId 
        ? { ...goal, completed: Math.min(goal.completed + 1, goal.target) }
        : goal
    );
    
    const completedGoal = weeklyGoals.find(goal => goal.id === goalId);
    if (completedGoal && completedGoal.completed + 1 === completedGoal.target) {
      congratulateMilestone(`completing "${completedGoal.title}"`);
      setUserProgress(prev => ({ ...prev, totalPoints: prev.totalPoints + completedGoal.points }));
    }
  };

  const getLevelProgress = () => {
    const pointsForNextLevel = userProgress.level * 100;
    const currentLevelPoints = userProgress.totalPoints % 100;
    return (currentLevelPoints / pointsForNextLevel) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-teal-600" />
              Your Health Journey
            </span>
            <Badge className="bg-teal-600 text-white">Level {userProgress.level}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600">{userProgress.totalPoints}</div>
              <div className="text-sm text-gray-600">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{userProgress.appointmentsCompleted}/{userProgress.totalAppointments}</div>
              <div className="text-sm text-gray-600">Appointments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{userProgress.currentStreak}</div>
              <div className="text-sm text-gray-600">Current Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userProgress.longestStreak}</div>
              <div className="text-sm text-gray-600">Longest Streak</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {userProgress.level + 1}</span>
              <span>{Math.round(getLevelProgress())}%</span>
            </div>
            <Progress value={getLevelProgress()} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Recent Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {achievements.filter(a => a.earned).slice(-3).map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <div key={achievement.id} className="flex items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <IconComponent className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-emerald-900">{achievement.title}</div>
                    <div className="text-sm text-emerald-700">{achievement.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-600 font-bold">+{achievement.points}</div>
                    <div className="text-xs text-emerald-600">{achievement.date}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-blue-500" />
            This Week's Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyGoals.map((goal) => {
              const IconComponent = goal.icon;
              const isCompleted = goal.completed >= goal.target;
              const progressPercentage = (goal.completed / goal.target) * 100;
              
              return (
                <div key={goal.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${isCompleted ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <IconComponent className={`h-4 w-4 ${isCompleted ? 'text-green-600' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <div className={`font-medium ${isCompleted ? 'text-green-900' : 'text-gray-900'}`}>{goal.title}</div>
                        <div className={`text-sm ${isCompleted ? 'text-green-700' : 'text-gray-600'}`}>{goal.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${isCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                        {goal.completed}/{goal.target}
                      </div>
                      <div className="text-xs text-gray-500">+{goal.points} pts</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Progress value={progressPercentage} className="h-2" />
                    {!isCompleted && (
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleCompleteGoal(goal.id)}
                        disabled={goal.completed >= goal.target}
                      >
                        Mark as Complete
                      </Button>
                    )}
                    {isCompleted && (
                      <div className="flex items-center justify-center text-green-600 text-sm font-medium">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Goal Completed!
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="h-5 w-5 mr-2 text-purple-500" />
            Upcoming Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {achievements.filter(a => !a.earned).map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <div key={achievement.id} className="flex items-center p-3 border rounded-lg">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <IconComponent className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{achievement.title}</div>
                    <div className="text-sm text-gray-600">{achievement.description}</div>
                    {achievement.progress && (
                      <div className="mt-2">
                        <Progress value={achievement.progress} className="h-2" />
                        <div className="text-xs text-gray-500 mt-1">{achievement.progress}% complete</div>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-gray-600 font-bold">+{achievement.points}</div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentGamification;
