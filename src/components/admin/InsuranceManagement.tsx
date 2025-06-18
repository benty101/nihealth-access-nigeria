
import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InsuranceApiManagement from './InsuranceApiManagement';
import InsurancePlansTab from './insurance/InsurancePlansTab';

interface InsuranceManagementProps {
  onStatsChange?: () => Promise<void>;
}

const InsuranceManagement = ({ onStatsChange }: InsuranceManagementProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Insurance Management
            </CardTitle>
            <CardDescription>
              Manage insurance plans, providers, and API integrations
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="plans" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="plans">Insurance Plans</TabsTrigger>
            <TabsTrigger value="apis">API Management</TabsTrigger>
          </TabsList>

          <TabsContent value="plans">
            <InsurancePlansTab onStatsChange={onStatsChange} />
          </TabsContent>

          <TabsContent value="apis" className="mt-6">
            <InsuranceApiManagement />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InsuranceManagement;
