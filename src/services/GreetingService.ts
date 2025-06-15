
import { OnboardingData } from '@/types/personalization';

export class GreetingService {
  static getPersonalizedGreeting(onboardingData: OnboardingData | null): string {
    if (!onboardingData) return "Welcome back! Here's your health overview.";

    const location = onboardingData.location;
    const greetings = {
      pregnant: `Welcome back! Here's your pregnancy care overview for ${location}.`,
      mother: `Welcome back! Here's your family's health overview in ${location}.`,
      elderly: `Welcome back! Here's your personalized health management for ${location}.`,
      general: `Welcome back! Here's your health overview for ${location}.`
    };

    return greetings[onboardingData.lifeStage as keyof typeof greetings] || greetings.general;
  }
}
