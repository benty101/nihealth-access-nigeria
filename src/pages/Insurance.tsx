
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import EnhancedInsuranceSearch from '@/components/insurance/EnhancedInsuranceSearch';
import InsuranceFilters from '@/components/insurance/InsuranceFilters';
import InsurancePlanCard from '@/components/insurance/InsurancePlanCard';
import InsuranceComparison from '@/components/insurance/InsuranceComparison';
import InsuranceHelpSection from '@/components/insurance/InsuranceHelpSection';
import UserGuidance from '@/components/onboarding/UserGuidance';
import { useInsuranceFiltering } from '@/hooks/useInsuranceFiltering';

const Insurance = () => {
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonPlans, setComparisonPlans] = useState<any[]>([]);

  const {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filters,
    setFilters,
    filteredPlans,
    showFilters,
    setShowFilters
  } = useInsuranceFiltering();

  const handleAddToComparison = (plan: any) => {
    if (comparisonPlans.length < 3 && !comparisonPlans.find(p => p.id === plan.id)) {
      setComparisonPlans([...comparisonPlans, plan]);
    }
  };

  const handleRemoveFromComparison = (planId: string) => {
    setComparisonPlans(comparisonPlans.filter(p => p.id !== planId));
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
          totalCount={filteredPlans.length}
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
                  plans={comparisonPlans}
                  onRemovePlan={handleRemoveFromComparison}
                />
              </div>
            )}

            {/* Insurance Plans Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPlans.map((plan) => (
                <InsurancePlanCard
                  key={plan.id}
                  plan={plan}
                  onAddToComparison={handleAddToComparison}
                  isInComparison={comparisonPlans.some(p => p.id === plan.id)}
                  comparisonCount={comparisonPlans.length}
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
