
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Heart, Brain, Baby, Eye, Bone, Stethoscope } from 'lucide-react';

interface HospitalSpecialtyBadgeProps {
  specialty: string;
  className?: string;
}

const HospitalSpecialtyBadge = ({ specialty, className }: HospitalSpecialtyBadgeProps) => {
  const getSpecialtyIcon = (specialty: string) => {
    const iconMap: { [key: string]: any } = {
      'Cardiology': Heart,
      'Neurology': Brain,
      'Pediatrics': Baby,
      'Ophthalmology': Eye,
      'Orthopedics': Bone,
      'General Medicine': Stethoscope,
      'General Surgery': Stethoscope,
      'Oncology': Heart,
      'ENT': Stethoscope,
      'Psychiatry': Brain,
      'Fertility': Heart,
    };
    return iconMap[specialty] || Stethoscope;
  };

  const IconComponent = getSpecialtyIcon(specialty);

  return (
    <Badge variant="secondary" className={`text-xs ${className}`}>
      <IconComponent className="h-3 w-3 mr-1" />
      {specialty}
    </Badge>
  );
};

export default HospitalSpecialtyBadge;
