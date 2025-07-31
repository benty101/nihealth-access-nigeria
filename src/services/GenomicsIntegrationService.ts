import { supabase } from '@/integrations/supabase/client';
import { GenomicsConsentData } from '@/components/genomics/GenomicsOnboardingFlow';
import { genomicsService } from './GenomicsService';
import { PersonalizationService } from './PersonalizationService';

export interface GenomicsKitOrder {
  id: string;
  user_id: string;
  order_number: string;
  kit_type: 'whole_genome' | 'exome' | 'targeted_panel' | 'pharmacogenomics';
  status: 'ordered' | 'shipped' | 'delivered' | 'collected' | 'processing' | 'completed';
  delivery_address: string;
  delivery_phone: string;
  preferred_delivery_time: string;
  tracking_number?: string;
  consent_data: GenomicsConsentData;
  estimated_delivery_date?: string;
  sample_collection_date?: string;
  results_available_date?: string;
  created_at: string;
  updated_at: string;
}

export interface GenomicsEnhancedProfile {
  user_id: string;
  genomics_completed: boolean;
  risk_scores: {
    cardiovascular: number;
    diabetes: number;
    cancer: number;
    neurological: number;
  };
  pharmacogenomics: {
    drug_sensitivities: string[];
    metabolism_type: 'normal' | 'poor' | 'intermediate' | 'rapid' | 'ultrarapid';
    recommendations: string[];
  };
  carrier_status: {
    conditions: string[];
    family_planning_recommendations: string[];
  };
  lifestyle_recommendations: string[];
  updated_at: string;
}

class GenomicsIntegrationService {
  /**
   * Process genomics onboarding and create kit order
   */
  async processGenomicsOnboarding(userId: string, consentData: GenomicsConsentData): Promise<string> {
    try {
      // Create genomics kit order
      const kitOrder = await this.createGenomicsKitOrder(userId, consentData);
      
      // Update user onboarding data with genomics info
      await this.updateUserOnboardingWithGenomics(userId, consentData);
      
      // Store consent preferences
      await this.storeGenomicsConsents(userId, consentData);
      
      // Generate timeline event
      await this.createGenomicsTimelineEvent(userId, 'genomics_kit_ordered', {
        order_id: kitOrder.id,
        kit_type: 'comprehensive_health',
        delivery_timeline: '3-5 business days'
      });

      return kitOrder.id;
    } catch (error) {
      console.error('Error processing genomics onboarding:', error);
      throw error;
    }
  }

  /**
   * Create genomics kit order in the database
   */
  private async createGenomicsKitOrder(userId: string, consentData: GenomicsConsentData): Promise<GenomicsKitOrder> {
    const orderNumber = `GNM-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    const kitOrder: Omit<GenomicsKitOrder, 'id' | 'created_at' | 'updated_at'> = {
      user_id: userId,
      order_number: orderNumber,
      kit_type: 'whole_genome',
      status: 'ordered',
      delivery_address: consentData.kitDelivery.address,
      delivery_phone: consentData.kitDelivery.phone,
      preferred_delivery_time: consentData.kitDelivery.preferredTime,
      consent_data: consentData,
      estimated_delivery_date: this.calculateDeliveryDate()
    };

    // For now, store in home_test_kits table with genomics-specific data
    const { data, error } = await supabase
      .from('home_test_kits')
      .insert({
        user_id: userId,
        kit_type: 'genomics',
        kit_name: 'Comprehensive Genomic Health Analysis',
        order_number: orderNumber,
        status: 'ordered',
        shipping_address: consentData.kitDelivery.address,
        price: 0, // Free for government partnership
        collection_instructions: JSON.stringify({
          steps: [
            'Collect saliva sample using provided tube',
            'Seal tube securely',
            'Complete return shipping label',
            'Drop off at any postal service location'
          ],
          notes: 'Fast for 30 minutes before collection. Do not eat, drink, smoke, or chew gum.'
        })
      })
      .select()
      .single();

    if (error) throw error;

    return {
      ...kitOrder,
      id: data.id,
      created_at: data.created_at,
      updated_at: data.updated_at
    } as GenomicsKitOrder;
  }

  /**
   * Update user onboarding data with genomics preferences
   */
  private async updateUserOnboardingWithGenomics(userId: string, consentData: GenomicsConsentData): Promise<void> {
    const currentOnboarding = PersonalizationService.getOnboardingData() || {};
    
    const updatedOnboarding = {
      ...currentOnboarding,
      genomicsEnabled: true,
      genomicsConsents: {
        personalizedHealthInsights: consentData.personalizedHealthInsights,
        pharmacogenomics: consentData.pharmacogenomics,
        carrierScreening: consentData.carrierScreening,
        familyPlanning: consentData.familyPlanning,
        researchParticipation: consentData.researchParticipation,
        dataSharing: consentData.dataSharing
      },
      healthProfile: {
        ...currentOnboarding.healthProfile,
        ...consentData.healthProfile
      }
    };

    // Update local storage
    localStorage.setItem('userOnboardingData', JSON.stringify(updatedOnboarding));
    
    // Update profile in database if exists
    const { error } = await supabase
      .from('profiles')
      .update({
        genomics_enabled: true,
        health_goals: consentData.healthProfile.currentConditions.length > 0 
          ? JSON.stringify(['Manage current conditions', 'Prevent future health issues'])
          : JSON.stringify(['Maintain optimal health', 'Prevent future health issues']),
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (error) {
      console.warn('Could not update profile with genomics info:', error);
    }
  }

  /**
   * Store detailed genomics consent preferences
   */
  private async storeGenomicsConsents(userId: string, consentData: GenomicsConsentData): Promise<void> {
    const consents = [
      {
        user_id: userId,
        consent_type: 'genomics_health_insights',
        consent_given: consentData.personalizedHealthInsights,
        consent_version: '1.0',
        metadata: {
          description: 'Personalized health insights based on genetic analysis',
          data_usage: 'Generate health risk assessments and prevention recommendations'
        }
      },
      {
        user_id: userId,
        consent_type: 'pharmacogenomics',
        consent_given: consentData.pharmacogenomics,
        consent_version: '1.0',
        metadata: {
          description: 'Medication response analysis based on genetic markers',
          data_usage: 'Provide personalized medication dosing and safety recommendations'
        }
      },
      {
        user_id: userId,
        consent_type: 'carrier_screening',
        consent_given: consentData.carrierScreening,
        consent_version: '1.0',
        metadata: {
          description: 'Screening for genetic variants that could affect offspring',
          data_usage: 'Inform family planning decisions and genetic counseling'
        }
      },
      {
        user_id: userId,
        consent_type: 'research_participation',
        consent_given: consentData.researchParticipation,
        consent_version: '1.0',
        metadata: {
          description: 'Participation in health research using anonymized genetic data',
          data_usage: 'Advance medical research and population health studies'
        }
      },
      {
        user_id: userId,
        consent_type: 'population_health_data',
        consent_given: consentData.dataSharing,
        consent_version: '1.0',
        metadata: {
          description: 'Contribution to national health surveillance (anonymized)',
          data_usage: 'Support public health initiatives and disease prevention programs'
        }
      }
    ];

    const { error } = await supabase
      .from('user_consents')
      .insert(consents.map(consent => ({
        ...consent,
        consent_date: new Date().toISOString()
      })));

    if (error) {
      console.warn('Could not store genomics consents:', error);
    }
  }

  /**
   * Create timeline event for genomics activity
   */
  private async createGenomicsTimelineEvent(
    userId: string, 
    eventType: string, 
    metadata: any
  ): Promise<void> {
    const { error } = await supabase
      .from('health_timeline_events')
      .insert({
        user_id: userId,
        event_type: eventType,
        event_title: 'Genomics Kit Ordered',
        event_description: 'Free genomics analysis kit ordered through government partnership',
        event_date: new Date().toISOString(),
        metadata: metadata,
        is_milestone: true,
        privacy_level: 'private'
      });

    if (error) {
      console.warn('Could not create genomics timeline event:', error);
    }
  }

  /**
   * Process genomics results and enhance user profile
   */
  async processGenomicsResults(userId: string, resultsData: any): Promise<void> {
    try {
      // Process results through genomics service
      const processedResults = await this.analyzeGenomicsResults(resultsData);
      
      // Create enhanced health profile
      const enhancedProfile = await this.createEnhancedHealthProfile(userId, processedResults);
      
      // Update user recommendations
      await this.updatePersonalizedRecommendations(userId, enhancedProfile);
      
      // Create timeline event for results
      await this.createGenomicsTimelineEvent(userId, 'genomics_results_available', {
        results_summary: processedResults.summary,
        actionable_insights: processedResults.actionableInsights.length
      });

      // Trigger notifications
      await this.sendGenomicsResultsNotification(userId, processedResults);

    } catch (error) {
      console.error('Error processing genomics results:', error);
      throw error;
    }
  }

  /**
   * Analyze genomics results and extract insights
   */
  private async analyzeGenomicsResults(resultsData: any): Promise<any> {
    // This would integrate with the GenomicsService for detailed analysis
    // For now, return mock processed results
    return {
      summary: {
        variants_analyzed: 4523,
        actionable_variants: 12,
        risk_variants: 3,
        pharmacogenetic_variants: 8
      },
      actionableInsights: [
        {
          type: 'cardiovascular_risk',
          level: 'moderate',
          recommendation: 'Enhanced cardiovascular screening recommended',
          actions: ['Annual ECG', 'Lipid profile every 6 months', 'Regular exercise program']
        },
        {
          type: 'medication_sensitivity',
          level: 'high',
          recommendation: 'Increased sensitivity to blood thinners',
          actions: ['Inform healthcare providers', 'Start with lower doses', 'Monitor closely']
        }
      ],
      riskScores: {
        cardiovascular: 65,
        diabetes: 35,
        cancer: 45,
        neurological: 25
      }
    };
  }

  /**
   * Create enhanced health profile based on genomics results
   */
  private async createEnhancedHealthProfile(userId: string, results: any): Promise<GenomicsEnhancedProfile> {
    const enhancedProfile: GenomicsEnhancedProfile = {
      user_id: userId,
      genomics_completed: true,
      risk_scores: results.riskScores,
      pharmacogenomics: {
        drug_sensitivities: ['warfarin', 'clopidogrel'],
        metabolism_type: 'intermediate',
        recommendations: ['Start with 50% standard dose', 'Monitor therapeutic levels closely']
      },
      carrier_status: {
        conditions: [],
        family_planning_recommendations: []
      },
      lifestyle_recommendations: [
        'Mediterranean diet for cardiovascular health',
        'Regular aerobic exercise 150 minutes/week',
        'Stress management techniques',
        'Annual comprehensive health screening'
      ],
      updated_at: new Date().toISOString()
    };

    // Store enhanced profile (would be in a dedicated table in real implementation)
    localStorage.setItem(`genomicsProfile_${userId}`, JSON.stringify(enhancedProfile));

    return enhancedProfile;
  }

  /**
   * Update personalized recommendations based on genomics results
   */
  private async updatePersonalizedRecommendations(userId: string, profile: GenomicsEnhancedProfile): Promise<void> {
    const currentOnboarding = PersonalizationService.getOnboardingData() || {};
    
    const updatedOnboarding = {
      ...currentOnboarding,
      genomicsCompleted: true,
      enhancedRecommendations: {
        preventiveCare: profile.lifestyle_recommendations,
        riskBasedScreening: this.generateRiskBasedRecommendations(profile.risk_scores),
        pharmacogenomics: profile.pharmacogenomics.recommendations
      }
    };

    localStorage.setItem('userOnboardingData', JSON.stringify(updatedOnboarding));
  }

  /**
   * Generate risk-based health recommendations
   */
  private generateRiskBasedRecommendations(riskScores: any): string[] {
    const recommendations = [];

    if (riskScores.cardiovascular > 50) {
      recommendations.push('Annual cardiology consultation');
      recommendations.push('Enhanced lipid monitoring');
    }

    if (riskScores.diabetes > 50) {
      recommendations.push('Diabetes screening every 6 months');
      recommendations.push('Nutritionist consultation');
    }

    if (riskScores.cancer > 50) {
      recommendations.push('Enhanced cancer screening protocols');
      recommendations.push('Genetic counseling consultation');
    }

    return recommendations;
  }

  /**
   * Send notification about genomics results availability
   */
  private async sendGenomicsResultsNotification(userId: string, results: any): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type: 'genomics_results',
        title: 'Your Genomics Results Are Ready!',
        message: `Your comprehensive genetic health analysis is complete with ${results.actionableInsights.length} actionable insights to optimize your health.`,
        action_url: '/health-insights'
      });

    if (error) {
      console.warn('Could not create genomics results notification:', error);
    }
  }

  /**
   * Get user's genomics status and data
   */
  async getUserGenomicsStatus(userId: string): Promise<{
    hasOrdered: boolean;
    kitStatus?: string;
    resultsAvailable: boolean;
    enhancedProfile?: GenomicsEnhancedProfile;
  }> {
    try {
      // Check for kit order
      const { data: kitOrder } = await supabase
        .from('home_test_kits')
        .select('*')
        .eq('user_id', userId)
        .eq('kit_type', 'genomics')
        .single();

      // Check for enhanced profile
      const profileData = localStorage.getItem(`genomicsProfile_${userId}`);
      const enhancedProfile = profileData ? JSON.parse(profileData) : null;

      return {
        hasOrdered: !!kitOrder,
        kitStatus: kitOrder?.status,
        resultsAvailable: !!enhancedProfile,
        enhancedProfile
      };
    } catch (error) {
      console.error('Error getting genomics status:', error);
      return {
        hasOrdered: false,
        resultsAvailable: false
      };
    }
  }

  /**
   * Calculate estimated delivery date
   */
  private calculateDeliveryDate(): string {
    const date = new Date();
    date.setDate(date.getDate() + 5); // 5 business days
    return date.toISOString().split('T')[0];
  }

  /**
   * Update kit status (for admin/lab use)
   */
  async updateKitStatus(orderId: string, status: GenomicsKitOrder['status'], trackingNumber?: string): Promise<void> {
    const updateData: any = { 
      status,
      updated_at: new Date().toISOString()
    };
    
    if (trackingNumber) {
      updateData.tracking_number = trackingNumber;
    }

    const { error } = await supabase
      .from('home_test_kits')
      .update(updateData)
      .eq('id', orderId);

    if (error) {
      console.error('Error updating kit status:', error);
      throw error;
    }
  }
}

export const genomicsIntegrationService = new GenomicsIntegrationService();