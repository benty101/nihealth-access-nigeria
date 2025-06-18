import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { insurancePurchaseService } from '@/services/InsurancePurchaseService';
import { format, isAfter, isBefore, addDays } from 'date-fns';

const UserInsuranceStatus = () => {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPurchases();
  }, []);

  const loadPurchases = async () => {
    try {
      const data = await insurancePurchaseService.getUserPurchases();
      setPurchases(data);
    } catch (error) {
      console.error('Error loading purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'expired':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isExpiringSoon = (endDate: string) => {
    const end = new Date(endDate);
    const thirtyDaysFromNow = addDays(new Date(), 30);
    return isAfter(end, new Date()) && isBefore(end, thirtyDaysFromNow);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (purchases.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Your Insurance Coverage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Insurance Coverage</h3>
            <p className="text-gray-600 mb-4">
              You don't have any active insurance plans. Browse our plans to get protected.
            </p>
            <Button className="bg-teal-600 hover:bg-teal-700">
              Browse Insurance Plans
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Shield className="h-5 w-5" />
        Your Insurance Coverage
      </h2>
      
      {purchases.map((purchase) => (
        <Card key={purchase.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {purchase.insurance_plans?.name || 'Insurance Plan'}
              </CardTitle>
              <div className="flex items-center gap-2">
                {getStatusIcon(purchase.status)}
                <Badge className={getStatusColor(purchase.status)}>
                  {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Provider</p>
                <p className="font-medium">{purchase.insurance_plans?.provider}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Policy Number</p>
                <p className="font-medium">{purchase.policy_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Coverage Period</p>
                <p className="font-medium">
                  {format(new Date(purchase.start_date), 'MMM dd, yyyy')} - {format(new Date(purchase.end_date), 'MMM dd, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Premium</p>
                <p className="font-medium">₦{purchase.premium_amount.toLocaleString()}</p>
              </div>
            </div>

            {/* Expiration Warning */}
            {purchase.status === 'active' && isExpiringSoon(purchase.end_date) && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">
                    Your insurance expires on {format(new Date(purchase.end_date), 'MMM dd, yyyy')}
                  </span>
                </div>
                <Button size="sm" className="mt-2" variant="outline">
                  Renew Now
                </Button>
              </div>
            )}

            {/* Coverage Details */}
            {purchase.insurance_plans?.features && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Coverage Features:</p>
                <div className="flex flex-wrap gap-1">
                  {purchase.insurance_plans.features.map((feature: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserInsuranceStatus;
