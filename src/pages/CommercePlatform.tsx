import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, 
  CreditCard, 
  Package, 
  Truck,
  Star,
  Filter,
  Search,
  Heart,
  Calendar,
  TestTube,
  Pill
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const CommercePlatform = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const services = [
    {
      id: '1',
      name: 'Health Insurance Plans',
      category: 'insurance',
      price: '₦25,000/month',
      rating: 4.8,
      provider: 'AIICO Insurance',
      description: 'Comprehensive health coverage for individuals and families',
      features: ['Emergency care', 'Specialist consultations', 'Prescription coverage'],
      urgent: false
    },
    {
      id: '2',
      name: 'Cardiology Consultation',
      category: 'appointments',
      price: '₦15,000',
      rating: 4.9,
      provider: 'UCTH Lagos',
      description: 'Expert heart health assessment with Dr. Fatima Hassan',
      features: ['ECG included', 'Same-day results', 'Follow-up included'],
      urgent: true
    },
    {
      id: '3',
      name: 'Complete Blood Panel',
      category: 'lab_tests',
      price: '₦8,500',
      rating: 4.7,
      provider: 'MedLab Diagnostics',
      description: 'Comprehensive blood work including CBC, lipids, and glucose',
      features: ['Home collection', '24hr results', 'Digital report'],
      urgent: false
    },
    {
      id: '4',
      name: 'Hypertension Medication Pack',
      category: 'pharmacy',
      price: '₦12,000',
      rating: 4.6,
      provider: 'HealthPlus Pharmacy',
      description: 'Monthly supply of blood pressure medications',
      features: ['Free delivery', 'Pharmacist consultation', '90-day supply'],
      urgent: false
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'insurance': return <Heart className="w-4 h-4" />;
      case 'appointments': return <Calendar className="w-4 h-4" />;
      case 'lab_tests': return <TestTube className="w-4 h-4" />;
      case 'pharmacy': return <Pill className="w-4 h-4" />;
      default: return <ShoppingBag className="w-4 h-4" />;
    }
  };

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-2">
            MeddyPal Health Marketplace
          </h1>
          <p className="text-blue-100">
            Discover and purchase health services tailored to your needs
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input 
              placeholder="Search health services..."
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="insurance">Insurance</TabsTrigger>
                <TabsTrigger value="appointments">Consultations</TabsTrigger>
                <TabsTrigger value="lab_tests">Lab Tests</TabsTrigger>
                <TabsTrigger value="pharmacy">Pharmacy</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(service.category)}
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                  </div>
                  {service.urgent && (
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{service.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">• {service.provider}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{service.description}</p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Includes:</h4>
                  <ul className="text-xs space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Heart className="w-3 h-3" />
                    </Button>
                    <Button size="sm">
                      <ShoppingBag className="w-3 h-3 mr-1" />
                      Purchase
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center p-6">
            <Package className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Bundled Savings</h3>
            <p className="text-sm text-muted-foreground">
              Save up to 30% when you bundle health services together
            </p>
          </Card>

          <Card className="text-center p-6">
            <Truck className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Home Delivery</h3>
            <p className="text-sm text-muted-foreground">
              Get medications and test kits delivered to your doorstep
            </p>
          </Card>

          <Card className="text-center p-6">
            <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Flexible Payment</h3>
            <p className="text-sm text-muted-foreground">
              Pay in installments or use insurance for covered services
            </p>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default CommercePlatform;