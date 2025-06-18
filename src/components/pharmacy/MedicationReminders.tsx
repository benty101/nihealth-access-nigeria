
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, Clock, Pill, Calendar, Edit, Trash2 } from 'lucide-react';
import { medicationReminderService, type MedicationReminder } from '@/services/MedicationReminderService';
import { format } from 'date-fns';
import AddReminderModal from './AddReminderModal';

const MedicationReminders = () => {
  const [reminders, setReminders] = useState<MedicationReminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const data = await medicationReminderService.getUserReminders();
      setReminders(data);
    } catch (error) {
      console.error('Error loading reminders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleReminder = async (id: string, enabled: boolean) => {
    try {
      await medicationReminderService.toggleReminder(id, enabled);
      loadReminders();
    } catch (error) {
      console.error('Error toggling reminder:', error);
    }
  };

  const handleDeleteReminder = async (id: string) => {
    if (confirm('Are you sure you want to delete this reminder?')) {
      try {
        await medicationReminderService.deleteReminder(id);
        loadReminders();
      } catch (error) {
        console.error('Error deleting reminder:', error);
      }
    }
  };

  const getFrequencyBadge = (frequency: string) => {
    const colors = {
      'once_daily': 'bg-green-100 text-green-800',
      'twice_daily': 'bg-blue-100 text-blue-800',
      'three_times_daily': 'bg-purple-100 text-purple-800',
      'four_times_daily': 'bg-orange-100 text-orange-800',
      'as_needed': 'bg-gray-100 text-gray-800',
      'weekly': 'bg-yellow-100 text-yellow-800',
    };
    
    return colors[frequency as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatFrequency = (frequency: string) => {
    return frequency.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Medication Reminders</h2>
          <p className="text-gray-600">Manage your medication schedule</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Reminder
        </Button>
      </div>

      {reminders.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No reminders set</h3>
            <p className="text-gray-600 mb-4">Stay on track with your medications by setting up reminders</p>
            <Button onClick={() => setShowAddModal(true)} className="bg-teal-600 hover:bg-teal-700">
              Add Your First Reminder
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reminders.map((reminder) => (
            <Card key={reminder.id} className={`transition-all ${reminder.reminder_enabled ? 'border-teal-200 bg-teal-50' : 'border-gray-200 bg-gray-50'}`}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{reminder.medication_name}</CardTitle>
                    <p className="text-sm text-gray-600">{reminder.dosage}</p>
                  </div>
                  <Switch
                    checked={reminder.reminder_enabled}
                    onCheckedChange={(enabled) => handleToggleReminder(reminder.id, enabled)}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <Badge className={getFrequencyBadge(reminder.frequency)}>
                    {formatFrequency(reminder.frequency)}
                  </Badge>
                </div>

                {reminder.time_of_day && reminder.time_of_day.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div className="flex flex-wrap gap-1">
                      {reminder.time_of_day.map((time, index) => (
                        <span key={index} className="text-xs bg-white px-2 py-1 rounded border">
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-600">
                  <p><strong>Start:</strong> {format(new Date(reminder.start_date), 'MMM dd, yyyy')}</p>
                  {reminder.end_date && (
                    <p><strong>End:</strong> {format(new Date(reminder.end_date), 'MMM dd, yyyy')}</p>
                  )}
                </div>

                {reminder.notes && (
                  <p className="text-sm text-gray-700 p-2 bg-white rounded border">
                    {reminder.notes}
                  </p>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteReminder(reminder.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddReminderModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={() => {
          setShowAddModal(false);
          loadReminders();
        }}
      />
    </div>
  );
};

export default MedicationReminders;
