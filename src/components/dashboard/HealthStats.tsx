
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Calendar, Pill, TestTube, Shield } from 'lucide-react';

const HealthStats = () => {
  const healthStats = [
    {
      title: 'Appointments This Month',
      value: '4',
      change: '+2 from last month',
      trend: 'up',
      icon: Calendar
    },
    {
      title: 'Medications Ordered',
      value: '12',
      change: '+5 from last month',
      trend: 'up',
      icon: Pill
    },
    {
      title: 'Lab Tests Completed',
      value: '3',
      change: 'Same as last month',
      trend: 'stable',
      icon: TestTube
    },
    {
      title: 'Insurance Claims',
      value: '2',
      change: '+1 from last month',
      trend: 'up',
      icon: Shield
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <TrendingUp className="h-5 w-5 mr-2 text-teal-600" />
          Health Activity Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {healthStats.map((stat, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-5 w-5 text-gray-600 flex-shrink-0" />
                <span className={`text-xs px-2 py-1 rounded-full ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-800' :
                  stat.trend === 'down' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthStats;
