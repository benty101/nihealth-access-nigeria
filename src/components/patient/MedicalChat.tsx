import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Loader2, Shield, Calendar, TestTube, Pill, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { HealthIntelligenceEngine } from '@/core/HealthIntelligenceEngine';
import { PersonalizationService } from '@/services/PersonalizationService';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  actions?: Array<{
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    action: string;
    type?: 'primary' | 'secondary' | 'insurance' | 'urgent';
  }>;
}

const MedicalChat = () => {
  const [healthEngine] = useState(() => HealthIntelligenceEngine.getInstance());
  const [isInitialized, setIsInitialized] = useState(false);
  const [intelligenceLevel, setIntelligenceLevel] = useState(0);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize health intelligence engine
  useEffect(() => {
    const initializeEngine = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await healthEngine.initializeContext(user.id);
          const context = healthEngine.getHealthContext();
          if (context) {
            setIntelligenceLevel(context.intelligence_level);
            
            // Generate intelligent welcome message
            const welcomeMessage = generateIntelligentWelcome(context);
            setMessages([welcomeMessage]);
            setIsInitialized(true);
          }
        }
      } catch (error) {
        console.error('Error initializing health engine:', error);
        // Fallback welcome message
        setMessages([{
          id: '1',
          content: "🌟 Hey! I'm your AI Health Assistant. I can help you with insurance recommendations, health insights, and booking services. What's on your mind?",
          isUser: false,
          timestamp: new Date(),
          actions: [
            { label: '🛡️ Get Insurance', action: 'recommend_insurance', type: 'insurance' as const },
            { label: '📅 Book Appointment', action: 'book_appointment', type: 'primary' as const }
          ]
        }]);
      }
    };

    initializeEngine();
  }, [healthEngine]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateIntelligentWelcome = (context: any): Message => {
    const onboardingData = PersonalizationService.getOnboardingData();
    let content = "🌟 Hey! I'm your AI Health Assistant. I can help with insurance, appointments, and health insights.";
    let actions = [];

    // Check insurance status first - this is key for monetization
    if (!onboardingData?.hasInsurance) {
      content += "\n\n⚠️ **URGENT**: You don't have health insurance! Medical emergencies can cost ₦500k-₦2M+. Let me help you get protected immediately.";
      actions.push(
        { label: '🛡️ Get Insurance NOW', action: 'urgent_insurance', type: 'urgent' as const },
        { label: '💡 Show Me Plans', action: 'show_insurance_plans', type: 'insurance' as const }
      );
    } else {
      content += "\n\n✅ Great! You have insurance coverage. I can help you maximize your benefits and health outcomes.";
    }

    // Add contextual recommendations based on intelligence level
    if (context.intelligence_level < 30) {
      content += "\n\n🧠 I'm still learning about you. Share your health concerns so I can provide better recommendations!";
      actions.push(
        { label: '📋 Complete Health Profile', action: 'complete_profile', type: 'primary' as const },
        { label: '🩺 Quick Health Check', action: 'health_assessment', type: 'secondary' as const }
      );
    } else if (context.intelligence_level < 70) {
      content += "\n\n🎯 Based on your profile, I have some personalized recommendations for you.";
      actions.push(
        { label: '🔍 Health Insights', action: 'show_insights', type: 'primary' as const },
        { label: '📅 Smart Booking', action: 'smart_appointment', type: 'secondary' as const }
      );
    } else {
      content += "\n\n🧠 I have deep insights about your health. I can predict risks and suggest preventive actions!";
      actions.push(
        { label: '🔮 Predictive Insights', action: 'predictive_analysis', type: 'primary' as const },
        { label: '🎯 Personalized Plan', action: 'personalized_plan', type: 'secondary' as const }
      );
    }

    return {
      id: 'welcome_intelligent',
      content,
      isUser: false,
      timestamp: new Date(),
      actions
    };
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleIntelligentAction = async (action: string) => {
    const actionMessage: Message = {
      id: `action_${Date.now()}`,
      content: `🔄 Processing: ${action.replace('_', ' ')}...`,
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, actionMessage]);
    setIsLoading(true);

    try {
      // Use the health intelligence engine for contextual responses
      const response = await healthEngine.processUserInput(`action:${action}`);
      
      const aiResponse: Message = {
        id: `ai_${Date.now()}`,
        content: response.content,
        isUser: false,
        timestamp: new Date(),
        actions: response.suggested_actions?.map(actionItem => ({
          label: actionItem.label,
          action: actionItem.id,
          type: actionItem.priority > 3 ? 'urgent' : actionItem.service_type === 'insurance' ? 'insurance' : 'primary'
        }))
      };

      setMessages(prev => [...prev.slice(0, -1), aiResponse]);
    } catch (error) {
      console.error('Error processing action:', error);
      const errorResponse: Message = {
        id: `error_${Date.now()}`,
        content: "I'm having trouble processing that right now. Let me help you with something else!",
        isUser: false,
        timestamp: new Date(),
        actions: [
          { label: '🛡️ Get Insurance', action: 'recommend_insurance', type: 'insurance' },
          { label: '📅 Book Appointment', action: 'book_appointment', type: 'primary' }
        ]
      };
      setMessages(prev => [...prev.slice(0, -1), errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Use health intelligence engine for smart responses
      const intelligentResponse = await healthEngine.processUserInput(inputMessage);
      
      const aiMessage: Message = {
        id: `ai_${Date.now()}`,
        content: intelligentResponse.content,
        isUser: false,
        timestamp: new Date(),
        actions: intelligentResponse.suggested_actions?.map(action => ({
          label: action.label,
          action: action.id,
          type: action.priority > 3 ? 'urgent' : 
                action.service_type === 'insurance' ? 'insurance' : 'primary'
        }))
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback to basic AI response with insurance focus
      const fallbackResponse: Message = {
        id: `fallback_${Date.now()}`,
        content: `I understand you're asking about "${inputMessage}". Let me help you with that! 
        
💡 **Quick tip**: If you don't have insurance yet, that should be your #1 priority. Medical costs can be devastating without coverage.`,
        isUser: false,
        timestamp: new Date(),
        actions: [
          { label: '🛡️ Get Insurance First', action: 'urgent_insurance', type: 'urgent' },
          { label: '📅 Book Appointment', action: 'book_appointment', type: 'primary' },
          { label: '🧬 Health Insights', action: 'health_insights', type: 'secondary' }
        ]
      };

      setMessages(prev => [...prev, fallbackResponse]);
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

  const getActionButtonStyle = (type?: string) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-500 hover:bg-red-600 text-white border-red-500';
      case 'insurance':
        return 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500';
      case 'primary':
        return 'bg-primary hover:bg-primary/90 text-primary-foreground';
      case 'secondary':
      default:
        return 'border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5';
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            <div>
              <span>AI Health Assistant</span>
              {isInitialized && (
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {intelligenceLevel}% Intelligence Level
                </div>
              )}
            </div>
          </div>
          <div className="text-xs text-emerald-600 font-medium">AI Powered</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 min-h-0">
        <ScrollArea className="flex-1 px-4 py-2">
          <div className="space-y-4 min-h-full">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[85%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isUser ? 'bg-primary text-primary-foreground' : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                  }`}>
                    {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-3 rounded-lg shadow-sm ${
                    message.isUser 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    
                    {/* Action Buttons */}
                    {message.actions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleIntelligentAction(action.action)}
                            className={`text-xs h-7 ${getActionButtonStyle(action.type)}`}
                          >
                            {action.icon && <action.icon className="w-3 h-3 mr-1" />}
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    <p className={`text-xs mt-2 opacity-70`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex gap-2 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-muted">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-lg bg-muted border shadow-sm">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <p className="text-sm">AI is thinking...</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-1" />
          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-background flex-shrink-0">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about health insights, insurance plans, appointments..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage} 
              disabled={!inputMessage.trim() || isLoading}
              size="icon"
              className="flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            🚀 AI-Powered Health Assistant • Smart Recommendations • Nigerian Healthcare
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalChat;