
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Play, CheckSquare, Calendar, Heart, Baby } from 'lucide-react';

const ResourceCenter = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources = [
    {
      title: 'Your First Trimester: What to Expect',
      type: 'article',
      category: 'pregnancy',
      readTime: '8 min read',
      tags: ['Trimester 1', 'Symptoms', 'Health Tips'],
      summary: 'Complete guide to navigating your first three months of pregnancy',
      image: '/placeholder.svg'
    },
    {
      title: 'Preparing for Your First Antenatal Visit',
      type: 'checklist',
      category: 'appointments',
      items: 12,
      tags: ['Antenatal', 'Preparation', 'Questions'],
      summary: 'Essential checklist for your first doctor visit',
      image: '/placeholder.svg'
    },
    {
      title: 'Nutrition During Pregnancy',
      type: 'video',
      category: 'nutrition',
      duration: '15 min',
      tags: ['Diet', 'Vitamins', 'Healthy Eating'],
      summary: 'Expert advice on eating well for you and your baby',
      image: '/placeholder.svg'
    },
    {
      title: 'Understanding Your Scan Results',
      type: 'article',
      category: 'medical',
      readTime: '6 min read',
      tags: ['Ultrasound', 'Scans', 'Medical Tests'],
      summary: 'Learn how to read and understand your ultrasound reports',
      image: '/placeholder.svg'
    },
    {
      title: 'Choosing the Right Hospital for Delivery',
      type: 'guide',
      category: 'planning',
      readTime: '10 min read',
      tags: ['Hospital', 'Delivery', 'Birth Plan'],
      summary: 'Factors to consider when selecting where to give birth',
      image: '/placeholder.svg'
    },
    {
      title: 'Exercise Safety During Pregnancy',
      type: 'video',
      category: 'fitness',
      duration: '12 min',
      tags: ['Exercise', 'Safety', 'Prenatal Fitness'],
      summary: 'Safe exercises and activities for expecting mothers',
      image: '/placeholder.svg'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen },
    { id: 'pregnancy', name: 'Pregnancy', icon: Heart },
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'nutrition', name: 'Nutrition', icon: Baby },
    { id: 'medical', name: 'Medical', icon: CheckSquare },
  ];

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'checklist': return <CheckSquare className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Maternal Health Resource Center
        </h1>
        <p className="text-lg text-gray-600">
          Expert guides, tips, and resources for your pregnancy journey
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center"
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="aspect-video bg-gradient-to-br from-pink-50 to-blue-50 rounded-t-lg flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                {getTypeIcon(resource.type)}
              </div>
            </div>
            
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {resource.type}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{resource.summary}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>
                  {resource.readTime || `${resource.duration}` || `${resource.items} items`}
                </span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {resource.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button variant="outline" size="sm" className="w-full">
                {resource.type === 'video' ? 'Watch Video' : 
                 resource.type === 'checklist' ? 'View Checklist' : 'Read Article'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg p-8 text-center">
        <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Need Personalized Support?
        </h2>
        <p className="text-gray-600 mb-6">
          Connect with our maternal health experts for personalized guidance throughout your pregnancy
        </p>
        <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
          Chat with Expert
        </Button>
      </div>
    </div>
  );
};

export default ResourceCenter;
