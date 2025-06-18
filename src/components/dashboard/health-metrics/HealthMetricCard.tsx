
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface HealthMetricCardProps {
  type: string;
  label: string;
  unit: string;
  icon: LucideIcon;
  value: string | null;
}

const HealthMetricCard = ({ type, label, unit, icon: IconComponent, value }: HealthMetricCardProps) => {
  return (
    <div key={type} className="bg-gray-50 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-1">
        <IconComponent className="h-4 w-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      {value ? (
        <div className="text-lg font-semibold text-gray-900">{value}</div>
      ) : (
        <div className="text-sm text-gray-500">Not recorded</div>
      )}
    </div>
  );
};

export default HealthMetricCard;
