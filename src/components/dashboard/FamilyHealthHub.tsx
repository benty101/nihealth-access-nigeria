import React, { useState, useEffect } from 'react';
import { Users, Share2, Heart, Plus, Mail, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { FamilyHealthService, FamilyConnection } from '@/services/FamilyHealthService';
import { useToast } from '@/hooks/use-toast';

const FamilyHealthHub = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [connections, setConnections] = useState<FamilyConnection[]>([]);
  const [sharedData, setSharedData] = useState<any[]>([]);
  const [insights, setInsights] = useState<any>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [relationship, setRelationship] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadFamilyData();
    }
  }, [user]);

  const loadFamilyData = async () => {
    if (!user) return;
    
    try {
      const [connectionsData, sharedData, insightsData] = await Promise.all([
        FamilyHealthService.getFamilyConnections(user.id),
        FamilyHealthService.getSharedHealthData(user.id),
        FamilyHealthService.getFamilyHealthInsights(user.id),
      ]);
      
      setConnections(connectionsData);
      setSharedData(sharedData);
      setInsights(insightsData);
    } catch (error) {
      console.error('Error loading family data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInviteFamilyMember = async () => {
    if (!user || !inviteEmail || !relationship) return;
    
    try {
      await FamilyHealthService.inviteFamilyMember(inviteEmail, relationship, user.id);
      toast({
        title: "Invitation sent!",
        description: `Family invitation sent to ${inviteEmail}`,
      });
      setShowInviteModal(false);
      setInviteEmail('');
      setRelationship('');
      loadFamilyData();
    } catch (error) {
      console.error('Error inviting family member:', error);
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      });
    }
  };

  const handleAcceptShare = async (shareId: string) => {
    try {
      await FamilyHealthService.acceptHealthShare(shareId);
      toast({
        title: "Health data accepted",
        description: "You can now view this family member's health information",
      });
      loadFamilyData();
    } catch (error) {
      console.error('Error accepting health share:', error);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Family Health Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Loading family data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Family Health Hub
          </CardTitle>
          <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Invite Family
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Family Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="family@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="relationship">Relationship</Label>
                  <Select value={relationship} onValueChange={setRelationship}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse/Partner</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="grandparent">Grandparent</SelectItem>
                      <SelectItem value="grandchild">Grandchild</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleInviteFamilyMember} className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Invitation
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Family insights */}
        {insights && (
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{insights.totalFamilyMembers}</div>
              <div className="text-sm text-muted-foreground">Family Members</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{insights.recentShares}</div>
              <div className="text-sm text-muted-foreground">Recent Shares</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{insights.emergencyContacts}</div>
              <div className="text-sm text-muted-foreground">Emergency Contacts</div>
            </div>
          </div>
        )}

        {/* Family connections */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Family Connections
          </h4>
          {connections.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No family connections yet. Invite your family to start sharing health information.
            </div>
          ) : (
            <div className="space-y-2">
              {connections.map((connection) => (
                <div key={connection.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{connection.connected_profile?.full_name || 'Family Member'}</p>
                    <p className="text-sm text-muted-foreground capitalize">{connection.relationship}</p>
                  </div>
                  <Badge variant="secondary">{connection.connection_status}</Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Shared health data */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Recent Health Shares
          </h4>
          {sharedData.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No recent health shares
            </div>
          ) : (
            <div className="space-y-2">
              {sharedData.slice(0, 3).map((share) => (
                <div key={share.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{share.sharer_profile?.full_name} shared {share.health_data_type}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(share.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {share.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleAcceptShare(share.id)}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {share.status === 'accepted' && (
                    <Badge variant="secondary">Active</Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FamilyHealthHub;