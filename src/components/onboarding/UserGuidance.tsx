
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, ArrowRight, Lightbulb } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface GuidanceStep {
  id: string;
  title: string;
  description: string;
  page: string;
  position: 'top' | 'bottom' | 'center';
}

const guidanceSteps: GuidanceStep[] = [
  {
    id: 'insurance-search',
    title: 'Smart Insurance Search',
    description: 'Use our intelligent search to find plans tailored to your needs. We\'ve pre-filled your location based on your profile.',
    page: '/insurance',
    position: 'top'
  },
  {
    id: 'dashboard-personalized',
    title: 'Your Personalized Dashboard',
    description: 'Your dashboard shows recommendations based on your life stage and health goals from onboarding.',
    page: '/dashboard',
    position: 'center'
  },
  {
    id: 'quick-actions',
    title: 'Quick Actions',
    description: 'These actions are customized based on your profile. Pregnant mothers see different options than general users.',
    page: '/dashboard',
    position: 'bottom'
  }
];

const UserGuidance = () => {
  const [currentStep, setCurrentStep] = useState<GuidanceStep | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showGuidance, setShowGuidance] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user has completed onboarding recently
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    const guidanceShown = localStorage.getItem('userGuidanceShown');
    
    if (onboardingCompleted && !guidanceShown) {
      // Show guidance for new users
      setShowGuidance(true);
      
      // Find guidance for current page
      const pageGuidance = guidanceSteps.find(step => step.page === location.pathname);
      if (pageGuidance && !completedSteps.includes(pageGuidance.id)) {
        setTimeout(() => setCurrentStep(pageGuidance), 1000);
      }
    }
  }, [location.pathname, completedSteps]);

  const handleStepComplete = () => {
    if (currentStep) {
      const newCompleted = [...completedSteps, currentStep.id];
      setCompletedSteps(newCompleted);
      setCurrentStep(null);
      
      // If all steps completed, mark guidance as shown
      if (newCompleted.length >= guidanceSteps.length) {
        localStorage.setItem('userGuidanceShown', 'true');
        setShowGuidance(false);
      }
    }
  };

  const handleDismissAll = () => {
    localStorage.setItem('userGuidanceShown', 'true');
    setShowGuidance(false);
    setCurrentStep(null);
  };

  if (!showGuidance || !currentStep) return null;

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-2xl border-2 border-teal-200 animate-in fade-in slide-in-from-bottom-4">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <Lightbulb className="h-4 w-4 text-teal-600" />
              </div>
              <div className="text-sm font-medium text-teal-600">
                Tip {completedSteps.length + 1} of {guidanceSteps.length}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismissAll}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {currentStep.title}
          </h3>
          
          <p className="text-gray-600 mb-6">
            {currentStep.description}
          </p>
          
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handleDismissAll}
              className="text-sm"
            >
              Skip All Tips
            </Button>
            
            <Button
              onClick={handleStepComplete}
              className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2"
            >
              Got it!
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Progress indicator */}
          <div className="flex gap-1 mt-4">
            {guidanceSteps.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded ${
                  index <= completedSteps.length ? 'bg-teal-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserGuidance;
