
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Download, FileText, Users, CheckCircle } from 'lucide-react';

interface NutritionResourcesProps {
  searchTerm: string;
}

const nutritionResources = [
  {
    id: 1,
    title: 'Exclusive Breastfeeding Guidelines - NPHCDA',
    description: 'Official guidelines for exclusive breastfeeding practices for the first 6 months of life.',
    type: 'Official Guidelines',
    format: 'PDF Document',
    source: 'NPHCDA',
    link: 'https://nphcda.gov.ng/',
    downloads: '42.1K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Exclusive Breastfeeding', 'First 6 Months', 'Proper Positioning'],
    icon: FileText
  },
  {
    id: 2,
    title: 'Complementary Feeding Guidelines',
    description: 'WHO guidelines for introducing complementary foods to Nigerian children from 6 months onwards.',
    type: 'Feeding Guidelines',
    format: 'Web Portal',
    source: 'WHO Nigeria Office',
    link: 'https://www.afro.who.int/countries/nigeria',
    downloads: '35.7K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Complementary Feeding', '6+ Months', 'Local Foods', 'Nutrition'],
    icon: FileText
  },
  {
    id: 3,
    title: 'Maternal Nutrition During Pregnancy and Lactation',
    description: 'Comprehensive nutrition guidelines for pregnant and breastfeeding mothers in Nigeria.',
    type: 'Maternal Nutrition',
    format: 'PDF Document',
    source: 'Federal Ministry of Health Nigeria',
    link: 'https://www.health.gov.ng/index.php/documents/category/65-maternal-child-and-adolescent-health',
    downloads: '28.4K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Pregnancy Nutrition', 'Lactation', 'Micronutrients', 'Iron Supplements'],
    icon: FileText
  },
  {
    id: 4,
    title: 'Nigerian Food-Based Dietary Guidelines',
    description: 'Local food-based dietary recommendations adapted for Nigerian families and children.',
    type: 'Dietary Guidelines',
    format: 'PDF Document',
    source: 'Federal Ministry of Health Nigeria',
    link: 'https://www.health.gov.ng/index.php/documents/category/65-maternal-child-and-adolescent-health',
    downloads: '31.9K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Local Foods', 'Dietary Guidelines', 'Family Nutrition'],
    icon: FileText
  },
  {
    id: 5,
    title: 'UNICEF Nigeria - Nutrition Education',
    description: 'Educational materials and campaigns on child nutrition and feeding practices.',
    type: 'Educational Campaign',
    format: 'Web Portal',
    source: 'UNICEF Nigeria',
    link: 'https://www.unicef.org/nigeria/maternal-and-child-health',
    downloads: '38.2K',
    lastUpdated: '2024',
    verifiedOfficial: true,
    topics: ['Nutrition Education', 'Campaigns', 'Community Awareness'],
    icon: Users
  },
  {
    id: 6,
    title: 'Breastfeeding Success Stories - Nigeria Health Watch',
    description: 'Real stories and experiences of successful breastfeeding journeys in Nigeria.',
    type: 'Success Stories',
    format: 'Web Articles',
    source: 'Nigeria Health Watch',
    link: 'https://nigeriahealthwatch.com/tag/maternal-and-child-health/',
    downloads: '24.6K',
    lastUpdated: '2024',
    verifiedOfficial: false,
    topics: ['Success Stories', 'Real Experiences', 'Community Support'],
    icon: Users
  }
];

const NutritionResources = ({ searchTerm }: NutritionResourcesProps) => {
  const filteredResources = nutritionResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Nutrition & Feeding Resources</h3>
        <p className="text-gray-600">
          Evidence-based nutrition guidelines for mothers and children, featuring local Nigerian foods and practices.
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
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
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

export default NutritionResources;
