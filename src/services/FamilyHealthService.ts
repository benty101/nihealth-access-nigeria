import { supabase } from '@/integrations/supabase/client';
import { NotificationService } from './NotificationService';

export interface FamilyHealthShare {
  id: string;
  user_id: string;
  shared_with_user_id: string;
  health_data_type: 'timeline_event' | 'lab_result' | 'medication' | 'appointment' | 'full_profile';
  related_id?: string;
  permission_level: 'view' | 'comment' | 'emergency_only';
  expires_at?: string;
  created_at: string;
  updated_at: string;
  status: 'pending' | 'accepted' | 'rejected' | 'revoked';
}

export interface FamilyConnection {
  id: string;
  user_id: string;
  connected_user_id: string;
  relationship: string;
  connection_status: 'pending' | 'accepted' | 'blocked';
  created_at: string;
  mutual_sharing: boolean;
}

export class FamilyHealthService {
  // Family connections
  static async inviteFamilyMember(email: string, relationship: string, userId: string) {
    // Check if user exists
    const { data: existingUser, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (userError) {
      throw new Error('User not found');
    }

    // Create connection invitation
    const { data, error } = await supabase
      .from('family_connections')
      .insert({
        user_id: userId,
        invited_email: email,
        relationship,
        connection_status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating family invitation:', error);
      throw error;
    }

    return data;
  }

  static async acceptFamilyInvitation(invitationId: string, userId: string) {
    const { data, error } = await supabase
      .from('family_connections')
      .update({
        connected_user_id: userId,
        connection_status: 'accepted',
      })
      .eq('id', invitationId)
      .select()
      .single();

    if (error) {
      console.error('Error accepting family invitation:', error);
      throw error;
    }

    return data;
  }

  static async getFamilyConnections(userId: string): Promise<FamilyConnection[]> {
    const { data, error } = await supabase
      .from('family_connections')
      .select(`
        *,
        connected_profile:profiles!family_connections_connected_user_id_fkey(full_name, phone_number)
      `)
      .or(`user_id.eq.${userId},connected_user_id.eq.${userId}`)
      .eq('connection_status', 'accepted');

    if (error) {
      console.error('Error fetching family connections:', error);
      return [];
    }

    return data || [];
  }

  // Health data sharing
  static async shareHealthData(
    userId: string,
    sharedWithUserId: string,
    healthDataType: string,
    relatedId?: string,
    permissionLevel: 'view' | 'comment' | 'emergency_only' = 'view',
    expiresAt?: string
  ) {
    const { data, error } = await supabase
      .from('family_health_shares')
      .insert({
        user_id: userId,
        shared_with_user_id: sharedWithUserId,
        health_data_type: healthDataType,
        related_id: relatedId,
        permission_level: permissionLevel,
        expires_at: expiresAt,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Error sharing health data:', error);
      throw error;
    }

    // Notify the recipient
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', userId)
      .single();

    await NotificationService.notifyFamilyUpdate(
      sharedWithUserId,
      profile?.full_name || 'Family member',
      `Shared their ${healthDataType} with you`
    );

    return data;
  }

  static async getSharedHealthData(userId: string) {
    const { data, error } = await supabase
      .from('family_health_shares')
      .select(`
        *,
        sharer_profile:profiles!family_health_shares_user_id_fkey(full_name),
        shared_timeline:health_timeline_events(*)
      `)
      .eq('shared_with_user_id', userId)
      .eq('status', 'accepted')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching shared health data:', error);
      return [];
    }

    return data || [];
  }

  static async acceptHealthShare(shareId: string) {
    const { data, error } = await supabase
      .from('family_health_shares')
      .update({ status: 'accepted' })
      .eq('id', shareId)
      .select()
      .single();

    if (error) {
      console.error('Error accepting health share:', error);
      throw error;
    }

    return data;
  }

  static async revokeHealthShare(shareId: string) {
    const { data, error } = await supabase
      .from('family_health_shares')
      .update({ status: 'revoked' })
      .eq('id', shareId)
      .select()
      .single();

    if (error) {
      console.error('Error revoking health share:', error);
      throw error;
    }

    return data;
  }

  // Family health insights
  static async getFamilyHealthInsights(userId: string) {
    const connections = await this.getFamilyConnections(userId);
    const sharedData = await this.getSharedHealthData(userId);
    
    // Analyze family health patterns
    const insights = {
      totalFamilyMembers: connections.length,
      recentShares: sharedData.filter(share => {
        const shareDate = new Date(share.created_at);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return shareDate >= weekAgo;
      }).length,
      emergencyContacts: connections.filter(conn => 
        conn.relationship === 'spouse' || 
        conn.relationship === 'parent' || 
        conn.relationship === 'child'
      ).length,
    };

    return insights;
  }
}