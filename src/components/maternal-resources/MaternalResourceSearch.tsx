
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Sparkles } from 'lucide-react';

interface MaternalResourceSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'All Resources', count: '500+' },
  { id: 'pregnancy', label: 'Pregnancy Care', count: '120+' },
  { id: 'childbirth', label: 'Childbirth & Delivery', count: '85+' },
  { id: 'newborn', label: 'Newborn Care', count: '95+' },
  { id: 'nutrition', label: 'Nutrition & Feeding', count: '110+' },
  { id: 'immunization', label: 'Immunization', count: '45+' },
  { id: 'childhealth', label: 'Child Development', count: '70+' },
  { id: 'emergency', label: 'Emergency Care', count: '35+' }
];

const MaternalResourceSearch = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory 
}: MaternalResourceSearchProps) => {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search for pregnancy tips, child care guides, immunization schedules..."
          className="pl-12 pr-4 h-14 text-lg bg-gray-50 border-2 border-gray-200 focus:border-purple-400 focus:bg-white transition-all duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button 
          className="absolute right-2 top-2 h-10 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={`h-12 px-4 rounded-full transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50'
            }`}
          >
            <span className="font-medium">{category.label}</span>
            <Badge 
              variant="secondary" 
              className={`ml-2 ${
                selectedCategory === category.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-purple-100 text-purple-700'
              }`}
            >
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Quick Search Suggestions */}
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-3">Popular searches:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            'Antenatal care schedule',
            'Baby vaccination timeline',
            'Breastfeeding positions',
            'Child nutrition chart',
            'Emergency contacts',
            'Growth milestones'
          ].map((suggestion) => (
            <Button
              key={suggestion}
              variant="ghost"
              size="sm"
              onClick={() => setSearchTerm(suggestion)}
              className="text-xs text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-full"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaternalResourceSearch;
