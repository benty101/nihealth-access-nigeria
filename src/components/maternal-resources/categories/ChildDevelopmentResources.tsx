
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Download, FileText, Users, CheckCircle } from 'lucide-react';

interface ChildDevelopmentResourcesProps {
  searchTerm: string;
}

const childDevelopmentResources = [
  {
    id: 1,
    title: 'Child Growth Monitoring Charts - WHO Standards',
    description: 'Updated growth charts and monitoring tools adapted for Nigerian children with local context.',
    type: 'Growth Charts',
    format: 'PDF Document',
    source: 'WHO Nigeria Office',
    link: 'https://www.afro.who.int/countries/nigeria',
    downloads: '47.8K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Growth Charts', 'WHO Standards', 'Monitoring Tools'],
    icon: FileText
  },
  {
    id: 2,
    title: 'Early Childhood Development Guidelines',
    description: 'Comprehensive guidelines for supporting early childhood development from 0-5 years.',
    type: 'Development Guidelines',
    format: 'PDF Document',
    source: 'Federal Ministry of Health Nigeria',
    link: 'https://www.health.gov.ng/index.php/documents/category/65-maternal-child-and-adolescent-health',
    downloads: '33.4K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Early Development', '0-5 Years', 'Milestones'],
    icon: FileText
  },
  {
    id: 3,
    title: 'Developmental Milestones Checklist',
    description: 'Age-appropriate developmental milestones checklist for Nigerian children.',
    type: 'Assessment Tool',
    format: 'PDF Document',
    source: 'NPHCDA',
    link: 'https://nphcda.gov.ng/',
    downloads: '39.2K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Milestones', 'Assessment', 'Age-Appropriate'],
    icon: FileText
  },
  {
    id: 4,
    title: 'UNICEF Nigeria - Child Development Programs',
    description: 'Information on child development programs and interventions in Nigeria.',
    type: 'Program Information',
    format: 'Web Portal',
    source: 'UNICEF Nigeria',
    link: 'https://www.unicef.org/nigeria/maternal-and-child-health',
    downloads: '28.7K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Development Programs', 'Interventions', 'Support Services'],
    icon: Users
  },
  {
    id: 5,
    title: 'Early Stimulation and Play Activities',
    description: 'Guidelines for age-appropriate stimulation and play activities for optimal child development.',
    type: 'Activity Guidelines',
    format: 'PDF Document',
    source: 'Wellbeing Foundation Africa',
    link: 'https://www.wellbeingfoundationafrica.org/',
    downloads: '25.6K',
    lastUpdated: '2024',
    verifiedOfficial: false,
    topics: ['Stimulation', 'Play Activities', 'Age-Appropriate'],
    icon: FileText
  },
  {
    id: 6,
    title: 'Child Development Success Stories',
    description: 'Real stories and case studies of successful child development interventions in Nigeria.',
    type: 'Success Stories',
    format: 'Web Articles',
    source: 'Nigeria Health Watch',
    link: 'https://nigeriahealthwatch.com/tag/maternal-and-child-health/',
    downloads: '21.3K',
    lastUpdated: '2024',
    verifiedOfficial: false,
    topics: ['Success Stories', 'Case Studies', 'Best Practices'],
    icon: Users
  }
];

const ChildDevelopmentResources = ({ searchTerm }: ChildDevelopmentResourcesProps) => {
  const filteredResources = childDevelopmentResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Child Development Resources</h3>
        <p className="text-gray-600">
          Comprehensive resources for monitoring and supporting optimal child development from birth to 5 years.
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
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
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

export default ChildDevelopmentResources;
