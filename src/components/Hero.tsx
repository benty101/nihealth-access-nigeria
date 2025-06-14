
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Search, Calendar, FileText, Shield, CheckCircle, Stethoscope, Pill, TestTube, CreditCard, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    console.log('Get Started clicked');
    // Check if user has completed onboarding
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    
    if (onboardingCompleted) {
      navigate('/dashboard');
    } else {
      navigate('/onboarding');
    }
  };

  const handleExploreServices = () => {
    console.log('Explore Services clicked');
    // Scroll to services section
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Main Hero Section */}
      <div className="bg-gradient-to-br from-teal-50 via-white to-emerald-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800 text-sm font-medium mb-8 shadow-sm animate-fade-in hover:shadow-md transition-all duration-300">
              <Shield className="h-4 w-4 mr-2 animate-pulse" />
              🇳🇬 In Partnership with Ministry of Science and Technology
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in animation-delay-200">
              Your Complete{' '}
              <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent hover:from-emerald-600 hover:to-teal-600 transition-all duration-500">
                Healthcare Companion
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-400">
              Find hospitals, compare insurance, book appointments, buy medications, schedule lab tests, 
              and manage your health records — all in one secure platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in animation-delay-600">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
              >
                <Heart className="mr-2 h-5 w-5 animate-pulse" />
                Get Started Free
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleExploreServices}
                className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 transform hover:border-teal-700"
              >
                <Search className="mr-2 h-5 w-5" />
                Explore Services
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600 animate-fade-in animation-delay-800">
              <div className="flex items-center hover:text-emerald-600 transition-colors duration-300">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 hover:scale-110 transition-transform duration-300" />
                500+ Verified Hospitals
              </div>
              <div className="flex items-center hover:text-teal-600 transition-colors duration-300">
                <Shield className="h-5 w-5 text-teal-500 mr-2 hover:scale-110 transition-transform duration-300" />
                Bank-Level Security
              </div>
              <div className="flex items-center hover:text-emerald-600 transition-colors duration-300">
                <Users className="h-5 w-5 text-emerald-500 mr-2 hover:scale-110 transition-transform duration-300" />
                15,000+ Happy Users
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Overview Section */}
      <div id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Comprehensive Healthcare Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in animation-delay-200">
              Everything you need for complete healthcare management in one platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Hospital Directory */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-teal-100 hover:shadow-2xl hover:border-teal-300 transition-all duration-500 hover:-translate-y-3 transform animate-fade-in animation-delay-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
                <Stethoscope className="h-8 w-8 text-blue-600 group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center group-hover:text-blue-600 transition-colors duration-300">Hospital Directory</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Find and compare hospitals, read reviews, check facilities, and get directions to quality healthcare providers near you.
              </p>
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleServiceNavigation('/hospitals')}
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-300"
                >
                  Browse Hospitals
                </Button>
              </div>
            </div>
            
            {/* Insurance Plans */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-emerald-100 hover:shadow-2xl hover:border-emerald-300 transition-all duration-500 hover:-translate-y-3 transform animate-fade-in animation-delay-400">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
                <Shield className="h-8 w-8 text-emerald-600 group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center group-hover:text-emerald-600 transition-colors duration-300">Insurance Plans</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Compare health insurance plans, check coverage details, and find the best plan for you and your family.
              </p>
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleServiceNavigation('/insurance')}
                  className="text-emerald-600 border-emerald-600 hover:bg-emerald-50 hover:scale-105 transition-all duration-300"
                >
                  Compare Plans
                </Button>
              </div>
            </div>

            {/* Appointments */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-2xl hover:border-purple-300 transition-all duration-500 hover:-translate-y-3 transform animate-fade-in animation-delay-500">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
                <Calendar className="h-8 w-8 text-purple-600 group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center group-hover:text-purple-600 transition-colors duration-300">Book Appointments</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Schedule appointments with doctors, specialists, and healthcare providers with real-time availability.
              </p>
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleServiceNavigation('/appointments')}
                  className="text-purple-600 border-purple-600 hover:bg-purple-50 hover:scale-105 transition-all duration-300"
                >
                  Book Now
                </Button>
              </div>
            </div>

            {/* Pharmacy */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-2xl hover:border-green-300 transition-all duration-500 hover:-translate-y-3 transform animate-fade-in animation-delay-600">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
                <Pill className="h-8 w-8 text-green-600 group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center group-hover:text-green-600 transition-colors duration-300">Online Pharmacy</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Order genuine medications online with prescription upload, home delivery, and medication reminders.
              </p>
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleServiceNavigation('/pharmacy')}
                  className="text-green-600 border-green-600 hover:bg-green-50 hover:scale-105 transition-all duration-300"
                >
                  Shop Medicines
                </Button>
              </div>
            </div>

            {/* Lab Tests */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-orange-100 hover:shadow-2xl hover:border-orange-300 transition-all duration-500 hover:-translate-y-3 transform animate-fade-in animation-delay-700">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
                <TestTube className="h-8 w-8 text-orange-600 group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center group-hover:text-orange-600 transition-colors duration-300">Lab Tests</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Book lab tests, diagnostic screenings, and health checkups with certified laboratories nationwide.
              </p>
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleServiceNavigation('/labs')}
                  className="text-orange-600 border-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-300"
                >
                  Book Tests
                </Button>
              </div>
            </div>

            {/* Health Records */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-teal-100 hover:shadow-2xl hover:border-teal-300 transition-all duration-500 hover:-translate-y-3 transform animate-fade-in animation-delay-800">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
                <FileText className="h-8 w-8 text-teal-600 group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center group-hover:text-teal-600 transition-colors duration-300">Health Records</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Securely store and manage your medical records, test results, prescriptions, and health history.
              </p>
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleServiceNavigation('/records')}
                  className="text-teal-600 border-teal-600 hover:bg-teal-50 hover:scale-105 transition-all duration-300"
                >
                  Manage Records
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-emerald-600/20 animate-pulse"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-teal-100 mb-8 animate-fade-in animation-delay-200">
            Join thousands of Nigerians who trust MeddyPal for their complete healthcare needs
          </p>
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            className="bg-white text-teal-600 hover:bg-gray-50 px-12 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform animate-fade-in animation-delay-400"
          >
            <Heart className="mr-2 h-5 w-5 animate-pulse" />
            Start Your Health Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
