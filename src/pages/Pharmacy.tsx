
import React, { useState, useEffect } from 'react';
import StandardPageLayout from '@/components/layout/StandardPageLayout';
import BackButton from '@/components/navigation/BackButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  ShoppingCart, 
  Filter,
  Package,
  Clock,
  Pill,
  Star,
  Heart,
  AlertTriangle
} from 'lucide-react';
import UserGuidance from '@/components/onboarding/UserGuidance';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';
import OrderManagement from '@/components/pharmacy/OrderManagement';
import MedicationReminders from '@/components/pharmacy/MedicationReminders';
import { medicationService } from '@/services/MedicationService';
import { pharmacyService } from '@/services/PharmacyService';
import { useAuth } from '@/contexts/AuthContext';
import CheckoutModal from '@/components/pharmacy/CheckoutModal';
import { useToast } from '@/hooks/use-toast';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 12;

const Pharmacy = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [medications, setMedications] = useState<any[]>([]);
  const [pharmacies, setPharmacies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPharmacy, setSelectedPharmacy] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [cart, setCart] = useState<any[]>([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategory, selectedPharmacy, sortBy]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [medicationsData, pharmaciesData] = await Promise.all([
        medicationService.getActiveMedications(),
        pharmacyService.getActivePharmacies()
      ]);
      setMedications(medicationsData);
      setPharmacies(pharmaciesData);
    } catch (error) {
      console.error('Error loading pharmacy data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = ['all', ...new Set(medications.map(med => med.category))];

  // Filter and sort medications
  const filteredMedications = medications
    .filter(med => {
      const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           med.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           med.active_ingredient?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || med.category === selectedCategory;
      const matchesPharmacy = selectedPharmacy === 'all' || med.pharmacy_id === selectedPharmacy;
      
      return matchesSearch && matchesCategory && matchesPharmacy;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // Pagination calculations
  const totalPages = Math.ceil(filteredMedications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMedications = filteredMedications.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const addToCart = (medication: any) => {
    const existingItem = cart.find(item => item.id === medication.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === medication.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...medication, quantity: 1 }]);
    }
  };

  const removeFromCart = (medicationId: string) => {
    setCart(cart.filter(item => item.id !== medicationId));
  };

  const updateCartQuantity = (medicationId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(medicationId);
    } else {
      setCart(cart.map(item =>
        item.id === medicationId ? { ...item, quantity } : item
      ));
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout",
        variant: "destructive",
      });
      return;
    }
    setShowCheckoutModal(true);
  };

  const handleOrderSuccess = (orderId: string) => {
    setCart([]); // Clear cart
    toast({
      title: "Order Placed Successfully",
      description: `Your order has been created successfully!`,
    });
  };

  const MedicationCard = ({ medication }: { medication: any }) => {
    const isInCart = cart.some(item => item.id === medication.id);
    const cartItem = cart.find(item => item.id === medication.id);

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{medication.name}</h3>
              {medication.brand && (
                <p className="text-sm text-gray-600">Brand: {medication.brand}</p>
              )}
              {medication.generic_name && medication.generic_name !== medication.name && (
                <p className="text-sm text-gray-500">Generic: {medication.generic_name}</p>
              )}
            </div>
            <div className="text-right">
              <p className="font-bold text-xl text-teal-600">₦{medication.price.toLocaleString()}</p>
              {medication.pack_size && (
                <p className="text-sm text-gray-500">{medication.pack_size}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 mb-3">
            <Badge variant="outline" className="mr-2">{medication.category}</Badge>
            {medication.prescription_required && (
              <Badge variant="destructive" className="mr-2">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Prescription Required
              </Badge>
            )}
            {medication.strength && (
              <Badge variant="secondary">{medication.strength}</Badge>
            )}
          </div>

          {medication.description && (
            <p className="text-sm text-gray-700 mb-3 line-clamp-2">
              {medication.description}
            </p>
          )}

          {medication.indication && (
            <div className="mb-3">
              <p className="text-xs font-medium text-gray-600">Indication:</p>
              <p className="text-sm text-gray-700">{medication.indication}</p>
            </div>
          )}

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {medication.rating && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm">{medication.rating}</span>
                </div>
              )}
              <Badge className={medication.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {medication.in_stock ? 'In Stock' : 'Out of Stock'}
              </Badge>
            </div>
            {medication.manufacturer && (
              <p className="text-xs text-gray-500">{medication.manufacturer}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            {isInCart ? (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateCartQuantity(medication.id, (cartItem?.quantity || 1) - 1)}
                >
                  -
                </Button>
                <span className="mx-2">{cartItem?.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateCartQuantity(medication.id, (cartItem?.quantity || 1) + 1)}
                >
                  +
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => addToCart(medication)}
                disabled={!medication.in_stock}
                className="bg-teal-600 hover:bg-teal-700"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            )}
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const PaginationComponent = () => {
    const renderPageNumbers = () => {
      const pages = [];
      const showEllipsis = totalPages > 7;
      
      if (!showEllipsis) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setCurrentPage(i)}
                isActive={currentPage === i}
                className="cursor-pointer"
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      } else {
        // Show first page
        pages.push(
          <PaginationItem key={1}>
            <PaginationLink
              onClick={() => setCurrentPage(1)}
              isActive={currentPage === 1}
              className="cursor-pointer"
            >
              1
            </PaginationLink>
          </PaginationItem>
        );

        // Show ellipsis if current page is far from start
        if (currentPage > 3) {
          pages.push(
            <PaginationItem key="ellipsis1">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }

        // Show pages around current page
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        
        for (let i = start; i <= end; i++) {
          pages.push(
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setCurrentPage(i)}
                isActive={currentPage === i}
                className="cursor-pointer"
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }

        // Show ellipsis if current page is far from end
        if (currentPage < totalPages - 2) {
          pages.push(
            <PaginationItem key="ellipsis2">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }

        // Show last page
        if (totalPages > 1) {
          pages.push(
            <PaginationItem key={totalPages}>
              <PaginationLink
                onClick={() => setCurrentPage(totalPages)}
                isActive={currentPage === totalPages}
                className="cursor-pointer"
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          );
        }
      }
      
      return pages;
    };

    return (
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {renderPageNumbers()}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <StandardPageLayout 
      title="MeddyPal Pharmacy" 
      subtitle="Your trusted online pharmacy for quality medications"
      backgroundVariant="gradient"
    >
      <div className="mb-6">
        <BackButton />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="shop" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="shop" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Shop
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              My Orders
            </TabsTrigger>
            <TabsTrigger value="reminders" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Reminders
            </TabsTrigger>
            <TabsTrigger value="prescriptions" className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              Prescriptions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shop" className="mt-6">
            {/* Search and Filter */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search medications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedPharmacy} onValueChange={setSelectedPharmacy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pharmacy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Pharmacies</SelectItem>
                      {pharmacies.map(pharmacy => (
                        <SelectItem key={pharmacy.id} value={pharmacy.id}>
                          {pharmacy.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Cart Summary */}
            {cart.length > 0 && (
              <Card className="mb-6 border-teal-200 bg-teal-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Cart ({cart.length} items)</h3>
                      <p className="text-teal-600">
                        Total: ₦{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
                      </p>
                    </div>
                    <Button 
                      onClick={handleCheckout}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results Summary */}
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredMedications.length)} of {filteredMedications.length} medications
              </p>
              <p className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </p>
            </div>

            {/* Medications Grid */}
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedMedications.map(medication => (
                    <MedicationCard key={medication.id} medication={medication} />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && <PaginationComponent />}
              </>
            )}

            {filteredMedications.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No medications found matching your criteria</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            {user ? (
              <OrderManagement />
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-medium mb-2">Sign in to view orders</h3>
                  <p className="text-gray-600">Please sign in to access your order history</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reminders" className="mt-6">
            {user ? (
              <MedicationReminders />
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-medium mb-2">Sign in to manage reminders</h3>
                  <p className="text-gray-600">Please sign in to set up medication reminders</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="prescriptions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Prescription Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Upload your prescriptions for prescription medications. Our pharmacists will verify them before processing your order.
                </p>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  Upload Prescription
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        cartItems={cart}
        onOrderSuccess={handleOrderSuccess}
      />

      <FloatingEmergencyButton />
    </StandardPageLayout>
  );
};

export default Pharmacy;
