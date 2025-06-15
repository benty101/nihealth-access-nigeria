
import React from 'react';
import { Link } from 'react-router-dom';

const AuthFooter = () => {
  return (
    <>
      <div className="mt-6 text-center">
        <Link to="/" className="text-sm text-teal-600 hover:text-teal-700 transition-colors">
          ← Back to Home
        </Link>
      </div>

      <div className="mt-8 text-center space-y-3">
        <p className="text-xs text-gray-500 leading-relaxed">
          By signing up, you agree to our{' '}
          <span className="text-teal-600 hover:text-teal-700 cursor-pointer underline">
            Terms of Service
          </span>{' '}
          and{' '}
          <span className="text-teal-600 hover:text-teal-700 cursor-pointer underline">
            Privacy Policy
          </span>
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
          <span className="text-base">🇳🇬</span>
          <span className="font-medium">Proudly Nigerian • MeddyPal © 2025</span>
        </div>
      </div>
    </>
  );
};

export default AuthFooter;
