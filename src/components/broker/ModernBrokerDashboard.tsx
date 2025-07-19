import React, { useState } from 'react';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar 
} from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calculator, 
  Users, 
  DollarSign, 
  Phone,
  TrendingUp,
  Clock,
  Briefcase,
  PieChart
} from 'lucide-react';
import QuoteComparison from './QuoteComparison';
import CommissionDashboard from './CommissionDashboard';
import InsurerContacts from './InsurerContacts';
import { insuranceBrokerService, InsuranceQuoteRequest, InsuranceQuote } from '@/services/InsuranceBrokerService';

const brokerMenuItems = [
  { 
    id: 'quotes', 
    title: 'Get Quotes', 
    icon: Calculator, 
    description: 'Generate insurance quotes'
  },
  { 
    id: 'commissions', 
    title: 'Commissions', 
    icon: DollarSign, 
    description: 'Track earnings & payments'
  },
  { 
    id: 'insurers', 
    title: 'Insurer Contacts', 
    icon: Phone, 
    description: 'Provider relationships'
  },
  { 
    id: 'clients', 
    title: 'Client Management', 
    icon: Users, 
    description: 'Customer relationships'
  }
];

interface BrokerSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BrokerSidebar = ({ activeTab, onTabChange }: BrokerSidebarProps) => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar className="border-r border-border/40">
      <SidebarContent className="bg-card">
        <div className="p-6 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-foreground">Broker Portal</h2>
                <p className="text-xs text-muted-foreground">Insurance Hub</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-6 py-4">
            Broker Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {brokerMenuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    className={`mx-3 rounded-lg transition-all duration-200 ${
                      activeTab === item.id 
                        ? 'bg-primary text-primary-foreground shadow-md' 
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <button onClick={() => onTabChange(item.id)} className="w-full">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && (
                        <div className="flex-1 text-left">
                          <span className="font-medium">{item.title}</span>
                          <p className="text-xs opacity-70">{item.description}</p>
                        </div>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

const BrokerHeader = () => {
  return (
    <div className="border-b border-border/40 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="hover:bg-muted/50" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Insurance Broker Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage your insurance brokerage business
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <span className="text-sm text-muted-foreground">
              Active Business
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModernBrokerDashboard = () => {
  const [activeTab, setActiveTab] = useState('quotes');
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
    alert(`Quote selected from ${quote.insurerName}. Commission: ₦${quote.commission.toLocaleString()}`);
  };

  const renderQuotesContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Quote Request Form */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Get Insurance Quotes
          </CardTitle>
          <CardDescription>
            Generate quotes from multiple insurers
          </CardDescription>
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
            className="w-full"
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
  );

  const renderClientContent = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Client Management
        </CardTitle>
        <CardDescription>
          Manage your client relationships and policies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Client management system coming soon. This will include:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Client database with contact information</li>
          <li>Policy tracking and renewal reminders</li>
          <li>Communication history</li>
          <li>Claims assistance tracking</li>
          <li>Client satisfaction surveys</li>
        </ul>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'quotes':
        return renderQuotesContent();
      case 'commissions':
        return <CommissionDashboard />;
      case 'insurers':
        return <InsurerContacts />;
      case 'clients':
        return renderClientContent();
      default:
        return renderQuotesContent();
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <BrokerSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <div className="flex-1 flex flex-col">
          <BrokerHeader />
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="animate-fade-in">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ModernBrokerDashboard;