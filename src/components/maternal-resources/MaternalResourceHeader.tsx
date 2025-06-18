
import React from 'react';
import { Heart, Baby, Shield, Sparkles } from 'lucide-react';

const MaternalResourceHeader = () => {
  return (
    <div className="text-center mb-12 relative">
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-96 h-96 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-center items-center mb-6">
          <div className="flex space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
              <Baby className="h-6 w-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Maternal & Child Health Hub
        </h1>
        
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
          <p className="text-xl text-gray-700 font-medium">
            Your Complete Guide to Motherhood & Child Wellness in Nigeria
          </p>
          <Sparkles className="h-5 w-5 text-yellow-500 ml-2" />
        </div>
        
        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
          From conception to childhood, access evidence-based resources, expert guidance, 
          and real-time health information curated specifically for Nigerian mothers and families.
        </p>
        
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Official Guidelines
          </span>
          <span className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Expert-Verified Content
          </span>
          <span className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            Nigerian Context
          </span>
          <span className="flex items-center">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
            Real-Time Updates
          </span>
        </div>
      </div>
    </div>
  );
};

export default MaternalResourceHeader;
