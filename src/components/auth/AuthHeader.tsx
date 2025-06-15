
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const AuthHeader = () => {
  return (
    <div className="text-center mb-8">
      <Link to="/" className="inline-flex items-center space-x-3 group mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Shield className="h-7 w-7 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            MeddyPal
          </span>
          <span className="text-xs text-gray-500 -mt-1">Your Health Companion</span>
        </div>
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to MeddyPal</h1>
      <p className="text-gray-600">Your trusted maternal health companion in Nigeria</p>
    </div>
  );
};

export default AuthHeader;
