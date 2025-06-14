
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Pill, TestTube, Calendar } from 'lucide-react';

const RecentActivity = () => {
  const recentActivities = [
    {
      type: 'prescription',
      title: 'Prescription filled',
      description: 'Paracetamol 500mg - PharmAccess Victoria Island',
      time: '2 hours ago',
      icon: Pill,
      color: 'text-green-600'
    },
    {
      type: 'test',
      title: 'Lab results ready',
      description: 'Complete Blood Count - Pathcare Laboratory',
      time: '1 day ago',
      icon: TestTube,
      color: 'text-orange-600'
    },
    {
      type: 'appointment',
      title: 'Appointment confirmed',
      description: 'Dr. Amina Hassan - Today 2:30 PM',
      time: '2 days ago',
      icon: Calendar,
      color: 'text-blue-600'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-gray-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center`}>
                <activity.icon className={`h-5 w-5 ${activity.color}`} />
              </div>
              <div className="ml-4 flex-1">
                <h4 className="font-medium text-gray-900">{activity.title}</h4>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
