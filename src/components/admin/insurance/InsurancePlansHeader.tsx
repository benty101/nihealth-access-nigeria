
import React from 'react';
import { Plus, Search, RefreshCw, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface InsurancePlansHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filteredCount: number;
  syncing: boolean;
  onSync: () => void;
}

const InsurancePlansHeader = ({
  searchTerm,
  onSearchChange,
  filteredCount,
  syncing,
  onSync
}: InsurancePlansHeaderProps) => {
  return (
    <>
      {/* Action Buttons */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <Button 
            onClick={onSync} 
            disabled={syncing}
            variant="outline"
          >
            {syncing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <Database className="h-4 w-4 mr-2" />
                Sync Data
              </>
            )}
          </Button>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Plan
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search insurance plans..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Badge variant="secondary">
          {filteredCount} found
        </Badge>
      </div>
    </>
  );
};

export default InsurancePlansHeader;
