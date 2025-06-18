
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Download, FileText, Users, CheckCircle } from 'lucide-react';

interface ChildbirthResourcesProps {
  searchTerm: string;
}

const childbirthResources = [
  {
    id: 1,
    title: 'Safe Delivery Guidelines - Federal Ministry of Health',
    description: 'Comprehensive guidelines for safe delivery practices and emergency obstetric care in Nigeria.',
    type: 'Official Guidelines',
    format: 'PDF Document',
    source: 'Federal Ministry of Health Nigeria',
    link: 'https://www.health.gov.ng/index.php/documents/category/65-maternal-child-and-adolescent-health',
    downloads: '19.4K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Safe Delivery', 'Emergency Care', 'Labor Management'],
    icon: FileText
  },
  {
    id: 2,
    title: 'Birth Preparedness and Complication Readiness',
    description: 'WHO guidelines adapted for Nigerian context on preparing for childbirth and managing complications.',
    type: 'Clinical Protocol',
    format: 'Web Portal',
    source: 'WHO Nigeria Office',
    link: 'https://www.afro.who.int/countries/nigeria',
    downloads: '15.7K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Birth Planning', 'Complication Management', 'Emergency Preparedness'],
    icon: FileText
  },
  {
    id: 3,
    title: 'Traditional Birth Attendant Training Manual',
    description: 'Training materials for traditional birth attendants to ensure safe delivery practices.',
    type: 'Training Manual',
    format: 'PDF Document',
    source: 'NPHCDA',
    link: 'https://nphcda.gov.ng/',
    downloads: '12.3K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Traditional Care', 'Training', 'Safe Practices'],
    icon: Users
  },
  {
    id: 4,
    title: 'Caesarean Section Guidelines Nigeria',
    description: 'Guidelines for when and how to perform caesarean sections safely in Nigerian healthcare settings.',
    type: 'Clinical Guidelines',
    format: 'PDF Document',
    source: 'NCDC',
    link: 'https://ncdc.gov.ng/themes/common/docs/protocols/83_1516031372.pdf',
    downloads: '8.9K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['C-Section', 'Surgical Guidelines', 'Post-operative Care'],
    icon: FileText
  },
  {
    id: 5,
    title: 'Labor and Delivery Stories - Nigeria Health Watch',
    description: 'Real experiences and success stories of childbirth in Nigeria, highlighting best practices.',
    type: 'Stories & Articles',
    format: 'Web Articles',
    source: 'Nigeria Health Watch',
    link: 'https://nigeriahealthwatch.com/tag/maternal-and-child-health/',
    downloads: '22.1K',
    lastUpdated: '2024',
    verifiedOfficial: false,
    topics: ['Success Stories', 'Real Experiences', 'Community Stories'],
    icon: Users
  }
];

const ChildbirthResources = ({ searchTerm }: ChildbirthResourcesProps) => {
  const filteredResources = childbirthResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Childbirth & Delivery Resources</h3>
        <p className="text-gray-600">
          Guidelines, protocols, and resources for safe childbirth and delivery management in Nigeria.
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

export default ChildbirthResources;
