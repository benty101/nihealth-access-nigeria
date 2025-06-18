
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  Share2, 
  Calendar,
  User,
  Building2,
  Filter
} from 'lucide-react';

const PatientRecordsView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [records, setRecords] = useState([
    {
      id: 1,
      title: 'Annual Physical Examination',
      type: 'medical_report',
      date: '2024-12-15',
      doctor: 'Dr. Sarah Johnson',
      hospital: 'Lagos University Teaching Hospital',
      category: 'General',
      status: 'final',
      summary: 'Complete physical examination with normal findings'
    },
    {
      id: 2,
      title: 'Blood Test Results',
      type: 'lab_result',
      date: '2024-12-10',
      doctor: 'Dr. Michael Chen',
      hospital: 'National Hospital Abuja',
      category: 'Laboratory',
      status: 'final',
      summary: 'Comprehensive metabolic panel - all values within normal range'
    },
    {
      id: 3,
      title: 'Chest X-Ray',
      type: 'imaging',
      date: '2024-12-08',
      doctor: 'Dr. Amina Hassan',
      hospital: 'University College Hospital',
      category: 'Radiology',
      status: 'final',
      summary: 'Clear chest X-ray with no abnormalities detected'
    },
    {
      id: 4,
      title: 'Prescription - Medication Refill',
      type: 'prescription',
      date: '2024-12-05',
      doctor: 'Dr. Sarah Johnson',
      hospital: 'Lagos University Teaching Hospital',
      category: 'Medication',
      status: 'active',
      summary: 'Hypertension medication refill for 3 months'
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lab_result': return '🧪';
      case 'imaging': return '📷';
      case 'prescription': return '💊';
      case 'medical_report': return '📋';
      default: return '📄';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'final': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRecords = records.filter(record =>
    record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const RecordCard = ({ record }: any) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="text-3xl">{getTypeIcon(record.type)}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{record.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{record.summary}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {record.date}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {record.doctor}
                </div>
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {record.hospital}
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{record.category}</Badge>
                <Badge className={getStatusColor(record.status)}>
                  {record.status}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Medical Records</h2>
          <p className="text-gray-600">Access and manage your complete medical history</p>
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search medical records..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Record Categories Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">📋</div>
              <div>
                <p className="text-sm text-gray-600">Medical Reports</p>
                <p className="text-xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🧪</div>
              <div>
                <p className="text-sm text-gray-600">Lab Results</p>
                <p className="text-xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">📷</div>
              <div>
                <p className="text-sm text-gray-600">Imaging</p>
                <p className="text-xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">💊</div>
              <div>
                <p className="text-sm text-gray-600">Prescriptions</p>
                <p className="text-xl font-bold">15</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Records Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Records</TabsTrigger>
          <TabsTrigger value="medical_report">Reports</TabsTrigger>
          <TabsTrigger value="lab_result">Lab Results</TabsTrigger>
          <TabsTrigger value="imaging">Imaging</TabsTrigger>
          <TabsTrigger value="prescription">Prescriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <RecordCard key={record.id} record={record} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="medical_report" className="mt-6">
          <div className="space-y-4">
            {filteredRecords.filter(r => r.type === 'medical_report').map((record) => (
              <RecordCard key={record.id} record={record} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lab_result" className="mt-6">
          <div className="space-y-4">
            {filteredRecords.filter(r => r.type === 'lab_result').map((record) => (
              <RecordCard key={record.id} record={record} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="imaging" className="mt-6">
          <div className="space-y-4">
            {filteredRecords.filter(r => r.type === 'imaging').map((record) => (
              <RecordCard key={record.id} record={record} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="prescription" className="mt-6">
          <div className="space-y-4">
            {filteredRecords.filter(r => r.type === 'prescription').map((record) => (
              <RecordCard key={record.id} record={record} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientRecordsView;
