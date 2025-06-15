import React, { useState, useEffect } from 'react';
import { Pill, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { pharmacyService, type Pharmacy } from '@/services/PharmacyService';
import { useToast } from '@/hooks/use-toast';

interface PharmacyManagementProps {
  onStatsChange?: () => Promise<void>;
}

const PharmacyManagement = ({ onStatsChange }: PharmacyManagementProps) => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadPharmacies();
  }, []);

  const loadPharmacies = async () => {
    try {
      const pharmaciesData = await pharmacyService.getAllPharmacies();
      setPharmacies(pharmaciesData);
    } catch (error) {
      console.error('Error loading pharmacies:', error);
      toast({
        title: "Error",
        description: "Failed to load pharmacies",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePharmacyStatus = async (id: string, currentStatus: boolean) => {
    try {
      await pharmacyService.updatePharmacy(id, { is_active: !currentStatus });
      await loadPharmacies();
      
      // Trigger stats refresh if callback provided
      if (onStatsChange) {
        await onStatsChange();
      }
      
      toast({
        title: "Success",
        description: `Pharmacy ${!currentStatus ? 'activated' : 'deactivated'} successfully`
      });
    } catch (error) {
      console.error('Error updating pharmacy status:', error);
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

  return (
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
          <Button className="bg-teal-600 hover:bg-teal-700">
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
        </div>

        {/* Pharmacies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPharmacies.map((pharmacy) => (
            <Card key={pharmacy.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{pharmacy.name}</CardTitle>
                    <p className="text-sm text-gray-600">{pharmacy.address}</p>
                    <p className="text-xs text-gray-500">{pharmacy.state}, {pharmacy.lga}</p>
                  </div>
                  <Badge className={pharmacy.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {pharmacy.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">License:</span>
                    <span className="text-gray-600">{pharmacy.license_number || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Phone:</span>
                    <span className="text-gray-600">{pharmacy.phone || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Email:</span>
                    <span className="text-gray-600">{pharmacy.email || 'N/A'}</span>
                  </div>
                </div>

                {pharmacy.specialties && pharmacy.specialties.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {pharmacy.specialties.slice(0, 3).map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {pharmacy.specialties.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{pharmacy.specialties.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant={pharmacy.is_active ? "destructive" : "default"}
                    size="sm"
                    onClick={() => togglePharmacyStatus(pharmacy.id, pharmacy.is_active)}
                  >
                    {pharmacy.is_active ? (
                      <>
                        <Trash2 className="h-3 w-3 mr-1" />
                        Deactivate
                      </>
                    ) : (
                      'Activate'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPharmacies.length === 0 && (
          <div className="text-center py-8">
            <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No pharmacies found matching your criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PharmacyManagement;
