
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Share2, Download, Plus, Calendar, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MedicalRecord {
  id: string;
  title: string;
  record_type: string;
  date_created: string;
  healthcare_provider?: string;
  doctor_name?: string;
  file_size?: number;
  is_shared: boolean;
}

const HealthRecords = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadMedicalRecords();
    }
  }, [user]);

  const loadMedicalRecords = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('medical_records')
        .select('*')
        .eq('user_id', user.id)
        .order('date_created', { ascending: false });

      if (error) {
        console.error('Error loading medical records:', error);
        return;
      }

      setRecords(data || []);
    } catch (error) {
      console.error('Error loading medical records:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Records', count: records.length },
    { id: 'lab_result', name: 'Lab Results', count: records.filter(r => r.record_type === 'lab_result').length },
    { id: 'imaging', name: 'Imaging', count: records.filter(r => r.record_type === 'imaging').length },
    { id: 'prescription', name: 'Prescriptions', count: records.filter(r => r.record_type === 'prescription').length },
    { id: 'medical_report', name: 'Medical Reports', count: records.filter(r => r.record_type === 'medical_report').length },
  ];

  const filteredRecords = selectedCategory === 'all' 
    ? records 
    : records.filter(record => record.record_type === selectedCategory);

  const getFileIcon = (type: string) => {
    return <FileText className="h-5 w-5 text-blue-600" />;
  };

  const handleUpload = () => {
    toast({
      title: "Upload Feature",
      description: "Document upload feature will be available soon!",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Feature",
      description: "Document sharing feature will be available soon!",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Feature", 
      description: "Document download feature will be available soon!",
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="lg:col-span-3 h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

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
              <Button className="w-full justify-start" variant="outline" onClick={handleUpload}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share Records
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={handleDownload}>
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
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleUpload}>
              <Plus className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </div>

          {records.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="mb-6">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No Health Records Yet</h3>
                  <p className="text-gray-600 mb-4">
                    Start building your digital health record by uploading your medical documents
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
                  <div className="flex items-center text-blue-800 mb-2">
                    <Shield className="h-5 w-5 mr-2" />
                    <span className="font-medium">Secure & Private</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Your health records are encrypted and only accessible by you. Share them securely with healthcare providers when needed.
                  </p>
                </div>

                <div className="space-y-4 text-left">
                  <h4 className="font-medium text-gray-900">You can upload:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center text-gray-600">
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      Lab test results
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FileText className="h-4 w-4 mr-2 text-green-500" />
                      Prescription records
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FileText className="h-4 w-4 mr-2 text-purple-500" />
                      X-rays and scans
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FileText className="h-4 w-4 mr-2 text-orange-500" />
                      Doctor's reports
                    </div>
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700 mt-6" onClick={handleUpload}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Your First Document
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <Card key={record.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                          {getFileIcon(record.record_type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{record.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Badge variant="outline">{record.record_type}</Badge>
                            <span>•</span>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(record.date_created).toLocaleDateString()}
                            </div>
                            {record.healthcare_provider && (
                              <>
                                <span>•</span>
                                <span>{record.healthcare_provider}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {record.is_shared && (
                          <Badge className="bg-green-100 text-green-800">
                            <Shield className="h-3 w-3 mr-1" />
                            Shared
                          </Badge>
                        )}
                        <Button variant="outline" size="sm" onClick={handleDownload}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleShare}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;
