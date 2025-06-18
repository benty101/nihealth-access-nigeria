
import React from 'react';
import InsurancePlanCard from './InsurancePlanCard';
import type { InsurancePlan } from '@/services/AdminService';

interface InsurancePlansGridProps {
  plans: InsurancePlan[];
  onToggleStatus: (id: string, currentStatus: boolean) => void;
}

const InsurancePlansGrid = ({ plans, onToggleStatus }: InsurancePlansGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <InsurancePlanCard
          key={plan.id}
          plan={plan}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};

export default InsurancePlansGrid;
