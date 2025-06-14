
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calculator, TrendingUp, Phone, Mail, FileText } from 'lucide-react';
import { InsuranceQuote, insuranceBrokerService } from '@/services/InsuranceBrokerService';

interface QuoteComparisonProps {
  quotes: InsuranceQuote[];
  onSelectQuote: (quote: InsuranceQuote) => void;
}

const QuoteComparison = ({ quotes, onSelectQuote }: QuoteComparisonProps) => {
  const [loadingQuoteId, setLoadingQuoteId] = useState<string | null>(null);

  const handleSelectQuote = async (quote: InsuranceQuote) => {
    setLoadingQuoteId(quote.id);
    
    // Track this as a potential commission
    await insuranceBrokerService.trackCommission(quote);
    
    onSelectQuote(quote);
    setLoadingQuoteId(null);
  };

  if (quotes.length === 0) {
    return (
      <Card className="text-center p-8">
        <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Get Real-Time Quotes</h3>
        <p className="text-gray-600">Enter your information to receive personalized quotes from multiple insurers</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Insurance Quotes Comparison</h2>
        <Badge variant="secondary" className="flex items-center">
          <TrendingUp className="h-4 w-4 mr-1" />
          {quotes.length} Quotes Available
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotes.map((quote) => (
          <Card key={quote.id} className="relative overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{quote.insurerName}</CardTitle>
                <Badge 
                  variant={quote.status === 'approved' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {quote.status}
                </Badge>
              </div>
              <div className="text-3xl font-bold text-teal-600">
                ₦{quote.premium.toLocaleString()}/month
              </div>
              <div className="text-sm text-gray-600">
                Coverage: {quote.coverage}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Features Included:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {quote.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Your Commission:</span>
                <span className="font-semibold text-green-600">
                  ₦{quote.commission.toLocaleString()} ({(quote.commissionRate * 100).toFixed(1)}%)
                </span>
              </div>

              <div className="text-xs text-gray-500">
                Valid until: {new Date(quote.validUntil).toLocaleDateString()}
              </div>

              <Button 
                className="w-full bg-teal-600 hover:bg-teal-700"
                onClick={() => handleSelectQuote(quote)}
                disabled={loadingQuoteId === quote.id}
              >
                {loadingQuoteId === quote.id ? 'Processing...' : 'Select This Quote'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-2">Ready for Real API Integration</h3>
              <p className="text-sm text-blue-800 mb-3">
                This comparison system is ready to connect with actual insurer APIs. Once you get API access, 
                quotes will be fetched in real-time from multiple insurers.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-blue-700 border-blue-300">Real-time Quotes</Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300">Commission Tracking</Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300">Multi-Insurer</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuoteComparison;
