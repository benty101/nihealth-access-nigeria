
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Phone, MapPin, Clock } from 'lucide-react';

const emergencyContacts = [
  {
    name: 'National Emergency',
    number: '199',
    description: 'General emergency services',
    available: '24/7'
  },
  {
    name: 'Maternal Health Helpline',
    number: '0800-MOTHER',
    description: 'Dedicated maternal emergency line',
    available: '24/7'
  },
  {
    name: 'Lagos State Emergency',
    number: '767',
    description: 'Lagos emergency medical services',
    available: '24/7'
  }
];

const EmergencyResources = () => {
  return (
    <Card className="mb-8 border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-orange-50">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-red-900 mb-2">
              Emergency Resources - Always Available
            </h3>
            <p className="text-red-800 mb-4">
              If you're experiencing a medical emergency, don't hesitate to call for help immediately.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                    <div className="flex items-center text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3 mr-1" />
                      {contact.available}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{contact.description}</p>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Phone className="h-4 w-4 mr-2" />
                    Call {contact.number}
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-white rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-900 mb-2">Emergency Warning Signs</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-red-800">
                <div>
                  <strong>During Pregnancy:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Severe abdominal pain</li>
                    <li>Heavy bleeding</li>
                    <li>Severe headaches with vision changes</li>
                    <li>Sudden decrease in baby movements</li>
                  </ul>
                </div>
                <div>
                  <strong>After Birth:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Heavy bleeding (soaking a pad in 1 hour)</li>
                    <li>High fever over 38°C</li>
                    <li>Difficulty breathing</li>
                    <li>Signs of severe depression</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyResources;
