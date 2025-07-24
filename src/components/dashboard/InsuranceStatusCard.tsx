
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Calendar, AlertCircle, CheckCircle, Clock, Plus } from 'lucide-react';
import { insurancePurchaseService } from '@/services/InsurancePurchaseService';
import { format, isAfter, isBefore, addDays } from 'date-fns';
import { Link } from 'react-router-dom';

const InsuranceStatusCard = () => {
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

  const activePurchases = purchases.filter(p => p.status === 'active');
  const upcomingRenewals = activePurchases.filter(p => isExpiringSoon(p.end_date));

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-teal-600" />
            Insurance Coverage
          </div>
          <Link to="/insurance">
            <Button size="sm" variant="outline" className="text-xs">
              <Plus className="h-3 w-3 mr-1" />
              Browse Plans
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activePurchases.length === 0 ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-orange-50 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-red-200">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="font-semibold text-red-700 mb-1">⚠️ You're Unprotected!</h3>
            <p className="text-sm text-gray-600 mb-3">
              Medical emergencies can cost ₦500k-₦2M+. 
              <br />
              <span className="font-medium text-red-600">Don't risk your family's future!</span>
            </p>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg mb-3 border border-green-200">
              <p className="text-xs text-green-700 font-medium">💡 Smart Recommendation</p>
              <p className="text-xs text-green-600">Start with basic coverage for as low as ₦8,000/year</p>
            </div>
            <Link to="/insurance">
              <Button className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg">
                🛡️ Get Protected Now
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Active Coverage Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{activePurchases.length}</div>
                <div className="text-xs text-green-700">Active Plans</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{upcomingRenewals.length}</div>
                <div className="text-xs text-yellow-700">Need Renewal</div>
              </div>
            </div>

            {/* Latest Active Plan */}
            {activePurchases.length > 0 && (
              <div className="border rounded-lg p-3 bg-gradient-to-r from-teal-50 to-emerald-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm truncate">
                    {activePurchases[0].insurance_plans?.name || 'Insurance Plan'}
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    Active
                  </Badge>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>Provider: {activePurchases[0].insurance_plans?.provider}</div>
                  <div>
                    Expires: {format(new Date(activePurchases[0].end_date), 'MMM dd, yyyy')}
                  </div>
                </div>
              </div>
            )}

            {/* Renewal Alerts */}
            {upcomingRenewals.length > 0 && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">
                    Renewal Required
                  </span>
                </div>
                <p className="text-xs text-yellow-700 mb-2">
                  {upcomingRenewals.length} plan(s) expiring soon
                </p>
                <Button size="sm" variant="outline" className="text-xs">
                  Renew Now
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default InsuranceStatusCard;
