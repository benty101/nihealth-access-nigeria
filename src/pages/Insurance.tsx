
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
      features: ['Outpatient Care', 'Surgery', 'Maternity', 'Dental', 'Optical'],
      popular: true
    },
    {
      name: 'Leadway Assurance',
      type: 'Family Health Plan',
      monthlyPremium: '₦25,000',
      coverage: '₦10,000,000',
      rating: 4.3,
      features: ['Family Coverage', 'Emergency Care', 'Specialist Visits', 'Prescription', 'Maternity'],
      popular: false
    },
    {
      name: 'AXA Mansard Health',
      type: 'Basic Health Cover',
      monthlyPremium: '₦8,000',
      coverage: '₦2,000,000',
      rating: 4.1,
      features: ['Basic Care', 'Emergency', 'Generic Drugs', 'Consultation', 'Maternity'],
      popular: false
    },
    {
      name: 'NHIS (Government)',
      type: 'National Health Scheme',
      monthlyPremium: '₦3,000',
      coverage: '₦500,000',
      rating: 3.8,
      features: ['Basic Healthcare', 'Public Hospitals', 'Essential Drugs', 'Maternity Care'],
      popular: false
    },
    {
      name: 'Niger Insurance',
      type: 'Comprehensive Health',
      monthlyPremium: '₦18,000',
      coverage: '₦7,500,000',
      rating: 4.2,
      features: ['Comprehensive Care', 'Surgery', 'Maternity', 'Emergency', 'Specialist Care'],
      popular: false
    },
    {
      name: 'Custodian Investment',
      type: 'Executive Health Plan',
      monthlyPremium: '₦35,000',
      coverage: '₦15,000,000',
      rating: 4.6,
      features: ['Executive Care', 'Private Hospitals', 'Overseas Treatment', 'Maternity', 'Dental'],
      popular: true
    },
    {
      name: 'Cornerstone Insurance',
      type: 'Standard Health',
      monthlyPremium: '₦12,000',
      coverage: '₦3,500,000',
      rating: 4.0,
      features: ['Standard Care', 'Emergency', 'Maternity', 'Outpatient', 'Prescription'],
      popular: false
    },
    {
      name: 'Sovereign Trust Insurance',
      type: 'Premium Family',
      monthlyPremium: '₦28,000',
      coverage: '₦12,000,000',
      rating: 4.4,
      features: ['Family Package', 'Comprehensive Care', 'Maternity', 'Pediatric Care', 'Emergency'],
      popular: false
    },
    {
      name: 'Mutual Benefits Assurance',
      type: 'Health Plus',
      monthlyPremium: '₦14,000',
      coverage: '₦4,000,000',
      rating: 3.9,
      features: ['Health Plus Benefits', 'Maternity', 'Surgery', 'Emergency', 'Outpatient'],
      popular: false
    },
    {
      name: 'Consolidated Hallmark Insurance',
      type: 'Secure Health',
      monthlyPremium: '₦16,000',
      coverage: '₦6,000,000',
      rating: 4.1,
      features: ['Secure Coverage', 'Maternity Care', 'Emergency', 'Surgery', 'Specialist'],
      popular: false
    },
    {
      name: 'Universal Insurance',
      type: 'Universal Care',
      monthlyPremium: '₦11,000',
      coverage: '₦3,000,000',
      rating: 3.8,
      features: ['Universal Coverage', 'Basic Care', 'Maternity', 'Emergency', 'Consultation'],
      popular: false
    },
    {
      name: 'Goldlink Insurance',
      type: 'Gold Health Plan',
      monthlyPremium: '₦22,000',
      coverage: '₦8,500,000',
      rating: 4.3,
      features: ['Gold Standard', 'Comprehensive Maternity', 'Surgery', 'Emergency', 'Dental'],
      popular: false
    },
    {
      name: 'Prestige Assurance',
      type: 'Prestige Health',
      monthlyPremium: '₦19,000',
      coverage: '₦7,000,000',
      rating: 4.2,
      features: ['Prestige Care', 'Maternity Package', 'Private Hospitals', 'Emergency', 'Specialist'],
      popular: false
    },
    {
      name: 'Lasaco Assurance',
      type: 'Complete Health',
      monthlyPremium: '₦13,000',
      coverage: '₦4,500,000',
      rating: 4.0,
      features: ['Complete Coverage', 'Maternity', 'Surgery', 'Emergency', 'Outpatient'],
      popular: false
    },
    {
      name: 'Law Union & Rock Insurance',
      type: 'Rock Solid Health',
      monthlyPremium: '₦17,000',
      coverage: '₦6,500,000',
      rating: 4.1,
      features: ['Solid Coverage', 'Maternity Care', 'Emergency', 'Surgery', 'Prescription'],
      popular: false
    },
    {
      name: 'WAPIC Insurance',
      type: 'Comprehensive Care',
      monthlyPremium: '₦20,000',
      coverage: '₦8,000,000',
      rating: 4.2,
      features: ['West African Coverage', 'Maternity', 'Surgery', 'Emergency', 'International'],
      popular: false
    },
    {
      name: 'Guinea Insurance',
      type: 'Total Health',
      monthlyPremium: '₦15,500',
      coverage: '₦5,500,000',
      rating: 3.9,
      features: ['Total Care', 'Maternity Package', 'Emergency', 'Surgery', 'Outpatient'],
      popular: false
    },
    {
      name: 'Standard Alliance Insurance',
      type: 'Alliance Health',
      monthlyPremium: '₦21,000',
      coverage: '₦9,000,000',
      rating: 4.3,
      features: ['Alliance Benefits', 'Premium Maternity', 'Surgery', 'Emergency', 'Specialist'],
      popular: false
    },
    {
      name: 'Great Nigerian Insurance',
      type: 'Great Health Plan',
      monthlyPremium: '₦18,500',
      coverage: '₦7,200,000',
      rating: 4.0,
      features: ['Great Coverage', 'Maternity Care', 'Emergency', 'Surgery', 'Consultation'],
      popular: false
    },
    {
      name: 'Staco Insurance',
      type: 'Staco Health Plus',
      monthlyPremium: '₦16,500',
      coverage: '₦6,200,000',
      rating: 3.8,
      features: ['Health Plus', 'Maternity', 'Emergency', 'Basic Surgery', 'Outpatient'],
      popular: false
    },
    {
      name: 'Zenith General Insurance',
      type: 'Zenith Health',
      monthlyPremium: '₦24,000',
      coverage: '₦11,000,000',
      rating: 4.5,
      features: ['Zenith Standard', 'Premium Maternity', 'Surgery', 'Emergency', 'International Care'],
      popular: true
    },
    {
      name: 'Royal Exchange Assurance',
      type: 'Royal Health',
      monthlyPremium: '₦23,000',
      coverage: '₦10,500,000',
      rating: 4.4,
      features: ['Royal Treatment', 'Comprehensive Maternity', 'Surgery', 'Emergency', 'Private Care'],
      popular: false
    }
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
              Find the perfect health insurance plan for you and your family, with special focus on maternal care
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
              <Card key={index} className="hover:shadow-lg transition-shadow relative border-l-4 border-l-teal-500">
                {plan.popular && (
                  <Badge className="absolute -top-3 left-4 bg-emerald-600">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Shield className="h-8 w-8 text-teal-600" />
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
                    <div className="text-2xl font-bold text-teal-600">{plan.monthlyPremium}</div>
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
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
            <div className="text-center">
              <Users className="h-12 w-12 text-teal-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Need Help Choosing the Right Plan?
              </h2>
              <p className="text-gray-600 mb-6">
                Our healthcare experts are here to help you find the perfect insurance plan for your maternal care needs
              </p>
              <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
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
