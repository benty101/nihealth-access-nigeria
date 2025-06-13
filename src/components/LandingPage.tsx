
import React from 'react';
import Hero from './Hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Quote, CheckCircle, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Testimonials Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from Nigerian mothers and families
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
              <CardHeader>
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-pink-400" />
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  "MeddyPal helped me find the perfect hospital for my delivery in Lagos. 
                  The booking process was so smooth, and I felt confident about my choice."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-pink-300 rounded-full flex items-center justify-center mr-3">
                    <span className="text-pink-800 font-semibold">A</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Adaeze O.</p>
                    <p className="text-sm text-gray-600">New Mother, Lagos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-blue-400" />
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  "The insurance comparison feature saved me over ₦200,000 on my family's 
                  health coverage. I wish I had found this platform earlier!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-800 font-semibold">C</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Chioma A.</p>
                    <p className="text-sm text-gray-600">Mother of 3, Abuja</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-green-400" />
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  "Having all my pregnancy records in one place made my hospital visits 
                  so much easier. The doctors could access everything instantly."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-300 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-800 font-semibold">F</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Fatima M.</p>
                    <p className="text-sm text-gray-600">Expectant Mother, Kano</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How MeddyPal Works
            </h2>
            <p className="text-xl text-gray-600">
              Your healthcare journey in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Sign Up & Create Profile</h3>
              <p className="text-gray-600 leading-relaxed">
                Create your account and set up your health profile. Tell us if you're pregnant 
                to get personalized recommendations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Explore & Book</h3>
              <p className="text-gray-600 leading-relaxed">
                Search hospitals, compare insurance plans, and book appointments. 
                Everything is verified and trusted.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Manage Your Health</h3>
              <p className="text-gray-600 leading-relaxed">
                Store your records, track appointments, and access resources. 
                Your health journey, all in one place.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 mb-8">Trusted by leading healthcare institutions across Nigeria</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            <div className="bg-gray-100 h-16 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-semibold">Federal Ministry</span>
            </div>
            <div className="bg-gray-100 h-16 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-semibold">NHIS</span>
            </div>
            <div className="bg-gray-100 h-16 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-semibold">UCH Ibadan</span>
            </div>
            <div className="bg-gray-100 h-16 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-semibold">LUTH Lagos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
