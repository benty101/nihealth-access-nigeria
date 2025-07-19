
import React from 'react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Timer, Monitor, Star, Check, Zap, Shield, Users } from 'lucide-react';

const Premium = () => {
  const premiumFeatures = [
    {
      title: 'Advanced Health Tracking',
      description: 'Comprehensive fitness tracking with detailed analytics and insights',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Smart Health Monitoring',
      description: 'Real-time health monitoring with AI-powered recommendations',
      icon: Monitor,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Sleep & Wellness Analytics',
      description: 'Advanced sleep tracking and wellness insights for better health',
      icon: Timer,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Personal Health Coach',
      description: 'AI-powered personal coaching with customized health plans',
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
  ];

  const plans = [
    {
      name: 'Basic',
      price: '₦1,500',
      originalPrice: null,
      period: 'per month',
      description: 'Perfect for individuals starting their health journey',
      features: [
        'Basic health tracking',
        'Water intake monitoring',
        'Simple sleep tracking',
        'Health tips and reminders',
        'Email support'
      ],
      popular: false,
      savings: null,
      buttonText: 'Get Started',
      priceId: 'price_basic_monthly'
    },
    {
      name: 'Premium',
      price: '₦2,500',
      originalPrice: '₦3,000',
      period: 'per month',
      description: 'Most popular choice for serious health enthusiasts',
      features: [
        'All Basic features',
        'Advanced fitness tracking',
        'Detailed health analytics',
        'Personal health coach',
        'Priority support',
        'Nutrition tracking',
        'Custom workout plans',
        'Health goal setting'
      ],
      popular: true,
      savings: 'Save ₦500/month',
      buttonText: 'Start Premium',
      priceId: 'price_premium_monthly'
    },
    {
      name: 'Family',
      price: '₦4,000',
      originalPrice: '₦5,000',
      period: 'per month',
      description: 'Comprehensive health solution for the entire family',
      features: [
        'All Premium features',
        'Up to 6 family members',
        'Family health dashboard',
        'Shared fitness challenges',
        'Family health reports',
        'Dedicated family coach',
        'Emergency contact sharing',
        'Family medication reminders'
      ],
      popular: false,
      savings: 'Save ₦1,000/month',
      buttonText: 'Choose Family',
      priceId: 'price_family_monthly'
    },
  ];

  const handleSubscribe = (priceId: string, planName: string) => {
    // TODO: Implement Stripe checkout integration
    console.log(`Subscribing to ${planName} with price ID: ${priceId}`);
    // This will be replaced with actual Stripe integration
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <ContextualNavbar />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4 mr-2" />
              Unlock Your Health Potential
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              HealthNG <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Premium</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your health journey with advanced tracking, personalized insights, and expert guidance tailored for Nigerians
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="h-4 w-4 mr-2" />
                HIPAA Compliant & Secure
              </div>
              <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                <Users className="h-4 w-4 mr-2" />
                50,000+ Active Users
              </div>
            </div>
          </div>

          {/* Premium Features */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
              Premium Features
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Unlock powerful tools and insights designed specifically for the Nigerian healthcare landscape
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {premiumFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
                    <CardHeader className="pb-4">
                      <div className={`w-20 h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm`}>
                        <IconComponent className={`h-10 w-10 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Choose Your Plan
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select the perfect plan for your health journey. All plans include our core features with increasing levels of personalization and support.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative transition-all duration-300 hover:shadow-2xl border-2 ${
                  plan.popular 
                    ? 'ring-4 ring-blue-500 ring-opacity-50 border-blue-500 shadow-xl scale-105' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 text-sm font-semibold">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <div className="text-4xl font-bold text-gray-900">{plan.price}</div>
                        <div className="text-gray-600">/{plan.period.split(' ')[1]}</div>
                      </div>
                      {plan.originalPrice && (
                        <div className="text-sm text-gray-400 line-through">{plan.originalPrice}</div>
                      )}
                      {plan.savings && (
                        <div className="text-sm font-medium text-green-600">{plan.savings}</div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm">
                          <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      onClick={() => handleSubscribe(plan.priceId, plan.name)}
                      className={`w-full py-3 text-base font-semibold transition-all duration-200 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg' 
                          : 'bg-gray-900 hover:bg-gray-800'
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Trust Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Trusted by Health-Conscious Nigerians
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  AO
                </div>
                <blockquote className="text-gray-700 mb-4 italic">
                  "HealthNG Premium helped me lose 15kg in 6 months. The personalized coaching made all the difference!"
                </blockquote>
                <div className="font-semibold text-gray-900">Adebayo Ogundimu</div>
                <div className="text-sm text-gray-500">Lagos, Nigeria</div>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  FA
                </div>
                <blockquote className="text-gray-700 mb-4 italic">
                  "The sleep tracking revealed my poor habits. Now I sleep better and feel energized every day."
                </blockquote>
                <div className="font-semibold text-gray-900">Fatima Abdullahi</div>
                <div className="text-sm text-gray-500">Abuja, Nigeria</div>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  CO
                </div>
                <blockquote className="text-gray-700 mb-4 italic">
                  "The family plan keeps our entire household healthy. We love the shared challenges!"
                </blockquote>
                <div className="font-semibold text-gray-900">Chukwuma Okafor</div>
                <div className="text-sm text-gray-500">Port Harcourt, Nigeria</div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Questions? We're Here to Help
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get in touch with our support team for any questions about HealthNG Premium
            </p>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
