
import React from 'react';
import { Shield, Heart, Users, Award, CheckCircle, Star } from 'lucide-react';

const TrustIndicators = () => {
  const trustStats = [
    {
      icon: Shield,
      number: "500+",
      label: "Verified Hospitals",
      description: "Ministry of Health approved facilities"
    },
    {
      icon: Users,
      number: "15,000+",
      label: "Happy Mothers",
      description: "Trusting us with their family's health"
    },
    {
      icon: Heart,
      number: "50,000+",
      label: "Appointments Booked",
      description: "Successful healthcare connections"
    },
    {
      icon: Award,
      number: "99.9%",
      label: "Uptime Guaranteed",
      description: "Always available when you need us"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-teal-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white shadow-sm border border-emerald-200 text-emerald-800 text-sm font-medium mb-6 animate-gentle-bounce">
            <Shield className="h-4 w-4 mr-2 animate-pulse" />
            🇳🇬 Proudly Nigerian • Ministry of Health Approved
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Mothers Choose <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">MeddyPal</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted healthcare platform designed specifically for Nigerian families
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={stat.label}
                className="text-center group animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-all duration-300 animate-float">
                  <IconComponent className="h-8 w-8 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-teal-600 mb-2 animate-heartbeat">
                  {stat.number}
                </div>
                <div className="font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 animate-fade-in animation-delay-800">
          <div className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors duration-300">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            <span className="text-sm font-medium">ISO 27001 Certified</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors duration-300">
            <Shield className="h-5 w-5 text-emerald-500" />
            <span className="text-sm font-medium">HIPAA Compliant</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors duration-300">
            <Star className="h-5 w-5 text-emerald-500" />
            <span className="text-sm font-medium">4.8/5 User Rating</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors duration-300">
            <Heart className="h-5 w-5 text-emerald-500" />
            <span className="text-sm font-medium">Ministry of Health Approved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;
