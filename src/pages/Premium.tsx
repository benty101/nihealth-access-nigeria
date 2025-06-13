
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Timer, Monitor, Star } from 'lucide-react';

const Premium = () => {
  const premiumFeatures = [
    {
      title: 'Fitness Tracker',
      description: 'Track your daily activities, steps, and workout sessions',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Water Intake Tracker',
      description: 'Monitor your daily water consumption and stay hydrated',
      icon: Monitor,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Sleep Tracker',
      description: 'Analyze your sleep patterns and improve sleep quality',
      icon: Timer,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Personal Health Coach',
      description: 'Get personalized health recommendations and tips',
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
  ];

  const plans = [
    {
      name: 'Premium Monthly',
      price: '₦2,500',
      period: 'per month',
      features: [
        'All fitness tracking features',
        'Water intake monitoring',
        'Basic sleep tracking',
        'Health tips and reminders',
        'Priority customer support'
      ],
      popular: false
    },
    {
      name: 'Premium Yearly',
      price: '₦25,000',
      period: 'per year',
      originalPrice: '₦30,000',
      features: [
        'All fitness tracking features',
        'Advanced water intake analytics',
        'Detailed sleep analysis',
        'Personal health coach',
        'Priority customer support',
        'Nutrition tracking',
        'Workout plans',
        'Health goal setting'
      ],
      popular: true
    },
    {
      name: 'Family Plan',
      price: '₦40,000',
      period: 'per year',
      features: [
        'All Premium features',
        'Up to 6 family members',
        'Family health dashboard',
        'Shared fitness challenges',
        'Family health reports',
        'Dedicated family coach'
      ],
      popular: false
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              HealthNG <span className="text-blue-600">Premium</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Take your health journey to the next level with advanced tracking and personalized insights
            </p>
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="h-4 w-4 mr-2" />
              Join 50,000+ Nigerians already improving their health
            </div>
          </div>

          {/* Premium Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Premium Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {premiumFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className={`h-8 w-8 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Choose Your Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card key={index} className={`hover:shadow-lg transition-shadow relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-blue-600">{plan.price}</div>
                      <div className="text-sm text-gray-600">{plan.period}</div>
                      {plan.originalPrice && (
                        <div className="text-sm text-gray-400 line-through">{plan.originalPrice}</div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              What Our Premium Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-semibold">AO</span>
                </div>
                <p className="text-gray-600 mb-4">
                  "The fitness tracker helped me lose 15kg in 6 months. The personalized coaching made all the difference!"
                </p>
                <div className="font-medium">Adebayo Ogundimu</div>
                <div className="text-sm text-gray-500">Lagos, Nigeria</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-semibold">FA</span>
                </div>
                <p className="text-gray-600 mb-4">
                  "Sleep tracking revealed my poor sleep habits. Now I sleep better and feel more energized every day."
                </p>
                <div className="font-medium">Fatima Abdullahi</div>
                <div className="text-sm text-gray-500">Abuja, Nigeria</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-semibold">CO</span>
                </div>
                <p className="text-gray-600 mb-4">
                  "The family plan keeps our entire household healthy. We love the shared challenges and progress tracking."
                </p>
                <div className="font-medium">Chukwuma Okafor</div>
                <div className="text-sm text-gray-500">Port Harcourt, Nigeria</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
