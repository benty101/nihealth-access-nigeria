import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ConsentService, ConsentType, UserConsent } from '@/services/ConsentService';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Heart, Share, Dna, Users, CheckCircle, XCircle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConsentManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConsentsComplete: () => void;
  requiredConsents?: string[];
  title?: string;
  description?: string;
}

export const ConsentManagementModal: React.FC<ConsentManagementModalProps> = ({
  isOpen,
  onClose,
  onConsentsComplete,
  requiredConsents = [],
  title = "Data Consent & Privacy Settings",
  description = "Choose how your health data can be used to improve healthcare for everyone"
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [consentTypes, setConsentTypes] = useState<ConsentType[]>([]);
  const [userConsents, setUserConsents] = useState<Record<string, boolean>>({});
  const [initialConsents, setInitialConsents] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && user) {
      loadConsentData();
    }
  }, [isOpen, user]);

  const loadConsentData = async () => {
    try {
      setLoading(true);
      
      // Load consent types
      const types = ConsentService.getConsentTypes();
      setConsentTypes(types);

      // Load user's current consents
      if (user) {
        const consents = await ConsentService.getUserConsents(user.id);
        const consentMap = consents.reduce((acc, consent) => {
          acc[consent.consent_type] = consent.consent_given;
          return acc;
        }, {} as Record<string, boolean>);
        
        setUserConsents(consentMap);
        setInitialConsents(consentMap);
      }
    } catch (error) {
      console.error('Error loading consent data:', error);
      toast({
        title: "Error",
        description: "Failed to load consent information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConsentChange = (consentType: string, granted: boolean) => {
    setUserConsents(prev => ({
      ...prev,
      [consentType]: granted
    }));
  };

  const handleSaveConsents = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Update only changed consents
      const updates = Object.entries(userConsents).filter(
        ([type, granted]) => initialConsents[type] !== granted
      );

      for (const [consentType, granted] of updates) {
        await ConsentService.updateConsent(user.id, consentType, granted);
      }

      // Check if all required consents are provided
      const hasRequiredConsents = requiredConsents.every(
        type => userConsents[type] === true
      );

      if (requiredConsents.length > 0 && !hasRequiredConsents) {
        toast({
          title: "Required Consents Missing",
          description: "Please provide all required consents to continue",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Consent Preferences Updated",
        description: "Your privacy settings have been saved successfully",
      });

      onConsentsComplete();
    } catch (error) {
      console.error('Error updating consents:', error);
      toast({
        title: "Error",
        description: "Failed to update consent preferences",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getConsentIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      research: <Heart className="h-5 w-5 text-red-500" />,
      biobanking: <Shield className="h-5 w-5 text-blue-500" />,
      data_sharing: <Share className="h-5 w-5 text-green-500" />,
      genomic_analysis: <Dna className="h-5 w-5 text-purple-500" />,
      family_sharing: <Users className="h-5 w-5 text-orange-500" />
    };
    return icons[type] || <Info className="h-5 w-5 text-gray-500" />;
  };

  const hasChanges = JSON.stringify(userConsents) !== JSON.stringify(initialConsents);
  const allRequiredProvided = requiredConsents.every(type => userConsents[type] === true);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {/* NABDA Partnership Notice */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">
                      NABDA Partnership for Nigerian Health Research
                    </h4>
                    <p className="text-sm text-blue-800">
                      MeddyPal partners with the National Biotechnology Development Agency (NABDA) 
                      to advance genomic medicine and health research for Nigerian populations. 
                      Your participation helps build better healthcare solutions for Africa.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Required Consents Warning */}
            {requiredConsents.length > 0 && (
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-2">Required Consents</h4>
                      <p className="text-sm text-amber-800">
                        Some consents are required to proceed with genomic testing and advanced health features.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Consent Options */}
            <div className="space-y-4">
              {consentTypes.map((consentType) => (
                <Card key={consentType.type} className="relative">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getConsentIcon(consentType.type)}
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {consentType.title}
                            {requiredConsents.includes(consentType.type) && (
                              <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                                Required
                              </Badge>
                            )}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {consentType.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {userConsents[consentType.type] ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-gray-400" />
                        )}
                        <Switch
                          checked={userConsents[consentType.type] || false}
                          onCheckedChange={(checked) => 
                            handleConsentChange(consentType.type, checked)
                          }
                        />
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      Version {consentType.version} • You can change this anytime in your privacy settings
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Privacy Notice */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-xs text-muted-foreground space-y-2">
                  <p><strong>Your Privacy Matters:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>All data is encrypted and stored securely</li>
                    <li>You maintain full control over your health information</li>
                    <li>Research participation uses only de-identified data</li>
                    <li>You can withdraw consent at any time</li>
                    <li>NABDA partnership follows international research ethics standards</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSaveConsents} 
            disabled={loading || (!hasChanges && requiredConsents.length === 0) || (requiredConsents.length > 0 && !allRequiredProvided)}
          >
            {loading ? 'Saving...' : hasChanges ? 'Save Preferences' : 'Continue'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};