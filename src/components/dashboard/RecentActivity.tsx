
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Pill, TestTube, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { RecentActivityService, RecentActivityItem } from '@/services/RecentActivityService';

const RecentActivity = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<RecentActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    Calendar,
    Pill,
    TestTube,
    Clock
  };

  useEffect(() => {
    const loadRecentActivity = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const userActivities = await RecentActivityService.getUserRecentActivity(user.id);
        setActivities(userActivities);
      } catch (error) {
        console.error('Error loading recent activity:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecentActivity();
  }, [user]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
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
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-gray-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No recent activity</p>
            <p className="text-sm text-gray-500 mt-2">
              Start using our services to see your activity here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const IconComponent = iconMap[activity.icon as keyof typeof iconMap] || Clock;
              return (
                <div key={activity.id} className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <IconComponent className={`h-5 w-5 ${activity.color}`} />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
