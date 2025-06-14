
import React, { useState, useEffect } from 'react';
import { Video, Plus, Search, Edit, Trash2, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { adminService, type TelemedicineProvider } from '@/services/AdminService';
import { useToast } from '@/hooks/use-toast';

const TelemedicineManagement = () => {
  const [providers, setProviders] = useState<TelemedicineProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      const providersData = await adminService.getAllTelemedicineProviders();
      setProviders(providersData);
    } catch (error) {
      console.error('Error loading telemedicine providers:', error);
      toast({
        title: "Error",
        description: "Failed to load telemedicine providers",
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
      toast({
        title: "Success",
        description: `Provider ${!currentStatus ? 'activated' : 'deactivated'} successfully`
      });
    } catch (error) {
      console.error('Error updating provider status:', error);
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
              Manage telemedicine providers and virtual consultation services
            </CardDescription>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700">
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
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-500">{provider.rating || 0}/5</span>
                    </div>
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
                    <span className="font-medium">Experience:</span>
                    <span className="text-gray-600">{provider.experience_years || 0} years</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Consultation Fee:</span>
                    <span className="text-gray-600">₦{provider.consultation_fee || 0}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Phone:</span>
                    <span className="text-gray-600">{provider.phone || 'N/A'}</span>
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
            <p className="text-gray-600">No telemedicine providers found matching your criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TelemedicineManagement;
