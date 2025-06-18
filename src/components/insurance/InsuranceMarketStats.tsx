
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { insuranceStats, topInsuranceProviders } from '@/data/enhancedInsurancePlans';
import { Shield, TrendingUp, Star, Users } from 'lucide-react';

const InsuranceMarketStats = () => {
  return (
    <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6 mb-8 border border-teal-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Nigeria's Leading Insurance Comparison Platform</h2>
        <p className="text-gray-600">Compare {insuranceStats.totalPlans}+ insurance plans from trusted Nigerian providers</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white/70 border-none shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-6 w-6 text-teal-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{insuranceStats.totalPlans}+</div>
            <div className="text-sm text-gray-600">Insurance Plans</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 border-none shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">₦{insuranceStats.averagePremium.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Avg. Premium</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 border-none shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{insuranceStats.averageRating}</div>
            <div className="text-sm text-gray-600">Avg. Rating</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 border-none shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">₦{(insuranceStats.coverageRange.max / 1000000).toFixed(0)}M</div>
            <div className="text-sm text-gray-600">Max Coverage</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Top Insurance Providers in Nigeria</h3>
        <div className="flex flex-wrap gap-2">
          {topInsuranceProviders.map((provider, index) => (
            <Badge 
              key={provider}
              variant={index < 3 ? "default" : "secondary"}
              className={index < 3 ? "bg-teal-600 hover:bg-teal-700" : ""}
            >
              {provider}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsuranceMarketStats;
