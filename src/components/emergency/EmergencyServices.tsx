
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Ambulance, 
  MapPin, 
  Clock, 
  AlertTriangle,
  Heart,
  Zap,
  Shield
} from 'lucide-react';

const EmergencyServices = () => {
  const [emergencyType, setEmergencyType] = useState<string>('');

  const emergencyTypes = [
    { 
      id: 'medical', 
      icon: Heart, 
      label: 'Medical Emergency', 
      description: 'Heart attack, stroke, severe injury',
      color: 'bg-red-500'
    },
    { 
      id: 'accident', 
      icon: AlertTriangle, 
      label: 'Accident Emergency', 
      description: 'Road accident, fall, injury',
      color: 'bg-orange-500'
    },
    { 
      id: 'urgent', 
      icon: Zap, 
      label: 'Urgent Care', 
      description: 'High fever, severe pain, breathing issues',
      color: 'bg-yellow-500'
    }
  ];

  const emergencyContacts = [
    { service: 'Lagos State Ambulance Service', number: '199', available: '24/7' },
    { service: 'National Emergency Number', number: '112', available: '24/7' },
    { service: 'Lagos State Emergency', number: '767', available: '24/7' },
    { service: 'Fire Service', number: '199', available: '24/7' }
  ];

  const nearbyHospitals = [
    {
      name: 'Lagos University Teaching Hospital',
      distance: '2.3 km',
      eta: '8 mins',
      emergency: true,
      phone: '+234-1-7731234'
    },
    {
      name: 'General Hospital Lagos',
      distance: '3.1 km',
      eta: '12 mins',
      emergency: true,
      phone: '+234-1-2636363'
    },
    {
      name: 'Reddington Hospital',
      distance: '4.2 km',
      eta: '15 mins',
      emergency: true,
      phone: '+234-1-2713200'
    }
  ];

  const handleEmergencyCall = (number: string) => {
    console.log(`Calling emergency number: ${number}`);
    // In a real app, this would initiate a phone call
    window.location.href = `tel:${number}`;
  };

  const handleSOSAlert = () => {
    console.log('SOS Alert activated');
    // In a real app, this would send location and emergency contacts
    alert('SOS Alert sent to your emergency contacts and nearest medical facilities');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Shield className="h-8 w-8 text-red-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Emergency Services</h1>
        </div>
        <p className="text-gray-600">Get immediate help when you need it most</p>
      </div>

      {/* SOS Button */}
      <Card className="mb-8 border-red-200">
        <CardContent className="p-6">
          <div className="text-center">
            <Button
              onClick={handleSOSAlert}
              className="bg-red-600 hover:bg-red-700 text-white text-xl py-6 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all"
            >
              <AlertTriangle className="h-8 w-8 mr-3" />
              EMERGENCY SOS
            </Button>
            <p className="text-sm text-gray-600 mt-4">
              Press to immediately alert emergency contacts and nearby medical facilities
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Emergency Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Emergency Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emergencyTypes.map(({ id, icon: Icon, label, description, color }) => (
                <div
                  key={id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    emergencyType === id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setEmergencyType(id)}
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center mr-3`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{label}</h3>
                      <p className="text-sm text-gray-600">{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-red-600" />
              Emergency Hotlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{contact.service}</h4>
                    <p className="text-sm text-gray-600">{contact.available}</p>
                  </div>
                  <Button
                    onClick={() => handleEmergencyCall(contact.number)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Call {contact.number}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nearby Hospitals */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Ambulance className="h-5 w-5 mr-2 text-blue-600" />
            Nearby Emergency Hospitals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbyHospitals.map((hospital, index) => (
              <Card key={index} className="border hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold">{hospital.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {hospital.distance}
                        <Clock className="h-4 w-4 ml-3 mr-1" />
                        {hospital.eta}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-100 text-green-800">24/7 Emergency</Badge>
                      <Button
                        onClick={() => handleEmergencyCall(hospital.phone)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyServices;
