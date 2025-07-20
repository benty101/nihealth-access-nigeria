import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import BackButton from '@/components/navigation/BackButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AvailableDoctors from '@/components/telemedicine/AvailableDoctors';
import ConsultationBooking from '@/components/telemedicine/ConsultationBooking';
import { Card, CardContent } from '@/components/ui/card';
import { Video, Calendar, Clock, Users } from 'lucide-react';

const Telemedicine = () => {
  return (
    <PageLayout 
      title="Telemedicine Services" 
      subtitle="Connect with qualified healthcare providers through secure video consultations from the comfort of your home"
    >
      <div className="mb-6">
        <BackButton />
      </div>
      
      <div className="container mx-auto">{/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <Video className="h-8 w-8 text-teal-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm text-muted-foreground">Available</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-teal-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">50+</p>
                <p className="text-sm text-muted-foreground">Doctors</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Calendar className="h-8 w-8 text-teal-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">Same Day</p>
                <p className="text-sm text-muted-foreground">Booking</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Clock className="h-8 w-8 text-teal-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">15 min</p>
                <p className="text-sm text-muted-foreground">Average Wait</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="book" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="book">Book Consultation</TabsTrigger>
            <TabsTrigger value="doctors">Browse Doctors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="book" className="mt-6">
            <ConsultationBooking />
          </TabsContent>
          
          <TabsContent value="doctors" className="mt-6">
            <AvailableDoctors />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Telemedicine;