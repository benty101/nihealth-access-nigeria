
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Minus, ShoppingCart } from 'lucide-react';

const Pharmacy = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<{[key: number]: number}>({});

  const medications = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      price: 1200,
      description: 'Effective pain and fever relief',
      inStock: true,
      prescription: false,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      category: 'Antibiotics',
      price: 2800,
      description: 'Broad-spectrum antibiotic',
      inStock: true,
      prescription: true,
      image: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Vitamin C 1000mg',
      category: 'Supplements',
      price: 3500,
      description: 'Immune system support',
      inStock: true,
      prescription: false,
      image: '/placeholder.svg'
    },
    {
      id: 4,
      name: 'Lisinopril 10mg',
      category: 'Blood Pressure',
      price: 4200,
      description: 'ACE inhibitor for hypertension',
      inStock: false,
      prescription: true,
      image: '/placeholder.svg'
    },
    {
      id: 5,
      name: 'Ibuprofen 400mg',
      category: 'Pain Relief',
      price: 1800,
      description: 'Anti-inflammatory pain relief',
      inStock: true,
      prescription: false,
      image: '/placeholder.svg'
    },
    {
      id: 6,
      name: 'Metformin 500mg',
      category: 'Diabetes',
      price: 3200,
      description: 'Type 2 diabetes medication',
      inStock: true,
      prescription: true,
      image: '/placeholder.svg'
    },
  ];

  const categories = ['All', 'Pain Relief', 'Antibiotics', 'Supplements', 'Blood Pressure', 'Diabetes'];

  const filteredMedications = medications.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateCart = (id: number, change: number) => {
    setCart(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + change)
    }));
  };

  const getTotalItems = () => Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const medication = medications.find(med => med.id === parseInt(id));
      return total + (medication ? medication.price * qty : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Online Pharmacy
            </h1>
            <p className="text-lg text-gray-600">
              Order genuine medicines and health products with home delivery
            </p>
          </div>

          {/* Search and Cart */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search medicines..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Cart ({getTotalItems()}) - ₦{getTotalPrice().toLocaleString()}
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className={index === 0 ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Medications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedications.map((medication) => (
              <Card key={medication.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{medication.category}</Badge>
                    {medication.prescription && (
                      <Badge className="bg-red-100 text-red-800">
                        Prescription Required
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{medication.name}</CardTitle>
                  <p className="text-sm text-gray-600">{medication.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-green-600">
                      ₦{medication.price.toLocaleString()}
                    </div>
                    <div className={`text-sm ${medication.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {medication.inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>
                  
                  {medication.inStock ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateCart(medication.id, -1)}
                          disabled={!cart[medication.id]}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{cart[medication.id] || 0}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateCart(medication.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => updateCart(medication.id, 1)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  ) : (
                    <Button disabled className="w-full">
                      Notify When Available
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Prescription Upload */}
          <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Have a Prescription?
              </h2>
              <p className="text-gray-600 mb-6">
                Upload your prescription and we'll prepare your medicines for delivery
              </p>
              <Button size="lg" variant="outline">
                Upload Prescription
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;
