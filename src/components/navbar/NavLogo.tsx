
import React from 'react';
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <img 
          src="/lovable-uploads/b338576a-efeb-4e88-a722-09cb89444671.png" 
          alt="MeddyPal Logo" 
          className="h-6 w-6 object-contain"
        />
      </div>
      <span className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">MeddyPal</span>
    </Link>
  );
};

export default NavLogo;
