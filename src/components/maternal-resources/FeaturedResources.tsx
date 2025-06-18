
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Download, Star, Eye, Clock } from 'lucide-react';

const featuredResources = [
  {
    id: 1,
    title: 'Official Nigerian Immunization Schedule 2024',
    description: 'Complete vaccination timeline from NPHCDA with all recommended vaccines for children 0-5 years.',
    source: 'NPHCDA Official',
    link: 'https://nphcda.gov.ng/',
    type: 'Official Guidelines',
    readTime: '10 min read',
    downloads: '15.2K',
    rating: 4.9,
    isNew: true,
    category: 'immunization'
  },
  {
    id: 2,
    title: 'Maternal Health Guidelines - Federal Ministry of Health',
    description: 'Comprehensive antenatal, delivery, and postnatal care guidelines for Nigerian healthcare workers and mothers.',
    source: 'Federal Ministry of Health',
    link: 'https://www.health.gov.ng/index.php/documents/category/65-maternal-child-and-adolescent-health',
    type: 'Official Guidelines',
    readTime: '25 min read',
    downloads: '22.8K',
    rating: 4.8,
    isNew: false,
    category: 'pregnancy'
  },
  {
    id: 3,
    title: 'Child Growth Monitoring Charts (WHO Standards)',
    description: 'Updated growth charts and monitoring tools adapted for Nigerian children with local context.',
    source: 'WHO/UNICEF Nigeria',
    link: 'https://www.unicef.org/nigeria/maternal-and-child-health',
    type: 'Clinical Tools',
    readTime: '8 min read',
    downloads: '18.5K',
    rating: 4.9,
    isNew: true,
    category: 'childhealth'
  },
  {
    id: 4,
    title: 'Exclusive Breastfeeding Guide for Nigerian Mothers',
    description: 'Evidence-based breastfeeding practices with cultural considerations and local support resources.',
    source: 'Nigeria Health Watch',
    link: 'https://nigeriahealthwatch.com/tag/maternal-and-child-health/',
    type: 'Educational Article',
    readTime: '12 min read',
    downloads: '31.2K',
    rating: 4.7,
    isNew: false,
    category: 'nutrition'
  }
];

const FeaturedResources = () => {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Resources</h2>
        <p className="text-gray-600">Most trusted and frequently accessed maternal health resources</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-xl transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">
                    {resource.type}
                  </Badge>
                  {resource.isNew && (
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      New
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  {resource.rating}
                </div>
              </div>
              
              <CardTitle className="text-xl leading-tight group-hover:text-purple-600 transition-colors">
                {resource.title}
              </CardTitle>
              
              <p className="text-gray-600 line-clamp-2">{resource.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-3">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {resource.readTime}
                </div>
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  {resource.downloads}
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  Verified
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{resource.source}</p>
                  <p className="text-xs text-gray-500">Official Source</p>
                </div>
                
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
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

export default FeaturedResources;
