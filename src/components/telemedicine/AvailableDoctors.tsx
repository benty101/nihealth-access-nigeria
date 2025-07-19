import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Video, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Star, 
  Clock, 
  Search, 
  Filter,
  MapPin,
  Globe,
  User,
  Stethoscope,
  AlertCircle
} from 'lucide-react';
import { telemedicineService, type TelemedicineProvider } from '@/services/TelemedicineService';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AvailableDoctorsProps {
  onBookConsultation?: (doctor: TelemedicineProvider, consultationType: 'video' | 'voice' | 'chat') => void;
}

const AvailableDoctors: React.FC<AvailableDoctorsProps> = ({ onBookConsultation }) => {
  const [doctors, setDoctors] = useState<TelemedicineProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedConsultationType, setSelectedConsultationType] = useState<'video' | 'voice' | 'chat'>('video');
  const { toast } = useToast();

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('AvailableDoctors: Loading active telemedicine providers...');
      
      const doctorsData = await telemedicineService.getAllTelemedicineProviders();
      setDoctors(doctorsData);
      console.log('AvailableDoctors: Successfully loaded', doctorsData.length, 'active providers');
      
    } catch (error) {
      console.error('AvailableDoctors: Error loading doctors:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(`Failed to load available doctors: ${errorMessage}`);
      toast({
        title: "Error",
        description: "Failed to load available doctors. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Get unique specializations for filter
  const specializations = Array.from(new Set(doctors.map(d => d.specialization).filter(Boolean)));

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialization === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const consultationTypes = [
    { type: 'video' as const, icon: Video, label: 'Video Call', description: 'Face-to-face consultation' },
    { type: 'voice' as const, icon: Phone, label: 'Voice Call', description: 'Audio consultation' },
    { type: 'chat' as const, icon: MessageSquare, label: 'Chat', description: 'Text consultation' }
  ];

  const handleBookConsultation = (doctor: TelemedicineProvider) => {
    if (onBookConsultation) {
      onBookConsultation(doctor, selectedConsultationType);
    } else {
      toast({
        title: "Booking Started",
        description: `Booking ${selectedConsultationType} consultation with ${doctor.name}`,
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading available doctors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="flex justify-center">
          <Button onClick={loadDoctors} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Available Doctors</h1>
        <p className="text-muted-foreground">Connect with certified healthcare professionals from our network</p>
      </div>

      {/* Consultation Type Selection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Choose Consultation Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {consultationTypes.map(({ type, icon: Icon, label, description }) => (
              <div
                key={type}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedConsultationType === type
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedConsultationType(type)}
              >
                <div className="flex items-center mb-2">
                  <Icon className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold">{label}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-full md:w-64">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specializations.map(specialty => (
                  <SelectItem key={specialty} value={specialty || ''}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Badge variant="secondary" className="flex items-center gap-1 px-3 py-2 h-10">
              <User className="h-4 w-4" />
              {filteredDoctors.length} available
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Available Doctors Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="text-center py-16">
          <Stethoscope className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No doctors found</h3>
          <p className="text-muted-foreground">
            {searchTerm || selectedSpecialty !== 'all' 
              ? 'Try adjusting your search criteria' 
              : 'No doctors are currently available for consultation'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <span className="text-primary font-semibold text-lg">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm ml-1">{doctor.rating || 5.0}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        {doctor.experience_years ? `${doctor.experience_years} years` : 'Experienced'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Consultation fee</span>
                    <span className="font-semibold text-primary">
                      ₦{doctor.consultation_fee?.toLocaleString() || '5,000'}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm text-muted-foreground">Available now</span>
                    <Badge className="ml-2 bg-green-100 text-green-800">Online</Badge>
                  </div>

                  {doctor.license_number && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm text-muted-foreground">
                        License: {doctor.license_number}
                      </span>
                    </div>
                  )}

                  {doctor.languages && doctor.languages.length > 0 && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm text-muted-foreground">
                        {doctor.languages.slice(0, 2).join(', ')}
                        {doctor.languages.length > 2 && ` +${doctor.languages.length - 2} more`}
                      </span>
                    </div>
                  )}

                  <Button 
                    className="w-full" 
                    onClick={() => handleBookConsultation(doctor)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book {selectedConsultationType} consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableDoctors;