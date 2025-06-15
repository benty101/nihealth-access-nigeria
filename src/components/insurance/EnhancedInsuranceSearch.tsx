
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Users, DollarSign, Sparkles, HelpCircle } from 'lucide-react';
import { PersonalizationService } from '@/services/PersonalizationService';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface EnhancedInsuranceSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  resultsCount: number;
  totalCount: number;
}

const EnhancedInsuranceSearch = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  resultsCount,
  totalCount
}: EnhancedInsuranceSearchProps) => {
  const [userLocation, setUserLocation] = useState<string>('');
  const [searchMode, setSearchMode] = useState<'simple' | 'advanced'>('simple');
  const [needBasedFilter, setNeedBasedFilter] = useState<string>('');

  // Get user's onboarding data for smart defaults
  useEffect(() => {
    const onboardingData = PersonalizationService.getOnboardingData();
    if (onboardingData?.location) {
      setUserLocation(onboardingData.location);
    }
    
    // Set smart need-based filter
    if (onboardingData?.lifeStage === 'pregnant') {
      setNeedBasedFilter('maternity');
    } else if (onboardingData?.lifeStage === 'mother') {
      setNeedBasedFilter('family');
    } else if (onboardingData?.lifeStage === 'elderly') {
      setNeedBasedFilter('senior');
    }
  }, []);

  const needBasedOptions = [
    { value: '', label: 'All Plans' },
    { value: 'maternity', label: 'Maternity & Pregnancy Care' },
    { value: 'family', label: 'Family Plans' },
    { value: 'senior', label: 'Senior Care' },
    { value: 'emergency', label: 'Emergency Coverage' },
    { value: 'chronic', label: 'Chronic Conditions' }
  ];

  const smartSuggestions = [
    'Best family plans',
    'Affordable maternity care',
    'Emergency coverage',
    'Comprehensive health insurance'
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Hero Search Section */}
        <Card className="bg-gradient-to-r from-teal-50 to-emerald-50 border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Find Your Perfect Health Insurance
              </h1>
              <p className="text-lg text-gray-600">
                Compare plans tailored to your needs in {userLocation || 'Nigeria'}
              </p>
            </div>

            {/* Smart Search Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={`Search insurance plans in ${userLocation || 'your area'}...`}
                  className="pl-12 h-14 text-lg border-2 focus:border-teal-500 transition-colors bg-white"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
                <Button 
                  className="absolute right-2 top-2 h-10 px-6 bg-teal-600 hover:bg-teal-700"
                  onClick={() => setSearchMode(searchMode === 'simple' ? 'advanced' : 'simple')}
                >
                  {searchMode === 'simple' ? 'Advanced' : 'Simple'} Search
                </Button>
              </div>

              {/* Quick Suggestions */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-sm text-gray-600 mr-2">Popular:</span>
                {smartSuggestions.map((suggestion) => (
                  <Badge 
                    key={suggestion}
                    variant="secondary" 
                    className="cursor-pointer hover:bg-teal-100 hover:text-teal-700 transition-colors"
                    onClick={() => onSearchChange(suggestion)}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Advanced Filters */}
            {searchMode === 'advanced' && (
              <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded-lg border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="flex items-center text-sm font-medium mb-2">
                      <Users className="h-4 w-4 mr-1" />
                      Coverage Need
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-3 w-3 ml-1 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Choose based on your life stage and health needs</p>
                        </TooltipContent>
                      </Tooltip>
                    </label>
                    <Select value={needBasedFilter} onValueChange={setNeedBasedFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your need" />
                      </SelectTrigger>
                      <SelectContent>
                        {needBasedOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      Location
                    </label>
                    <Select value={userLocation} onValueChange={setUserLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lagos">Lagos</SelectItem>
                        <SelectItem value="Abuja">Abuja</SelectItem>
                        <SelectItem value="Kano">Kano</SelectItem>
                        <SelectItem value="Rivers">Rivers</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium mb-2">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Budget Range
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Monthly budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-10k">Under ₦10,000</SelectItem>
                        <SelectItem value="10k-25k">₦10,000 - ₦25,000</SelectItem>
                        <SelectItem value="25k-50k">₦25,000 - ₦50,000</SelectItem>
                        <SelectItem value="over-50k">Over ₦50,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results and Sort Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-teal-600" />
              <div className="text-lg font-semibold text-gray-900">
                {resultsCount.toLocaleString()} Plans Found
              </div>
              {userLocation && (
                <Badge variant="outline" className="text-xs">
                  in {userLocation}
                </Badge>
              )}
            </div>
            <div className="text-sm text-gray-500">
              of {totalCount.toLocaleString()} available
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">🎯 Recommended for You</SelectItem>
                <SelectItem value="popular">⭐ Most Popular</SelectItem>
                <SelectItem value="price-low">💰 Price: Low to High</SelectItem>
                <SelectItem value="price-high">💎 Price: High to Low</SelectItem>
                <SelectItem value="rating">🏆 Highest Rated</SelectItem>
                <SelectItem value="coverage">🛡️ Best Coverage</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default EnhancedInsuranceSearch;
