
import React from 'react';
import { Link } from 'react-router-dom';

const AuthHeader = () => {
  return (
    <div className="text-center mb-8">
      <Link to="/" className="inline-flex items-center justify-center group mb-6">
        <img 
          src="/lovable-uploads/10127ee6-d124-458d-8a4a-ce0ea3f94d41.png" 
          alt="MeddyPal Logo" 
          className="h-12 object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to MeddyPal</h1>
      <p className="text-gray-600">Your trusted maternal health companion in Nigeria</p>
    </div>
  );
};

export default AuthHeader;
