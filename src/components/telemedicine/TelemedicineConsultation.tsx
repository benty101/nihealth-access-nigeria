
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Phone, MessageSquare, Calendar, Star, Clock } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  price: string;
  availability: string;
  image: string;
}

const TelemedicineConsultation = () => {
  const [selectedConsultationType, setSelectedConsultationType] = useState<'video' | 'voice' | 'chat'>('video');

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Adaora Okafor',
      specialty: 'General Medicine',
      rating: 4.8,
      experience: '8 years',
      price: '₦5,000',
      availability: 'Available now',
      image: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Dr. Ibrahim Musa',
      specialty: 'Pediatrics',
      rating: 4.9,
      experience: '12 years',
      price: '₦6,500',
      availability: 'Next available: 2:30 PM',
      image: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Dr. Funmi Adeleke',
      specialty: 'Gynecology',
      rating: 4.7,
      experience: '10 years',
      price: '₦7,000',
      availability: 'Available now',
      image: '/placeholder.svg'
    }
  ];

  const consultationTypes = [
    { type: 'video' as const, icon: Video, label: 'Video Call', description: 'Face-to-face consultation' },
    { type: 'voice' as const, icon: Phone, label: 'Voice Call', description: 'Audio consultation' },
    { type: 'chat' as const, icon: MessageSquare, label: 'Chat', description: 'Text consultation' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Telemedicine Consultation</h1>
        <p className="text-gray-600">Connect with certified doctors from the comfort of your home</p>
      </div>

      {/* Consultation Type Selection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Choose Consultation Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {consultationTypes.map(({ type, icon: Icon, label, description }) => (
              <div
                key={type}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedConsultationType === type
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedConsultationType(type)}
              >
                <div className="flex items-center mb-2">
                  <Icon className="h-5 w-5 text-teal-600 mr-2" />
                  <h3 className="font-semibold">{label}</h3>
                </div>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Doctors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm ml-1">{doctor.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({doctor.experience})</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Consultation fee</span>
                  <span className="font-semibold text-teal-600">{doctor.price}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">{doctor.availability}</span>
                  {doctor.availability.includes('Available now') && (
                    <Badge className="ml-2 bg-green-100 text-green-800">Online</Badge>
                  )}
                </div>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TelemedicineConsultation;
