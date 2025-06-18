
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Download, FileText, Users, CheckCircle } from 'lucide-react';

interface NewbornCareResourcesProps {
  searchTerm: string;
}

const newbornResources = [
  {
    id: 1,
    title: 'Essential Newborn Care Guidelines - NPHCDA',
    description: 'Comprehensive guidelines for immediate newborn care, including cord care, thermal care, and feeding.',
    type: 'Official Guidelines',
    format: 'PDF Document',
    source: 'NPHCDA',
    link: 'https://nphcda.gov.ng/',
    downloads: '31.2K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Immediate Care', 'Cord Care', 'Thermal Care', 'First Feeding'],
    icon: FileText
  },
  {
    id: 2,
    title: 'Newborn Screening and Early Detection',
    description: 'Guidelines for newborn screening programs and early detection of health conditions in Nigerian babies.',
    type: 'Screening Guidelines',
    format: 'Web Portal',
    source: 'Federal Ministry of Health Nigeria',
    link: 'https://www.health.gov.ng/index.php/documents/category/65-maternal-child-and-adolescent-health',
    downloads: '18.5K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Health Screening', 'Early Detection', 'Developmental Assessment'],
    icon: FileText
  },
  {
    id: 3,
    title: 'Kangaroo Mother Care Implementation',
    description: 'Evidence-based guidelines for implementing Kangaroo Mother Care for premature and low birth weight babies.',
    type: 'Clinical Protocol',
    format: 'PDF Document',
    source: 'WHO Nigeria Office',
    link: 'https://www.afro.who.int/countries/nigeria',
    downloads: '14.7K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Premature Care', 'Low Birth Weight', 'Skin-to-Skin Contact'],
    icon: FileText
  },
  {
    id: 4,
    title: 'UNICEF Nigeria - Newborn Survival',
    description: 'Comprehensive resources on newborn survival strategies and interventions in Nigeria.',
    type: 'Educational Resources',
    format: 'Web Portal',
    source: 'UNICEF Nigeria',
    link: 'https://www.unicef.org/nigeria/maternal-and-child-health',
    downloads: '27.3K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Survival Strategies', 'Interventions', 'Statistics'],
    icon: Users
  },
  {
    id: 5,
    title: 'Newborn Care Success Stories',
    description: 'Real stories and case studies of successful newborn care practices across Nigeria.',
    type: 'Case Studies',
    format: 'Web Articles',
    source: 'Nigeria Health Watch',
    link: 'https://nigeriahealthwatch.com/tag/maternal-and-child-health/',
    downloads: '19.8K',
    lastUpdated: '2024',
    verifiedOfficial: false,
    topics: ['Success Stories', 'Best Practices', 'Community Care'],
    icon: Users
  },
  {
    id: 6,
    title: 'Wellbeing Foundation - Newborn Toolkit',
    description: 'Practical toolkits and educational materials for newborn care in Nigerian communities.',
    type: 'Educational Toolkit',
    format: 'Mixed Resources',
    source: 'Wellbeing Foundation Africa',
    link: 'https://www.wellbeingfoundationafrica.org/',
    downloads: '16.4K',
    lastUpdated: '2024',
    verifiedOfficial: false,
    topics: ['Community Care', 'Educational Tools', 'Practical Guides'],
    icon: FileText
  }
];

const NewbornCareResources = ({ searchTerm }: NewbornCareResourcesProps) => {
  const filteredResources = newbornResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Newborn Care Resources</h3>
        <p className="text-gray-600">
          Essential guidelines and resources for comprehensive newborn care and early childhood development in Nigeria.
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
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
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

export default NewbornCareResources;
