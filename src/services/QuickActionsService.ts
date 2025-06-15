
import { 
  Calendar, 
  Pill, 
  TestTube, 
  Stethoscope, 
  Baby,
  Heart,
  Shield
} from 'lucide-react';
import { OnboardingData, QuickAction } from '@/types/personalization';

export class QuickActionsService {
  static getPersonalizedQuickActions(onboardingData: OnboardingData | null): QuickAction[] {
    const baseActions: QuickAction[] = [
      {
        icon: Calendar,
        title: 'Book Appointment',
        description: 'Schedule with doctors',
        color: 'bg-blue-500',
        hoverColor: 'hover:bg-blue-600'
      },
      {
        icon: Pill,
        title: 'Order Medicine',
        description: 'Pharmacy delivery',
        color: 'bg-green-500',
        hoverColor: 'hover:bg-green-600'
      },
      {
        icon: TestTube,
        title: 'Book Lab Test',
        description: 'Diagnostic services',
        color: 'bg-orange-500',
        hoverColor: 'hover:bg-orange-600'
      },
      {
        icon: Stethoscope,
        title: `Find Hospital in ${onboardingData?.location || 'Your Area'}`,
        description: 'Nearby facilities',
        color: 'bg-purple-500',
        hoverColor: 'hover:bg-purple-600'
      }
    ];

    if (onboardingData?.lifeStage === 'pregnant') {
      return [
        {
          icon: Baby,
          title: 'Antenatal Care',
          description: 'Track pregnancy milestones',
          color: 'bg-pink-500',
          hoverColor: 'hover:bg-pink-600'
        },
        {
          icon: Calendar,
          title: `Find Maternity Hospitals in ${onboardingData.location}`,
          description: 'Book antenatal appointments',
          color: 'bg-blue-500',
          hoverColor: 'hover:bg-blue-600'
        },
        ...baseActions.slice(1, 3)
      ];
    }

    if (onboardingData?.lifeStage === 'mother') {
      return [
        {
          icon: Heart,
          title: 'Family Health',
          description: 'Manage family records',
          color: 'bg-rose-500',
          hoverColor: 'hover:bg-rose-600'
        },
        {
          icon: Shield,
          title: `Pediatric Care in ${onboardingData.location}`,
          description: 'Child health services',
          color: 'bg-indigo-500',
          hoverColor: 'hover:bg-indigo-600'
        },
        ...baseActions.slice(1, 4)
      ];
    }

    if (onboardingData?.lifeStage === 'elderly') {
      return [
        {
          icon: Shield,
          title: 'Chronic Care',
          description: 'Medication management',
          color: 'bg-indigo-500',
          hoverColor: 'hover:bg-indigo-600'
        },
        {
          icon: Heart,
          title: `Specialist Care in ${onboardingData.location}`,
          description: 'Senior health services',
          color: 'bg-red-500',
          hoverColor: 'hover:bg-red-600'
        },
        ...baseActions
      ];
    }

    return baseActions;
  }
}
