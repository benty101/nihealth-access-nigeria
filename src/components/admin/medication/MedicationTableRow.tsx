
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Medication } from '@/services/AdminService';

interface MedicationTableRowProps {
  medication: Medication;
  onEdit: (medication: Medication) => void;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
}

const MedicationTableRow = ({ medication, onEdit, onToggleStatus }: MedicationTableRowProps) => {
  return (
    <TableRow key={medication.id}>
      <TableCell className="font-medium">
        <div>
          <p className="font-semibold">{medication.name}</p>
          <p className="text-sm text-gray-500">{medication.dosage}</p>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline">{medication.category}</Badge>
      </TableCell>
      <TableCell>₦{medication.price.toLocaleString()}</TableCell>
      <TableCell>{medication.brand || 'N/A'}</TableCell>
      <TableCell>
        <Badge className={medication.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
          {medication.in_stock ? 'In Stock' : 'Out of Stock'}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={medication.prescription_required ? 'destructive' : 'secondary'}>
          {medication.prescription_required ? 'Required' : 'OTC'}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge className={medication.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
          {medication.is_active ? 'Active' : 'Inactive'}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(medication)}>
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            variant={medication.is_active ? "destructive" : "default"}
            size="sm"
            onClick={() => onToggleStatus(medication.id, medication.is_active)}
          >
            {medication.is_active ? (
              <>
                <Trash2 className="h-3 w-3 mr-1" />
                Deactivate
              </>
            ) : (
              'Activate'
            )}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default MedicationTableRow;
