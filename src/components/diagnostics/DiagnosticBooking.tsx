
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TestTube, 
  Calendar, 
  MapPin, 
  Clock, 
  Home,
  Building,
  Star,
  Heart,
  Eye,
  Brain
} from 'lucide-react';

interface DiagnosticTest {
  id: string;
  name: string;
  category: string;
  price: string;
  duration: string;
  homeService: boolean;
  description: string;
  preparation: string;
}

const DiagnosticBooking = () => {
  const [selectedService, setSelectedService] = useState<'lab' | 'home'>('lab');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const diagnosticTests: DiagnosticTest[] = [
    {
      id: '1',
      name: 'Complete Blood Count (CBC)',
      category: 'Blood Tests',
      price: '₦3,500',
      duration: '15 mins',
      homeService: true,
      description: 'Comprehensive blood analysis including white cells, red cells, and platelets',
      preparation: 'No special preparation required'
    },
    {
      id: '2',
      name: 'Lipid Profile',
      category: 'Blood Tests',
      price: '₦4,200',
      duration: '15 mins',
      homeService: true,
      description: 'Cholesterol and triglyceride levels assessment',
      preparation: '12-hour fasting required'
    },
    {
      id: '3',
      name: 'Chest X-Ray',
      category: 'Imaging',
      price: '₦8,000',
      duration: '30 mins',
      homeService: false,
      description: 'Digital chest radiography for lung and heart assessment',
      preparation: 'Remove jewelry and metal objects'
    },
    {
      id: '4',
      name: 'ECG (Electrocardiogram)',
      category: 'Cardiac',
      price: '₦5,500',
      duration: '20 mins',
      homeService: true,
      description: 'Heart rhythm and electrical activity monitoring',
      preparation: 'No special preparation required'
    },
    {
      id: '5',
      name: 'Eye Examination',
      category: 'Specialized',
      price: '₦6,000',
      duration: '45 mins',
      homeService: false,
      description: 'Comprehensive eye health and vision assessment',
      preparation: 'Avoid wearing contact lenses'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Tests', icon: TestTube },
    { id: 'Blood Tests', label: 'Blood Tests', icon: Heart },
    { id: 'Imaging', label: 'Imaging', icon: Brain },
    { id: 'Cardiac', label: 'Cardiac', icon: Heart },
    { id: 'Specialized', label: 'Specialized', icon: Eye }
  ];

  const laboratories = [
    {
      name: 'PathCare Nigeria',
      rating: 4.8,
      distance: '2.1 km',
      slots: ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'],
      address: 'Victoria Island, Lagos'
    },
    {
      name: 'Synlab Nigeria',
      rating: 4.6,
      distance: '3.2 km',
      slots: ['8:30 AM', '10:00 AM', '1:30 PM', '3:45 PM'],
      address: 'Ikoyi, Lagos'
    },
    {
      name: 'Clina-Lancet Laboratories',
      rating: 4.7,
      distance: '4.5 km',
      slots: ['9:15 AM', '12:00 PM', '2:30 PM', '5:00 PM'],
      address: 'Lekki Phase 1, Lagos'
    }
  ];

  const filteredTests = selectedCategory === 'all' 
    ? diagnosticTests 
    : diagnosticTests.filter(test => test.category === selectedCategory);

  const availableTests = selectedService === 'home' 
    ? filteredTests.filter(test => test.homeService)
    : filteredTests;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Diagnostic Services</h1>
        <p className="text-gray-600">Book lab tests and diagnostic services with ease</p>
      </div>

      {/* Service Type Selection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Choose Service Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedService === 'lab'
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedService('lab')}
            >
              <div className="flex items-center mb-2">
                <Building className="h-5 w-5 text-teal-600 mr-2" />
                <h3 className="font-semibold">Visit Laboratory</h3>
              </div>
              <p className="text-sm text-gray-600">Visit our partner laboratories for comprehensive testing</p>
            </div>
            <div
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedService === 'home'
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedService('home')}
            >
              <div className="flex items-center mb-2">
                <Home className="h-5 w-5 text-teal-600 mr-2" />
                <h3 className="font-semibold">Home Service</h3>
                <Badge className="ml-2 bg-orange-100 text-orange-800">Premium</Badge>
              </div>
              <p className="text-sm text-gray-600">Professional sample collection at your location</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Category Filter */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Test Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categories.map(({ id, label, icon: Icon }) => (
                <div
                  key={id}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedCategory === id
                      ? 'bg-teal-100 text-teal-800'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCategory(id)}
                >
                  <div className="flex items-center">
                    <Icon className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Tests */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableTests.map((test) => (
              <Card key={test.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{test.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">{test.category}</Badge>
                    </div>
                    {test.homeService && (
                      <Badge className="bg-green-100 text-green-800">
                        <Home className="h-3 w-3 mr-1" />
                        Home
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">{test.description}</p>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {test.duration}
                      </span>
                      <span className="font-semibold text-teal-600">{test.price}</span>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded text-xs text-yellow-800">
                      <strong>Preparation:</strong> {test.preparation}
                    </div>
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Partner Laboratories (only shown for lab service) */}
          {selectedService === 'lab' && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Partner Laboratories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {laboratories.map((lab, index) => (
                    <Card key={index} className="border">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold">{lab.name}</h3>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                              {lab.rating}
                              <MapPin className="h-4 w-4 ml-3 mr-1" />
                              {lab.distance}
                            </div>
                            <p className="text-xs text-gray-500">{lab.address}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Available Slots</h4>
                            <div className="grid grid-cols-2 gap-1">
                              {lab.slots.map((slot, slotIndex) => (
                                <Badge key={slotIndex} variant="outline" className="text-xs">
                                  {slot}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiagnosticBooking;
