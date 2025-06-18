
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { AppointmentService, BookAppointmentData } from '@/services/AppointmentService';
import { hospitalManagementService } from '@/services/HospitalManagementService';
import { useToast } from '@/hooks/use-toast';

interface HospitalBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  hospitalId: string;
  hospitalName: string;
}

interface HospitalDoctor {
  id: string;
  name: string;
  specialization: string;
  consultation_fee: number;
  department?: string;
}

interface DoctorAvailability {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_duration_minutes: number;
}

const HospitalBookingModal = ({ isOpen, onClose, onSuccess, hospitalId, hospitalName }: HospitalBookingModalProps) => {
  const { toast } = useToast();
  const [doctors, setDoctors] = useState<HospitalDoctor[]>([]);
  const [availability, setAvailability] = useState<DoctorAvailability[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  
  const [formData, setFormData] = useState({
    consultation_type: 'in_person',
    chief_complaint: '',
    consultation_notes: ''
  });

  useEffect(() => {
    if (isOpen) {
      loadHospitalDoctors();
    }
  }, [isOpen, hospitalId]);

  useEffect(() => {
    if (selectedDoctor) {
      loadDoctorAvailability();
    }
  }, [selectedDoctor]);

  const loadHospitalDoctors = async () => {
    try {
      const hospitalDoctors = await hospitalManagementService.getHospitalDoctors(hospitalId);
      const doctorsList = hospitalDoctors.map(hd => ({
        id: hd.doctor_id,
        name: hd.telemedicine_providers?.name || 'Unknown Doctor',
        specialization: hd.telemedicine_providers?.specialization || 'General Practice',
        consultation_fee: hd.telemedicine_providers?.consultation_fee || 5000,
        department: hd.department
      }));
      setDoctors(doctorsList);
    } catch (error) {
      console.error('Error loading hospital doctors:', error);
      toast({
        title: "Error",
        description: "Failed to load doctors",
        variant: "destructive"
      });
    }
  };

  const loadDoctorAvailability = async () => {
    try {
      const doctorAvailability = await hospitalManagementService.getDoctorAvailability(selectedDoctor, hospitalId);
      setAvailability(doctorAvailability);
    } catch (error) {
      console.error('Error loading doctor availability:', error);
    }
  };

  const generateTimeSlots = () => {
    if (!selectedDate || !selectedDoctor || availability.length === 0) return [];
    
    const dayOfWeek = selectedDate.getDay();
    const dayAvailability = availability.find(a => a.day_of_week === dayOfWeek);
    
    if (!dayAvailability) return [];

    const slots = [];
    const startTime = new Date(`1970-01-01T${dayAvailability.start_time}`);
    const endTime = new Date(`1970-01-01T${dayAvailability.end_time}`);
    const slotDuration = dayAvailability.slot_duration_minutes || 30;

    let currentTime = new Date(startTime);
    while (currentTime < endTime) {
      const timeString = currentTime.toTimeString().slice(0, 5);
      slots.push(timeString);
      currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
    }

    return slots;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!selectedDate || !selectedTime || !selectedDoctor) {
        throw new Error('Please select doctor, date and time for the appointment');
      }

      const appointmentDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      appointmentDateTime.setHours(parseInt(hours), parseInt(minutes));

      const appointmentData: BookAppointmentData = {
        doctor_id: selectedDoctor,
        hospital_id: hospitalId,
        scheduled_at: appointmentDateTime.toISOString(),
        consultation_type: formData.consultation_type,
        chief_complaint: formData.chief_complaint || undefined,
        consultation_notes: formData.consultation_notes || undefined
      };

      await AppointmentService.bookAppointment(appointmentData);
      
      toast({
        title: "Success",
        description: `Appointment booked at ${hospitalName}!`
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
      consultation_type: 'in_person',
      chief_complaint: '',
      consultation_notes: ''
    });
    setSelectedDate(undefined);
    setSelectedTime('');
    setSelectedDoctor('');
    setAvailability([]);
  };

  const timeSlots = generateTimeSlots();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Appointment at {hospitalName}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="doctor">Select Doctor</Label>
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    <div>
                      <div className="font-medium">Dr. {doctor.name}</div>
                      <div className="text-sm text-gray-600">
                        {doctor.specialization} {doctor.department && `• ${doctor.department}`}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="consultation_type">Consultation Type</Label>
            <Select value={formData.consultation_type} onValueChange={(value) => setFormData({...formData, consultation_type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select consultation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in_person">In-Person Visit</SelectItem>
                <SelectItem value="video">Video Consultation</SelectItem>
                <SelectItem value="voice">Voice Consultation</SelectItem>
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
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setSelectedTime(''); // Reset time when date changes
                  }}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {selectedDoctor && selectedDate && (
            <div className="space-y-2">
              <Label htmlFor="time">Available Time Slots</Label>
              {timeSlots.length === 0 ? (
                <div className="p-3 bg-gray-50 rounded-md text-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mx-auto mb-1" />
                  No available slots for this date
                </div>
              ) : (
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
              )}
            </div>
          )}

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
            <Button 
              type="submit" 
              disabled={loading || !selectedDoctor || !selectedDate || !selectedTime} 
              className="flex-1"
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HospitalBookingModal;
