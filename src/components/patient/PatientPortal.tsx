import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  FileText, 
  Calendar, 
  Pill, 
  TestTube, 
  Heart, 
  Phone,
  Video,
  MessageCircle,
  Bell,
  Activity
} from 'lucide-react';
import PatientHealthOverview from './PatientHealthOverview';
import PatientConsultations from './PatientConsultations';
import PatientRecordsView from './PatientRecordsView';
import PatientMedications from './PatientMedications';
import PatientLabResults from './PatientLabResults';
import PatientCommunication from './PatientCommunication';
import MedicalChat from './MedicalChat';
import PatientGenomics from './PatientGenomics';

const PatientPortal = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Health Dashboard</h1>
              <p className="text-gray-600 mt-1">Complete view of your health journey</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Emergency
              </Button>
              <Button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700">
                <Video className="h-4 w-4" />
                Book Consultation
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Heart className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Health Score</p>
                  <p className="text-2xl font-bold">85/100</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Next Appointment</p>
                  <p className="text-lg font-semibold">Dec 25</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Pill className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">Active Medications</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TestTube className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Pending Results</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="consultations" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Consultations
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Records
            </TabsTrigger>
            <TabsTrigger value="genomics" className="flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              Genomics
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              Medications
            </TabsTrigger>
            <TabsTrigger value="lab-results" className="flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              Lab Results
            </TabsTrigger>
            <TabsTrigger value="ai-chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              AI Chat
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <PatientHealthOverview />
          </TabsContent>

          <TabsContent value="consultations" className="mt-6">
            <PatientConsultations />
          </TabsContent>

          <TabsContent value="records" className="mt-6">
            <PatientRecordsView />
          </TabsContent>

          <TabsContent value="genomics" className="mt-6">
            <PatientGenomics patientId={user?.id || 'demo-patient'} userRole="patient" />
          </TabsContent>

          <TabsContent value="medications" className="mt-6">
            <PatientMedications />
          </TabsContent>

          <TabsContent value="lab-results" className="mt-6">
            <PatientLabResults />
          </TabsContent>

          <TabsContent value="ai-chat" className="mt-6">
            <MedicalChat />
          </TabsContent>

          <TabsContent value="communication" className="mt-6">
            <PatientCommunication />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientPortal;
