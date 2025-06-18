
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, FileText, UserPlus, Activity } from 'lucide-react';
import { hospitalActivityService, type HospitalActivity } from '@/services/HospitalActivityService';

interface HospitalRecentActivityProps {
  hospitalId: string;
}

const HospitalRecentActivity = ({ hospitalId }: HospitalRecentActivityProps) => {
  const [activities, setActivities] = useState<HospitalActivity[]>([]);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    patient_registered: Users,
    appointment_scheduled: Calendar,
    consultation_completed: FileText,
    doctor_added: UserPlus,
    record_updated: Activity
  };

  useEffect(() => {
    if (hospitalId) {
      loadActivities();
    }
  }, [hospitalId]);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const data = await hospitalActivityService.getRecentActivities(hospitalId);
      setActivities(data);
    } catch (error) {
      console.error('Error loading hospital activities:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your hospital</CardDescription>
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
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates from your hospital</CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No recent activity</p>
            <p className="text-sm text-gray-500 mt-2">
              Start managing your hospital to see activity here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const IconComponent = iconMap[activity.type] || Activity;
              const iconColor = hospitalActivityService.getActivityIcon(activity.type);
              
              return (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${iconColor.replace('text-', 'bg-')}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {hospitalActivityService.getTimeAgo(activity.timestamp)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HospitalRecentActivity;
