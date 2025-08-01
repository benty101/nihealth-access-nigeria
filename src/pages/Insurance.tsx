import React, { useState, useEffect } from 'react';
import StandardPageLayout from '@/components/layout/StandardPageLayout';
import BackButton from '@/components/navigation/BackButton';
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

  // Plan categories
  const planCategories = [
    { id: 'all', label: 'All Plans', icon: Globe, count: 12 },
    { id: 'family', label: 'Family Care', icon: Users, count: 4 },
    { id: 'individual', label: 'Individual', icon: Heart, count: 3 },
    { id: 'premium', label: 'Premium', icon: Award, count: 3 },
    { id: 'emergency', label: 'Emergency', icon: Zap, count: 2 }
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

  // Simplified plans without flashy elements
  const enhancedPlans = primaryPlans.map((plan, index) => {
    const badges = ['Popular', 'Best Value', 'Recommended'];
    
    return {
      ...plan,
      badge: index < 3 ? badges[index] : null
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
    <StandardPageLayout 
      title="Health Insurance Plans"
      subtitle="Find and compare health insurance plans that fit your needs and budget"
      backgroundVariant="gradient"
    >
      <div className="mb-6">
        <BackButton />
      </div>
      
      <TooltipProvider>
        {/* Hero Section */}
        <section className="mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-primary rounded-2xl p-8 text-white mb-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  {/* Trust Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1.5 text-sm text-white/90">
                    <Shield className="h-4 w-4" />
                    Trusted by 50,000+ Nigerians
                  </div>
                
                  {/* Headline */}
                  <div className="space-y-4">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                      Health Insurance
                      <span className="text-white/90"> Made Simple</span>
                    </h1>
                    <p className="text-lg text-white/80 leading-relaxed">
                      Compare plans, get instant quotes, and protect your family with 
                      Nigeria's most trusted health insurance platform.
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-white" />
                      <span className="text-white/90">No paperwork</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-white" />
                      <span className="text-white/90">Instant coverage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-white" />
                      <span className="text-white/90">24/7 support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-white" />
                      <span className="text-white/90">Best rates</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                      Compare Plans Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Expert
                    </Button>
                  </div>
                </div>

                {/* Info Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <div className="space-y-4">
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-white">₦12,500/month</div>
                      <div className="text-sm text-white/70">Family of 4 coverage</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-white/90">Hospital visits</span>
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-white/90">Emergency care</span>
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/90">Prescription drugs</span>
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto">
          {/* Search and Filters */}
          <div className="bg-card rounded-lg border p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search plans, providers..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <Calculator className="h-4 w-4 mr-2" />
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
                      onClick={() => setShowComparison(!showComparison)}
                    >
                      <Compare className="h-4 w-4 mr-2" />
                      Compare ({selectedPlans.length})
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Compare selected plans</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-4">
              {planCategories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`
                      flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                      ${isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{category.label}</span>
                    <Badge variant={isActive ? "secondary" : "outline"} className="ml-1 text-xs">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPlans.map((plan, index) => (
              <Card 
                key={plan.id} 
                className="relative overflow-hidden transition-all duration-200 hover:shadow-lg border"
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant="secondary" className="text-xs">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="relative">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-lg bg-muted">
                      <Shield className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium text-sm">{plan.rating}</span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg font-semibold mt-4">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{plan.provider}</p>
                </CardHeader>

                <CardContent className="relative space-y-4">
                  {/* Pricing */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      ₦{plan.monthlyPremium.toLocaleString()}
                      <span className="text-base font-normal text-muted-foreground">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Up to ₦{plan.coverage.toLocaleString()} coverage
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {plan.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                    {plan.features.length > 4 && (
                      <p className="text-sm text-muted-foreground">
                        +{plan.features.length - 4} more features
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-4">
                    <Button className="w-full">
                      Get This Plan
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleAddToComparison(plan)}
                        disabled={selectedPlans.length >= 3 || selectedPlans.find(p => p.id === plan.id)}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Compare
                      </Button>
                      <Button variant="outline" className="flex-1">
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
              <div className="bg-muted rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">No plans found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find any insurance plans matching your criteria. Try adjusting your search or category.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-16 bg-card border rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Need Help Choosing?</h3>
                <p className="text-muted-foreground mb-6">
                  Our insurance experts are here to help you find the perfect plan for your needs and budget.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button>
                    <Phone className="h-4 w-4 mr-2" />
                    Call Expert
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
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
                    <div key={index} className="bg-muted rounded-lg p-4 text-center">
                      <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="font-medium text-sm text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </StandardPageLayout>
  );
};

export default Insurance;
