
import React from 'react';
import { Scale, Ruler, Heart, Activity } from 'lucide-react';
import HealthMetricCard from './HealthMetricCard';

interface HealthMetricsGridProps {
  getLatestMetricValue: (type: string) => string | null;
}

const basicMetrics = [
  { type: 'weight', label: 'Weight', unit: 'kg', icon: Scale },
  { type: 'height', label: 'Height', unit: 'cm', icon: Ruler },
  { type: 'blood_pressure', label: 'Blood Pressure', unit: 'mmHg', icon: Heart },
  { type: 'heart_rate', label: 'Heart Rate', unit: 'bpm', icon: Activity },
];

const HealthMetricsGrid = ({ getLatestMetricValue }: HealthMetricsGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {basicMetrics.map((metric) => (
        <HealthMetricCard
          key={metric.type}
          type={metric.type}
          label={metric.label}
          unit={metric.unit}
          icon={metric.icon}
          value={getLatestMetricValue(metric.type)}
        />
      ))}
    </div>
  );
};

export default HealthMetricsGrid;
