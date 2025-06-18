
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Download, FileText, Video, Users, CheckCircle } from 'lucide-react';

interface PregnancyCareResourcesProps {
  searchTerm: string;
}

const pregnancyResources = [
  {
    id: 1,
    title: 'Antenatal Care Guidelines - Federal Ministry of Health',
    description: 'Comprehensive guidelines for antenatal care visits, tests, and monitoring throughout pregnancy.',
    type: 'Official Guidelines',
    format: 'PDF Document',
    source: 'Federal Ministry of Health Nigeria',
    link: 'https://www.health.gov.ng/index.php/documents/category/65-maternal-child-and-adolescent-health',
    downloads: '25.3K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['ANC Schedule', 'Medical Tests', 'Risk Assessment', 'Monitoring'],
    icon: FileText
  },
  {
    id: 2,
    title: 'Pregnancy Complications Management Protocol',
    description: 'NCDC protocols for managing common pregnancy complications and emergency situations.',
    type: 'Clinical Protocol',
    format: 'PDF Document',
    source: 'Nigeria Centre for Disease Control (NCDC)',
    link: 'https://ncdc.gov.ng/themes/common/docs/protocols/83_1516031372.pdf',
    downloads: '18.7K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Emergency Care', 'Complications', 'Treatment Protocols'],
    icon: FileText
  },
  {
    id: 3,
    title: 'UNICEF Nigeria - Maternal Health Resources',
    description: 'Comprehensive maternal health information, statistics, and educational materials.',
    type: 'Educational Resources',
    format: 'Web Portal',
    source: 'UNICEF Nigeria',
    link: 'https://www.unicef.org/nigeria/maternal-and-child-health',
    downloads: '45.2K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Health Education', 'Statistics', 'Best Practices'],
    icon: Users
  },
  {
    id: 4,
    title: 'Nigeria Health Watch - Maternal Health Stories',
    description: 'Real stories, success cases, and evidence-based articles on maternal health in Nigeria.',
    type: 'Articles & Stories',
    format: 'Web Articles',
    source: 'Nigeria Health Watch',
    link: 'https://nigeriahealthwatch.com/tag/maternal-and-child-health/',
    downloads: '32.1K',
    lastUpdated: '2024',
    verifiedOfficial: false,
    topics: ['Success Stories', 'Health Education', 'Community Health'],
    icon: Users
  },
  {
    id: 5,
    title: 'Wellbeing Foundation Africa - Maternal Health Toolkit',
    description: 'Educational toolkits, case studies, and maternal health resources for Nigerian mothers.',
    type: 'Educational Toolkit',
    format: 'Mixed Resources',
    source: 'Wellbeing Foundation Africa',
    link: 'https://www.wellbeingfoundationafrica.org/',
    downloads: '28.9K',
    lastUpdated: '2024',
    verifiedOfficial: false,
    topics: ['Education', 'Toolkits', 'Local Case Studies'],
    icon: FileText
  },
  {
    id: 6,
    title: 'WHO Nigeria - Maternal Health Guidelines',
    description: 'World Health Organization guidelines adapted for Nigerian maternal healthcare context.',
    type: 'International Guidelines',
    format: 'Web Portal',
    source: 'WHO Nigeria Office',
    link: 'https://www.afro.who.int/countries/nigeria',
    downloads: '41.5K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['International Standards', 'Best Practices', 'Health Policies'],
    icon: FileText
  }
];

const PregnancyCareResources = ({ searchTerm }: PregnancyCareResourcesProps) => {
  const filteredResources = pregnancyResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Pregnancy Care Resources</h3>
        <p className="text-gray-600">
          Official guidelines, protocols, and educational materials for comprehensive pregnancy care in Nigeria.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-xl transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={resource.verifiedOfficial ? "default" : "outline"}
                    className={resource.verifiedOfficial ? "bg-green-600 text-white" : ""}
                  >
                    {resource.type}
                  </Badge>
                  {resource.verifiedOfficial && (
                    <div className="flex items-center text-green-600">
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
                  <Badge key={idx} variant="outline" className="text-xs">
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
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
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

export default PregnancyCareResources;
