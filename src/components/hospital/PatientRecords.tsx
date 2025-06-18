
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Plus } from 'lucide-react';
import { hospitalManagementService, type PatientRecord } from '@/services/HospitalManagementService';
import { useToast } from '@/hooks/use-toast';

interface PatientRecordsProps {
  hospitalId: string;
  onStatsUpdate: () => void;
}

const PatientRecords = ({ hospitalId, onStatsUpdate }: PatientRecordsProps) => {
  const [records, setRecords] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (hospitalId) {
      loadRecords();
    }
  }, [hospitalId]);

  const loadRecords = async () => {
    try {
      const data = await hospitalManagementService.getPatientRecords(hospitalId);
      setRecords(data);
    } catch (error) {
      console.error('Error loading patient records:', error);
      toast({
        title: "Error",
        description: "Failed to load patient records",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = records.filter(record =>
    record.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.record_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Patient Records ({records.length})
            </CardTitle>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Record
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredRecords.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No records found</h3>
                <p className="text-gray-600">Start by adding patient records</p>
              </div>
            ) : (
              filteredRecords.map((record) => (
                <Card key={record.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {record.profiles?.full_name || 'Unknown Patient'}
                      </h3>
                      <p className="text-sm text-gray-600">Record: {record.record_number}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{record.status}</Badge>
                        {record.diagnosis && (
                          <Badge variant="outline">{record.diagnosis}</Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientRecords;
