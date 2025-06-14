import React, { useState, useEffect } from 'react';
import { TestTube, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { labService, type Lab } from '@/services/LabService';
import { useToast } from '@/hooks/use-toast';

const LabManagement = () => {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadLabs();
  }, []);

  const loadLabs = async () => {
    try {
      const labsData = await labService.getAllLabs();
      setLabs(labsData);
    } catch (error) {
      console.error('Error loading labs:', error);
      toast({
        title: "Error",
        description: "Failed to load labs",
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
      toast({
        title: "Success",
        description: `Lab ${!currentStatus ? 'activated' : 'deactivated'} successfully`
      });
    } catch (error) {
      console.error('Error updating lab status:', error);
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
        </div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map((lab) => (
            <Card key={lab.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{lab.name}</CardTitle>
                    <p className="text-sm text-gray-600">{lab.address}</p>
                    <p className="text-xs text-gray-500">{lab.state}, {lab.lga}</p>
                  </div>
                  <Badge className={lab.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {lab.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">License:</span>
                    <span className="text-gray-600">{lab.license_number || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Phone:</span>
                    <span className="text-gray-600">{lab.phone || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Email:</span>
                    <span className="text-gray-600">{lab.email || 'N/A'}</span>
                  </div>
                </div>

                {lab.test_types && lab.test_types.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Test Types:</p>
                    <div className="flex flex-wrap gap-1">
                      {lab.test_types.slice(0, 3).map((testType, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {testType}
                        </Badge>
                      ))}
                      {lab.test_types.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{lab.test_types.length - 3} more
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
                    variant={lab.is_active ? "destructive" : "default"}
                    size="sm"
                    onClick={() => toggleLabStatus(lab.id, lab.is_active)}
                  >
                    {lab.is_active ? (
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

        {filteredLabs.length === 0 && (
          <div className="text-center py-8">
            <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No labs found matching your criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LabManagement;
