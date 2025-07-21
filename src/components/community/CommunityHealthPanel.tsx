import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Heart, 
  Share2, 
  Plus, 
  MessageCircle,
  Shield,
  UserPlus,
  Home
} from 'lucide-react';

export const CommunityHealthPanel: React.FC = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [communityInsights, setCommunityInsights] = useState([]);

  useEffect(() => {
    // Mock family and community data
    setFamilyMembers([
      {
        id: '1',
        name: 'Sarah J.',
        relationship: 'Mother',
        status: 'connected',
        lastActivity: '2 days ago',
        sharedConditions: ['Hypertension'],
        avatar: null
      },
      {
        id: '2', 
        name: 'Michael J.',
        relationship: 'Brother',
        status: 'pending',
        lastActivity: null,
        sharedConditions: [],
        avatar: null
      }
    ]);

    setCommunityInsights([
      {
        title: 'Family Heart Health',
        description: 'Cardiovascular conditions detected in 2 family members',
        priority: 'medium',
        actionable: true
      },
      {
        title: 'Genetic Insights Available',
        description: 'Unlock family genetic patterns with premium features',
        priority: 'low',
        actionable: true
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'invited': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Family Connections */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Home className="w-4 h-4 text-primary" />
            Family Health Circle
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {familyMembers.length > 0 ? (
            <>
              {familyMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg border bg-card">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="text-xs">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{member.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {member.relationship}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(member.status)} >
                        {member.status}
                      </Badge>
                      {member.lastActivity && (
                        <span className="text-xs text-muted-foreground">
                          {member.lastActivity}
                        </span>
                      )}
                    </div>
                    {member.sharedConditions.length > 0 && (
                      <div className="mt-1">
                        <span className="text-xs text-muted-foreground">
                          Shared: {member.sharedConditions.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                  {member.status === 'connected' && (
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                <UserPlus className="w-3 h-3 mr-1" />
                Invite Family Member
              </Button>
            </>
          ) : (
            <div className="text-center py-4">
              <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground mb-3">
                No family connections yet
              </p>
              <Button size="sm" className="w-full">
                <Plus className="w-3 h-3 mr-1" />
                Add Family Members
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Community Insights */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Heart className="w-4 h-4 text-primary" />
            Family Health Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {communityInsights.map((insight, index) => (
            <div key={index} className="p-3 rounded-lg border bg-card">
              <h4 className="text-sm font-medium mb-1">{insight.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">{insight.description}</p>
              {insight.actionable && (
                <Button variant="outline" size="sm" className="text-xs">
                  Learn More
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Privacy & Sharing */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-primary" />
            Privacy Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs">Share health updates</span>
              <Badge variant="outline" className="text-xs">Family only</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs">Emergency access</span>
              <Badge variant="outline" className="text-xs">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs">Data anonymization</span>
              <Badge variant="outline" className="text-xs">Active</Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            <Shield className="w-3 h-3 mr-1" />
            Manage Privacy
          </Button>
        </CardContent>
      </Card>

      {/* Sharing & Export */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <Share2 className="w-6 h-6 text-blue-600 mx-auto" />
            <h4 className="text-sm font-semibold">Share Health Data</h4>
            <p className="text-xs text-muted-foreground">
              Securely share your timeline with healthcare providers
            </p>
            <Button size="sm" variant="outline" className="w-full">
              Generate Share Link
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};