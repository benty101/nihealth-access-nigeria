
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Clock, 
  Zap, 
  Target,
  TrendingUp,
  Award,
  Activity,
  Users
} from 'lucide-react';

interface UsageAnalyticsProps {
  usageStats: any;
}

const UsageAnalytics = ({ usageStats }: UsageAnalyticsProps) => {
  const mockWeeklyData = [
    { day: 'Mon', sessions: 2, time: 3.5 },
    { day: 'Tue', sessions: 1, time: 2.0 },
    { day: 'Wed', sessions: 3, time: 4.2 },
    { day: 'Thu', sessions: 0, time: 0 },
    { day: 'Fri', sessions: 4, time: 5.8 },
    { day: 'Sat', sessions: 1, time: 1.5 },
    { day: 'Sun', sessions: 2, time: 2.8 }
  ];

  const achievements = [
    { title: 'First Model', description: 'Trained your first ML model', earned: true, date: '2024-12-20' },
    { title: 'Ethics Champion', description: 'Achieved 90%+ ethical compliance', earned: true, date: '2024-12-21' },
    { title: 'Data Curator', description: 'Generated 5 synthetic datasets', earned: false, progress: 60 },
    { title: 'Template Master', description: 'Used 10 different ML templates', earned: false, progress: 30 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Usage Analytics</h2>
        <p className="text-gray-600">Track your ML environment usage and progress</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold">{usageStats?.total_sessions || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Total Time</p>
                <p className="text-2xl font-bold">{usageStats?.total_time || 0}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Models Trained</p>
                <p className="text-2xl font-bold">{usageStats?.models_trained || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Ethical Score</p>
                <p className="text-2xl font-bold">{usageStats?.ethical_score || 0}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Weekly Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockWeeklyData.map((day) => (
              <div key={day.day} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium">{day.day}</div>
                <div className="flex-1 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Sessions: {day.sessions}</span>
                      <span>{day.time}h</span>
                    </div>
                    <Progress value={(day.time / 6) * 100} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className={`p-4 rounded-lg border ${achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      {achievement.earned && (
                        <Badge className="bg-green-100 text-green-800">
                          <Award className="h-3 w-3 mr-1" />
                          Earned
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    {achievement.earned && achievement.date && (
                      <p className="text-xs text-gray-500 mt-1">Earned on {new Date(achievement.date).toLocaleDateString()}</p>
                    )}
                    {!achievement.earned && achievement.progress && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    {achievement.earned ? (
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Award className="h-4 w-4 text-green-600" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Target className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-medium text-blue-900 mb-1">Peak Productivity</h4>
              <p className="text-sm text-blue-800">You're most productive on Fridays with an average of 5.8 hours per session.</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <h4 className="font-medium text-green-900 mb-1">Ethical Excellence</h4>
              <p className="text-sm text-green-800">Great job maintaining a {usageStats?.ethical_score || 0}% ethical compliance score!</p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <h4 className="font-medium text-purple-900 mb-1">Learning Path</h4>
              <p className="text-sm text-purple-800">Consider exploring advanced drug repurposing templates to expand your expertise.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsageAnalytics;
