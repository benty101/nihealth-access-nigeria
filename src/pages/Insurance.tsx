
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { insurancePlans, InsurancePlan } from '@/data/insurancePlans';
import { useInsuranceFiltering } from '@/hooks/useInsuranceFiltering';
import InsuranceSearchAndSort from '@/components/insurance/InsuranceSearchAndSort';
import InsuranceFilters from '@/components/insurance/InsuranceFilters';
import InsuranceComparison from '@/components/insurance/InsuranceComparison';
import InsurancePlanCard from '@/components/insurance/InsurancePlanCard';
import PaymentMethods from '@/components/insurance/PaymentMethods';
import InsuranceHelpSection from '@/components/insurance/InsuranceHelpSection';
import { Button } from '@/components/ui/button';

const Insurance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<InsurancePlan[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [selectedPlan, setSelectedPlan] = useState<InsurancePlan | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const [filters, setFilters] = useState({
    priceRange: [1000, 50000],
    coverage: 'all',
    type: 'all',
    features: [] as string[],
    rating: 0
  });

  const sortedPlans = useInsuranceFiltering(insurancePlans, searchTerm, filters, sortBy);

  const handleAddToComparison = (plan: InsurancePlan) => {
    if (selectedForComparison.length < 3 && !selectedForComparison.find(p => p.id === plan.id)) {
      setSelectedForComparison([...selectedForComparison, plan]);
      setShowComparison(true);
    }
  };

  const handleRemoveFromComparison = (planId: string) => {
    setSelectedForComparison(selectedForComparison.filter(p => p.id !== planId));
  };

  const handleSelectPlan = (plan: InsurancePlan) => {
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handlePaymentInitiate = (method: string, details: any) => {
    console.log('Payment initiated:', method, details);
    // Here you would integrate with actual payment processor
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Compare Health Insurance Plans
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Find the perfect health insurance plan for you and your family, with special focus on maternal care
            </p>
            
            <InsuranceSearchAndSort
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortBy={sortBy}
              onSortChange={setSortBy}
              showFilters={showFilters}
              onToggleFilters={() => setShowFilters(!showFilters)}
              showComparison={showComparison}
              onToggleComparison={() => setShowComparison(!showComparison)}
              comparisonCount={selectedForComparison.length}
              resultsCount={sortedPlans.length}
              totalCount={insurancePlans.length}
            />
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="col-span-12 lg:col-span-3">
                <InsuranceFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={() => setFilters({
                    priceRange: [1000, 50000],
                    coverage: 'all',
                    type: 'all',
                    features: [],
                    rating: 0
                  })}
                />
              </div>
            )}

            {/* Main Content */}
            <div className={`col-span-12 ${showFilters ? 'lg:col-span-9' : ''}`}>
              {/* Comparison Panel */}
              {showComparison && (
                <div className="mb-6">
                  <InsuranceComparison
                    selectedPlans={selectedForComparison}
                    onRemovePlan={handleRemoveFromComparison}
                    onClearComparison={() => {
                      setSelectedForComparison([]);
                      setShowComparison(false);
                    }}
                  />
                </div>
              )}

              {/* Insurance Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {sortedPlans.map((plan) => (
                  <InsurancePlanCard
                    key={plan.id}
                    plan={plan}
                    onSelectPlan={handleSelectPlan}
                    onAddToComparison={handleAddToComparison}
                    isInComparison={!!selectedForComparison.find(p => p.id === plan.id)}
                    comparisonFull={selectedForComparison.length >= 3}
                  />
                ))}
              </div>

              {/* Payment Modal */}
              {showPayment && selectedPlan && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-4 border-b flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Complete Your Purchase</h2>
                      <Button variant="ghost" onClick={() => setShowPayment(false)}>×</Button>
                    </div>
                    <div className="p-4">
                      <PaymentMethods
                        selectedPlan={selectedPlan}
                        onPaymentInitiate={handlePaymentInitiate}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <InsuranceHelpSection />
        </div>
      </div>
    </div>
  );
};

export default Insurance;
