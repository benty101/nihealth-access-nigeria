
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
      name: 'Lagos University Teaching Hospital (LUTH)',
      location: 'Idi-Araba, Lagos',
      rating: 4.6,
      distance: '2.5 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'NICU', 'Cesarean Section', 'Family Planning'],
      specialties: ['Obstetrics', 'Gynecology', 'Pediatrics'],
      phone: '+234 803 123 4567',
      verified: true,
      state: 'lagos'
    },
    {
      name: 'National Hospital Abuja',
      location: 'Central Area, Abuja',
      rating: 4.4,
      distance: '5.2 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'Prenatal Screening', 'High-Risk Pregnancy'],
      specialties: ['Obstetrics', 'Pediatrics', 'General Medicine'],
      phone: '+234 803 234 5678',
      verified: true,
      state: 'abuja'
    },
    {
      name: 'St. Nicholas Hospital',
      location: 'Victoria Island, Lagos',
      rating: 4.8,
      distance: '3.1 km',
      nhisSupported: false,
      maternalServices: ['Antenatal Care', 'Delivery', 'NICU', 'Water Birth', 'IVF Services'],
      specialties: ['Obstetrics', 'Gynecology', 'Fertility'],
      phone: '+234 803 345 6789',
      verified: true,
      state: 'lagos'
    },
    {
      name: 'University College Hospital (UCH)',
      location: 'Ibadan, Oyo State',
      rating: 4.3,
      distance: '120 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'Emergency Obstetrics', 'NICU'],
      specialties: ['Obstetrics', 'Gynecology', 'Pediatrics', 'Surgery'],
      phone: '+234 805 123 7890',
      verified: true,
      state: 'oyo'
    },
    {
      name: 'Federal Medical Centre Abeokuta',
      location: 'Abeokuta, Ogun State',
      rating: 4.1,
      distance: '80 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'Family Planning', 'Postnatal Care'],
      specialties: ['Obstetrics', 'Gynecology', 'General Medicine'],
      phone: '+234 807 234 5678',
      verified: true,
      state: 'ogun'
    },
    {
      name: 'Garki Hospital',
      location: 'Garki, Abuja',
      rating: 4.0,
      distance: '8.5 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'Immunization', 'Family Planning'],
      specialties: ['Obstetrics', 'Pediatrics', 'General Practice'],
      phone: '+234 809 345 6789',
      verified: true,
      state: 'abuja'
    },
    {
      name: 'Eko Hospital',
      location: 'Ikeja, Lagos',
      rating: 4.7,
      distance: '15 km',
      nhisSupported: false,
      maternalServices: ['Antenatal Care', 'Delivery', 'NICU', 'Prenatal Diagnostics'],
      specialties: ['Obstetrics', 'Gynecology', 'Cardiology'],
      phone: '+234 811 456 7890',
      verified: true,
      state: 'lagos'
    },
    {
      name: 'University of Port Harcourt Teaching Hospital',
      location: 'Port Harcourt, Rivers State',
      rating: 4.2,
      distance: '450 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'Emergency Obstetrics', 'NICU'],
      specialties: ['Obstetrics', 'Gynecology', 'Pediatrics'],
      phone: '+234 813 567 8901',
      verified: true,
      state: 'rivers'
    },
    {
      name: 'Federal Medical Centre Owerri',
      location: 'Owerri, Imo State',
      rating: 3.9,
      distance: '350 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'Family Planning', 'Postnatal Care'],
      specialties: ['Obstetrics', 'Gynecology', 'General Medicine'],
      phone: '+234 815 678 9012',
      verified: true,
      state: 'imo'
    },
    {
      name: 'Ahmadu Bello University Teaching Hospital',
      location: 'Zaria, Kaduna State',
      rating: 4.1,
      distance: '180 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'High-Risk Pregnancy', 'NICU'],
      specialties: ['Obstetrics', 'Gynecology', 'Pediatrics'],
      phone: '+234 817 789 0123',
      verified: true,
      state: 'kaduna'
    },
    {
      name: 'Maitama District Hospital',
      location: 'Maitama, Abuja',
      rating: 4.3,
      distance: '12 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'Family Planning', 'Immunization'],
      specialties: ['Obstetrics', 'Pediatrics', 'General Practice'],
      phone: '+234 819 890 1234',
      verified: true,
      state: 'abuja'
    },
    {
      name: 'Lagos Island Maternity Hospital',
      location: 'Lagos Island, Lagos',
      rating: 4.0,
      distance: '8 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'Family Planning', 'Postnatal Care'],
      specialties: ['Obstetrics', 'Gynecology', 'Midwifery'],
      phone: '+234 821 901 2345',
      verified: true,
      state: 'lagos'
    },
    {
      name: 'University of Ilorin Teaching Hospital',
      location: 'Ilorin, Kwara State',
      rating: 4.2,
      distance: '300 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'Emergency Obstetrics', 'NICU'],
      specialties: ['Obstetrics', 'Gynecology', 'Pediatrics'],
      phone: '+234 823 012 3456',
      verified: true,
      state: 'kwara'
    },
    {
      name: 'Federal Medical Centre Asaba',
      location: 'Asaba, Delta State',
      rating: 3.8,
      distance: '320 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'Family Planning', 'Postnatal Care'],
      specialties: ['Obstetrics', 'Gynecology', 'General Medicine'],
      phone: '+234 825 123 4567',
      verified: true,
      state: 'delta'
    },
    {
      name: 'Nnamdi Azikiwe University Teaching Hospital',
      location: 'Nnewi, Anambra State',
      rating: 4.0,
      distance: '380 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'Emergency Obstetrics', 'NICU'],
      specialties: ['Obstetrics', 'Gynecology', 'Pediatrics'],
      phone: '+234 827 234 5678',
      verified: true,
      state: 'anambra'
    },
    {
      name: 'Obafemi Awolowo University Teaching Hospital',
      location: 'Ile-Ife, Osun State',
      rating: 4.1,
      distance: '250 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'High-Risk Pregnancy', 'NICU'],
      specialties: ['Obstetrics', 'Gynecology', 'Pediatrics'],
      phone: '+234 829 345 6789',
      verified: true,
      state: 'osun'
    },
    {
      name: 'University of Benin Teaching Hospital',
      location: 'Benin City, Edo State',
      rating: 4.0,
      distance: '280 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'Emergency Obstetrics', 'Family Planning'],
      specialties: ['Obstetrics', 'Gynecology', 'Pediatrics'],
      phone: '+234 831 456 7890',
      verified: true,
      state: 'edo'
    },
    {
      name: 'Federal Medical Centre Lokoja',
      location: 'Lokoja, Kogi State',
      rating: 3.7,
      distance: '200 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'Family Planning', 'Postnatal Care'],
      specialties: ['Obstetrics', 'Gynecology', 'General Medicine'],
      phone: '+234 833 567 8901',
      verified: true,
      state: 'kogi'
    },
    {
      name: 'Federal Medical Centre Yenagoa',
      location: 'Yenagoa, Bayelsa State',
      rating: 3.9,
      distance: '420 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'Emergency Obstetrics', 'Family Planning'],
      specialties: ['Obstetrics', 'Gynecology', 'Pediatrics'],
      phone: '+234 835 678 9012',
      verified: true,
      state: 'bayelsa'
    },
    {
      name: 'Plateau State Specialist Hospital',
      location: 'Jos, Plateau State',
      rating: 4.0,
      distance: '220 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'NICU', 'Family Planning'],
      specialties: ['Obstetrics', 'Gynecology', 'Pediatrics'],
      phone: '+234 837 789 0123',
      verified: true,
      state: 'plateau'
    },
    {
      name: 'University of Calabar Teaching Hospital',
      location: 'Calabar, Cross River State',
      rating: 4.1,
      distance: '380 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'Emergency Obstetrics', 'NICU'],
      specialties: ['Obstetrics', 'Gynecology', 'Pediatrics'],
      phone: '+234 839 890 1234',
      verified: true,
      state: 'cross-river'
    },
    {
      name: 'Federal Medical Centre Makurdi',
      location: 'Makurdi, Benue State',
      rating: 3.8,
      distance: '190 km',
      nhisSupported: true,
      maternalServices: ['Antenatal Care', 'Delivery', 'Family Planning', 'Postnatal Care'],
      specialties: ['Obstetrics', 'Gynecology', 'General Medicine'],
      phone: '+234 841 901 2345',
      verified: true,
      state: 'benue'
    }
  ];

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesLocation = selectedLocation === 'all' || hospital.state === selectedLocation;
    
    return matchesSearch && matchesLocation;
  });

  const states = ['all', 'lagos', 'abuja', 'oyo', 'ogun', 'rivers', 'kaduna', 'kwara', 'delta', 'anambra'];

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
          {states.map((state) => (
            <Badge 
              key={state}
              variant={selectedLocation === state ? 'default' : 'outline'}
              className="cursor-pointer capitalize"
              onClick={() => setSelectedLocation(state)}
            >
              {state === 'all' ? 'All States' : state.replace('-', ' ')}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
                  <div className="flex items-center text-teal-600">
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
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
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
