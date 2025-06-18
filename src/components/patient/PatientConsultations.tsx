
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Video, 
  Calendar, 
  Clock, 
  User, 
  Phone,
  MessageCircle,
  FileText,
  Plus
} from 'lucide-react';

const PatientConsultations = () => {
  const [consultations, setConsultations] = useState([
    {
      id: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '2024-12-25',
      time: '10:00 AM',
      type: 'video',
      status: 'scheduled',
      hospital: 'Lagos University Teaching Hospital',
      reason: 'Follow-up consultation'
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Chen',
      specialty: 'General Practitioner',
      date: '2024-12-20',
      time: '2:30 PM',
      type: 'in-person',
      status: 'completed',
      hospital: 'National Hospital Abuja',
      reason: 'Annual checkup',
      notes: 'Patient is in good health. Continue current medication.'
    },
    {
      id: 3,
      doctorName: 'Dr. Amina Hassan',
      specialty: 'Dermatologist',
      date: '2024-12-18',
      time: '11:15 AM',
      type: 'video',
      status: 'completed',
      hospital: 'University College Hospital',
      reason: 'Skin condition follow-up'
    }
  ]);

  const [upcomingConsultations, setUpcomingConsultations] = useState([]);
  const [pastConsultations, setPastConsultations] = useState([]);

  useEffect(() => {
    const today = new Date();
    const upcoming = consultations.filter(consultation => 
      new Date(consultation.date) >= today && consultation.status === 'scheduled'
    );
    const past = consultations.filter(consultation => 
      new Date(consultation.date) < today || consultation.status === 'completed'
    );
    
    setUpcomingConsultations(upcoming);
    setPastConsultations(past);
  }, [consultations]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      case 'in-person': return <User className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const ConsultationCard = ({ consultation, showActions = false }: any) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="bg-teal-100 p-3 rounded-full">
              <User className="h-6 w-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{consultation.doctorName}</h3>
              <p className="text-gray-600 text-sm">{consultation.specialty}</p>
              <p className="text-gray-500 text-sm">{consultation.hospital}</p>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  {consultation.date}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {consultation.time}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  {getTypeIcon(consultation.type)}
                  {consultation.type}
                </div>
              </div>
              
              <p className="text-sm mt-2 font-medium">Reason: {consultation.reason}</p>
              {consultation.notes && (
                <p className="text-sm text-gray-600 mt-1">Notes: {consultation.notes}</p>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <Badge className={getStatusColor(consultation.status)}>
              {consultation.status}
            </Badge>
            
            {showActions && consultation.status === 'scheduled' && (
              <div className="flex gap-2">
                {consultation.type === 'video' && (
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                    <Video className="h-4 w-4 mr-1" />
                    Join
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message
                </Button>
              </div>
            )}
            
            {consultation.status === 'completed' && (
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-1" />
                View Report
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Consultations</h2>
          <p className="text-gray-600">Manage your appointments and medical consultations</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="h-4 w-4 mr-2" />
          Book New Consultation
        </Button>
      </div>

      {/* Consultation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold">{upcomingConsultations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Video className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Total Doctors</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consultation Tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Consultations</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <div className="space-y-4">
            {upcomingConsultations.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No upcoming consultations</h3>
                  <p className="text-gray-600 mb-4">Book your next appointment with a healthcare provider</p>
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    Book Consultation
                  </Button>
                </CardContent>
              </Card>
            ) : (
              upcomingConsultations.map((consultation) => (
                <ConsultationCard 
                  key={consultation.id} 
                  consultation={consultation} 
                  showActions={true}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          <div className="space-y-4">
            {pastConsultations.map((consultation) => (
              <ConsultationCard key={consultation.id} consultation={consultation} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {consultations.map((consultation) => (
              <ConsultationCard 
                key={consultation.id} 
                consultation={consultation}
                showActions={consultation.status === 'scheduled'}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientConsultations;
