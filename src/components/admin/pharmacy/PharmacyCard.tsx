
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Pharmacy } from '@/services/AdminService';

interface PharmacyCardProps {
  pharmacy: Pharmacy;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
  onEdit: (pharmacy: Pharmacy) => void;
}

const PharmacyCard = ({ pharmacy, onToggleStatus, onEdit }: PharmacyCardProps) => {
  return (
    <Card key={pharmacy.id} className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{pharmacy.name}</CardTitle>
            <p className="text-sm text-gray-600">{pharmacy.address}</p>
            <p className="text-xs text-gray-500">{pharmacy.state}, {pharmacy.lga}</p>
          </div>
          <Badge className={pharmacy.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
            {pharmacy.is_active ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">License:</span>
            <span className="text-gray-600">{pharmacy.license_number || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Phone:</span>
            <span className="text-gray-600">{pharmacy.phone || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Email:</span>
            <span className="text-gray-600">{pharmacy.email || 'N/A'}</span>
          </div>
        </div>

        {pharmacy.specialties && pharmacy.specialties.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Specialties:</p>
            <div className="flex flex-wrap gap-1">
              {pharmacy.specialties.slice(0, 3).map((specialty, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {specialty}
                </Badge>
              ))}
              {pharmacy.specialties.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{pharmacy.specialties.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit(pharmacy)}
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            variant={pharmacy.is_active ? "destructive" : "default"}
            size="sm"
            onClick={() => onToggleStatus(pharmacy.id, pharmacy.is_active)}
          >
            {pharmacy.is_active ? (
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

export default PharmacyCard;
