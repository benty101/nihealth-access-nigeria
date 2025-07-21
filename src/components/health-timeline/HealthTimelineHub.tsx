import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Heart, 
  Activity, 
  FileText, 
  Pill, 
  TestTube,
  Plus,
  Share,
  Download,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TimelineEvent {
  id: string;
  date: string;
  type: 'appointment' | 'medication' | 'lab_result' | 'vital_sign' | 'milestone' | 'note';
  title: string;
  description: string;
  category: string;
  status: 'completed' | 'upcoming' | 'in_progress';
  priority: 'low' | 'medium' | 'high';
  metadata?: any;
}

interface HealthTimelineHubProps {
  onboardingData: any;
}

export const HealthTimelineHub: React.FC<HealthTimelineHubProps> = ({ onboardingData }) => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<TimelineEvent[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in real app this would come from APIs
  useEffect(() => {
    const mockEvents: TimelineEvent[] = [
      {
        id: '1',
        date: '2025-07-24',
        type: 'appointment',
        title: 'Cardiology Consultation',
        description: 'Follow-up appointment with Dr. Fatima Hassan for heart health assessment',
        category: 'Cardiology',
        status: 'upcoming',
        priority: 'high',
        metadata: { doctor: 'Dr. Fatima Hassan', hospital: 'UCTH' }
      },
      {
        id: '2',
        date: '2025-07-20',
        type: 'lab_result',
        title: 'Blood Panel Results',
        description: 'Complete blood count and lipid profile results available',
        category: 'Laboratory',
        status: 'completed',
        priority: 'medium'
      },
      {
        id: '3',
        date: '2025-07-18',
        type: 'medication',
        title: 'Started Lisinopril',
        description: 'Begin hypertension management with ACE inhibitor',
        category: 'Medication',
        status: 'in_progress',
        priority: 'high'
      },
      {
        id: '4',
        date: '2025-07-15',
        type: 'vital_sign',
        title: 'Blood Pressure Reading',
        description: '140/90 mmHg - slightly elevated, monitoring required',
        category: 'Vitals',
        status: 'completed',
        priority: 'medium'
      },
      {
        id: '5',
        date: '2025-07-10',
        type: 'milestone',
        title: 'Health Profile Completed',
        description: 'Successfully completed comprehensive health onboarding',
        category: 'Milestone',
        status: 'completed',
        priority: 'low'
      }
    ];

    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = events;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(event => event.type === activeFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [events, activeFilter, searchTerm]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'appointment': return <Calendar className="w-4 h-4" />;
      case 'medication': return <Pill className="w-4 h-4" />;
      case 'lab_result': return <TestTube className="w-4 h-4" />;
      case 'vital_sign': return <Heart className="w-4 h-4" />;
      case 'milestone': return <Activity className="w-4 h-4" />;
      case 'note': return <FileText className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <CardHeader className="flex-shrink-0 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Your Health Timeline
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Entry
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex-1">
            <Input
              placeholder="Search your health timeline..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Tabs value={activeFilter} onValueChange={setActiveFilter}>
              <TabsList className="h-8">
                <TabsTrigger value="all" className="text-xs px-2">All</TabsTrigger>
                <TabsTrigger value="appointment" className="text-xs px-2">Appointments</TabsTrigger>
                <TabsTrigger value="medication" className="text-xs px-2">Medications</TabsTrigger>
                <TabsTrigger value="lab_result" className="text-xs px-2">Lab Results</TabsTrigger>
                <TabsTrigger value="vital_sign" className="text-xs px-2">Vitals</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>

      {/* Timeline Content */}
      <CardContent className="flex-1 min-h-0 p-0">
        <ScrollArea className="h-full px-6">
          <div className="space-y-4 pb-6">
            {filteredEvents.map((event, index) => (
              <div key={event.id} className="relative">
                {/* Timeline connector */}
                {index !== filteredEvents.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-12 bg-border" />
                )}
                
                {/* Event Card */}
                <div className={`flex gap-4 p-4 rounded-lg border-l-4 bg-card hover:shadow-md transition-shadow ${getPriorityColor(event.priority)}`}>
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {getEventIcon(event.type)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{event.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Badge variant="secondary" className={getStatusColor(event.status)}>
                          {event.status.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Metadata */}
                    {event.metadata && (
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {event.metadata.doctor && (
                          <span>👨‍⚕️ {event.metadata.doctor}</span>
                        )}
                        {event.metadata.hospital && (
                          <span>🏥 {event.metadata.hospital}</span>
                        )}
                      </div>
                    )}

                    {/* Category */}
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs">
                        {event.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  No timeline events found
                </h3>
                <p className="text-sm text-muted-foreground">
                  {searchTerm || activeFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Your health journey will appear here as you use MeddyPal services'
                  }
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </div>
  );
};