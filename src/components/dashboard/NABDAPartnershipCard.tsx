import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Sparkles, 
  Dna, 
  Brain, 
  Shield, 
  Award,
  ExternalLink,
  Zap,
  Globe,
  ChevronRight
} from 'lucide-react';

const NABDAPartnershipCard = () => {
  return (
    <Card className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-purple-200 overflow-hidden relative">
      <div className="absolute top-3 right-3">
        <Badge className="bg-purple-100 text-purple-800 border-purple-300 text-xs">
          <Sparkles className="w-3 h-3 mr-1" />
          FREE
        </Badge>
      </div>
      
      <CardHeader className="pb-4">
        <CardTitle className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Dna className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-purple-900 mb-1">Unlock Your Health DNA</h3>
            <p className="text-sm text-purple-700">Discover personalized health insights with free genomics analysis</p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-5">
        {/* Main Value Proposition */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                Government-Backed Health Intelligence
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                Get AI-powered health recommendations based on your unique genetic profile. 
                Free genomics testing helps you understand your health risks and optimize your wellness journey.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg p-3 text-center border border-purple-200">
            <Dna className="w-5 h-5 text-purple-600 mx-auto mb-2" />
            <p className="text-xs font-semibold text-purple-900">Free DNA Kit</p>
            <p className="text-xs text-purple-700">Home collection</p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-3 text-center border border-blue-200">
            <Brain className="w-5 h-5 text-blue-600 mx-auto mb-2" />
            <p className="text-xs font-semibold text-blue-900">Smart Insights</p>
            <p className="text-xs text-blue-700">Personalized</p>
          </div>
        </div>

        {/* What You Get */}
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-4 border border-indigo-200">
          <h5 className="text-sm font-semibold text-indigo-900 mb-3 flex items-center gap-2">
            <Award className="w-4 h-4" />
            What's Included
          </h5>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-indigo-800">
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
              Comprehensive genetic health analysis
            </div>
            <div className="flex items-center gap-2 text-indigo-800">
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
              Personalized medication response insights
            </div>
            <div className="flex items-center gap-2 text-indigo-800">
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
              Disease risk assessments and prevention tips
            </div>
            <div className="flex items-center gap-2 text-indigo-800">
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
              Family health planning recommendations
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
          onClick={() => window.open('/onboarding?genomics=true', '_self')}
        >
          <Dna className="w-4 h-4 mr-2" />
          Get Your Free DNA Kit
          <ChevronRight className="w-4 h-4 ml-auto" />
        </Button>

        {/* Trust Indicator */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <Shield className="w-4 h-4 text-gray-500" />
          <p className="text-xs text-gray-600">
            Powered by <span className="font-medium text-gray-700">National Biodata Agency</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NABDAPartnershipCard;