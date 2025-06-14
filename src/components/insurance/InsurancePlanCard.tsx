
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Shield, Heart, Zap, Award } from 'lucide-react';
import { InsurancePlan } from '@/data/insurancePlans';

interface InsurancePlanCardProps {
  plan: InsurancePlan;
  onSelectPlan: (plan: InsurancePlan) => void;
  onAddToComparison: (plan: InsurancePlan) => void;
  isInComparison: boolean;
  comparisonFull: boolean;
}

const InsurancePlanCard = ({ 
  plan, 
  onSelectPlan, 
  onAddToComparison, 
  isInComparison, 
  comparisonFull 
}: InsurancePlanCardProps) => {
  const getCardGradient = () => {
    if (plan.popular) return 'bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200';
    if (plan.rating >= 4.3) return 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200';
    if (plan.rating >= 4.0) return 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200';
    return 'bg-white border-gray-200';
  };

  const getPremiumColor = () => {
    const premium = parseInt(plan.monthlyPremium.replace(/[₦,]/g, ''));
    if (premium < 8000) return 'text-green-600';
    if (premium < 15000) return 'text-blue-600';
    return 'text-purple-600';
  };

  const getRatingColor = () => {
    if (plan.rating >= 4.3) return 'text-emerald-600';
    if (plan.rating >= 4.0) return 'text-blue-600';
    if (plan.rating >= 3.7) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <Card className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative ${getCardGradient()}`}>
      {plan.popular && (
        <div className="absolute -top-3 left-4 z-10">
          <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg flex items-center gap-1">
            <Award className="h-3 w-3" />
            Most Popular
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Shield className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className={`text-sm font-medium ${getRatingColor()}`}>{plan.rating}</span>
              </div>
            </div>
          </div>
        </div>
        <CardTitle className="text-lg font-bold text-gray-900 leading-tight">{plan.name}</CardTitle>
        <Badge variant="outline" className="w-fit text-xs">
          {plan.type}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-white/70 rounded-lg p-4 border">
          <div className={`text-3xl font-bold ${getPremiumColor()}`}>{plan.monthlyPremium}</div>
          <div className="text-sm text-gray-600">per month</div>
        </div>
        
        <div className="bg-white/50 rounded-lg p-3 border">
          <div className="text-xs text-gray-600 uppercase tracking-wide">Coverage up to</div>
          <div className="text-xl font-bold text-gray-900">{plan.coverage}</div>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Heart className="h-4 w-4 text-pink-500" />
            Key Benefits
          </h4>
          <div className="space-y-2">
            {plan.features.slice(0, 3).map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 flex-shrink-0"></div>
                <span className="leading-relaxed">{feature}</span>
              </div>
            ))}
            {plan.features.length > 3 && (
              <div className="text-sm text-gray-500 pl-5">
                <Zap className="h-3 w-3 inline mr-1" />
                +{plan.features.length - 3} more benefits
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-3 pt-2">
          <Button 
            className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-medium shadow-lg transition-all duration-200"
            onClick={() => onSelectPlan(plan)}
          >
            Get Quote & Enroll
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-2 hover:bg-gray-50 transition-colors"
            onClick={() => onAddToComparison(plan)}
            disabled={comparisonFull || isInComparison}
          >
            {isInComparison ? '✓ Added to Compare' : '⚖️ Compare Plans'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsurancePlanCard;
