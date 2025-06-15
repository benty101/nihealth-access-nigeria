
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import EnhancedInsuranceSearch from '@/components/insurance/EnhancedInsuranceSearch';
import InsuranceFilters from '@/components/insurance/InsuranceFilters';
import InsurancePlanCard from '@/components/insurance/InsurancePlanCard';
import InsuranceComparison from '@/components/insurance/InsuranceComparison';
import InsuranceHelpSection from '@/components/insurance/InsuranceHelpSection';
import UserGuidance from '@/components/onboarding/UserGuidance';
import { insurancePlans } from '@/data/insurancePlans';

const Insurance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [filters, setFilters] = useState({
    priceRange: [1000, 50000],
    coverage: 'all',
    type: 'all',
    features: [],
    rating: 0
  });
  const [showFilters, setShowFilters] = useState(true);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonPlans, setComparisonPlans] = useState<any[]>([]);

  // Filter and sort plans
  const filteredPlans = insurancePlans.filter(plan => {
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
  }).sort((a, b) => {
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

  const handleAddToComparison = (plan: any) => {
    if (comparisonPlans.length < 3 && !comparisonPlans.find(p => p.id === plan.id)) {
      setComparisonPlans([...comparisonPlans, plan]);
      setShowComparison(true);
    }
  };

  const handleRemoveFromComparison = (planId: string) => {
    setComparisonPlans(comparisonPlans.filter(p => p.id !== planId));
    if (comparisonPlans.length <= 1) {
      setShowComparison(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [1000, 50000],
      coverage: 'all',
      type: 'all',
      features: [],
      rating: 0
    });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <UserGuidance />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Search Section */}
        <EnhancedInsuranceSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          resultsCount={filteredPlans.length}
          totalCount={insurancePlans.length}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-80">
              <InsuranceFilters
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
              />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Comparison Panel */}
            {showComparison && comparisonPlans.length > 0 && (
              <div className="mb-6">
                <InsuranceComparison
                  selectedPlans={comparisonPlans}
                  onRemovePlan={handleRemoveFromComparison}
                  onClearComparison={() => {
                    setComparisonPlans([]);
                    setShowComparison(false);
                  }}
                />
              </div>
            )}

            {/* Insurance Plans Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPlans.map((plan) => (
                <InsurancePlanCard
                  key={plan.id}
                  plan={plan}
                  onSelectPlan={(plan) => console.log('Selected plan:', plan)}
                  onAddToComparison={handleAddToComparison}
                  isInComparison={comparisonPlans.some(p => p.id === plan.id)}
                  comparisonFull={comparisonPlans.length >= 3}
                />
              ))}
            </div>

            {filteredPlans.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-4">
                  No insurance plans match your criteria
                </div>
                <button
                  onClick={clearFilters}
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <InsuranceHelpSection />
      </div>
    </div>
  );
};

export default Insurance;
