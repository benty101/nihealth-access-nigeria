
import React from 'react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Timer, Monitor, Star, Check, Zap, Shield, Users, Brain, Activity, HeartHandshake, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Premium = () => {
  const { toast } = useToast();

  const premiumFeatures = [
    {
      title: 'AI Health Insights',
      description: 'Advanced AI analysis of your health patterns with personalized recommendations',
      icon: Brain,
      gradient: 'from-primary to-primary/80'
    },
    {
      title: 'Real-Time Monitoring',
      description: 'Continuous health monitoring with instant alerts and smart notifications',
      icon: Activity,
      gradient: 'from-secondary to-secondary/80'
    },
    {
      title: 'Family Health Hub',
      description: 'Connect with family members and share health data securely',
      icon: HeartHandshake,
      gradient: 'from-accent to-accent/80'
    },
    {
      title: 'Precision Goals',
      description: 'Smart goal setting with progress tracking and achievement rewards',
      icon: Target,
      gradient: 'from-primary to-secondary'
    },
  ];

  const plans = [
    {
      name: 'Essential',
      price: '₦2,500',
      originalPrice: null,
      period: 'monthly',
      description: 'Perfect for individuals starting their health journey',
      features: [
        'Basic health timeline',
        'Appointment scheduling',
        'Medication reminders',
        'Insurance plan comparison',
        'Emergency contacts',
        'Email support'
      ],
      popular: false,
      savings: null,
      buttonText: 'Get Started',
      priceId: 'price_essential_monthly'
    },
    {
      name: 'Premium',
      price: '₦4,500',
      originalPrice: '₦6,000',
      period: 'monthly',
      description: 'Most popular choice for serious health enthusiasts',
      features: [
        'All Essential features',
        'AI health insights & analysis',
        'Advanced health metrics',
        'Family health sharing',
        'Priority appointment booking',
        'Telemedicine consultations',
        '24/7 chat support',
        'Custom health reports'
      ],
      popular: true,
      savings: 'Save ₦1,500/month',
      buttonText: 'Start Premium',
      priceId: 'price_premium_monthly'
    },
    {
      name: 'Family Plus',
      price: '₦7,500',
      originalPrice: '₦10,000',
      period: 'monthly',
      description: 'Comprehensive health solution for the entire family',
      features: [
        'All Premium features',
        'Up to 6 family members',
        'Family health dashboard',
        'Shared medication tracking',
        'Group appointment booking',
        'Genomic health insights',
        'Dedicated family concierge',
        'Priority emergency response'
      ],
      popular: false,
      savings: 'Save ₦2,500/month',
      buttonText: 'Choose Family Plus',
      priceId: 'price_family_monthly'
    },
  ];

  const handleSubscribe = (priceId: string, planName: string) => {
    toast({
      title: "Coming Soon!",
      description: `${planName} subscription will be available soon. We'll notify you when it's ready.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <ContextualNavbar />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4 mr-2" />
              Unlock Your Health Potential
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              MeddyPal <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Premium</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform your health journey with AI-powered insights, genomic analysis, and personalized care tailored for Nigeria
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="inline-flex items-center bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="h-4 w-4 mr-2" />
                HIPAA Compliant & Secure
              </div>
              <div className="inline-flex items-center bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
                <Users className="h-4 w-4 mr-2" />
                50,000+ Active Users
              </div>
            </div>
          </div>

          {/* Premium Features */}
          <div className="mb-20 animate-fade-in animation-delay-200">
            <h2 className="text-4xl font-bold text-center text-foreground mb-4">
              Premium Features
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Unlock powerful AI-driven tools and genomic insights designed for the future of healthcare
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {premiumFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border hover:-translate-y-2 group">
                    <CardHeader className="pb-4">
                      <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-foreground">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="mb-20 animate-fade-in animation-delay-400">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Choose Your Plan
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select the perfect plan for your health journey. All plans include our core features with increasing levels of AI personalization.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative transition-all duration-300 hover:shadow-2xl border-2 ${
                  plan.popular 
                    ? 'ring-4 ring-primary/20 border-primary shadow-xl scale-105' 
                    : 'border-border hover:border-primary/50'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-2 text-sm font-semibold">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
                    <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <div className="text-4xl font-bold text-foreground">{plan.price}</div>
                        <div className="text-muted-foreground">/{plan.period}</div>
                      </div>
                      {plan.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">{plan.originalPrice}</div>
                      )}
                      {plan.savings && (
                        <div className="text-sm font-medium text-secondary">{plan.savings}</div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm">
                          <Check className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      onClick={() => handleSubscribe(plan.priceId, plan.name)}
                      className={`w-full py-3 text-base font-semibold transition-all duration-200 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg' 
                          : 'bg-secondary hover:bg-secondary/90'
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Trust Section */}
          <div className="bg-card rounded-2xl shadow-lg p-8 mb-16 border animate-fade-in animation-delay-600">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">
              Trusted by Health-Conscious Nigerians
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-lg">
                  AO
                </div>
                <blockquote className="text-muted-foreground mb-4 italic">
                  "MeddyPal's AI insights helped me understand my health patterns. Lost 15kg in 6 months!"
                </blockquote>
                <div className="font-semibold text-foreground">Adebayo Ogundimu</div>
                <div className="text-sm text-muted-foreground">Lagos, Nigeria</div>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4 text-secondary-foreground font-bold text-lg">
                  FA
                </div>
                <blockquote className="text-muted-foreground mb-4 italic">
                  "The genomic insights revealed my sleep disorder predisposition. Now I sleep better every night."
                </blockquote>
                <div className="font-semibold text-foreground">Fatima Abdullahi</div>
                <div className="text-sm text-muted-foreground">Abuja, Nigeria</div>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4 text-accent-foreground font-bold text-lg">
                  CO
                </div>
                <blockquote className="text-muted-foreground mb-4 italic">
                  "The family health hub keeps our entire household connected. We love the shared goals!"
                </blockquote>
                <div className="font-semibold text-foreground">Chukwuma Okafor</div>
                <div className="text-sm text-muted-foreground">Port Harcourt, Nigeria</div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="text-center animate-fade-in animation-delay-800">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Questions? We're Here to Help
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get in touch with our support team for any questions about MeddyPal Premium
            </p>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
