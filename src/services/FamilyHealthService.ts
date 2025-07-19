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
  connected_profile?: {
    full_name: string;
    phone_number: string;
  };
}

export class FamilyHealthService {
  // Mock data for now until types are updated
  static async inviteFamilyMember(email: string, relationship: string, userId: string) {
    // For now, return mock data
    return {
      id: Math.random().toString(),
      user_id: userId,
      invited_email: email,
      relationship,
      connection_status: 'pending',
      created_at: new Date().toISOString(),
    };
  }

  static async acceptFamilyInvitation(invitationId: string, userId: string) {
    // Mock implementation
    return {
      id: invitationId,
      connected_user_id: userId,
      connection_status: 'accepted',
    };
  }

  static async getFamilyConnections(userId: string): Promise<FamilyConnection[]> {
    // Mock data for demonstration
    return [
      {
        id: '1',
        user_id: userId,
        connected_user_id: 'user2',
        relationship: 'spouse',
        connection_status: 'accepted',
        created_at: new Date().toISOString(),
        mutual_sharing: true,
        connected_profile: {
          full_name: 'Family Member',
          phone_number: '+234xxx',
        },
      },
    ];
  }

  static async shareHealthData(
    userId: string,
    sharedWithUserId: string,
    healthDataType: string,
    relatedId?: string,
    permissionLevel: 'view' | 'comment' | 'emergency_only' = 'view',
    expiresAt?: string
  ) {
    // Mock implementation - notify the recipient
    await NotificationService.notifyFamilyUpdate(
      sharedWithUserId,
      'Family member',
      `Shared their ${healthDataType} with you`
    );

    return {
      id: Math.random().toString(),
      user_id: userId,
      shared_with_user_id: sharedWithUserId,
      health_data_type: healthDataType,
      related_id: relatedId,
      permission_level: permissionLevel,
      expires_at: expiresAt,
      status: 'pending',
      created_at: new Date().toISOString(),
    };
  }

  static async getSharedHealthData(userId: string) {
    // Mock data
    return [
      {
        id: '1',
        user_id: 'user2',
        shared_with_user_id: userId,
        health_data_type: 'timeline_event',
        status: 'accepted',
        created_at: new Date().toISOString(),
        sharer_profile: {
          full_name: 'Family Member',
        },
      },
    ];
  }

  static async acceptHealthShare(shareId: string) {
    return {
      id: shareId,
      status: 'accepted',
    };
  }

  static async revokeHealthShare(shareId: string) {
    return {
      id: shareId,
      status: 'revoked',
    };
  }

  static async getFamilyHealthInsights(userId: string) {
    const connections = await this.getFamilyConnections(userId);
    const sharedData = await this.getSharedHealthData(userId);
    
    return {
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
  }
}