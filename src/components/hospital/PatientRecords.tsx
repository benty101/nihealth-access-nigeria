
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Plus, Search, User } from 'lucide-react';
import { hospitalManagementService, type PatientRecord } from '@/services/HospitalManagementService';
import { useToast } from '@/hooks/use-toast';

interface PatientRecordsProps {
  hospitalId: string;
  onStatsUpdate: () => void;
}

const PatientRecords = ({ hospitalId, onStatsUpdate }: PatientRecordsProps) => {
  const [records, setRecords] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<PatientRecord | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // New record form state
  const [newRecord, setNewRecord] = useState({
    patient_id: '',
    department: '',
    chief_complaint: '',
    medical_history: '',
    current_medications: '',
    allergies: '',
    diagnosis: '',
    treatment_plan: '',
    admission_type: 'outpatient',
    room_number: '',
    bed_number: ''
  });

  useEffect(() => {
    loadRecords();
  }, [hospitalId]);

  const loadRecords = async () => {
    try {
      const data = await hospitalManagementService.getPatientRecords(hospitalId);
      setRecords(data);
    } catch (error) {
      console.error('Error loading patient records:', error);
      toast({
        title: "Error",
        description: "Failed to load patient records",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecord = async () => {
    if (!newRecord.patient_id || !newRecord.chief_complaint) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await hospitalManagementService.createPatientRecord({
        ...newRecord,
        hospital_id: hospitalId,
        status: 'active'
      });

      toast({
        title: "Success",
        description: "Patient record created successfully",
      });

      setNewRecord({
        patient_id: '',
        department: '',
        chief_complaint: '',
        medical_history: '',
        current_medications: '',
        allergies: '',
        diagnosis: '',
        treatment_plan: '',
        admission_type: 'outpatient',
        room_number: '',
        bed_number: ''
      });
      setIsDialogOpen(false);
      loadRecords();
      onStatsUpdate();
    } catch (error) {
      console.error('Error creating patient record:', error);
      toast({
        title: "Error",
        description: "Failed to create patient record",
        variant: "destructive",
      });
    }
  };

  const handleUpdateRecord = async (id: string, updates: Partial<PatientRecord>) => {
    try {
      await hospitalManagementService.updatePatientRecord(id, updates);
      toast({
        title: "Success",
        description: "Patient record updated successfully",
      });
      loadRecords();
    } catch (error) {
      console.error('Error updating patient record:', error);
      toast({
        title: "Error",
        description: "Failed to update patient record",
        variant: "destructive",
      });
    }
  };

  const filteredRecords = records.filter(record =>
    record.record_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.chief_complaint?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'discharged':
        return 'bg-blue-100 text-blue-800';
      case 'transferred':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Patient Records</h2>
          <p className="text-gray-600">Manage patient medical records and treatment history</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              New Record
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Patient Record</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Patient ID"
                value={newRecord.patient_id}
                onChange={(e) => setNewRecord({ ...newRecord, patient_id: e.target.value })}
              />
              <Input
                placeholder="Department"
                value={newRecord.department}
                onChange={(e) => setNewRecord({ ...newRecord, department: e.target.value })}
              />
              <div className="col-span-2">
                <Textarea
                  placeholder="Chief Complaint *"
                  value={newRecord.chief_complaint}
                  onChange={(e) => setNewRecord({ ...newRecord, chief_complaint: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Textarea
                  placeholder="Medical History"
                  value={newRecord.medical_history}
                  onChange={(e) => setNewRecord({ ...newRecord, medical_history: e.target.value })}
                />
              </div>
              <Input
                placeholder="Current Medications"
                value={newRecord.current_medications}
                onChange={(e) => setNewRecord({ ...newRecord, current_medications: e.target.value })}
              />
              <Input
                placeholder="Allergies"
                value={newRecord.allergies}
                onChange={(e) => setNewRecord({ ...newRecord, allergies: e.target.value })}
              />
              <Select value={newRecord.admission_type} onValueChange={(value) => setNewRecord({ ...newRecord, admission_type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Admission Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="outpatient">Outpatient</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="planned">Planned</SelectItem>
                </SelectContent>
              </Select>
              <div></div>
              <Input
                placeholder="Room Number"
                value={newRecord.room_number}
                onChange={(e) => setNewRecord({ ...newRecord, room_number: e.target.value })}
              />
              <Input
                placeholder="Bed Number"
                value={newRecord.bed_number}
                onChange={(e) => setNewRecord({ ...newRecord, bed_number: e.target.value })}
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRecord} className="bg-teal-600 hover:bg-teal-700">
                Create Record
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search patient records..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No patient records found</h3>
            <p className="text-gray-600">Create new patient records to get started</p>
          </div>
        ) : (
          filteredRecords.map((record) => (
            <Card key={record.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">Record #{record.record_number}</h3>
                      <Badge className={getStatusColor(record.status)}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Patient:</strong> {record.profiles?.full_name || 'Unknown'}</p>
                        <p><strong>Department:</strong> {record.department || 'Not specified'}</p>
                        <p><strong>Admission Type:</strong> {record.admission_type || 'Not specified'}</p>
                        {record.room_number && <p><strong>Room:</strong> {record.room_number}</p>}
                      </div>
                      <div>
                        <p><strong>Chief Complaint:</strong> {record.chief_complaint}</p>
                        <p><strong>Created:</strong> {new Date(record.created_at).toLocaleDateString()}</p>
                        {record.attending_doctor_id && (
                          <p><strong>Attending Doctor:</strong> {record.telemedicine_providers?.name}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRecord(record)}
                  >
                    View Details
                  </Button>
                  {record.status === 'active' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateRecord(record.id, { status: 'discharged', discharge_date: new Date().toISOString().split('T')[0] })}
                    >
                      Discharge
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Record Details Dialog */}
      {selectedRecord && (
        <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Patient Record Details - #{selectedRecord.record_number}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Patient Information</h4>
                  <p><strong>Name:</strong> {selectedRecord.profiles?.full_name || 'Unknown'}</p>
                  <p><strong>Phone:</strong> {selectedRecord.profiles?.phone_number || 'Not provided'}</p>
                  <p><strong>Department:</strong> {selectedRecord.department || 'Not specified'}</p>
                  <p><strong>Room:</strong> {selectedRecord.room_number || 'Not assigned'}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Medical History</h4>
                  <p className="text-sm">{selectedRecord.medical_history || 'No medical history recorded'}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Current Medications</h4>
                  <p className="text-sm">{selectedRecord.current_medications || 'No current medications'}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Chief Complaint</h4>
                  <p className="text-sm">{selectedRecord.chief_complaint}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Diagnosis</h4>
                  <p className="text-sm">{selectedRecord.diagnosis || 'No diagnosis recorded'}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Treatment Plan</h4>
                  <p className="text-sm">{selectedRecord.treatment_plan || 'No treatment plan recorded'}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Allergies</h4>
                  <p className="text-sm">{selectedRecord.allergies || 'No known allergies'}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PatientRecords;
