
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Zap, 
  Users, 
  Award, 
  Clock, 
  Heart,
  Globe,
  BookOpen,
  ExternalLink
} from 'lucide-react';

const WorldClassFeatures = () => {
  const handleViewAPI = () => {
    console.log('View API Documentation clicked');
    // This would typically open API documentation
  };

  const handleViewIntegrations = () => {
    console.log('View Integrations clicked');
    // This would typically open integrations page
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-6 py-2 text-teal-600 border-teal-600">
            World-Class Platform
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Built for Excellence in Healthcare
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enterprise-grade features designed specifically for the Nigerian healthcare ecosystem
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-teal-500">
            <CardHeader>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
                <Shield className="h-6 w-6 text-teal-600" />
              </div>
              <CardTitle className="text-xl">Bank-Grade Security</CardTitle>
              <CardDescription>
                End-to-end encryption, HIPAA compliance, and secure data handling for all medical records
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-emerald-500">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                <Zap className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle className="text-xl">Lightning Fast</CardTitle>
              <CardDescription>
                Optimized performance with sub-second response times and 99.9% uptime guarantee
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Multi-User Access</CardTitle>
              <CardDescription>
                Family accounts, shared records, and collaborative healthcare management
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Certified Providers</CardTitle>
              <CardDescription>
                Only verified and licensed healthcare providers with quality assurance
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl">24/7 Support</CardTitle>
              <CardDescription>
                Round-the-clock customer support and emergency assistance when you need it
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-pink-500">
            <CardHeader>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
              <CardTitle className="text-xl">Personalized Care</CardTitle>
              <CardDescription>
                AI-powered health insights and personalized recommendations for better outcomes
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Integration Section */}
        <div className="bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-700 rounded-3xl p-12 text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Globe className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Seamless Integration with Nigerian Healthcare
          </h3>
          <p className="text-xl text-teal-100 mb-8 max-w-3xl mx-auto">
            Built to work perfectly with NHIS, major hospital systems, and local healthcare providers across all 36 states
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleViewAPI}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              View API Documentation
            </Button>
            <Button 
              size="lg"
              onClick={handleViewIntegrations}
              className="bg-white text-teal-600 hover:bg-gray-50"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              View All Integrations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldClassFeatures;
