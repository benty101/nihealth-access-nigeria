
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Star, MapPin, CheckCircle, Stethoscope } from 'lucide-react';

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
}

interface ResourceExpertsProps {
  experts: Expert[];
}

const ResourceExperts = ({ experts }: ResourceExpertsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {experts.map((expert) => (
        <Card key={expert.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full flex items-center justify-center">
                <Stethoscope className="h-8 w-8 text-teal-600" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">{expert.name}</CardTitle>
                <p className="text-sm text-gray-600">{expert.specialty}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm">{expert.rating}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                <strong>Hospital:</strong> {expert.hospital}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                {expert.location}
              </div>

              <div className="text-sm text-gray-600">
                <strong>Experience:</strong> {expert.experience}
              </div>

              <div className="text-sm text-gray-600">
                <strong>Consultations:</strong> {expert.consultations.toLocaleString()}+
              </div>

              <div className="text-sm text-gray-600">
                <strong>Languages:</strong> {expert.languages.join(', ')}
              </div>

              <div className="flex items-center text-sm text-emerald-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                {expert.availability}
              </div>

              <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700">
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
