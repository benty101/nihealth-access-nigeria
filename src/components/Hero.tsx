
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Search, Calendar, FileText, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Health Journey,{' '}
            <span className="text-blue-600">Simplified</span>
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Access verified hospitals, book appointments, manage health records, and compare insurance plans. 
          </p>
          <p className="text-lg text-blue-700 font-medium mb-8 max-w-2xl mx-auto">
            🤱 Starting with comprehensive support for expectant mothers across Nigeria
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Heart className="mr-2 h-5 w-5" />
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              <Search className="mr-2 h-5 w-5" />
              Find Hospitals
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-pink-400">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Find Hospitals</h3>
              <p className="text-gray-600">Discover maternal-friendly hospitals with verified services</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-400">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Book Antenatal Care</h3>
              <p className="text-gray-600">Schedule appointments for scans, checkups, and delivery</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-400">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Health Records</h3>
              <p className="text-gray-600">Securely store and share your medical documents</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-400">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Compare Insurance</h3>
              <p className="text-gray-600">Find the best maternity and family health coverage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
