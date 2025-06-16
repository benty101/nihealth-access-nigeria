
import React from 'react';
import Navbar from '@/components/Navbar';
import { Shield, Calendar, Heart, Baby, Stethoscope, Syringe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Pediatric = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Child Health & Vaccination
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive pediatric care and vaccination services for your child's healthy development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Baby className="h-5 w-5 text-blue-600" />
                Well-Child Visits
              </CardTitle>
              <CardDescription>
                Regular check-ups to monitor your child's growth and development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Schedule Check-up</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Syringe className="h-5 w-5 text-green-600" />
                Vaccination Schedule
              </CardTitle>
              <CardDescription>
                Keep track of immunizations and upcoming vaccines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Schedule</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-purple-600" />
                Pediatric Specialists
              </CardTitle>
              <CardDescription>
                Connect with certified pediatricians and specialists
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Find Specialist</Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Vaccination Timeline</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Birth - 2 months</h3>
                <p className="text-gray-600">Hepatitis B, DTaP, Hib, PCV, IPV, Rotavirus</p>
              </div>
              <Button variant="outline">Learn More</Button>
            </div>
            
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">4 - 6 months</h3>
                <p className="text-gray-600">DTaP, Hib, PCV, IPV, Rotavirus</p>
              </div>
              <Button variant="outline">Learn More</Button>
            </div>

            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">12 - 15 months</h3>
                <p className="text-gray-600">MMR, Varicella, Hepatitis A</p>
              </div>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pediatric;
