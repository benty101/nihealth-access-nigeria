import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Video, Check, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format, addDays, isSameDay, setHours, setMinutes } from 'date-fns';

interface TelemedicineProvider {
  id: string;
  name: string;
  specialization?: string;
  consultation_fee?: number;
  experience_years?: number;
  rating?: number;
  languages?: string[];
  available_hours?: any;
}

interface BookingStep {
  step: 'select-doctor' | 'select-time' | 'booking-details' | 'confirmation';
  selectedDoctor: TelemedicineProvider | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  symptoms: string;
  chiefComplaint: string;
}

const ConsultationBooking = () => {
  const [providers, setProviders] = useState<TelemedicineProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<BookingStep>({
    step: 'select-doctor',
    selectedDoctor: null,
    selectedDate: null,
    selectedTime: null,
    symptoms: '',
    chiefComplaint: ''
  });
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      const { data, error } = await supabase
        .from('telemedicine_providers')
        .select('*')
        .eq('is_active', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      setProviders(data || []);
    } catch (error) {
      console.error('Error loading providers:', error);
      toast({
        title: "Error",
        description: "Failed to load available doctors",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateTimeSlots = (date: Date) => {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    
    return slots;
  };

  const handleDoctorSelect = (doctor: TelemedicineProvider) => {
    setBooking(prev => ({
      ...prev,
      selectedDoctor: doctor,
      step: 'select-time'
    }));
  };

  const handleDateSelect = (date: Date) => {
    setBooking(prev => ({
      ...prev,
      selectedDate: date
    }));
    setAvailableSlots(generateTimeSlots(date));
  };

  const handleTimeSelect = (time: string) => {
    setBooking(prev => ({
      ...prev,
      selectedTime: time,
      step: 'booking-details'
    }));
  };

  const handleBookingSubmit = async () => {
    try {
      setSubmitting(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to book a consultation",
          variant: "destructive"
        });
        return;
      }

      const consultationData = {
        patient_id: user.id,
        doctor_id: booking.selectedDoctor!.id,
        scheduled_at: new Date(`${booking.selectedDate!.toDateString()} ${booking.selectedTime}`).toISOString(),
        consultation_type: 'video',
        consultation_fee: booking.selectedDoctor!.consultation_fee || 0,
        status: 'scheduled',
        payment_status: 'not_required', // For government prototype
        chief_complaint: booking.chiefComplaint,
        symptoms: booking.symptoms,
        consultation_number: `CON-${Date.now()}` // Generate a simple consultation number
      };

      const { error } = await supabase
        .from('consultations')
        .insert(consultationData);

      if (error) throw error;

      setBooking(prev => ({
        ...prev,
        step: 'confirmation'
      }));

      toast({
        title: "Booking Confirmed",
        description: "Your consultation has been scheduled successfully"
      });

    } catch (error) {
      console.error('Error booking consultation:', error);
      toast({
        title: "Booking Failed",
        description: "Failed to book consultation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resetBooking = () => {
    setBooking({
      step: 'select-doctor',
      selectedDoctor: null,
      selectedDate: null,
      selectedTime: null,
      symptoms: '',
      chiefComplaint: ''
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading available doctors...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Step 1: Select Doctor
  if (booking.step === 'select-doctor') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Book Telemedicine Consultation
          </CardTitle>
          <CardDescription>
            Select a healthcare provider for your virtual consultation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <Card key={provider.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleDoctorSelect(provider)}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{provider.specialization}</p>
                      <p className="text-xs text-muted-foreground">{provider.experience_years} years experience</p>
                    </div>
                    <Badge variant="secondary">
                      ★ {provider.rating || 0}/5
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Consultation:</span>
                      <span className="text-muted-foreground">Video Call</span>
                    </div>
                    {provider.languages && provider.languages.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {provider.languages.slice(0, 2).map((language, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button className="w-full">
                    Select Doctor
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Step 2: Select Time
  if (booking.step === 'select-time') {
    const today = new Date();
    const availableDates = Array.from({ length: 14 }, (_, i) => addDays(today, i + 1));

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setBooking(prev => ({ ...prev, step: 'select-doctor' }))}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Select Date & Time
              </CardTitle>
              <CardDescription>
                Booking with Dr. {booking.selectedDoctor?.name}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Date Selection */}
            <div>
              <Label className="text-base font-medium mb-4 block">Available Dates</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableDates.map((date, index) => (
                  <Button
                    key={index}
                    variant={booking.selectedDate && isSameDay(date, booking.selectedDate) ? "default" : "outline"}
                    className="h-auto p-3 flex flex-col items-center"
                    onClick={() => handleDateSelect(date)}
                  >
                    <span className="text-xs text-muted-foreground">
                      {format(date, 'EEE')}
                    </span>
                    <span className="text-sm font-medium">
                      {format(date, 'MMM dd')}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {booking.selectedDate && (
              <div>
                <Label className="text-base font-medium mb-4 block">Available Times</Label>
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={booking.selectedTime === slot ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTimeSelect(slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Step 3: Booking Details
  if (booking.step === 'booking-details') {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setBooking(prev => ({ ...prev, step: 'select-time' }))}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle>Consultation Details</CardTitle>
              <CardDescription>
                Please provide information about your health concern
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Booking Summary */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Booking Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Doctor:</span>
                <span>{booking.selectedDoctor?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{format(booking.selectedDate!, 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span>{booking.selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Type:</span>
                <span>Video Consultation</span>
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="chief-complaint">Chief Complaint *</Label>
              <Textarea
                id="chief-complaint"
                placeholder="What is the main reason for your visit? (e.g., headache, fever, check-up)"
                value={booking.chiefComplaint}
                onChange={(e) => setBooking(prev => ({ ...prev, chiefComplaint: e.target.value }))}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="symptoms">Symptoms & Additional Information</Label>
              <Textarea
                id="symptoms"
                placeholder="Describe your symptoms, when they started, and any other relevant information"
                value={booking.symptoms}
                onChange={(e) => setBooking(prev => ({ ...prev, symptoms: e.target.value }))}
                className="mt-1"
                rows={4}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setBooking(prev => ({ ...prev, step: 'select-time' }))}
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              onClick={handleBookingSubmit}
              disabled={!booking.chiefComplaint.trim() || submitting}
              className="flex-1"
            >
              {submitting ? 'Booking...' : 'Confirm Booking'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Step 4: Confirmation
  if (booking.step === 'confirmation') {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Consultation Booked!</h2>
            <p className="text-muted-foreground">
              Your consultation has been scheduled successfully
            </p>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg mb-6 text-left max-w-md mx-auto">
            <h3 className="font-medium mb-3">Consultation Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Doctor:</span>
                <span>{booking.selectedDoctor?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{format(booking.selectedDate!, 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span>{booking.selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <Badge variant="secondary">Scheduled</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              You will receive a consultation link before your appointment time.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => window.location.href = '/consultations'}>
                View My Consultations
              </Button>
              <Button onClick={resetBooking}>
                Book Another Consultation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default ConsultationBooking;