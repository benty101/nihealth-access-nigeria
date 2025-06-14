
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Heart, Bell } from 'lucide-react';

interface PregnancyInformationProps {
  profile: any;
  validationErrors: Record<string, string>;
  onInputChange: (field: string, value: any) => void;
}

const PregnancyInformation = ({ profile, validationErrors, onInputChange }: PregnancyInformationProps) => {
  const calculateWeeksPregnant = (dueDate: string) => {
    if (!dueDate) return 0;
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return Math.max(0, 40 - diffWeeks);
  };

  const weeksPregnant = calculateWeeksPregnant(profile.due_date || '');

  return (
    <div className="border-t pt-4">
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="checkbox"
          id="is_pregnant"
          checked={profile.is_pregnant || false}
          onChange={(e) => onInputChange('is_pregnant', e.target.checked)}
          className="rounded"
        />
        <Label htmlFor="is_pregnant" className="flex items-center">
          <Heart className="mr-2 h-4 w-4 text-pink-500" />
          I am currently pregnant
        </Label>
      </div>

      {profile.is_pregnant && (
        <div className="bg-pink-50 p-4 rounded-lg space-y-4">
          <div>
            <Label htmlFor="due_date">Expected Due Date</Label>
            <Input
              id="due_date"
              type="date"
              value={profile.due_date || ''}
              onChange={(e) => onInputChange('due_date', e.target.value)}
              className={validationErrors.due_date ? 'border-red-500' : ''}
              min={new Date().toISOString().split('T')[0]}
            />
            {validationErrors.due_date && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.due_date}</p>
            )}
          </div>

          {profile.due_date && weeksPregnant > 0 && (
            <div className="flex items-center space-x-4">
              <Badge className="bg-pink-100 text-pink-800">
                {weeksPregnant} weeks pregnant
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                Trimester {weeksPregnant <= 12 ? '1' : weeksPregnant <= 26 ? '2' : '3'}
              </Badge>
            </div>
          )}

          <div className="flex items-center text-sm text-gray-600">
            <Bell className="mr-2 h-4 w-4" />
            You'll receive personalized pregnancy tips and appointment reminders
          </div>
        </div>
      )}
    </div>
  );
};

export default PregnancyInformation;
