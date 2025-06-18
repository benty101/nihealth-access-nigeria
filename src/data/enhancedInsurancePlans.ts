
import { insurancePlans } from './insurancePlans';
import { additionalNigerianInsurance } from './additionalNigerianInsurance';

// Combine all insurance plans for a comprehensive Nigerian insurance comparison platform
export const enhancedInsurancePlans = [
  ...insurancePlans,
  ...additionalNigerianInsurance
];

// Insurance categories for better organization
export const insuranceCategories = {
  premium: 'Premium Plans',
  corporate: 'Corporate Plans',
  state: 'State Health Schemes',
  microinsurance: 'Microinsurance',
  international: 'International Plans',
  professional: 'Professional Plans',
  religious: 'Faith-Based Plans',
  youth: 'Youth Plans',
  women: 'Women-Focused Plans',
  senior: 'Senior Citizens',
  tech: 'Technology Sector',
  agriculture: 'Agricultural Plans',
  banking: 'Banking Sector'
};

// Popular providers in Nigeria
export const topInsuranceProviders = [
  'Hygeia HMO',
  'AIICO Insurance',
  'Sterling Health HMO',
  'AXA Mansard',
  'Leadway Health',
  'Total Health Trust',
  'NHIS',
  'Dangote Group',
  'MTN Nigeria',
  'Lagos State Health Scheme'
];

// Insurance plan statistics
export const insuranceStats = {
  totalPlans: enhancedInsurancePlans.length,
  averagePremium: Math.round(
    enhancedInsurancePlans.reduce((sum, plan) => {
      const premium = parseInt(plan.monthlyPremium.replace(/[₦,]/g, ''));
      return sum + premium;
    }, 0) / enhancedInsurancePlans.length
  ),
  averageRating: (
    enhancedInsurancePlans.reduce((sum, plan) => sum + plan.rating, 0) / 
    enhancedInsurancePlans.length
  ).toFixed(1),
  coverageRange: {
    min: Math.min(...enhancedInsurancePlans.map(plan => 
      parseInt(plan.coverage.replace(/[₦,]/g, ''))
    )),
    max: Math.max(...enhancedInsurancePlans.map(plan => 
      parseInt(plan.coverage.replace(/[₦,]/g, ''))
    ))
  }
};
