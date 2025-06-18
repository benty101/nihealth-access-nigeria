
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Download, Apple, CheckCircle, Utensils, Baby } from 'lucide-react';

interface NutritionResourcesProps {
  searchTerm: string;
}

const nutritionResources = [
  {
    id: 1,
    title: 'Maternal Nutrition Guidelines During Pregnancy',
    description: 'Comprehensive nutrition guidelines for pregnant women, including essential nutrients, meal planning, and weight gain recommendations.',
    type: 'Official Guidelines',
    format: 'PDF Document',
    source: 'Federal Ministry of Health Nigeria',
    link: 'https://www.health.gov.ng/index.php/documents/category/65-maternal-child-and-adolescent-health',
    downloads: '38.4K',
    category: 'Maternal Nutrition',
    verifiedOfficial: true,
    topics: ['Pregnancy Diet', 'Essential Nutrients', 'Weight Gain', 'Meal Planning']
  },
  {
    id: 2,
    title: 'Exclusive Breastfeeding Promotion Guidelines',
    description: 'Evidence-based guidelines promoting exclusive breastfeeding for the first 6 months, with practical tips and common challenges.',
    type: 'Feeding Guidelines',
    format: 'Educational Materials',
    source: 'UNICEF Nigeria',
    link: 'https://www.unicef.org/nigeria/maternal-and-child-health',
    downloads: '52.7K',
    category: 'Infant Feeding',
    verifiedOfficial: true,
    topics: ['Exclusive Breastfeeding', 'Nutritional Benefits', 'Feeding Techniques', 'Common Issues']
  },
  {
    id: 3,
    title: 'Complementary Feeding Guidelines (6+ months)',
    description: 'Step-by-step introduction to solid foods, age-appropriate recipes using local Nigerian ingredients.',
    type: 'Feeding Guidelines',
    format: 'Educational Guide',
    source: 'National Primary Health Care Development Agency',
    link: 'https://nphcda.gov.ng/',
    downloads: '45.1K',
    category: 'Child Nutrition',
    verifiedOfficial: true,
    topics: ['Solid Foods Introduction', 'Local Recipes', 'Age-Appropriate Foods', 'Nutritional Balance']
  },
  {
    id: 4,
    title: 'Nigerian Superfoods for Mothers and Children',
    description: 'Guide to nutrient-rich local foods like moringa, garden eggs, and palm fruit that support maternal and child health.',
    type: 'Nutritional Education',
    format: 'Web Articles',
    source: 'Nigeria Health Watch',
    link: 'https://nigeriahealthwatch.com/tag/maternal-and-child-health/',
    downloads: '29.8K',
    category: 'Local Nutrition',
    verifiedOfficial: false,
    topics: ['Local Superfoods', 'Nutrient Content', 'Traditional Foods', 'Health Benefits']
  },
  {
    id: 5,
    title: 'Malnutrition Prevention and Management',
    description: 'Comprehensive guide to preventing and managing malnutrition in children, including screening tools and treatment protocols.',
    type: 'Clinical Guidelines',
    format: 'Clinical Protocol',
    source: 'Wellbeing Foundation Africa',
    link: 'https://www.wellbeingfoundationafrica.org/',
    downloads: '33.2K',
    category: 'Clinical Nutrition',
    verifiedOfficial: false,
    topics: ['Malnutrition Prevention', 'Screening Tools', 'Treatment Protocols', 'Recovery Monitoring']
  },
  {
    id: 6,
    title: 'Micronutrient Supplementation Guidelines',
    description: 'Guidelines for iron, folic acid, vitamin A, and zinc supplementation during pregnancy and childhood.',
    type: 'Supplementation Guide',
    format: 'Clinical Guidelines',
    source: 'WHO Nigeria Office',
    link: 'https://www.afro.who.int/countries/nigeria',
    downloads: '27.6K',
    category: 'Supplements',
    verifiedOfficial: true,
    topics: ['Iron Supplementation', 'Folic Acid', 'Vitamin A', 'Zinc', 'Dosage Guidelines']
  }
];

const localSuperfoods = [
  { name: 'Moringa Leaves', benefit: 'Rich in iron, calcium, vitamin A & C', icon: '🌿' },
  { name: 'Garden Eggs', benefit: 'High in folate and fiber', icon: '🍆' },
  { name: 'Palm Fruit', benefit: 'Excellent source of vitamin A', icon: '🟤' },
  { name: 'Bitter Leaf', benefit: 'Helps regulate blood sugar', icon: '🥬' },
  { name: 'Ugwu (Fluted Pumpkin)', benefit: 'High protein and iron content', icon: '🥒' },
  { name: 'Waterleaf', benefit: 'Contains omega-3 fatty acids', icon: '🌱' }
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
          Comprehensive nutrition guidelines for maternal health, breastfeeding, and child feeding practices.
        </p>
      </div>

      {/* Nigerian Superfoods Section */}
      <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-green-900 mb-4 flex items-center">
            <Apple className="h-5 w-5 mr-2" />
            Nigerian Superfoods for Mothers & Children
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {localSuperfoods.map((food, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-green-200">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">{food.icon}</span>
                  <div className="font-medium text-green-900">{food.name}</div>
                </div>
                <div className="text-sm text-gray-600">{food.benefit}</div>
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
                <div className="flex items-center">
                  {resource.category.includes('Infant') ? (
                    <Baby className="h-5 w-5 text-blue-400" />
                  ) : (
                    <Utensils className="h-5 w-5 text-green-400" />
                  )}
                </div>
              </div>
              
              <CardTitle className="text-lg leading-tight group-hover:text-green-600 transition-colors">
                {resource.title}
              </CardTitle>
              
              <p className="text-gray-600 text-sm line-clamp-2">{resource.description}</p>
              
              <div className="flex items-center justify-between mt-3">
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                  {resource.category}
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
