
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Calculator, 
  Ruler, 
  Clock, 
  Phone, 
  FileText,
  Heart,
  TrendingUp
} from 'lucide-react';

const tools = [
  {
    id: 'due-date',
    title: 'Due Date Calculator',
    description: 'Calculate your expected delivery date',
    icon: Calendar,
    color: 'from-pink-500 to-rose-500',
    action: 'Calculate'
  },
  {
    id: 'growth-tracker',
    title: 'Child Growth Tracker',
    description: 'Monitor your child\'s development',
    icon: TrendingUp,
    color: 'from-purple-500 to-indigo-500',
    action: 'Track Growth'
  },
  {
    id: 'bmi-calculator',
    title: 'Pregnancy BMI Calculator',
    description: 'Check healthy weight gain',
    icon: Calculator,
    color: 'from-blue-500 to-cyan-500',
    action: 'Calculate BMI'
  },
  {
    id: 'kick-counter',
    title: 'Baby Kick Counter',
    description: 'Track your baby\'s movements',
    icon: Heart,
    color: 'from-green-500 to-emerald-500',
    action: 'Count Kicks'
  },
  {
    id: 'feeding-timer',
    title: 'Feeding Timer',
    description: 'Time breastfeeding sessions',
    icon: Clock,
    color: 'from-orange-500 to-amber-500',
    action: 'Start Timer'
  },
  {
    id: 'emergency-contacts',
    title: 'Emergency Contacts',
    description: 'Quick access to help',
    icon: Phone,
    color: 'from-red-500 to-pink-500',
    action: 'View Contacts'
  }
];

const QuickAccessTools = () => {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Quick Access Tools</h2>
        <p className="text-gray-600">Essential calculators and trackers for your maternal journey</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card key={tool.id} className="hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 hover:border-purple-200">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                  <tool.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg text-gray-900">{tool.title}</CardTitle>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                className={`w-full bg-gradient-to-r ${tool.color} hover:opacity-90 text-white shadow-md`}
              >
                {tool.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessTools;
