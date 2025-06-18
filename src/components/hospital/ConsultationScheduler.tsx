
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Plus, Search, Video, Phone, MessageCircle, Clock } from 'lucide-react';
import { hospitalManagementService, type Consultation, type HospitalDoctor } from '@/services/HospitalManagementService';
import { useToast } from '@/hooks/use-toast';

interface ConsultationSchedulerProps {
  hospitalId: string;
  onStatsUpdate: () => void;
}

const ConsultationScheduler = ({ hospitalId, onStatsUpdate }: ConsultationSchedulerProps) => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [hospitalDoctors, setHospitalDoctors] = useState<HospitalDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // New consultation form state
  const [newConsultation, setNewConsultation] = useState({
    patient_id: '',
    doctor_id: '',
    consultation_type: 'video',
    scheduled_at: '',
    consultation_fee: 0,
    chief_complaint: '',
    symptoms: ''
  });

  useEffect(() => {
    loadData();
  }, [hospitalId]);

  const loadData = async () => {
    try {
      const [consultationsData, doctorsData] = await Promise.all([
        hospitalManagementService.getConsultations(hospitalId),
        hospitalManagementService.getHospitalDoctors(hospitalId)
      ]);
      
      setConsultations(consultationsData);
      setHospitalDoctors(doctorsData);
    } catch (error) {
      console.error('Error loading consultation data:', error);
      toast({
        title: "Error",
        description: "Failed to load consultation data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleConsultation = async () => {
    if (!newConsultation.patient_id || !newConsultation.doctor_id || !newConsultation.scheduled_at) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await hospitalManagementService.scheduleConsultation({
        ...newConsultation,
        hospital_id: hospitalId,
        status: 'scheduled',
        payment_status: 'pending',
        follow_up_required: false
      });

      toast({
        title: "Success",
        description: "Consultation scheduled successfully",
      });

      setNewConsultation({
        patient_id: '',
        doctor_id: '',
        consultation_type: 'video',
        scheduled_at: '',
        consultation_fee: 0,
        chief_complaint: '',
        symptoms: ''
      });
      setIsDialogOpen(false);
      loadData();
      onStatsUpdate();
    } catch (error) {
      console.error('Error scheduling consultation:', error);
      toast({
        title: "Error",
        description: "Failed to schedule consultation",
        variant: "destructive",
      });
    }
  };

  const handleStartConsultation = async (id: string) => {
    try {
      await hospitalManagementService.startConsultation(id);
      toast({
        title: "Success",
        description: "Consultation started",
      });
      loadData();
    } catch (error) {
      console.error('Error starting consultation:', error);
      toast({
        title: "Error",
        description: "Failed to start consultation",
        variant: "destructive",
      });
    }
  };

  const handleEndConsultation = async (id: string) => {
    try {
      await hospitalManagementService.endConsultation(id, "Consultation completed", "Follow treatment plan", "Take medications as prescribed");
      toast({
        title: "Success",
        description: "Consultation completed",
      });
      loadData();
    } catch (error) {
      console.error('Error ending consultation:', error);
      toast({
        title: "Error",
        description: "Failed to end consultation",
        variant: "destructive",
      });
    }
  };

  const filteredConsultations = consultations.filter(consultation =>
    consultation.consultation_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.telemedicine_providers?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.chief_complaint?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConsultationIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'voice':
        return <Phone className="h-4 w-4" />;
      case 'chat':
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <Video className="h-4 w-4" />;
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
      {/* Header with Schedule Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Consultations</h2>
          <p className="text-gray-600">Manage telemedicine consultations and appointments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Consultation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Consultation</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Patient ID"
                value={newConsultation.patient_id}
                onChange={(e) => setNewConsultation({ ...newConsultation, patient_id: e.target.value })}
              />
              <Select value={newConsultation.doctor_id} onValueChange={(value) => setNewConsultation({ ...newConsultation, doctor_id: value })}>
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
              <Select value={newConsultation.consultation_type} onValueChange={(value) => setNewConsultation({ ...newConsultation, consultation_type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Consultation Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video Call</SelectItem>
                  <SelectItem value="voice">Voice Call</SelectItem>
                  <SelectItem value="chat">Chat</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="datetime-local"
                value={newConsultation.scheduled_at}
                onChange={(e) => setNewConsultation({ ...newConsultation, scheduled_at: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Consultation Fee"
                value={newConsultation.consultation_fee}
                onChange={(e) => setNewConsultation({ ...newConsultation, consultation_fee: Number(e.target.value) })}
              />
              <div></div>
              <div className="col-span-2">
                <Textarea
                  placeholder="Chief Complaint"
                  value={newConsultation.chief_complaint}
                  onChange={(e) => setNewConsultation({ ...newConsultation, chief_complaint: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Textarea
                  placeholder="Symptoms"
                  value={newConsultation.symptoms}
                  onChange={(e) => setNewConsultation({ ...newConsultation, symptoms: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleScheduleConsultation} className="bg-teal-600 hover:bg-teal-700">
                Schedule Consultation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search consultations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Consultations List */}
      <div className="space-y-4">
        {filteredConsultations.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No consultations found</h3>
            <p className="text-gray-600">Schedule consultations to get started</p>
          </div>
        ) : (
          filteredConsultations.map((consultation) => (
            <Card key={consultation.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-100 p-2 rounded-full">
                    {getConsultationIcon(consultation.consultation_type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">#{consultation.consultation_number}</h3>
                      <Badge className={getStatusColor(consultation.status)}>
                        {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                      </Badge>
                      <Badge variant="outline">
                        {consultation.consultation_type.charAt(0).toUpperCase() + consultation.consultation_type.slice(1)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Doctor:</strong> {consultation.telemedicine_providers?.name}</p>
                        <p><strong>Specialization:</strong> {consultation.telemedicine_providers?.specialization}</p>
                        <p><strong>Fee:</strong> ₦{consultation.consultation_fee.toLocaleString()}</p>
                      </div>
                      <div>
                        <p><strong>Scheduled:</strong> {new Date(consultation.scheduled_at).toLocaleString()}</p>
                        <p><strong>Chief Complaint:</strong> {consultation.chief_complaint}</p>
                        {consultation.duration_minutes && (
                          <p><strong>Duration:</strong> {consultation.duration_minutes} minutes</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {consultation.status === 'scheduled' && (
                    <Button
                      size="sm"
                      onClick={() => handleStartConsultation(consultation.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Start
                    </Button>
                  )}
                  {consultation.status === 'in_progress' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEndConsultation(consultation.id)}
                    >
                      End
                    </Button>
                  )}
                  <Badge className={consultation.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {consultation.payment_status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ConsultationScheduler;
