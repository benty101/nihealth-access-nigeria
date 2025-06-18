
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Settings, RefreshCw, Trash2, Eye, EyeOff, ExternalLink, Globe } from 'lucide-react';
import { insuranceApiService } from '@/services/InsuranceApiService';
import { useToast } from '@/hooks/use-toast';

const InsuranceApiManagement = () => {
  const [configs, setConfigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [showApiForm, setShowApiForm] = useState(false);
  const [editingConfig, setEditingConfig] = useState<any>(null);
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    try {
      const data = await insuranceApiService.getApiConfigs();
      setConfigs(data);
    } catch (error) {
      console.error('Error loading API configs:', error);
      toast({
        title: 'Error',
        description: 'Failed to load API configurations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      await insuranceApiService.syncExternalData();
      toast({
        title: 'Sync Complete',
        description: 'Insurance data has been synced from external APIs',
      });
      loadConfigs();
    } catch (error) {
      console.error('Sync error:', error);
      toast({
        title: 'Sync Failed',
        description: 'Failed to sync data from external APIs',
        variant: 'destructive',
      });
    } finally {
      setSyncing(false);
    }
  };

  const toggleApiKeyVisibility = (configId: string) => {
    setShowApiKey(prev => ({
      ...prev,
      [configId]: !prev[configId]
    }));
  };

  const ApiConfigForm = ({ config, onClose }: { config?: any; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      provider_name: config?.provider_name || '',
      api_endpoint: config?.api_endpoint || '',
      api_key_reference: config?.api_key_reference || '',
      config_data: config?.config_data || {},
      is_active: config?.is_active ?? true,
      provider_type: config?.config_data?.provider_type || 'direct'
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const configDataWithType = {
          ...formData.config_data,
          provider_type: formData.provider_type,
          aggregator: formData.provider_type === 'aggregator'
        };

        const submitData = {
          ...formData,
          config_data: configDataWithType
        };

        if (config) {
          await insuranceApiService.updateApiConfig(config.id, submitData);
          toast({
            title: 'API Configuration Updated',
            description: 'The API configuration has been updated successfully',
          });
        } else {
          await insuranceApiService.createApiConfig(submitData);
          toast({
            title: 'API Configuration Created',
            description: 'New API configuration has been created successfully',
          });
        }
        loadConfigs();
        onClose();
      } catch (error) {
        console.error('Error saving config:', error);
        toast({
          title: 'Error',
          description: 'Failed to save API configuration',
          variant: 'destructive',
        });
      }
    };

    const presetConfigs = {
      myframe: {
        provider_name: 'MyFrame API',
        api_endpoint: 'https://api.myframe.ai/v1/insurance',
        provider_type: 'aggregator',
        config_data: { 
          version: '1.0', 
          format: 'json', 
          aggregator: true,
          supports_quotes: true,
          supports_purchase: true
        }
      },
      mycover: {
        provider_name: 'MyCover API',
        api_endpoint: 'https://api.mycover.ai/v1',
        provider_type: 'aggregator',
        config_data: { 
          version: '2.0', 
          format: 'json', 
          aggregator: true,
          supports_quotes: true,
          supports_purchase: true
        }
      }
    };

    const applyPreset = (preset: string) => {
      const presetData = presetConfigs[preset as keyof typeof presetConfigs];
      if (presetData) {
        setFormData({
          ...formData,
          ...presetData
        });
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2 mb-4">
          <Button type="button" variant="outline" size="sm" onClick={() => applyPreset('myframe')}>
            MyFrame Preset
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => applyPreset('mycover')}>
            MyCover Preset
          </Button>
        </div>

        <div>
          <Label htmlFor="provider_type">Provider Type</Label>
          <Select value={formData.provider_type} onValueChange={(value) => setFormData({...formData, provider_type: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select provider type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="direct">Direct Provider</SelectItem>
              <SelectItem value="aggregator">API Aggregator</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="provider_name">Provider Name</Label>
          <Input
            id="provider_name"
            value={formData.provider_name}
            onChange={(e) => setFormData({...formData, provider_name: e.target.value})}
            placeholder="e.g., AIICO Insurance or MyFrame API"
            required
          />
        </div>

        <div>
          <Label htmlFor="api_endpoint">API Endpoint</Label>
          <Input
            id="api_endpoint"
            value={formData.api_endpoint}
            onChange={(e) => setFormData({...formData, api_endpoint: e.target.value})}
            placeholder="https://api.provider.com/v1"
            required
          />
        </div>

        <div>
          <Label htmlFor="api_key_reference">API Key Reference</Label>
          <Input
            id="api_key_reference"
            value={formData.api_key_reference}
            onChange={(e) => setFormData({...formData, api_key_reference: e.target.value})}
            placeholder="Reference to Supabase secret (e.g., myframe_api_key)"
          />
          <p className="text-sm text-gray-500 mt-1">
            Store your actual API key in Supabase secrets, then reference it here
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_active"
            checked={formData.is_active}
            onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
          />
          <Label htmlFor="is_active">Active</Label>
        </div>

        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            {config ? 'Update' : 'Create'} Configuration
          </Button>
        </div>
      </form>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Insurance API Management</h2>
          <p className="text-gray-600">Manage direct provider APIs and aggregator integrations</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSync} disabled={syncing} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync Data'}
          </Button>
          <Dialog open={showApiForm} onOpenChange={setShowApiForm}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add API Integration
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Insurance API Integration</DialogTitle>
              </DialogHeader>
              <ApiConfigForm onClose={() => setShowApiForm(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {configs.map((config) => (
          <Card key={config.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {config.config_data?.aggregator && <Globe className="h-4 w-4 text-blue-500" />}
                  <CardTitle className="text-lg">{config.provider_name}</CardTitle>
                </div>
                <div className="flex gap-2">
                  <Badge variant={config.is_active ? 'default' : 'secondary'}>
                    {config.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                  {config.config_data?.aggregator && (
                    <Badge variant="outline" className="text-blue-600">
                      Aggregator
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Endpoint</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-mono bg-gray-100 p-1 rounded truncate flex-1">
                      {config.api_endpoint}
                    </p>
                    <Button size="sm" variant="ghost" asChild>
                      <a href={config.api_endpoint} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>

                {config.api_key_reference && (
                  <div>
                    <p className="text-sm text-gray-600">API Key Reference</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-mono bg-gray-100 p-1 rounded flex-1">
                        {showApiKey[config.id] ? config.api_key_reference : '••••••••'}
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleApiKeyVisibility(config.id)}
                      >
                        {showApiKey[config.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                )}

                {config.last_sync && (
                  <div>
                    <p className="text-sm text-gray-600">Last Sync</p>
                    <p className="text-sm">{new Date(config.last_sync).toLocaleString()}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Settings className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Edit API Configuration</DialogTitle>
                      </DialogHeader>
                      <ApiConfigForm 
                        config={config} 
                        onClose={() => setEditingConfig(null)} 
                      />
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {configs.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No API Integrations</h3>
            <p className="text-gray-600 mb-4">
              Add external insurance API integrations to automatically sync plan data from providers or aggregators like MyFrame.
            </p>
            <div className="flex justify-center gap-2">
              <Dialog open={showApiForm} onOpenChange={setShowApiForm}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Integration
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Insurance API Integration</DialogTitle>
                  </DialogHeader>
                  <ApiConfigForm onClose={() => setShowApiForm(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InsuranceApiManagement;
