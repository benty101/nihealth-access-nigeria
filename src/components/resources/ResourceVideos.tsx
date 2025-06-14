
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Clock, Star, Users, User, MapPin, Wifi } from 'lucide-react';

interface VideoResource {
  id: number;
  title: string;
  description: string;
  duration: string;
  instructor: string;
  views: number;
  rating: number;
  category: string;
  thumbnail: string;
  isPopular: boolean;
  location?: string;
  lowBandwidth?: boolean;
}

interface ResourceVideosProps {
  videos: VideoResource[];
  searchTerm: string;
}

const ResourceVideos = ({ videos, searchTerm }: ResourceVideosProps) => {
  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredVideos.map((video) => (
        <Card key={video.id} className="hover:shadow-lg transition-shadow overflow-hidden">
          <div className="h-40 bg-gradient-to-br from-teal-50 to-emerald-50 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Video className="h-12 w-12 text-teal-600" />
            </div>
            <div className="absolute top-3 left-3">
              <Badge variant="secondary">{video.category}</Badge>
            </div>
            <div className="absolute top-3 right-3 flex gap-1">
              {video.isPopular && (
                <Badge className="bg-emerald-100 text-emerald-700 text-xs">Popular</Badge>
              )}
              {video.lowBandwidth && (
                <Badge className="bg-blue-100 text-blue-700 text-xs">
                  <Wifi className="h-3 w-3 mr-1" />
                  Low Data
                </Badge>
              )}
            </div>
            <div className="absolute bottom-3 right-3">
              <Badge variant="outline" className="bg-black bg-opacity-70 text-white text-xs">
                {video.duration}
              </Badge>
            </div>
          </div>
          
          <CardHeader className="pb-3">
            <CardTitle className="text-lg leading-tight line-clamp-2">{video.title}</CardTitle>
            <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
            {video.location && (
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {video.location}
              </div>
            )}
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                  {video.rating}
                </span>
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {video.views.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-1" />
                {video.instructor}
              </div>

              <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-sm">
                <Video className="h-4 w-4 mr-2" />
                Watch Video
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResourceVideos;
