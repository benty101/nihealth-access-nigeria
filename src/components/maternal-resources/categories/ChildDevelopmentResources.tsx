
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Download, TrendingUp, CheckCircle, Baby, Brain, Heart } from 'lucide-react';

interface ChildDevelopmentResourcesProps {
  searchTerm: string;
}

const developmentResources = [
  {
    id: 1,
    title: 'Child Growth and Development Monitoring Guidelines',
    description: 'WHO and Nigerian standards for monitoring physical growth, cognitive development, and developmental milestones.',
    type: 'Official Guidelines',
    format: 'PDF Document',
    source: 'Federal Ministry of Health Nigeria',
    link: 'https://www.health.gov.ng/index.php/documents/category/65-maternal-child-and-adolescent-health',
    downloads: '41.7K',
    ageGroup: '0-5 years',
    isOfficial: true,
    topics: ['Growth Monitoring', 'Developmental Milestones', 'Assessment Tools', 'Early Intervention']
  },
  {
    id: 2,
    title: 'WHO Child Growth Standards for Nigeria',
    description: 'Updated WHO growth charts and percentile tools adapted for Nigerian children with local context.',
    type: 'Growth Standards',
    format: 'Interactive Charts',
    source: 'WHO Nigeria Office',
    link: 'https://www.afro.who.int/countries/nigeria',
    downloads: '35.2K',
    ageGroup: '0-5 years',
    isOfficial: true,
    topics: ['Growth Charts', 'Weight Monitoring', 'Height Tracking', 'BMI Assessment']
  },
  {
    id: 3,
    title: 'Early Childhood Development Programme',
    description: 'UNICEF\'s comprehensive early childhood development resources, including cognitive and social development activities.',
    type: 'Programme Resources',
    format: 'Web Portal',
    source: 'UNICEF Nigeria',
    link: 'https://www.unicef.org/nigeria/maternal-and-child-health',
    downloads: '48.3K',
    ageGroup: '0-6 years',
    isOfficial: true,
    topics: ['Cognitive Development', 'Social Skills', 'Learning Activities', 'Parental Guidance']
  },
  {
    id: 4,
    title: 'Developmental Screening and Early Intervention',
    description: 'Guidelines for identifying developmental delays and disabilities, with referral pathways and intervention strategies.',
    type: 'Screening Guidelines',
    format: 'Clinical Protocol',
    source: 'Nigeria Health Watch',
    link: 'https://nigeriahealthwatch.com/tag/maternal-and-child-health/',
    downloads: '22.8K',
    ageGroup: '0-3 years',
    isOfficial: false,
    topics: ['Developmental Screening', 'Early Detection', 'Intervention Strategies', 'Support Services']
  },
  {
    id: 5,
    title: 'Play-Based Learning and Development Activities',
    description: 'Age-appropriate activities and games that promote healthy child development using local resources.',
    type: 'Activity Guide',
    format: 'Educational Materials',
    source: 'Wellbeing Foundation Africa',
    link: 'https://www.wellbeingfoundationafrica.org/',
    downloads: '33.5K',
    ageGroup: '1-5 years',
    isOfficial: false,
    topics: ['Play Activities', 'Learning Games', 'Motor Skills', 'Creative Development']
  },
  {
    id: 6,
    title: 'Nutrition and Brain Development Connection',
    description: 'Research-based information on how nutrition affects brain development and cognitive function in early childhood.',
    type: 'Research Insights',
    format: 'Educational Articles',
    source: 'MamaYe Nigeria',
    link: 'https://mamaye.org/',
    downloads: '18.9K',
    ageGroup: '0-2 years',
    isOfficial: false,
    topics: ['Brain Development', 'Nutrition Impact', 'Cognitive Function', 'Research Findings']
  }
];

const developmentalMilestones = [
  {
    age: '0-3 months',
    physical: 'Lifts head, follows objects with eyes',
    cognitive: 'Recognizes familiar voices, responds to sounds',
    social: 'Smiles socially, makes eye contact',
    icon: Baby
  },
  {
    age: '4-6 months',
    physical: 'Rolls over, sits with support',
    cognitive: 'Reaches for objects, explores with mouth',
    social: 'Laughs, enjoys social play',
    icon: Heart
  },
  {
    age: '7-12 months',
    physical: 'Crawls, pulls to stand, first steps',
    cognitive: 'Says first words, understands "no"',
    social: 'Plays peek-a-boo, shows stranger anxiety',
    icon: TrendingUp
  },
  {
    age: '1-2 years',
    physical: 'Walks independently, climbs stairs',
    cognitive: 'Vocabulary grows, follows simple instructions',
    social: 'Shows affection, parallel play',
    icon: Brain
  }
];

const ChildDevelopmentResources = ({ searchTerm }: ChildDevelopmentResourcesProps) => {
  const filteredResources = developmentResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Child Development Resources</h3>
        <p className="text-gray-600">
          Comprehensive guides for monitoring child growth, development milestones, and early childhood development activities.
        </p>
      </div>

      {/* Developmental Milestones Quick Reference */}
      <Card className="mb-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-teal-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Developmental Milestones Quick Reference
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {developmentalMilestones.map((milestone, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-teal-200">
                <div className="flex items-center mb-3">
                  <milestone.icon className="h-6 w-6 text-teal-600 mr-2" />
                  <div className="font-medium text-teal-900">{milestone.age}</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong className="text-gray-700">Physical:</strong>
                    <div className="text-gray-600">{milestone.physical}</div>
                  </div>
                  <div>
                    <strong className="text-gray-700">Cognitive:</strong>
                    <div className="text-gray-600">{milestone.cognitive}</div>
                  </div>
                  <div>
                    <strong className="text-gray-700">Social:</strong>
                    <div className="text-gray-600">{milestone.social}</div>
                  </div>
                </div>
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
                <TrendingUp className="h-5 w-5 text-teal-400" />
              </div>
              
              <CardTitle className="text-lg leading-tight group-hover:text-teal-600 transition-colors">
                {resource.title}
              </CardTitle>
              
              <p className="text-gray-600 text-sm line-clamp-2">{resource.description}</p>
              
              <div className="flex items-center justify-between mt-3">
                <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700">
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
                  <span>Evidence-Based</span>
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

      {/* Red Flags for Development */}
      <Card className="mt-6 border-l-4 border-l-red-500 bg-red-50">
        <CardContent className="p-6">
          <h4 className="font-semibold text-red-900 mb-3 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            When to Seek Professional Help
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-red-800">
            <div>
              <strong>Physical Development:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Not sitting by 9 months</li>
                <li>Not walking by 18 months</li>
                <li>Loss of previously acquired skills</li>
                <li>Significant delays in motor skills</li>
              </ul>
            </div>
            <div>
              <strong>Cognitive & Social:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>No words by 15 months</li>
                <li>No eye contact or social smiles</li>
                <li>Not responding to name by 12 months</li>
                <li>Extreme difficulty with transitions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildDevelopmentResources;
