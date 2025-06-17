
import React from 'react';
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <img 
        src="/lovable-uploads/10127ee6-d124-458d-8a4a-ce0ea3f94d41.png" 
        alt="MeddyPal Logo" 
        className="h-8 object-contain group-hover:scale-110 transition-transform duration-300"
      />
    </Link>
  );
};

export default NavLogo;
