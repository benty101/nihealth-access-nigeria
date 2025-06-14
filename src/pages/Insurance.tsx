
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
import { Shield, TrendingUp, Users, Award } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <Navbar />
      
      <div className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Find Your Perfect Health Insurance
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Compare over 100+ health insurance plans with special focus on maternal care. 
              Get comprehensive coverage for you and your family.
            </p>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-sm border">
                <Users className="h-6 w-6 text-teal-600" />
                <div>
                  <div className="font-bold text-lg text-gray-900">100+</div>
                  <div className="text-sm text-gray-600">Insurance Plans</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-sm border">
                <Award className="h-6 w-6 text-teal-600" />
                <div>
                  <div className="font-bold text-lg text-gray-900">Verified</div>
                  <div className="text-sm text-gray-600">Licensed Providers</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-sm border">
                <TrendingUp className="h-6 w-6 text-teal-600" />
                <div>
                  <div className="font-bold text-lg text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Expert Support</div>
                </div>
              </div>
            </div>
            
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

          <div className="grid grid-cols-12 gap-8">
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="col-span-12 lg:col-span-3">
                <div className="sticky top-6">
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
              </div>
            )}

            {/* Main Content */}
            <div className={`col-span-12 ${showFilters ? 'lg:col-span-9' : ''}`}>
              {/* Comparison Panel */}
              {showComparison && (
                <div className="mb-8">
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

              {/* No Results Message */}
              {sortedPlans.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Shield className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No plans match your criteria</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setFilters({
                        priceRange: [1000, 50000],
                        coverage: 'all',
                        type: 'all',
                        features: [],
                        rating: 0
                      });
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}

              {/* Insurance Plans Grid */}
              {sortedPlans.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mb-8">
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
              )}

              {/* Payment Modal */}
              {showPayment && selectedPlan && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                    <div className="p-6 border-b flex items-center justify-between bg-gradient-to-r from-teal-50 to-emerald-50">
                      <h2 className="text-2xl font-bold text-gray-900">Complete Your Purchase</h2>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowPayment(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </Button>
                    </div>
                    <div className="p-6">
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
