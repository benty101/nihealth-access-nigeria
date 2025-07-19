
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { QuickAction } from '@/services/PersonalizationService';
import { useNavigate } from 'react-router-dom';

interface PersonalizedQuickActionsProps {
  quickActions: QuickAction[];
}

const PersonalizedQuickActions = ({ quickActions }: PersonalizedQuickActionsProps) => {
  const navigate = useNavigate();

  const handleActionClick = (action: QuickAction) => {
    // Map actions to routes
    const routeMap: Record<string, string> = {
      'Book Appointment': '/book-appointment',
      'Order Medication': '/pharmacy',
      'Book Lab Test': '/book-lab-test',
      'Find Hospital': '/hospitals',
      'Insurance': '/insurance',
      'Emergency': '/emergency'
    };
    
    const route = routeMap[action.title] || '/dashboard';
    navigate(route);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {quickActions.map((action, index) => (
        <Card 
          key={index} 
          className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          onClick={() => handleActionClick(action)}
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${action.color} ${action.hoverColor} flex items-center justify-center transition-colors flex-shrink-0`}>
                <action.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="ml-3 sm:ml-4 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{action.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{action.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PersonalizedQuickActions;
