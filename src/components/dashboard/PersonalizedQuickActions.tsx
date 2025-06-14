
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { QuickAction } from '@/services/PersonalizationService';

interface PersonalizedQuickActionsProps {
  quickActions: QuickAction[];
}

const PersonalizedQuickActions = ({ quickActions }: PersonalizedQuickActionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {quickActions.map((action, index) => (
        <Card key={index} className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-lg ${action.color} ${action.hoverColor} flex items-center justify-center transition-colors`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PersonalizedQuickActions;
