
import React, { useState, useEffect } from 'react';
import { Building2, Plus, Search, Download, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { adminService, type Hospital } from '@/services/AdminService';
import { useToast } from '@/hooks/use-toast';
import HospitalForm from './forms/HospitalForm';
import HospitalTableRow from './hospital/HospitalTableRow';
import HospitalDetailModal from './hospital/HospitalDetailModal';

interface HospitalManagementProps {
  onStatsChange?: () => Promise<void>;
}

const HospitalManagement = ({ onStatsChange }: HospitalManagementProps) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);
  const [deletingHospital, setDeletingHospital] = useState<Hospital | null>(null);
  const [viewingHospital, setViewingHospital] = useState<Hospital | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadHospitals();
  }, []);

  useEffect(() => {
    const filtered = hospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (hospital.state || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (hospital.lga || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (hospital.license_number || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHospitals(filtered);
  }, [hospitals, searchTerm]);

  const loadHospitals = async () => {
    try {
      setLoading(true);
      const hospitalsData = await adminService.getAllHospitals();
      setHospitals(hospitalsData);
      setFilteredHospitals(hospitalsData);
    } catch (error) {
      console.error('Error loading hospitals:', error);
      toast({
        title: "Error",
        description: "Failed to load hospitals",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateHospital = async (hospitalData: Omit<Hospital, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setFormLoading(true);
      await adminService.createHospital(hospitalData);
      await loadHospitals();
      
      if (onStatsChange) {
        await onStatsChange();
      }
      
      setShowForm(false);
      setEditingHospital(null);
      
      toast({
        title: "Success",
        description: "Hospital created successfully"
      });
    } catch (error) {
      console.error('Error creating hospital:', error);
      toast({
        title: "Error",
        description: "Failed to create hospital",
        variant: "destructive"
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateHospital = async (hospitalData: Omit<Hospital, 'id' | 'created_at' | 'updated_at'>) => {
    if (!editingHospital) return;
    
    try {
      setFormLoading(true);
      await adminService.updateHospital(editingHospital.id, hospitalData);
      await loadHospitals();
      
      if (onStatsChange) {
        await onStatsChange();
      }
      
      setShowForm(false);
      setEditingHospital(null);
      
      toast({
        title: "Success",
        description: "Hospital updated successfully"
      });
    } catch (error) {
      console.error('Error updating hospital:', error);
      toast({
        title: "Error",
        description: "Failed to update hospital",
        variant: "destructive"
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteHospital = async () => {
    if (!deletingHospital) return;
    
    try {
      await adminService.deleteHospital(deletingHospital.id);
      await loadHospitals();
      
      if (onStatsChange) {
        await onStatsChange();
      }
      
      setDeletingHospital(null);
      
      toast({
        title: "Success",
        description: "Hospital deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting hospital:', error);
      toast({
        title: "Error",
        description: "Failed to delete hospital",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (hospital: Hospital) => {
    setEditingHospital(hospital);
    setShowForm(true);
  };

  const handleView = (hospital: Hospital) => {
    setViewingHospital(hospital);
  };

  const handleAddNew = () => {
    setEditingHospital(null);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingHospital(null);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading hospitals...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showForm) {
    return (
      <HospitalForm
        hospital={editingHospital}
        onSubmit={editingHospital ? handleUpdateHospital : handleCreateHospital}
        onCancel={handleCancelForm}
        loading={formLoading}
      />
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Hospital Management
              </CardTitle>
              <CardDescription>
                Manage hospital listings and medical services across the platform
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button onClick={handleAddNew} className="bg-teal-600 hover:bg-teal-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Hospital
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Stats */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search hospitals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredHospitals.length} of {hospitals.length} hospitals
            </div>
          </div>

          {/* Hospitals Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>License</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>LGA</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Specialties</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHospitals.map((hospital) => (
                  <HospitalTableRow
                    key={hospital.id}
                    hospital={hospital}
                    onEdit={handleEdit}
                    onDelete={setDeletingHospital}
                    onView={handleView}
                  />
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredHospitals.length === 0 && (
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No hospitals found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingHospital} onOpenChange={() => setDeletingHospital(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Hospital</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingHospital?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteHospital} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Hospital Detail Modal */}
      <HospitalDetailModal
        hospital={viewingHospital}
        open={!!viewingHospital}
        onClose={() => setViewingHospital(null)}
      />
    </>
  );
};

export default HospitalManagement;
