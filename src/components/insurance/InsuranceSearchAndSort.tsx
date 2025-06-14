
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Scale, ArrowUpDown, Sparkles } from 'lucide-react';

interface InsuranceSearchAndSortProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  showComparison: boolean;
  onToggleComparison: () => void;
  comparisonCount: number;
  resultsCount: number;
  totalCount: number;
}

const InsuranceSearchAndSort = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  showFilters,
  onToggleFilters,
  showComparison,
  onToggleComparison,
  comparisonCount,
  resultsCount,
  totalCount
}: InsuranceSearchAndSortProps) => {
  return (
    <div className="space-y-6">
      {/* Enhanced Search Section */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by provider name, coverage type, or benefits..."
                className="pl-12 h-12 text-lg border-2 focus:border-teal-500 transition-colors"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={onToggleFilters}
                className="h-12 px-6 flex items-center gap-2 font-medium"
              >
                <Filter className="h-4 w-4" />
                Filters
                {showFilters && <Sparkles className="h-3 w-3" />}
              </Button>
              <Button
                variant={showComparison ? "default" : "outline"}
                onClick={onToggleComparison}
                className="h-12 px-6 flex items-center gap-2 font-medium"
              >
                <Scale className="h-4 w-4" />
                Compare 
                {comparisonCount > 0 && (
                  <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full text-xs font-bold">
                    {comparisonCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results and Sort Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-2">
          <div className="text-lg font-semibold text-gray-900">
            {resultsCount.toLocaleString()} Plans Found
          </div>
          <div className="text-sm text-gray-500">
            of {totalCount.toLocaleString()} available
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <ArrowUpDown className="h-4 w-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="border-2 border-gray-200 rounded-lg px-4 py-2 text-sm font-medium bg-white hover:border-gray-300 focus:border-teal-500 transition-colors cursor-pointer"
          >
            <option value="popular">⭐ Most Popular</option>
            <option value="price-low">💰 Price: Low to High</option>
            <option value="price-high">💎 Price: High to Low</option>
            <option value="rating">🏆 Highest Rated</option>
            <option value="coverage">🛡️ Highest Coverage</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default InsuranceSearchAndSort;
