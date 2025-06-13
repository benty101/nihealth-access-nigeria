
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Share2, Download, Plus, Calendar, Shield } from 'lucide-react';

const HealthRecords = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const records = [
    {
      name: 'First Trimester Blood Test',
      type: 'Lab Result',
      date: '2024-05-15',
      category: 'pregnancy',
      size: '2.3 MB',
      shared: true,
      urgent: false
    },
    {
      name: '12-Week Ultrasound Scan',
      type: 'Imaging',
      date: '2024-05-20',
      category: 'pregnancy',
      size: '4.1 MB',
      shared: false,
      urgent: false
    },
    {
      name: 'Prenatal Vitamins Prescription',
      type: 'Prescription',
      date: '2024-05-10',
      category: 'medications',
      size: '0.8 MB',
      shared: true,
      urgent: false
    },
    {
      name: 'Antenatal Care Plan',
      type: 'Care Plan',
      date: '2024-05-01',
      category: 'pregnancy',
      size: '1.2 MB',
      shared: false,
      urgent: false
    },
    {
      name: 'Insurance Coverage Details',
      type: 'Insurance',
      date: '2024-04-28',
      category: 'insurance',
      size: '0.5 MB',
      shared: false,
      urgent: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Records', count: records.length },
    { id: 'pregnancy', name: 'Pregnancy', count: records.filter(r => r.category === 'pregnancy').length },
    { id: 'medications', name: 'Medications', count: records.filter(r => r.category === 'medications').length },
    { id: 'insurance', name: 'Insurance', count: records.filter(r => r.category === 'insurance').length },
  ];

  const filteredRecords = selectedCategory === 'all' 
    ? records 
    : records.filter(record => record.category === selectedCategory);

  const getFileIcon = (type: string) => {
    return <FileText className="h-5 w-5 text-blue-600" />;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          My Health Records Vault
        </h1>
        <p className="text-lg text-gray-600">
          Securely store, organize, and share your medical documents
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="secondary">{category.count}</Badge>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share Records
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download All
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Input
                placeholder="Search records..."
                className="w-64"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </div>

          <div className="space-y-4">
            {filteredRecords.map((record, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        {getFileIcon(record.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{record.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Badge variant="outline">{record.type}</Badge>
                          <span>•</span>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {record.date}
                          </div>
                          <span>•</span>
                          <span>{record.size}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {record.shared && (
                        <Badge className="bg-green-100 text-green-800">
                          <Shield className="h-3 w-3 mr-1" />
                          Shared
                        </Badge>
                      )}
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRecords.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
                <p className="text-gray-600 mb-4">Upload your first health document to get started</p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;
