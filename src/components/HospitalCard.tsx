
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Shield, Navigation } from 'lucide-react';
import HospitalSpecialtyBadge from './HospitalSpecialtyBadge';
import type { Hospital } from '@/services/HospitalService';

interface HospitalCardProps {
  hospital: Hospital;
}

const HospitalCard = ({ hospital }: HospitalCardProps) => {
  const handleGetDirections = () => {
    console.log(`Getting directions to ${hospital.name}`);
  };

  const handleCall = () => {
    console.log(`Calling ${hospital.name} at ${hospital.phone}`);
  };

  const handleViewDetails = () => {
    console.log(`Viewing details for ${hospital.name}`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight mb-2">{hospital.name}</CardTitle>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <MapPin className="h-4 w-4 mr-1" />
              {hospital.address || `${hospital.lga || ''}, ${hospital.state || ''}`}
            </div>
            {hospital.phone && (
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-1" />
                {hospital.phone}
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge className="bg-green-100 text-green-800 text-xs">
              <Shield className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {hospital.specialties && hospital.specialties.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties</h4>
            <div className="flex flex-wrap gap-1">
              {hospital.specialties.slice(0, 4).map((specialty, index) => (
                <HospitalSpecialtyBadge key={index} specialty={specialty} />
              ))}
              {hospital.specialties.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{hospital.specialties.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {hospital.facilities && hospital.facilities.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Facilities</h4>
            <div className="flex flex-wrap gap-1">
              {hospital.facilities.slice(0, 4).map((facility, index) => (
                 <Badge key={index} variant="outline" className="text-xs">
                  {facility}
                </Badge>
              ))}
              {hospital.facilities.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{hospital.facilities.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleGetDirections}
          >
            <Navigation className="mr-2 h-4 w-4" />
            Get Directions
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={handleCall} disabled={!hospital.phone}>
              <Phone className="mr-2 h-4 w-4" />
              Call
            </Button>
            <Button variant="outline" size="sm" onClick={handleViewDetails}>
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HospitalCard;
