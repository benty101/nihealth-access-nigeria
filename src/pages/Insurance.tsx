import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import EnhancedInsuranceSearch from '@/components/insurance/EnhancedInsuranceSearch';
import InsuranceFilters from '@/components/insurance/InsuranceFilters';
import InsurancePlanCard from '@/components/insurance/InsurancePlanCard';
import InsuranceComparison from '@/components/insurance/InsuranceComparison';
import InsuranceHelpSection from '@/components/insurance/InsuranceHelpSection';
import InsurancePurchaseModal from '@/components/insurance/InsurancePurchaseModal';
import UserInsuranceStatus from '@/components/insurance/UserInsuranceStatus';
import UserGuidance from '@/components/onboarding/UserGuidance';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Search, User } from 'lucide-react';
import { insurancePlans } from '@/data/insurancePlans';
import { enhancedInsurancePlans } from '@/data/enhancedInsurancePlans';
import { insuranceService } from '@/services/InsuranceService';
import { useAuth } from '@/contexts/AuthContext';

const Insurance = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [activeTab, setActiveTab] = useState('browse');
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
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [dbPlans, setDbPlans] = useState<any[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(false);

  useEffect(() => {
    loadDatabasePlans();
  }, []);

  const loadDatabasePlans = async () => {
    setLoadingPlans(true);
    try {
      const plans = await insuranceService.getAllInsurancePlans();
      setDbPlans(plans);
    } catch (error) {
      console.error('Error loading plans:', error);
    } finally {
      setLoadingPlans(false);
    }
  };

  // Combine static plans with database plans - now using enhanced plans
  const allPlans = [
    ...enhancedInsurancePlans,
    ...dbPlans.map(plan => ({
      id: plan.id,
      name: plan.name,
      provider: plan.provider,
      type: plan.plan_type,
      monthlyPremium: `₦${plan.premium_monthly?.toLocaleString() || 'N/A'}`,
      coverage: `₦${plan.coverage_amount?.toLocaleString() || 'N/A'}`,
      features: plan.features || [],
      rating: 4.5, // Default rating
      popular: false,
      terms: plan.terms
    }))
  ];

  // Filter and sort plans
  const filteredPlans = allPlans.filter(plan => {
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

  const handleSelectPlan = (plan: any) => {
    if (!user) {
      // Redirect to login or show login modal
      return;
    }
    setSelectedPlan(plan);
    setShowPurchaseModal(true);
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
        {/* Header with Tabs */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Health Insurance</h1>
              <p className="text-gray-600">Nigeria's most comprehensive insurance comparison platform</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:w-96">
              <TabsTrigger value="browse" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Browse Plans
              </TabsTrigger>
              <TabsTrigger value="my-insurance" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                My Insurance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="mt-6">
              {/* Market Statistics */}
              <InsuranceMarketStats />

              {/* Enhanced Search Section */}
              <EnhancedInsuranceSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                sortBy={sortBy}
                onSortChange={setSortBy}
                resultsCount={filteredPlans.length}
                totalCount={allPlans.length}
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

                  {/* Loading State */}
                  {loadingPlans && (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
                      <p className="mt-2 text-gray-600">Loading insurance plans...</p>
                    </div>
                  )}

                  {/* Insurance Plans Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredPlans.map((plan) => (
                      <InsurancePlanCard
                        key={plan.id}
                        plan={plan}
                        onSelectPlan={handleSelectPlan}
                        onAddToComparison={handleAddToComparison}
                        isInComparison={comparisonPlans.some(p => p.id === plan.id)}
                        comparisonFull={comparisonPlans.length >= 3}
                      />
                    ))}
                  </div>

                  {filteredPlans.length === 0 && !loadingPlans && (
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
            </TabsContent>

            <TabsContent value="my-insurance" className="mt-6">
              {user ? (
                <UserInsuranceStatus />
              ) : (
                <div className="text-center py-12">
                  <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Login Required</h3>
                  <p className="text-gray-600 mb-6">
                    Please log in to view your insurance coverage and policies.
                  </p>
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    Log In
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Purchase Modal */}
      <InsurancePurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        plan={selectedPlan}
        onPurchaseComplete={() => {
          loadDatabasePlans();
          setActiveTab('my-insurance');
        }}
      />

      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </div>
  );
};

export default Insurance;
