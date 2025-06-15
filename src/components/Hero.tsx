import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Search, Calendar, FileText, Shield, CheckCircle, Stethoscope, Pill, TestTube, CreditCard, Users, Star, Baby, UserCheck } from 'lucide-react';
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
              <Shield className="h-4 w-4 mr-2" />
              🇳🇬 In Partnership with the Ministry
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in animation-delay-200">
              Your Complete{' '}
              <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent hover:from-emerald-600 hover:to-teal-600 transition-all duration-500">
                Maternal & Child Health
              </span>{' '}
              Companion
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-400">
              Comprehensive healthcare for mothers and children - find specialized hospitals, 
              compare maternal insurance, book antenatal appointments, access child vaccinations, 
              and manage family health records securely.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in animation-delay-600">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
              >
                <Baby className="mr-2 h-5 w-5" />
                Start Your Journey
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
              <div className="flex items-center hover:text-teal-600 transition-colors duration-300">
                <CheckCircle className="h-5 w-5 text-teal-500 mr-2 hover:scale-110 transition-transform duration-300" />
                500+ Maternal Care Centers
              </div>
              <div className="flex items-center hover:text-teal-600 transition-colors duration-300">
                <Shield className="h-5 w-5 text-teal-500 mr-2 hover:scale-110 transition-transform duration-300" />
                Government Approved
              </div>
              <div className="flex items-center hover:text-teal-600 transition-colors duration-300">
                <Users className="h-5 w-5 text-teal-500 mr-2 hover:scale-110 transition-transform duration-300" />
                15,000+ Mothers & Children
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
              Specialized Maternal & Child Healthcare Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in animation-delay-200">
              Everything mothers and children need for comprehensive healthcare management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Maternal Care */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-teal-200 transition-all duration-500 hover:-translate-y-3 transform animate-fade-in animation-delay-300">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Baby className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center group-hover:text-teal-600 transition-colors duration-300">Maternal Care</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Comprehensive antenatal care, delivery services, postnatal support, and maternal health monitoring.
              </p>
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleServiceNavigation('/hospitals')}
                  className="text-teal-600 border-teal-600 hover:bg-teal-50 hover:scale-105 transition-all duration-300"
                >
                  Find Maternal Care
                </Button>
              </div>
            </div>

            {/* Child Health & Vaccinations */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 hover:-translate-y-3 transform animate-fade-in animation-delay-400">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <UserCheck className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center group-hover:text-emerald-600 transition-colors duration-300">Child Health & Vaccinations</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Pediatric care, immunization schedules, growth monitoring, and child development tracking.
              </p>
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleServiceNavigation('/pediatric')}
                  className="text-emerald-600 border-emerald-600 hover:bg-emerald-50 hover:scale-105 transition-all duration-300"
                >
                  Book Vaccination
                </Button>
              </div>
            </div>
            
            {/* Family Insurance */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-teal-200 transition-all duration-500 hover:-translate-y-3 transform animate-fade-in animation-delay-500">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center group-hover:text-teal-600 transition-colors duration-300">Maternal & Family Insurance</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Specialized insurance plans covering pregnancy, childbirth, child health, and family wellness.
              </p>
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleServiceNavigation('/insurance')}
                  className="text-teal-600 border-teal-600 hover:bg-teal-50 hover:scale-105 transition-all duration-300"
                >
                  Compare Plans
                </Button>
              </div>
            </div>

            {/* Specialist Appointments */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 hover:-translate-y-3 transform animate-fade-in animation-delay-600">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center group-hover:text-emerald-600 transition-colors duration-300">Specialist Appointments</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Book with obstetricians, pediatricians, lactation consultants, and child development specialists.
              </p>
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleServiceNavigation('/appointments')}
                  className="text-emerald-600 border-emerald-600 hover:bg-emerald-50 hover:scale-105 transition-all duration-300"
                >
                  Book Now
                </Button>
              </div>
            </div>

            {/* Pharmacy & Supplements */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-teal-200 transition-all duration-500 hover:-translate-y-3 transform animate-fade-in animation-delay-700">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Pill className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center group-hover:text-teal-600 transition-colors duration-300">Maternal & Child Pharmacy</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Prenatal vitamins, children's medications, baby formula, and health supplements with delivery.
              </p>
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleServiceNavigation('/pharmacy')}
                  className="text-teal-600 border-teal-600 hover:bg-teal-50 hover:scale-105 transition-all duration-300"
                >
                  Shop Now
                </Button>
              </div>
            </div>

            {/* Health Records */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 hover:-translate-y-3 transform animate-fade-in animation-delay-800">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center group-hover:text-emerald-600 transition-colors duration-300">Family Health Records</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Secure storage for pregnancy records, child immunization cards, growth charts, and family medical history.
              </p>
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleServiceNavigation('/records')}
                  className="text-emerald-600 border-emerald-600 hover:bg-emerald-50 hover:scale-105 transition-all duration-300"
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
            Empowering Mothers and Children Across Nigeria
          </h2>
          <p className="text-xl text-teal-100 mb-8 animate-fade-in animation-delay-200">
            Join thousands of families who trust MeddyPal for comprehensive maternal and child healthcare
          </p>
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            className="bg-white text-teal-600 hover:bg-gray-50 px-12 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform animate-fade-in animation-delay-400"
          >
            <Baby className="mr-2 h-5 w-5" />
            Start Your Family's Health Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
