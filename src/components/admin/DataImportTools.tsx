
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, Download, Globe } from 'lucide-react';
import HealthPlusImporter from './HealthPlusImporter';

const DataImportTools = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Data Import Tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="healthplus" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="healthplus" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Health Plus
            </TabsTrigger>
            <TabsTrigger value="bulk" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Bulk Import
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              API Import
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="healthplus" className="mt-6">
            <HealthPlusImporter />
          </TabsContent>
          
          <TabsContent value="bulk" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-gray-500">
                  <Download className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">Bulk CSV/Excel Import</h3>
                  <p>Upload CSV or Excel files to import medications in bulk</p>
                  <p className="text-sm mt-2">Coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-gray-500">
                  <Database className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">API Integration</h3>
                  <p>Connect to external pharmacy APIs for real-time data sync</p>
                  <p className="text-sm mt-2">Coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DataImportTools;
