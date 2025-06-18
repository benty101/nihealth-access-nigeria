
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, MapPin, Star, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AppointmentService, Appointment } from '@/services/AppointmentService';
import { telemedicineService, TelemedicineProvider } from '@/services/TelemedicineService';
import { adminService } from '@/services/AdminService';
import { useToast } from '@/hooks/use-toast';
import BookAppointmentModal from '@/components/dashboard/BookAppointmentModal';

const Appointments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [doctors, setDoctors] = useState<TelemedicineProvider[]>([]);
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    loadPageData();
  }, [user]);

  const loadPageData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Load doctors, hospitals, and appointments concurrently
      const [doctorsData, hospitalsData, appointmentsData] = await Promise.all([
        telemedicineService.getAllTelemedicineProviders(),
        adminService.getAllHospitals(),
        AppointmentService.getUserAppointments(user.id)
      ]);

      setDoctors(doctorsData.slice(0, 6)); // Show first 6 doctors
      setHospitals(hospitalsData);
      
      // Filter for upcoming appointments only
      const now = new Date();
      const upcoming = appointmentsData.filter(apt => {
        const appointmentDateTime = new Date(apt.scheduled_at);
        return appointmentDateTime > now && apt.status !== 'cancelled';
      });
      
      setUpcomingAppointments(upcoming.slice(0, 3)); // Show first 3 upcoming
    } catch (error) {
      console.error('Error loading page data:', error);
      toast({
        title: "Error",
        description: "Failed to load appointment data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (doctorId?: string) => {
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = () => {
    loadPageData(); // Reload data after successful booking
    toast({
      title: "Success",
      description: "Appointment booked successfully!"
    });
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
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
                    <CardTitle className="flex items-center justify-between">
                      Upcoming Appointments
                      <Button onClick={() => handleBookAppointment()} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Book New
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingAppointments.length === 0 ? (
                        <div className="text-center py-4">
                          <CalendarIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 text-sm">No upcoming appointments</p>
                          <Button 
                            onClick={() => handleBookAppointment()} 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                          >
                            Book Your First Appointment
                          </Button>
                        </div>
                      ) : (
                        upcomingAppointments.map((appointment) => {
                          const { date, time } = formatDateTime(appointment.scheduled_at);
                          return (
                            <div key={appointment.id} className="p-3 bg-blue-50 rounded-lg">
                              <div className="font-medium text-sm">
                                {appointment.doctor_name || 'General Consultation'}
                              </div>
                              <div className="text-xs text-gray-600">
                                {appointment.specialization || appointment.consultation_type}
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <div className="text-xs text-blue-600">{date}</div>
                                <Badge variant="outline">{time}</Badge>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Available Doctors */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Doctors</h2>
                {doctors.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center py-8">
                        <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No doctors available</h3>
                        <p className="text-gray-600">Please check back later for available healthcare providers</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {doctors.map((doctor) => (
                      <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-lg">
                                  {doctor.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">Dr. {doctor.name}</h3>
                                <p className="text-blue-600 font-medium">{doctor.specialization || 'General Practice'}</p>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    Telemedicine
                                  </div>
                                  {doctor.rating && (
                                    <div className="flex items-center">
                                      <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                                      {doctor.rating}
                                    </div>
                                  )}
                                  {doctor.experience_years && (
                                    <div>{doctor.experience_years} years experience</div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-sm text-gray-600 mb-2">Consultation Fee</div>
                              <div className="flex items-center text-green-600 font-medium">
                                ₦{doctor.consultation_fee?.toLocaleString() || '5,000'}
                              </div>
                              <Button 
                                className="mt-4 bg-blue-600 hover:bg-blue-700"
                                onClick={() => handleBookAppointment(doctor.id)}
                              >
                                Book Appointment
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookAppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onSuccess={handleBookingSuccess}
      />
    </>
  );
};

export default Appointments;
