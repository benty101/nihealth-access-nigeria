
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Star, Download, User, MapPin } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  description: string;
  category: string;
  readTime: string;
  author: string;
  rating: number;
  downloads: number;
  isPopular: boolean;
  tags: string[];
  location?: string;
  imageUrl?: string;
}

interface ResourceArticlesProps {
  articles: Article[];
  searchTerm: string;
}

const ResourceArticles = ({ articles, searchTerm }: ResourceArticlesProps) => {
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredArticles.map((article) => (
        <Card key={article.id} className="hover:shadow-lg transition-shadow overflow-hidden">
          {article.imageUrl && (
            <div className="h-48 bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center relative">
              <div className="w-full h-full bg-cover bg-center" 
                   style={{ backgroundImage: `url(${article.imageUrl})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              {article.isPopular && (
                <Badge className="absolute top-3 right-3 bg-emerald-500 text-white">
                  Popular
                </Badge>
              )}
            </div>
          )}
          <CardHeader className={!article.imageUrl ? 'pb-3' : ''}>
            {!article.imageUrl && (
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary">{article.category}</Badge>
                {article.isPopular && (
                  <Badge className="bg-emerald-100 text-emerald-700">Popular</Badge>
                )}
              </div>
            )}
            <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
            <p className="text-sm text-gray-600 line-clamp-2">{article.description}</p>
            {article.location && (
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {article.location}
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {article.readTime}
                </span>
                <span className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                  {article.rating}
                </span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-1" />
                {article.author}
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Download className="h-4 w-4 mr-1" />
                {article.downloads.toLocaleString()} downloads
              </div>

              <div className="flex flex-wrap gap-1">
                {article.tags.slice(0, 3).map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Read Article
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResourceArticles;
