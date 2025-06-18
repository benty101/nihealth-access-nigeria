
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Download, Shield, CheckCircle, Calendar, AlertCircle } from 'lucide-react';

interface ImmunizationResourcesProps {
  searchTerm: string;
}

const immunizationResources = [
  {
    id: 1,
    title: 'Nigeria National Immunization Schedule 2024',
    description: 'Official immunization schedule from NPHCDA with complete vaccination timeline for children 0-5 years.',
    type: 'Official Schedule',
    format: 'PDF Document',
    source: 'National Primary Health Care Development Agency (NPHCDA)',
    link: 'https://nphcda.gov.ng/',
    downloads: '67.3K',
    isOfficial: true,
    lastUpdated: '2024',
    topics: ['Vaccination Schedule', 'Recommended Vaccines', 'Timing Guidelines', 'Age-Specific Doses']
  },
  {
    id: 2,
    title: 'Routine Immunization Guidelines for Health Workers',
    description: 'Comprehensive guidelines for healthcare workers on vaccine administration, storage, and adverse event management.',
    type: 'Clinical Guidelines',
    format: 'Clinical Protocol',
    source: 'Federal Ministry of Health Nigeria',
    link: 'https://www.health.gov.ng/index.php/documents/category/65-maternal-child-and-adolescent-health',
    downloads: '34.8K',
    isOfficial: true,
    lastUpdated: '2024',
    topics: ['Vaccine Administration', 'Cold Chain', 'Adverse Events', 'Safety Protocols']
  },
  {
    id: 3,
    title: 'UNICEF Immunization Programme Nigeria',
    description: 'UNICEF\'s immunization initiatives, coverage statistics, and educational materials for parents and communities.',
    type: 'Programme Information',
    format: 'Web Portal',
    source: 'UNICEF Nigeria',
    link: 'https://www.unicef.org/nigeria/maternal-and-child-health',
    downloads: '45.7K',
    isOfficial: true,
    lastUpdated: '2024',
    topics: ['Coverage Statistics', 'Programme Updates', 'Community Education', 'Success Stories']
  },
  {
    id: 4,
    title: 'Vaccine Preventable Diseases Information',
    description: 'Detailed information about diseases prevented by vaccines, including symptoms, complications, and prevention strategies.',
    type: 'Educational Materials',
    format: 'Educational Guide',
    source: 'Nigeria Health Watch',
    link: 'https://nigeriahealthwatch.com/tag/maternal-and-child-health/',
    downloads: '28.9K',
    isOfficial: false,
    lastUpdated: '2024',
    topics: ['Disease Prevention', 'Vaccine Benefits', 'Health Education', 'Awareness']
  },
  {
    id: 5,
    title: 'Immunization Data and Coverage Reports',
    description: 'Statistical reports on immunization coverage across Nigerian states with data dashboards and analysis.',
    type: 'Data Reports',
    format: 'Interactive Dashboard',
    source: 'MamaYe Nigeria (Evidence4Action)',
    link: 'https://mamaye.org/',
    downloads: '19.2K',
    isOfficial: false,
    lastUpdated: '2024',
    topics: ['Coverage Data', 'State Statistics', 'Trends Analysis', 'Performance Indicators']
  }
];

const immunizationSchedule = [
  { age: 'At Birth', vaccines: ['BCG', 'OPV 0', 'Hepatitis B'], location: 'Health Facility' },
  { age: '6 Weeks', vaccines: ['OPV 1', 'DPT-HepB-Hib 1', 'PCV 1', 'Rotavirus 1'], location: 'Health Facility' },
  { age: '10 Weeks', vaccines: ['OPV 2', 'DPT-HepB-Hib 2', 'PCV 2', 'Rotavirus 2'], location: 'Health Facility' },
  { age: '14 Weeks', vaccines: ['OPV 3', 'DPT-HepB-Hib 3', 'PCV 3', 'Rotavirus 3', 'IPV'], location: 'Health Facility' },
  { age: '6 Months', vaccines: ['Vitamin A', 'Deworming'], location: 'Health Facility/Outreach' },
  { age: '9 Months', vaccines: ['Measles 1', 'Yellow Fever', 'Vitamin A'], location: 'Health Facility' },
  { age: '12 Months', vaccines: ['Vitamin A', 'Deworming'], location: 'Health Facility/Outreach' },
  { age: '15 Months', vaccines: ['Measles 2', 'DPT Booster'], location: 'Health Facility' }
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
          Official vaccination schedules, guidelines, and educational materials to protect children from preventable diseases.
        </p>
      </div>

      {/* Quick Reference Immunization Schedule */}
      <Card className="mb-6 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-orange-900 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Quick Reference: Nigeria Immunization Schedule
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {immunizationSchedule.map((schedule, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-orange-200">
                <div className="font-medium text-orange-900 mb-2">{schedule.age}</div>
                <div className="space-y-1 mb-3">
                  {schedule.vaccines.map((vaccine, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs mr-1 mb-1">
                      {vaccine}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-gray-600 flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  {schedule.location}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white rounded border border-orange-200">
            <div className="flex items-center text-orange-800">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Important: Always follow your healthcare provider's recommendations and maintain vaccination records.</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-xl transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={resource.isOfficial ? "default" : "outline"}
                    className={resource.isOfficial ? "bg-green-600 text-white" : ""}
                  >
                    {resource.type}
                  </Badge>
                  {resource.isOfficial && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">Official</span>
                    </div>
                  )}
                </div>
                <Shield className="h-5 w-5 text-orange-400" />
              </div>
              
              <CardTitle className="text-lg leading-tight group-hover:text-orange-600 transition-colors">
                {resource.title}
              </CardTitle>
              
              <p className="text-gray-600 text-sm line-clamp-2">{resource.description}</p>
              
              <div className="flex items-center justify-between mt-3">
                <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700">
                  Updated {resource.lastUpdated}
                </Badge>
                <div className="flex items-center text-xs text-gray-500">
                  <Download className="h-3 w-3 mr-1" />
                  {resource.downloads}
                </div>
              </div>
              
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
                  <span>Evidence-Based</span>
                </div>
                
                <div className="text-sm text-gray-700">
                  <strong>Source:</strong> {resource.source}
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
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

      {/* Additional Information */}
      <Card className="mt-6 border-l-4 border-l-blue-500 bg-blue-50">
        <CardContent className="p-6">
          <h4 className="font-semibold text-blue-900 mb-3">Why Immunization Matters</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div>
              <strong>Prevents Disease:</strong> Vaccines protect against serious and potentially life-threatening diseases.
            </div>
            <div>
              <strong>Community Protection:</strong> High vaccination coverage protects the entire community through herd immunity.
            </div>
            <div>
              <strong>Cost-Effective:</strong> Prevention through vaccination is much more cost-effective than treating diseases.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImmunizationResources;
