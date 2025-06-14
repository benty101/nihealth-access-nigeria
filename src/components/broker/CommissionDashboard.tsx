
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Download
} from 'lucide-react';

interface CommissionSummary {
  totalEarned: number;
  totalPending: number;
  totalPaid: number;
  thisMonth: number;
  lastMonth: number;
  growthRate: number;
}

interface CommissionRecord {
  id: string;
  insurerName: string;
  policyNumber: string;
  clientName: string;
  amount: number;
  rate: number;
  status: 'pending' | 'paid' | 'overdue';
  dateEarned: string;
  datePaid?: string;
}

const CommissionDashboard = () => {
  const [summary, setSummary] = useState<CommissionSummary>({
    totalEarned: 2450000,
    totalPending: 890000,
    totalPaid: 1560000,
    thisMonth: 450000,
    lastMonth: 380000,
    growthRate: 18.4
  });

  const [commissions] = useState<CommissionRecord[]>([
    {
      id: '1',
      insurerName: 'AIICO Insurance',
      policyNumber: 'AIC-2024-001',
      clientName: 'Sarah Johnson',
      amount: 75000,
      rate: 15,
      status: 'paid',
      dateEarned: '2024-06-01',
      datePaid: '2024-06-15'
    },
    {
      id: '2',
      insurerName: 'AXA Mansard',
      policyNumber: 'AXA-2024-023',
      clientName: 'Michael Chen',
      amount: 95000,
      rate: 12,
      status: 'pending',
      dateEarned: '2024-06-10'
    },
    {
      id: '3',
      insurerName: 'Leadway Assurance',
      policyNumber: 'LEA-2024-045',
      clientName: 'Ada Okafor',
      amount: 120000,
      rate: 18,
      status: 'overdue',
      dateEarned: '2024-05-20'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'overdue': return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Commission Dashboard</h1>
        <Button variant="outline" className="flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earned</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₦{summary.totalEarned.toLocaleString()}
                </p>
              </div>
              <div className="bg-teal-100 p-2 rounded-lg">
                <DollarSign className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  ₦{summary.totalPending.toLocaleString()}
                </p>
              </div>
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-green-600">
                  ₦{summary.thisMonth.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                <p className="text-2xl font-bold text-blue-600">
                  +{summary.growthRate}%
                </p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commission Records */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Commissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="space-y-4">
                {commissions.map((commission) => (
                  <div key={commission.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(commission.status)}
                      <div>
                        <p className="font-semibold text-gray-900">{commission.clientName}</p>
                        <p className="text-sm text-gray-600">
                          {commission.insurerName} • {commission.policyNumber}
                        </p>
                        <p className="text-xs text-gray-500">
                          Earned: {new Date(commission.dateEarned).toLocaleDateString()}
                          {commission.datePaid && ` • Paid: ${new Date(commission.datePaid).toLocaleDateString()}`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ₦{commission.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">{commission.rate}% rate</p>
                      <Badge className={`mt-1 ${getStatusColor(commission.status)}`}>
                        {commission.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="space-y-4">
                {commissions.filter(c => c.status === 'pending').map((commission) => (
                  <div key={commission.id} className="flex items-center justify-between p-4 border rounded-lg">
                    {/* Same content structure as above */}
                    <div className="flex items-center space-x-4">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{commission.clientName}</p>
                        <p className="text-sm text-gray-600">{commission.insurerName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">₦{commission.amount.toLocaleString()}</p>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="paid">
              <div className="space-y-4">
                {commissions.filter(c => c.status === 'paid').map((commission) => (
                  <div key={commission.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{commission.clientName}</p>
                        <p className="text-sm text-gray-600">{commission.insurerName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">₦{commission.amount.toLocaleString()}</p>
                      <Badge className="bg-green-100 text-green-800">Paid</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="overdue">
              <div className="space-y-4">
                {commissions.filter(c => c.status === 'overdue').map((commission) => (
                  <div key={commission.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{commission.clientName}</p>
                        <p className="text-sm text-gray-600">{commission.insurerName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">₦{commission.amount.toLocaleString()}</p>
                      <Badge className="bg-red-100 text-red-800">Overdue</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommissionDashboard;
