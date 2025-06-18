
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Pill, 
  Clock, 
  Bell, 
  AlertCircle, 
  CheckCircle, 
  Plus,
  Calendar
} from 'lucide-react';

const PatientMedications = () => {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      times: ['08:00'],
      purpose: 'High blood pressure',
      prescribedBy: 'Dr. Sarah Johnson',
      startDate: '2024-10-01',
      endDate: '2025-01-01',
      status: 'active',
      reminderEnabled: true,
      instructions: 'Take with food in the morning',
      sideEffects: ['Dry cough', 'Dizziness'],
      refillsRemaining: 2
    },
    {
      id: 2,
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      times: ['08:00', '20:00'],
      purpose: 'Type 2 diabetes',
      prescribedBy: 'Dr. Michael Chen',
      startDate: '2024-09-15',
      endDate: '2025-03-15',
      status: 'active',
      reminderEnabled: true,
      instructions: 'Take with meals',
      sideEffects: ['Nausea', 'Stomach upset'],
      refillsRemaining: 1
    },
    {
      id: 3,
      name: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Once daily',
      times: ['09:00'],
      purpose: 'Vitamin D deficiency',
      prescribedBy: 'Dr. Amina Hassan',
      startDate: '2024-11-01',
      endDate: '2025-02-01',
      status: 'active',
      reminderEnabled: false,
      instructions: 'Take with fat-containing meal',
      sideEffects: [],
      refillsRemaining: 3
    }
  ]);

  const [todaySchedule, setTodaySchedule] = useState([
    { time: '08:00', medications: ['Lisinopril 10mg', 'Metformin 500mg'], taken: true },
    { time: '09:00', medications: ['Vitamin D3 1000 IU'], taken: true },
    { time: '20:00', medications: ['Metformin 500mg'], taken: false }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'discontinued': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleReminder = (medicationId: number) => {
    setMedications(medications.map(med => 
      med.id === medicationId 
        ? { ...med, reminderEnabled: !med.reminderEnabled }
        : med
    ));
  };

  const markAsTaken = (timeIndex: number) => {
    const newSchedule = [...todaySchedule];
    newSchedule[timeIndex].taken = !newSchedule[timeIndex].taken;
    setTodaySchedule(newSchedule);
  };

  const MedicationCard = ({ medication }: any) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Pill className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{medication.name}</h3>
              <p className="text-gray-600">{medication.dosage} - {medication.frequency}</p>
              <p className="text-sm text-gray-500 mb-2">For {medication.purpose}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Prescribed by:</strong> {medication.prescribedBy}</p>
                  <p><strong>Duration:</strong> {medication.startDate} to {medication.endDate}</p>
                  <p><strong>Times:</strong> {medication.times.join(', ')}</p>
                </div>
                <div>
                  <p><strong>Instructions:</strong> {medication.instructions}</p>
                  <p><strong>Refills remaining:</strong> {medication.refillsRemaining}</p>
                  {medication.sideEffects.length > 0 && (
                    <p><strong>Side effects:</strong> {medication.sideEffects.join(', ')}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <Badge className={getStatusColor(medication.status)}>
              {medication.status}
            </Badge>
            
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-gray-500" />
              <Switch
                checked={medication.reminderEnabled}
                onCheckedChange={() => toggleReminder(medication.id)}
              />
            </div>
            
            {medication.refillsRemaining <= 1 && (
              <div className="flex items-center gap-1 text-orange-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                Low refills
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Medications</h2>
          <p className="text-gray-600">Track your medications and manage reminders</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Medication
        </Button>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Today's Medication Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todaySchedule.map((schedule, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                schedule.taken ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="text-lg font-semibold">{schedule.time}</div>
                  <div>
                    {schedule.medications.map((med, medIndex) => (
                      <div key={medIndex} className="text-sm text-gray-700">{med}</div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {schedule.taken ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Taken</span>
                    </div>
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => markAsTaken(index)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Mark as Taken
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Medication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Pill className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Active Medications</p>
                <p className="text-2xl font-bold">{medications.filter(m => m.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Doses Today</p>
                <p className="text-2xl font-bold">{todaySchedule.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Adherence Rate</p>
                <p className="text-2xl font-bold">92%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Refills Needed</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medications List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">All Medications</h3>
        <div className="space-y-4">
          {medications.map((medication) => (
            <MedicationCard key={medication.id} medication={medication} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientMedications;
