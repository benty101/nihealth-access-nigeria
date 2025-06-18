
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Download, FileText, Heart, CheckCircle, AlertTriangle } from 'lucide-react';

interface ChildbirthResourcesProps {
  searchTerm: string;
}

const childbirthResources = [
  {
    id: 1,
    title: 'Safe Delivery Guidelines - NPHCDA',
    description: 'Complete guidelines for safe delivery practices, including normal delivery and cesarean section protocols.',
    type: 'Official Guidelines',
    format: 'PDF Document',
    source: 'National Primary Health Care Development Agency',
    link: 'https://nphcda.gov.ng/',
    downloads: '31.2K',
    isEmergency: false,
    verifiedOfficial: true,
    topics: ['Normal Delivery', 'C-Section', 'Birth Plans', 'Hospital Procedures']
  },
  {
    id: 2,
    title: 'Emergency Obstetric Care Protocols',
    description: 'Critical protocols for managing obstetric emergencies during labor and delivery.',
    type: 'Emergency Protocol',
    format: 'Clinical Guidelines',
    source: 'Federal Ministry of Health',
    link: 'https://www.health.gov.ng/index.php/documents/category/65-maternal-child-and-adolescent-health',
    downloads: '22.8K',
    isEmergency: true,
    verifiedOfficial: true,
    topics: ['Emergency Care', 'Obstetric Complications', 'Life-Saving Procedures']
  },
  {
    id: 3,
    title: 'Labor and Delivery Education - UNICEF',
    description: 'Comprehensive education materials about the stages of labor, pain management, and delivery options.',
    type: 'Educational Materials',
    format: 'Web Resources',
    source: 'UNICEF Nigeria',
    link: 'https://www.unicef.org/nigeria/maternal-and-child-health',
    downloads: '45.7K',
    isEmergency: false,
    verifiedOfficial: true,
    topics: ['Labor Stages', 'Pain Management', 'Birth Positions', 'Partner Support']
  },
  {
    id: 4,
    title: 'Birth Preparedness and Complication Readiness',
    description: 'Essential guide for preparing for birth and recognizing danger signs during delivery.',
    type: 'Preparedness Guide',
    format: 'Educational Guide',
    source: 'Wellbeing Foundation Africa',
    link: 'https://www.wellbeingfoundationafrica.org/',
    downloads: '28.3K',
    isEmergency: false,
    verifiedOfficial: false,
    topics: ['Birth Preparation', 'Danger Signs', 'Emergency Planning', 'Support Systems']
  },
  {
    id: 5,
    title: 'Skilled Birth Attendance Guidelines',
    description: 'Guidelines emphasizing the importance of skilled birth attendance and facility-based delivery.',
    type: 'Clinical Guidelines',
    format: 'PDF Document',
    source: 'Nigeria Health Watch',
    link: 'https://nigeriahealthwatch.com/tag/maternal-and-child-health/',
    downloads: '19.6K',
    isEmergency: false,
    verifiedOfficial: false,
    topics: ['Skilled Attendance', 'Facility Delivery', 'Quality Care', 'Safety Measures']
  }
];

const emergencyNumbers = [
  { name: 'National Emergency', number: '199', description: 'General emergency services' },
  { name: 'Maternal Emergency Hotline', number: '0800-MOTHER', description: 'Dedicated maternal emergency line' },
  { name: 'Lagos Emergency', number: '767', description: 'Lagos State emergency services' }
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
          Guidelines, protocols, and educational materials for safe delivery and childbirth preparation.
        </p>
      </div>

      {/* Emergency Quick Access */}
      <Card className="mb-6 border-l-4 border-l-red-500 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center mb-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <h4 className="font-semibold text-red-900">Emergency Delivery Contacts</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {emergencyNumbers.map((contact, index) => (
              <div key={index} className="bg-white rounded p-3 border border-red-200">
                <div className="font-medium text-gray-900">{contact.name}</div>
                <div className="text-red-600 font-bold text-lg">{contact.number}</div>
                <div className="text-xs text-gray-600">{contact.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className={`hover:shadow-xl transition-all duration-300 group ${resource.isEmergency ? 'border-l-4 border-l-red-500' : ''}`}>
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
                  {resource.isEmergency && (
                    <Badge className="bg-red-600 text-white">
                      Emergency
                    </Badge>
                  )}
                </div>
                <Heart className="h-5 w-5 text-pink-400" />
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
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    {resource.downloads}
                  </div>
                </div>
                
                <div className="text-sm text-gray-700">
                  <strong>Source:</strong> {resource.source}
                </div>
                
                <Button 
                  className={`w-full ${resource.isEmergency 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
                    : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600'
                  } text-white`}
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
