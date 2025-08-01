
import React, { useState, useEffect } from 'react';
import { Video, Plus, Search, Edit, Trash2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { adminService, type TelemedicineProvider } from '@/services/AdminService';
import { useToast } from '@/hooks/use-toast';
import TelemedicineProviderForm from '@/components/admin/forms/TelemedicineProviderForm';

interface TelemedicineManagementProps {
  onStatsChange?: () => Promise<void>;
}

const TelemedicineManagement = ({ onStatsChange }: TelemedicineManagementProps) => {
  const [providers, setProviders] = useState<TelemedicineProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('TelemedicineManagement: Loading all providers for admin...');
      
      const providersData = await adminService.getAllTelemedicineProviders();
      setProviders(providersData);
      console.log('TelemedicineManagement: Successfully loaded', providersData.length, 'providers for admin');
      
    } catch (error) {
      console.error('TelemedicineManagement: Error loading providers:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(`Failed to load telemedicine providers: ${errorMessage}`);
      toast({
        title: "Error",
        description: "Failed to load telemedicine providers. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleProviderStatus = async (id: string, currentStatus: boolean) => {
    try {
      await adminService.updateTelemedicineProvider(id, { is_active: !currentStatus });
      await loadProviders();
      
      if (onStatsChange) {
        await onStatsChange();
      }
      
      toast({
        title: "Success",
        description: `Provider ${!currentStatus ? 'activated' : 'deactivated'} successfully`
      });
    } catch (error) {
      console.error('TelemedicineManagement: Error updating provider status:', error);
      toast({
        title: "Error",
        description: "Failed to update provider status",
        variant: "destructive"
      });
    }
  };

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading telemedicine providers...</p>
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
            <Button onClick={loadProviders} variant="outline">
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
              <Video className="h-5 w-5" />
              Telemedicine Management
            </CardTitle>
            <CardDescription>
              Manage online healthcare providers and virtual consultations
            </CardDescription>
          </div>
          <Button 
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Provider
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Badge variant="secondary">
            {filteredProviders.length} found
          </Badge>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <Card key={provider.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{provider.name}</CardTitle>
                    <p className="text-sm text-gray-600">{provider.specialization}</p>
                    <p className="text-xs text-gray-500">{provider.experience_years} years experience</p>
                  </div>
                  <Badge className={provider.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {provider.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">License:</span>
                    <span className="text-gray-600">{provider.license_number || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Fee:</span>
                    <span className="text-gray-600">₦{provider.consultation_fee?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Rating:</span>
                    <span className="text-gray-600">{provider.rating}/5.0</span>
                  </div>
                </div>

                {provider.languages && provider.languages.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Languages:</p>
                    <div className="flex flex-wrap gap-1">
                      {provider.languages.slice(0, 3).map((language, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {language}
                        </Badge>
                      ))}
                      {provider.languages.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{provider.languages.length - 3} more
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
                    variant={provider.is_active ? "destructive" : "default"}
                    size="sm"
                    onClick={() => toggleProviderStatus(provider.id, provider.is_active)}
                  >
                    {provider.is_active ? (
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

        {filteredProviders.length === 0 && (
          <div className="text-center py-8">
            <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {searchTerm ? 'No telemedicine providers found matching your criteria' : 'No telemedicine providers available'}
            </p>
          </div>
        )}
      </CardContent>

      <TelemedicineProviderForm
        open={showAddForm}
        onOpenChange={setShowAddForm}
        onSuccess={loadProviders}
      />
    </Card>
  );
};

export default TelemedicineManagement;
