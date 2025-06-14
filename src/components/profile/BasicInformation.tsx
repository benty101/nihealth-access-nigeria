
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone } from 'lucide-react';

interface BasicInformationProps {
  profile: any;
  validationErrors: Record<string, string>;
  onInputChange: (field: string, value: any) => void;
}

const BasicInformation = ({ profile, validationErrors, onInputChange }: BasicInformationProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="full_name">Full Name</Label>
        <Input
          id="full_name"
          value={profile.full_name || ''}
          onChange={(e) => onInputChange('full_name', e.target.value)}
          placeholder="Enter your full name"
          className={validationErrors.full_name ? 'border-red-500' : ''}
          maxLength={100}
        />
        {validationErrors.full_name && (
          <p className="text-sm text-red-600 mt-1">{validationErrors.full_name}</p>
        )}
      </div>
      <div>
        <Label htmlFor="phone_number">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="phone_number"
            value={profile.phone_number || ''}
            onChange={(e) => onInputChange('phone_number', e.target.value)}
            placeholder="e.g. 08012345678 or +2348012345678"
            className={`pl-10 ${validationErrors.phone_number ? 'border-red-500' : ''}`}
            maxLength={14}
          />
        </div>
        {validationErrors.phone_number && (
          <p className="text-sm text-red-600 mt-1">{validationErrors.phone_number}</p>
        )}
      </div>
      <div>
        <Label htmlFor="date_of_birth">Date of Birth</Label>
        <Input
          id="date_of_birth"
          type="date"
          value={profile.date_of_birth || ''}
          onChange={(e) => onInputChange('date_of_birth', e.target.value)}
          className={validationErrors.date_of_birth ? 'border-red-500' : ''}
          max={new Date().toISOString().split('T')[0]}
        />
        {validationErrors.date_of_birth && (
          <p className="text-sm text-red-600 mt-1">{validationErrors.date_of_birth}</p>
        )}
      </div>
      <div>
        <Label htmlFor="gender">Gender</Label>
        <Select 
          value={profile.gender} 
          onValueChange={(value) => onInputChange('gender', value as 'male' | 'female' | 'other')}
        >
          <SelectTrigger className={validationErrors.gender ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {validationErrors.gender && (
          <p className="text-sm text-red-600 mt-1">{validationErrors.gender}</p>
        )}
      </div>
    </div>
  );
};

export default BasicInformation;
