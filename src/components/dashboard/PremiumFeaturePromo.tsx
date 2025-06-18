
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Lock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PremiumFeaturePromoProps {
  feature: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  compact?: boolean;
}

const PremiumFeaturePromo = ({ 
  feature, 
  description, 
  icon: Icon = TrendingUp, 
  compact = false 
}: PremiumFeaturePromoProps) => {
  const navigate = useNavigate();

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium text-gray-700">{feature}</span>
            <Badge className="bg-yellow-100 text-yellow-800 text-xs">Premium</Badge>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => navigate('/premium')}
            className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
          >
            Unlock
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-yellow-600" />
            <h4 className="font-semibold text-gray-900">{feature}</h4>
          </div>
          <Badge className="bg-yellow-100 text-yellow-800">Premium</Badge>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        
        <Button 
          onClick={() => navigate('/premium')}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
        >
          <Star className="h-4 w-4 mr-2" />
          Upgrade to Premium
        </Button>
      </CardContent>
    </Card>
  );
};

export default PremiumFeaturePromo;
