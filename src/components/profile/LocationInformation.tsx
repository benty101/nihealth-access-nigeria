
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin } from 'lucide-react';
import { nigerianStates } from '@/lib/validation';

interface LocationInformationProps {
  profile: any;
  validationErrors: Record<string, string>;
  onInputChange: (field: string, value: any) => void;
}

const LocationInformation = ({ profile, validationErrors, onInputChange }: LocationInformationProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="state_of_residence">State of Residence</Label>
        <Select 
          value={profile.state_of_residence} 
          onValueChange={(value) => onInputChange('state_of_residence', value)}
        >
          <SelectTrigger className={validationErrors.state_of_residence ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select your state" />
          </SelectTrigger>
          <SelectContent>
            {nigerianStates.map((state) => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {validationErrors.state_of_residence && (
          <p className="text-sm text-red-600 mt-1">{validationErrors.state_of_residence}</p>
        )}
      </div>
      <div>
        <Label htmlFor="lga">Local Government Area (LGA)</Label>
        <Input
          id="lga"
          value={profile.lga || ''}
          onChange={(e) => onInputChange('lga', e.target.value)}
          placeholder="Enter your LGA"
          className={validationErrors.lga ? 'border-red-500' : ''}
          maxLength={100}
        />
        {validationErrors.lga && (
          <p className="text-sm text-red-600 mt-1">{validationErrors.lga}</p>
        )}
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="address">Address</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="address"
            value={profile.address || ''}
            onChange={(e) => onInputChange('address', e.target.value)}
            placeholder="Enter your full address"
            className={`pl-10 ${validationErrors.address ? 'border-red-500' : ''}`}
            maxLength={500}
          />
        </div>
        {validationErrors.address && (
          <p className="text-sm text-red-600 mt-1">{validationErrors.address}</p>
        )}
      </div>
    </div>
  );
};

export default LocationInformation;
