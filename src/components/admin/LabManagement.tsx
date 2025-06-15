import React, { useState, useEffect } from 'react';
import { TestTube, Plus, Search, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { adminService, type Lab } from '@/services/AdminService';
import { labService } from '@/services/LabService';
import { useToast } from '@/hooks/use-toast';
import LabCard from './lab/LabCard';

interface LabManagementProps {
  onStatsChange?: () => Promise<void>;
}

const LabManagement = ({ onStatsChange }: LabManagementProps) => {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadLabs();
  }, []);

  const loadLabs = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('LabManagement: Loading all labs for admin...');
      
      const labsData = await adminService.getAllLabs();
      setLabs(labsData);
      console.log('LabManagement: Successfully loaded', labsData.length, 'labs for admin');
      
    } catch (error) {
      console.error('LabManagement: Error loading labs:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(`Failed to load labs: ${errorMessage}`);
      toast({
        title: "Error",
        description: "Failed to load labs. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleLabStatus = async (id: string, currentStatus: boolean) => {
    try {
      await labService.updateLab(id, { is_active: !currentStatus });
      await loadLabs();
      
      if (onStatsChange) {
        await onStatsChange();
      }
      
      toast({
        title: "Success",
        description: `Lab ${!currentStatus ? 'activated' : 'deactivated'} successfully`
      });
    } catch (error) {
      console.error('LabManagement: Error updating lab status:', error);
      toast({
        title: "Error",
        description: "Failed to update lab status",
        variant: "destructive"
      });
    }
  };

  const filteredLabs = labs.filter(lab =>
    lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.lga?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading labs...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-16">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="flex justify-center mt-4">
            <Button onClick={loadLabs} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5" />
              Laboratory Management
            </CardTitle>
            <CardDescription>
              Manage laboratory listings and diagnostic services
            </CardDescription>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Lab
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search labs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Badge variant="secondary">
            {filteredLabs.length} found
          </Badge>
        </div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map((lab) => (
            <LabCard key={lab.id} lab={lab} onToggleStatus={toggleLabStatus} />
          ))}
        </div>

        {filteredLabs.length === 0 && (
          <div className="text-center py-8">
            <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {searchTerm ? 'No labs found matching your criteria' : 'No labs available'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LabManagement;
