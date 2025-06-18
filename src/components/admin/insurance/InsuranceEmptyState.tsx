
import React from 'react';
import { FileText, RefreshCw, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InsuranceEmptyStateProps {
  searchTerm: string;
  syncing: boolean;
  onSync: () => void;
}

const InsuranceEmptyState = ({ searchTerm, syncing, onSync }: InsuranceEmptyStateProps) => {
  return (
    <div className="text-center py-8">
      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-600 mb-4">
        {searchTerm ? 'No insurance plans found matching your criteria' : 'No insurance plans available'}
      </p>
      <Button onClick={onSync} disabled={syncing} className="bg-teal-600 hover:bg-teal-700">
        {syncing ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Syncing Data...
          </>
        ) : (
          <>
            <Database className="h-4 w-4 mr-2" />
            Sync Insurance Data
          </>
        )}
      </Button>
    </div>
  );
};

export default InsuranceEmptyState;
