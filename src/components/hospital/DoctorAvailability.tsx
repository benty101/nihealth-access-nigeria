
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Plus, Calendar, User } from 'lucide-react';
import { hospitalManagementService, type DoctorAvailability, type HospitalDoctor } from '@/services/HospitalManagementService';
import { useToast } from '@/hooks/use-toast';

interface DoctorAvailabilityProps {
  hospitalId: string;
}

const DoctorAvailability = ({ hospitalId }: DoctorAvailabilityProps) => {
  const [availability, setAvailability] = useState<DoctorAvailability[]>([]);
  const [hospitalDoctors, setHospitalDoctors] = useState<HospitalDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // New availability form state
  const [newAvailability, setNewAvailability] = useState({
    doctor_id: '',
    day_of_week: 1,
    start_time: '',
    end_time: '',
    max_patients_per_slot: 1,
    slot_duration_minutes: 30,
    break_start_time: '',
    break_end_time: ''
  });

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    loadData();
  }, [hospitalId]);

  const loadData = async () => {
    try {
      const [availabilityData, doctorsData] = await Promise.all([
        hospitalManagementService.getDoctorAvailability(undefined, hospitalId),
        hospitalManagementService.getHospitalDoctors(hospitalId)
      ]);
      
      setAvailability(availabilityData);
      setHospitalDoctors(doctorsData);
    } catch (error) {
      console.error('Error loading availability data:', error);
      toast({
        title: "Error",
        description: "Failed to load availability data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSetAvailability = async () => {
    if (!newAvailability.doctor_id || !newAvailability.start_time || !newAvailability.end_time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await hospitalManagementService.setDoctorAvailability({
        ...newAvailability,
        hospital_id: hospitalId,
        is_available: true
      });

      toast({
        title: "Success",
        description: "Doctor availability set successfully",
      });

      setNewAvailability({
        doctor_id: '',
        day_of_week: 1,
        start_time: '',
        end_time: '',
        max_patients_per_slot: 1,
        slot_duration_minutes: 30,
        break_start_time: '',
        break_end_time: ''
      });
      setIsDialogOpen(false);
      loadData();
    } catch (error) {
      console.error('Error setting availability:', error);
      toast({
        title: "Error",
        description: "Failed to set doctor availability",
        variant: "destructive",
      });
    }
  };

  const handleToggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      await hospitalManagementService.updateDoctorAvailability(id, {
        is_available: !currentStatus
      });

      toast({
        title: "Success",
        description: `Availability ${!currentStatus ? 'enabled' : 'disabled'}`,
      });

      loadData();
    } catch (error) {
      console.error('Error updating availability:', error);
      toast({
        title: "Error",
        description: "Failed to update availability",
        variant: "destructive",
      });
    }
  };

  // Group availability by doctor
  const groupedAvailability = availability.reduce((acc, item) => {
    const doctorId = item.doctor_id;
    if (!acc[doctorId]) {
      acc[doctorId] = [];
    }
    acc[doctorId].push(item);
    return acc;
  }, {} as Record<string, DoctorAvailability[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Doctor Availability</h2>
          <p className="text-gray-600">Manage doctor schedules and consultation slots</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Set Availability
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Set Doctor Availability</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <Select value={newAvailability.doctor_id} onValueChange={(value) => setNewAvailability({ ...newAvailability, doctor_id: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Doctor" />
                </SelectTrigger>
                <SelectContent>
                  {hospitalDoctors.map((doctor) => (
                    <SelectItem key={doctor.doctor_id} value={doctor.doctor_id}>
                      {doctor.telemedicine_providers?.name} - {doctor.telemedicine_providers?.specialization}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={newAvailability.day_of_week.toString()} onValueChange={(value) => setNewAvailability({ ...newAvailability, day_of_week: Number(value) })}>
                <SelectTrigger>
                  <SelectValue placeholder="Day of Week" />
                </SelectTrigger>
                <SelectContent>
                  {dayNames.map((day, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="time"
                placeholder="Start Time"
                value={newAvailability.start_time}
                onChange={(e) => setNewAvailability({ ...newAvailability, start_time: e.target.value })}
              />
              <Input
                type="time"
                placeholder="End Time"
                value={newAvailability.end_time}
                onChange={(e) => setNewAvailability({ ...newAvailability, end_time: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Max Patients per Slot"
                value={newAvailability.max_patients_per_slot}
                onChange={(e) => setNewAvailability({ ...newAvailability, max_patients_per_slot: Number(e.target.value) })}
              />
              <Input
                type="number"
                placeholder="Slot Duration (minutes)"
                value={newAvailability.slot_duration_minutes}
                onChange={(e) => setNewAvailability({ ...newAvailability, slot_duration_minutes: Number(e.target.value) })}
              />
              <Input
                type="time"
                placeholder="Break Start Time (optional)"
                value={newAvailability.break_start_time}
                onChange={(e) => setNewAvailability({ ...newAvailability, break_start_time: e.target.value })}
              />
              <Input
                type="time"
                placeholder="Break End Time (optional)"
                value={newAvailability.break_end_time}
                onChange={(e) => setNewAvailability({ ...newAvailability, break_end_time: e.target.value })}
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSetAvailability} className="bg-teal-600 hover:bg-teal-700">
                Set Availability
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Availability by Doctor */}
      <div className="space-y-6">
        {Object.keys(groupedAvailability).length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No availability set</h3>
            <p className="text-gray-600">Set doctor availability to start scheduling consultations</p>
          </div>
        ) : (
          Object.entries(groupedAvailability).map(([doctorId, doctorAvailability]) => {
            const doctor = hospitalDoctors.find(hd => hd.doctor_id === doctorId);
            return (
              <Card key={doctorId}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {doctor?.telemedicine_providers?.name || 'Unknown Doctor'}
                    <Badge variant="outline">{doctor?.telemedicine_providers?.specialization}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctorAvailability.map((slot) => (
                      <Card key={slot.id} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{dayNames[slot.day_of_week]}</h4>
                          <Badge className={slot.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {slot.is_available ? 'Available' : 'Unavailable'}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm">
                          <p><strong>Time:</strong> {slot.start_time} - {slot.end_time}</p>
                          <p><strong>Slot Duration:</strong> {slot.slot_duration_minutes} minutes</p>
                          <p><strong>Max Patients:</strong> {slot.max_patients_per_slot}</p>
                          {slot.break_start_time && slot.break_end_time && (
                            <p><strong>Break:</strong> {slot.break_start_time} - {slot.break_end_time}</p>
                          )}
                        </div>
                        <div className="mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleAvailability(slot.id, slot.is_available)}
                            className={slot.is_available ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                          >
                            {slot.is_available ? 'Disable' : 'Enable'}
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DoctorAvailability;
