import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import StandardPageLayout from '@/components/layout/StandardPageLayout';
import BackButton from '@/components/navigation/BackButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestKitCatalog } from '@/components/test-kits/TestKitCatalog';
import { TestKitOrderModal } from '@/components/test-kits/TestKitOrderModal';
import { HomeTestKitService, TestKitType } from '@/services/HomeTestKitService';
import { Search, TestTube, Clock, MapPin, Star, Calendar, UserPlus, Droplets, Activity, Zap, Package, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Labs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedKit, setSelectedKit] = useState<TestKitType | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const { toast } = useToast();

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

  const handleOrderKit = (kit: TestKitType) => {
    if (!handleProtectedAction('order a test kit')) return;
    
    setSelectedKit(kit);
    setShowOrderModal(true);
  };

  const handleOrderComplete = () => {
    setShowOrderModal(false);
    setSelectedKit(null);
    toast({
      title: "Test Kit Ordered!",
      description: "Your test kit has been ordered successfully. You'll receive tracking information via email.",
    });
  };

  const categories = ['All', 'Blood Tests', 'Imaging', 'Specialized', 'Wellness', 'Infectious Disease'];

  const labTests = [
    {
      name: 'Complete Blood Count (CBC)',
      description: 'Comprehensive blood analysis including red and white blood cells',
      category: 'Blood Tests',
      price: '₦3,500',
      duration: '2-4 hours',
      fasting: false,
      popular: true
    },
    {
      name: 'Lipid Profile',
      description: 'Cholesterol and triglyceride levels assessment',
      category: 'Blood Tests',
      price: '₦4,200',
      duration: '2-4 hours',
      fasting: true,
      popular: true
    },
    {
      name: 'Thyroid Function Test',
      description: 'TSH, T3, and T4 hormone levels',
      category: 'Specialized',
      price: '₦6,800',
      duration: '4-6 hours',
      fasting: false,
      popular: false
    },
    {
      name: 'Chest X-Ray',
      description: 'Lung and heart imaging for respiratory assessment',
      category: 'Imaging',
      price: '₦8,500',
      duration: '30 minutes',
      fasting: false,
      popular: true
    },
    {
      name: 'Malaria Test (Rapid)',
      description: 'Quick malaria parasite detection',
      category: 'Infectious Disease',
      price: '₦1,500',
      duration: '15 minutes',
      fasting: false,
      popular: true
    },
    {
      name: 'Hepatitis B & C Screening',
      description: 'Blood test for hepatitis B and C viruses',
      category: 'Infectious Disease',
      price: '₦5,200',
      duration: '2-4 hours',
      fasting: false,
      popular: false
    },
    {
      name: 'Comprehensive Metabolic Panel',
      description: 'Glucose, electrolytes, kidney and liver function',
      category: 'Blood Tests',
      price: '₦7,500',
      duration: '2-4 hours',
      fasting: true,
      popular: false
    },
    {
      name: 'Wellness Package',
      description: 'CBC, Lipid Profile, Blood Sugar, Liver Function',
      category: 'Wellness',
      price: '₦12,000',
      duration: '2-4 hours',
      fasting: true,
      popular: true
    }
  ];

  const labLocations = [
    {
      name: 'LifeCare Diagnostic Center',
      location: 'Victoria Island, Lagos',
      rating: 4.8,
      distance: '2.3 km',
      nextAvailable: 'Today 10:00 AM'
    },
    {
      name: 'Medbury Medical Services',
      location: 'Ikeja, Lagos',
      rating: 4.6,
      distance: '5.1 km',
      nextAvailable: 'Today 2:00 PM'
    },
    {
      name: 'PathCare Nigeria',
      location: 'Abuja Central',
      rating: 4.7,
      distance: '1.8 km',
      nextAvailable: 'Tomorrow 9:00 AM'
    }
  ];

  const filteredTests = labTests.filter(test => 
    (selectedCategory === 'All' || test.category === selectedCategory) &&
    (test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     test.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <StandardPageLayout 
      title="Laboratory Tests & Diagnostics" 
      subtitle="Book laboratory tests and diagnostic services with certified facilities across Nigeria, or order convenient home test kits"
      backgroundVariant="gradient"
    >
      <div className="mb-6">
        <BackButton />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          {!user && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-blue-700">
                <UserPlus className="h-5 w-5" />
                <span>Create an account to book tests and track your results</span>
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
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-600">
            <div className="flex items-center">
              <TestTube className="h-4 w-4 mr-2 text-blue-600" />
              Certified labs
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-green-600" />
              Quick results
            </div>
            <div className="flex items-center">
              <Activity className="h-4 w-4 mr-2 text-purple-600" />
              Digital reports
            </div>
            <div className="flex items-center">
              <Home className="h-4 w-4 mr-2 text-orange-600" />
              Home test kits
            </div>
          </div>
        </div>

          {/* Tabs for Lab Tests vs Home Test Kits */}
          <Tabs defaultValue="lab-tests" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="lab-tests" className="flex items-center gap-2">
                <TestTube className="h-4 w-4" />
                Lab Tests
              </TabsTrigger>
              <TabsTrigger value="home-kits" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Home Test Kits
              </TabsTrigger>
            </TabsList>

            <TabsContent value="lab-tests">
              {/* Search and Filter */}
              <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search lab tests..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Lab Tests */}
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Tests</h2>
                  <div className="space-y-4">
                    {filteredTests.map((test, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                {test.category === 'Blood Tests' && <Droplets className="h-6 w-6 text-red-600" />}
                                {test.category === 'Imaging' && <Activity className="h-6 w-6 text-blue-600" />}
                                {test.category === 'Specialized' && <Zap className="h-6 w-6 text-purple-600" />}
                                {test.category === 'Wellness' && <TestTube className="h-6 w-6 text-green-600" />}
                                {test.category === 'Infectious Disease' && <TestTube className="h-6 w-6 text-orange-600" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
                                  {test.popular && (
                                    <Badge className="bg-orange-100 text-orange-800 text-xs">Popular</Badge>
                                  )}
                                </div>
                                <p className="text-gray-600 mb-3">{test.description}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {test.duration}
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {test.category}
                                  </Badge>
                                  {test.fasting && (
                                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                      Fasting Required
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600 mb-2">
                                {test.price}
                              </div>
                              <Button 
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={() => handleProtectedAction('book this lab test')}
                              >
                                Book Test
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Lab Locations Sidebar */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                        Nearby Laboratories
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {labLocations.map((lab, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-1">{lab.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{lab.location}</p>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                                <span>{lab.rating}</span>
                                <span className="mx-1">•</span>
                                <span>{lab.distance}</span>
                              </div>
                              <span className="text-green-600 font-medium">{lab.nextAvailable}</span>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="w-full mt-2"
                              onClick={() => handleProtectedAction('book at this location')}
                            >
                              Select Location
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Test Preparation Info */}
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Test Preparation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Fasting Tests</h4>
                          <p className="text-gray-600">No food or drink (except water) for 8-12 hours before test</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Regular Tests</h4>
                          <p className="text-gray-600">No special preparation required</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Medications</h4>
                          <p className="text-gray-600">Continue regular medications unless advised otherwise</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="home-kits">
              <TestKitCatalog onOrderKit={handleOrderKit} />
            </TabsContent>
        </Tabs>

        {/* Test Kit Order Modal */}
        {selectedKit && (
          <TestKitOrderModal
            isOpen={showOrderModal}
            onClose={() => setShowOrderModal(false)}
            testKit={selectedKit}
            onOrderComplete={handleOrderComplete}
          />
        )}
      </div>
    </StandardPageLayout>
  );
};

export default Labs;