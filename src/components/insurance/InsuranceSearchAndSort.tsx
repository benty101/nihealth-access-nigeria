
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Scale, ArrowUpDown } from 'lucide-react';

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
    <>
      {/* Search and Filter Controls */}
      <div className="max-w-2xl mx-auto flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search insurance providers..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          onClick={onToggleFilters}
          className="flex items-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
        <Button
          variant="outline"
          onClick={onToggleComparison}
          className="flex items-center"
        >
          <Scale className="h-4 w-4 mr-2" />
          Compare ({comparisonCount})
        </Button>
      </div>

      {/* Sort Controls */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Showing {resultsCount} of {totalCount} plans
        </p>
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="h-4 w-4" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
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
    </>
  );
};

export default InsuranceSearchAndSort;
