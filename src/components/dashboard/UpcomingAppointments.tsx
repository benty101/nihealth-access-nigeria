
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Stethoscope, Clock } from 'lucide-react';

const UpcomingAppointments = () => {
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

  return (
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
  );
};

export default UpcomingAppointments;
