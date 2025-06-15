
import React from 'react';
import { Shield, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuperAdminHeaderProps {
  loading: boolean;
  onRefresh: () => void;
}

const SuperAdminHeader = ({ loading, onRefresh }: SuperAdminHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Administration</h1>
            <p className="text-gray-600">Real-time management of all frontend listings and platform services</p>
          </div>
        </div>
        <Button 
          onClick={onRefresh} 
          disabled={loading}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Sync Frontend Data
        </Button>
      </div>
    </div>
  );
};

export default SuperAdminHeader;
