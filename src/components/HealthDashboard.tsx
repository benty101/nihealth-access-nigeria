
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Monitor, Plus } from 'lucide-react';

const HealthDashboard = () => {
  const healthMetrics = [
    { label: 'Blood Pressure', value: '120/80', status: 'Normal', color: 'text-green-600' },
    { label: 'Heart Rate', value: '72 bpm', status: 'Normal', color: 'text-green-600' },
    { label: 'Weight', value: '70 kg', status: 'Healthy', color: 'text-green-600' },
    { label: 'BMI', value: '22.5', status: 'Normal', color: 'text-green-600' },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Health Dashboard</h2>
          <p className="text-lg text-gray-600">Track your vital health metrics and stay informed</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {healthMetrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">{metric.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                    <div className={`text-sm ${metric.color}`}>{metric.status}</div>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Monitor className="mr-2 h-5 w-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Blood pressure check</span>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Weight measurement</span>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Heart rate monitoring</span>
                  <span className="text-xs text-gray-500">3 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="mr-2 h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-blue-50 rounded-lg text-left hover:bg-blue-100 transition-colors">
                  <div className="text-sm font-medium text-blue-900">Book Appointment</div>
                  <div className="text-xs text-blue-600">Schedule with a doctor</div>
                </button>
                <button className="p-4 bg-green-50 rounded-lg text-left hover:bg-green-100 transition-colors">
                  <div className="text-sm font-medium text-green-900">Order Medicine</div>
                  <div className="text-xs text-green-600">From our pharmacy</div>
                </button>
                <button className="p-4 bg-purple-50 rounded-lg text-left hover:bg-purple-100 transition-colors">
                  <div className="text-sm font-medium text-purple-900">Lab Tests</div>
                  <div className="text-xs text-purple-600">Book lab services</div>
                </button>
                <button className="p-4 bg-orange-50 rounded-lg text-left hover:bg-orange-100 transition-colors">
                  <div className="text-sm font-medium text-orange-900">Insurance</div>
                  <div className="text-xs text-orange-600">Compare plans</div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;
