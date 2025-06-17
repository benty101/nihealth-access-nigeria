
import React from 'react';
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <img 
          src="/lovable-uploads/87e393a1-4869-4371-b75d-59d622c5b833.png" 
          alt="MeddyPal Logo" 
          className="h-6 w-6 object-contain"
        />
      </div>
      <span className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">MeddyPal</span>
    </Link>
  );
};

export default NavLogo;
