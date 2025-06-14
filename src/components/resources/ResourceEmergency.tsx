
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, AlertCircle } from 'lucide-react';

interface EmergencyContact {
  id: number;
  name: string;
  number: string;
  description: string;
  available: string;
  type: string;
}

interface ResourceEmergencyProps {
  emergencyContacts: EmergencyContact[];
}

const ResourceEmergency = ({ emergencyContacts }: ResourceEmergencyProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {emergencyContacts.map((contact) => (
          <Card key={contact.id} className="border-l-4 border-l-red-500">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {contact.type}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">{contact.number}</div>
                  <div className="text-sm text-gray-500">{contact.available}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{contact.description}</p>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
          <h3 className="text-lg font-semibold text-red-900">Emergency Warning Signs</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-red-800">
          <div>
            <h4 className="font-medium mb-2">During Pregnancy:</h4>
            <ul className="space-y-1">
              <li>• Severe abdominal pain</li>
              <li>• Heavy bleeding</li>
              <li>• Severe headaches</li>
              <li>• Vision changes</li>
              <li>• Decreased fetal movement</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">During Labor/After Birth:</h4>
            <ul className="space-y-1">
              <li>• Heavy bleeding</li>
              <li>• High fever</li>
              <li>• Severe abdominal pain</li>
              <li>• Difficulty breathing</li>
              <li>• Signs of infection</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceEmergency;
