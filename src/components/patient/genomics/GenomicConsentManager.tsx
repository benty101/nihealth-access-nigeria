
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Users, 
  Database, 
  Eye, 
  Lock, 
  Share2,
  Info,
  AlertCircle
} from 'lucide-react';
import { type GenomicReport, type UserGenomicsRole } from '@/services/GenomicsService';

interface GenomicConsentManagerProps {
  patientId: string;
  reports: GenomicReport[];
  userRole: UserGenomicsRole['role'];
}

const GenomicConsentManager = ({ patientId, reports, userRole }: GenomicConsentManagerProps) => {
  const [consentSettings, setConsentSettings] = useState({
    clinical_use: true,
    research_participation: false,
    family_sharing: false,
    data_retention: true,
    anonymized_sharing: false,
    international_sharing: false
  });

  const [accessPermissions, setAccessPermissions] = useState({
    primary_physician: true,
    genetic_counselor: true,
    lab_technician: false,
    researcher: false,
    family_members: false
  });

  const [saving, setSaving] = useState(false);

  const handleConsentChange = (key: string, value: boolean) => {
    setConsentSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAccessChange = (key: string, value: boolean) => {
    setAccessPermissions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveConsentSettings = async () => {
    setSaving(true);
    try {
      // In real implementation, save to database
      console.log('Saving consent settings:', { consentSettings, accessPermissions });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error('Error saving consent settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const canManageConsent = () => {
    return userRole === 'patient' || userRole === 'physician' || userRole === 'genetic_counselor';
  };

  const getConsentSummary = () => {
    const activeConsents = Object.entries(consentSettings).filter(([_, value]) => value).length;
    const totalConsents = Object.keys(consentSettings).length;
    return `${activeConsents}/${totalConsents} consent categories enabled`;
  };

  return (
    <div className="space-y-6">
      {/* Consent Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Consent Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Your genomic data is highly sensitive. These settings control how your genetic information 
                can be used and shared. You can modify these settings at any time.
              </AlertDescription>
            </Alert>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Current Status</span>
              </div>
              <p className="text-sm text-blue-800">{getConsentSummary()}</p>
              <p className="text-sm text-blue-700 mt-1">
                {reports.length} genomic reports under these privacy settings
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Use Consent */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Use Consent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Clinical Use</Label>
                <p className="text-sm text-gray-600">
                  Allow use of your genomic data for your medical care and treatment decisions
                </p>
              </div>
              <Switch
                checked={consentSettings.clinical_use}
                onCheckedChange={(checked) => handleConsentChange('clinical_use', checked)}
                disabled={!canManageConsent()}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Research Participation</Label>
                <p className="text-sm text-gray-600">
                  Allow your anonymized genomic data to be used in medical research studies
                </p>
              </div>
              <Switch
                checked={consentSettings.research_participation}
                onCheckedChange={(checked) => handleConsentChange('research_participation', checked)}
                disabled={!canManageConsent()}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Family Sharing</Label>
                <p className="text-sm text-gray-600">
                  Allow sharing of relevant genetic information with family members upon request
                </p>
              </div>
              <Switch
                checked={consentSettings.family_sharing}
                onCheckedChange={(checked) => handleConsentChange('family_sharing', checked)}
                disabled={!canManageConsent()}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Data Retention</Label>
                <p className="text-sm text-gray-600">
                  Keep your genomic data for future medical use and potential reanalysis
                </p>
              </div>
              <Switch
                checked={consentSettings.data_retention}
                onCheckedChange={(checked) => handleConsentChange('data_retention', checked)}
                disabled={!canManageConsent()}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Anonymized Sharing</Label>
                <p className="text-sm text-gray-600">
                  Allow anonymized data sharing for population health studies and disease surveillance
                </p>
              </div>
              <Switch
                checked={consentSettings.anonymized_sharing}
                onCheckedChange={(checked) => handleConsentChange('anonymized_sharing', checked)}
                disabled={!canManageConsent()}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">International Sharing</Label>
                <p className="text-sm text-gray-600">
                  Allow sharing with international research consortiums and databases
                </p>
              </div>
              <Switch
                checked={consentSettings.international_sharing}
                onCheckedChange={(checked) => handleConsentChange('international_sharing', checked)}
                disabled={!canManageConsent()}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Access Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Access Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Primary Physician</Label>
                <p className="text-sm text-gray-600">
                  Your primary care physician and treating specialists
                </p>
              </div>
              <Switch
                checked={accessPermissions.primary_physician}
                onCheckedChange={(checked) => handleAccessChange('primary_physician', checked)}
                disabled={!canManageConsent()}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Genetic Counselor</Label>
                <p className="text-sm text-gray-600">
                  Certified genetic counselors for interpretation and family planning
                </p>
              </div>
              <Switch
                checked={accessPermissions.genetic_counselor}
                onCheckedChange={(checked) => handleAccessChange('genetic_counselor', checked)}
                disabled={!canManageConsent()}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Laboratory Technician</Label>
                <p className="text-sm text-gray-600">
                  Lab staff for technical review and quality control
                </p>
              </div>
              <Switch
                checked={accessPermissions.lab_technician}
                onCheckedChange={(checked) => handleAccessChange('lab_technician', checked)}
                disabled={!canManageConsent()}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Researcher</Label>
                <p className="text-sm text-gray-600">
                  Approved researchers for studies you've consented to participate in
                </p>
              </div>
              <Switch
                checked={accessPermissions.researcher}
                onCheckedChange={(checked) => handleAccessChange('researcher', checked)}
                disabled={!canManageConsent()}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Family Members</Label>
                <p className="text-sm text-gray-600">
                  Immediate family members (with proper authentication)
                </p>
              </div>
              <Switch
                checked={accessPermissions.family_members}
                onCheckedChange={(checked) => handleAccessChange('family_members', checked)}
                disabled={!canManageConsent()}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Security Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Data Security & Protection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Encryption</span>
                </div>
                <p className="text-sm text-gray-600">
                  All genomic data is encrypted both in transit and at rest using industry-standard protocols
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Access Logging</span>
                </div>
                <p className="text-sm text-gray-600">
                  All access to your genomic data is logged and monitored for security
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="font-medium">Role-Based Access</span>
                </div>
                <p className="text-sm text-gray-600">
                  Healthcare providers only see data relevant to their role and your care
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="h-4 w-4 text-orange-600" />
                  <span className="font-medium">Data Anonymization</span>
                </div>
                <p className="text-sm text-gray-600">
                  Research data is anonymized and cannot be traced back to you
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {canManageConsent() && (
        <div className="flex justify-end gap-4">
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Export Settings
          </Button>
          
          <Button 
            onClick={saveConsentSettings}
            disabled={saving}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {saving ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Save Consent Settings
              </div>
            )}
          </Button>
        </div>
      )}

      {/* Legal Notice */}
      <Card>
        <CardContent className="pt-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Legal Notice:</strong> These consent settings govern how your genetic information is used. 
              You may withdraw consent at any time, but data already used in approved research cannot be recalled. 
              For questions about your rights, contact our privacy office or genetic counseling team.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenomicConsentManager;
