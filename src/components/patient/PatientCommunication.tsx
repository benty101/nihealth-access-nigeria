
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Send, 
  User, 
  Clock, 
  Phone, 
  Video,
  FileText,
  Paperclip,
  Plus
} from 'lucide-react';

const PatientCommunication = () => {
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState([
    {
      id: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      hospital: 'Lagos University Teaching Hospital',
      lastMessage: 'Your recent test results look good. Continue with current medication.',
      lastMessageTime: '2024-12-18 14:30',
      unreadCount: 0,
      status: 'online'
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Chen',
      specialty: 'General Practitioner',
      hospital: 'National Hospital Abuja',
      lastMessage: 'Please schedule a follow-up appointment for next week.',
      lastMessageTime: '2024-12-17 16:45',
      unreadCount: 2,
      status: 'offline'
    },
    {
      id: 3,
      doctorName: 'Dr. Amina Hassan',
      specialty: 'Dermatologist',
      hospital: 'University College Hospital',
      lastMessage: 'The prescribed cream should help with the condition.',
      lastMessageTime: '2024-12-16 11:20',
      unreadCount: 0,
      status: 'online'
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messages, setMessages] = useState([
    {
      id: 1,
      senderId: 'dr_sarah',
      senderName: 'Dr. Sarah Johnson',
      message: 'Hello! I wanted to follow up on your recent visit.',
      timestamp: '2024-12-18 10:00',
      type: 'text',
      isDoctor: true
    },
    {
      id: 2,
      senderId: 'patient',
      senderName: 'You',
      message: 'Thank you doctor. I\'ve been feeling much better since starting the new medication.',
      timestamp: '2024-12-18 10:15',
      type: 'text',
      isDoctor: false
    },
    {
      id: 3,
      senderId: 'dr_sarah',
      senderName: 'Dr. Sarah Johnson',
      message: 'That\'s great to hear! Your recent test results look good. Continue with current medication.',
      timestamp: '2024-12-18 14:30',
      type: 'text',
      isDoctor: true
    }
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: 'Dr. Sarah Johnson',
      date: '2024-12-25',
      time: '10:00 AM',
      type: 'video',
      status: 'scheduled'
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Chen',
      date: '2024-12-28',
      time: '2:30 PM',
      type: 'in-person',
      status: 'requested'
    }
  ]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        senderId: 'patient',
        senderName: 'You',
        message: newMessage,
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        type: 'text',
        isDoctor: false
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const ConversationList = () => (
    <div className="space-y-2">
      {conversations.map((conversation) => (
        <Card 
          key={conversation.id} 
          className={`cursor-pointer transition-colors ${
            selectedConversation === conversation.id ? 'border-teal-500 bg-teal-50' : 'hover:bg-gray-50'
          }`}
          onClick={() => setSelectedConversation(conversation.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="relative">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(conversation.status)}`}></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-sm truncate">{conversation.doctorName}</h4>
                  {conversation.unreadCount > 0 && (
                    <Badge className="bg-teal-600 text-white text-xs">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-600 mb-1">{conversation.specialty}</p>
                <p className="text-xs text-gray-500 truncate">{conversation.lastMessage}</p>
                <p className="text-xs text-gray-400">{conversation.lastMessageTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const MessageThread = () => {
    const currentConversation = conversations.find(c => c.id === selectedConversation);
    
    return (
      <div className="flex flex-col h-96">
        {/* Chat Header */}
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">{currentConversation?.doctorName}</h3>
                <p className="text-sm text-gray-600">{currentConversation?.specialty}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Video className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.isDoctor ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isDoctor 
                  ? 'bg-gray-100 text-gray-800' 
                  : 'bg-teal-600 text-white'
              }`}>
                <p className="text-sm">{message.message}</p>
                <p className={`text-xs mt-1 ${
                  message.isDoctor ? 'text-gray-500' : 'text-teal-100'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} className="bg-teal-600 hover:bg-teal-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Communications</h2>
          <p className="text-gray-600">Connect with your healthcare providers</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div>
              <h3 className="font-semibold mb-4">Conversations</h3>
              <ConversationList />
            </div>

            {/* Message Thread */}
            <div className="lg:col-span-2">
              <Card>
                <MessageThread />
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="mt-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Appointment Requests & Scheduling</h3>
            {appointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{appointment.doctorName}</h4>
                        <p className="text-sm text-gray-600">
                          {appointment.date} at {appointment.time}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {appointment.type === 'video' ? (
                            <Video className="h-4 w-4 text-blue-500" />
                          ) : (
                            <User className="h-4 w-4 text-green-500" />
                          )}
                          <span className="text-sm text-gray-600">{appointment.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        appointment.status === 'scheduled' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }>
                        {appointment.status}
                      </Badge>
                      {appointment.status === 'requested' && (
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                          Confirm
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Shared Documents & Forms</h3>
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No documents shared yet</h3>
                <p className="text-gray-600">Shared documents and forms will appear here</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientCommunication;
