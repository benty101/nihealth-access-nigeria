
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Calendar, 
  FileText, 
  Shield, 
  Stethoscope, 
  Pill, 
  TestTube, 
  MapPin, 
  Clock, 
  Bell,
  TrendingUp,
  Users,
  Star,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const HealthDashboard = () => {
  const quickActions = [
    {
      icon: Calendar,
      title: 'Book Appointment',
      description: 'Schedule with doctors',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      icon: Pill,
      title: 'Order Medicine',
      description: 'Pharmacy delivery',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      icon: TestTube,
      title: 'Book Lab Test',
      description: 'Diagnostic services',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600'
    },
    {
      icon: Stethoscope,
      title: 'Find Hospital',
      description: 'Nearby facilities',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    }
  ];

  const upcomingAppointments = [
    {
      doctor: 'Dr. Amina Hassan',
      specialty: 'Cardiology',
      date: 'Today, 2:30 PM',
      hospital: 'Lagos University Teaching Hospital',
      type: 'Follow-up'
    },
    {
      doctor: 'Dr. Chidi Okafor',
      specialty: 'General Practice',
      date: 'Tomorrow, 10:00 AM',
      hospital: 'National Hospital Abuja',
      type: 'Consultation'
    }
  ];

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Health Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, Adaeze. Here's your health overview.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Heart className="h-4 w-4 mr-2" />
                Emergency Contacts
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-lg ${action.color} ${action.hoverColor} flex items-center justify-center transition-colors`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Health Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-teal-600" />
                  Health Activity Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {healthStats.map((stat, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon className="h-5 w-5 text-gray-600" />
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          stat.trend === 'up' ? 'bg-green-100 text-green-800' :
                          stat.trend === 'down' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.title}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    Upcoming Appointments
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Stethoscope className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold text-gray-900">{appointment.doctor}</h4>
                          <p className="text-sm text-gray-600">{appointment.specialty} • {appointment.hospital}</p>
                          <div className="flex items-center mt-1">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-600">{appointment.date}</span>
                            <Badge variant="outline" className="ml-2 text-xs">{appointment.type}</Badge>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Health Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-teal-600" />
                  Health Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Insurance Status</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Primary Doctor</span>
                    <span className="text-sm font-medium">Dr. Amina Hassan</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Emergency Contact</span>
                    <span className="text-sm font-medium">John Adebayo</span>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <FileText className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Health Reminders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-orange-600" />
                  Health Reminders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-orange-600 mr-3" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Annual Checkup Due</p>
                      <p className="text-xs text-gray-600">Schedule your yearly health screening</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Pill className="h-5 w-5 text-blue-600 mr-3" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Medication Refill</p>
                      <p className="text-xs text-gray-600">Lisinopril - 3 days remaining</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Medical Records
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Insurance Details
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    Find Hospitals
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Heart className="h-4 w-4 mr-2" />
                    Health Resources
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;
