
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

const InsuranceHelpSection = () => {
  return (
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
  );
};

export default InsuranceHelpSection;
