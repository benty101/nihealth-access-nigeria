
import { useMemo } from 'react';
import { InsurancePlan } from '@/data/insurancePlans';

interface FilterState {
  priceRange: number[];
  coverage: string;
  type: string;
  features: string[];
  rating: number;
}

export const useInsuranceFiltering = (
  plans: InsurancePlan[],
  searchTerm: string,
  filters: FilterState,
  sortBy: string
) => {
  const filteredPlans = useMemo(() => {
    return plans.filter(plan => {
      const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           plan.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      const price = parseInt(plan.monthlyPremium.replace(/[₦,]/g, ''));
      const matchesPrice = price >= filters.priceRange[0] && price <= filters.priceRange[1];
      
      const coverage = parseInt(plan.coverage.replace(/[₦,]/g, ''));
      const matchesCoverage = filters.coverage === 'all' || coverage >= parseInt(filters.coverage);
      
      const matchesType = filters.type === 'all' || 
                         (filters.type === 'hmo' && plan.type.toLowerCase().includes('hmo')) ||
                         (filters.type === 'insurance' && !plan.type.toLowerCase().includes('hmo')) ||
                         (filters.type === 'family' && plan.type.toLowerCase().includes('family')) ||
                         (filters.type === 'premium' && plan.type.toLowerCase().includes('premium'));
      
      const matchesRating = plan.rating >= filters.rating;
      
      const matchesFeatures = filters.features.length === 0 || 
                             filters.features.every(feature => 
                               plan.features.some(planFeature => 
                                 planFeature.toLowerCase().includes(feature.toLowerCase())
                               )
                             );

      return matchesSearch && matchesPrice && matchesCoverage && matchesType && matchesRating && matchesFeatures;
    });
  }, [plans, searchTerm, filters]);

  const sortedPlans = useMemo(() => {
    return [...filteredPlans].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseInt(a.monthlyPremium.replace(/[₦,]/g, '')) - parseInt(b.monthlyPremium.replace(/[₦,]/g, ''));
        case 'price-high':
          return parseInt(b.monthlyPremium.replace(/[₦,]/g, '')) - parseInt(a.monthlyPremium.replace(/[₦,]/g, ''));
        case 'rating':
          return b.rating - a.rating;
        case 'coverage':
          return parseInt(b.coverage.replace(/[₦,]/g, '')) - parseInt(a.coverage.replace(/[₦,]/g, ''));
        default:
          return b.popular ? 1 : -1;
      }
    });
  }, [filteredPlans, sortBy]);

  return sortedPlans;
};
