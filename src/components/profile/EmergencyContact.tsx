
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EmergencyContactProps {
  profile: any;
  validationErrors: Record<string, string>;
  onInputChange: (field: string, value: any) => void;
}

const EmergencyContact = ({ profile, validationErrors, onInputChange }: EmergencyContactProps) => {
  return (
    <div className="border-t pt-4">
      <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="emergency_contact_name">Contact Name</Label>
          <Input
            id="emergency_contact_name"
            value={profile.emergency_contact_name || ''}
            onChange={(e) => onInputChange('emergency_contact_name', e.target.value)}
            placeholder="Emergency contact full name"
            className={validationErrors.emergency_contact_name ? 'border-red-500' : ''}
            maxLength={100}
          />
          {validationErrors.emergency_contact_name && (
            <p className="text-sm text-red-600 mt-1">{validationErrors.emergency_contact_name}</p>
          )}
        </div>
        <div>
          <Label htmlFor="emergency_contact_phone">Contact Phone</Label>
          <Input
            id="emergency_contact_phone"
            value={profile.emergency_contact_phone || ''}
            onChange={(e) => onInputChange('emergency_contact_phone', e.target.value)}
            placeholder="Emergency contact phone number"
            className={validationErrors.emergency_contact_phone ? 'border-red-500' : ''}
            maxLength={14}
          />
          {validationErrors.emergency_contact_phone && (
            <p className="text-sm text-red-600 mt-1">{validationErrors.emergency_contact_phone}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;
