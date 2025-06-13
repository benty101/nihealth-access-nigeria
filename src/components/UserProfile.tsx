
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { User, Heart, Calendar, Bell } from 'lucide-react';

const UserProfile = () => {
  const [isPregnant, setIsPregnant] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [profileData, setProfileData] = useState({
    name: 'Sarah Adebayo',
    email: 'sarah.adebayo@email.com',
    phone: '+234 803 123 4567',
    location: 'Lagos, Nigeria'
  });

  const calculateWeeksPregnant = (dueDate: string) => {
    if (!dueDate) return 0;
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return 40 - diffWeeks;
  };

  const weeksPregnant = calculateWeeksPregnant(dueDate);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            My Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => setProfileData({...profileData, location: e.target.value})}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                id="pregnant"
                checked={isPregnant}
                onChange={(e) => setIsPregnant(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="pregnant" className="flex items-center">
                <Heart className="mr-2 h-4 w-4 text-pink-500" />
                I am currently pregnant
              </Label>
            </div>

            {isPregnant && (
              <div className="bg-pink-50 p-4 rounded-lg space-y-4">
                <div>
                  <Label htmlFor="dueDate">Expected Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>

                {dueDate && weeksPregnant > 0 && (
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

          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Update Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
