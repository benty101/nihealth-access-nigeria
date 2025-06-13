
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Users, Shield } from 'lucide-react';

const Insurance = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const insurancePlans = [
    {
      name: 'AIICO Insurance',
      type: 'Premium Health',
      monthlyPremium: '₦15,000',
      coverage: '₦5,000,000',
      rating: 4.5,
      features: ['Outpatient Care', 'Surgery', 'Maternity', 'Dental'],
      popular: true
    },
    {
      name: 'Leadway Assurance',
      type: 'Family Plan',
      monthlyPremium: '₦25,000',
      coverage: '₦10,000,000',
      rating: 4.3,
      features: ['Family Coverage', 'Emergency Care', 'Specialist Visits', 'Prescription'],
      popular: false
    },
    {
      name: 'AXA Mansard',
      type: 'Basic Health',
      monthlyPremium: '₦8,000',
      coverage: '₦2,000,000',
      rating: 4.1,
      features: ['Basic Care', 'Emergency', 'Generic Drugs', 'Consultation'],
      popular: false
    },
    {
      name: 'NHIS',
      type: 'Government Plan',
      monthlyPremium: '₦3,000',
      coverage: '₦500,000',
      rating: 3.8,
      features: ['Basic Healthcare', 'Public Hospitals', 'Essential Drugs', 'Preventive Care'],
      popular: false
    },
  ];

  const filteredPlans = insurancePlans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Compare Health Insurance Plans
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Find the perfect health insurance plan for you and your family
            </p>
            
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search insurance providers..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlans.map((plan, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow relative">
                {plan.popular && (
                  <Badge className="absolute -top-3 left-4 bg-green-600">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Shield className="h-8 w-8 text-blue-600" />
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{plan.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <p className="text-sm text-gray-600">{plan.type}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-blue-600">{plan.monthlyPremium}</div>
                    <div className="text-sm text-gray-600">per month</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-gray-600">Coverage up to</div>
                    <div className="text-lg font-semibold">{plan.coverage}</div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Need Help Choosing?
              </h2>
              <p className="text-gray-600 mb-6">
                Our healthcare experts are here to help you find the perfect insurance plan
              </p>
              <Button size="lg" variant="outline">
                Speak with an Expert
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;
