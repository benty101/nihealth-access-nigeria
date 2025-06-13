
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Search, Calendar } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Health,{' '}
            <span className="text-blue-600">Our Priority</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Access quality healthcare across Nigeria. Compare insurance plans, book appointments, 
            order medicines, and take control of your health journey with HealthNG.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Heart className="mr-2 h-5 w-5" />
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              <Search className="mr-2 h-5 w-5" />
              Find Insurance
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Compare Insurance</h3>
              <p className="text-gray-600">Find and compare the best health insurance plans across Nigeria</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Book Appointments</h3>
              <p className="text-gray-600">Schedule appointments with qualified healthcare providers</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Health Tracking</h3>
              <p className="text-gray-600">Monitor your health metrics and stay on top of your wellness</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
