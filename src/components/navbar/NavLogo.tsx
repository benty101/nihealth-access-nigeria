
import React from 'react';
import { Link } from 'react-router-dom';
import MeddyPalLogo from '@/components/ui/MeddyPalLogo';

const NavLogo = () => {
  return (
    <Link to="/" className="group">
      <div className="group-hover:scale-110 transition-transform duration-300">
        <MeddyPalLogo size="md" showText={true} />
      </div>
    </Link>
  );
};

export default NavLogo;
