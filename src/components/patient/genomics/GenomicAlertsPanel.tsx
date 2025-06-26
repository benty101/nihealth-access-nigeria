
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Users, 
  Pill, 
  Shield,
  Eye,
  Bell
} from 'lucide-react';
import { type GenomicAlert, type UserGenomicsRole } from '@/services/GenomicsService';

interface GenomicAlertsPanelProps {
  alerts: GenomicAlert[];
  onAcknowledge: (alertId: string) => void;
  userRole: UserGenomicsRole['role'];
}

const GenomicAlertsPanel = ({ alerts, onAcknowledge, userRole }: GenomicAlertsPanelProps) => {
  const [acknowledging, setAcknowledging] = useState<string | null>(null);

  const handleAcknowledge = async (alertId: string) => {
    setAcknowledging(alertId);
    try {
      await onAcknowledge(alertId);
    } finally {
      setAcknowledging(null);
    }
  };

  const getSeverityColor = (severity: GenomicAlert['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: GenomicAlert['severity']) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'moderate': return <Bell className="h-4 w-4 text-yellow-600" />;
      case 'low': return <Bell className="h-4 w-4 text-blue-600" />;
      default: return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAlertTypeIcon = (type: GenomicAlert['alert_type']) => {
    switch (type) {
      case 'high_risk': return <AlertTriangle className="h-4 w-4" />;
      case 'drug_interaction': return <Pill className="h-4 w-4" />;
      case 'carrier_status': return <Users className="h-4 w-4" />;
      case 'family_history': return <Users className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const canManageAlerts = () => {
    return userRole === 'physician' || userRole === 'genetic_counselor';
  };

  const activeAlerts = alerts.filter(alert => !alert.acknowledged_at);
  const acknowledgedAlerts = alerts.filter(alert => alert.acknowledged_at);

  if (alerts.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Genomic Alerts</h3>
          <p className="text-gray-600">All genomic variants are within expected parameters</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Active Alerts ({activeAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeAlerts.map((alert) => (
                <div key={alert.id} className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getSeverityIcon(alert.severity)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{alert.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {alert.severity.toUpperCase()}
                          </Badge>
                          {getAlertTypeIcon(alert.alert_type)}
                        </div>
                        
                        <p className="text-sm mb-3">{alert.description}</p>

                        {alert.recommendations && alert.recommendations.length > 0 && (
                          <div className="mb-3">
                            <h4 className="text-sm font-medium mb-2">Recommendations:</h4>
                            <ul className="list-disc list-inside text-sm space-y-1">
                              {alert.recommendations.map((rec, index) => (
                                <li key={index}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {alert.requires_counseling && (
                          <div className="flex items-center gap-2 text-sm text-purple-700 bg-purple-50 p-2 rounded">
                            <Users className="h-4 w-4" />
                            <span>Genetic counseling recommended</span>
                          </div>
                        )}

                        <div className="text-xs text-gray-600 mt-2">
                          <Clock className="h-3 w-3 inline mr-1" />
                          Created: {new Date(alert.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {canManageAlerts() && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAcknowledge(alert.id)}
                          disabled={acknowledging === alert.id}
                        >
                          {acknowledging === alert.id ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
                              Acknowledging...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4" />
                              Acknowledge
                            </div>
                          )}
                        </Button>
                      )}
                      
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Acknowledged Alerts */}
      {acknowledgedAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Acknowledged Alerts ({acknowledgedAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {acknowledgedAlerts.map((alert) => (
                <div key={alert.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-gray-700">{alert.title}</h3>
                          <Badge variant="outline" className="text-xs bg-green-50">
                            ACKNOWLEDGED
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{alert.description}</p>

                        <div className="text-xs text-gray-500 space-y-1">
                          <div>
                            <Clock className="h-3 w-3 inline mr-1" />
                            Created: {new Date(alert.created_at).toLocaleString()}
                          </div>
                          {alert.acknowledged_at && (
                            <div>
                              <CheckCircle2 className="h-3 w-3 inline mr-1" />
                              Acknowledged: {new Date(alert.acknowledged_at).toLocaleString()}
                              {alert.acknowledged_by && ` by ${alert.acknowledged_by}`}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alert Management Guide */}
      {canManageAlerts() && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Alert Management Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium text-red-700 mb-2">Critical Alerts</h4>
                <p className="text-gray-600">
                  Require immediate attention. These typically involve pathogenic variants with high clinical impact.
                  Patient should be contacted within 24 hours.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-orange-700 mb-2">High Priority Alerts</h4>
                <p className="text-gray-600">
                  Likely pathogenic variants or significant drug interactions. 
                  Should be addressed within 1-2 weeks.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-yellow-700 mb-2">Moderate Alerts</h4>
                <p className="text-gray-600">
                  Variants of uncertain significance or moderate risk findings. 
                  Can be addressed during routine follow-up.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-purple-700 mb-2">Counseling Required</h4>
                <p className="text-gray-600">
                  Alerts marked with counseling requirements should be referred to a genetic counselor 
                  for proper patient education and family planning discussions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GenomicAlertsPanel;
