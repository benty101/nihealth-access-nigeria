
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Gift, CheckCircle } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Milestone {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  achieved: boolean;
  points: number;
  badge: string;
  progress?: number;
}

interface ResourceGamificationProps {
  milestones: Milestone[];
}

const ResourceGamification = ({ milestones }: ResourceGamificationProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-6 border border-teal-100">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Your Health Journey Progress</h3>
        <p className="text-gray-600 mb-4">Track your milestones and earn points for healthy habits!</p>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="font-medium">Total Points: 175</span>
          </div>
          <div className="flex items-center space-x-2">
            <Gift className="h-5 w-5 text-purple-500" />
            <span className="font-medium">Achievements: 2/5</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {milestones.map((milestone) => {
          const IconComponent = milestone.icon;
          return (
            <Card key={milestone.id} className={`transition-all ${milestone.achieved ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200' : 'hover:shadow-md'}`}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    milestone.achieved 
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600' 
                      : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`h-6 w-6 ${milestone.achieved ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${milestone.achieved ? 'text-emerald-600' : 'text-gray-500'}`}>
                      {milestone.points} pts
                    </div>
                    <Badge variant={milestone.achieved ? "default" : "outline"} className={
                      milestone.achieved 
                        ? milestone.badge === 'gold' ? 'bg-yellow-500' : milestone.badge === 'silver' ? 'bg-gray-400' : 'bg-orange-500'
                        : ''
                    }>
                      {milestone.badge}
                    </Badge>
                  </div>
                </div>
                <CardTitle className={`text-lg ${milestone.achieved ? 'text-emerald-900' : 'text-gray-900'}`}>
                  {milestone.title}
                </CardTitle>
                <p className={`text-sm ${milestone.achieved ? 'text-emerald-700' : 'text-gray-600'}`}>
                  {milestone.description}
                </p>
              </CardHeader>
              <CardContent>
                {milestone.achieved ? (
                  <div className="flex items-center space-x-2 text-emerald-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Completed!</span>
                  </div>
                ) : milestone.progress ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{milestone.progress}/{milestone.id === 3 ? 20 : milestone.id === 4 ? 15 : 5}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-teal-600 h-2 rounded-full transition-all" 
                        style={{ 
                          width: `${(milestone.progress / (milestone.id === 3 ? 20 : milestone.id === 4 ? 15 : 5)) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">
                    Get started to unlock this milestone!
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ResourceGamification;
