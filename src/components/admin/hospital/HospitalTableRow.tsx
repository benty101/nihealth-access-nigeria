
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Hospital } from '@/services/AdminService';

interface HospitalTableRowProps {
  hospital: Hospital;
  onEdit: (hospital: Hospital) => void;
  onDelete: (hospital: Hospital) => void;
  onView: (hospital: Hospital) => void;
}

const HospitalTableRow = ({ hospital, onEdit, onDelete, onView }: HospitalTableRowProps) => {
  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell className="font-medium">{hospital.name}</TableCell>
      <TableCell>{hospital.license_number || 'N/A'}</TableCell>
      <TableCell>{hospital.state || 'N/A'}</TableCell>
      <TableCell>{hospital.lga || 'N/A'}</TableCell>
      <TableCell>{hospital.phone || 'N/A'}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1 max-w-40">
          {hospital.specialties?.slice(0, 2).map((specialty, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {specialty}
            </Badge>
          ))}
          {hospital.specialties && hospital.specialties.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{hospital.specialties.length - 2}
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Badge 
          className={hospital.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
        >
          {hospital.is_active ? 'Active' : 'Inactive'}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(hospital)}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(hospital)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(hospital)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default HospitalTableRow;
