
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Download, RefreshCw, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface ImportStatus {
  status: 'idle' | 'scraping' | 'processing' | 'completed' | 'error';
  jobId?: string;
  progress: number;
  completed: number;
  total: number;
  message: string;
}

const HealthPlusImporter = () => {
  const { toast } = useToast();
  const [importStatus, setImportStatus] = useState<ImportStatus>({
    status: 'idle',
    progress: 0,
    completed: 0,
    total: 0,
    message: 'Ready to import Health Plus medications'
  });

  const startImport = async () => {
    try {
      setImportStatus(prev => ({
        ...prev,
        status: 'scraping',
        message: 'Starting to scrape Health Plus website...'
      }));

      const { data, error } = await supabase.functions.invoke('scrape-healthplus', {
        body: { action: 'scrape' }
      });

      if (error) throw error;

      if (data.success && data.jobId) {
        setImportStatus(prev => ({
          ...prev,
          jobId: data.jobId,
          message: 'Scraping in progress...'
        }));

        // Start polling for status
        pollImportStatus(data.jobId);

        toast({
          title: "Import Started",
          description: "Scraping Health Plus website for medications...",
        });
      } else {
        throw new Error(data.error || 'Failed to start import');
      }
    } catch (error) {
      console.error('Error starting import:', error);
      setImportStatus(prev => ({
        ...prev,
        status: 'error',
        message: `Error: ${error.message}`
      }));

      toast({
        title: "Import Failed",
        description: "Failed to start the import process",
        variant: "destructive",
      });
    }
  };

  const pollImportStatus = async (jobId: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const { data, error } = await supabase.functions.invoke('scrape-healthplus', {
          body: { action: 'status', jobId }
        });

        if (error) throw error;

        const progress = data.total > 0 ? (data.completed / data.total) * 100 : 0;

        setImportStatus(prev => ({
          ...prev,
          progress,
          completed: data.completed || 0,
          total: data.total || 0,
          message: `Processing: ${data.completed || 0}/${data.total || 0} pages`
        }));

        if (data.status === 'completed') {
          clearInterval(pollInterval);
          setImportStatus(prev => ({
            ...prev,
            status: 'completed',
            progress: 100,
            message: `Successfully imported medications from Health Plus!`
          }));

          toast({
            title: "Import Completed",
            description: `Successfully imported ${data.completed} medication listings`,
          });
        } else if (data.status === 'failed') {
          clearInterval(pollInterval);
          setImportStatus(prev => ({
            ...prev,
            status: 'error',
            message: 'Import failed. Please try again.'
          }));
        }
      } catch (error) {
        console.error('Error polling status:', error);
        clearInterval(pollInterval);
        setImportStatus(prev => ({
          ...prev,
          status: 'error',
          message: `Error: ${error.message}`
        }));
      }
    }, 5000); // Poll every 5 seconds

    // Stop polling after 10 minutes
    setTimeout(() => {
      clearInterval(pollInterval);
    }, 600000);
  };

  const getStatusIcon = () => {
    switch (importStatus.status) {
      case 'scraping':
      case 'processing':
        return <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Download className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (importStatus.status) {
      case 'scraping':
        return <Badge className="bg-blue-100 text-blue-800">Scraping</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Ready</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon()}
              Health Plus Importer
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Import 2194+ medication listings from Health Plus Nigeria
            </p>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Import Details</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Source: healthplusnigeria.com</li>
            <li>• Expected items: 2194+ medications</li>
            <li>• Data: Names, prices, categories, descriptions</li>
            <li>• Duration: 5-15 minutes depending on server response</li>
          </ul>
        </div>

        {importStatus.progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{importStatus.completed}/{importStatus.total}</span>
            </div>
            <Progress value={importStatus.progress} className="h-2" />
          </div>
        )}

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-700">{importStatus.message}</p>
        </div>

        <Button
          onClick={startImport}
          disabled={importStatus.status === 'scraping' || importStatus.status === 'processing'}
          className="w-full bg-teal-600 hover:bg-teal-700"
        >
          {importStatus.status === 'scraping' || importStatus.status === 'processing' ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Importing...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Start Import
            </>
          )}
        </Button>

        {importStatus.status === 'completed' && (
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm text-green-700">
              ✅ Import completed successfully! Check the Medication Management section to view imported items.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthPlusImporter;
