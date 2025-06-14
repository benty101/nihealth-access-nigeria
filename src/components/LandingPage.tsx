
import React from 'react';
import Hero from './Hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Quote, CheckCircle, ArrowRight, Heart, Baby, Users, Shield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Testimonials Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stories from Nigerian Mothers
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from mothers who trusted MeddyPal for their journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-pink-50 to-rose-100 border-pink-200 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-pink-400" />
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 italic">
                  "MeddyPal connected me to the perfect hospital for my delivery in Lagos. 
                  The antenatal booking was seamless, and I felt confident throughout my pregnancy journey."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">A</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Adaeze Okwu</p>
                    <p className="text-sm text-gray-600">New Mother, Lagos State</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-indigo-100 border-purple-200 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-purple-400" />
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 italic">
                  "Finding maternity insurance that actually covers what I needed was impossible until I used MeddyPal. 
                  Saved my family over ₦300,000 on pregnancy care!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">C</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Chioma Adeleke</p>
                    <p className="text-sm text-gray-600">Mother of 2, Abuja FCT</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-green-400" />
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 italic">
                  "Having all my pregnancy records stored securely made hospital visits stress-free. 
                  The doctors could access my complete history instantly during delivery."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">F</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Fatima Musa</p>
                    <p className="text-sm text-gray-600">First-time Mother, Kano State</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Maternal Care Journey in 3 Steps
            </h2>
            <p className="text-xl text-gray-600">
              From pregnancy to delivery, we're with you every step of the way
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center relative">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Create Your Profile</h3>
              <p className="text-gray-600 leading-relaxed">
                Join MeddyPal and tell us about your pregnancy journey. Get personalized 
                recommendations for hospitals and care plans tailored to your needs.
              </p>
              {/* Connection line for desktop */}
              <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-pink-300"></div>
            </div>

            <div className="text-center relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Find & Book Care</h3>
              <p className="text-gray-600 leading-relaxed">
                Search verified maternal-friendly hospitals, compare insurance plans, 
                and book your antenatal appointments with instant confirmation.
              </p>
              {/* Connection line for desktop */}
              <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-purple-300"></div>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Track Your Journey</h3>
              <p className="text-gray-600 leading-relaxed">
                Store your health records securely, track appointments, and access 
                expert resources. Everything you need for a healthy pregnancy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MAMA Funds Partnership Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8 text-center">
            <Baby className="h-16 w-16 text-pink-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Proudly Supported by MAMA Funds
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              Our mission to reduce maternal mortality in Nigeria is powered by the Maternal Mortality 
              Action (MAMA) Funds, ensuring every mother has access to quality healthcare.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-center justify-center">
                <Heart className="h-6 w-6 text-pink-500 mr-2" />
                <span className="text-gray-700 font-medium">Reducing Maternal Deaths</span>
              </div>
              <div className="flex items-center justify-center">
                <Shield className="h-6 w-6 text-purple-500 mr-2" />
                <span className="text-gray-700 font-medium">Evidence-Based Care</span>
              </div>
              <div className="flex items-center justify-center">
                <Users className="h-6 w-6 text-green-500 mr-2" />
                <span className="text-gray-700 font-medium">Community Impact</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Logos Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 mb-8">Trusted by leading healthcare institutions across Nigeria</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            <div className="bg-white h-16 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-gray-500 font-semibold">Federal Ministry</span>
            </div>
            <div className="bg-white h-16 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-gray-500 font-semibold">NHIS</span>
            </div>
            <div className="bg-white h-16 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-gray-500 font-semibold">UCH Ibadan</span>
            </div>
            <div className="bg-white h-16 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-gray-500 font-semibold">LUTH Lagos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
