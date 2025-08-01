
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import { Shield, Calendar, Heart, Baby, Stethoscope, Syringe, Users, Activity, UserPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Pediatric = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Function to handle protected actions
  const handleProtectedAction = (action: string) => {
    if (!user) {
      const proceed = window.confirm(`You need to create an account to ${action}. Would you like to register now?`);
      if (proceed) {
        navigate('/auth');
      }
      return false;
    }
    return true;
  };

  const handleNavigation = (path: string, requiresAuth: boolean = false) => {
    if (requiresAuth && !handleProtectedAction('access this service')) {
      return;
    }
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ContextualNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mother & Child Health Care
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive maternal and pediatric care services for you and your child's healthy development
          </p>
          {!user && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-blue-700">
                <UserPlus className="h-5 w-5" />
                <span>Create an account to book appointments and track vaccination records</span>
                <Button 
                  onClick={() => navigate('/auth')} 
                  size="sm" 
                  className="ml-2 bg-blue-600 hover:bg-blue-700"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Vaccination Quick Access - Prominent Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Syringe className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Vaccination Center</h2>
                <p className="text-gray-600">Keep your child's immunizations up to date with our vaccination tracking system</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => handleNavigation('/records', true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                View Vaccination Records
              </Button>
              <Button 
                onClick={() => handleNavigation('/appointments', true)}
                variant="outline"
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                Schedule Vaccination
              </Button>
            </div>
          </div>
        </div>

        {/* Mother & Child Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-pink-600" />
                Maternal Care
              </CardTitle>
              <CardDescription>
                Prenatal, delivery, and postnatal care for expecting mothers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-pink-600 hover:bg-pink-700"
                onClick={() => handleNavigation('/appointments', true)}
              >
                Book Maternal Visit
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Baby className="h-5 w-5 text-blue-600" />
                Well-Child Visits
              </CardTitle>
              <CardDescription>
                Regular check-ups to monitor your child's growth and development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                onClick={() => handleNavigation('/appointments', true)}
              >
                Schedule Check-up
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Syringe className="h-5 w-5 text-green-600" />
                Vaccination Schedule
              </CardTitle>
              <CardDescription>
                Keep track of immunizations and upcoming vaccines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handleNavigation('/records', true)}
                >
                  View Vaccination Records
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-green-300 text-green-600 hover:bg-green-50"
                  onClick={() => handleNavigation('/appointments', true)}
                >
                  Book Vaccination
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-purple-600" />
                Pediatric Specialists
              </CardTitle>
              <CardDescription>
                Connect with certified pediatricians and specialists
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                onClick={() => handleNavigation('/hospitals', false)}
              >
                Find Specialist
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-600" />
                Family Planning
              </CardTitle>
              <CardDescription>
                Contraception counseling and reproductive health services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                onClick={() => handleNavigation('/telemedicine', false)}
              >
                Get Consultation
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-orange-600" />
                Health Monitoring
              </CardTitle>
              <CardDescription>
                Track vital signs and developmental milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                onClick={() => handleNavigation('/records', true)}
              >
                View Health Records
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Vaccination Timeline */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            Vaccination Timeline
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Birth - 2 months</h3>
                <p className="text-gray-600">Hepatitis B, DTaP, Hib, PCV, IPV, Rotavirus</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => handleNavigation('/records', true)}
              >
                Track Progress
              </Button>
            </div>
            
            <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">4 - 6 months</h3>
                <p className="text-gray-600">DTaP, Hib, PCV, IPV, Rotavirus</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => handleNavigation('/appointments', true)}
              >
                Schedule Vaccines
              </Button>
            </div>

            <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">12 - 15 months</h3>
                <p className="text-gray-600">MMR, Varicella, Hepatitis A</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => handleNavigation('/hospitals', false)}
              >
                Find Clinic
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pediatric;
