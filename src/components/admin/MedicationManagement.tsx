
import React, { useState, useEffect } from 'react';
import { Pill, Plus, Search, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { medicationService, type Medication } from '@/services/MedicationService';
import { useToast } from '@/hooks/use-toast';
import MedicationForm from './forms/MedicationForm';
import MedicationTableRow from './medication/MedicationTableRow';

interface MedicationManagementProps {
  onStatsChange?: () => Promise<void>;
}

const MedicationManagement = ({ onStatsChange }: MedicationManagementProps) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('MedicationManagement: Loading medications...');
      
      const medicationsData = await medicationService.getAllMedications();
      setMedications(medicationsData);
      console.log('MedicationManagement: Successfully loaded', medicationsData.length, 'medications');
      
    } catch (error) {
      console.error('MedicationManagement: Error loading medications:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(`Failed to load medications: ${errorMessage}`);
      toast({
        title: "Error",
        description: "Failed to load medications. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedication = () => {
    setEditingMedication(undefined);
    setIsFormOpen(true);
  };

  const handleEditMedication = (medication: Medication) => {
    setEditingMedication(medication);
    setIsFormOpen(true);
  };

  const handleFormSuccess = async () => {
    await loadMedications();
    if (onStatsChange) {
      await onStatsChange();
    }
  };

  const toggleMedicationStatus = async (id: string, currentStatus: boolean) => {
    try {
      await medicationService.updateMedication(id, { is_active: !currentStatus });
      await loadMedications();
      
      if (onStatsChange) {
        await onStatsChange();
      }
      
      toast({
        title: "Success",
        description: `Medication ${!currentStatus ? 'activated' : 'deactivated'} successfully`
      });
    } catch (error) {
      console.error('MedicationManagement: Error updating medication status:', error);
      toast({
        title: "Error",
        description: "Failed to update medication status",
        variant: "destructive"
      });
    }
  };

  const filteredMedications = medications.filter(medication =>
    medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medication.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medication.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading medications...</p>
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
            <Button onClick={loadMedications} variant="outline">
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
                <Pill className="h-5 w-5" />
                Medication Management
              </CardTitle>
              <CardDescription>
                Manage all medications available across pharmacy listings
              </CardDescription>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleAddMedication}>
              <Plus className="h-4 w-4 mr-2" />
              Add Medication
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search medications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="secondary">
              {filteredMedications.length} found
            </Badge>
          </div>

          {/* Medications Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price (₦)</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Prescription</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMedications.map((medication) => (
                  <MedicationTableRow 
                    key={medication.id}
                    medication={medication}
                    onEdit={handleEditMedication}
                    onToggleStatus={toggleMedicationStatus}
                  />
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredMedications.length === 0 && (
            <div className="text-center py-8">
              <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchTerm ? 'No medications found matching your criteria' : 'No medications available'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <MedicationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        medication={editingMedication}
        onSuccess={handleFormSuccess}
      />
    </>
  );
};

export default MedicationManagement;
