
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface HospitalSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (specialty: string) => void;
  filteredCount: number;
}

const HospitalSearchFilters = ({
  searchTerm,
  setSearchTerm,
  selectedState,
  setSelectedState,
  selectedSpecialty,
  setSelectedSpecialty,
  filteredCount
}: HospitalSearchFiltersProps) => {
  const states = ['All', 'Lagos', 'FCT', 'Kano', 'Rivers', 'Ogun', 'Oyo', 'Kaduna', 'Delta', 'Anambra', 'Enugu', 'Cross River', 'Osun', 'Sokoto', 'Ondo', 'Imo', 'Benue', 'Ebonyi'];
  const specialties = ['All', 'Cardiology', 'Neurology', 'Oncology', 'Pediatrics', 'Orthopedics', 'General Surgery', 'Ophthalmology', 'ENT', 'Psychiatry', 'Fertility', 'General Medicine'];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search hospitals..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select 
          className="px-4 py-2 border rounded-lg bg-white"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          {states.map(state => (
            <option key={state} value={state}>{state === 'All' ? 'All States' : state}</option>
          ))}
        </select>
        
        <select 
          className="px-4 py-2 border rounded-lg bg-white"
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
        >
          {specialties.map(specialty => (
            <option key={specialty} value={specialty}>{specialty === 'All' ? 'All Specialties' : specialty}</option>
          ))}
        </select>
      </div>
      
      <div className="text-sm text-gray-600">
        Showing {filteredCount} hospitals
      </div>
    </div>
  );
};

export default HospitalSearchFilters;
