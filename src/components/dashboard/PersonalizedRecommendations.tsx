
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Recommendation } from '@/services/PersonalizationService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import BookAppointmentModal from './BookAppointmentModal';

interface PersonalizedRecommendationsProps {
  recommendations: Recommendation[];
}

const PersonalizedRecommendations = ({ recommendations }: PersonalizedRecommendationsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  if (recommendations.length === 0) return null;

  const handleRecommendationAction = (action: string, title: string) => {
    console.log(`Recommendation action: ${action} for ${title}`);
    
    switch (action.toLowerCase()) {
      case 'find care':
      case 'find doctors':
      case 'book consultation':
      case 'schedule':
      case 'book':
      case 'book appointment':
        setIsBookingModalOpen(true);
        break;
      case 'compare plans':
      case 'get quote':
      case 'explore':
        navigate('/insurance');
        toast({
          title: "Navigating",
          description: `Opening insurance plans`,
        });
        break;
      case 'order now':
      case 'setup':
        navigate('/pharmacy');
        toast({
          title: "Navigating",
          description: `Opening pharmacy`,
        });
        break;
      case 'view':
      case 'view details':
      case 'learn more':
        navigate('/emergency');
        toast({
          title: "Navigating",
          description: `Opening emergency services`,
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
          description: `${action} feature coming soon!`,
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
      <Card className="mb-8 border-l-4 border-l-teal-500">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2 text-teal-600" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((rec, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border-l-4 ${
                  rec.priority === 'high' ? 'bg-red-50 border-l-red-400' : 'bg-blue-50 border-l-blue-400'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <rec.icon className={`h-5 w-5 mr-3 ${
                      rec.priority === 'high' ? 'text-red-600' : 'text-blue-600'
                    }`} />
                    <div>
                      <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="ml-4"
                    onClick={() => handleRecommendationAction(rec.action, rec.title)}
                  >
                    {rec.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <BookAppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onSuccess={handleBookingSuccess}
      />
    </>
  );
};

export default PersonalizedRecommendations;
