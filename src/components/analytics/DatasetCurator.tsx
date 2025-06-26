import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Database, 
  Plus, 
  FileText, 
  Shield, 
  Users,
  Shuffle,
  Download,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { mlAnalyticsService, type Dataset } from '@/services/MLAnalyticsService';
import { useToast } from '@/hooks/use-toast';

interface DatasetCuratorProps {
  datasets: Dataset[];
  onDatasetChange: () => void;
}

const DatasetCurator = ({ datasets, onDatasetChange }: DatasetCuratorProps) => {
  const [generating, setGenerating] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [syntheticParams, setSyntheticParams] = useState({
    type: 'outbreak' as 'outbreak' | 'clinical' | 'genomic',
    size: 10000,
    features: [] as string[]
  });
  const { toast } = useToast();

  const getTypeColor = (type: Dataset['type']) => {
    switch (type) {
      case 'synthetic': return 'bg-blue-100 text-blue-800';
      case 'de_identified': return 'bg-green-100 text-green-800';
      case 'public': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceColor = (status: Dataset['compliance_status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const handleGenerateSynthetic = async () => {
    if (syntheticParams.features.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please specify at least one feature",
        variant: "destructive"
      });
      return;
    }

    setGenerating(true);
    try {
      await mlAnalyticsService.generateSyntheticDataset(syntheticParams);
      toast({
        title: "Dataset Generated",
        description: "Synthetic dataset has been created successfully",
      });
      onDatasetChange();
      setSyntheticParams({ type: 'outbreak', size: 10000, features: [] });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate synthetic dataset",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  const getFeatureOptions = (type: string) => {
    switch (type) {
      case 'outbreak':
        return ['date', 'location', 'cases', 'population', 'mobility_index', 'temperature', 'humidity'];
      case 'clinical':
        return ['age', 'gender', 'symptoms', 'biomarkers', 'outcome', 'treatment', 'duration'];
      case 'genomic':
        return ['chromosome', 'position', 'ref_allele', 'alt_allele', 'quality_score', 'depth'];
      default:
        return [];
    }
  };

  const toggleFeature = (feature: string) => {
    setSyntheticParams(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dataset Curator</h2>
          <p className="text-gray-600">Manage curated datasets for ML model training</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Shuffle className="h-4 w-4 mr-2" />
              Generate Synthetic
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Generate Synthetic Dataset</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Synthetic datasets are generated using privacy-preserving techniques and 
                  maintain statistical properties while protecting individual privacy.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label>Dataset Type</Label>
                <Select 
                  value={syntheticParams.type} 
                  onValueChange={(value) => setSyntheticParams(prev => ({ 
                    ...prev, 
                    type: value as any,
                    features: [] 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="outbreak">Outbreak/Epidemiological</SelectItem>
                    <SelectItem value="clinical">Clinical Trials</SelectItem>
                    <SelectItem value="genomic">Genomic Variants</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Dataset Size (rows)</Label>
                <Input
                  type="number"
                  value={syntheticParams.size}
                  onChange={(e) => setSyntheticParams(prev => ({ 
                    ...prev, 
                    size: parseInt(e.target.value) || 10000 
                  }))}
                  min="1000"
                  max="1000000"
                />
              </div>

              <div className="space-y-2">
                <Label>Features to Include</Label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded p-3">
                  {getFeatureOptions(syntheticParams.type).map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={feature}
                        checked={syntheticParams.features.includes(feature)}
                        onChange={() => toggleFeature(feature)}
                        className="rounded"
                      />
                      <Label htmlFor={feature} className="text-sm">{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSyntheticParams({ type: 'outbreak', size: 10000, features: [] })}>
                  Reset
                </Button>
                <Button onClick={handleGenerateSynthetic} disabled={generating}>
                  {generating ? 'Generating...' : 'Generate Dataset'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Dataset Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shuffle className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Synthetic Datasets</p>
                <p className="text-2xl font-bold">
                  {datasets.filter(d => d.type === 'synthetic').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">De-identified</p>
                <p className="text-2xl font-bold">
                  {datasets.filter(d => d.type === 'de_identified').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Public Datasets</p>
                <p className="text-2xl font-bold">
                  {datasets.filter(d => d.type === 'public').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dataset List */}
      <div className="grid gap-4">
        {datasets.map((dataset) => (
          <Card key={dataset.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Database className="h-5 w-5 text-gray-500" />
                    <h3 className="text-lg font-semibold">{dataset.name}</h3>
                    <Badge className={getTypeColor(dataset.type)}>
                      {dataset.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <Badge className={getComplianceColor(dataset.compliance_status)}>
                      {dataset.compliance_status === 'approved' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {dataset.compliance_status === 'pending' && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {dataset.compliance_status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{dataset.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Size:</span>
                      <div className="font-medium">{formatSize(dataset.size)}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Format:</span>
                      <div className="font-medium">{dataset.format.toUpperCase()}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Fields:</span>
                      <div className="font-medium">{Object.keys(dataset.schema).length}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Created:</span>
                      <div className="font-medium">{new Date(dataset.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedDataset(dataset)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  
                  {dataset.compliance_status === 'approved' && (
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                      <Download className="h-4 w-4 mr-2" />
                      Use in ML
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dataset Preview Dialog */}
      {selectedDataset && (
        <Dialog open={!!selectedDataset} onOpenChange={() => setSelectedDataset(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedDataset.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Dataset Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Type:</strong> {selectedDataset.type}</div>
                    <div><strong>Size:</strong> {formatSize(selectedDataset.size)}</div>
                    <div><strong>Format:</strong> {selectedDataset.format}</div>
                    <div><strong>Compliance:</strong> {selectedDataset.compliance_status}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Data Schema</h4>
                  <div className="space-y-1 text-sm max-h-32 overflow-y-auto">
                    {Object.entries(selectedDataset.schema).map(([field, type]) => (
                      <div key={field} className="flex justify-between">
                        <span className="font-mono text-xs">{field}</span>
                        <Badge variant="outline" className="text-xs">{type}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-600">{selectedDataset.description}</p>
              </div>
              
              {selectedDataset.compliance_status === 'approved' && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    This dataset has been approved for ML model training and meets all privacy and ethical requirements.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {datasets.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Datasets Available</h3>
            <p className="text-gray-600 mb-4">
              Generate synthetic datasets or wait for approved de-identified data
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DatasetCurator;
