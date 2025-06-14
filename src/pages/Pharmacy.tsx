
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Minus, ShoppingCart, Filter, Star, Clock, Truck } from 'lucide-react';

const Pharmacy = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [sortBy, setSortBy] = useState('name');

  const medications = [
    // Pain Relief & Anti-inflammatory
    { id: 1, name: 'Paracetamol 500mg', category: 'Pain Relief', price: 1200, description: 'Effective pain and fever relief', inStock: true, prescription: false, rating: 4.8, brand: 'GSK', pack: '20 tablets' },
    { id: 2, name: 'Ibuprofen 400mg', category: 'Pain Relief', price: 1800, description: 'Anti-inflammatory pain relief', inStock: true, prescription: false, rating: 4.7, brand: 'Pfizer', pack: '30 tablets' },
    { id: 3, name: 'Aspirin 75mg', category: 'Pain Relief', price: 900, description: 'Low-dose aspirin for heart protection', inStock: true, prescription: false, rating: 4.6, brand: 'Bayer', pack: '28 tablets' },
    { id: 4, name: 'Diclofenac 50mg', category: 'Pain Relief', price: 2400, description: 'Strong anti-inflammatory', inStock: true, prescription: true, rating: 4.5, brand: 'Novartis', pack: '20 tablets' },
    { id: 5, name: 'Tramadol 50mg', category: 'Pain Relief', price: 3200, description: 'Moderate to severe pain relief', inStock: true, prescription: true, rating: 4.4, brand: 'Teva', pack: '30 capsules' },

    // Antibiotics
    { id: 6, name: 'Amoxicillin 250mg', category: 'Antibiotics', price: 2800, description: 'Broad-spectrum antibiotic', inStock: true, prescription: true, rating: 4.6, brand: 'GSK', pack: '21 capsules' },
    { id: 7, name: 'Amoxicillin 500mg', category: 'Antibiotics', price: 4200, description: 'High-strength broad-spectrum antibiotic', inStock: true, prescription: true, rating: 4.7, brand: 'GSK', pack: '21 capsules' },
    { id: 8, name: 'Azithromycin 250mg', category: 'Antibiotics', price: 3800, description: 'Macrolide antibiotic', inStock: true, prescription: true, rating: 4.5, brand: 'Pfizer', pack: '6 tablets' },
    { id: 9, name: 'Ciprofloxacin 500mg', category: 'Antibiotics', price: 4800, description: 'Fluoroquinolone antibiotic', inStock: true, prescription: true, rating: 4.4, brand: 'Bayer', pack: '14 tablets' },
    { id: 10, name: 'Doxycycline 100mg', category: 'Antibiotics', price: 3600, description: 'Tetracycline antibiotic', inStock: true, prescription: true, rating: 4.3, brand: 'Teva', pack: '14 capsules' },

    // Cardiovascular
    { id: 11, name: 'Lisinopril 10mg', category: 'Cardiovascular', price: 4200, description: 'ACE inhibitor for hypertension', inStock: false, prescription: true, rating: 4.6, brand: 'Merck', pack: '28 tablets' },
    { id: 12, name: 'Amlodipine 5mg', category: 'Cardiovascular', price: 3800, description: 'Calcium channel blocker', inStock: true, prescription: true, rating: 4.5, brand: 'Pfizer', pack: '30 tablets' },
    { id: 13, name: 'Atorvastatin 20mg', category: 'Cardiovascular', price: 5200, description: 'Cholesterol-lowering statin', inStock: true, prescription: true, rating: 4.7, brand: 'Pfizer', pack: '30 tablets' },
    { id: 14, name: 'Metoprolol 50mg', category: 'Cardiovascular', price: 4600, description: 'Beta-blocker for heart conditions', inStock: true, prescription: true, rating: 4.4, brand: 'AstraZeneca', pack: '28 tablets' },
    { id: 15, name: 'Warfarin 5mg', category: 'Cardiovascular', price: 2800, description: 'Anticoagulant blood thinner', inStock: true, prescription: true, rating: 4.2, brand: 'Bristol-Myers', pack: '28 tablets' },

    // Diabetes Management
    { id: 16, name: 'Metformin 500mg', category: 'Diabetes', price: 3200, description: 'Type 2 diabetes medication', inStock: true, prescription: true, rating: 4.6, brand: 'Merck', pack: '28 tablets' },
    { id: 17, name: 'Metformin 850mg', category: 'Diabetes', price: 4200, description: 'High-strength diabetes medication', inStock: true, prescription: true, rating: 4.5, brand: 'Merck', pack: '28 tablets' },
    { id: 18, name: 'Gliclazide 80mg', category: 'Diabetes', price: 3800, description: 'Sulfonylurea for diabetes', inStock: true, prescription: true, rating: 4.3, brand: 'Servier', pack: '28 tablets' },
    { id: 19, name: 'Insulin Glargine', category: 'Diabetes', price: 12000, description: 'Long-acting insulin', inStock: true, prescription: true, rating: 4.8, brand: 'Sanofi', pack: '5 pens' },
    { id: 20, name: 'Glucometer Kit', category: 'Diabetes', price: 8500, description: 'Blood glucose monitoring kit', inStock: true, prescription: false, rating: 4.7, brand: 'Accu-Chek', pack: '1 kit + 50 strips' },

    // Vitamins & Supplements
    { id: 21, name: 'Vitamin C 1000mg', category: 'Supplements', price: 3500, description: 'Immune system support', inStock: true, prescription: false, rating: 4.5, brand: 'Nature\'s Bounty', pack: '60 tablets' },
    { id: 22, name: 'Vitamin D3 1000IU', category: 'Supplements', price: 4200, description: 'Bone health support', inStock: true, prescription: false, rating: 4.6, brand: 'Solgar', pack: '90 tablets' },
    { id: 23, name: 'Multivitamin Complex', category: 'Supplements', price: 5800, description: 'Complete daily nutrition', inStock: true, prescription: false, rating: 4.4, brand: 'Centrum', pack: '60 tablets' },
    { id: 24, name: 'Omega-3 Fish Oil', category: 'Supplements', price: 6500, description: 'Heart and brain health', inStock: true, prescription: false, rating: 4.7, brand: 'Nordic Naturals', pack: '60 capsules' },
    { id: 25, name: 'Calcium + Magnesium', category: 'Supplements', price: 4800, description: 'Bone strength formula', inStock: true, prescription: false, rating: 4.3, brand: 'Nature Made', pack: '100 tablets' },

    // Respiratory
    { id: 26, name: 'Salbutamol Inhaler', category: 'Respiratory', price: 8500, description: 'Asthma relief inhaler', inStock: true, prescription: true, rating: 4.8, brand: 'GSK', pack: '200 doses' },
    { id: 27, name: 'Prednisolone 5mg', category: 'Respiratory', price: 2400, description: 'Corticosteroid for inflammation', inStock: true, prescription: true, rating: 4.2, brand: 'Pfizer', pack: '28 tablets' },
    { id: 28, name: 'Montelukast 10mg', category: 'Respiratory', price: 6800, description: 'Asthma and allergy control', inStock: true, prescription: true, rating: 4.5, brand: 'Merck', pack: '28 tablets' },
    { id: 29, name: 'Cetirizine 10mg', category: 'Respiratory', price: 1800, description: 'Antihistamine for allergies', inStock: true, prescription: false, rating: 4.6, brand: 'UCB', pack: '30 tablets' },
    { id: 30, name: 'Loratadine 10mg', category: 'Respiratory', price: 2200, description: 'Non-drowsy allergy relief', inStock: true, prescription: false, rating: 4.4, brand: 'Schering-Plough', pack: '30 tablets' },

    // Gastrointestinal
    { id: 31, name: 'Omeprazole 20mg', category: 'Gastrointestinal', price: 3200, description: 'Proton pump inhibitor for acid reflux', inStock: true, prescription: false, rating: 4.7, brand: 'AstraZeneca', pack: '28 capsules' },
    { id: 32, name: 'Loperamide 2mg', category: 'Gastrointestinal', price: 1800, description: 'Anti-diarrheal medication', inStock: true, prescription: false, rating: 4.3, brand: 'Janssen', pack: '20 capsules' },
    { id: 33, name: 'Simethicone 40mg', category: 'Gastrointestinal', price: 2400, description: 'Gas and bloating relief', inStock: true, prescription: false, rating: 4.2, brand: 'Pfizer', pack: '30 tablets' },
    { id: 34, name: 'Probiotics Complex', category: 'Gastrointestinal', price: 7200, description: 'Digestive health support', inStock: true, prescription: false, rating: 4.5, brand: 'Culturelle', pack: '30 capsules' },
    { id: 35, name: 'Metoclopramide 10mg', category: 'Gastrointestinal', price: 2800, description: 'Anti-nausea medication', inStock: true, prescription: true, rating: 4.1, brand: 'Teva', pack: '30 tablets' },

    // Mental Health
    { id: 36, name: 'Sertraline 50mg', category: 'Mental Health', price: 4800, description: 'SSRI antidepressant', inStock: true, prescription: true, rating: 4.3, brand: 'Pfizer', pack: '28 tablets' },
    { id: 37, name: 'Lorazepam 1mg', category: 'Mental Health', price: 3200, description: 'Anxiety relief medication', inStock: true, prescription: true, rating: 4.2, brand: 'Pfizer', pack: '30 tablets' },
    { id: 38, name: 'Melatonin 3mg', category: 'Mental Health', price: 3800, description: 'Natural sleep aid', inStock: true, prescription: false, rating: 4.4, brand: 'Nature Made', pack: '60 tablets' },
    { id: 39, name: 'St. John\'s Wort', category: 'Mental Health', price: 4200, description: 'Natural mood support', inStock: true, prescription: false, rating: 4.1, brand: 'Nature\'s Way', pack: '90 capsules' },

    // Skin Care & Dermatology
    { id: 40, name: 'Hydrocortisone Cream 1%', category: 'Dermatology', price: 2800, description: 'Topical anti-inflammatory', inStock: true, prescription: false, rating: 4.5, brand: 'Johnson & Johnson', pack: '30g tube' },
    { id: 41, name: 'Clotrimazole Cream 1%', category: 'Dermatology', price: 3200, description: 'Antifungal cream', inStock: true, prescription: false, rating: 4.4, brand: 'Bayer', pack: '20g tube' },
    { id: 42, name: 'Acne Treatment Gel', category: 'Dermatology', price: 4500, description: 'Benzoyl peroxide acne treatment', inStock: true, prescription: false, rating: 4.3, brand: 'Neutrogena', pack: '50ml tube' },
    { id: 43, name: 'Sunscreen SPF 50+', category: 'Dermatology', price: 3800, description: 'Broad spectrum sun protection', inStock: true, prescription: false, rating: 4.6, brand: 'La Roche-Posay', pack: '50ml bottle' },

    // Women's Health
    { id: 44, name: 'Folic Acid 5mg', category: 'Women\'s Health', price: 2200, description: 'Essential for pregnancy', inStock: true, prescription: false, rating: 4.7, brand: 'Nature Made', pack: '90 tablets' },
    { id: 45, name: 'Iron Supplement', category: 'Women\'s Health', price: 3200, description: 'Iron deficiency treatment', inStock: true, prescription: false, rating: 4.2, brand: 'Feroglobin', pack: '30 capsules' },
    { id: 46, name: 'Cranberry Extract', category: 'Women\'s Health', price: 4800, description: 'Urinary tract health', inStock: true, prescription: false, rating: 4.4, brand: 'Nature\'s Bounty', pack: '60 capsules' },

    // Men's Health
    { id: 47, name: 'Saw Palmetto Extract', category: 'Men\'s Health', price: 5200, description: 'Prostate health support', inStock: true, prescription: false, rating: 4.3, brand: 'Nature Made', pack: '60 capsules' },
    { id: 48, name: 'Testosterone Booster', category: 'Men\'s Health', price: 7800, description: 'Natural testosterone support', inStock: true, prescription: false, rating: 4.1, brand: 'MuscleTech', pack: '60 tablets' },

    // Eye Care
    { id: 49, name: 'Artificial Tears', category: 'Eye Care', price: 2800, description: 'Dry eye relief drops', inStock: true, prescription: false, rating: 4.5, brand: 'Systane', pack: '15ml bottle' },
    { id: 50, name: 'Antibiotic Eye Drops', category: 'Eye Care', price: 4200, description: 'Bacterial eye infection treatment', inStock: true, prescription: true, rating: 4.4, brand: 'Bausch & Lomb', pack: '5ml bottle' },
  ];

  const categories = ['All', 'Pain Relief', 'Antibiotics', 'Cardiovascular', 'Diabetes', 'Supplements', 'Respiratory', 'Gastrointestinal', 'Mental Health', 'Dermatology', 'Women\'s Health', 'Men\'s Health', 'Eye Care'];

  const filteredMedications = medications
    .filter(med => 
      (selectedCategory === 'All' || med.category === selectedCategory) &&
      (med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       med.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
       med.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return a.name.localeCompare(b.name);
      }
    });

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
              Order genuine medicines and health products with same-day delivery
            </p>
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
                className="px-4 py-2 border rounded-lg"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <Button className="bg-green-600 hover:bg-green-700">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedications.map((medication) => (
              <Card key={medication.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">{medication.category}</Badge>
                    {medication.prescription && (
                      <Badge className="bg-red-100 text-red-800 text-xs">
                        Rx Required
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight">{medication.name}</CardTitle>
                  <p className="text-sm text-gray-600 mb-2">{medication.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{medication.brand}</span>
                    <span>{medication.pack}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">{medication.rating}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xl font-bold text-green-600">
                      ₦{medication.price.toLocaleString()}
                    </div>
                    <div className={`text-sm ${medication.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {medication.inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>
                  
                  {medication.inStock ? (
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
                          <span className="w-8 text-center text-sm">{cart[medication.id] || 0}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateCart(medication.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => updateCart(medication.id, 1)}
                      >
                        Add to Cart
                      </Button>
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
