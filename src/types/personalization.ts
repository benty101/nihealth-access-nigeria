
import { LucideIcon } from 'lucide-react';

export interface OnboardingData {
  lifeStage: string;
  healthGoals: string[];
  location: string;
}

export interface QuickAction {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  hoverColor: string;
}

export interface Recommendation {
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  icon: LucideIcon;
}

export interface PersonalizedInsight {
  title: string;
  description: string;
  value: string;
  trend?: 'up' | 'down' | 'stable';
  color: string;
  icon: LucideIcon;
}

export interface LocationContent {
  emergencyNumber: string;
  commonHealthConcerns: string[];
  nearbySpecialists: string[];
}
