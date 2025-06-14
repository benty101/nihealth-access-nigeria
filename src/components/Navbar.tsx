
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Menu, X, User, Bell, Shield, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();

  const publicNavItems = [
    { name: 'Hospitals', path: '/hospitals' },
    { name: 'Insurance', path: '/insurance' },
    { name: 'Pharmacy', path: '/pharmacy' },
    { name: 'Labs', path: '/labs' },
    { name: 'Resources', path: '/resources' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-teal-100 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-float">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  MeddyPal
                </span>
                <span className="text-xs text-gray-500 -mt-1">Your Health Companion</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              // Authenticated navigation
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-scale animate-fade-in ${
                  location.pathname === '/dashboard'
                    ? 'text-teal-600 bg-teal-50 shadow-sm'
                    : 'text-gray-700 hover:text-teal-600 hover:bg-teal-50'
                }`}
              >
                Dashboard
              </Link>
            ) : (
              // Public navigation
              publicNavItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-scale animate-fade-in ${
                    location.pathname === item.path
                      ? 'text-teal-600 bg-teal-50 shadow-sm'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-teal-50'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                </Link>
              ))
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user && !loading ? (
              <>
                <Button variant="ghost" size="sm" className="relative hover:bg-teal-50 hover-scale animate-fade-in">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-teal-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">
                    3
                  </span>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-teal-50 hover-scale animate-fade-in animation-delay-200">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center animate-float">
                        <span className="text-white text-sm font-semibold">
                          {getUserInitials(user.email || 'U')}
                        </span>
                      </div>
                      <span className="text-gray-700">Profile</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/records')}>
                      <Heart className="mr-2 h-4 w-4" />
                      Medical Records
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="border-teal-200 text-teal-600 hover:bg-teal-50 hover-scale animate-fade-in animation-delay-300">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm" className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in animation-delay-400">
                    Get Started Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-teal-600 p-2 rounded-lg hover:bg-teal-50 transition-colors hover-scale"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-teal-100 animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
              {user ? (
                <Link
                  to="/dashboard"
                  className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === '/dashboard'
                      ? 'text-teal-600 bg-teal-50'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-teal-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                publicNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'text-teal-600 bg-teal-50'
                        : 'text-gray-700 hover:text-teal-600 hover:bg-teal-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))
              )}
              
              <div className="pt-4 flex flex-col space-y-3">
                {user ? (
                  <>
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {getUserInitials(user.email || 'U')}
                        </span>
                      </div>
                      <span className="text-gray-700 font-medium">{user.email}</span>
                    </div>
                    <Button 
                      onClick={handleSignOut}
                      variant="outline" 
                      size="sm" 
                      className="mx-3 justify-start"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full border-teal-200 text-teal-600 hover:bg-teal-50">
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button size="sm" className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white">
                        Get Started Free
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
