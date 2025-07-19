import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Package, Pill, TestTube, Search, Eye, Download, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const medicationOrders = [
    {
      id: 'MED-2024-001',
      type: 'medication',
      date: '2024-01-18',
      status: 'processing',
      total: 45000,
      pharmacy: 'HealthPlus Pharmacy',
      items: ['Paracetamol 500mg x 20', 'Amoxicillin 250mg x 12'],
      estimatedDelivery: '2024-01-20'
    },
    {
      id: 'MED-2024-002',
      type: 'medication',
      date: '2024-01-15',
      status: 'delivered',
      total: 28500,
      pharmacy: 'Alpha Pharmacy',
      items: ['Vitamin D3 x 30', 'Multivitamin x 60'],
      deliveredDate: '2024-01-17'
    }
  ];

  const labOrders = [
    {
      id: 'LAB-2024-001',
      type: 'lab',
      date: '2024-01-19',
      status: 'results_ready',
      total: 25000,
      lab: 'Lagos Diagnostic Centre',
      items: ['Full Blood Count', 'Lipid Profile'],
      collectionDate: '2024-01-19'
    },
    {
      id: 'LAB-2024-002',
      type: 'lab',
      date: '2024-01-12',
      status: 'completed',
      total: 18500,
      lab: 'Synlab Nigeria',
      items: ['Malaria Test', 'Blood Sugar'],
      collectionDate: '2024-01-12'
    }
  ];

  const allOrders = [...medicationOrders, ...labOrders].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'results_ready': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing': return 'Processing';
      case 'shipped': return 'Shipped';
      case 'delivered': return 'Delivered';
      case 'results_ready': return 'Results Ready';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const handleViewOrder = (orderId: string, type: string) => {
    navigate(`/orders/${orderId}`);
  };

  const handleDownloadResults = (orderId: string) => {
    toast({
      title: "Downloading Results",
      description: "Your lab results are being prepared for download.",
    });
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Lab results have been downloaded successfully.",
      });
    }, 2000);
  };

  const handleTrackOrder = (orderId: string) => {
    navigate(`/orders/${orderId}/track`);
  };

  const filteredOrders = (orders: any[]) => 
    orders.filter(order =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.pharmacy && order.pharmacy.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.lab && order.lab.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const OrderCard = ({ order }: { order: any }) => {
    const isLabOrder = order.type === 'lab';
    const Icon = isLabOrder ? TestTube : Pill;
    
    return (
      <Card key={order.id}>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 ${isLabOrder ? 'bg-purple-100' : 'bg-green-100'} rounded-lg flex items-center justify-center`}>
                <Icon className={`h-6 w-6 ${isLabOrder ? 'text-purple-600' : 'text-green-600'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{order.id}</h3>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusText(order.status)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {isLabOrder ? order.lab : order.pharmacy}
                </p>
                <div className="space-y-1">
                  {order.items.map((item: string, index: number) => (
                    <p key={index} className="text-sm text-gray-500">• {item}</p>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-gray-600">
                    Ordered: {new Date(order.date).toLocaleDateString()}
                  </span>
                  <span className="font-semibold text-teal-600">
                    ₦{order.total.toLocaleString()}
                  </span>
                </div>
                {order.estimatedDelivery && (
                  <p className="text-sm text-blue-600 mt-1">
                    Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </p>
                )}
                {order.deliveredDate && (
                  <p className="text-sm text-green-600 mt-1">
                    Delivered: {new Date(order.deliveredDate).toLocaleDateString()}
                  </p>
                )}
                {order.collectionDate && (
                  <p className="text-sm text-gray-600 mt-1">
                    Sample Collected: {new Date(order.collectionDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewOrder(order.id, order.type)}
                className="w-full sm:w-auto"
              >
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Button>
              {order.status === 'results_ready' && (
                <Button
                  size="sm"
                  onClick={() => handleDownloadResults(order.id)}
                  className="w-full sm:w-auto"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download Results
                </Button>
              )}
              {order.type === 'medication' && ['processing', 'shipped'].includes(order.status) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTrackOrder(order.id)}
                  className="w-full sm:w-auto"
                >
                  <Truck className="h-4 w-4 mr-1" />
                  Track Order
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <PageLayout title="My Orders" showBreadcrumbs={true}>
      <div className="space-y-6">
        {/* Header with Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="lab-tests">Lab Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredOrders(allOrders).length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Found</h3>
                  <p className="text-gray-600 text-center">You haven't placed any orders yet.</p>
                </CardContent>
              </Card>
            ) : (
              filteredOrders(allOrders).map(order => <OrderCard key={order.id} order={order} />)
            )}
          </TabsContent>

          <TabsContent value="medications" className="space-y-4">
            {filteredOrders(medicationOrders).length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Pill className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Medication Orders</h3>
                  <p className="text-gray-600 text-center">You haven't ordered any medications yet.</p>
                </CardContent>
              </Card>
            ) : (
              filteredOrders(medicationOrders).map(order => <OrderCard key={order.id} order={order} />)
            )}
          </TabsContent>

          <TabsContent value="lab-tests" className="space-y-4">
            {filteredOrders(labOrders).length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <TestTube className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Lab Test Orders</h3>
                  <p className="text-gray-600 text-center">You haven't booked any lab tests yet.</p>
                </CardContent>
              </Card>
            ) : (
              filteredOrders(labOrders).map(order => <OrderCard key={order.id} order={order} />)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default MyOrders;