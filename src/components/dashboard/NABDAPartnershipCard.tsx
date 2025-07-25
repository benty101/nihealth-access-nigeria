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
    <Card className="bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 border-emerald-200 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-800">Health Partnership</h3>
              <p className="text-xs text-emerald-600">Enhanced with Government Support</p>
            </div>
          </div>
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 ml-auto">
            <Award className="w-3 h-3 mr-1" />
            Premium Access
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Strategic Value Proposition */}
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-emerald-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-800 mb-1">
                Advanced AI-Powered Health Platform
              </h4>
              <p className="text-xs text-gray-600">
                Get personalized health insights powered by advanced AI and genomics research, 
                contributing to better healthcare outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* Key Capabilities */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/60 rounded-lg p-2 text-center">
            <Dna className="w-4 h-4 text-purple-600 mx-auto mb-1" />
            <p className="text-xs font-medium text-purple-800">Genomics</p>
            <p className="text-xs text-purple-600">Analysis</p>
          </div>
          <div className="bg-white/60 rounded-lg p-2 text-center">
            <Brain className="w-4 h-4 text-blue-600 mx-auto mb-1" />
            <p className="text-xs font-medium text-blue-800">AI Insights</p>
            <p className="text-xs text-blue-600">Predictions</p>
          </div>
        </div>

        {/* National Impact */}
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-3 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-green-600" />
            <span className="text-xs font-semibold text-green-800">National Health Impact</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="text-center">
              <div className="text-lg font-bold text-green-700">2.5M+</div>
              <div className="text-green-600">Health Records</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-700">98%</div>
              <div className="text-green-600">Data Security</div>
            </div>
          </div>
        </div>

        {/* Security & Compliance */}
        <div className="flex items-center justify-between bg-blue-50 rounded-lg p-2">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs font-medium text-blue-800">Enterprise-Grade Security</p>
              <p className="text-xs text-blue-600">Government Standards Certified</p>
            </div>
          </div>
          <Zap className="w-4 h-4 text-yellow-500" />
        </div>

        {/* Action Button */}
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400"
          onClick={() => window.open('/health-insights', '_blank')}
        >
          <ExternalLink className="w-3 h-3 mr-2" />
          Explore Health Portal
          <ChevronRight className="w-3 h-3 ml-auto" />
        </Button>

        {/* Partnership Benefits */}
        <div className="text-center pt-2 border-t border-emerald-200">
          <p className="text-xs text-emerald-700 font-medium mb-1">Your Benefits</p>
          <div className="flex justify-center gap-3 text-xs text-emerald-600">
            <span>• Free Genomics</span>
            <span>• AI Insights</span>
            <span>• Research Access</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NABDAPartnershipCard;