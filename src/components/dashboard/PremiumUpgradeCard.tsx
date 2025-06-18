
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Crown, TrendingUp, Heart, Timer, Monitor, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ProfileCompletionService, ProfileCompletionStatus } from '@/services/ProfileCompletionService';

const PremiumUpgradeCard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [completionStatus, setCompletionStatus] = useState<ProfileCompletionStatus | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (user) {
      loadCompletionStatus();
    }
    
    // Check if user has dismissed the premium card recently
    const dismissedTime = localStorage.getItem('premiumCardDismissed');
    if (dismissedTime) {
      const dismissedDate = new Date(dismissedTime);
      const daysSinceDismissed = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) { // Show again after 7 days
        setDismissed(true);
      }
    }
  }, [user]);

  const loadCompletionStatus = async () => {
    if (!user) return;
    try {
      const status = await ProfileCompletionService.getProfileCompletionStatus(user.id);
      setCompletionStatus(status);
    } catch (error) {
      console.error('Error loading completion status:', error);
    }
  };

  const handleUpgrade = () => {
    navigate('/premium');
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('premiumCardDismissed', new Date().toISOString());
  };

  if (dismissed || !completionStatus) return null;

  // Show premium card if user has completed basic profile
  const shouldShowPremium = completionStatus.overallProgress >= 60;

  if (!shouldShowPremium) return null;

  const premiumFeatures = [
    { icon: Heart, label: 'Advanced Fitness Tracking', color: 'text-red-500' },
    { icon: Monitor, label: 'Real-time Health Monitoring', color: 'text-blue-500' },
    { icon: Timer, label: 'Sleep & Wellness Analytics', color: 'text-purple-500' },
    { icon: TrendingUp, label: 'Personal Health Coach', color: 'text-green-500' },
  ];

  return (
    <Card className="border-2 border-gradient-to-r from-yellow-300 to-orange-400 bg-gradient-to-br from-yellow-50 to-orange-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200/30 to-orange-300/30 rounded-full -translate-y-16 translate-x-16"></div>
      
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-600" />
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Unlock Premium Features
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-6 w-6 p-0 hover:bg-yellow-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Limited Time Offer
          </Badge>
          <Badge variant="outline" className="border-orange-300 text-orange-700">
            Save 17% Yearly
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-700 font-medium">
          Take your health journey to the next level with advanced tracking and personalized insights.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {premiumFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-white/70 rounded-lg border border-yellow-200">
              <feature.icon className={`h-4 w-4 ${feature.color}`} />
              <span className="text-sm font-medium text-gray-700">{feature.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white/80 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-gray-900">₦2,500/month</span>
            <span className="text-sm text-gray-600 line-through">₦30,000/year</span>
          </div>
          <div className="text-sm text-green-600 font-medium mb-3">
            Or ₦25,000/year (Save ₦5,000!)
          </div>
          
          <Button 
            onClick={handleUpgrade}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold"
          >
            <Star className="h-4 w-4 mr-2" />
            Upgrade to Premium
          </Button>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Join 50,000+ Nigerians already improving their health
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumUpgradeCard;
