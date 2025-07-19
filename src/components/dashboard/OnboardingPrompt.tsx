import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Heart, MapPin, Target } from 'lucide-react';

const OnboardingPrompt = () => {
  const navigate = useNavigate();

  const handleStartOnboarding = () => {
    navigate('/onboarding');
  };

  return (
    <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardContent className="p-8 text-center">
        <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <User className="w-10 h-10 text-primary" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to MeddyPal!
        </h3>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          To provide you with personalized health recommendations and insights, 
          we need to learn a bit about your health journey and preferences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col items-center space-y-2">
            <Heart className="w-8 h-8 text-pink-500" />
            <span className="text-sm font-medium">Your Life Stage</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Target className="w-8 h-8 text-green-500" />
            <span className="text-sm font-medium">Health Goals</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <MapPin className="w-8 h-8 text-blue-500" />
            <span className="text-sm font-medium">Your Location</span>
          </div>
        </div>

        <Button 
          onClick={handleStartOnboarding}
          size="lg"
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark"
        >
          Complete Your Health Profile
        </Button>
        
        <p className="text-xs text-gray-500 mt-4">
          Takes less than 2 minutes • Your data is secure and private
        </p>
      </CardContent>
    </Card>
  );
};

export default OnboardingPrompt;