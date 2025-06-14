
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Phone, 
  Mail, 
  ExternalLink, 
  Shield, 
  CheckCircle2, 
  Clock,
  FileText,
  Copy
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InsurerContact {
  id: string;
  name: string;
  logo?: string;
  status: 'integrated' | 'pending' | 'not_contacted';
  commissionRate: number;
  contacts: {
    partnershipEmail: string;
    phone: string;
    apiEmail?: string;
  };
  apiInfo: {
    hasAPI: boolean;
    documentation?: string;
    sandboxAvailable: boolean;
  };
  notes: string;
  lastContact?: string;
}

const InsurerContacts = () => {
  const { toast } = useToast();
  const [insurers] = useState<InsurerContact[]>([
    {
      id: 'aiico',
      name: 'AIICO Insurance',
      status: 'not_contacted',
      commissionRate: 15,
      contacts: {
        partnershipEmail: 'partnerships@aiico.com.ng',
        phone: '+234-1-2701030',
        apiEmail: 'developers@aiico.com.ng'
      },
      apiInfo: {
        hasAPI: true,
        documentation: 'https://developer.aiico.com.ng/docs',
        sandboxAvailable: true
      },
      notes: 'One of Nigeria\'s leading insurers. Known for good broker relationships.'
    },
    {
      id: 'axa',
      name: 'AXA Mansard Insurance',
      status: 'pending',
      commissionRate: 12,
      contacts: {
        partnershipEmail: 'brokers@axamansard.com',
        phone: '+234-1-2701807',
        apiEmail: 'api-support@axamansard.com'
      },
      apiInfo: {
        hasAPI: true,
        documentation: 'https://developer.axamansard.com',
        sandboxAvailable: true
      },
      notes: 'International brand with strong digital infrastructure. Good API documentation.',
      lastContact: '2024-06-10'
    },
    {
      id: 'leadway',
      name: 'Leadway Assurance',
      status: 'not_contacted',
      commissionRate: 18,
      contacts: {
        partnershipEmail: 'partnerships@leadway.com.ng',
        phone: '+234-1-2800200'
      },
      apiInfo: {
        hasAPI: false,
        sandboxAvailable: false
      },
      notes: 'High commission rates. May need to work with their internal team for integration.'
    },
    {
      id: 'hygeia',
      name: 'Hygeia HMO',
      status: 'not_contacted',
      commissionRate: 20,
      contacts: {
        partnershipEmail: 'brokers@hygeiahmo.com',
        phone: '+234-1-2914140',
        apiEmail: 'tech@hygeiahmo.com'
      },
      apiInfo: {
        hasAPI: true,
        documentation: 'https://api.hygeiahmo.com/docs',
        sandboxAvailable: true
      },
      notes: 'Specialized in HMO services. Excellent for corporate health plans.'
    },
    {
      id: 'cornerstone',
      name: 'Cornerstone Insurance',
      status: 'not_contacted',
      commissionRate: 14,
      contacts: {
        partnershipEmail: 'partnerships@cornerstone.com.ng',
        phone: '+234-1-2715100'
      },
      apiInfo: {
        hasAPI: false,
        sandboxAvailable: false
      },
      notes: 'Traditional insurer. May require manual integration initially.'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'integrated':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle2 className="h-3 w-3 mr-1" />Integrated</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="outline">Not Contacted</Badge>;
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const generateEmailTemplate = (insurer: InsurerContact) => {
    return `Subject: Partnership Opportunity - Health Insurance Broker Platform

Dear ${insurer.name} Partnership Team,

I hope this email finds you well. I am writing to explore a potential partnership opportunity between ${insurer.name} and our digital health insurance broker platform.

Our Platform:
- Digital health insurance marketplace focused on Nigerian market
- Specialized in maternal and family health insurance
- Growing customer base seeking reliable insurance solutions
- Modern, user-friendly platform for quote comparison and enrollment

Partnership Benefits:
- Expanded digital reach for your insurance products
- Commission-based partnership (no upfront costs)
- Professional handling of customer inquiries and enrollment
- Detailed reporting and analytics on sales performance

API Integration:
${insurer.apiInfo.hasAPI ? 
  `We understand you have API capabilities. We would like to discuss integration possibilities for real-time quotes and policy management.` :
  `We are prepared to work with your team on integration solutions, whether through API development or other preferred methods.`
}

Next Steps:
I would appreciate the opportunity to schedule a brief call to discuss:
1. Partnership terms and commission structure
2. Technical integration requirements
3. Onboarding process and timeline

Please let me know your availability for a 30-minute discussion this week or next.

Best regards,
[Your Name]
[Your Title]
[Your Contact Information]
[Platform URL]`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Insurer Contacts & Integration</h1>
        <Badge variant="outline" className="flex items-center">
          <Shield className="h-4 w-4 mr-1" />
          {insurers.length} Insurance Partners
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insurers.map((insurer) => (
          <Card key={insurer.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{insurer.name}</CardTitle>
                {getStatusBadge(insurer.status)}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Commission: {insurer.commissionRate}%</span>
                {insurer.lastContact && (
                  <span>Last contact: {new Date(insurer.lastContact).toLocaleDateString()}</span>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Contact Information */}
              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  Contact Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Partnership Email:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs">{insurer.contacts.partnershipEmail}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(insurer.contacts.partnershipEmail, 'Email')}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs">{insurer.contacts.phone}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(insurer.contacts.phone, 'Phone')}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  {insurer.contacts.apiEmail && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">API Support:</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs">{insurer.contacts.apiEmail}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(insurer.contacts.apiEmail, 'API Email')}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* API Information */}
              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  API Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">API Available:</span>
                    <Badge variant={insurer.apiInfo.hasAPI ? "default" : "secondary"}>
                      {insurer.apiInfo.hasAPI ? "Yes" : "No"}
                    </Badge>
                  </div>
                  {insurer.apiInfo.documentation && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Documentation:</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(insurer.apiInfo.documentation, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Docs
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sandbox:</span>
                    <Badge variant={insurer.apiInfo.sandboxAvailable ? "default" : "secondary"}>
                      {insurer.apiInfo.sandboxAvailable ? "Available" : "Not Available"}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Notes */}
              <div>
                <h4 className="font-semibold text-sm mb-2">Notes</h4>
                <p className="text-sm text-gray-600">{insurer.notes}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    const template = generateEmailTemplate(insurer);
                    copyToClipboard(template, 'Email template');
                  }}
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Copy Email Template
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(`tel:${insurer.contacts.phone}`)}
                >
                  <Phone className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(`mailto:${insurer.contacts.partnershipEmail}`)}
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integration Readiness Card */}
      <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <CardHeader>
          <CardTitle className="flex items-center text-teal-800">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            Your Platform is Integration Ready
          </CardTitle>
        </CardHeader>
        <CardContent className="text-teal-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Technical Infrastructure</h4>
              <ul className="text-sm space-y-1">
                <li>✅ API integration framework built</li>
                <li>✅ Quote comparison system ready</li>
                <li>✅ Commission tracking implemented</li>
                <li>✅ User data collection structured</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Business Framework</h4>
              <ul className="text-sm space-y-1">
                <li>✅ Broker commission structure defined</li>
                <li>✅ Email templates prepared</li>
                <li>✅ Contact information organized</li>
                <li>✅ Integration priorities identified</li>
              </ul>
            </div>
          </div>
          <p className="text-sm mt-4 p-3 bg-white/50 rounded-lg">
            <strong>Next Step:</strong> Start reaching out to insurers using the contact information and email templates above. 
            Begin with AIICO Insurance and AXA Mansard as they have the most mature API programs.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsurerContacts;
