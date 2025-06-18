import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Stethoscope, Clock, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AppointmentService, Appointment } from '@/services/AppointmentService';
import { useToast } from '@/hooks/use-toast';
import BookAppointmentModal from './BookAppointmentModal';

export interface AppointmentsRef {
  loadAppointments: () => void;
}

const RealTimeUpcomingAppointments = forwardRef<AppointmentsRef>((props, ref) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const loadAppointments = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const userAppointments = await AppointmentService.getUserAppointments(user.id);
      
      // Filter for upcoming appointments only
      const now = new Date();
      const upcoming = userAppointments.filter(apt => {
        const appointmentDateTime = new Date(apt.scheduled_at);
        return appointmentDateTime > now && apt.status !== 'cancelled';
      });

      console.log('Loaded upcoming appointments:', upcoming);
      setAppointments(upcoming);
    } catch (error) {
      console.error('Error loading appointments:', error);
      toast({
        title: "Error",
        description: "Failed to load appointments",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    loadAppointments
  }));

  useEffect(() => {
    if (user) {
      loadAppointments();
    }
  }, [user]);

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

  const handleBookAppointment = () => {
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = () => {
    // Refresh appointments after successful booking
    loadAppointments();
    toast({
      title: "Success",
      description: "Appointment booked successfully!"
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-600" />
            Upcoming Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Upcoming Appointments
            </div>
            <Button onClick={handleBookAppointment} size="sm" className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {appointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No upcoming appointments</p>
              <Button onClick={handleBookAppointment} variant="outline">
                Book Your First Appointment
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.slice(0, 3).map((appointment) => {
                const { date, time } = formatDateTime(appointment.scheduled_at);
                return (
                  <div key={appointment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-blue-50 rounded-lg gap-4">
                    <div className="flex items-start sm:items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Stethoscope className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4 min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 truncate">
                          {appointment.doctor_name || 'General Consultation'}
                        </h4>
                        <p className="text-sm text-gray-600 truncate">
                          {appointment.specialization || appointment.consultation_type} • {appointment.hospital_name || 'Online'}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center mt-1 gap-1">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-600">
                              {date} at {time}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs w-fit">
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full sm:w-auto">
                      View Details
                    </Button>
                  </div>
                );
              })}
              
              {appointments.length > 3 && (
                <Button variant="ghost" className="w-full">
                  View All Appointments ({appointments.length})
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <BookAppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onSuccess={handleBookingSuccess}
      />
    </>
  );
});

RealTimeUpcomingAppointments.displayName = 'RealTimeUpcomingAppointments';

export default RealTimeUpcomingAppointments;
