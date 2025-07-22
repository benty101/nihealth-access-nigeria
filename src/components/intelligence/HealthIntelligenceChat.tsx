import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Send, 
  Brain, 
  Mic, 
  Calendar,
  TestTube,
  Pill,
  Activity,
  Sparkles,
  Stethoscope
} from 'lucide-react';

interface HealthIntelligenceChatProps {
  onboardingData: any;
  intelligenceLevel: number;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  actions?: Array<{
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    action: string;
  }>;
}

export const HealthIntelligenceChat: React.FC<HealthIntelligenceChatProps> = ({
  onboardingData,
  intelligenceLevel
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with intelligent welcome message based on user data
    const welcomeMessage = generateWelcomeMessage();
    setMessages([welcomeMessage]);
  }, [onboardingData, intelligenceLevel]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateWelcomeMessage = (): ChatMessage => {
    let content = "👋 Hi! I'm your Health Intelligence Assistant.";
    
    if (intelligenceLevel < 50) {
      content += " I'm still learning about you. Ask me anything about your health, or let me help you book services!";
    } else if (intelligenceLevel < 75) {
      content += " I have some insights about your health patterns. What would you like to explore today?";
    } else {
      content += " I have deep insights about your health. I can provide personalized recommendations and predict your health needs.";
    }

    return {
      id: 'welcome',
      type: 'ai',
      content,
      timestamp: new Date(),
      actions: [
        { label: 'Book Appointment', icon: Calendar, action: 'book_appointment' },
        { label: 'Check Labs', icon: TestTube, action: 'view_labs' },
        { label: 'Health Insights', icon: Brain, action: 'view_insights' },
        { label: 'Find Medication', icon: Pill, action: 'find_medication' }
      ]
    };
  };

  const generateAIResponse = (userMessage: string): ChatMessage => {
    // Intelligent response generation based on user input and health data
    let content = "";
    let actions = [];

    const userInput = userMessage.toLowerCase();

    if (userInput.includes('appointment') || userInput.includes('book') || userInput.includes('doctor')) {
      content = "I can help you book an appointment! Based on your health profile, I recommend these options:";
      actions = [
        { label: 'General Checkup', icon: Stethoscope, action: 'book_general' },
        { label: 'Specialist Care', icon: Activity, action: 'book_specialist' }
      ];
    } else if (userInput.includes('lab') || userInput.includes('test') || userInput.includes('blood')) {
      content = "Let me check what lab tests would be beneficial for you. Based on your health data, here are my recommendations:";
      actions = [
        { label: 'Basic Panel', icon: TestTube, action: 'book_basic_labs' },
        { label: 'Comprehensive', icon: TestTube, action: 'book_comprehensive_labs' }
      ];
    } else if (userInput.includes('medicine') || userInput.includes('medication') || userInput.includes('pharmacy')) {
      content = "I can help you find medications and check for interactions with your current health profile.";
      actions = [
        { label: 'Find Pharmacy', icon: Pill, action: 'find_pharmacy' },
        { label: 'Check Interactions', icon: Brain, action: 'check_interactions' }
      ];
    } else if (userInput.includes('health') || userInput.includes('feeling') || userInput.includes('symptoms')) {
      content = "I'm analyzing your symptoms and health patterns. Here's what I found:";
      actions = [
        { label: 'Symptom Checker', icon: Activity, action: 'symptom_checker' },
        { label: 'AI Diagnosis', icon: Brain, action: 'ai_diagnosis' }
      ];
    } else {
      content = "I understand you're asking about your health. Let me provide some personalized insights based on your profile.";
      actions = [
        { label: 'Health Overview', icon: Activity, action: 'health_overview' },
        { label: 'Recommendations', icon: Sparkles, action: 'recommendations' }
      ];
    }

    return {
      id: `ai_${Date.now()}`,
      type: 'ai',
      content,
      timestamp: new Date(),
      actions
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleActionClick = (action: string) => {
    // Handle intelligent actions
    const actionMessage: ChatMessage = {
      id: `action_${Date.now()}`,
      type: 'system',
      content: `Executing: ${action.replace('_', ' ')}...`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, actionMessage]);

    // Simulate action execution
    setTimeout(() => {
      const resultMessage: ChatMessage = {
        id: `result_${Date.now()}`,
        type: 'ai',
        content: `I've ${action.replace('_', ' ')} for you. Here are the next steps:`,
        timestamp: new Date(),
        actions: [
          { label: 'Continue', icon: Activity, action: 'continue' },
          { label: 'More Options', icon: Sparkles, action: 'more_options' }
        ]
      };
      setMessages(prev => [...prev, resultMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Brain className="w-4 h-4 text-primary" />
          Health Intelligence Assistant
          <Badge variant="outline" className="ml-auto">
            {intelligenceLevel}% Intelligence
          </Badge>
        </CardTitle>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 min-h-0 p-4 pt-0">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-lg rounded-br-sm' 
                    : message.type === 'ai'
                    ? 'bg-muted rounded-lg rounded-bl-sm'
                    : 'bg-yellow-100 text-yellow-800 rounded-lg'
                } p-3`}>
                  
                  {/* Message Content */}
                  <p className="text-sm">{message.content}</p>
                  
                  {/* Action Buttons */}
                  {message.actions && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleActionClick(action.action)}
                          className="text-xs h-7"
                        >
                          {action.icon && <action.icon className="w-3 h-3 mr-1" />}
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  {/* Timestamp */}
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg rounded-bl-sm p-3">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 pt-0">
        <div className="flex items-center space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your health, book services, or get AI insights..."
            className="flex-1"
          />
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
          >
            <Mic className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            size="sm"
            className="p-2"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};