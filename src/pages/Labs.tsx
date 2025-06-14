
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Monitor, Clock, MapPin, Heart, Search, Home, Building2, Star, Shield, Truck, Calendar } from 'lucide-react';

const Labs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const labTests = [
    // Blood Tests
    { id: 1, name: 'Complete Blood Count (CBC)', description: 'Comprehensive blood analysis including white cells, red cells, and platelets', price: 8500, duration: '24 hours', category: 'Blood Test', popular: true, homeTest: true, fasting: false },
    { id: 2, name: 'Lipid Profile', description: 'Cholesterol and triglyceride levels assessment', price: 12000, duration: '48 hours', category: 'Blood Test', popular: false, homeTest: true, fasting: true },
    { id: 3, name: 'Liver Function Test (LFT)', description: 'Comprehensive liver health assessment', price: 15000, duration: '24 hours', category: 'Blood Test', popular: true, homeTest: true, fasting: false },
    { id: 4, name: 'Kidney Function Test', description: 'Creatinine, urea, and electrolyte levels', price: 13500, duration: '24 hours', category: 'Blood Test', popular: true, homeTest: true, fasting: false },
    { id: 5, name: 'Thyroid Function Test (TFT)', description: 'TSH, T3, T4 hormone levels', price: 18000, duration: '48 hours', category: 'Blood Test', popular: true, homeTest: true, fasting: false },
    
    // Diabetes & Metabolic
    { id: 6, name: 'HbA1c (Diabetes Screening)', description: 'Long-term blood sugar control assessment', price: 15000, duration: '24 hours', category: 'Diabetes', popular: true, homeTest: true, fasting: false },
    { id: 7, name: 'Fasting Blood Sugar', description: 'Blood glucose level after fasting', price: 5000, duration: '2 hours', category: 'Diabetes', popular: true, homeTest: true, fasting: true },
    { id: 8, name: 'Random Blood Sugar', description: 'Blood glucose level at any time', price: 4000, duration: '1 hour', category: 'Diabetes', popular: false, homeTest: true, fasting: false },
    { id: 9, name: 'Oral Glucose Tolerance Test (OGTT)', description: 'Comprehensive diabetes screening', price: 8500, duration: '4 hours', category: 'Diabetes', popular: false, homeTest: false, fasting: true },
    { id: 10, name: 'Insulin Level Test', description: 'Fasting insulin hormone measurement', price: 12000, duration: '24 hours', category: 'Diabetes', popular: false, homeTest: true, fasting: true },

    // Cardiac & Cardiovascular
    { id: 11, name: 'ECG (Electrocardiogram)', description: 'Heart rhythm and electrical activity monitoring', price: 4500, duration: '1 hour', category: 'Cardiac', popular: false, homeTest: false, fasting: false },
    { id: 12, name: 'Echocardiogram', description: 'Ultrasound of the heart', price: 25000, duration: '2 hours', category: 'Cardiac', popular: false, homeTest: false, fasting: false },
    { id: 13, name: 'Cardiac Enzymes', description: 'Heart attack and heart damage markers', price: 18000, duration: '4 hours', category: 'Cardiac', popular: false, homeTest: false, fasting: false },
    { id: 14, name: 'D-Dimer Test', description: 'Blood clot formation marker', price: 15000, duration: '6 hours', category: 'Cardiac', popular: false, homeTest: true, fasting: false },
    { id: 15, name: 'BNP/NT-proBNP', description: 'Heart failure biomarker', price: 22000, duration: '24 hours', category: 'Cardiac', popular: false, homeTest: false, fasting: false },

    // Imaging & Radiology
    { id: 16, name: 'Chest X-Ray', description: 'Lung and heart imaging examination', price: 6000, duration: '2 hours', category: 'Imaging', popular: false, homeTest: false, fasting: false },
    { id: 17, name: 'Abdominal Ultrasound', description: 'Liver, gallbladder, kidney imaging', price: 18000, duration: '4 hours', category: 'Imaging', popular: true, homeTest: false, fasting: true },
    { id: 18, name: 'Pelvic Ultrasound', description: 'Reproductive organ imaging', price: 15000, duration: '3 hours', category: 'Imaging', popular: false, homeTest: false, fasting: false },
    { id: 19, name: 'CT Scan (Head)', description: 'Detailed brain imaging', price: 45000, duration: '2 hours', category: 'Imaging', popular: false, homeTest: false, fasting: false },
    { id: 20, name: 'MRI Scan', description: 'Magnetic resonance imaging', price: 85000, duration: '4 hours', category: 'Imaging', popular: false, homeTest: false, fasting: false },

    // Hormonal Tests
    { id: 21, name: 'Testosterone Level', description: 'Male hormone assessment', price: 12000, duration: '24 hours', category: 'Hormonal', popular: false, homeTest: true, fasting: false },
    { id: 22, name: 'Estrogen & Progesterone', description: 'Female hormone panel', price: 18000, duration: '24 hours', category: 'Hormonal', popular: false, homeTest: true, fasting: false },
    { id: 23, name: 'Cortisol Level', description: 'Stress hormone measurement', price: 15000, duration: '24 hours', category: 'Hormonal', popular: false, homeTest: true, fasting: false },
    { id: 24, name: 'Growth Hormone', description: 'HGH level assessment', price: 20000, duration: '24 hours', category: 'Hormonal', popular: false, homeTest: false, fasting: true },
    { id: 25, name: 'Prolactin Level', description: 'Prolactin hormone test', price: 12000, duration: '24 hours', category: 'Hormonal', popular: false, homeTest: true, fasting: false },

    // Infectious Disease
    { id: 26, name: 'HIV Test (ELISA)', description: 'HIV antibody screening', price: 8000, duration: '24 hours', category: 'Infectious Disease', popular: true, homeTest: true, fasting: false },
    { id: 27, name: 'Hepatitis B & C Panel', description: 'Hepatitis virus screening', price: 15000, duration: '48 hours', category: 'Infectious Disease', popular: true, homeTest: true, fasting: false },
    { id: 28, name: 'Malaria Test (RDT)', description: 'Rapid malaria diagnosis', price: 3000, duration: '30 minutes', category: 'Infectious Disease', popular: true, homeTest: true, fasting: false },
    { id: 29, name: 'Typhoid Test', description: 'Salmonella typhi detection', price: 5000, duration: '2 hours', category: 'Infectious Disease', popular: true, homeTest: true, fasting: false },
    { id: 30, name: 'COVID-19 PCR Test', description: 'SARS-CoV-2 RNA detection', price: 25000, duration: '24 hours', category: 'Infectious Disease', popular: true, homeTest: true, fasting: false },

    // Cancer Screening
    { id: 31, name: 'PSA Test', description: 'Prostate cancer screening', price: 15000, duration: '24 hours', category: 'Cancer Screening', popular: true, homeTest: true, fasting: false },
    { id: 32, name: 'CA 125', description: 'Ovarian cancer marker', price: 18000, duration: '48 hours', category: 'Cancer Screening', popular: false, homeTest: true, fasting: false },
    { id: 33, name: 'CEA Test', description: 'Colorectal cancer marker', price: 16000, duration: '24 hours', category: 'Cancer Screening', popular: false, homeTest: true, fasting: false },
    { id: 34, name: 'AFP Test', description: 'Liver cancer screening', price: 14000, duration: '24 hours', category: 'Cancer Screening', popular: false, homeTest: true, fasting: false },
    { id: 35, name: 'Mammography', description: 'Breast cancer screening', price: 35000, duration: '2 hours', category: 'Cancer Screening', popular: true, homeTest: false, fasting: false },

    // Nutritional & Vitamin Tests
    { id: 36, name: 'Vitamin D Test', description: '25-hydroxyvitamin D level', price: 12000, duration: '24 hours', category: 'Nutritional', popular: true, homeTest: true, fasting: false },
    { id: 37, name: 'Vitamin B12 Test', description: 'Cobalamin level assessment', price: 10000, duration: '24 hours', category: 'Nutritional', popular: true, homeTest: true, fasting: false },
    { id: 38, name: 'Iron Studies', description: 'Iron, ferritin, TIBC levels', price: 15000, duration: '24 hours', category: 'Nutritional', popular: true, homeTest: true, fasting: false },
    { id: 39, name: 'Folate Test', description: 'Folic acid level measurement', price: 8000, duration: '24 hours', category: 'Nutritional', popular: false, homeTest: true, fasting: false },
    { id: 40, name: 'Magnesium Level', description: 'Serum magnesium test', price: 7000, duration: '24 hours', category: 'Nutritional', popular: false, homeTest: true, fasting: false },

    // Specialized Tests
    { id: 41, name: 'Allergy Panel (IgE)', description: 'Common allergen testing', price: 35000, duration: '48 hours', category: 'Specialized', popular: false, homeTest: true, fasting: false },
    { id: 42, name: 'Autoimmune Panel', description: 'ANA, anti-dsDNA, RF tests', price: 28000, duration: '48 hours', category: 'Specialized', popular: false, homeTest: true, fasting: false },
    { id: 43, name: 'Celiac Disease Test', description: 'Gluten sensitivity screening', price: 18000, duration: '48 hours', category: 'Specialized', popular: false, homeTest: true, fasting: false },
    { id: 44, name: 'Genetic Testing', description: 'DNA analysis for health risks', price: 150000, duration: '2 weeks', category: 'Specialized', popular: false, homeTest: true, fasting: false },
    { id: 45, name: 'Pharmacogenetic Test', description: 'Drug response prediction', price: 120000, duration: '1 week', category: 'Specialized', popular: false, homeTest: true, fasting: false },

    // Health Packages
    { id: 46, name: 'Basic Health Checkup', description: 'CBC, LFT, KFT, Lipids, Blood Sugar', price: 45000, duration: '24 hours', category: 'Health Packages', popular: true, homeTest: true, fasting: true },
    { id: 47, name: 'Executive Health Package', description: 'Comprehensive health screening', price: 85000, duration: '48 hours', category: 'Health Packages', popular: true, homeTest: false, fasting: true },
    { id: 48, name: 'Cardiac Risk Assessment', description: 'Heart health comprehensive panel', price: 65000, duration: '24 hours', category: 'Health Packages', popular: false, homeTest: true, fasting: true },
    { id: 49, name: 'Women\'s Wellness Package', description: 'Female-specific health screening', price: 55000, duration: '48 hours', category: 'Health Packages', popular: true, homeTest: true, fasting: false },
    { id: 50, name: 'Men\'s Health Package', description: 'Male-specific health screening', price: 55000, duration: '48 hours', category: 'Health Packages', popular: true, homeTest: true, fasting: false },
  ];

  const labCenters = [
    {
      name: 'Pathcare Laboratory',
      location: 'Victoria Island, Lagos',
      rating: 4.8,
      services: ['Blood Tests', 'Imaging', 'Cardiac Tests', 'Home Collection'],
      verified: true,
      homeService: true
    },
    {
      name: 'Clina-Lancet Laboratories',
      location: 'Wuse II, Abuja',
      rating: 4.6,
      services: ['Blood Tests', 'Molecular Tests', 'Pathology', 'Genetic Testing'],
      verified: true,
      homeService: true
    },
    {
      name: 'Synlab Nigeria',
      location: 'GRA, Port Harcourt',
      rating: 4.7,
      services: ['Blood Tests', 'Imaging', 'Specialized Tests', 'Cancer Screening'],
      verified: true,
      homeService: false
    },
    {
      name: 'Lancet Laboratories',
      location: 'Ikeja, Lagos',
      rating: 4.5,
      services: ['Blood Tests', 'Hormonal Tests', 'Nutritional Tests'],
      verified: true,
      homeService: true
    },
    {
      name: 'Medical Art Center (MART)',
      location: 'Victoria Island, Lagos',
      rating: 4.9,
      services: ['All Tests', 'Imaging', 'Executive Packages', 'Home Collection'],
      verified: true,
      homeService: true
    },
    {
      name: 'Bridge Clinic Laboratory',
      location: 'Ikoyi, Lagos',
      rating: 4.7,
      services: ['Women\'s Health', 'Fertility Tests', 'Hormonal Tests'],
      verified: true,
      homeService: true
    },
  ];

  const categories = ['All', 'Blood Test', 'Diabetes', 'Cardiac', 'Imaging', 'Hormonal', 'Infectious Disease', 'Cancer Screening', 'Nutritional', 'Specialized', 'Health Packages'];

  const filteredTests = labTests.filter(test =>
    (selectedCategory === 'All' || test.category === selectedCategory) &&
    (test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     test.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Laboratory Services
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Book lab tests and diagnostic services from certified laboratories with home collection
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Home className="h-4 w-4 mr-2 text-green-600" />
                Home sample collection
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-blue-600" />
                NAFDAC certified labs
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-orange-600" />
                Same-day results available
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search tests, health conditions, or test packages..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Calendar className="mr-2 h-4 w-4" />
              Book Home Collection
            </Button>
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Available Tests ({filteredTests.length})</h2>
                <select className="px-3 py-2 border rounded-lg text-sm">
                  <option>Sort by Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Fastest Results</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTests.map((test) => (
                  <Card key={test.id} className="hover:shadow-lg transition-shadow relative">
                    {test.popular && (
                      <Badge className="absolute -top-3 left-4 bg-green-600">
                        Popular
                      </Badge>
                    )}
                    
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Monitor className="h-6 w-6 text-blue-600" />
                        <div className="flex gap-1">
                          <Badge variant="outline" className="text-xs">{test.category}</Badge>
                          {test.homeTest && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              <Home className="h-3 w-3 mr-1" />
                              Home
                            </Badge>
                          )}
                          {test.fasting && (
                            <Badge className="bg-orange-100 text-orange-800 text-xs">
                              Fasting
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight">{test.name}</CardTitle>
                      <p className="text-sm text-gray-600">{test.description}</p>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold text-blue-600">₦{test.price.toLocaleString()}</div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {test.duration}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Book Test
                        </Button>
                        {test.homeTest && (
                          <Button variant="outline" size="sm" className="w-full">
                            <Home className="h-4 w-4 mr-2" />
                            Home Collection
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Lab Centers & Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Partner Labs</h2>
              <div className="space-y-4 mb-8">
                {labCenters.map((center, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{center.name}</h3>
                        {center.verified && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {center.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                        {center.rating} rating
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {center.services.slice(0, 3).map((service, serviceIndex) => (
                          <Badge key={serviceIndex} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                      {center.homeService && (
                        <div className="flex items-center text-xs text-green-600 mb-3">
                          <Truck className="h-3 w-3 mr-1" />
                          Home collection available
                        </div>
                      )}
                      <Button size="sm" variant="outline" className="w-full">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Monitor className="mr-2 h-4 w-4" />
                      Track Test Results
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Collection
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Heart className="mr-2 h-4 w-4" />
                      Health Packages
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Home className="mr-2 h-4 w-4" />
                      Home Test Kits
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labs;
