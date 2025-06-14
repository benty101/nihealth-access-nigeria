
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Search, Calendar, FileText, Shield, CheckCircle, Star, Users, Stethoscope } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Main Hero Section */}
      <div className="bg-gradient-to-br from-teal-50 via-white to-emerald-50 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800 text-sm font-medium mb-8 shadow-sm">
              <Shield className="h-4 w-4 mr-2" />
              🇳🇬 Proudly Nigerian • In Partnership with Ministry of Sci & Tech
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Quality Healthcare{' '}
              <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                for Every Mother
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-6 max-w-4xl mx-auto leading-relaxed">
              Find trusted hospitals, compare health plans, and manage your wellness journey. 
              Starting with comprehensive maternal care across Nigeria.
            </p>
            
            <p className="text-lg text-teal-700 font-semibold mb-12 max-w-3xl mx-auto">
              🤱 Reducing maternal mortality through accessible, quality healthcare
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Heart className="mr-2 h-5 w-5" />
                Find Maternal Care
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-4 text-lg rounded-full transition-all duration-300">
                <Search className="mr-2 h-5 w-5" />
                Explore Hospitals
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600 mb-16">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
                Verified Healthcare Providers
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-teal-500 mr-2" />
                NDPR Compliant & Secure
              </div>
              <div className="flex items-center">
                <Stethoscope className="h-5 w-5 text-emerald-500 mr-2" />
                Comprehensive Care Network
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Maternal Healthcare Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for a safe and healthy pregnancy journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-teal-100 hover:shadow-2xl hover:border-teal-300 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Search className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Find Maternal Hospitals</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Discover verified hospitals with excellent maternal care, NHIS coverage, and real patient reviews
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-emerald-100 hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Book Antenatal Care</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Schedule appointments for scans, checkups, and delivery with instant confirmation and reminders
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-teal-100 hover:shadow-2xl hover:border-teal-300 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Health Records Vault</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Securely store and share your pregnancy records, scans, and documents with healthcare providers
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-emerald-100 hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Insurance Coverage</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Compare and find the best maternal health insurance plans with transparent pricing and coverage
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats Section */}
      <div className="py-20 bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Making a Difference Together</h2>
            <p className="text-teal-100 text-lg">Working to reduce maternal mortality across Nigeria</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-teal-100">Maternal Care Hospitals</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-teal-100">Insurance Partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-teal-100">Mothers Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">36</div>
              <div className="text-teal-100">States Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-teal-50 to-emerald-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Shield className="h-16 w-16 text-teal-600 mx-auto mb-6" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Your Journey to Safe Motherhood Starts Here
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of Nigerian mothers who trust MeddyPal for their healthcare journey
          </p>
          <Button size="lg" className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-12 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            <Heart className="mr-2 h-5 w-5" />
            Start Your Journey Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
