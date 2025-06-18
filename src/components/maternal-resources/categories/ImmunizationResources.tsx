
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Download, FileText, Users, CheckCircle } from 'lucide-react';

interface ImmunizationResourcesProps {
  searchTerm: string;
}

const immunizationResources = [
  {
    id: 1,
    title: 'Official Nigerian Immunization Schedule 2024 - NPHCDA',
    description: 'Complete vaccination timeline from birth to 5 years with all recommended vaccines for Nigerian children.',
    type: 'Official Schedule',
    format: 'PDF Document',
    source: 'NPHCDA',
    link: 'https://nphcda.gov.ng/',
    downloads: '56.3K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Vaccination Schedule', 'Birth to 5 Years', 'Recommended Vaccines'],
    icon: FileText
  },
  {
    id: 2,
    title: 'Routine Immunization Guidelines for Health Workers',
    description: 'Comprehensive guidelines for healthcare workers on administering routine immunizations.',
    type: 'Clinical Guidelines',
    format: 'PDF Document',
    source: 'NPHCDA',
    link: 'https://nphcda.gov.ng/',
    downloads: '23.7K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Healthcare Workers', 'Administration Guidelines', 'Safety Protocols'],
    icon: FileText
  },
  {
    id: 3,
    title: 'Cold Chain Management for Vaccines',
    description: 'Guidelines for proper storage and transportation of vaccines to maintain efficacy.',
    type: 'Technical Guidelines',
    format: 'PDF Document',
    source: 'NPHCDA',
    link: 'https://nphcda.gov.ng/',
    downloads: '18.4K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Cold Chain', 'Vaccine Storage', 'Transportation'],
    icon: FileText
  },
  {
    id: 4,
    title: 'WHO Nigeria - Expanded Programme on Immunization',
    description: 'WHO guidelines and updates on immunization programs in Nigeria.',
    type: 'Program Guidelines',
    format: 'Web Portal',
    source: 'WHO Nigeria Office',
    link: 'https://www.afro.who.int/countries/nigeria',
    downloads: '31.2K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['EPI Program', 'WHO Guidelines', 'Program Updates'],
    icon: FileText
  },
  {
    id: 5,
    title: 'UNICEF Nigeria - Immunization Campaigns',
    description: 'Information on mass immunization campaigns and special vaccination drives.',
    type: 'Campaign Information',
    format: 'Web Portal',
    source: 'UNICEF Nigeria',
    link: 'https://www.unicef.org/nigeria/maternal-and-child-health',
    downloads: '27.8K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Mass Campaigns', 'Special Drives', 'Community Mobilization'],
    icon: Users
  },
  {
    id: 6,
    title: 'Vaccine Safety and Adverse Events Monitoring',
    description: 'Guidelines for monitoring and reporting adverse events following immunization.',
    type: 'Safety Guidelines',
    format: 'PDF Document',
    source: 'NCDC',
    link: 'https://ncdc.gov.ng/themes/common/docs/protocols/83_1516031372.pdf',
    downloads: '15.6K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Vaccine Safety', 'Adverse Events', 'Monitoring'],
    icon: FileText
  }
];

const ImmunizationResources = ({ searchTerm }: ImmunizationResourcesProps) => {
  const filteredResources = immunizationResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Immunization Resources</h3>
        <p className="text-gray-600">
          Official vaccination schedules, guidelines, and resources for child immunization in Nigeria.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-lg transition-all duration-300 group bg-white border border-gray-200">
            <CardHeader>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={resource.verifiedOfficial ? "default" : "outline"}
                    className={resource.verifiedOfficial ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "border-gray-300 text-gray-700"}
                  >
                    {resource.type}
                  </Badge>
                  {resource.verifiedOfficial && (
                    <div className="flex items-center text-purple-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">Official</span>
                    </div>
                  )}
                </div>
                <resource.icon className="h-5 w-5 text-gray-400" />
              </div>
              
              <CardTitle className="text-lg leading-tight group-hover:text-purple-600 transition-colors">
                {resource.title}
              </CardTitle>
              
              <p className="text-gray-600 text-sm line-clamp-2">{resource.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {resource.topics.slice(0, 3).map((topic, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs border-gray-300 text-gray-600">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{resource.format}</span>
                  <span>{resource.lastUpdated}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Download className="h-4 w-4 mr-1" />
                  {resource.downloads} accessed
                </div>
                
                <div className="text-sm text-gray-700">
                  <strong>Source:</strong> {resource.source}
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  onClick={() => window.open(resource.link, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Access Resource
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImmunizationResources;
