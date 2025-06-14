
import { 
  Heart, 
  Calendar, 
  FileText, 
  Shield, 
  Stethoscope, 
  Pill, 
  TestTube, 
  MapPin, 
  Clock, 
  Bell,
  TrendingUp,
  Users,
  Star,
  CheckCircle,
  AlertCircle,
  Baby,
  User
} from 'lucide-react';

export interface OnboardingData {
  lifeStage: string;
  healthGoals: string[];
  location: string;
}

export interface QuickAction {
  icon: any;
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
  icon: any;
}

export class PersonalizationService {
  static getOnboardingData(): OnboardingData | null {
    const storedData = localStorage.getItem('userOnboardingData');
    return storedData ? JSON.parse(storedData) : null;
  }

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
        title: 'Find Hospital',
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
        ...baseActions.slice(0, 3)
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
        ...baseActions
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
        ...baseActions
      ];
    }

    return baseActions;
  }

  static getPersonalizedRecommendations(onboardingData: OnboardingData | null): Recommendation[] {
    if (!onboardingData) return [];

    const recommendations: Recommendation[] = [];

    if (onboardingData.lifeStage === 'pregnant') {
      recommendations.push(
        {
          title: 'Antenatal Checkup Due',
          description: 'Schedule your next antenatal visit',
          action: 'Book Now',
          priority: 'high',
          icon: Baby
        },
        {
          title: 'Prenatal Vitamins',
          description: 'Ensure you have adequate folic acid and iron',
          action: 'Order',
          priority: 'medium',
          icon: Pill
        }
      );
    }

    if (onboardingData.lifeStage === 'mother') {
      recommendations.push(
        {
          title: 'Child Vaccination Schedule',
          description: 'Next immunization due in 2 weeks',
          action: 'Schedule',
          priority: 'high',
          icon: Shield
        },
        {
          title: 'Family Health Screening',
          description: 'Annual checkups for the whole family',
          action: 'Book',
          priority: 'medium',
          icon: Users
        }
      );
    }

    if (onboardingData.lifeStage === 'elderly') {
      recommendations.push(
        {
          title: 'Blood Pressure Check',
          description: 'Monitor your cardiovascular health',
          action: 'Schedule',
          priority: 'high',
          icon: Heart
        },
        {
          title: 'Medication Review',
          description: 'Review prescriptions with your doctor',
          action: 'Book',
          priority: 'medium',
          icon: FileText
        }
      );
    }

    if (onboardingData.healthGoals.includes('Preventive care')) {
      recommendations.push({
        title: 'Preventive Health Screening',
        description: 'Complete blood work and physical exam',
        action: 'Schedule',
        priority: 'medium',
        icon: TestTube
      });
    }

    return recommendations;
  }

  static getPersonalizedGreeting(onboardingData: OnboardingData | null): string {
    if (!onboardingData) return "Welcome back! Here's your health overview.";

    const greetings = {
      pregnant: "Welcome back, mama! Here's your pregnancy health overview.",
      mother: "Welcome back! Here's your family's health overview.",
      elderly: "Welcome back! Here's your health management overview.",
      general: "Welcome back! Here's your health overview."
    };

    return greetings[onboardingData.lifeStage as keyof typeof greetings] || greetings.general;
  }
}
