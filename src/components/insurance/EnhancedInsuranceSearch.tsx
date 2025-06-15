
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Sparkles,
  TrendingUp,
  Filter
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EnhancedInsuranceSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  resultsCount: number;
  totalCount: number;
  showFilters: boolean;
  onToggleFilters: () => void;
}

const EnhancedInsuranceSearch = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  resultsCount,
  totalCount,
  showFilters,
  onToggleFilters
}: EnhancedInsuranceSearchProps) => {
  return (
    <Card className="bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-teal-600" />
                Smart Insurance Search
              </h2>
              <p className="text-gray-600 mt-1">
                Find the perfect health insurance plan tailored to your needs
              </p>
            </div>
            <Badge className="bg-teal-100 text-teal-800 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Lagos, Nigeria
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search by plan name, provider, or coverage type..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 bg-white border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="coverage">Best Coverage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-3 flex gap-2">
              <Button
                variant="outline"
                onClick={onToggleFilters}
                className={`flex-1 ${showFilters ? 'bg-teal-50 border-teal-300' : ''}`}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-sm text-gray-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              Showing {resultsCount} of {totalCount} plans
            </div>
            <div className="text-xs text-gray-500">
              💡 Tip: Use filters to narrow down plans based on your budget and needs
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedInsuranceSearch;
