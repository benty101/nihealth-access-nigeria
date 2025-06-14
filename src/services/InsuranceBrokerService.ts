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
  apiSource: 'mycover' | 'curacel' | 'direct' | 'mock';
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
  apiSource: string;
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
  apiSource: 'mycover' | 'curacel' | 'direct';
}

// MyCover.ai API Types
interface MyCoverQuoteRequest {
  product_type: 'health';
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    age: number;
    gender: string;
    state: string;
  };
  coverage_amount: number;
  plan_type: string;
}

interface MyCoverQuoteResponse {
  quote_id: string;
  insurer: string;
  premium: number;
  coverage: number;
  valid_until: string;
  features: string[];
  commission_rate?: number;
}

// Curacel API Types
interface CuracelHMOResponse {
  id: string;
  name: string;
  plans: Array<{
    id: string;
    name: string;
    premium: number;
    coverage: number;
    features: string[];
  }>;
}

class InsuranceBrokerService {
  private readonly MYCOVER_API_BASE = 'https://api.mycover.ai/v1';
  private readonly CURACEL_API_BASE = 'https://api.health.curacel.co/api/v1';

  // MyCover.ai Integration
  async getMyCoverQuote(request: InsuranceQuoteRequest): Promise<InsuranceQuote[]> {
    try {
      const apiKey = await this.getApiKey('MYCOVER_API_KEY');
      if (!apiKey) {
        console.log('MyCover API key not configured, using mock data');
        return [];
      }

      const [firstName, ...lastNameParts] = request.personalInfo.fullName.split(' ');
      const lastName = lastNameParts.join(' ') || firstName;

      const myCoverRequest: MyCoverQuoteRequest = {
        product_type: 'health',
        customer: {
          first_name: firstName,
          last_name: lastName,
          email: request.personalInfo.email,
          phone: request.personalInfo.phone,
          age: request.personalInfo.age,
          gender: request.personalInfo.gender,
          state: request.personalInfo.state
        },
        coverage_amount: request.coverageAmount,
        plan_type: request.coverageType
      };

      const response = await fetch(`${this.MYCOVER_API_BASE}/quotes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(myCoverRequest)
      });

      if (!response.ok) {
        throw new Error(`MyCover API error: ${response.statusText}`);
      }

      const quotes: MyCoverQuoteResponse[] = await response.json();
      
      return quotes.map(quote => ({
        id: quote.quote_id,
        insurerId: quote.insurer.toLowerCase().replace(/\s+/g, '-'),
        insurerName: quote.insurer,
        premium: quote.premium,
        coverage: `₦${quote.coverage.toLocaleString()}`,
        commission: quote.premium * (quote.commission_rate || 0.15),
        commissionRate: quote.commission_rate || 0.15,
        validUntil: quote.valid_until,
        features: quote.features,
        terms: '12 months coverage period',
        status: 'pending' as const,
        apiSource: 'mycover' as const
      }));

    } catch (error) {
      console.error('MyCover API error:', error);
      return [];
    }
  }

  // Curacel Integration
  async getCuracelHMOs(): Promise<InsurerAPI[]> {
    try {
      const apiKey = await this.getApiKey('CURACEL_API_KEY');
      if (!apiKey) {
        console.log('Curacel API key not configured');
        return [];
      }

      const response = await fetch(`${this.CURACEL_API_BASE}/hmos`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Curacel API error: ${response.statusText}`);
      }

      const hmos: CuracelHMOResponse[] = await response.json();
      
      return hmos.map(hmo => ({
        id: hmo.id,
        name: hmo.name,
        apiEndpoint: `${this.CURACEL_API_BASE}/hmos/${hmo.id}`,
        apiKey: '',
        isActive: true,
        commissionRate: 0.12, // Default commission rate
        contactEmail: `partnerships@${hmo.name.toLowerCase().replace(/\s+/g, '')}.com`,
        contactPhone: '+234-1-000-0000',
        apiDocumentation: 'https://docs.curacel.co/',
        apiSource: 'curacel' as const
      }));

    } catch (error) {
      console.error('Curacel API error:', error);
      return [];
    }
  }

  async getCuracelQuotes(request: InsuranceQuoteRequest): Promise<InsuranceQuote[]> {
    try {
      const apiKey = await this.getApiKey('CURACEL_API_KEY');
      if (!apiKey) {
        console.log('Curacel API key not configured, using mock data');
        return [];
      }

      // Get available HMOs first
      const hmos = await this.getCuracelHMOs();
      const quotes: InsuranceQuote[] = [];

      // Get quotes from each HMO
      for (const hmo of hmos.slice(0, 3)) { // Limit to first 3 for demo
        try {
          const response = await fetch(`${this.CURACEL_API_BASE}/hmos/${hmo.id}/quote`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              customer: request.personalInfo,
              coverage_amount: request.coverageAmount,
              plan_type: request.coverageType
            })
          });

          if (response.ok) {
            const quoteData = await response.json();
            quotes.push({
              id: crypto.randomUUID(),
              insurerId: hmo.id,
              insurerName: hmo.name,
              premium: quoteData.premium || this.calculateMockPremium(request),
              coverage: `₦${request.coverageAmount.toLocaleString()}`,
              commission: (quoteData.premium || this.calculateMockPremium(request)) * hmo.commissionRate,
              commissionRate: hmo.commissionRate,
              validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              features: quoteData.features || ['Outpatient Care', 'Emergency Services', 'Prescription Coverage'],
              terms: '12 months coverage period',
              status: 'pending' as const,
              apiSource: 'curacel' as const
            });
          }
        } catch (error) {
          console.error(`Error getting quote from ${hmo.name}:`, error);
        }
      }

      return quotes;

    } catch (error) {
      console.error('Curacel quotes error:', error);
      return [];
    }
  }

  // Main quote aggregation method
  async getQuotesFromAllInsurers(request: InsuranceQuoteRequest): Promise<InsuranceQuote[]> {
    const allQuotes: InsuranceQuote[] = [];

    try {
      // Get quotes from MyCover.ai
      const myCoverQuotes = await this.getMyCoverQuote(request);
      allQuotes.push(...myCoverQuotes);

      // Get quotes from Curacel
      const curacelQuotes = await this.getCuracelQuotes(request);
      allQuotes.push(...curacelQuotes);

      // If no real API quotes, add mock data for demonstration
      if (allQuotes.length === 0) {
        console.log('No API quotes available, generating mock quotes');
        const mockQuotes = await this.getMockQuotes(request);
        allQuotes.push(...mockQuotes);
      }

    } catch (error) {
      console.error('Error aggregating quotes:', error);
      // Fallback to mock quotes
      const mockQuotes = await this.getMockQuotes(request);
      allQuotes.push(...mockQuotes);
    }

    return allQuotes.sort((a, b) => a.premium - b.premium);
  }

  // Purchase policy through MyCover.ai
  async purchasePolicy(quoteId: string, quote: InsuranceQuote, paymentDetails: any): Promise<{success: boolean, policyNumber?: string, error?: string}> {
    try {
      if (quote.apiSource === 'mycover') {
        const apiKey = await this.getApiKey('MYCOVER_API_KEY');
        if (!apiKey) {
          return { success: false, error: 'MyCover API key not configured' };
        }

        const response = await fetch(`${this.MYCOVER_API_BASE}/products/${quote.insurerId}/purchase`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            quote_id: quoteId,
            payment_details: paymentDetails
          })
        });

        if (response.ok) {
          const result = await response.json();
          await this.trackCommission(quote, result.policy_number);
          return { success: true, policyNumber: result.policy_number };
        }
      }

      // For other sources, implement similar logic
      return { success: false, error: 'Purchase not available for this quote source' };

    } catch (error) {
      console.error('Purchase error:', error);
      return { success: false, error: 'Purchase failed' };
    }
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
      policyNumber,
      apiSource: quote.apiSource
    };

    console.log('Tracking commission:', commission);
    return commission;
  }

  async getCommissionSummary(timeframe: 'week' | 'month' | 'quarter' | 'year') {
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
    const staticInsurers: InsurerAPI[] = [
      {
        id: 'mycover-multiinsurer',
        name: 'MyCover.ai (Multi-Insurer)',
        apiEndpoint: 'https://api.mycover.ai/v1',
        apiKey: '',
        isActive: false,
        commissionRate: 0.15,
        contactEmail: 'partners@mycover.ai',
        contactPhone: '+234-1-000-0000',
        apiDocumentation: 'https://docs.mycover.ai/api-reference',
        apiSource: 'mycover'
      },
      {
        id: 'curacel-hmos',
        name: 'Curacel HMOs',
        apiEndpoint: 'https://api.health.curacel.co/api/v1',
        apiKey: '',
        isActive: false,
        commissionRate: 0.12,
        contactEmail: 'partnerships@curacel.co',
        contactPhone: '+234-1-000-0000',
        apiDocumentation: 'https://api.health.curacel.co/api/v1/hmos',
        apiSource: 'curacel'
      }
    ];

    try {
      // Add dynamic Curacel HMOs
      const curacelHMOs = await this.getCuracelHMOs();
      staticInsurers.push(...curacelHMOs);
    } catch (error) {
      console.error('Error fetching Curacel HMOs:', error);
    }

    return staticInsurers;
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

  private async getApiKey(keyName: string): Promise<string | null> {
    // In production, this would get the API key from Supabase secrets
    // For now, return null to trigger mock data
    return null;
  }

  private calculateMockPremium(request: InsuranceQuoteRequest): number {
    const baseRate = 5000;
    const ageMultiplier = request.personalInfo.age > 40 ? 1.3 : 1.0;
    return Math.round(baseRate * ageMultiplier + (request.coverageAmount * 0.002));
  }

  private async getMockQuotes(request: InsuranceQuoteRequest): Promise<InsuranceQuote[]> {
    const mockInsurers = [
      { id: 'aiico', name: 'AIICO Insurance', rate: 0.15 },
      { id: 'axa', name: 'AXA Mansard', rate: 0.12 },
      { id: 'leadway', name: 'Leadway Assurance', rate: 0.18 }
    ];

    return mockInsurers.map(insurer => {
      const premium = this.calculateMockPremium(request);
      return {
        id: crypto.randomUUID(),
        insurerId: insurer.id,
        insurerName: insurer.name,
        premium,
        coverage: `₦${request.coverageAmount.toLocaleString()}`,
        commission: Math.round(premium * insurer.rate),
        commissionRate: insurer.rate,
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        features: ['Outpatient Care', 'Emergency Services', 'Prescription Coverage'],
        terms: '12 months coverage period',
        status: 'pending' as const,
        apiSource: 'mock' as const
      };
    });
  }
}

export const insuranceBrokerService = new InsuranceBrokerService();
