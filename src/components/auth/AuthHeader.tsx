
import React from 'react';
import { Link } from 'react-router-dom';
import MeddyPalLogo from '@/components/ui/MeddyPalLogo';

const AuthHeader = () => {
  return (
    <div className="text-center mb-8">
      <Link to="/" className="inline-flex items-center justify-center group mb-6">
        <div className="group-hover:scale-110 transition-transform duration-300">
          <MeddyPalLogo size="lg" showText={true} />
        </div>
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to MeddyPal</h1>
      <p className="text-gray-600">Your trusted maternal health companion in Nigeria</p>
    </div>
  );
};

export default AuthHeader;
