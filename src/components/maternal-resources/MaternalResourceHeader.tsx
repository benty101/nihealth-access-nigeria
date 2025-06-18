
import React from 'react';
import { Heart, Baby, Shield } from 'lucide-react';

const MaternalResourceHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center items-center mb-4">
        <div className="flex space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Heart className="h-4 w-4 text-white" />
          </div>
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Baby className="h-4 w-4 text-white" />
          </div>
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Maternal & Child Health Resources
      </h1>
      
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Access comprehensive resources and expert guidance for motherhood and child wellness in Nigeria.
      </p>
    </div>
  );
};

export default MaternalResourceHeader;
