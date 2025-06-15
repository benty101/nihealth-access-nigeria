
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';
import { SmartRecommendation } from '@/services/SmartRecommendationsService';

interface SmartRecommendationItemProps {
  recommendation: SmartRecommendation;
}

const SmartRecommendationItem = ({ recommendation: rec }: SmartRecommendationItemProps) => {
  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg ${
            rec.type === 'emergency' ? 'bg-red-100' : 
            rec.type === 'hospital' ? 'bg-blue-100' :
            rec.type === 'insurance' ? 'bg-green-100' : 'bg-purple-100'
          }`}>
            <rec.icon className={`h-5 w-5 ${
              rec.type === 'emergency' ? 'text-red-600' :
              rec.type === 'hospital' ? 'text-blue-600' :
              rec.type === 'insurance' ? 'text-green-600' : 'text-purple-600'
            }`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-gray-900">{rec.title}</h4>
              {rec.rating && (
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-gray-600">{rec.rating}</span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
            <div className="flex items-center space-x-2 flex-wrap">
              <Badge variant="outline" className="text-xs">
                {rec.reason}
              </Badge>
              {rec.distance && (
                <Badge variant="outline" className="text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  {rec.distance}
                </Badge>
              )}
              {rec.location && (
                <Badge variant="outline" className="text-xs">
                  {rec.location}
                </Badge>
              )}
            </div>
          </div>
        </div>
        <Button 
          size="sm" 
          variant="outline"
          className={
            rec.type === 'emergency' ? 'border-red-200 text-red-700 hover:bg-red-50' :
            rec.priority === 1 ? 'border-teal-200 text-teal-700 hover:bg-teal-50' : ''
          }
        >
          {rec.action}
        </Button>
      </div>
    </div>
  );
};

export default SmartRecommendationItem;
