
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, ArrowRight, Scale } from 'lucide-react';

interface InsurancePlan {
  id: string;
  name: string;
  type: string;
  monthlyPremium: string;
  coverage: string;
  rating: number;
  features: string[];
  popular: boolean;
}

interface InsuranceComparisonProps {
  selectedPlans: InsurancePlan[];
  onRemovePlan: (planId: string) => void;
  onClearComparison: () => void;
}

const InsuranceComparison = ({ selectedPlans, onRemovePlan, onClearComparison }: InsuranceComparisonProps) => {
  if (selectedPlans.length === 0) {
    return (
      <Card className="text-center p-8">
        <Scale className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Compare Insurance Plans</h3>
        <p className="text-gray-600">Select up to 3 plans to compare their features side by side</p>
      </Card>
    );
  }

  const allFeatures = Array.from(
    new Set(selectedPlans.flatMap(plan => plan.features))
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Scale className="h-5 w-5 mr-2" />
            Plan Comparison ({selectedPlans.length}/3)
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClearComparison}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2 border-b"></th>
                {selectedPlans.map((plan) => (
                  <th key={plan.id} className="text-center p-2 border-b min-w-[200px]">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {plan.type}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemovePlan(plan.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <h3 className="font-semibold text-sm">{plan.name}</h3>
                      <div className="text-lg font-bold text-teal-600">{plan.monthlyPremium}</div>
                      <div className="text-sm text-gray-600">per month</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 font-medium border-b">Coverage Amount</td>
                {selectedPlans.map((plan) => (
                  <td key={plan.id} className="text-center p-2 border-b font-semibold">
                    {plan.coverage}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-2 font-medium border-b">Rating</td>
                {selectedPlans.map((plan) => (
                  <td key={plan.id} className="text-center p-2 border-b">
                    <div className="flex items-center justify-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1">{plan.rating}</span>
                    </div>
                  </td>
                ))}
              </tr>
              {allFeatures.map((feature) => (
                <tr key={feature}>
                  <td className="p-2 font-medium border-b">{feature}</td>
                  {selectedPlans.map((plan) => (
                    <td key={plan.id} className="text-center p-2 border-b">
                      {plan.features.includes(feature) ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-2"></td>
                {selectedPlans.map((plan) => (
                  <td key={plan.id} className="text-center p-2">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      Choose Plan
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsuranceComparison;
