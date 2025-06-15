
import React from 'react';
import { Link } from 'react-router-dom';

const AuthFooter = () => {
  return (
    <>
      <div className="mt-6 text-center">
        <Link to="/" className="text-sm text-teal-600 hover:text-teal-700">
          ← Back to Home
        </Link>
      </div>

      <div className="mt-6 text-center text-xs text-gray-500">
        <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
        <p className="mt-1">🇳🇬 Proudly serving Nigerian mothers and families</p>
      </div>
    </>
  );
};

export default AuthFooter;
