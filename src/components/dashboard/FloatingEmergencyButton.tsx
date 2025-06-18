
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Heart, Phone, MapPin, Users, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const FloatingEmergencyButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  // Only show for authenticated users
  if (!user) {
    return null;
  }

  const emergencyContacts = [
    {
      name: 'Emergency Services',
      number: '199',
      description: 'General emergency hotline',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      name: 'Ambulance',
      number: '199',
      description: 'Medical emergency transport',
      icon: Heart,
      color: 'text-red-600'
    },
    {
      name: 'Police',
      number: '199',
      description: 'Security emergency',
      icon: Phone,
      color: 'text-blue-600'
    },
    {
      name: 'Fire Service',
      number: '199',
      description: 'Fire emergency',
      icon: Phone,
      color: 'text-orange-600'
    }
  ];

  const quickActions = [
    {
      name: 'Find Nearest Hospital',
      description: 'Locate closest medical facility',
      icon: MapPin,
      action: () => console.log('Find hospital')
    },
    {
      name: 'Emergency Contacts',
      description: 'Call your emergency contacts',
      icon: Users,
      action: () => console.log('Call contacts')
    }
  ];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 shadow-lg z-50 p-0"
            onClick={() => setIsOpen(true)}
          >
            <Heart className="h-6 w-6 text-white" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Emergency Services
            </DialogTitle>
            <DialogDescription>
              Quick access to emergency services and contacts
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-3">Emergency Numbers</h4>
              <div className="grid grid-cols-1 gap-2">
                {emergencyContacts.map((contact) => (
                  <div
                    key={contact.name}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => window.open(`tel:${contact.number}`)}
                  >
                    <div className="flex items-center space-x-3">
                      <contact.icon className={`h-5 w-5 ${contact.color}`} />
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-gray-500">{contact.description}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Call {contact.number}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Quick Actions</h4>
              <div className="space-y-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.name}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={action.action}
                  >
                    <action.icon className="h-4 w-4 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">{action.name}</div>
                      <div className="text-xs text-gray-500">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingEmergencyButton;
