
import { QuickActionsService } from './QuickActionsService';
import { RecommendationsService } from './RecommendationsService';
import { InsightsService } from './InsightsService';
import { GreetingService } from './GreetingService';
import { LocationDataService } from './LocationDataService';
import { User, Settings } from 'lucide-react';

// Re-export types for backward compatibility
export type { 
  OnboardingData, 
  QuickAction, 
  Recommendation, 
  PersonalizedInsight 
} from '@/types/personalization';

export class PersonalizationService {
  static getOnboardingData() {
    const storedData = localStorage.getItem('userOnboardingData');
    return storedData ? JSON.parse(storedData) : null;
  }

  static getPersonalizedQuickActions(onboardingData: any) {
    return QuickActionsService.getPersonalizedQuickActions(onboardingData);
  }

  static getPersonalizedRecommendations(onboardingData: any) {
    // If no onboarding data, return prompt to complete onboarding
    if (!onboardingData) {
      return [{
        title: 'Complete Your Health Profile',
        description: 'To get personalized recommendations, please complete your health profile setup.',
        action: 'Complete Setup',
        priority: 'high' as const,
        icon: User
      }];
    }
    return RecommendationsService.getPersonalizedRecommendations(onboardingData);
  }

  static getPersonalizedGreeting(onboardingData: any) {
    // If no onboarding data, show setup prompt
    if (!onboardingData) {
      return "Welcome to MeddyPal! Let's personalize your health experience.";
    }
    return GreetingService.getPersonalizedGreeting(onboardingData);
  }

  static getPersonalizedInsights(onboardingData: any) {
    // If no onboarding data, return setup prompt
    if (!onboardingData) {
      return [{
        title: 'Set Up Your Health Profile',
        description: 'Complete your onboarding to unlock personalized health insights based on your life stage and goals.',
        value: 'Incomplete',
        color: 'text-amber-600',
        icon: Settings
      }];
    }
    return InsightsService.getPersonalizedInsights(onboardingData);
  }

  static getLocationSpecificContent(location: string) {
    return LocationDataService.getLocationSpecificContent(location);
  }
}
