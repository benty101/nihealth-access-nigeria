
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Calendar, FileText, Shield, Baby, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const HealthDashboard = () => {
  const healthMetrics = [
    { label: 'Pregnancy Week', value: '28', status: 'Third Trimester', color: 'text-pink-600', icon: Baby },
    { label: 'Next Appointment', value: 'Jan 20', status: 'Antenatal Care', color: 'text-blue-600', icon: Calendar },
    { label: 'Weight Gain', value: '+12 kg', status: 'On Track', color: 'text-green-600', icon: Heart },
    { label: 'Health Records', value: '8', status: 'Documents', color: 'text-purple-600', icon: FileText },
  ];

  const upcomingTasks = [
    { task: 'Antenatal appointment at LUTH', date: 'Tomorrow, 10:00 AM', priority: 'high' },
    { task: 'Take prenatal vitamins', date: 'Daily reminder', priority: 'medium' },
    { task: 'Upload glucose test results', date: 'Due in 2 days', priority: 'medium' },
    { task: 'Prepare hospital bag checklist', date: 'Due in 1 week', priority: 'low' },
  ];

  const quickActions = [
    {
      title: 'Book Antenatal Care',
      description: 'Schedule your next checkup',
      color: 'bg-pink-50 hover:bg-pink-100',
      textColor: 'text-pink-900',
      subtextColor: 'text-pink-600',
      icon: Calendar
    },
    {
      title: 'Find Hospitals',
      description: 'Explore maternal-friendly facilities',
      color: 'bg-blue-50 hover:bg-blue-100',
      textColor: 'text-blue-900',
      subtextColor: 'text-blue-600',
      icon: Heart
    },
    {
      title: 'Upload Records',
      description: 'Add scan or test results',
      color: 'bg-green-50 hover:bg-green-100',
      textColor: 'text-green-900',
      subtextColor: 'text-green-600',
      icon: FileText
    },
    {
      title: 'Compare Insurance',
      description: 'Find maternity coverage',
      color: 'bg-purple-50 hover:bg-purple-100',
      textColor: 'text-purple-900',
      subtextColor: 'text-purple-600',
      icon: Shield
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Pregnancy Dashboard</h2>
          <p className="text-lg text-gray-600">Track your journey and stay on top of your health</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {healthMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
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
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{task.task}</div>
                      <div className="text-xs text-gray-500">{task.date}</div>
                    </div>
                    <Badge 
                      variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button 
                      key={index} 
                      className={`p-4 ${action.color} rounded-lg text-left transition-colors`}
                    >
                      <div className="flex items-center mb-2">
                        <Icon className={`h-5 w-5 ${action.subtextColor} mr-2`} />
                      </div>
                      <div className={`text-sm font-medium ${action.textColor}`}>{action.title}</div>
                      <div className={`text-xs ${action.subtextColor}`}>{action.description}</div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pregnancy Progress Card */}
        <Card className="mt-8 bg-gradient-to-r from-pink-50 to-blue-50">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pregnancy Progress</h3>
                <p className="text-gray-600">You're in week 28 of your pregnancy journey</p>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-pink-500 to-blue-500 h-3 rounded-full" style={{width: '70%'}}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Week 1</span>
                    <span className="font-medium">Week 28</span>
                    <span>Week 40</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Baby className="h-10 w-10 text-pink-500" />
                </div>
                <p className="text-sm text-gray-600 mt-2">12 weeks to go</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthDashboard;
