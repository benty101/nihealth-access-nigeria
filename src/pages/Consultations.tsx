import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface Consultation {
  id: string;
  consultation_number: string;
  scheduled_at: string;
  status: string;
  consultation_type: string;
  chief_complaint?: string;
  symptoms?: string;
  diagnosis?: string;
  treatment_plan?: string;
  consultation_fee: number;
  payment_status?: string;
  doctor_id: string;
  created_at: string;
}

interface TelemedicineProvider {
  id: string;
  name: string;
  specialization?: string;
}

const Consultations = () => {
  const [consultations, setConsultations] = useState<(Consultation & { doctor: TelemedicineProvider })[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadConsultations();
  }, []);

  const loadConsultations = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to view your consultations",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('consultations')
        .select(`
          *,
          doctor:telemedicine_providers(id, name, specialization)
        `)
        .eq('patient_id', user.id)
        .order('scheduled_at', { ascending: false });

      if (error) throw error;
      setConsultations(data || []);
    } catch (error) {
      console.error('Error loading consultations:', error);
      toast({
        title: "Error",
        description: "Failed to load consultations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'in_progress':
        return <Video className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleJoinConsultation = (consultationId: string) => {
    // For prototype, this would link to a video call platform
    toast({
      title: "Consultation Link",
      description: "In a production app, this would open the video consultation"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <ContextualNavbar />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading your consultations...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ContextualNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Consultations</h1>
            <p className="text-muted-foreground">View and manage your telemedicine appointments</p>
          </div>
          <Button onClick={() => window.location.href = '/telemedicine'}>
            Book New Consultation
          </Button>
        </div>

        {consultations.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Consultations Yet</h3>
              <p className="text-muted-foreground mb-4">
                You haven't booked any consultations yet. Start by booking your first consultation.
              </p>
              <Button onClick={() => window.location.href = '/telemedicine'}>
                Book Consultation
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {consultations.map((consultation) => (
              <Card key={consultation.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        {consultation.doctor?.name || 'Doctor'}
                      </CardTitle>
                      <CardDescription>
                        {consultation.doctor?.specialization} • {consultation.consultation_number}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(consultation.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(consultation.status)}
                        {consultation.status.replace('_', ' ').toUpperCase()}
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Appointment Details */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Appointment Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{format(new Date(consultation.scheduled_at), 'MMM dd, yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{format(new Date(consultation.scheduled_at), 'h:mm a')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4 text-muted-foreground" />
                          <span>{consultation.consultation_type} consultation</span>
                        </div>
                      </div>
                    </div>

                    {/* Health Information */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Health Information</h4>
                      <div className="space-y-2 text-sm">
                        {consultation.chief_complaint && (
                          <div>
                            <span className="font-medium">Chief Complaint:</span>
                            <p className="text-muted-foreground">{consultation.chief_complaint}</p>
                          </div>
                        )}
                        {consultation.symptoms && (
                          <div>
                            <span className="font-medium">Symptoms:</span>
                            <p className="text-muted-foreground">{consultation.symptoms}</p>
                          </div>
                        )}
                        {consultation.diagnosis && (
                          <div>
                            <span className="font-medium">Diagnosis:</span>
                            <p className="text-muted-foreground">{consultation.diagnosis}</p>
                          </div>
                        )}
                        {consultation.treatment_plan && (
                          <div>
                            <span className="font-medium">Treatment Plan:</span>
                            <p className="text-muted-foreground">{consultation.treatment_plan}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-6">
                    {consultation.status === 'scheduled' && (
                      <Button 
                        onClick={() => handleJoinConsultation(consultation.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Join Consultation
                      </Button>
                    )}
                    {consultation.status === 'completed' && (
                      <Button variant="outline">
                        View Summary
                      </Button>
                    )}
                    <Button variant="outline">
                      Reschedule
                    </Button>
                    <Button variant="outline">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Consultations;