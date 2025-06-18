
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';
import { SmartRecommendation } from '@/services/SmartRecommendationsService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import BookAppointmentModal from './BookAppointmentModal';

interface SmartRecommendationItemProps {
  recommendation: SmartRecommendation;
}

const SmartRecommendationItem = ({ recommendation: rec }: SmartRecommendationItemProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleAction = () => {
    console.log(`Smart recommendation action: ${rec.action} for ${rec.title}`);
    
    switch (rec.action.toLowerCase()) {
      case 'book appointment':
      case 'book consultation':
      case 'find pediatricians':
        setIsBookingModalOpen(true);
        break;
      case 'compare plans':
      case 'get quote':
      case 'learn more':
        navigate('/insurance');
        toast({
          title: "Navigating",
          description: `Opening insurance plans`,
        });
        break;
      case 'view services':
      case 'view details':
        navigate('/hospitals');
        toast({
          title: "Navigating",
          description: `Opening hospitals directory`,
        });
        break;
      case 'start consultation':
        navigate('/telemedicine');
        toast({
          title: "Navigating",
          description: `Opening telemedicine`,
        });
        break;
      default:
        toast({
          title: "Feature",
          description: `${rec.action} feature coming soon!`,
        });
    }
  };

  const handleBookingSuccess = () => {
    toast({
      title: "Success",
      description: "Appointment booked successfully!",
    });
  };

  return (
    <>
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
            onClick={handleAction}
          >
            {rec.action}
          </Button>
        </div>
      </div>

      <BookAppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onSuccess={handleBookingSuccess}
      />
    </>
  );
};

export default SmartRecommendationItem;
