
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Play, 
  Square, 
  Plus, 
  Cpu, 
  Memory, 
  Clock,
  Terminal,
  Code,
  Zap,
  AlertCircle
} from 'lucide-react';
import { mlAnalyticsService, type MLEnvironment } from '@/services/MLAnalyticsService';
import { useToast } from '@/hooks/use-toast';

interface MLEnvironmentManagerProps {
  environments: MLEnvironment[];
  onEnvironmentChange: () => void;
}

const MLEnvironmentManager = ({ environments, onEnvironmentChange }: MLEnvironmentManagerProps) => {
  const [creating, setCreating] = useState(false);
  const [starting, setStarting] = useState<string | null>(null);
  const [newEnv, setNewEnv] = useState({
    name: '',
    cpu: 2,
    memory: 4,
    gpu: false,
    libraries: [] as string[]
  });
  const { toast } = useToast();

  const availableLibraries = [
    'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch', 
    'matplotlib', 'seaborn', 'plotly', 'jupyter', 'biopython',
    'scipy', 'statsmodels', 'xgboost', 'lightgbm', 'catboost'
  ];

  const handleCreateEnvironment = async () => {
    if (!newEnv.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Environment name is required",
        variant: "destructive"
      });
      return;
    }

    setCreating(true);
    try {
      await mlAnalyticsService.createEnvironment({
        name: newEnv.name,
        resources: {
          cpu: newEnv.cpu,
          memory: newEnv.memory,
          gpu: newEnv.gpu
        },
        libraries: newEnv.libraries
      });

      toast({
        title: "Environment Created",
        description: `${newEnv.name} environment is being set up`,
      });

      setNewEnv({ name: '', cpu: 2, memory: 4, gpu: false, libraries: [] });
      onEnvironmentChange();
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Failed to create ML environment",
        variant: "destructive"
      });
    } finally {
      setCreating(false);
    }
  };

  const handleStartEnvironment = async (envId: string) => {
    setStarting(envId);
    try {
      await mlAnalyticsService.startEnvironment(envId);
      toast({
        title: "Environment Started",
        description: "ML environment is now running",
      });
      onEnvironmentChange();
    } catch (error) {
      toast({
        title: "Start Failed",
        description: "Failed to start ML environment",
        variant: "destructive"
      });
    } finally {
      setStarting(null);
    }
  };

  const handleStopEnvironment = async (envId: string) => {
    try {
      await mlAnalyticsService.stopEnvironment(envId);
      toast({
        title: "Environment Stopped",
        description: "ML environment has been stopped",
      });
      onEnvironmentChange();
    } catch (error) {
      toast({
        title: "Stop Failed",
        description: "Failed to stop ML environment",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: MLEnvironment['status']) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'stopped': return 'bg-gray-100 text-gray-800';
      case 'starting': return 'bg-blue-100 text-blue-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleLibrary = (library: string) => {
    setNewEnv(prev => ({
      ...prev,
      libraries: prev.libraries.includes(library)
        ? prev.libraries.filter(lib => lib !== library)
        : [...prev.libraries, library]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">ML Environments</h2>
          <p className="text-gray-600">Manage your sandboxed ML computing environments</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Environment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create ML Environment</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="env-name">Environment Name</Label>
                <Input
                  id="env-name"
                  value={newEnv.name}
                  onChange={(e) => setNewEnv(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="My ML Environment"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>CPU Cores</Label>
                  <Select value={newEnv.cpu.toString()} onValueChange={(value) => setNewEnv(prev => ({ ...prev, cpu: parseInt(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 cores</SelectItem>
                      <SelectItem value="4">4 cores</SelectItem>
                      <SelectItem value="8">8 cores</SelectItem>
                      <SelectItem value="16">16 cores</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Memory (GB)</Label>
                  <Select value={newEnv.memory.toString()} onValueChange={(value) => setNewEnv(prev => ({ ...prev, memory: parseInt(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4 GB</SelectItem>
                      <SelectItem value="8">8 GB</SelectItem>
                      <SelectItem value="16">16 GB</SelectItem>
                      <SelectItem value="32">32 GB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="gpu-enabled"
                  checked={newEnv.gpu}
                  onCheckedChange={(checked) => setNewEnv(prev => ({ ...prev, gpu: !!checked }))}
                />
                <Label htmlFor="gpu-enabled">Enable GPU acceleration</Label>
              </div>

              <div className="space-y-2">
                <Label>Pre-installed Libraries</Label>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto border rounded p-3">
                  {availableLibraries.map((library) => (
                    <div key={library} className="flex items-center space-x-2">
                      <Checkbox
                        id={library}
                        checked={newEnv.libraries.includes(library)}
                        onCheckedChange={() => toggleLibrary(library)}
                      />
                      <Label htmlFor={library} className="text-sm">{library}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Environments are automatically sandboxed and cannot access production data directly. 
                  All data access goes through the approved dataset curator.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setNewEnv({ name: '', cpu: 2, memory: 4, gpu: false, libraries: [] })}>
                  Reset
                </Button>
                <Button onClick={handleCreateEnvironment} disabled={creating}>
                  {creating ? 'Creating...' : 'Create Environment'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Environment List */}
      <div className="grid gap-6">
        {environments.map((env) => (
          <Card key={env.id} className="border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Terminal className="h-6 w-6 text-purple-600" />
                  <div>
                    <CardTitle className="text-lg">{env.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(env.status)}>
                        {env.status.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        <Clock className="h-3 w-3 inline mr-1" />
                        Last accessed: {new Date(env.last_accessed).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {env.status === 'running' ? (
                    <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Code className="h-4 w-4 mr-2" />
                        Open Jupyter
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStopEnvironment(env.id)}
                      >
                        <Square className="h-4 w-4 mr-2" />
                        Stop
                      </Button>
                    </>
                  ) : (
                    <Button 
                      size="sm"
                      onClick={() => handleStartEnvironment(env.id)}
                      disabled={starting === env.id}
                    >
                      {starting === env.id ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                          Starting...
                        </div>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Start
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    <strong>{env.resources.cpu}</strong> CPU cores
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Memory className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    <strong>{env.resources.memory} GB</strong> memory
                  </span>
                </div>
                
                {env.resources.gpu && (
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">GPU enabled</span>
                  </div>
                )}
              </div>

              {env.libraries.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-medium mb-2">Installed Libraries:</div>
                  <div className="flex flex-wrap gap-1">
                    {env.libraries.slice(0, 8).map((lib) => (
                      <Badge key={lib} variant="outline" className="text-xs">
                        {lib}
                      </Badge>
                    ))}
                    {env.libraries.length > 8 && (
                      <Badge variant="outline" className="text-xs">
                        +{env.libraries.length - 8} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {environments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Terminal className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No ML Environments</h3>
            <p className="text-gray-600 mb-4">
              Create your first ML environment to start building and training models
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Environment
                </Button>
              </DialogTrigger>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MLEnvironmentManager;
