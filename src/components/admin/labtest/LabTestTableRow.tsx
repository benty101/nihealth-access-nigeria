
import React from 'react';
import { Edit, Trash2, Clock } from 'lucide-react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { LabTest } from '@/services/LabTestService';

interface LabTestTableRowProps {
  labTest: LabTest;
  onEdit: (labTest: LabTest) => void;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
}

const LabTestTableRow = ({ labTest, onEdit, onToggleStatus }: LabTestTableRowProps) => {
  return (
    <TableRow key={labTest.id}>
      <TableCell className="font-medium">
        <div>
          <p className="font-semibold">{labTest.name}</p>
          <p className="text-sm text-gray-500">{labTest.description}</p>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline">{labTest.category}</Badge>
      </TableCell>
      <TableCell>₦{labTest.price.toLocaleString()}</TableCell>
      <TableCell>
        <code className="bg-gray-100 px-2 py-1 rounded text-xs">
          {labTest.test_code || 'N/A'}
        </code>
      </TableCell>
      <TableCell>{labTest.sample_type || 'N/A'}</TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-gray-400" />
          <span className="text-sm">{labTest.turnaround_time || 'N/A'}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={labTest.is_fasting_required ? 'destructive' : 'secondary'}>
          {labTest.is_fasting_required ? 'Required' : 'Not Required'}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge className={labTest.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
          {labTest.is_active ? 'Active' : 'Inactive'}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(labTest)}>
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            variant={labTest.is_active ? "destructive" : "default"}
            size="sm"
            onClick={() => onToggleStatus(labTest.id, labTest.is_active)}
          >
            {labTest.is_active ? (
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

export default LabTestTableRow;
