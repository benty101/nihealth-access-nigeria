/**
 * Health Intelligence Engine - Core System
 * 
 * This is the brain of MeddyPal that replaces traditional page-based navigation
 * with contextual, intelligent health conversations and service orchestration.
 */

import { PersonalizationService } from '@/services/PersonalizationService';
import { HealthTimelineService } from '@/services/HealthTimelineService';

export interface HealthContext {
  user_id: string;
  current_health_state: 'excellent' | 'good' | 'concerning' | 'critical';
  intelligence_level: number; // 0-100 based on data completeness
  active_concerns: string[];
  recent_activities: string[];
  pending_actions: string[];
  family_context?: any;
  location_context?: any;
}

export interface IntelligentResponse {
  type: 'conversation' | 'service_recommendation' | 'urgent_action' | 'educational';
  content: string;
  suggested_actions?: ServiceAction[];
  urgency: 'low' | 'medium' | 'high' | 'critical';
  context_panel?: 'timeline' | 'services' | 'insights' | 'family' | 'emergency';
}

export interface ServiceAction {
  id: string;
  label: string;
  description: string;
  service_type: 'appointment' | 'lab_test' | 'pharmacy' | 'insurance' | 'emergency';
  priority: number;
  estimated_cost?: string;
  estimated_time?: string;
  next_steps: string[];
}

export class HealthIntelligenceEngine {
  private static instance: HealthIntelligenceEngine;
  private healthContext: HealthContext | null = null;
  private conversationHistory: any[] = [];

  static getInstance(): HealthIntelligenceEngine {
    if (!this.instance) {
      this.instance = new HealthIntelligenceEngine();
    }
    return this.instance;
  }

  /**
   * Initialize user's health intelligence context
   */
  async initializeContext(userId: string): Promise<HealthContext> {
    const onboardingData = PersonalizationService.getOnboardingData();
    const timeline = await HealthTimelineService.getUserTimeline(userId);
    
    const intelligenceLevel = this.calculateIntelligenceLevel(onboardingData, timeline);
    const healthState = this.assessHealthState(onboardingData, timeline);
    
    this.healthContext = {
      user_id: userId,
      current_health_state: healthState,
      intelligence_level: intelligenceLevel,
      active_concerns: this.extractActiveConcerns(onboardingData, timeline),
      recent_activities: this.extractRecentActivities(timeline),
      pending_actions: this.extractPendingActions(timeline),
      family_context: onboardingData?.familyHealthHistory,
      location_context: onboardingData?.location
    };

    return this.healthContext;
  }

  /**
   * Process user input and generate intelligent response
   */
  async processUserInput(input: string): Promise<IntelligentResponse> {
    if (!this.healthContext) {
      throw new Error('Health context not initialized');
    }

    // Add to conversation history
    this.conversationHistory.push({
      type: 'user',
      content: input,
      timestamp: new Date().toISOString()
    });

    // Analyze input intent
    const intent = this.analyzeIntent(input);
    
    // Generate contextual response
    const response = await this.generateResponse(intent, input);

    // Add AI response to history
    this.conversationHistory.push({
      type: 'ai',
      content: response.content,
      timestamp: new Date().toISOString(),
      actions: response.suggested_actions
    });

    return response;
  }

  /**
   * Get contextual service recommendations
   */
  getContextualServices(): ServiceAction[] {
    if (!this.healthContext) return [];

    const services: ServiceAction[] = [];

    // Intelligence-based recommendations
    if (this.healthContext.intelligence_level < 30) {
      services.push({
        id: 'complete_profile',
        label: 'Complete Health Profile',
        description: 'Unlock personalized recommendations by completing your health profile',
        service_type: 'insurance',
        priority: 10,
        next_steps: ['Fill health questionnaire', 'Add family history', 'Set health goals']
      });
    }

    // Health state-based recommendations
    if (this.healthContext.active_concerns.length > 0) {
      services.push({
        id: 'book_consultation',
        label: 'Book Medical Consultation',
        description: 'Discuss your health concerns with a qualified doctor',
        service_type: 'appointment',
        priority: 8,
        estimated_cost: '₦5,000 - ₦15,000',
        estimated_time: '30-60 minutes',
        next_steps: ['Select preferred doctor', 'Choose appointment time', 'Complete pre-consultation form']
      });
    }

    // Preventive care recommendations
    if (this.shouldRecommendPreventiveCare()) {
      services.push({
        id: 'preventive_screening',
        label: 'Preventive Health Screening',
        description: 'Stay healthy with regular check-ups and early detection',
        service_type: 'lab_test',
        priority: 6,
        estimated_cost: '₦8,000 - ₦25,000',
        next_steps: ['Choose screening package', 'Select lab location', 'Schedule appointment']
      });
    }

    return services.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Calculate user's intelligence level based on data completeness
   */
  private calculateIntelligenceLevel(onboardingData: any, timeline: any[]): number {
    let score = 0;

    // Basic profile completion (40 points)
    if (onboardingData) {
      if (onboardingData.name) score += 5;
      if (onboardingData.age) score += 5;
      if (onboardingData.gender) score += 5;
      if (onboardingData.location) score += 5;
      if (onboardingData.healthGoals?.length > 0) score += 10;
      if (onboardingData.currentConditions?.length > 0) score += 10;
    }

    // Health timeline activity (30 points)
    if (timeline.length > 0) score += 10;
    if (timeline.length > 5) score += 10;
    if (timeline.length > 15) score += 10;

    // Service utilization (30 points)
    const appointmentEvents = timeline.filter(e => e.event_type === 'consultation').length;
    const labEvents = timeline.filter(e => e.event_type === 'lab_test').length;
    const medicationEvents = timeline.filter(e => e.event_type === 'medication').length;

    if (appointmentEvents > 0) score += 10;
    if (labEvents > 0) score += 10;
    if (medicationEvents > 0) score += 10;

    return Math.min(100, score);
  }

  /**
   * Assess user's current health state
   */
  private assessHealthState(onboardingData: any, timeline: any[]): 'excellent' | 'good' | 'concerning' | 'critical' {
    // This would be enhanced with real health data analysis
    if (onboardingData?.currentConditions?.length > 2) return 'concerning';
    if (onboardingData?.currentConditions?.length > 0) return 'good';
    return 'excellent';
  }

  /**
   * Analyze user input to determine intent
   */
  private analyzeIntent(input: string): string {
    const lowerInput = input.toLowerCase();

    // Health concern keywords
    if (lowerInput.includes('pain') || lowerInput.includes('hurt') || lowerInput.includes('sick')) {
      return 'health_concern';
    }

    // Appointment keywords
    if (lowerInput.includes('appointment') || lowerInput.includes('doctor') || lowerInput.includes('book')) {
      return 'book_appointment';
    }

    // Lab test keywords
    if (lowerInput.includes('test') || lowerInput.includes('lab') || lowerInput.includes('blood')) {
      return 'lab_test';
    }

    // Medication keywords
    if (lowerInput.includes('medication') || lowerInput.includes('medicine') || lowerInput.includes('drug')) {
      return 'medication';
    }

    // Insurance keywords
    if (lowerInput.includes('insurance') || lowerInput.includes('coverage') || lowerInput.includes('policy')) {
      return 'insurance';
    }

    return 'general_inquiry';
  }

  /**
   * Generate intelligent response based on intent and context
   */
  private async generateResponse(intent: string, input: string): Promise<IntelligentResponse> {
    const baseResponses = {
      health_concern: {
        type: 'service_recommendation' as const,
        content: `I understand you're experiencing some health concerns. Based on your symptoms, I'd recommend speaking with a healthcare provider. Let me help you book a consultation with a qualified doctor who can properly assess your situation.`,
        urgency: 'medium' as const,
        context_panel: 'services' as const
      },
      book_appointment: {
        type: 'service_recommendation' as const,
        content: `I'll help you book an appointment. Based on your health profile and location, I can recommend the best healthcare providers for your needs.`,
        urgency: 'low' as const,
        context_panel: 'services' as const
      },
      lab_test: {
        type: 'service_recommendation' as const,
        content: `Let me help you with laboratory tests. I can recommend specific tests based on your health profile and help you find the nearest certified lab facilities.`,
        urgency: 'low' as const,
        context_panel: 'services' as const
      },
      general_inquiry: {
        type: 'conversation' as const,
        content: `I'm here to help with all your health needs. You can ask me about booking appointments, finding labs, managing medications, or understanding your health data. What would you like to know more about?`,
        urgency: 'low' as const,
        context_panel: 'timeline' as const
      }
    };

    const baseResponse = baseResponses[intent] || baseResponses.general_inquiry;
    
    return {
      ...baseResponse,
      suggested_actions: this.getContextualServices().slice(0, 3)
    };
  }

  private extractActiveConcerns(onboardingData: any, timeline: any[]): string[] {
    const concerns = [];
    if (onboardingData?.currentConditions) {
      concerns.push(...onboardingData.currentConditions);
    }
    return concerns;
  }

  private extractRecentActivities(timeline: any[]): string[] {
    return timeline
      .filter(event => {
        const eventDate = new Date(event.event_date);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return eventDate > thirtyDaysAgo;
      })
      .map(event => event.event_type)
      .slice(0, 5);
  }

  private extractPendingActions(timeline: any[]): string[] {
    // This would be enhanced to track actual pending actions
    return [];
  }

  private shouldRecommendPreventiveCare(): boolean {
    if (!this.healthContext) return false;
    return this.healthContext.intelligence_level > 50 && this.healthContext.recent_activities.length < 3;
  }

  /**
   * Get current health context
   */
  getHealthContext(): HealthContext | null {
    return this.healthContext;
  }

  /**
   * Get conversation history
   */
  getConversationHistory(): any[] {
    return this.conversationHistory;
  }
}