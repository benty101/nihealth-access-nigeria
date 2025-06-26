
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BookOpen, 
  Play, 
  Clock, 
  Users,
  Zap,
  Target,
  Beaker,
  Activity,
  Info,
  CheckCircle2,
  Star
} from 'lucide-react';
import { mlAnalyticsService, type MLTemplate, type Dataset } from '@/services/MLAnalyticsService';
import { useToast } from '@/hooks/use-toast';

interface MLTemplateLibraryProps {
  templates: MLTemplate[];
  datasets: Dataset[];
}

const MLTemplateLibrary = ({ templates, datasets }: MLTemplateLibraryProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<MLTemplate | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const getCategoryIcon = (category: MLTemplate['category']) => {
    switch (category) {
      case 'outbreak_prediction': return <Activity className="h-5 w-5 text-red-500" />;
      case 'drug_repurposing': return <Beaker className="h-5 w-5 text-blue-500" />;
      case 'biomarker_discovery': return <Target className="h-5 w-5 text-green-500" />;
      case 'clinical_trial': return <Users className="h-5 w-5 text-purple-500" />;
      default: return <BookOpen className="h-5 w-5 text-gray-500" />;
    }
  };

  const getDifficultyColor = (difficulty: MLTemplate['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryName = (category: MLTemplate['category']) => {
    switch (category) {
      case 'outbreak_prediction': return 'Outbreak Prediction';
      case 'drug_repurposing': return 'Drug Repurposing';
      case 'biomarker_discovery': return 'Biomarker Discovery';
      case 'clinical_trial': return 'Clinical Trial Analysis';
      default: return category;
    }
  };

  const handleLoadTemplate = async (template: MLTemplate) => {
    setLoading(template.id);
    try {
      await mlAnalyticsService.loadTemplate(template.id);
      toast({
        title: "Template Loaded",
        description: `${template.name} has been loaded in your Jupyter environment`,
      });
      // In a real implementation, this would open the Jupyter interface
      window.open(`/jupyter${template.notebook_url}`, '_blank');
    } catch (error) {
      toast({
        title: "Load Failed",
        description: "Failed to load ML template",
        variant: "destructive"
      });
    } finally {
      setLoading(null);
    }
  };

  const checkDatasetAvailability = (requiredDatasets: string[]) => {
    const availableDatasets = datasets.filter(d => d.compliance_status === 'approved').map(d => d.id);
    return requiredDatasets.every(req => availableDatasets.includes(req));
  };

  const groupedTemplates = templates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, MLTemplate[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">ML Template Library</h2>
        <p className="text-gray-600">Pre-built machine learning templates for healthcare analytics</p>
      </div>

      {/* Template Categories */}
      <div className="space-y-8">
        {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
          <div key={category}>
            <div className="flex items-center gap-3 mb-4">
              {getCategoryIcon(category as MLTemplate['category'])}
              <h3 className="text-xl font-semibold">{getCategoryName(category as MLTemplate['category'])}</h3>
              <Badge variant="outline">{categoryTemplates.length} templates</Badge>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categoryTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight">{template.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getDifficultyColor(template.difficulty)}>
                            {template.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="h-3 w-3" />
                            {template.estimated_time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">4.8</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-3">{template.description}</p>
                    
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Required Datasets
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {template.datasets_required.map((datasetId) => {
                          const dataset = datasets.find(d => d.id === datasetId);
                          const isAvailable = dataset?.compliance_status === 'approved';
                          return (
                            <Badge 
                              key={datasetId} 
                              variant="outline" 
                              className={`text-xs ${isAvailable ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
                            >
                              {isAvailable && <CheckCircle2 className="h-2 w-2 mr-1" />}
                              {dataset?.name || datasetId}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedTemplate(template)}
                        className="flex-1"
                      >
                        <Info className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                      
                      <Button 
                        size="sm"
                        onClick={() => handleLoadTemplate(template)}
                        disabled={!checkDatasetAvailability(template.datasets_required) || loading === template.id}
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                      >
                        {loading === template.id ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
                            Loading...
                          </div>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Launch
                          </>
                        )}
                      </Button>
                    </div>

                    {!checkDatasetAvailability(template.datasets_required) && (
                      <Alert className="border-orange-200 bg-orange-50">
                        <AlertDescription className="text-orange-800 text-xs">
                          Some required datasets are not available. Please check dataset compliance status.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Template Details Dialog */}
      {selectedTemplate && (
        <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                {getCategoryIcon(selectedTemplate.category)}
                {selectedTemplate.name}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Badge className={getDifficultyColor(selectedTemplate.difficulty)}>
                  {selectedTemplate.difficulty.toUpperCase()}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  Estimated time: {selectedTemplate.estimated_time}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  {getCategoryName(selectedTemplate.category)}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-gray-600">{selectedTemplate.description}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Documentation</h4>
                <p className="text-gray-600">{selectedTemplate.documentation}</p>
              </div>

              <div>
                <h4 className="font-medium mb-3">Required Datasets</h4>
                <div className="space-y-2">
                  {selectedTemplate.datasets_required.map((datasetId) => {
                    const dataset = datasets.find(d => d.id === datasetId);
                    const isAvailable = dataset?.compliance_status === 'approved';
                    
                    return (
                      <div key={datasetId} className={`p-3 rounded-lg border ${isAvailable ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{dataset?.name || datasetId}</div>
                            <div className="text-sm text-gray-600">{dataset?.description}</div>
                          </div>
                          <Badge className={isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {isAvailable ? 'Available' : 'Not Available'}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                  Close
                </Button>
                <Button 
                  onClick={() => handleLoadTemplate(selectedTemplate)}
                  disabled={!checkDatasetAvailability(selectedTemplate.datasets_required)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Launch Template
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {templates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No ML Templates Available</h3>
            <p className="text-gray-600">
              ML templates will be available once the system is fully configured
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MLTemplateLibrary;
