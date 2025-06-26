
import React, { useState, useEffect } from 'react';
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
  Settings, 
  Plus,
  Cpu,
  HardDrive,
  Zap,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Loader2
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
  const [stopping, setStopping] = useState<string | null>(null);
  const [newEnvironment, setNewEnvironment] = useState({
    name: '',
    cpu: 2,
    memory: 4,
    gpu: false,
    libraries: [] as string[]
  });
  const { toast } = useToast();

  const availableLibraries = [
    'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch', 
    'matplotlib', 'seaborn', 'plotly', 'jupyter', 'keras',
    'xgboost', 'lightgbm', 'scipy', 'statsmodels', 'networkx'
  ];

  const getStatusColor = (status: MLEnvironment['status']) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'stopped': return 'bg-gray-100 text-gray-800';
      case 'starting': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: MLEnvironment['status']) => {
    switch (status) {
      case 'running': return <CheckCircle2 className="h-4 w-4" />;
      case 'stopped': return <Square className="h-4 w-4" />;
      case 'starting': return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleCreateEnvironment = async () => {
    if (!newEnvironment.name.trim()) {
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
        name: newEnvironment.name,
        resources: {
          cpu: newEnvironment.cpu,
          memory: newEnvironment.memory,
          gpu: newEnvironment.gpu
        },
        libraries: newEnvironment.libraries
      });
      
      toast({
        title: "Environment Created",
        description: "ML environment has been created successfully",
      });
      
      onEnvironmentChange();
      setNewEnvironment({ name: '', cpu: 2, memory: 4, gpu: false, libraries: [] });
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

  const handleStartEnvironment = async (environmentId: string) => {
    setStarting(environmentId);
    try {
      await mlAnalyticsService.startEnvironment(environmentId);
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

  const handleStopEnvironment = async (environmentId: string) => {
    setStopping(environmentId);
    try {
      await mlAnalyticsService.stopEnvironment(environmentId);
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
    } finally {
      setStopping(null);
    }
  };

  const toggleLibrary = (library: string) => {
    setNewEnvironment(prev => ({
      ...prev,
      libraries: prev.libraries.includes(library)
        ? prev.libraries.filter(lib => lib !== library)
        : [...prev.libraries, library]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">ML Environment Manager</h2>
          <p className="text-gray-600">Manage sandboxed machine learning environments</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Environment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create ML Environment</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  ML environments are sandboxed and isolated for security. All data processing 
                  happens in a controlled environment with no external network access.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label>Environment Name</Label>
                <Input
                  value={newEnvironment.name}
                  onChange={(e) => setNewEnvironment(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Outbreak Analysis Environment"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>CPU Cores</Label>
                  <Select 
                    value={newEnvironment.cpu.toString()} 
                    onValueChange={(value) => setNewEnvironment(prev => ({ ...prev, cpu: parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Core</SelectItem>
                      <SelectItem value="2">2 Cores</SelectItem>
                      <SelectItem value="4">4 Cores</SelectItem>
                      <SelectItem value="8">8 Cores</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Memory (GB)</Label>
                  <Select 
                    value={newEnvironment.memory.toString()} 
                    onValueChange={(value) => setNewEnvironment(prev => ({ ...prev, memory: parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 GB</SelectItem>
                      <SelectItem value="4">4 GB</SelectItem>
                      <SelectItem value="8">8 GB</SelectItem>
                      <SelectItem value="16">16 GB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="gpu-enabled"
                    checked={newEnvironment.gpu}
                    onCheckedChange={(checked) => setNewEnvironment(prev => ({ ...prev, gpu: !!checked }))}
                  />
                  <Label htmlFor="gpu-enabled">Enable GPU Support (for deep learning)</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>ML Libraries</Label>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto border rounded p-3">
                  {availableLibraries.map((library) => (
                    <div key={library} className="flex items-center space-x-2">
                      <Checkbox
                        id={library}
                        checked={newEnvironment.libraries.includes(library)}
                        onCheckedChange={() => toggleLibrary(library)}
                      />
                      <Label htmlFor={library} className="text-sm">{library}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setNewEnvironment({ name: '', cpu: 2, memory: 4, gpu: false, libraries: [] })}>
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

      <div className="grid gap-6">
        {environments.map((env) => (
          <Card key={env.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    <h3 className="text-lg font-semibold">{env.name}</h3>
                    <Badge className={getStatusColor(env.status)}>
                      {getStatusIcon(env.status)}
                      <span className="ml-1 capitalize">{env.status}</span>
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-gray-500" />
                      <span>{env.resources.cpu} CPU cores</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-gray-500" />
                      <span>{env.resources.memory} GB RAM</span>
                    </div>
                    {env.resources.gpu && (
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span>GPU Enabled</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>Last used: {new Date(env.last_accessed).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {env.libraries.slice(0, 6).map((lib) => (
                      <Badge key={lib} variant="outline" className="text-xs">
                        {lib}
                      </Badge>
                    ))}
                    {env.libraries.length > 6 && (
                      <Badge variant="outline" className="text-xs">
                        +{env.libraries.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {env.status === 'stopped' && (
                    <Button 
                      size="sm" 
                      onClick={() => handleStartEnvironment(env.id)}
                      disabled={starting === env.id}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {starting === env.id ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="h-4 w-4 mr-2" />
                      )}
                      Start
                    </Button>
                  )}
                  
                  {env.status === 'running' && (
                    <>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Open Jupyter
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStopEnvironment(env.id)}
                        disabled={stopping === env.id}
                      >
                        {stopping === env.id ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Square className="h-4 w-4 mr-2" />
                        )}
                        Stop
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {environments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Cpu className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No ML Environments</h3>
            <p className="text-gray-600 mb-4">
              Create your first ML environment to start building and training models
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MLEnvironmentManager;
