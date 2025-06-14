
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Shield } from 'lucide-react';
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
  return (
    <Card className="hover:shadow-lg transition-shadow relative border-l-4 border-l-teal-500">
      {plan.popular && (
        <Badge className="absolute -top-3 left-4 bg-emerald-600">
          Most Popular
        </Badge>
      )}
      
      <CardHeader>
        <div className="flex items-center justify-between">
          <Shield className="h-8 w-8 text-teal-600" />
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{plan.rating}</span>
          </div>
        </div>
        <CardTitle className="text-lg">{plan.name}</CardTitle>
        <p className="text-sm text-gray-600">{plan.type}</p>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <div className="text-2xl font-bold text-teal-600">{plan.monthlyPremium}</div>
          <div className="text-sm text-gray-600">per month</div>
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-gray-600">Coverage up to</div>
          <div className="text-lg font-semibold">{plan.coverage}</div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
          <ul className="space-y-1">
            {plan.features.slice(0, 3).map((feature, featureIndex) => (
              <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                {feature}
              </li>
            ))}
            {plan.features.length > 3 && (
              <li className="text-sm text-gray-500">
                +{plan.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>
        
        <div className="space-y-2">
          <Button 
            className="w-full bg-teal-600 hover:bg-teal-700"
            onClick={() => onSelectPlan(plan)}
          >
            Get Quote
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => onAddToComparison(plan)}
            disabled={comparisonFull || isInComparison}
          >
            {isInComparison ? 'Added to Compare' : 'Compare'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsurancePlanCard;
