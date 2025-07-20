import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  MessageCircle, 
  Search, 
  Zap, 
  Shield, 
  ArrowRight,
  CheckCircle,
  Star,
  Heart
} from 'lucide-react';

export const AIFeaturesDemo: React.FC = () => {
  const features = [
    {
      title: 'AI Symptom Checker',
      description: 'Browser-based AI that analyzes your symptoms and provides health insights',
      icon: Brain,
      path: '/ai-assistant',
      badge: 'Free • Works Offline',
      color: 'text-blue-600',
      features: [
        'Instant symptom analysis',
        'Risk assessment',
        'Personalized recommendations',
        'Works without internet'
      ]
    },
    {
      title: 'AI Health Chat',
      description: 'Chat with our advanced AI assistant powered by Groq for fast, accurate responses',
      icon: MessageCircle,
      path: '/ai-chat',
      badge: 'Free • Lightning Fast',
      color: 'text-green-600',
      features: [
        'Natural conversation',
        'Nigerian health context',
        'Urgent care detection',
        'Free unlimited usage'
      ]
    },
    {
      title: 'Medical Knowledge Search',
      description: 'Search medical information from multiple free databases including PubMed',
      icon: Search,
      path: '/medical-search',
      badge: 'Free • Comprehensive',
      color: 'text-purple-600',
      features: [
        'PubMed research articles',
        'Medical terminology',
        'Nigerian health guidelines',
        'Evidence-based information'
      ]
    }
  ];

  const stats = [
    { label: 'Microsoft AI Accuracy', value: '85%', description: 'vs 20% physician accuracy on NEJM cases' },
    { label: 'Cost Reduction', value: '4x Lower', description: 'AI achieves better results at lower cost' },
    { label: 'Daily Health Queries', value: '50M+', description: 'Across Microsoft AI products' },
    { label: 'Response Time', value: '<2s', description: 'Groq-powered instant responses' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 text-sm font-medium text-primary">
          <Zap className="h-4 w-4" />
          Powered by Free AI Technology
        </div>
        
        <h1 className="text-4xl font-bold text-foreground">
          AI-Powered Healthcare for
          <span className="text-primary"> Nigeria</span>
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience cutting-edge healthcare AI inspired by Microsoft's research. 
          Get instant health insights, symptom analysis, and medical guidance - completely free.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm font-medium">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-muted ${feature.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                
                <Button asChild className="w-full">
                  <Link to={feature.path}>
                    Try {feature.title}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Technology Info */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Advanced AI Technology</h3>
              </div>
              
              <p className="text-muted-foreground">
                Our AI implementation is inspired by Microsoft's groundbreaking research showing 
                85% diagnostic accuracy - 4x better than experienced physicians on complex medical cases.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span><strong>Browser AI:</strong> Runs locally using Hugging Face Transformers</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span><strong>Groq API:</strong> Lightning-fast Llama 3.1 models</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span><strong>PubMed:</strong> Access to millions of medical research papers</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span><strong>Nigerian Context:</strong> Localized health guidelines and information</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-card rounded-lg p-4 border">
                <h4 className="font-semibold mb-2">Cost Comparison</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>OpenAI GPT-4:</span>
                    <span className="text-red-600">$30/million tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Google Gemini:</span>
                    <span className="text-red-600">$15/million tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Our AI Stack:</span>
                    <span className="text-green-600 font-semibold">$0/month</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-4 border">
                <h4 className="font-semibold mb-2">Performance</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Response Time:</span>
                    <span className="text-green-600">~1-2 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Availability:</span>
                    <span className="text-green-600">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Offline Support:</span>
                    <span className="text-green-600">Yes (Browser AI)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="text-center space-y-4 bg-primary/5 rounded-lg p-8">
        <Heart className="h-12 w-12 text-primary mx-auto" />
        <h3 className="text-2xl font-semibold">Transform Healthcare with AI</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join the healthcare revolution. Start using AI-powered health tools today and experience 
          the future of medical assistance - free, fast, and tailored for Nigeria.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button size="lg" asChild>
            <Link to="/ai-chat">
              Start AI Health Chat
              <MessageCircle className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/ai-assistant">
              Try Symptom Checker
              <Brain className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};