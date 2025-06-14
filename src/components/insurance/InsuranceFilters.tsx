
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';

interface FilterState {
  priceRange: number[];
  coverage: string;
  type: string;
  features: string[];
  rating: number;
}

interface InsuranceFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const InsuranceFilters = ({ filters, onFiltersChange, onClearFilters }: InsuranceFiltersProps) => {
  const handlePriceRangeChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: value });
  };

  const handleFeatureToggle = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter(f => f !== feature)
      : [...filters.features, feature];
    onFiltersChange({ ...filters, features: newFeatures });
  };

  const availableFeatures = [
    'Maternity Care',
    'Emergency Care',
    'Surgery',
    'Dental',
    'Optical',
    'Outpatient Care',
    'Specialist Visits',
    'Prescription',
    'Telemedicine'
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter Plans
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <label className="text-sm font-medium mb-3 block">
            Monthly Premium: ₦{filters.priceRange[0].toLocaleString()} - ₦{filters.priceRange[1].toLocaleString()}
          </label>
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceRangeChange}
            max={50000}
            min={1000}
            step={1000}
            className="w-full"
          />
        </div>

        {/* Coverage Amount */}
        <div>
          <label className="text-sm font-medium mb-2 block">Minimum Coverage</label>
          <Select value={filters.coverage} onValueChange={(value) => onFiltersChange({ ...filters, coverage: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select coverage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Coverage</SelectItem>
              <SelectItem value="1000000">₦1M+</SelectItem>
              <SelectItem value="3000000">₦3M+</SelectItem>
              <SelectItem value="5000000">₦5M+</SelectItem>
              <SelectItem value="10000000">₦10M+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Plan Type */}
        <div>
          <label className="text-sm font-medium mb-2 block">Plan Type</label>
          <Select value={filters.type} onValueChange={(value) => onFiltersChange({ ...filters, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="hmo">HMO Plans</SelectItem>
              <SelectItem value="insurance">Insurance Plans</SelectItem>
              <SelectItem value="family">Family Plans</SelectItem>
              <SelectItem value="premium">Premium Plans</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Minimum Rating</label>
          <Select value={filters.rating.toString()} onValueChange={(value) => onFiltersChange({ ...filters, rating: parseFloat(value) })}>
            <SelectTrigger>
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any Rating</SelectItem>
              <SelectItem value="3.5">3.5+ Stars</SelectItem>
              <SelectItem value="4.0">4.0+ Stars</SelectItem>
              <SelectItem value="4.5">4.5+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Features */}
        <div>
          <label className="text-sm font-medium mb-3 block">Required Features</label>
          <div className="grid grid-cols-1 gap-2">
            {availableFeatures.map((feature) => (
              <div key={feature} className="flex items-center justify-between">
                <span className="text-sm">{feature}</span>
                <Button
                  variant={filters.features.includes(feature) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFeatureToggle(feature)}
                  className="h-6 px-2"
                >
                  {filters.features.includes(feature) ? (
                    <X className="h-3 w-3" />
                  ) : (
                    '+'
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {filters.features.length > 0 && (
          <div>
            <label className="text-sm font-medium mb-2 block">Active Filters</label>
            <div className="flex flex-wrap gap-1">
              {filters.features.map((feature) => (
                <Badge key={feature} variant="secondary" className="text-xs">
                  {feature}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleFeatureToggle(feature)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsuranceFilters;
