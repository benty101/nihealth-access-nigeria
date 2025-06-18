
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Calendar,
  Thermometer,
  Weight,
  Ruler
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PatientHealthOverview = () => {
  const [vitalSigns, setVitalSigns] = useState({
    bloodPressure: { systolic: 120, diastolic: 80, status: 'normal' },
    heartRate: { value: 72, status: 'normal' },
    temperature: { value: 36.5, status: 'normal' },
    weight: { value: 70, status: 'normal' },
    height: { value: 175, status: 'normal' }
  });

  const [healthTrends, setHealthTrends] = useState([
    { date: '2024-12-01', bp: 118, hr: 70, weight: 70.2 },
    { date: '2024-12-08', bp: 120, hr: 72, weight: 70.0 },
    { date: '2024-12-15', bp: 122, hr: 74, weight: 69.8 },
    { date: '2024-12-18', bp: 120, hr: 72, weight: 70.0 }
  ]);

  const [healthAlerts, setHealthAlerts] = useState([
    { id: 1, type: 'medication', message: 'Time to take your evening medication', severity: 'medium' },
    { id: 2, type: 'appointment', message: 'Annual checkup due next week', severity: 'low' },
    { id: 3, type: 'lab', message: 'Blood test results available', severity: 'high' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Health Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Health Alerts & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {healthAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getSeverityIcon(alert.severity)}
                  <span className="text-sm">{alert.message}</span>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vital Signs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Blood Pressure</p>
                <p className="text-lg font-semibold">
                  {vitalSigns.bloodPressure.systolic}/{vitalSigns.bloodPressure.diastolic}
                </p>
                <Badge className={getStatusColor(vitalSigns.bloodPressure.status)}>
                  {vitalSigns.bloodPressure.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Heart Rate</p>
                <p className="text-lg font-semibold">{vitalSigns.heartRate.value} bpm</p>
                <Badge className={getStatusColor(vitalSigns.heartRate.status)}>
                  {vitalSigns.heartRate.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Thermometer className="h-8 w-8 text-orange-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="text-lg font-semibold">{vitalSigns.temperature.value}°C</p>
                <Badge className={getStatusColor(vitalSigns.temperature.status)}>
                  {vitalSigns.temperature.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Weight className="h-8 w-8 text-green-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Weight</p>
                <p className="text-lg font-semibold">{vitalSigns.weight.value} kg</p>
                <Badge className={getStatusColor(vitalSigns.weight.status)}>
                  {vitalSigns.weight.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Ruler className="h-8 w-8 text-purple-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Height</p>
                <p className="text-lg font-semibold">{vitalSigns.height.value} cm</p>
                <Badge className={getStatusColor(vitalSigns.height.status)}>
                  {vitalSigns.height.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Health Trends (Last 30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="bp" stroke="#3b82f6" strokeWidth={2} name="Blood Pressure" />
                <Line type="monotone" dataKey="hr" stroke="#ef4444" strokeWidth={2} name="Heart Rate" />
                <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2} name="Weight" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Health Score and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-green-600 mb-2">85/100</div>
              <p className="text-sm text-gray-600">Your overall health is good</p>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Cardiovascular Health</span>
                  <span>90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Metabolic Health</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Mental Health</span>
                  <span>80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Health Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-1">Exercise</h4>
                <p className="text-sm text-blue-700">Consider adding 30 minutes of walking to your daily routine</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-1">Nutrition</h4>
                <p className="text-sm text-green-700">Your diet is well-balanced. Keep up the good work!</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-1">Sleep</h4>
                <p className="text-sm text-yellow-700">Try to maintain consistent sleep schedule for better recovery</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientHealthOverview;
