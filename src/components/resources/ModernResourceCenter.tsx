import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  BookOpen, 
  Video, 
  Heart, 
  Baby, 
  Brain, 
  Activity, 
  Stethoscope,
  Users,
  Clock,
  Star,
  TrendingUp,
  Shield,
  Target,
  Zap,
  PlayCircle
} from 'lucide-react';

const ModernResourceCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen },
    { id: 'maternal', name: 'Maternal Health', icon: Heart },
    { id: 'pediatric', name: 'Child Care', icon: Baby },
    { id: 'mental', name: 'Mental Wellness', icon: Brain },
    { id: 'fitness', name: 'Fitness & Nutrition', icon: Activity },
    { id: 'chronic', name: 'Chronic Conditions', icon: Stethoscope },
  ];

  const featuredResources = [
    {
      id: 1,
      title: 'Complete Guide to Prenatal Care in Nigeria',
      description: 'Comprehensive guide covering nutrition, exercise, and medical care during pregnancy.',
      category: 'maternal',
      type: 'article',
      readTime: '12 min read',
      rating: 4.9,
      views: '25.2k',
      image: 'photo-1581091226825-a6a2a5aee158',
      featured: true
    },
    {
      id: 2,
      title: 'Understanding Sickle Cell Disease Management',
      description: 'Expert insights on managing sickle cell disease with modern treatments.',
      category: 'chronic',
      type: 'video',
      readTime: '18 min watch',
      rating: 4.8,
      views: '18.7k',
      image: 'photo-1649972904349-6e44c42644a7',
      featured: true
    },
    {
      id: 3,
      title: 'Mental Health Support for New Mothers',
      description: 'Addressing postpartum depression and anxiety with culturally sensitive approaches.',
      category: 'mental',
      type: 'article',
      readTime: '8 min read',
      rating: 4.9,
      views: '32.1k',
      image: 'photo-1488590528505-98d2b5aba04b',
      featured: true
    }
  ];

  const allResources = [
    {
      id: 4,
      title: 'Newborn Care Essentials',
      description: 'Everything new parents need to know about caring for their newborn.',
      category: 'pediatric',
      type: 'article',
      readTime: '10 min read',
      rating: 4.7,
      views: '15.3k'
    },
    {
      id: 5,
      title: 'Nutrition During Pregnancy',
      description: 'Essential nutrients and meal planning for expectant mothers.',
      category: 'maternal',
      type: 'video',
      readTime: '25 min watch',
      rating: 4.8,
      views: '22.1k'
    },
    {
      id: 6,
      title: 'Managing Diabetes in Nigeria',
      description: 'Practical tips for diabetes management with local food options.',
      category: 'chronic',
      type: 'article',
      readTime: '15 min read',
      rating: 4.6,
      views: '19.8k'
    },
    {
      id: 7,
      title: 'Exercise During Pregnancy',
      description: 'Safe exercises and activities for each trimester of pregnancy.',
      category: 'fitness',
      type: 'video',
      readTime: '20 min watch',
      rating: 4.9,
      views: '28.4k'
    },
    {
      id: 8,
      title: 'Childhood Immunization Schedule',
      description: 'Complete vaccination guide for children in Nigeria.',
      category: 'pediatric',
      type: 'article',
      readTime: '7 min read',
      rating: 4.8,
      views: '31.2k'
    }
  ];

  const filteredResources = [...featuredResources, ...allResources].filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ResourceCard = ({ resource, featured = false }: { resource: any, featured?: boolean }) => (
    <Card className={`group hover:shadow-xl transition-all duration-300 cursor-pointer ${
      featured ? 'ring-2 ring-primary/20 shadow-lg' : 'hover:-translate-y-1'
    }`}>
      {resource.image && (
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={`https://images.unsplash.com/${resource.image}`}
            alt={resource.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {resource.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <PlayCircle className="h-12 w-12 text-white" />
            </div>
          )}
          {featured && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {categories.find(c => c.id === resource.category)?.name}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-health-warning text-health-warning" />
            {resource.rating}
          </div>
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          {resource.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {resource.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            {resource.readTime}
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {resource.views} views
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen className="h-4 w-4 mr-2" />
            Health Resources & Education
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Health <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Knowledge Center</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Evidence-based health information, expert advice, and practical guides tailored for Nigerian healthcare needs
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 animate-fade-in animation-delay-200">
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search health topics, conditions, or treatments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <IconComponent className="h-4 w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Featured Resources */}
        {selectedCategory === 'all' && searchQuery === '' && (
          <div className="mb-12 animate-fade-in animation-delay-400">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              Featured Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} featured />
              ))}
            </div>
          </div>
        )}

        {/* All Resources */}
        <div className="animate-fade-in animation-delay-600">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {selectedCategory === 'all' ? 'All Resources' : `${categories.find(c => c.id === selectedCategory)?.name} Resources`}
            </h2>
            <div className="text-sm text-muted-foreground">
              {filteredResources.length} resources found
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-card rounded-2xl p-8 border animate-fade-in animation-delay-800">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Trusted Health Information
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Expert Articles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-health-success mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Video Guides</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-health-info mb-2">1M+</div>
              <div className="text-sm text-muted-foreground">Monthly Readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Medical Experts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernResourceCenter;