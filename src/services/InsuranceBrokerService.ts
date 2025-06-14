
import { supabase } from '@/integrations/supabase/client';

export interface InsuranceQuoteRequest {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    age: number;
    gender: string;
    state: string;
  };
  coverageType: string;
  coverageAmount: number;
  familySize?: number;
  preExistingConditions?: string[];
}

export interface InsuranceQuote {
  id: string;
  insurerId: string;
  insurerName: string;
  premium: number;
  coverage: string;
  commission: number;
  commissionRate: number;
  validUntil: string;
  features: string[];
  terms: string;
  status: 'pending' | 'approved' | 'declined';
}

export interface Commission {
  id: string;
  quoteId: string;
  insurerId: string;
  amount: number;
  rate: number;
  status: 'pending' | 'paid' | 'overdue';
  dateEarned: string;
  datePaid?: string;
  policyNumber?: string;
}

export interface InsurerAPI {
  id: string;
  name: string;
  apiEndpoint: string;
  apiKey: string;
  isActive: boolean;
  commissionRate: number;
  contactEmail: string;
  contactPhone: string;
  apiDocumentation: string;
}

class InsuranceBrokerService {
  // API Integration Framework
  async getQuoteFromInsurer(insurerId: string, request: InsuranceQuoteRequest): Promise<InsuranceQuote | null> {
    try {
      // This will be replaced with actual API calls when you get insurer API access
      console.log(`Getting quote from ${insurerId}:`, request);
      
      // For now, return mock data but with proper structure for real integration
      return this.generateMockQuote(insurerId, request);
    } catch (error) {
      console.error(`Error getting quote from ${insurerId}:`, error);
      return null;
    }
  }

  async getQuotesFromAllInsurers(request: InsuranceQuoteRequest): Promise<InsuranceQuote[]> {
    const insurers = await this.getActiveInsurers();
    const quotes: InsuranceQuote[] = [];

    for (const insurer of insurers) {
      const quote = await this.getQuoteFromInsurer(insurer.id, request);
      if (quote) {
        quotes.push(quote);
      }
    }

    return quotes.sort((a, b) => a.premium - b.premium);
  }

  // Commission Tracking
  async trackCommission(quote: InsuranceQuote, policyNumber?: string): Promise<Commission> {
    const commission: Commission = {
      id: crypto.randomUUID(),
      quoteId: quote.id,
      insurerId: quote.insurerId,
      amount: quote.commission,
      rate: quote.commissionRate,
      status: 'pending',
      dateEarned: new Date().toISOString(),
      policyNumber
    };

    // Store in database (you'll need to create this table)
    console.log('Tracking commission:', commission);
    return commission;
  }

  async getCommissionSummary(timeframe: 'week' | 'month' | 'quarter' | 'year') {
    // This would query your database for commission data
    return {
      totalEarned: 0,
      totalPending: 0,
      totalPaid: 0,
      commissionsByInsurer: [],
      recentCommissions: []
    };
  }

  // Insurer Management
  async getActiveInsurers(): Promise<InsurerAPI[]> {
    // This would come from your database
    return [
      {
        id: 'aiico',
        name: 'AIICO Insurance',
        apiEndpoint: 'https://api.aiico.com.ng/v1',
        apiKey: '', // To be set when you get API access
        isActive: false,
        commissionRate: 0.15,
        contactEmail: 'partners@aiico.com.ng',
        contactPhone: '+234-1-2701030',
        apiDocumentation: 'https://developer.aiico.com.ng'
      },
      {
        id: 'axa',
        name: 'AXA Mansard',
        apiEndpoint: 'https://api.axamansard.com/v1',
        apiKey: '',
        isActive: false,
        commissionRate: 0.12,
        contactEmail: 'partnerships@axamansard.com',
        contactPhone: '+234-1-2701807',
        apiDocumentation: 'https://developer.axamansard.com'
      },
      {
        id: 'leadway',
        name: 'Leadway Assurance',
        apiEndpoint: 'https://api.leadway.com.ng/v1',
        apiKey: '',
        isActive: false,
        commissionRate: 0.18,
        contactEmail: 'brokers@leadway.com.ng',
        contactPhone: '+234-1-2800200',
        apiDocumentation: 'https://developer.leadway.com.ng'
      }
    ];
  }

  // Real API Integration Methods (for when you get API access)
  async integrateAIICO(apiKey: string) {
    // Implementation for AIICO API
    console.log('Integrating with AIICO API...');
  }

  async integrateAXA(apiKey: string) {
    // Implementation for AXA Mansard API
    console.log('Integrating with AXA API...');
  }

  async integrateLeadway(apiKey: string) {
    // Implementation for Leadway API
    console.log('Integrating with Leadway API...');
  }

  // Helper method for mock data (remove when real APIs are integrated)
  private generateMockQuote(insurerId: string, request: InsuranceQuoteRequest): InsuranceQuote {
    const baseRate = 5000;
    const ageMultiplier = request.personalInfo.age > 40 ? 1.3 : 1.0;
    const premium = baseRate * ageMultiplier + (request.coverageAmount * 0.002);
    const commissionRate = this.getCommissionRate(insurerId);

    return {
      id: crypto.randomUUID(),
      insurerId,
      insurerName: this.getInsurerName(insurerId),
      premium: Math.round(premium),
      coverage: `₦${request.coverageAmount.toLocaleString()}`,
      commission: Math.round(premium * commissionRate),
      commissionRate,
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      features: ['Outpatient Care', 'Emergency Services', 'Prescription Coverage'],
      terms: '12 months coverage period',
      status: 'pending'
    };
  }

  private getCommissionRate(insurerId: string): number {
    const rates: Record<string, number> = {
      'aiico': 0.15,
      'axa': 0.12,
      'leadway': 0.18
    };
    return rates[insurerId] || 0.10;
  }

  private getInsurerName(insurerId: string): string {
    const names: Record<string, string> = {
      'aiico': 'AIICO Insurance',
      'axa': 'AXA Mansard',
      'leadway': 'Leadway Assurance'
    };
    return names[insurerId] || 'Unknown Insurer';
  }
}

export const insuranceBrokerService = new InsuranceBrokerService();
