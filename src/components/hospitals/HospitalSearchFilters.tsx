
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, X, MapPin, Stethoscope } from 'lucide-react';
import { hospitalDataService, HospitalFilters } from '@/services/HospitalDataService';

interface HospitalSearchFiltersProps {
  onFiltersChange: (filters: HospitalFilters) => void;
  currentFilters: HospitalFilters;
  isLoading?: boolean;
}

const HospitalSearchFilters = ({ 
  onFiltersChange, 
  currentFilters, 
  isLoading 
}: HospitalSearchFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState(currentFilters.searchQuery || '');
  const [states, setStates] = useState<string[]>([]);
  const [lgas, setLgas] = useState<string[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoadingFilters, setIsLoadingFilters] = useState(true);

  // Load filter options
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        setIsLoadingFilters(true);
        const [statesData, specialtiesData] = await Promise.all([
          hospitalDataService.getHospitalStates(),
          hospitalDataService.getHospitalSpecialties()
        ]);
        
        setStates(statesData);
        setSpecialties(specialtiesData);
      } catch (error) {
        console.error('Error loading filter options:', error);
      } finally {
        setIsLoadingFilters(false);
      }
    };

    loadFilterOptions();
  }, []);

  // Load LGAs when state changes
  useEffect(() => {
    const loadLGAs = async () => {
      if (currentFilters.state) {
        try {
          const lgasData = await hospitalDataService.getHospitalLGAs(currentFilters.state);
          setLgas(lgasData);
        } catch (error) {
          console.error('Error loading LGAs:', error);
          setLgas([]);
        }
      } else {
        setLgas([]);
      }
    };

    loadLGAs();
  }, [currentFilters.state]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFiltersChange({
      ...currentFilters,
      searchQuery: searchQuery.trim() || undefined
    });
  };

  const handleFilterChange = (key: keyof HospitalFilters, value: string) => {
    const newFilters = { ...currentFilters };
    
    if (value === 'all' || value === '') {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }

    // Clear LGA if state changes
    if (key === 'state') {
      delete newFilters.lga;
    }

    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(currentFilters).some(key => 
    currentFilters[key as keyof HospitalFilters] !== undefined
  );

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        {/* Search Bar - Always Visible */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search hospitals by name or location..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-teal-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {Object.keys(currentFilters).length}
              </span>
            )}
          </Button>
        </form>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* State Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  State
                </label>
                <Select
                  value={currentFilters.state || 'all'}
                  onValueChange={(value) => handleFilterChange('state', value)}
                  disabled={isLoadingFilters || isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* LGA Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Local Government Area
                </label>
                <Select
                  value={currentFilters.lga || 'all'}
                  onValueChange={(value) => handleFilterChange('lga', value)}
                  disabled={!currentFilters.state || isLoadingFilters || isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select LGA..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All LGAs</SelectItem>
                    {lgas.map((lga) => (
                      <SelectItem key={lga} value={lga}>
                        {lga}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Specialty Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Stethoscope className="h-4 w-4 mr-1" />
                  Specialty
                </label>
                <Select
                  value={currentFilters.specialty || 'all'}
                  onValueChange={(value) => handleFilterChange('specialty', value)}
                  disabled={isLoadingFilters || isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HospitalSearchFilters;
