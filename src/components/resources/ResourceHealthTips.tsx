
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle, MapPin } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface HealthTip {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
  tips: string[];
  isPopular: boolean;
  region: string;
}

interface ResourceHealthTipsProps {
  healthTips: HealthTip[];
  searchTerm: string;
}

const ResourceHealthTips = ({ healthTips, searchTerm }: ResourceHealthTipsProps) => {
  const filteredTips = healthTips.filter(tip =>
    tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tip.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tip.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTips.map((tip) => {
        const IconComponent = tip.icon;
        return (
          <Card key={tip.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary">{tip.category}</Badge>
                {tip.isPopular && (
                  <Badge className="bg-emerald-100 text-emerald-700">Popular</Badge>
                )}
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full flex items-center justify-center">
                  <IconComponent className="h-6 w-6 text-teal-600" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight">{tip.title}</CardTitle>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{tip.description}</p>
              <Badge variant="outline" className="text-xs">
                <MapPin className="h-3 w-3 mr-1" />
                {tip.region}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 mb-2">Key Tips:</h4>
                <div className="space-y-2">
                  {tip.tips.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ResourceHealthTips;
