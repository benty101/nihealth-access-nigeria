import React, { useState, useEffect } from 'react';
import { Pill, Plus, Search, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { adminService, type Pharmacy } from '@/services/AdminService';
import { useToast } from '@/hooks/use-toast';
import PharmacyForm from './forms/PharmacyForm';
import PharmacyCard from './pharmacy/PharmacyCard';
import { usePharmacies } from '@/hooks/usePharmacies';

interface PharmacyManagementProps {
  onStatsChange?: () => Promise<void>;
}

const PharmacyManagement = ({ onStatsChange }: PharmacyManagementProps) => {
  // Replace pharmacies state with our new hook
  const { data: pharmacies = [], isLoading: loading, isError, refetch } = usePharmacies({ admin: true });
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | undefined>();
  const { toast } = useToast();

  const handleAdd = () => {
    setSelectedPharmacy(undefined);
    setShowForm(true);
  };

  const handleEdit = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setShowForm(true);
  };

  const handleFormSuccess = async () => {
    await refetch();
    if (onStatsChange) {
      await onStatsChange();
    }
    setShowForm(false);
    setSelectedPharmacy(undefined);
  };

  const togglePharmacyStatus = async (id: string, currentStatus: boolean) => {
    try {
      await adminService.updatePharmacy(id, { is_active: !currentStatus });
      await refetch();

      if (onStatsChange) {
        await onStatsChange();
      }

      toast({
        title: "Success",
        description: `Pharmacy ${!currentStatus ? 'activated' : 'deactivated'} successfully`
      });
    } catch (error) {
      console.error('PharmacyManagement: Error updating pharmacy status:', error);
      toast({
        title: "Error",
        description: "Failed to update pharmacy status",
        variant: "destructive"
      });
    }
  };

  const filteredPharmacies = pharmacies.filter(pharmacy =>
    pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.lga?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading pharmacies...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="py-16">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Failed to load pharmacies</AlertDescription>
          </Alert>
          <div className="flex justify-center mt-4">
            <Button onClick={() => refetch()} variant="outline">
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
                Pharmacy Management
              </CardTitle>
              <CardDescription>
                Manage pharmacy listings and services across the platform
              </CardDescription>
            </div>
            <Button onClick={handleAdd} className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Pharmacy
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search pharmacies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="secondary">
              {filteredPharmacies.length} found
            </Badge>
          </div>

          {/* Pharmacies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPharmacies.map((pharmacy) => (
              <PharmacyCard 
                key={pharmacy.id}
                pharmacy={pharmacy} 
                onEdit={handleEdit}
                onToggleStatus={togglePharmacyStatus}
              />
            ))}
          </div>

          {filteredPharmacies.length === 0 && (
            <div className="text-center py-8">
              <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchTerm ? 'No pharmacies found matching your criteria' : 'No pharmacies available'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <PharmacyForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        pharmacy={selectedPharmacy}
        onSuccess={handleFormSuccess}
      />
    </>
  );
};

export default PharmacyManagement;
