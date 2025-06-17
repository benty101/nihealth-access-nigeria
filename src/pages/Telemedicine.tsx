
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Clock, Shield, Star, Calendar, UserPlus, Smartphone, Monitor, MessageSquare } from 'lucide-react';

const Telemedicine = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Function to handle protected actions
  const handleProtectedAction = (action: string) => {
    if (!user) {
      const proceed = window.confirm(`You need to create an account to ${action}. Would you like to register now?`);
      if (proceed) {
        navigate('/auth');
      }
      return false;
    }
    return true;
  };

  const consultationTypes = [
    {
      type: 'General Practice',
      description: 'Primary care consultations for common health issues',
      duration: '15-30 minutes',
      price: '₦5,000',
      available: true,
      specialties: ['Family Medicine', 'Internal Medicine']
    },
    {
      type: 'Mental Health',
      description: 'Therapy and counseling sessions with licensed professionals',
      duration: '45-60 minutes',
      price: '₦8,000',
      available: true,
      specialties: ['Psychology', 'Psychiatry', 'Counseling']
    },
    {
      type: 'Dermatology',
      description: 'Skin condition consultations with visual assessment',
      duration: '20-30 minutes',
      price: '₦7,000',
      available: true,
      specialties: ['Dermatology', 'Cosmetic Dermatology']
    },
    {
      type: 'Pediatric Care',
      description: 'Child health consultations and development guidance',
      duration: '20-30 minutes',
      price: '₦6,000',
      available: true,
      specialties: ['Pediatrics', 'Child Development']
    }
  ];

  const availableDoctors = [
    {
      name: 'Dr. Adebayo Ogundimu',
      specialty: 'General Practice',
      experience: '12 years',
      rating: 4.9,
      nextAvailable: 'Today 2:00 PM',
      languages: ['English', 'Yoruba']
    },
    {
      name: 'Dr. Fatima Al-Hassan',
      specialty: 'Mental Health',
      experience: '8 years',
      rating: 4.8,
      nextAvailable: 'Tomorrow 10:00 AM',
      languages: ['English', 'Hausa']
    },
    {
      name: 'Dr. Chioma Okwu',
      specialty: 'Dermatology',
      experience: '10 years',
      rating: 4.7,
      nextAvailable: 'Today 4:30 PM',
      languages: ['English', 'Igbo']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Telemedicine Consultations
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Connect with qualified healthcare professionals from the comfort of your home
            </p>
            {!user && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-blue-700">
                  <UserPlus className="h-5 w-5" />
                  <span>Create an account to book consultations and access your medical history</span>
                  <Button 
                    onClick={() => navigate('/auth')} 
                    size="sm" 
                    className="ml-2 bg-blue-600 hover:bg-blue-700"
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            )}
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-green-600" />
                HIPAA Compliant
              </div>
              <div className="flex items-center">
                <Video className="h-4 w-4 mr-2 text-blue-600" />
                HD Video & Audio
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-purple-600" />
                Same-day appointments
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How Telemedicine Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">1. Book Appointment</h3>
                <p className="text-gray-600">Choose your doctor and preferred time slot</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">2. Join Video Call</h3>
                <p className="text-gray-600">Connect via secure video platform</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">3. Get Care</h3>
                <p className="text-gray-600">Receive diagnosis and treatment plan</p>
              </div>
            </div>
          </div>

          {/* Device Requirements */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-amber-800 mb-3">Device Requirements</h3>
            <div className="flex flex-wrap gap-4 text-sm text-amber-700">
              <div className="flex items-center">
                <Smartphone className="h-4 w-4 mr-2" />
                Mobile phone with camera
              </div>
              <div className="flex items-center">
                <Monitor className="h-4 w-4 mr-2" />
                Computer with webcam
              </div>
              <div className="flex items-center">
                <Video className="h-4 w-4 mr-2" />
                Stable internet connection
              </div>
            </div>
          </div>

          {/* Consultation Types */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Consultations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {consultationTypes.map((consultation, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {consultation.type}
                      <Badge className="bg-green-100 text-green-800">
                        {consultation.available ? 'Available' : 'Busy'}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{consultation.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{consultation.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium text-green-600">{consultation.price}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {consultation.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        className="w-full mt-4"
                        onClick={() => handleProtectedAction('book a consultation')}
                      >
                        Book Consultation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Available Doctors */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Doctors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableDoctors.map((doctor, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{doctor.name}</CardTitle>
                        <CardDescription>{doctor.specialty}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Experience:</span>
                        <span>{doctor.experience}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span>{doctor.rating}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next available:</span>
                        <span className="text-green-600 font-medium">{doctor.nextAvailable}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Languages:</span>
                        <span>{doctor.languages.join(', ')}</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-4"
                      onClick={() => handleProtectedAction('book with this doctor')}
                    >
                      Book with {doctor.name.split(' ')[1]}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Emergency Notice */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-red-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 mb-2">Emergency Notice</h3>
                <p className="text-red-700">
                  Telemedicine is not suitable for medical emergencies. If you are experiencing a life-threatening 
                  emergency, please call 199 or visit your nearest emergency room immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Telemedicine;
