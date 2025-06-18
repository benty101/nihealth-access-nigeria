
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Download, Baby, CheckCircle, Clock, Star } from 'lucide-react';

interface NewbornCareResourcesProps {
  searchTerm: string;
}

const newbornResources = [
  {
    id: 1,
    title: 'Essential Newborn Care Guidelines - NPHCDA',
    description: 'Comprehensive guidelines for immediate newborn care, including thermal care, early breastfeeding, and infection prevention.',
    type: 'Official Guidelines',
    format: 'PDF Document',
    source: 'National Primary Health Care Development Agency',
    link: 'https://nphcda.gov.ng/',
    downloads: '42.1K',
    rating: 4.9,
    verifiedOfficial: true,
    ageGroup: '0-28 days',
    topics: ['Immediate Care', 'Thermal Care', 'Infection Prevention', 'Early Breastfeeding']
  },
  {
    id: 2,
    title: 'Newborn Health Interventions Package',
    description: 'Evidence-based interventions for newborn health, including resuscitation, kangaroo mother care, and danger sign recognition.',
    type: 'Clinical Protocol',
    format: 'Clinical Guidelines',
    source: 'Federal Ministry of Health',
    link: 'https://www.health.gov.ng/index.php/documents/category/65-maternal-child-and-adolescent-health',
    downloads: '35.7K',
    rating: 4.8,
    verifiedOfficial: true,
    ageGroup: '0-28 days',
    topics: ['Resuscitation', 'Kangaroo Care', 'Danger Signs', 'Emergency Care']
  },
  {
    id: 3,
    title: 'UNICEF Newborn Survival Resources',
    description: 'Comprehensive resources on newborn survival, including statistics, best practices, and educational materials for parents.',
    type: 'Educational Resources',
    format: 'Web Portal',
    source: 'UNICEF Nigeria',
    link: 'https://www.unicef.org/nigeria/maternal-and-child-health',
    downloads: '58.3K',
    rating: 4.7,
    verifiedOfficial: true,
    ageGroup: '0-2 months',
    topics: ['Survival Strategies', 'Parent Education', 'Best Practices', 'Statistics']
  },
  {
    id: 4,
    title: 'Breastfeeding and Newborn Feeding Guidelines',
    description: 'Detailed guidelines on exclusive breastfeeding, proper latching, feeding schedules, and addressing common challenges.',
    type: 'Feeding Guidelines',
    format: 'Educational Guide',
    source: 'Wellbeing Foundation Africa',
    link: 'https://www.wellbeingfoundationafrica.org/',
    downloads: '47.9K',
    rating: 4.9,
    verifiedOfficial: false,
    ageGroup: '0-6 months',
    topics: ['Exclusive Breastfeeding', 'Latching', 'Feeding Schedules', 'Common Challenges']
  },
  {
    id: 5,
    title: 'Newborn Screening and Early Detection',
    description: 'Guidelines for newborn screening programs, early detection of health issues, and follow-up care protocols.',
    type: 'Screening Guidelines',
    format: 'Clinical Protocol',
    source: 'Nigeria Health Watch',
    link: 'https://nigeriahealthwatch.com/tag/maternal-and-child-health/',
    downloads: '29.4K',
    rating: 4.6,
    verifiedOfficial: false,
    ageGroup: '0-1 month',
    topics: ['Health Screening', 'Early Detection', 'Follow-up Care', 'Preventive Care']
  },
  {
    id: 6,
    title: 'Home-Based Newborn Care Practices',
    description: 'Safe practices for caring for newborns at home, including hygiene, sleep safety, and when to seek medical help.',
    type: 'Home Care Guide',
    format: 'Educational Materials',
    source: 'MamaYe Nigeria',
    link: 'https://mamaye.org/',
    downloads: '51.2K',
    rating: 4.7,
    verifiedOfficial: false,
    ageGroup: '0-3 months',
    topics: ['Home Care', 'Sleep Safety', 'Hygiene', 'Medical Alert Signs']
  }
];

const quickTips = [
  {
    title: 'First Hour Care',
    description: 'Skin-to-skin contact and early breastfeeding within the first hour',
    icon: '🤱',
    urgency: 'critical'
  },
  {
    title: 'Temperature Control',
    description: 'Keep baby warm with proper clothing and room temperature',
    icon: '🌡️',
    urgency: 'important'
  },
  {
    title: 'Danger Signs',
    description: 'Watch for difficulty breathing, fever, or poor feeding',
    icon: '⚠️',
    urgency: 'critical'
  },
  {
    title: 'Hygiene',
    description: 'Clean hands before touching baby, proper cord care',
    icon: '🧼',
    urgency: 'important'
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
          Essential guidelines and educational materials for caring for newborns in the first months of life.
        </p>
      </div>

      {/* Quick Tips Section */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
            <Baby className="h-5 w-5 mr-2" />
            Quick Newborn Care Tips
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickTips.map((tip, index) => (
              <div key={index} className={`bg-white rounded-lg p-4 border ${tip.urgency === 'critical' ? 'border-red-200' : 'border-blue-200'}`}>
                <div className="text-2xl mb-2">{tip.icon}</div>
                <div className={`font-medium ${tip.urgency === 'critical' ? 'text-red-900' : 'text-blue-900'} mb-1`}>
                  {tip.title}
                </div>
                <div className="text-sm text-gray-600">{tip.description}</div>
                {tip.urgency === 'critical' && (
                  <Badge className="mt-2 bg-red-100 text-red-700 text-xs">
                    Critical
                  </Badge>
                )}
              </div>
            ))}
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
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  {resource.rating}
                </div>
              </div>
              
              <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                {resource.title}
              </CardTitle>
              
              <p className="text-gray-600 text-sm line-clamp-2">{resource.description}</p>
              
              <div className="flex items-center justify-between mt-3">
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                  Age: {resource.ageGroup}
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
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Recently Updated
                  </div>
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
