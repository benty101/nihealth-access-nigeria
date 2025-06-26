
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Dna, 
  Upload, 
  FileText, 
  AlertTriangle, 
  Shield, 
  Eye, 
  Download,
  Users,
  Microscope,
  Brain,
  Heart
} from 'lucide-react';
import { genomicsService, type GenomicReport, type GenomicAlert, type GenomicVariant } from '@/services/GenomicsService';
import GenomicReportUpload from './genomics/GenomicReportUpload';
import GenomicVariantList from './genomics/GenomicVariantList';
import GenomicAlertsPanel from './genomics/GenomicAlertsPanel';
import GenomicConsentManager from './genomics/GenomicConsentManager';

interface PatientGenomicsProps {
  patientId: string;
  userRole?: 'patient' | 'physician' | 'genetic_counselor' | 'lab_technician' | 'researcher';
}

const PatientGenomics = ({ patientId, userRole = 'patient' }: PatientGenomicsProps) => {
  const [reports, setReports] = useState<GenomicReport[]>([]);
  const [alerts, setAlerts] = useState<GenomicAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadGenomicData();
  }, [patientId, userRole]);

  const loadGenomicData = async () => {
    try {
      const [reportsData, alertsData] = await Promise.all([
        genomicsService.getGenomicReports(patientId, userRole),
        genomicsService.getGenomicAlerts(patientId)
      ]);
      
      setReports(reportsData);
      setAlerts(alertsData);
    } catch (error) {
      console.error('Error loading genomic data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReportUpload = async () => {
    await loadGenomicData();
  };

  const handleAlertAcknowledge = async (alertId: string) => {
    await genomicsService.acknowledgeAlert(alertId, patientId);
    await loadGenomicData();
  };

  const getTotalVariants = () => {
    return reports.reduce((total, report) => total + report.summary.total_variants, 0);
  };

  const getPathogenicVariants = () => {
    return reports.reduce((total, report) => total + report.summary.pathogenic_variants, 0);
  };

  const getActionableVariants = () => {
    return reports.reduce((total, report) => total + report.summary.actionable_variants, 0);
  };

  const getCriticalAlerts = () => {
    return alerts.filter(alert => alert.severity === 'critical' && !alert.acknowledged_at).length;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Dna className="h-6 w-6 text-purple-600" />
            Genomics Profile
          </h2>
          <p className="text-gray-600">Genetic testing results and variant analysis</p>
        </div>
        {(userRole === 'physician' || userRole === 'genetic_counselor' || userRole === 'lab_technician') && (
          <Button 
            onClick={() => setActiveTab('upload')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Report
          </Button>
        )}
      </div>

      {/* Critical Alerts Banner */}
      {getCriticalAlerts() > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>{getCriticalAlerts()} critical genomic alerts</strong> require immediate attention.
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setActiveTab('alerts')}
              className="ml-2 text-red-600 hover:text-red-700"
            >
              View Alerts
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold">{reports.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Dna className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Variants</p>
                <p className="text-2xl font-bold">{getTotalVariants().toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Pathogenic Variants</p>
                <p className="text-2xl font-bold">{getPathogenicVariants()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Actionable Variants</p>
                <p className="text-2xl font-bold">{getActionableVariants()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="variants">Variants</TabsTrigger>
          <TabsTrigger value="alerts">Alerts ({alerts.length})</TabsTrigger>
          <TabsTrigger value="consent">Privacy</TabsTrigger>
          {(userRole === 'physician' || userRole === 'genetic_counselor' || userRole === 'lab_technician') && (
            <TabsTrigger value="upload">Upload</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reports.length === 0 ? (
                  <div className="text-center py-8">
                    <Microscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No genomic reports available</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reports.slice(0, 3).map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{report.file_name}</p>
                          <p className="text-sm text-gray-600">
                            {report.test_type.replace('_', ' ').toUpperCase()} • {report.lab_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(report.upload_date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={report.summary.pathogenic_variants > 0 ? 'destructive' : 'secondary'}>
                            {report.summary.pathogenic_variants} pathogenic
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Active Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                {alerts.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <p className="text-gray-600">No active alerts</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {alerts.slice(0, 3).map((alert) => (
                      <div key={alert.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}
                              className="text-xs"
                            >
                              {alert.severity}
                            </Badge>
                            <span className="text-sm font-medium">{alert.title}</span>
                          </div>
                          {alert.requires_counseling && (
                            <Badge variant="outline" className="text-xs">
                              <Users className="h-3 w-3 mr-1" />
                              Counseling
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Genomic Reports</CardTitle>
            </CardHeader>
            <CardContent>
              {reports.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No genomic reports available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{report.file_name}</h3>
                          <p className="text-sm text-gray-600">
                            {report.test_type.replace('_', ' ').toUpperCase()} • {report.lab_name}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Total Variants:</span>
                          <span className="font-medium ml-2">{report.summary.total_variants.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Pathogenic:</span>
                          <span className="font-medium ml-2 text-red-600">{report.summary.pathogenic_variants}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Actionable:</span>
                          <span className="font-medium ml-2 text-blue-600">{report.summary.actionable_variants}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-xs text-gray-500">
                        Uploaded: {new Date(report.upload_date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variants" className="mt-6">
          <GenomicVariantList reports={reports} userRole={userRole} />
        </TabsContent>

        <TabsContent value="alerts" className="mt-6">
          <GenomicAlertsPanel 
            alerts={alerts} 
            onAcknowledge={handleAlertAcknowledge}
            userRole={userRole}
          />
        </TabsContent>

        <TabsContent value="consent" className="mt-6">
          <GenomicConsentManager 
            patientId={patientId}
            reports={reports}
            userRole={userRole}
          />
        </TabsContent>

        {(userRole === 'physician' || userRole === 'genetic_counselor' || userRole === 'lab_technician') && (
          <TabsContent value="upload" className="mt-6">
            <GenomicReportUpload 
              patientId={patientId}
              userRole={userRole}
              onUploadComplete={handleReportUpload}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default PatientGenomics;
