
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Phone, MessageCircle, Calendar, Award, Shield } from 'lucide-react';

const InsuranceHelpSection = () => {
  return (
    <div className="mt-20">
      <div className="bg-gradient-to-br from-teal-50 via-white to-emerald-50 rounded-2xl shadow-lg border border-teal-100 overflow-hidden">
        <div className="p-8 lg:p-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Need Help Choosing the Perfect Plan?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our certified healthcare insurance experts are standing by to help you navigate 
              your options and find the ideal coverage for your maternal care and family health needs.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <Phone className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                <div className="font-medium text-gray-900">Free Consultation</div>
                <div className="text-sm text-gray-600">Expert guidance at no cost</div>
              </div>
              <div className="text-center p-4">
                <Award className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                <div className="font-medium text-gray-900">Certified Advisors</div>
                <div className="text-sm text-gray-600">Licensed insurance professionals</div>
              </div>
              <div className="text-center p-4">
                <Shield className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                <div className="font-medium text-gray-900">Personalized Match</div>
                <div className="text-sm text-gray-600">Plans tailored to your needs</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl shadow-lg font-medium"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Expert Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-teal-200 text-teal-700 hover:bg-teal-50 px-8 py-3 rounded-xl font-medium"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Live Chat Support
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-teal-200 text-teal-700 hover:bg-teal-50 px-8 py-3 rounded-xl font-medium"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceHelpSection;
