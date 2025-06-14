import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Users, Shield, Filter, Scale, ArrowUpDown } from 'lucide-react';
import InsuranceFilters from '@/components/insurance/InsuranceFilters';
import InsuranceComparison from '@/components/insurance/InsuranceComparison';
import PaymentMethods from '@/components/insurance/PaymentMethods';

const Insurance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);

  const [filters, setFilters] = useState({
    priceRange: [1000, 50000],
    coverage: 'all',
    type: 'all',
    features: [] as string[],
    rating: 0
  });

  const insurancePlans = [
    {
      id: '1',
      name: 'AIICO Insurance',
      type: 'Premium Health',
      monthlyPremium: '₦15,000',
      coverage: '₦5,000,000',
      rating: 4.5,
      features: ['Outpatient Care', 'Surgery', 'Maternity', 'Dental', 'Optical'],
      popular: true
    },
    {
      id: '2',
      name: 'Leadway Assurance',
      type: 'Family Health Plan',
      monthlyPremium: '₦25,000',
      coverage: '₦10,000,000',
      rating: 4.3,
      features: ['Family Coverage', 'Emergency Care', 'Specialist Visits', 'Prescription', 'Maternity'],
      popular: false
    },
    {
      id: '3',
      name: 'AXA Mansard Health',
      type: 'Basic Health Cover',
      monthlyPremium: '₦8,000',
      coverage: '₦2,000,000',
      rating: 4.1,
      features: ['Basic Care', 'Emergency', 'Generic Drugs', 'Consultation', 'Maternity'],
      popular: false
    },
    {
      id: '4',
      name: 'NHIS (Government)',
      type: 'National Health Scheme',
      monthlyPremium: '₦3,000',
      coverage: '₦500,000',
      rating: 3.8,
      features: ['Basic Healthcare', 'Public Hospitals', 'Essential Drugs', 'Maternity Care'],
      popular: false
    },
    {
      id: '5',
      name: 'Niger Insurance',
      type: 'Comprehensive Health',
      monthlyPremium: '₦18,000',
      coverage: '₦7,500,000',
      rating: 4.2,
      features: ['Comprehensive Care', 'Surgery', 'Maternity', 'Emergency', 'Specialist Care'],
      popular: false
    },
    {
      id: '6',
      name: 'Custodian Investment',
      type: 'Executive Health Plan',
      monthlyPremium: '₦35,000',
      coverage: '₦15,000,000',
      rating: 4.6,
      features: ['Executive Care', 'Private Hospitals', 'Overseas Treatment', 'Maternity', 'Dental'],
      popular: true
    },
    {
      id: '7',
      name: 'HYGEIA HMO',
      type: 'Hygeia Care Plus',
      monthlyPremium: '₦14,500',
      coverage: '₦5,000,000',
      rating: 4.6,
      features: ['Premium HMO', 'Excellent Maternity', 'Wellness', 'Emergency', 'Digital Health'],
      popular: true
    },
    {
      id: '8',
      name: 'Sterling Health HMO',
      type: 'Sterling Premium',
      monthlyPremium: '₦18,500',
      coverage: '₦7,500,000',
      rating: 4.5,
      features: ['Sterling Network', 'Premium Maternity', 'Executive Care', 'Emergency', 'International'],
      popular: true
    }
  ];

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
  });

  const sortedPlans = [...filteredPlans].sort((a, b) => {
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
    if (selectedForComparison.length < 3 && !selectedForComparison.find(p => p.id === plan.id)) {
      setSelectedForComparison([...selectedForComparison, plan]);
      setShowComparison(true);
    }
  };

  const handleRemoveFromComparison = (planId: string) => {
    setSelectedForComparison(selectedForComparison.filter(p => p.id !== planId));
  };

  const handleSelectPlan = (plan: any) => {
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
            
            <div className="max-w-2xl mx-auto flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search insurance providers..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowComparison(!showComparison)}
                className="flex items-center"
              >
                <Scale className="h-4 w-4 mr-2" />
                Compare ({selectedForComparison.length})
              </Button>
            </div>
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
              {/* Sort Controls */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Showing {sortedPlans.length} of {insurancePlans.length} plans
                </p>
                <div className="flex items-center space-x-2">
                  <ArrowUpDown className="h-4 w-4" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded px-3 py-1 text-sm"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="coverage">Highest Coverage</option>
                  </select>
                </div>
              </div>

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
                  <Card key={plan.id} className="hover:shadow-lg transition-shadow relative border-l-4 border-l-teal-500">
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-4 bg-emerald-600">
                        Most Popular
                      </Badge>
                    )}
                    
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Shield className="h-8 w-8 text-teal-600" />
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{plan.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <p className="text-sm text-gray-600">{plan.type}</p>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-teal-600">{plan.monthlyPremium}</div>
                        <div className="text-sm text-gray-600">per month</div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-gray-600">Coverage up to</div>
                        <div className="text-lg font-semibold">{plan.coverage}</div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {plan.features.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                          {plan.features.length > 3 && (
                            <li className="text-sm text-gray-500">
                              +{plan.features.length - 3} more features
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <Button 
                          className="w-full bg-teal-600 hover:bg-teal-700"
                          onClick={() => handleSelectPlan(plan)}
                        >
                          Get Quote
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleAddToComparison(plan)}
                          disabled={selectedForComparison.length >= 3 || selectedForComparison.find(p => p.id === plan.id)}
                        >
                          {selectedForComparison.find(p => p.id === plan.id) ? 'Added to Compare' : 'Compare'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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

          {/* Help Section */}
          <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
            <div className="text-center">
              <Users className="h-12 w-12 text-teal-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Need Help Choosing the Right Plan?
              </h2>
              <p className="text-gray-600 mb-6">
                Our healthcare experts are here to help you find the perfect insurance plan for your maternal care needs
              </p>
              <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                Speak with an Expert
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;
