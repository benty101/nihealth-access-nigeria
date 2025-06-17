
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Minus, ShoppingCart, Star, Clock, Truck, AlertCircle, UserPlus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { medicationService } from '@/services/MedicationService';
import type { Medication as MedicationType } from '@/services/AdminService';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { pharmacyService } from '@/services/PharmacyService';
import { usePharmacies } from '@/hooks/usePharmacies';
import { useMedications } from '@/hooks/useMedications';

const Pharmacy = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [sortBy, setSortBy] = useState('name');
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<string | null>(null);

  // USE UNIFIED HOOKS:
  const { data: pharmacies = [], isLoading: pharmaciesLoading, isError: pharmaciesError } = usePharmacies();
  const { data: medications = [], isLoading: medsLoading, isError: medsError } = useMedications({
    pharmacyId: selectedPharmacyId
  });

  const categories = [
    'All',
    'Pain Relief',
    'Antibiotics',
    'Cardiovascular',
    'Diabetes',
    'Supplements',
    'Respiratory',
    'Gastrointestinal',
    'Mental Health',
    'Dermatology',
    "Women's Health",
    "Men's Health",
    'Eye Care'
  ];

  // Function to handle protected actions
  const handleProtectedAction = (action: string) => {
    if (!user) {
      // Show registration prompt
      const proceed = window.confirm(`You need to create an account to ${action}. Would you like to register now?`);
      if (proceed) {
        navigate('/auth');
      }
      return false;
    }
    return true;
  };

  // Optionally filter medications by selected pharmacy
  const filteredMedications = medications
    .filter(med => 
      (selectedCategory === 'All' || med.category === selectedCategory) &&
      (med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       med.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
       (med.brand && med.brand.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (!selectedPharmacyId || med.pharmacy_id === selectedPharmacyId)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return (b.rating ?? 0) - (a.rating ?? 0);
        default: return a.name.localeCompare(b.name);
      }
    });

  const updateCart = (id: string, change: number) => {
    if (!handleProtectedAction('add items to cart')) return;
    
    setCart(prev => {
      const newCart = { ...prev };
      const currentQty = newCart[id] || 0;
      const newQty = Math.max(0, currentQty + change);
      if (newQty === 0) {
        delete newCart[id];
      } else {
        newCart[id] = newQty;
      }
      return newCart;
    });
  };

  const handleCartClick = () => {
    if (!handleProtectedAction('view cart')) return;
    // Cart functionality for authenticated users
  };

  const getTotalItems = () => Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  
  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const medication = medications.find(med => med.id === id);
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
              Browse genuine medicines and health products with same-day delivery
            </p>
            {!user && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-blue-700">
                  <UserPlus className="h-5 w-5" />
                  <span>Create an account to purchase medicines and track your orders</span>
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
                <Truck className="h-4 w-4 mr-2 text-green-600" />
                Free delivery over ₦10,000
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-blue-600" />
                Same-day delivery available
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-2 text-yellow-500" />
                Verified authentic medicines
              </div>
            </div>
          </div>

          {/* Pharmacies grid for selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Pharmacies</h2>
            {pharmaciesLoading ? (
              <div>Loading pharmacies...</div>
            ) : pharmaciesError ? (
              <div className="text-red-500">Failed to fetch pharmacies. Please try again.</div>
            ) : pharmacies.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={!selectedPharmacyId ? "default" : "outline"}
                  onClick={() => setSelectedPharmacyId(null)}
                  size="sm"
                  className={!selectedPharmacyId ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  All Pharmacies
                </Button>
                {pharmacies.map((pharm) => (
                  <Button
                    key={pharm.id}
                    variant={selectedPharmacyId === pharm.id ? "default" : "outline"}
                    onClick={() => setSelectedPharmacyId(pharm.id)}
                    size="sm"
                    className={selectedPharmacyId === pharm.id ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    {pharm.name}
                  </Button>
                ))}
              </div>
            ) : (
              <div>No pharmacies available</div>
            )}
          </div>

          {/* Search and Cart */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search medicines, brands, or conditions..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select 
                className="px-4 py-2 border rounded-lg bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleCartClick}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Cart ({getTotalItems()}) - ₦{getTotalPrice().toLocaleString()}
              </Button>
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

          {/* Medications Grid */}
          {(medsLoading || pharmaciesLoading) && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <Card key={index}>
                  <CardHeader><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-1/2 mt-2" /></CardHeader>
                  <CardContent><Skeleton className="h-10 w-full" /></CardContent>
                </Card>
              ))}
            </div>
          )}

          {(medsError || pharmaciesError) && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Failed to load data. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          {!medsLoading && !pharmaciesLoading && !medsError && !pharmaciesError && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMedications.map((medication) => (
                <Card key={medication.id} className="hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">{medication.category}</Badge>
                      {medication.prescription_required && (
                        <Badge className="bg-red-100 text-red-800 text-xs">
                          Rx Required
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg leading-tight">{medication.name}</CardTitle>
                    {medication.pharmacy_id && (
                      <span className="block text-xs text-gray-500 mb-1">
                        {pharmacies.find(ph => ph.id === medication.pharmacy_id)?.name || ''}
                      </span>
                    )}
                    <p className="text-sm text-gray-600 mb-2 truncate">{medication.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{medication.brand}</span>
                      <span>{medication.pack_size}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-600 ml-1">{medication.rating}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xl font-bold text-green-600">
                        ₦{medication.price.toLocaleString()}
                      </div>
                      <div className={`text-sm font-semibold ${medication.in_stock ? 'text-green-600' : 'text-red-600'}`}>
                        {medication.in_stock ? 'In Stock' : 'Out of Stock'}
                      </div>
                    </div>
                    
                    {medication.in_stock ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateCart(medication.id, -1)}
                              disabled={!cart[medication.id]}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{cart[medication.id] || 0}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateCart(medication.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
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
                      </div>
                    ) : (
                      <Button disabled className="w-full" size="sm">
                        Notify When Available
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!medsLoading && !pharmaciesLoading && !medsError && !pharmaciesError && filteredMedications.length === 0 && (
             <div className="text-center py-16">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchTerm || selectedCategory !== 'All' ? 'No medications found matching your criteria.' : 'No medications available at the moment.'}
              </p>
            </div>
          )}

          {/* Prescription Upload */}
          <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Have a Prescription?
              </h2>
              <p className="text-gray-600 mb-6">
                Upload your prescription and we'll prepare your medicines for delivery
              </p>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => handleProtectedAction('upload prescription')}
              >
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
