
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Clock, 
  User, 
  Thermometer, 
  CheckCircle2,
  AlertTriangle,
  Package,
  Microscope,
  FileText
} from 'lucide-react';
import { molecularDiagnosticsService, type SampleTracking } from '@/services/MolecularDiagnosticsService';

interface SampleTrackerProps {
  sampleId: string;
  orderId: string;
}

const SampleTracker = ({ sampleId, orderId }: SampleTrackerProps) => {
  const [tracking, setTracking] = useState<SampleTracking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrackingInfo();
    // Set up polling for real-time updates
    const interval = setInterval(loadTrackingInfo, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [sampleId]);

  const loadTrackingInfo = async () => {
    try {
      const trackingData = await molecularDiagnosticsService.trackSample(sampleId);
      setTracking(trackingData);
    } catch (error) {
      console.error('Error loading sample tracking:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'collected': return 'bg-blue-100 text-blue-800';
      case 'in_transit': return 'bg-yellow-100 text-yellow-800';
      case 'received': return 'bg-purple-100 text-purple-800';
      case 'processing': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'collected': return <Package className="h-4 w-4" />;
      case 'in_transit': return <MapPin className="h-4 w-4" />;
      case 'received': return <CheckCircle2 className="h-4 w-4" />;
      case 'processing': return <Microscope className="h-4 w-4" />;
      case 'completed': return <FileText className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'collected': return 20;
      case 'in_transit': return 40;
      case 'received': return 60;
      case 'processing': return 80;
      case 'completed': return 100;
      default: return 0;
    }
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

  if (!tracking) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-600">Sample tracking information not available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sample Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Sample Tracking
            </div>
            <Badge className={getStatusColor(tracking.status)}>
              {getStatusIcon(tracking.status)}
              <span className="ml-1 capitalize">{tracking.status.replace('_', ' ')}</span>
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Sample ID:</span>
                <div className="font-mono font-medium">{tracking.sample_id}</div>
              </div>
              <div>
                <span className="text-gray-600">Lab Partner:</span>
                <div className="font-medium">{tracking.lab_partner_id}</div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{getProgressPercentage(tracking.status)}%</span>
              </div>
              <Progress value={getProgressPercentage(tracking.status)} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chain of Custody */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Chain of Custody
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tracking.chain_of_custody.map((entry, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{entry.action}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(entry.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Handler: {entry.handler} • Location: {entry.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Temperature Monitoring */}
      {tracking.temperature_log && tracking.temperature_log.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Temperature Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tracking.temperature_log.slice(-5).map((log, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-blue-500" />
                    <span>{log.temperature}°C</span>
                    {log.humidity && <span>• {log.humidity}% humidity</span>}
                  </div>
                  <div className="text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Collection Location */}
      {tracking.collection_location && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Collection Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="text-gray-600">Date:</span>
                <div className="font-medium">
                  {new Date(tracking.collection_date).toLocaleDateString()}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Location:</span>
                <div className="font-medium">{tracking.collection_location.address}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" onClick={loadTrackingInfo}>
          <Clock className="h-4 w-4 mr-2" />
          Refresh Status
        </Button>
        {tracking.status === 'completed' && (
          <Button className="bg-purple-600 hover:bg-purple-700">
            <FileText className="h-4 w-4 mr-2" />
            View Results
          </Button>
        )}
      </div>
    </div>
  );
};

export default SampleTracker;
