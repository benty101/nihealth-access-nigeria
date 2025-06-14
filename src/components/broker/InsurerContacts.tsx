
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Globe, FileText, ExternalLink, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const InsurerContacts = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} copied successfully`,
    });
  };

  const apiIntegrations = [
    {
      id: 'mycover',
      name: 'MyCover.ai',
      type: 'API Aggregator',
      priority: 'High',
      status: 'Available',
      contactEmail: 'partners@mycover.ai',
      contactPhone: '+234-1-000-0000',
      website: 'https://mycover.ai',
      apiDocs: 'https://docs.mycover.ai/api-reference',
      description: 'Multi-insurer API platform with real-time quotes from AIICO, AXA, Hygeia, and more',
      features: ['Real-time quotes', 'Policy purchase', 'Commission tracking', 'Multiple insurers'],
      commissionRate: '12-18%',
      integrationComplexity: 'Medium',
      emailTemplate: `Subject: Broker Partnership Inquiry - Health Insurance API Integration

Dear MyCover.ai Partnership Team,

I am reaching out to inquire about your broker API program for health insurance products.

I operate a digital health insurance brokerage platform and am interested in integrating with your API to provide real-time quotes and enrollment for my clients.

Could you please provide information about:
- Broker API access and credentials
- Commission structure and rates
- Technical documentation and integration requirements
- Support and onboarding process

I look forward to discussing a potential partnership.

Best regards,
[Your Name]
[Your Brokerage Name]
[Your Contact Information]`
    },
    {
      id: 'curacel',
      name: 'Curacel',
      type: 'HMO Aggregator',
      priority: 'High',
      status: 'Available',
      contactEmail: 'partnerships@curacel.co',
      contactPhone: '+234-1-000-0000',
      website: 'https://curacel.co',
      apiDocs: 'https://api.health.curacel.co/api/v1/hmos',
      description: 'African insurtech platform with HMO and health insurance APIs',
      features: ['HMO integration', 'Claims processing', 'Provider network', 'Digital enrollment'],
      commissionRate: '10-15%',
      integrationComplexity: 'Medium',
      emailTemplate: `Subject: Health Insurance Broker API Partnership

Dear Curacel Partnership Team,

I am interested in integrating with your health insurance and HMO APIs for my broker platform.

My platform serves health-conscious individuals and families, and I believe Curacel's HMO network would be valuable for my clients.

Please provide details on:
- Broker API access and authentication
- Available HMO partners and products
- Commission structure
- Integration timeline and support

Thank you for your time.

Best regards,
[Your Name]
[Your Brokerage Platform]`
    }
  ];

  const directInsurers = [
    {
      id: 'aiico',
      name: 'AIICO Insurance',
      type: 'Direct Insurer',
      priority: 'Medium',
      status: 'Contact Required',
      contactEmail: 'partners@aiico.com.ng',
      contactPhone: '+234-1-2701030',
      website: 'https://www.aiico.com.ng',
      apiDocs: 'Contact for API documentation',
      description: 'Leading Nigerian insurance company with health and life products',
      features: ['Health insurance', 'Life insurance', 'Group policies', 'Individual plans'],
      commissionRate: '15-20%',
      integrationComplexity: 'High',
      emailTemplate: `Subject: Digital Broker Partnership - Health Insurance Distribution

Dear AIICO Partnership Team,

I operate a digital health insurance brokerage platform and would like to explore a partnership for distributing AIICO health insurance products.

My platform focuses on making health insurance accessible and understandable for Nigerian families. I am interested in:

- Broker agreement and commission structure
- API integration possibilities
- Product training and certification
- Marketing support and materials

I would appreciate the opportunity to discuss how we can work together to expand access to AIICO's health insurance products.

Best regards,
[Your Name]
[Your Platform Name]
[Contact Information]`
    },
    {
      id: 'axa',
      name: 'AXA Mansard',
      type: 'Direct Insurer',
      priority: 'Medium',
      status: 'Contact Required',
      contactEmail: 'partnerships@axamansard.com',
      contactPhone: '+234-1-2701807',
      website: 'https://www.axamansard.com',
      apiDocs: 'Contact for developer resources',
      description: 'International insurance brand with strong Nigerian presence',
      features: ['Comprehensive health cover', 'International coverage', 'Corporate plans', 'Family packages'],
      commissionRate: '12-15%',
      integrationComplexity: 'High',
      emailTemplate: `Subject: Broker Partnership Inquiry - Digital Health Insurance Distribution

Dear AXA Mansard Team,

I am writing to inquire about broker partnership opportunities for health insurance products.

I operate a digital platform that helps Nigerians compare and purchase health insurance online. AXA Mansard's reputation and product range would be valuable additions to our platform.

Could we discuss:
- Broker certification and onboarding process
- Commission structure and payment terms
- Digital integration possibilities
- Training and support resources

I look forward to exploring this partnership opportunity.

Best regards,
[Your Name]
[Your Business Details]`
    }
  ];

  const allContacts = [...apiIntegrations, ...directInsurers];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Insurer Integration Contacts
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Connect with insurance providers and API platforms to expand your broker network and access real-time quotes.
        </p>
      </div>

      {/* API Integrations */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Globe className="h-5 w-5 mr-2 text-teal-600" />
          API Platforms (Recommended)
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {apiIntegrations.map((contact) => (
            <Card key={contact.id} className="border-l-4 border-l-teal-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{contact.name}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-teal-700 border-teal-300">
                      {contact.type}
                    </Badge>
                    <Badge 
                      variant={contact.priority === 'High' ? 'default' : 'secondary'}
                    >
                      {contact.priority} Priority
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{contact.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Commission:</span>
                    <span className="ml-2 text-green-600">{contact.commissionRate}</span>
                  </div>
                  <div>
                    <span className="font-medium">Integration:</span>
                    <span className="ml-2">{contact.integrationComplexity}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {contact.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{contact.contactEmail}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(contact.contactEmail, 'Email')}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(contact.website, '_blank')}
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    Website
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(contact.apiDocs, '_blank')}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    API Docs
                  </Button>
                  <Button
                    size="sm"
                    className="bg-teal-600 hover:bg-teal-700"
                    onClick={() => {
                      const mailtoLink = `mailto:${contact.contactEmail}?subject=${encodeURIComponent(contact.emailTemplate.split('\n')[0].replace('Subject: ', ''))}&body=${encodeURIComponent(contact.emailTemplate.split('\n').slice(2).join('\n'))}`;
                      window.open(mailtoLink);
                    }}
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Direct Insurers */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Phone className="h-5 w-5 mr-2 text-blue-600" />
          Direct Insurer Contacts
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {directInsurers.map((contact) => (
            <Card key={contact.id} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{contact.name}</CardTitle>
                  <Badge variant="secondary">{contact.status}</Badge>
                </div>
                <p className="text-sm text-gray-600">{contact.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Commission:</span>
                    <span className="ml-2 text-green-600">{contact.commissionRate}</span>
                  </div>
                  <div>
                    <span className="font-medium">Setup:</span>
                    <span className="ml-2">{contact.integrationComplexity}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Products:</h4>
                  <div className="flex flex-wrap gap-1">
                    {contact.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{contact.contactEmail}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(contact.contactEmail, 'Email')}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{contact.contactPhone}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(contact.contactPhone, 'Phone')}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(contact.website, '_blank')}
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    Website
                  </Button>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      const mailtoLink = `mailto:${contact.contactEmail}?subject=${encodeURIComponent(contact.emailTemplate.split('\n')[0].replace('Subject: ', ''))}&body=${encodeURIComponent(contact.emailTemplate.split('\n').slice(2).join('\n'))}`;
                      window.open(mailtoLink);
                    }}
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Contact Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Next Steps Card */}
      <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-teal-900 mb-3">🚀 Recommended Next Steps</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-teal-800">
            <li><strong>Start with MyCover.ai</strong> - Single integration, multiple insurers</li>
            <li><strong>Add Curacel for HMOs</strong> - Expand your HMO offerings</li>
            <li><strong>Direct insurer partnerships</strong> - For higher commission rates</li>
            <li><strong>Test integrations</strong> - Use sandbox environments first</li>
            <li><strong>Launch gradually</strong> - Start with one API, then expand</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsurerContacts;
