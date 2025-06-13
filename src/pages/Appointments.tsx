
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, MapPin, Star } from 'lucide-react';

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const doctors = [
    {
      name: 'Dr. Adebayo Ogundimu',
      specialty: 'Cardiologist',
      location: 'Lagos University Teaching Hospital',
      rating: 4.9,
      experience: '15 years',
      nextAvailable: '10:00 AM',
      image: '/placeholder.svg'
    },
    {
      name: 'Dr. Funmilayo Adeleye',
      specialty: 'Pediatrician',
      location: 'National Hospital Abuja',
      rating: 4.8,
      experience: '12 years',
      nextAvailable: '2:00 PM',
      image: '/placeholder.svg'
    },
    {
      name: 'Dr. Chukwuma Okafor',
      specialty: 'Orthopedic Surgeon',
      location: 'University College Hospital',
      rating: 4.7,
      experience: '18 years',
      nextAvailable: '11:30 AM',
      image: '/placeholder.svg'
    },
  ];

  const upcomingAppointments = [
    {
      doctor: 'Dr. Sarah Ahmed',
      specialty: 'General Practice',
      date: '2024-06-15',
      time: '10:00 AM',
      type: 'Consultation'
    },
    {
      doctor: 'Dr. Michael Okoro',
      specialty: 'Dermatologist',
      date: '2024-06-20',
      time: '3:00 PM',
      type: 'Follow-up'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Book Medical Appointments
            </h1>
            <p className="text-lg text-gray-600">
              Schedule appointments with qualified healthcare providers across Nigeria
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar and Upcoming Appointments */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    Select Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg">
                        <div className="font-medium text-sm">{appointment.doctor}</div>
                        <div className="text-xs text-gray-600">{appointment.specialty}</div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-xs text-blue-600">{appointment.date}</div>
                          <Badge variant="outline">{appointment.time}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Available Doctors */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Doctors</h2>
              <div className="space-y-6">
                {doctors.map((doctor, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-lg">
                              {doctor.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                            <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {doctor.location}
                              </div>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                                {doctor.rating}
                              </div>
                              <div>{doctor.experience} experience</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-2">Next available</div>
                          <div className="flex items-center text-green-600 font-medium">
                            <Clock className="h-4 w-4 mr-1" />
                            {doctor.nextAvailable}
                          </div>
                          <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                            Book Appointment
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
