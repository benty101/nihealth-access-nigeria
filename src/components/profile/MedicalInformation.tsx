
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MedicalInformationProps {
  profile: any;
  validationErrors: Record<string, string>;
  onInputChange: (field: string, value: any) => void;
}

const MedicalInformation = ({ profile, validationErrors, onInputChange }: MedicalInformationProps) => {
  return (
    <div className="border-t pt-4">
      <h3 className="text-lg font-medium mb-4">Medical Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="blood_group">Blood Group</Label>
          <Select 
            value={profile.blood_group} 
            onValueChange={(value) => onInputChange('blood_group', value)}
          >
            <SelectTrigger className={validationErrors.blood_group ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
            </SelectContent>
          </Select>
          {validationErrors.blood_group && (
            <p className="text-sm text-red-600 mt-1">{validationErrors.blood_group}</p>
          )}
        </div>
        <div>
          <Label htmlFor="genotype">Genotype</Label>
          <Select 
            value={profile.genotype} 
            onValueChange={(value) => onInputChange('genotype', value)}
          >
            <SelectTrigger className={validationErrors.genotype ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select genotype" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AA">AA</SelectItem>
              <SelectItem value="AS">AS</SelectItem>
              <SelectItem value="AC">AC</SelectItem>
              <SelectItem value="SS">SS</SelectItem>
              <SelectItem value="SC">SC</SelectItem>
              <SelectItem value="CC">CC</SelectItem>
            </SelectContent>
          </Select>
          {validationErrors.genotype && (
            <p className="text-sm text-red-600 mt-1">{validationErrors.genotype}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalInformation;
