
import React, { useState, useEffect } from 'react';
import { TestTube, Plus, Search, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { adminService, type LabTest } from '@/services/AdminService';
import { useToast } from '@/hooks/use-toast';
import LabTestForm from './forms/LabTestForm';
import LabTestTableRow from './labtest/LabTestTableRow';

interface LabTestManagementProps {
  onStatsChange?: () => Promise<void>;
}

const LabTestManagement = ({ onStatsChange }: LabTestManagementProps) => {
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLabTest, setEditingLabTest] = useState<LabTest | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    loadLabTests();
  }, []);

  const loadLabTests = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('LabTestManagement: Loading all lab tests for admin...');
      
      const labTestsData = await adminService.getAllLabTests();
      setLabTests(labTestsData);
      console.log('LabTestManagement: Successfully loaded', labTestsData.length, 'lab tests for admin');
      
    } catch (error) {
      console.error('LabTestManagement: Error loading lab tests:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(`Failed to load lab tests: ${errorMessage}`);
      toast({
        title: "Error",
        description: "Failed to load lab tests. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddLabTest = () => {
    setEditingLabTest(undefined);
    setIsFormOpen(true);
  };

  const handleEditLabTest = (labTest: LabTest) => {
    setEditingLabTest(labTest);
    setIsFormOpen(true);
  };

  const handleFormSuccess = async () => {
    await loadLabTests();
    if (onStatsChange) {
      await onStatsChange();
    }
  };

  const toggleLabTestStatus = async (id: string, currentStatus: boolean) => {
    try {
      await adminService.updateLabTest(id, { is_active: !currentStatus });
      await loadLabTests();
      
      if (onStatsChange) {
        await onStatsChange();
      }
      
      toast({
        title: "Success",
        description: `Lab test ${!currentStatus ? 'activated' : 'deactivated'} successfully`
      });
    } catch (error) {
      console.error('LabTestManagement: Error updating lab test status:', error);
      toast({
        title: "Error",
        description: "Failed to update lab test status",
        variant: "destructive"
      });
    }
  };

  const filteredLabTests = labTests.filter(labTest =>
    labTest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    labTest.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    labTest.test_code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading lab tests...</p>
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
            <Button onClick={loadLabTests} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Test Catalog Management
              </CardTitle>
              <CardDescription>
                Manage the catalog of all lab tests available across laboratory listings
              </CardDescription>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleAddLabTest}>
              <Plus className="h-4 w-4 mr-2" />
              Add Lab Test
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search lab tests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="secondary">
              {filteredLabTests.length} found
            </Badge>
          </div>

          {/* Lab Tests Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price (₦)</TableHead>
                  <TableHead>Test Code</TableHead>
                  <TableHead>Sample Type</TableHead>
                  <TableHead>Turnaround</TableHead>
                  <TableHead>Fasting</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLabTests.map((labTest) => (
                  <LabTestTableRow 
                    key={labTest.id}
                    labTest={labTest}
                    onEdit={handleEditLabTest}
                    onToggleStatus={toggleLabTestStatus}
                  />
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredLabTests.length === 0 && (
            <div className="text-center py-8">
              <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchTerm ? 'No lab tests found matching your criteria' : 'No lab tests available'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <LabTestForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        labTest={editingLabTest}
        onSuccess={handleFormSuccess}
      />
    </>
  );
};

export default LabTestManagement;
