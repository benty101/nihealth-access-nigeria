import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Video, Phone, Calendar, Clock, User, Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Consultations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const upcomingConsultations = [
    {
      id: '1',
      doctor: 'Dr. Amina Hassan',
      specialty: 'Cardiology',
      date: '2024-01-20',
      time: '2:30 PM',
      type: 'video',
      status: 'confirmed',
      hospital: 'Lagos University Teaching Hospital'
    },
    {
      id: '2',
      doctor: 'Dr. Chidi Okafor',
      specialty: 'General Practice',
      date: '2024-01-22',
      time: '10:00 AM',
      type: 'phone',
      status: 'pending',
      hospital: 'National Hospital Abuja'
    }
  ];

  const pastConsultations = [
    {
      id: '3',
      doctor: 'Dr. Fatima Abubakar',
      specialty: 'Pediatrics',
      date: '2024-01-15',
      time: '3:00 PM',
      type: 'video',
      status: 'completed',
      diagnosis: 'Common Cold',
      prescription: 'Prescribed rest and fluids',
      hospital: 'Ahmadu Bello University Teaching Hospital'
    },
    {
      id: '4',
      doctor: 'Dr. Emeka Nwosu',
      specialty: 'Orthopedics',
      date: '2024-01-10',
      time: '11:30 AM',
      type: 'video',
      status: 'completed',
      diagnosis: 'Mild Sprain',
      prescription: 'Physical therapy recommended',
      hospital: 'University of Nigeria Teaching Hospital'
    }
  ];

  const handleJoinConsultation = (consultationId: string, type: 'video' | 'phone') => {
    toast({
      title: "Joining Consultation",
      description: `Starting ${type} consultation...`,
    });
    // Simulate joining consultation
    setTimeout(() => {
      toast({
        title: "Consultation Started",
        description: "You are now connected with your doctor.",
      });
    }, 2000);
  };

  const handleViewDetails = (consultationId: string) => {
    navigate(`/consultations/${consultationId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'video' ? Video : Phone;
  };

  const filteredUpcoming = upcomingConsultations.filter(consultation =>
    consultation.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPast = pastConsultations.filter(consultation =>
    consultation.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout title="My Consultations" showBreadcrumbs={true}>
      <div className="space-y-6">
        {/* Header with Search and Book Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search consultations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => navigate('/book-appointment')} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Book New Consultation
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Consultations</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {filteredUpcoming.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Consultations</h3>
                  <p className="text-gray-600 text-center mb-4">You don't have any consultations scheduled.</p>
                  <Button onClick={() => navigate('/book-appointment')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Book Your First Consultation
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredUpcoming.map((consultation) => {
                const TypeIcon = getTypeIcon(consultation.type);
                return (
                  <Card key={consultation.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                            <User className="h-6 w-6 text-teal-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900">{consultation.doctor}</h3>
                            <p className="text-sm text-gray-600">{consultation.specialty}</p>
                            <p className="text-sm text-gray-500">{consultation.hospital}</p>
                            <div className="flex items-center mt-2 space-x-4">
                              <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="h-4 w-4 mr-1" />
                                {consultation.date}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="h-4 w-4 mr-1" />
                                {consultation.time}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <TypeIcon className="h-4 w-4 mr-1" />
                                {consultation.type === 'video' ? 'Video Call' : 'Phone Call'}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                          <Badge className={getStatusColor(consultation.status)}>
                            {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                          </Badge>
                          <div className="flex space-x-2 w-full sm:w-auto">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(consultation.id)}
                              className="flex-1 sm:flex-none"
                            >
                              Details
                            </Button>
                            {consultation.status === 'confirmed' && (
                              <Button
                                size="sm"
                                onClick={() => handleJoinConsultation(consultation.id, consultation.type as 'video' | 'phone')}
                                className="flex-1 sm:flex-none"
                              >
                                <TypeIcon className="h-4 w-4 mr-1" />
                                Join
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {filteredPast.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Clock className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Past Consultations</h3>
                  <p className="text-gray-600 text-center">Your consultation history will appear here.</p>
                </CardContent>
              </Card>
            ) : (
              filteredPast.map((consultation) => {
                const TypeIcon = getTypeIcon(consultation.type);
                return (
                  <Card key={consultation.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900">{consultation.doctor}</h3>
                            <p className="text-sm text-gray-600">{consultation.specialty}</p>
                            <p className="text-sm text-gray-500">{consultation.hospital}</p>
                            <div className="flex items-center mt-2 space-x-4">
                              <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="h-4 w-4 mr-1" />
                                {consultation.date}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="h-4 w-4 mr-1" />
                                {consultation.time}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <TypeIcon className="h-4 w-4 mr-1" />
                                {consultation.type === 'video' ? 'Video Call' : 'Phone Call'}
                              </div>
                            </div>
                            {consultation.diagnosis && (
                              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm font-medium text-gray-900">Diagnosis: {consultation.diagnosis}</p>
                                <p className="text-sm text-gray-600">{consultation.prescription}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                          <Badge className={getStatusColor(consultation.status)}>
                            {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(consultation.id)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Consultations;