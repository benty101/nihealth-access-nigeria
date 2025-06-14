
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, AlertCircle, Pill } from 'lucide-react';

const HealthReminders = () => {
  return (
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
  );
};

export default HealthReminders;
