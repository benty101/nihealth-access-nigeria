
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Heart className="h-5 w-5 text-white animate-heartbeat" />
      </div>
      <span className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">MeddyPal</span>
    </Link>
  );
};

export default NavLogo;
