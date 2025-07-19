import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { HealthTimelineService, HealthTimelineEvent } from '@/services/HealthTimelineService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Stethoscope, TestTube, Pill, Heart, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const eventIcons: Record<string, React.ReactNode> = {
  lab_test: <TestTube className="h-4 w-4" />,
  medication: <Pill className="h-4 w-4" />,
  consultation: <Stethoscope className="h-4 w-4" />,
  hospital_visit: <Heart className="h-4 w-4" />,
  genomic_test: <TestTube className="h-4 w-4 text-purple-600" />
};

const eventColors: Record<string, string> = {
  lab_test: 'bg-blue-100 text-blue-800',
  medication: 'bg-green-100 text-green-800',
  consultation: 'bg-purple-100 text-purple-800',
  hospital_visit: 'bg-red-100 text-red-800',
  genomic_test: 'bg-indigo-100 text-indigo-800'
};

export const HealthTimeline: React.FC = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<HealthTimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (user) {
      loadTimeline();
    }
  }, [user]);

  const loadTimeline = async () => {
    try {
      if (!user) return;
      
      const timelineEvents = await HealthTimelineService.getUserTimeline(user.id);
      setEvents(timelineEvents);
    } catch (error) {
      console.error('Error loading timeline:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.event_type === filter);

  const groupedEvents = filteredEvents.reduce((groups, event) => {
    const date = format(new Date(event.event_date), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {} as Record<string, HealthTimelineEvent[]>);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-20 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Health Timeline</h2>
          <p className="text-muted-foreground">Track your health journey over time</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter events" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="lab_test">Lab Tests</SelectItem>
              <SelectItem value="medication">Medications</SelectItem>
              <SelectItem value="consultation">Consultations</SelectItem>
              <SelectItem value="genomic_test">Genomic Tests</SelectItem>
              <SelectItem value="hospital_visit">Hospital Visits</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedEvents).map(([date, dayEvents]) => (
          <div key={date} className="relative">
            {/* Date Header */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b mb-4 pb-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold">
                  {format(new Date(date), 'EEEE, MMMM do, yyyy')}
                </h3>
              </div>
            </div>

            {/* Timeline Events */}
            <div className="space-y-4 ml-6">
              {dayEvents.map((event, index) => (
                <div key={event.id} className="relative">
                  {/* Timeline Line */}
                  <div className="absolute -left-6 top-4 w-2 h-2 rounded-full bg-primary"></div>
                  {index < dayEvents.length - 1 && (
                    <div className="absolute -left-5 top-6 w-0.5 h-full bg-border"></div>
                  )}

                  {/* Event Card */}
                  <Card className={`ml-2 ${event.is_milestone ? 'ring-2 ring-primary/20' : ''}`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {eventIcons[event.event_type] || <Heart className="h-4 w-4" />}
                          <CardTitle className="text-base">{event.event_title}</CardTitle>
                          {event.is_milestone && (
                            <Badge variant="secondary" className="text-xs">Milestone</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {format(new Date(event.event_date), 'HH:mm')}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {event.event_description && (
                          <p className="text-sm text-muted-foreground">
                            {event.event_description}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={eventColors[event.event_type] || 'bg-gray-100 text-gray-800'}
                          >
                            {event.event_type.replace('_', ' ').toUpperCase()}
                          </Badge>
                          
                          {event.metadata && Object.keys(event.metadata).length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              View Details
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No health events yet</h3>
              <p className="text-muted-foreground mb-4">
                Your health timeline will populate as you use MeddyPal services
              </p>
              <Button>Book Your First Appointment</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};