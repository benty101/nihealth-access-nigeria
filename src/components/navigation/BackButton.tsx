import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIntelligentNavigation } from '@/hooks/useIntelligentNavigation';

interface BackButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  customRoute?: string;
  customLabel?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  className = '',
  variant = 'outline',
  size = 'default',
  customRoute,
  customLabel
}) => {
  const navigate = useNavigate();
  const { getBackRoute, getBackLabel } = useIntelligentNavigation();

  const handleBack = () => {
    const route = customRoute || getBackRoute();
    navigate(route);
  };

  const label = customLabel || getBackLabel();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleBack}
      className={`flex items-center gap-2 ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {size !== 'icon' && <span>{label}</span>}
    </Button>
  );
};

export default BackButton;