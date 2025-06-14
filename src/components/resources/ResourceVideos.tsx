
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Clock, Star, Users, User } from 'lucide-react';

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
        <Card key={video.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <Badge variant="secondary">{video.category}</Badge>
              {video.isPopular && (
                <Badge className="bg-emerald-100 text-emerald-700">Popular</Badge>
              )}
            </div>
            <CardTitle className="text-lg leading-tight">{video.title}</CardTitle>
            <p className="text-sm text-gray-600">{video.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {video.duration}
                </span>
                <span className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                  {video.rating}
                </span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-1" />
                {video.instructor}
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-1" />
                {video.views.toLocaleString()} views
              </div>

              <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700">
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
