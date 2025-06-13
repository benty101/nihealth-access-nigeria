
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Monitor, Clock, MapPin, Heart } from 'lucide-react';

const Labs = () => {
  const labTests = [
    {
      name: 'Complete Blood Count (CBC)',
      description: 'Comprehensive blood analysis including white cells, red cells, and platelets',
      price: '₦8,500',
      duration: '24 hours',
      category: 'Blood Test',
      popular: true
    },
    {
      name: 'Lipid Profile',
      description: 'Cholesterol and triglyceride levels assessment',
      price: '₦12,000',
      duration: '48 hours',
      category: 'Blood Test',
      popular: false
    },
    {
      name: 'Diabetes Screening (HbA1c)',
      description: 'Long-term blood sugar control assessment',
      price: '₦15,000',
      duration: '24 hours',
      category: 'Blood Test',
      popular: true
    },
    {
      name: 'Chest X-Ray',
      description: 'Lung and heart imaging examination',
      price: '₦6,000',
      duration: '2 hours',
      category: 'Imaging',
      popular: false
    },
    {
      name: 'ECG (Electrocardiogram)',
      description: 'Heart rhythm and electrical activity monitoring',
      price: '�N4,500',
      duration: '1 hour',
      category: 'Cardiac',
      popular: false
    },
    {
      name: 'Ultrasound Scan',
      description: 'Abdominal or pelvic ultrasound examination',
      price: '₦18,000',
      duration: '4 hours',
      category: 'Imaging',
      popular: true
    },
  ];

  const labCenters = [
    {
      name: 'Pathcare Laboratory',
      location: 'Victoria Island, Lagos',
      rating: 4.8,
      services: ['Blood Tests', 'Imaging', 'Cardiac Tests']
    },
    {
      name: 'Clina-Lancet Laboratories',
      location: 'Wuse II, Abuja',
      rating: 4.6,
      services: ['Blood Tests', 'Molecular Tests', 'Pathology']
    },
    {
      name: 'Synlab Nigeria',
      location: 'GRA, Port Harcourt',
      rating: 4.7,
      services: ['Blood Tests', 'Imaging', 'Specialized Tests']
    },
  ];

  const categories = ['All', 'Blood Test', 'Imaging', 'Cardiac', 'Specialized'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Laboratory Services
            </h1>
            <p className="text-lg text-gray-600">
              Book lab tests and diagnostic services from certified laboratories
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className={index === 0 ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lab Tests */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Tests</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {labTests.map((test, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow relative">
                    {test.popular && (
                      <Badge className="absolute -top-3 left-4 bg-green-600">
                        Popular
                      </Badge>
                    )}
                    
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Monitor className="h-8 w-8 text-blue-600" />
                        <Badge variant="outline">{test.category}</Badge>
                      </div>
                      <CardTitle className="text-lg">{test.name}</CardTitle>
                      <p className="text-sm text-gray-600">{test.description}</p>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold text-blue-600">{test.price}</div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {test.duration}
                        </div>
                      </div>
                      
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Book Test
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Lab Centers */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Lab Centers</h2>
              <div className="space-y-4">
                {labCenters.map((center, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{center.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {center.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Heart className="h-4 w-4 mr-1 text-red-500" />
                        {center.rating} rating
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {center.services.map((service, serviceIndex) => (
                          <Badge key={serviceIndex} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Monitor className="mr-2 h-4 w-4" />
                      Track Test Results
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="mr-2 h-4 w-4" />
                      Reschedule Test
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Heart className="mr-2 h-4 w-4" />
                      Health Packages
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labs;
