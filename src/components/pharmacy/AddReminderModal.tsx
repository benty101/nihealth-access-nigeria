
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { medicationReminderService } from '@/services/MedicationReminderService';
import { medicationService } from '@/services/MedicationService';
import { useToast } from '@/hooks/use-toast';

interface AddReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddReminderModal = ({ isOpen, onClose, onSuccess }: AddReminderModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [medications, setMedications] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    medication_id: '',
    medication_name: '',
    dosage: '',
    frequency: '',
    time_of_day: [] as string[],
    start_date: '',
    end_date: '',
    notes: ''
  });

  useEffect(() => {
    if (isOpen) {
      loadMedications();
    }
  }, [isOpen]);

  const loadMedications = async () => {
    try {
      const data = await medicationService.getActiveMedications();
      setMedications(data);
    } catch (error) {
      console.error('Error loading medications:', error);
    }
  };

  const handleMedicationSelect = (medicationId: string) => {
    const medication = medications.find(m => m.id === medicationId);
    if (medication) {
      setFormData(prev => ({
        ...prev,
        medication_id: medicationId,
        medication_name: medication.name,
        dosage: medication.dosage || ''
      }));
    }
  };

  const handleFrequencyChange = (frequency: string) => {
    setFormData(prev => ({ ...prev, frequency }));
    
    // Set default times based on frequency
    let defaultTimes: string[] = [];
    switch (frequency) {
      case 'once_daily':
        defaultTimes = ['08:00'];
        break;
      case 'twice_daily':
        defaultTimes = ['08:00', '20:00'];
        break;
      case 'three_times_daily':
        defaultTimes = ['08:00', '14:00', '20:00'];
        break;
      case 'four_times_daily':
        defaultTimes = ['08:00', '12:00', '16:00', '20:00'];
        break;
    }
    setFormData(prev => ({ ...prev, time_of_day: defaultTimes }));
  };

  const handleTimeChange = (index: number, time: string) => {
    const newTimes = [...formData.time_of_day];
    newTimes[index] = time;
    setFormData(prev => ({ ...prev, time_of_day: newTimes }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await medicationReminderService.createReminder({
        medication_id: formData.medication_id || undefined,
        medication_name: formData.medication_name,
        dosage: formData.dosage,
        frequency: formData.frequency,
        time_of_day: formData.time_of_day.length > 0 ? formData.time_of_day : undefined,
        start_date: formData.start_date,
        end_date: formData.end_date || undefined,
        notes: formData.notes || undefined
      });

      toast({
        title: "Success",
        description: "Reminder created successfully",
      });

      onSuccess();
      setFormData({
        medication_id: '',
        medication_name: '',
        dosage: '',
        frequency: '',
        time_of_day: [],
        start_date: '',
        end_date: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error creating reminder:', error);
      toast({
        title: "Error",
        description: "Failed to create reminder",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Medication Reminder</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Select Medication (Optional)</Label>
            <Select onValueChange={handleMedicationSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose from your medications" />
              </SelectTrigger>
              <SelectContent>
                {medications.map((med) => (
                  <SelectItem key={med.id} value={med.id}>
                    {med.name} - {med.brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="medication_name">Medication Name *</Label>
            <Input
              id="medication_name"
              value={formData.medication_name}
              onChange={(e) => setFormData(prev => ({ ...prev, medication_name: e.target.value }))}
              placeholder="Enter medication name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dosage">Dosage *</Label>
            <Input
              id="dosage"
              value={formData.dosage}
              onChange={(e) => setFormData(prev => ({ ...prev, dosage: e.target.value }))}
              placeholder="e.g., 500mg, 1 tablet"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Frequency *</Label>
            <Select onValueChange={handleFrequencyChange} required>
              <SelectTrigger>
                <SelectValue placeholder="How often?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="once_daily">Once Daily</SelectItem>
                <SelectItem value="twice_daily">Twice Daily</SelectItem>
                <SelectItem value="three_times_daily">Three Times Daily</SelectItem>
                <SelectItem value="four_times_daily">Four Times Daily</SelectItem>
                <SelectItem value="as_needed">As Needed</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.time_of_day.length > 0 && (
            <div className="space-y-2">
              <Label>Times</Label>
              {formData.time_of_day.map((time, index) => (
                <Input
                  key={index}
                  type="time"
                  value={time}
                  onChange={(e) => handleTimeChange(index, e.target.value)}
                />
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date *</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any special instructions..."
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700">
              {loading ? 'Creating...' : 'Create Reminder'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReminderModal;
