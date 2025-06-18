
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { AppointmentService, BookAppointmentData } from '@/services/AppointmentService';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  consultation_fee: number;
}

interface Hospital {
  id: string;
  name: string;
  address: string;
}

const BookAppointmentModal = ({ isOpen, onClose, onSuccess }: BookAppointmentModalProps) => {
  const { toast } = useToast();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  const [formData, setFormData] = useState<Omit<BookAppointmentData, 'scheduled_at'>>({
    doctor_id: '',
    hospital_id: '',
    consultation_type: 'video',
    chief_complaint: '',
    consultation_notes: ''
  });

  useEffect(() => {
    if (isOpen) {
      loadDoctorsAndHospitals();
    }
  }, [isOpen]);

  const loadDoctorsAndHospitals = async () => {
    try {
      const [doctorsResult, hospitalsResult] = await Promise.all([
        supabase
          .from('telemedicine_providers')
          .select('id, name, specialization, consultation_fee')
          .eq('is_active', true),
        supabase
          .from('hospitals')
          .select('id, name, address')
          .eq('is_active', true)
      ]);

      if (doctorsResult.data) setDoctors(doctorsResult.data);
      if (hospitalsResult.data) setHospitals(hospitalsResult.data);
    } catch (error) {
      console.error('Error loading doctors and hospitals:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!selectedDate || !selectedTime) {
        throw new Error('Please select both date and time for the appointment');
      }

      const appointmentDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      appointmentDateTime.setHours(parseInt(hours), parseInt(minutes));

      const appointmentData: BookAppointmentData = {
        doctor_id: formData.doctor_id || undefined,
        hospital_id: formData.hospital_id || undefined,
        scheduled_at: appointmentDateTime.toISOString(),
        consultation_type: formData.consultation_type,
        chief_complaint: formData.chief_complaint || undefined,
        consultation_notes: formData.consultation_notes || undefined
      };

      await AppointmentService.bookAppointment(appointmentData);
      
      toast({
        title: "Success",
        description: "Appointment booked successfully!"
      });

      onSuccess();
      onClose();
      resetForm();
    } catch (error: any) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to book appointment",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      doctor_id: '',
      hospital_id: '',
      consultation_type: 'video',
      chief_complaint: '',
      consultation_notes: ''
    });
    setSelectedDate(undefined);
    setSelectedTime('');
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book New Appointment</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="consultation_type">Consultation Type</Label>
            <Select value={formData.consultation_type} onValueChange={(value) => setFormData({...formData, consultation_type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select consultation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Video Consultation</SelectItem>
                <SelectItem value="voice">Phone Consultation</SelectItem>
                <SelectItem value="chat">Chat Consultation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor_id">Doctor (Optional)</Label>
            <Select value={formData.doctor_id} onValueChange={(value) => setFormData({...formData, doctor_id: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    Dr. {doctor.name} - {doctor.specialization}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hospital_id">Hospital (Optional)</Label>
            <Select value={formData.hospital_id} onValueChange={(value) => setFormData({...formData, hospital_id: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select a hospital" />
              </SelectTrigger>
              <SelectContent>
                {hospitals.map((hospital) => (
                  <SelectItem key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Appointment Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {format(new Date(`1970-01-01T${time}`), 'h:mm a')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chief_complaint">Chief Complaint</Label>
            <Textarea
              id="chief_complaint"
              placeholder="Describe your main concern..."
              value={formData.chief_complaint}
              onChange={(e) => setFormData({...formData, chief_complaint: e.target.value})}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="consultation_notes">Additional Notes</Label>
            <Textarea
              id="consultation_notes"
              placeholder="Any additional information..."
              value={formData.consultation_notes}
              onChange={(e) => setFormData({...formData, consultation_notes: e.target.value})}
              rows={2}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Booking...' : 'Book Appointment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointmentModal;
