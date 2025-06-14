
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Star, MapPin, CheckCircle, Stethoscope, Clock } from 'lucide-react';

interface Expert {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  experience: string;
  consultations: number;
  rating: number;
  location: string;
  languages: string[];
  availability: string;
  image: string;
  hospitalType?: string;
  consultationFee?: string;
}

interface ResourceExpertsProps {
  experts: Expert[];
}

const ResourceExperts = ({ experts }: ResourceExpertsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {experts.map((expert) => (
        <Card key={expert.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full flex items-center justify-center">
                <Stethoscope className="h-8 w-8 text-teal-600" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg truncate">{expert.name}</CardTitle>
                <p className="text-sm text-gray-600 truncate">{expert.specialty}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{expert.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">
                    ({expert.consultations}+ consultations)
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-medium text-gray-900 mb-1">{expert.hospital}</div>
                {expert.hospitalType && (
                  <Badge variant="outline" className="text-xs mr-2">
                    {expert.hospitalType}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{expert.location}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Experience:</span>
                  <div>{expert.experience}</div>
                </div>
                {expert.consultationFee && (
                  <div>
                    <span className="font-medium">Fee:</span>
                    <div>{expert.consultationFee}</div>
                  </div>
                )}
              </div>

              <div className="text-sm text-gray-600">
                <span className="font-medium">Languages:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {expert.languages.slice(0, 3).map((lang, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center text-sm">
                <div className="flex items-center text-emerald-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span className="text-xs">{expert.availability}</span>
                </div>
              </div>

              <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-sm">
                <Phone className="h-4 w-4 mr-2" />
                Book Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResourceExperts;
