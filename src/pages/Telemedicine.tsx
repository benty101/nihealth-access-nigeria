import React, { useState } from 'react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AvailableDoctors from '@/components/telemedicine/AvailableDoctors';
import ConsultationBooking from '@/components/telemedicine/ConsultationBooking';
import { Card, CardContent } from '@/components/ui/card';
import { Video, Calendar, Clock, Users } from 'lucide-react';

const Telemedicine = () => {
  return (
    <div className="min-h-screen bg-background">
      <ContextualNavbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Telemedicine Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with qualified healthcare providers through secure video consultations from the comfort of your home
          </p>
        </div>

        {/* Stats Cards */}
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
    </div>
  );
};

export default Telemedicine;