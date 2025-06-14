
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Smartphone, 
  Shield, 
  Globe, 
  Award, 
  Users, 
  TrendingUp, 
  Clock,
  MessageSquare,
  Bell,
  Star,
  Zap,
  Lock
} from 'lucide-react';

const WorldClassFeatures = () => {
  const features = [
    {
      icon: Smartphone,
      title: 'AI-Powered Health Assistant',
      description: 'Get instant answers to pregnancy questions with our advanced AI chatbot trained on Nigerian medical protocols.',
      badge: 'Coming Soon',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Blockchain Health Records',
      description: 'Secure, immutable health records that you own and control, accessible across all healthcare providers.',
      badge: 'Enterprise',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Globe,
      title: 'Telemedicine Platform',
      description: 'Connect with specialists nationwide through our integrated video consultation platform.',
      badge: 'Live',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Predictive Health Analytics',
      description: 'ML-powered risk assessment and personalized health insights based on your data patterns.',
      badge: 'Beta',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Bell,
      title: 'Smart Appointment Management',
      description: 'Automated scheduling with conflict detection, reminder systems, and real-time updates.',
      badge: 'Live',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Community Support Network',
      description: 'Connect with other mothers, join support groups, and share experiences in a safe environment.',
      badge: 'Live',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const stats = [
    { number: '99.9%', label: 'Uptime Guarantee', icon: Zap },
    { number: '256-bit', label: 'SSL Encryption', icon: Lock },
    { number: '24/7', label: 'Expert Support', icon: MessageSquare },
    { number: '4.9/5', label: 'User Rating', icon: Star }
  ];

  return (
    <div className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800 text-sm font-medium mb-6">
            <Award className="h-4 w-4 mr-2" />
            World-Class Healthcare Technology
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Built for the Future of Healthcare
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leveraging cutting-edge technology to deliver healthcare experiences that rival the world's best platforms
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <Icon className="h-8 w-8 text-teal-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge 
                      variant={feature.badge === 'Live' ? 'default' : 'secondary'}
                      className={`text-xs ${
                        feature.badge === 'Live' ? 'bg-green-100 text-green-700' :
                        feature.badge === 'Beta' ? 'bg-blue-100 text-blue-700' :
                        feature.badge === 'Enterprise' ? 'bg-purple-100 text-purple-700' :
                        'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Integration Banner */}
        <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <Globe className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h3 className="text-3xl font-bold mb-4">
              Seamless Integration with Nigerian Healthcare
            </h3>
            <p className="text-lg text-teal-100 mb-8">
              Built to work perfectly with NHIS, major hospital systems, and local healthcare providers across all 36 states
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-teal-700 hover:bg-gray-100">
                View API Documentation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-700">
                Request Integration
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldClassFeatures;
