
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Lab } from '@/services/AdminService';

interface LabCardProps {
  lab: Lab;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
  // onEdit: (lab: Lab) => void; // Add if edit functionality is needed
}

const LabCard = ({ lab, onToggleStatus }: LabCardProps) => {
  return (
    <Card key={lab.id} className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{lab.name}</CardTitle>
            <p className="text-sm text-gray-600">{lab.address}</p>
            <p className="text-xs text-gray-500">{lab.state}, {lab.lga}</p>
          </div>
          <Badge className={lab.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
            {lab.is_active ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">License:</span>
            <span className="text-gray-600">{lab.license_number || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Phone:</span>
            <span className="text-gray-600">{lab.phone || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Email:</span>
            <span className="text-gray-600">{lab.email || 'N/A'}</span>
          </div>
        </div>

        {lab.test_types && lab.test_types.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Test Types:</p>
            <div className="flex flex-wrap gap-1">
              {lab.test_types.slice(0, 3).map((testType, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {testType}
                </Badge>
              ))}
              {lab.test_types.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{lab.test_types.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            variant={lab.is_active ? "destructive" : "default"}
            size="sm"
            onClick={() => onToggleStatus(lab.id, lab.is_active)}
          >
            {lab.is_active ? (
              <>
                <Trash2 className="h-3 w-3 mr-1" />
                Deactivate
              </>
            ) : (
              'Activate'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LabCard;
