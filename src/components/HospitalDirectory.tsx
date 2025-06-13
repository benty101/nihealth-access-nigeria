
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, Shield, Heart, Phone } from 'lucide-react';

const HospitalDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const hospitals = [
    {
      name: 'Lagos University Teaching Hospital',
      location: 'Idi-Araba, Lagos',
      rating: 4.6,
      distance: '2.5 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'NICU', 'Cesarean Section'],
      specialties: ['Obstetrics', 'Gynecology', 'Pediatrics'],
      phone: '+234 803 123 4567',
      verified: true,
      image: '/placeholder.svg'
    },
    {
      name: 'National Hospital Abuja',
      location: 'Central Area, Abuja',
      rating: 4.4,
      distance: '5.2 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'Prenatal Screening'],
      specialties: ['Obstetrics', 'Pediatrics', 'General Medicine'],
      phone: '+234 803 234 5678',
      verified: true,
      image: '/placeholder.svg'
    },
    {
      name: 'St. Nicholas Hospital',
      location: 'Victoria Island, Lagos',
      rating: 4.8,
      distance: '3.1 km',
      nhisSupported: false,
      maternalServices: ['Antenatal Care', 'Delivery', 'NICU', 'Water Birth'],
      specialties: ['Obstetrics', 'Gynecology', 'Fertility'],
      phone: '+234 803 345 6789',
      verified: true,
      image: '/placeholder.svg'
    },
  ];

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Find Maternal-Friendly Hospitals
        </h1>
        <p className="text-lg text-gray-600">
          Discover verified hospitals with excellent maternity services near you
        </p>
      </div>

      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search hospitals by name, location, or specialty..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge 
            variant={selectedLocation === 'all' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedLocation('all')}
          >
            All Locations
          </Badge>
          <Badge 
            variant={selectedLocation === 'lagos' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedLocation('lagos')}
          >
            Lagos
          </Badge>
          <Badge 
            variant={selectedLocation === 'abuja' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedLocation('abuja')}
          >
            Abuja
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredHospitals.map((hospital, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center text-lg">
                    {hospital.name}
                    {hospital.verified && (
                      <Badge className="ml-2 bg-green-100 text-green-800">
                        Verified
                      </Badge>
                    )}
                  </CardTitle>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{hospital.location}</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm">{hospital.distance}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm">{hospital.rating}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className={`h-4 w-4 mr-1 ${hospital.nhisSupported ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className="text-sm">
                      {hospital.nhisSupported ? 'NHIS Supported' : 'Private Only'}
                    </span>
                  </div>
                  <div className="flex items-center text-pink-600">
                    <Heart className="h-4 w-4 mr-1" />
                    <span className="text-sm">Maternal Care</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Maternal Services:</h4>
                  <div className="flex flex-wrap gap-1">
                    {hospital.maternalServices.map((service, serviceIndex) => (
                      <Badge key={serviceIndex} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-1">
                    {hospital.specialties.map((specialty, specialtyIndex) => (
                      <Badge key={specialtyIndex} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-1" />
                    <span className="text-sm">{hospital.phone}</span>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Book Appointment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HospitalDirectory;
