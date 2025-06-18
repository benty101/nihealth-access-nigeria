
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ResourceSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ResourceSearch = ({ searchTerm, setSearchTerm }: ResourceSearchProps) => {
  return (
    <div className="max-w-md mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search health resources..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ResourceSearch;
