
import React, { useState } from 'react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Users, DollarSign, Phone } from 'lucide-react';
import QuoteComparison from '@/components/broker/QuoteComparison';
import CommissionDashboard from '@/components/broker/CommissionDashboard';
import InsurerContacts from '@/components/broker/InsurerContacts';
import { insuranceBrokerService, InsuranceQuoteRequest, InsuranceQuote } from '@/services/InsuranceBrokerService';

const BrokerDashboard = () => {
  const [quotes, setQuotes] = useState<InsuranceQuote[]>([]);
  const [loadingQuotes, setLoadingQuotes] = useState(false);
  const [quoteRequest, setQuoteRequest] = useState<Partial<InsuranceQuoteRequest>>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      age: 30,
      gender: 'female',
      state: 'Lagos'
    },
    coverageType: 'individual',
    coverageAmount: 1000000
  });

  const handleGetQuotes = async () => {
    if (!quoteRequest.personalInfo?.fullName || !quoteRequest.personalInfo?.email) {
      alert('Please fill in all required fields');
      return;
    }

    setLoadingQuotes(true);
    try {
      const allQuotes = await insuranceBrokerService.getQuotesFromAllInsurers(quoteRequest as InsuranceQuoteRequest);
      setQuotes(allQuotes);
    } catch (error) {
      console.error('Error getting quotes:', error);
    } finally {
      setLoadingQuotes(false);
    }
  };

  const handleSelectQuote = (quote: InsuranceQuote) => {
    console.log('Quote selected:', quote);
    // Here you would typically navigate to a detailed enrollment page
    alert(`Quote selected from ${quote.insurerName}. Commission: ₦${quote.commission.toLocaleString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ContextualNavbar />
      
      <div className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Insurance Broker Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manage your insurance brokerage business with real-time quotes, commission tracking, and insurer integrations.
            </p>
          </div>

          <Tabs defaultValue="quotes" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="quotes" className="flex items-center">
                <Calculator className="h-4 w-4 mr-2" />
                Get Quotes
              </TabsTrigger>
              <TabsTrigger value="commissions" className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Commissions
              </TabsTrigger>
              <TabsTrigger value="insurers" className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Insurer Contacts
              </TabsTrigger>
              <TabsTrigger value="clients" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Client Management
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quotes" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quote Request Form */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Get Insurance Quotes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={quoteRequest.personalInfo?.fullName || ''}
                        onChange={(e) => setQuoteRequest(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo!, fullName: e.target.value }
                        }))}
                        placeholder="Enter full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={quoteRequest.personalInfo?.email || ''}
                        onChange={(e) => setQuoteRequest(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo!, email: e.target.value }
                        }))}
                        placeholder="Enter email address"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={quoteRequest.personalInfo?.phone || ''}
                        onChange={(e) => setQuoteRequest(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo!, phone: e.target.value }
                        }))}
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        min="18"
                        max="80"
                        value={quoteRequest.personalInfo?.age || ''}
                        onChange={(e) => setQuoteRequest(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo!, age: parseInt(e.target.value) }
                        }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="coverage">Coverage Amount</Label>
                      <Select 
                        value={quoteRequest.coverageAmount?.toString()}
                        onValueChange={(value) => setQuoteRequest(prev => ({
                          ...prev,
                          coverageAmount: parseInt(value)
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select coverage amount" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="500000">₦500,000</SelectItem>
                          <SelectItem value="1000000">₦1,000,000</SelectItem>
                          <SelectItem value="2000000">₦2,000,000</SelectItem>
                          <SelectItem value="5000000">₦5,000,000</SelectItem>
                          <SelectItem value="10000000">₦10,000,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      onClick={handleGetQuotes}
                      className="w-full bg-teal-600 hover:bg-teal-700"
                      disabled={loadingQuotes}
                    >
                      {loadingQuotes ? 'Getting Quotes...' : 'Get Quotes from All Insurers'}
                    </Button>
                  </CardContent>
                </Card>

                {/* Quote Results */}
                <div className="lg:col-span-2">
                  <QuoteComparison 
                    quotes={quotes}
                    onSelectQuote={handleSelectQuote}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="commissions">
              <CommissionDashboard />
            </TabsContent>

            <TabsContent value="insurers">
              <InsurerContacts />
            </TabsContent>

            <TabsContent value="clients">
              <Card>
                <CardHeader>
                  <CardTitle>Client Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Client management system coming soon. This will include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Client database with contact information</li>
                    <li>Policy tracking and renewal reminders</li>
                    <li>Communication history</li>
                    <li>Claims assistance tracking</li>
                    <li>Client satisfaction surveys</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default BrokerDashboard;
