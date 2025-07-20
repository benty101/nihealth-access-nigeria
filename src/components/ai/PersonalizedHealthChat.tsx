import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, 
  User, 
  Send, 
  Loader2, 
  AlertTriangle, 
  Heart, 
  MessageCircle,
  Stethoscope,
  Brain,
  TrendingUp,
  Clock,
  Shield,
  Sparkles,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  urgent?: boolean;
  recommendations?: string[];
  insights?: Array<{
    type: string;
    priority: string;
    message: string;
  }>;
}

interface PatientSummary {
  profileComplete: boolean;
  recentActivity: number;
  lastConsultation: string | null;
}

export const PersonalizedHealthChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your personalized MeddyPal AI assistant. I have access to your health profile and can provide tailored insights based on your medical history. How can I help you today?",
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [patientSummary, setPatientSummary] = useState<PatientSummary | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('personalized-health-ai', {
        body: {
          message: inputMessage,
          conversationHistory: messages.slice(-6).map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to get AI response');
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        urgent: data.urgent,
        recommendations: data.recommendations,
        insights: data.insights
      };

      setMessages(prev => [...prev, aiMessage]);
      setPatientSummary(data.patientSummary);

      if (data.urgent) {
        toast({
          title: "⚠️ Urgent Health Notice",
          description: "Your AI assistant has identified potentially urgent symptoms. Please consider seeking immediate medical attention.",
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I'm experiencing technical difficulties accessing your personalized health data. Please try again in a moment, or contact a healthcare provider if you have urgent concerns.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Failed to connect to personalized AI assistant. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "Analyze my recent health trends",
    "What should I monitor based on my conditions?",
    "Review my medication compliance",
    "Suggest preventive care based on my profile",
    "What health goals should I focus on?"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-primary/5 via-background to-accent/5 border border-primary/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Brain className="h-8 w-8 text-primary" />
                  <Sparkles className="h-4 w-4 text-accent absolute -top-1 -right-1" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Personalized AI Health Assistant</h1>
                  <p className="text-sm text-muted-foreground">AI-powered insights tailored to your health profile</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Activity className="h-3 w-3 mr-1" />
                Smart Insights
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Patient Summary Card */}
        {patientSummary && (
          <Card className="bg-gradient-to-br from-accent/5 to-background border border-accent/10">
            <CardHeader className="pb-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4 text-accent" />
                Health Profile Status
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Profile Completion</span>
                  <span className="text-foreground font-medium">
                    {patientSummary.profileComplete ? '100%' : '75%'}
                  </span>
                </div>
                <Progress value={patientSummary.profileComplete ? 100 : 75} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Recent Activity</span>
                <Badge variant="outline" className="text-xs">
                  {patientSummary.recentActivity} events
                </Badge>
              </div>

              {patientSummary.lastConsultation && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Last visit: {new Date(patientSummary.lastConsultation).toLocaleDateString()}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Main Chat Interface */}
      <Card className="h-[700px] flex flex-col shadow-lg border border-border/50">
        <CardHeader className="pb-3 bg-gradient-to-r from-background to-muted/30 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/30" />
              <span className="text-sm font-medium text-foreground">AI Assistant Active</span>
              <Badge variant="outline" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                Personalized Mode
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              Secure • HIPAA Compliant • End-to-End Encrypted
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 px-6 overflow-y-auto" ref={scrollAreaRef}>
            <div className="space-y-6 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <Avatar className="w-10 h-10 ring-2 ring-background shadow-md">
                    <AvatarFallback className={`${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-gradient-to-br from-accent to-primary text-white'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Stethoscope className="h-5 w-5" />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div className={`max-w-[75%] space-y-3 ${
                    message.role === 'user' ? 'items-end' : 'items-start'
                  }`}>
                    {/* Message bubble */}
                    <div
                      className={`rounded-2xl px-4 py-3 shadow-sm ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground ml-auto'
                          : 'bg-card border border-border/50'
                      }`}
                    >
                      {message.urgent && (
                        <div className="flex items-center gap-2 mb-3 p-2 bg-red-500/10 rounded-lg border border-red-200">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm font-medium text-red-700">Urgent Health Notice</span>
                        </div>
                      )}
                      
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      
                      <p className="text-xs opacity-60 mt-3 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>

                    {/* Insights */}
                    {message.insights && message.insights.length > 0 && (
                      <div className="space-y-2 w-full">
                        <p className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-accent" />
                          Personalized Insights
                        </p>
                        {message.insights.map((insight, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-xl border text-sm ${getPriorityColor(insight.priority)}`}
                          >
                            <div className="flex items-start justify-between">
                              <span className="font-medium capitalize">{insight.type}</span>
                              <Badge variant="outline" className="text-xs">
                                {insight.priority}
                              </Badge>
                            </div>
                            <p className="mt-1">{insight.message}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Recommendations */}
                    {message.recommendations && message.recommendations.length > 0 && (
                      <div className="w-full space-y-2">
                        <p className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Heart className="h-4 w-4 text-red-500" />
                          Personalized Recommendations
                        </p>
                        <div className="grid gap-2">
                          {message.recommendations.slice(0, 3).map((rec, index) => (
                            <div key={index} className="flex items-start gap-2 p-3 bg-accent/10 rounded-lg border border-accent/20">
                              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-foreground">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 ring-2 ring-background shadow-md">
                    <AvatarFallback className="bg-gradient-to-br from-accent to-primary text-white">
                      <Stethoscope className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-card border border-border/50 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Analyzing your health data...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="px-6 py-4 border-t bg-gradient-to-r from-muted/20 to-accent/5">
              <p className="text-sm font-medium mb-3 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                Quick personalized questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs h-8 bg-background/50 hover:bg-accent/10 border-accent/20"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-6 border-t bg-gradient-to-r from-background to-muted/30">
            <div className="flex gap-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your health trends, get personalized insights..."
                disabled={isLoading}
                className="flex-1 bg-background/50 border-border/50 focus:ring-2 focus:ring-primary/20"
              />
              <Button 
                onClick={sendMessage} 
                disabled={!inputMessage.trim() || isLoading}
                size="icon"
                className="bg-primary hover:bg-primary/90 shadow-lg"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <Heart className="h-3 w-3 text-red-500" />
              <span>Personalized AI health guidance • Data-driven insights • Always consult your doctor for medical decisions</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};