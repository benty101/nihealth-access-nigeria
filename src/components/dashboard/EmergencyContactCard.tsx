
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Phone, Edit, Plus, Trash2, UserCheck, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isPrimary?: boolean;
}

const EmergencyContactCard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasProfileContact, setHasProfileContact] = useState(false);

  useEffect(() => {
    if (user) {
      loadEmergencyContacts();
    }
  }, [user]);

  const loadEmergencyContacts = async () => {
    if (!user) return;

    try {
      // Check if user has emergency contact in profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('emergency_contact_name, emergency_contact_phone')
        .eq('id', user.id)
        .single();

      const contactsList: EmergencyContact[] = [];

      if (profile?.emergency_contact_name && profile?.emergency_contact_phone) {
        contactsList.push({
          id: 'profile-contact',
          name: profile.emergency_contact_name,
          phone: profile.emergency_contact_phone,
          relationship: 'Primary Emergency Contact',
          isPrimary: true
        });
        setHasProfileContact(true);
      } else {
        setHasProfileContact(false);
      }

      setContacts(contactsList);
    } catch (error) {
      console.error('Error loading emergency contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleAddContact = () => {
    navigate('/profile');
    toast({
      title: "Complete Profile",
      description: "Add your emergency contact information in your profile settings.",
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-red-600" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-red-600" />
            Emergency Contacts
          </CardTitle>
          {hasProfileContact && (
            <Button size="sm" variant="outline" onClick={() => navigate('/profile')}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!hasProfileContact ? (
          <div className="text-center py-6">
            <div className="mb-4">
              <AlertTriangle className="h-12 w-12 text-orange-400 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">No Emergency Contact</h3>
              <p className="text-sm text-gray-600 mb-4">
                Add someone we can contact in case of emergency
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-4">
              <div className="flex items-center text-orange-800 mb-1">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span className="font-medium text-sm">Important Safety Step</span>
              </div>
              <p className="text-xs text-orange-700">
                Having an emergency contact is crucial for your safety and helps us provide better care.
              </p>
            </div>
            <Button onClick={handleAddContact} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Emergency Contact
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{contact.name}</h4>
                    {contact.isPrimary && (
                      <Badge variant="secondary" className="text-xs">Primary</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{contact.relationship}</p>
                  <p className="text-sm text-gray-500">{contact.phone}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCall(contact.phone)}
                    className="h-8 w-8 p-0"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center text-green-800">
                <UserCheck className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Emergency Contact Added</span>
              </div>
              <p className="text-xs text-green-700 mt-1">
                Your emergency contact is ready. You can update it anytime in your profile.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmergencyContactCard;
