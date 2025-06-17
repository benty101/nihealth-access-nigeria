
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Building, Stethoscope, Calendar } from 'lucide-react';
import { Hospital } from '@/services/HospitalDataService';

interface EnhancedHospitalCardProps {
  hospital: Hospital;
  onViewDetails?: (hospital: Hospital) => void;
  onBookAppointment?: (hospital: Hospital) => void;
}

const EnhancedHospitalCard = ({ 
  hospital, 
  onViewDetails, 
  onBookAppointment 
}: EnhancedHospitalCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 transform border-l-4 border-l-teal-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg leading-tight line-clamp-2 text-gray-900">
            {hospital.name}
          </CardTitle>
          {hospital.license_number && (
            <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">
              {hospital.license_number}
            </Badge>
          )}
        </div>
        
        {hospital.address && (
          <div className="flex items-start text-sm text-gray-600 mt-2">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-teal-500 flex-shrink-0" />
            <span className="line-clamp-2">
              {hospital.address}
              {hospital.lga && hospital.state && (
                <span className="block text-xs text-gray-500 mt-1">
                  {hospital.lga}, {hospital.state} State
                </span>
              )}
            </span>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Contact Information */}
          <div className="space-y-2">
            {hospital.phone && (
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-teal-500" />
                <span>{hospital.phone}</span>
              </div>
            )}
            {hospital.email && (
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-teal-500" />
                <span className="truncate">{hospital.email}</span>
              </div>
            )}
          </div>

          {/* Specialties */}
          {hospital.specialties && hospital.specialties.length > 0 && (
            <div>
              <div className="flex items-center mb-2">
                <Stethoscope className="h-4 w-4 mr-2 text-teal-500" />
                <span className="text-sm font-medium text-gray-700">Specialties</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {hospital.specialties.slice(0, 3).map((specialty, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  >
                    {specialty}
                  </Badge>
                ))}
                {hospital.specialties.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{hospital.specialties.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Facilities */}
          {hospital.facilities && hospital.facilities.length > 0 && (
            <div>
              <div className="flex items-center mb-2">
                <Building className="h-4 w-4 mr-2 text-teal-500" />
                <span className="text-sm font-medium text-gray-700">Key Facilities</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {hospital.facilities.slice(0, 2).map((facility, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {facility}
                  </Badge>
                ))}
                {hospital.facilities.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{hospital.facilities.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewDetails?.(hospital)}
              className="flex-1 text-teal-600 border-teal-200 hover:bg-teal-50"
            >
              View Details
            </Button>
            <Button 
              size="sm" 
              onClick={() => onBookAppointment?.(hospital)}
              className="flex-1 bg-teal-600 hover:bg-teal-700"
            >
              <Calendar className="h-4 w-4 mr-1" />
              Book Visit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedHospitalCard;
