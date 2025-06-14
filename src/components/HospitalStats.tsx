
import React from 'react';
import { Shield, Award, Users } from 'lucide-react';

const HospitalStats = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Hospital Directory
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Find and compare over 500+ verified hospitals across Nigeria
      </p>
      <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
        <div className="flex items-center">
          <Shield className="h-4 w-4 mr-2 text-green-600" />
          500+ Verified hospitals
        </div>
        <div className="flex items-center">
          <Award className="h-4 w-4 mr-2 text-blue-600" />
          Accredited medical centers
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2 text-purple-600" />
          Real patient reviews
        </div>
      </div>
    </div>
  );
};

export default HospitalStats;
