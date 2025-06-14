
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
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {quickLinks.map(({ icon: Icon, label, path }) => (
            <Button 
              key={path}
              variant="ghost" 
              className="w-full justify-start hover:bg-teal-50 hover:text-teal-700 transition-colors"
              onClick={() => navigate(path)}
            >
              <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
              <span className="text-left">{label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickLinks;
