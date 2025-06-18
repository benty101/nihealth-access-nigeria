
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { InsurancePlan } from '@/services/AdminService';

interface InsurancePlanCardProps {
  plan: InsurancePlan;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
}

const InsurancePlanCard = ({ plan, onToggleStatus }: InsurancePlanCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{plan.name}</CardTitle>
            <p className="text-sm text-gray-600">{plan.provider}</p>
            <p className="text-xs text-gray-500">{plan.plan_type}</p>
          </div>
          <Badge className={plan.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
            {plan.is_active ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Coverage:</span>
            <span className="text-gray-600">₦{plan.coverage_amount?.toLocaleString() || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Annual Premium:</span>
            <span className="text-gray-600">₦{plan.premium_annual?.toLocaleString() || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Monthly Premium:</span>
            <span className="text-gray-600">₦{plan.premium_monthly?.toLocaleString() || 'N/A'}</span>
          </div>
        </div>

        {plan.features && plan.features.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Features:</p>
            <div className="flex flex-wrap gap-1">
              {plan.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {plan.features.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{plan.features.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            variant={plan.is_active ? "destructive" : "default"}
            size="sm"
            onClick={() => onToggleStatus(plan.id, plan.is_active)}
          >
            {plan.is_active ? (
              <>
                <Trash2 className="h-3 w-3 mr-1" />
                Deactivate
              </>
            ) : (
              'Activate'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsurancePlanCard;
