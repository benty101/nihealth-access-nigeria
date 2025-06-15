
import { 
  MapPin,
  Baby,
  Calendar,
  Heart,
  Shield,
  Activity,
  Pill,
  Target
} from 'lucide-react';
import { OnboardingData, PersonalizedInsight } from '@/types/personalization';

export class InsightsService {
  static getPersonalizedInsights(onboardingData: OnboardingData | null): PersonalizedInsight[] {
    if (!onboardingData) return [];

    const insights: PersonalizedInsight[] = [];
    const location = onboardingData.location;

    // Common insights based on location
    insights.push({
      title: `Healthcare Access in ${location}`,
      description: 'Quality facilities near you',
      value: '12+ hospitals',
      trend: 'stable',
      color: 'text-blue-600',
      icon: MapPin
    });

    if (onboardingData.lifeStage === 'pregnant') {
      insights.push(
        {
          title: 'Pregnancy Progress',
          description: 'Trimester milestones',
          value: '2nd Trimester',
          trend: 'up',
          color: 'text-pink-600',
          icon: Baby
        },
        {
          title: 'Next Appointment',
          description: 'Upcoming checkup',
          value: 'In 5 days',
          color: 'text-orange-600',
          icon: Calendar
        }
      );
    }

    if (onboardingData.lifeStage === 'mother') {
      insights.push(
        {
          title: 'Family Health Score',
          description: 'Overall family wellness',
          value: '92%',
          trend: 'up',
          color: 'text-green-600',
          icon: Heart
        },
        {
          title: 'Vaccination Status',
          description: 'Children immunizations',
          value: 'Up to date',
          color: 'text-blue-600',
          icon: Shield
        }
      );
    }

    if (onboardingData.lifeStage === 'elderly') {
      insights.push(
        {
          title: 'Health Monitoring',
          description: 'Regular checkup streak',
          value: '6 months',
          trend: 'up',
          color: 'text-green-600',
          icon: Activity
        },
        {
          title: 'Medication Adherence',
          description: 'On-time medication',
          value: '95%',
          trend: 'stable',
          color: 'text-blue-600',
          icon: Pill
        }
      );
    }

    // Add health goals progress
    if (onboardingData.healthGoals.length > 0) {
      insights.push({
        title: 'Health Goals',
        description: 'Progress towards objectives',
        value: `${onboardingData.healthGoals.length} active`,
        trend: 'up',
        color: 'text-purple-600',
        icon: Target
      });
    }

    return insights;
  }
}
