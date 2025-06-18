
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TestTube, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Download, 
  Eye,
  Calendar,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PatientLabResults = () => {
  const [labResults, setLabResults] = useState([
    {
      id: 1,
      testName: 'Complete Blood Count (CBC)',
      orderDate: '2024-12-10',
      resultDate: '2024-12-12',
      status: 'completed',
      lab: 'MedLab Diagnostics',
      doctor: 'Dr. Sarah Johnson',
      results: [
        { parameter: 'White Blood Cells', value: 7.2, unit: '10³/μL', referenceRange: '4.0-11.0', status: 'normal' },
        { parameter: 'Red Blood Cells', value: 4.8, unit: '10⁶/μL', referenceRange: '4.2-5.4', status: 'normal' },
        { parameter: 'Hemoglobin', value: 14.2, unit: 'g/dL', referenceRange: '12.0-16.0', status: 'normal' },
        { parameter: 'Platelets', value: 245, unit: '10³/μL', referenceRange: '150-450', status: 'normal' }
      ]
    },
    {
      id: 2,
      testName: 'Lipid Panel',
      orderDate: '2024-12-08',
      resultDate: '2024-12-10',
      status: 'completed',
      lab: 'Lagos Diagnostic Center',
      doctor: 'Dr. Michael Chen',
      results: [
        { parameter: 'Total Cholesterol', value: 195, unit: 'mg/dL', referenceRange: '<200', status: 'normal' },
        { parameter: 'LDL Cholesterol', value: 115, unit: 'mg/dL', referenceRange: '<100', status: 'high' },
        { parameter: 'HDL Cholesterol', value: 58, unit: 'mg/dL', referenceRange: '>40', status: 'normal' },
        { parameter: 'Triglycerides', value: 110, unit: 'mg/dL', referenceRange: '<150', status: 'normal' }
      ]
    },
    {
      id: 3,
      testName: 'Comprehensive Metabolic Panel',
      orderDate: '2024-12-05',
      resultDate: '2024-12-07',
      status: 'completed',
      lab: 'University Hospital Lab',
      doctor: 'Dr. Amina Hassan',
      results: [
        { parameter: 'Glucose', value: 92, unit: 'mg/dL', referenceRange: '70-100', status: 'normal' },
        { parameter: 'BUN', value: 18, unit: 'mg/dL', referenceRange: '7-20', status: 'normal' },
        { parameter: 'Creatinine', value: 0.9, unit: 'mg/dL', referenceRange: '0.7-1.3', status: 'normal' },
        { parameter: 'Sodium', value: 142, unit: 'mEq/L', referenceRange: '136-145', status: 'normal' }
      ]
    }
  ]);

  const [trendData, setTrendData] = useState([
    { date: '2024-10-01', glucose: 88, cholesterol: 200, hemoglobin: 13.8 },
    { date: '2024-11-01', glucose: 90, cholesterol: 198, hemoglobin: 14.0 },
    { date: '2024-12-01', glucose: 92, cholesterol: 195, hemoglobin: 14.2 }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'high': return 'bg-red-100 text-red-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'high': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'low': return <TrendingDown className="h-4 w-4 text-yellow-500" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTestStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const ResultCard = ({ result }: any) => (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{result.testName}</CardTitle>
            <p className="text-sm text-gray-600">
              Ordered: {result.orderDate} | Results: {result.resultDate}
            </p>
            <p className="text-sm text-gray-600">
              Lab: {result.lab} | Doctor: {result.doctor}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getTestStatusColor(result.status)}>
              {result.status}
            </Badge>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {result.results.map((param: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {getStatusIcon(param.status)}
                  <span className="font-medium">{param.parameter}</span>
                </div>
                <p className="text-sm text-gray-600">Reference: {param.referenceRange}</p>
              </div>
              <div className="text-right">
                <div className="font-semibold">{param.value} {param.unit}</div>
                <Badge className={getStatusColor(param.status)} size="sm">
                  {param.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Lab Results</h2>
          <p className="text-gray-600">View and track your laboratory test results</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          Book Lab Test
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TestTube className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Tests</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Normal Results</p>
                <p className="text-2xl font-bold">22</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Abnormal Results</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Last Test</p>
                <p className="text-lg font-bold">Dec 12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recent">Recent Results</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="all">All Results</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="mt-6">
          <div className="space-y-4">
            {labResults.slice(0, 3).map((result) => (
              <ResultCard key={result.id} result={result} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Health Parameter Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="glucose" stroke="#3b82f6" strokeWidth={2} name="Glucose (mg/dL)" />
                    <Line type="monotone" dataKey="cholesterol" stroke="#ef4444" strokeWidth={2} name="Cholesterol (mg/dL)" />
                    <Line type="monotone" dataKey="hemoglobin" stroke="#10b981" strokeWidth={2} name="Hemoglobin (g/dL)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Key Trends */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Glucose Trend</span>
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600">+4.5%</div>
                    <p className="text-xs text-gray-600">Slight increase over 3 months</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Cholesterol Trend</span>
                      <TrendingDown className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-green-600">-2.5%</div>
                    <p className="text-xs text-gray-600">Improving over 3 months</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Hemoglobin Trend</span>
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600">+2.9%</div>
                    <p className="text-xs text-gray-600">Steady improvement</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {labResults.map((result) => (
              <ResultCard key={result.id} result={result} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientLabResults;
