
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Shield, MapPin, Heart, Video, AlertTriangle, TestTube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickLinks = () => {
  const navigate = useNavigate();

  const quickLinks = [
    {
      icon: FileText,
      label: 'Medical Records',
      path: '/records'
    },
    {
      icon: Shield,
      label: 'Insurance Details',
      path: '/insurance'
    },
    {
      icon: MapPin,
      label: 'Find Hospitals',
      path: '/hospitals'
    },
    {
      icon: Heart,
      label: 'Health Resources',
      path: '/resources'
    },
    {
      icon: Video,
      label: 'Telemedicine',
      path: '/telemedicine'
    },
    {
      icon: AlertTriangle,
      label: 'Emergency SOS',
      path: '/emergency'
    },
    {
      icon: TestTube,
      label: 'Book Diagnostics',
      path: '/diagnostics'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {quickLinks.map(({ icon: Icon, label, path }) => (
            <Button 
              key={path}
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate(path)}
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickLinks;
