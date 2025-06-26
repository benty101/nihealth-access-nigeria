
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { genomicsService, type GenomicReport, type UserGenomicsRole } from '@/services/GenomicsService';
import { useToast } from '@/hooks/use-toast';

interface GenomicReportUploadProps {
  patientId: string;
  userRole: UserGenomicsRole['role'];
  onUploadComplete: () => void;
}

const GenomicReportUpload = ({ patientId, userRole, onUploadComplete }: GenomicReportUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [testType, setTestType] = useState<GenomicReport['test_type']>('targeted_panel');
  const [labName, setLabName] = useState('');
  const [notes, setNotes] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'text/plain', 'application/octet-stream'];
      const isVCF = selectedFile.name.toLowerCase().endsWith('.vcf');
      const isPDF = selectedFile.name.toLowerCase().endsWith('.pdf');
      
      if (!isVCF && !isPDF) {
        setUploadError('Please select a VCF or PDF file');
        return;
      }
      
      // Check file size (max 50MB)
      if (selectedFile.size > 50 * 1024 * 1024) {
        setUploadError('File size must be less than 50MB');
        return;
      }
      
      setFile(selectedFile);
      setUploadError(null);
      setUploadSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadError('Please select a file to upload');
      return;
    }

    if (!labName.trim()) {
      setUploadError('Please enter the lab name');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      await genomicsService.uploadGenomicReport(file, {
        patient_id: patientId,
        test_type: testType,
        lab_name: labName,
        uploader_role: userRole
      });

      setUploadSuccess(true);
      toast({
        title: "Upload Successful",
        description: "Genomic report has been uploaded and analyzed successfully",
      });

      // Reset form
      setFile(null);
      setLabName('');
      setNotes('');
      
      // Notify parent component
      onUploadComplete();

      // Reset file input
      const fileInput = document.getElementById('genomic-file-input') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

    } catch (error: any) {
      setUploadError(error.message || 'Failed to upload genomic report');
      toast({
        title: "Upload Failed",
        description: error.message || 'Failed to upload genomic report',
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const getRoleSpecificInstructions = () => {
    switch (userRole) {
      case 'physician':
        return 'As a physician, you can upload genomic reports to integrate with patient care. The system will automatically analyze variants and generate clinical alerts.';
      case 'genetic_counselor':
        return 'As a genetic counselor, you can upload and interpret genomic reports. The system will flag variants requiring counseling and generate appropriate recommendations.';
      case 'lab_technician':
        return 'As a lab technician, you can upload raw genomic data and reports. Ensure proper quality control measures have been applied before upload.';
      default:
        return 'Upload genomic reports for analysis and integration into the patient\'s medical record.';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Genomic Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Role-specific instructions */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {getRoleSpecificInstructions()}
              </AlertDescription>
            </Alert>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="genomic-file-input">Genomic Report File</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="text-sm text-gray-600 mb-2">
                    Upload VCF files or PDF reports (max 50MB)
                  </div>
                  <Input
                    id="genomic-file-input"
                    type="file"
                    accept=".vcf,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('genomic-file-input')?.click()}
                  >
                    Choose File
                  </Button>
                  {file && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">{file.name}</span>
                      </div>
                      <div className="text-xs text-blue-700">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Test Type */}
            <div className="space-y-2">
              <Label htmlFor="test-type">Test Type</Label>
              <Select value={testType} onValueChange={(value) => setTestType(value as GenomicReport['test_type'])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select test type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whole_genome">Whole Genome Sequencing</SelectItem>
                  <SelectItem value="exome">Whole Exome Sequencing</SelectItem>
                  <SelectItem value="targeted_panel">Targeted Gene Panel</SelectItem>
                  <SelectItem value="pharmacogenomics">Pharmacogenomics</SelectItem>
                  <SelectItem value="carrier_screening">Carrier Screening</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Lab Name */}
            <div className="space-y-2">
              <Label htmlFor="lab-name">Laboratory Name</Label>
              <Input
                id="lab-name"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
                placeholder="Enter laboratory name"
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter any additional notes about the test or results"
                rows={3}
              />
            </div>

            {/* Error Display */}
            {uploadError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {uploadError}
                </AlertDescription>
              </Alert>
            )}

            {/* Success Display */}
            {uploadSuccess && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Genomic report uploaded successfully! The system is analyzing variants and will generate alerts as needed.
                </AlertDescription>
              </Alert>
            )}

            {/* Upload Button */}
            <Button
              onClick={handleUpload}
              disabled={!file || uploading || !labName.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {uploading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Uploading and Analyzing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Report
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* File Format Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Supported File Formats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">VCF Files (.vcf)</h4>
              <p className="text-sm text-gray-600">
                Variant Call Format files containing genetic variants. The system will automatically parse variants and assess clinical significance.
              </p>
            </div>
            <div>
              <h4 className="font-medium">PDF Reports (.pdf)</h4>
              <p className="text-sm text-gray-600">
                Clinical genomic reports in PDF format. These will be stored for reference and manual review.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenomicReportUpload;
