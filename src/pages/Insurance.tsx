import React, { useState, useEffect } from 'react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import { enhancedInsurancePlans } from '@/data/enhancedInsurancePlans';
import { insuranceService } from '@/services/InsuranceService';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  Search, 
  Filter, 
  Star, 
  Heart, 
  Users, 
  CheckCircle, 
  TrendingUp,
  Sparkles,
  ArrowRight,
  Phone,
  MessageCircle,
  Calculator,
  Award,
  Clock,
  Globe,
  Zap,
  Target,
  Eye,
  GitCompare as Compare,
  PlusCircle,
  X
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Insurance = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlans, setSelectedPlans] = useState<any[]>([]);
  const [showComparison, setShowComparison] = useState(false);
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

  // Enhanced plan categories with psychological grouping
  const planCategories = [
    { id: 'all', label: 'All Plans', icon: Globe, color: 'bg-blue-500', count: 12 },
    { id: 'family', label: 'Family Care', icon: Users, color: 'bg-green-500', count: 4 },
    { id: 'individual', label: 'Individual', icon: Heart, color: 'bg-red-500', count: 3 },
    { id: 'premium', label: 'Premium', icon: Award, color: 'bg-purple-500', count: 3 },
    { id: 'emergency', label: 'Emergency', icon: Zap, color: 'bg-orange-500', count: 2 }
  ];

  // Transform and enhance plans data
  const primaryPlans = dbPlans.length > 0 ? dbPlans.map(plan => ({
    id: plan.id,
    name: plan.name,
    provider: plan.provider,
    type: plan.plan_type,
    monthlyPremium: plan.premium_monthly || 0,
    coverage: plan.coverage_amount || 0,
    features: plan.features || [],
    rating: 4.5,
    popular: false,
    terms: plan.terms,
    badge: null,
    gradient: 'from-blue-500 to-cyan-500'
  })) : enhancedInsurancePlans.map(plan => ({
    ...plan,
    monthlyPremium: parseInt(plan.monthlyPremium.replace(/[₦,]/g, '')),
    coverage: parseInt(plan.coverage.replace(/[₦,]/g, '')),
    gradient: 'from-blue-500 to-cyan-500'
  }));

  // Add enhanced styling and psychology to plans
  const enhancedPlans = primaryPlans.map((plan, index) => {
    const gradients = [
      'from-emerald-500 to-teal-500',
      'from-blue-500 to-indigo-500', 
      'from-purple-500 to-pink-500',
      'from-orange-500 to-red-500',
      'from-cyan-500 to-blue-500'
    ];

    const badges = ['Most Popular', 'Best Value', 'Premium Choice', 'Family Favorite', 'Quick Start'];
    const urgencyLevels = ['high', 'medium', 'low'];

    return {
      ...plan,
      gradient: gradients[index % gradients.length],
      badge: index < 3 ? badges[index] : null,
      urgency: urgencyLevels[index % urgencyLevels.length],
      savings: index === 1 ? 30 : index === 2 ? 15 : null,
      testimonial: index === 0 ? "Saved my family ₦200,000 last year!" : null
    };
  });

  // Filter plans
  const filteredPlans = enhancedPlans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.provider.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           plan.type.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  const handleAddToComparison = (plan: any) => {
    if (selectedPlans.length < 3 && !selectedPlans.find(p => p.id === plan.id)) {
      setSelectedPlans([...selectedPlans, plan]);
      setShowComparison(true);
    }
  };

  const handleRemoveFromComparison = (planId: string) => {
    setSelectedPlans(selectedPlans.filter(p => p.id !== planId));
    if (selectedPlans.length <= 1) {
      setShowComparison(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
        <ContextualNavbar />
        
        {/* Hero Section with Psychological Impact */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Shield className="h-16 w-16 text-white animate-pulse" />
                  <div className="absolute -top-2 -right-2 h-6 w-6 bg-green-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Protect Your{' '}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Health & Wealth
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover Nigeria's most trusted health insurance plans. From emergency coverage to 
                comprehensive family protection - we've got you covered.
              </p>

              {/* Key Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {[
                  { icon: Users, label: '50K+ Families Protected', color: 'text-green-400' },
                  { icon: Award, label: '₦2B+ Claims Paid', color: 'text-yellow-400' },
                  { icon: Star, label: '4.8/5 User Rating', color: 'text-orange-400' }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <Icon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
                      <p className="text-white font-semibold text-lg">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Floating elements for visual interest */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search and Category Selection */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-12">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search plans, providers, or coverage types..."
                  className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <Calculator className="h-5 w-5 mr-2" />
                      Calculate
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Calculate your insurance needs</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="border-2 border-purple-200 text-purple-600 hover:bg-purple-50 px-6 py-4 rounded-2xl"
                      onClick={() => setShowComparison(!showComparison)}
                    >
                      <Compare className="h-5 w-5 mr-2" />
                      Compare ({selectedPlans.length})
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Compare selected plans</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3 mt-8">
              {planCategories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`
                      flex items-center gap-3 px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105
                      ${isActive 
                        ? `${category.color} text-white shadow-lg` 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{category.label}</span>
                    <Badge className={`${isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'} ml-1`}>
                      {category.count}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comparison Panel */}
          {showComparison && selectedPlans.length > 0 && (
            <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Compare className="h-6 w-6 text-blue-600" />
                  Plan Comparison ({selectedPlans.length}/3)
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedPlans([]);
                    setShowComparison(false);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedPlans.map((plan) => (
                    <div key={plan.id} className="bg-white rounded-2xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-lg">{plan.name}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFromComparison(plan.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly Premium</span>
                          <span className="font-semibold">₦{plan.monthlyPremium.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Coverage</span>
                          <span className="font-semibold">₦{plan.coverage.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rating</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 font-semibold">{plan.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Insurance Plans Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredPlans.map((plan, index) => (
              <Card 
                key={plan.id} 
                className={`
                  relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl border-0
                  ${plan.urgency === 'high' ? 'ring-2 ring-orange-400 ring-opacity-50 animate-pulse' : ''}
                `}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-5`}></div>
                
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-orange-500 text-white px-3 py-1 text-xs font-semibold">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                {/* Savings Badge */}
                {plan.savings && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-green-500 text-white px-3 py-1 text-xs font-semibold">
                      Save {plan.savings}%
                    </Badge>
                  </div>
                )}

                <CardHeader className="relative">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${plan.gradient}`}>
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-sm">{plan.rating}</span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl font-bold mt-4">{plan.name}</CardTitle>
                  <p className="text-gray-600">{plan.provider}</p>
                  
                  {/* Testimonial */}
                  {plan.testimonial && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                      <p className="text-sm text-green-800 italic">"{plan.testimonial}"</p>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="relative space-y-6">
                  {/* Pricing */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                      ₦{plan.monthlyPremium.toLocaleString()}
                      <span className="text-base font-normal text-gray-600">/month</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Up to ₦{plan.coverage.toLocaleString()} coverage
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {plan.features.length > 4 && (
                      <p className="text-sm text-gray-500 italic">
                        +{plan.features.length - 4} more features
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-4">
                    <Button 
                      className={`w-full bg-gradient-to-r ${plan.gradient} hover:shadow-lg text-white font-semibold py-3 rounded-2xl transition-all duration-300`}
                    >
                      Get This Plan
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 border-gray-200 rounded-xl"
                        onClick={() => handleAddToComparison(plan)}
                        disabled={selectedPlans.length >= 3 || selectedPlans.find(p => p.id === plan.id)}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Compare
                      </Button>
                      <Button variant="outline" className="flex-1 border-gray-200 rounded-xl">
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredPlans.length === 0 && !loadingPlans && (
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No plans found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any insurance plans matching your criteria. Try adjusting your search or category.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              >
                Reset Filters
              </Button>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">Need Help Choosing?</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Our insurance experts are here to help you find the perfect plan for your needs and budget.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-2xl">
                    <Phone className="h-5 w-5 mr-2" />
                    Call Expert
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-2xl">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Live Chat
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Clock, label: '24/7 Support', desc: 'Always here to help' },
                  { icon: Award, label: 'Expert Advice', desc: 'Licensed professionals' },
                  { icon: Target, label: 'Perfect Match', desc: 'Find your ideal plan' },
                  { icon: Sparkles, label: 'Free Consultation', desc: 'No cost to you' }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="bg-white/10 rounded-2xl p-4 text-center">
                      <Icon className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                      <p className="font-semibold text-sm">{item.label}</p>
                      <p className="text-xs text-blue-200">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Insurance;
