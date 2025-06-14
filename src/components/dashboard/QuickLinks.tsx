
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Shield, MapPin, Heart } from 'lucide-react';

const QuickLinks = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            Medical Records
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Shield className="h-4 w-4 mr-2" />
            Insurance Details
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <MapPin className="h-4 w-4 mr-2" />
            Find Hospitals
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Heart className="h-4 w-4 mr-2" />
            Health Resources
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickLinks;
