
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Play, CheckSquare, Calendar, Heart, Baby, Star, Clock, Users } from 'lucide-react';

const ResourceCenter = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources = [
    {
      title: 'Your First Trimester: What to Expect',
      type: 'article',
      category: 'pregnancy',
      readTime: '8 min read',
      rating: 4.8,
      tags: ['Trimester 1', 'Symptoms', 'Health Tips'],
      summary: 'A comprehensive guide to navigating your first three months of pregnancy with expert advice from Nigerian obstetricians.',
      image: '/placeholder.svg',
      author: 'Dr. Adunni Olatunde'
    },
    {
      title: 'Preparing for Your First Antenatal Visit',
      type: 'checklist',
      category: 'appointments',
      items: 12,
      rating: 4.9,
      tags: ['Antenatal', 'Preparation', 'Questions'],
      summary: 'Essential checklist for your first doctor visit including questions to ask and documents to bring.',
      image: '/placeholder.svg',
      author: 'MeddyPal Team'
    },
    {
      title: 'Nutrition During Pregnancy: Nigerian Foods Edition',
      type: 'video',
      category: 'nutrition',
      duration: '15 min',
      rating: 4.7,
      tags: ['Diet', 'Local Foods', 'Vitamins'],
      summary: 'Expert nutritionist discusses healthy Nigerian meals perfect for pregnancy.',
      image: '/placeholder.svg',
      author: 'Nutr. Folake Adebayo'
    },
    {
      title: 'Understanding Your Ultrasound Results',
      type: 'article',
      category: 'medical',
      readTime: '6 min read',
      rating: 4.6,
      tags: ['Ultrasound', 'Scans', 'Medical Tests'],
      summary: 'Learn how to read and understand your ultrasound reports with clear explanations.',
      image: '/placeholder.svg',
      author: 'Dr. Emeka Nwankwo'
    },
    {
      title: 'Choosing the Right Hospital for Delivery in Lagos',
      type: 'guide',
      category: 'planning',
      readTime: '10 min read',
      rating: 4.8,
      tags: ['Hospital', 'Delivery', 'Lagos'],
      summary: 'Detailed comparison of top delivery hospitals in Lagos with pricing and amenities.',
      image: '/placeholder.svg',
      author: 'MeddyPal Research Team'
    },
    {
      title: 'Safe Exercise During Pregnancy',
      type: 'video',
      category: 'fitness',
      duration: '12 min',
      rating: 4.5,
      tags: ['Exercise', 'Safety', 'Prenatal Fitness'],
      summary: 'Certified trainer demonstrates safe exercises for each trimester.',
      image: '/placeholder.svg',
      author: 'Fitness Coach Amara'
    },
    {
      title: 'Managing Morning Sickness: Natural Remedies',
      type: 'article',
      category: 'pregnancy',
      readTime: '5 min read',
      rating: 4.7,
      tags: ['Morning Sickness', 'Natural Remedies', 'First Trimester'],
      summary: 'Proven natural remedies using locally available ingredients to manage nausea.',
      image: '/placeholder.svg',
      author: 'Dr. Kemi Adeyemi'
    },
    {
      title: 'Birth Plan Template for Nigerian Mothers',
      type: 'template',
      category: 'planning',
      downloadable: true,
      rating: 4.9,
      tags: ['Birth Plan', 'Template', 'Delivery'],
      summary: 'Customizable birth plan template tailored for Nigerian healthcare system.',
      image: '/placeholder.svg',
      author: 'MeddyPal Legal Team'
    },
    {
      title: 'Breastfeeding Masterclass',
      type: 'video',
      category: 'postpartum',
      duration: '25 min',
      rating: 4.8,
      tags: ['Breastfeeding', 'Newborn Care', 'Lactation'],
      summary: 'Comprehensive guide to successful breastfeeding with lactation consultant.',
      image: '/placeholder.svg',
      author: 'LC Funmi Ogundipe'
    },
    {
      title: 'Postpartum Depression: Signs and Support',
      type: 'article',
      category: 'mental-health',
      readTime: '7 min read',
      rating: 4.6,
      tags: ['Mental Health', 'Postpartum', 'Support'],
      summary: 'Understanding postpartum depression and finding help in Nigeria.',
      image: '/placeholder.svg',
      author: 'Dr. Ngozi Okwu'
    },
    {
      title: 'NHIS Coverage for Maternal Care',
      type: 'guide',
      category: 'insurance',
      readTime: '8 min read',
      rating: 4.4,
      tags: ['NHIS', 'Insurance', 'Coverage'],
      summary: 'Complete guide to what NHIS covers for pregnancy and delivery.',
      image: '/placeholder.svg',
      author: 'Insurance Expert Team'
    },
    {
      title: 'Emergency Signs During Pregnancy',
      type: 'checklist',
      category: 'emergency',
      items: 15,
      rating: 4.9,
      tags: ['Emergency', 'Warning Signs', 'Safety'],
      summary: 'Critical warning signs that require immediate medical attention.',
      image: '/placeholder.svg',
      author: 'Dr. Bola Adebayo'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen },
    { id: 'pregnancy', name: 'Pregnancy', icon: Heart },
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'nutrition', name: 'Nutrition', icon: Baby },
    { id: 'medical', name: 'Medical', icon: CheckSquare },
    { id: 'planning', name: 'Birth Planning', icon: Calendar },
    { id: 'fitness', name: 'Fitness', icon: Heart },
    { id: 'postpartum', name: 'Postpartum', icon: Baby },
    { id: 'mental-health', name: 'Mental Health', icon: Heart },
    { id: 'insurance', name: 'Insurance', icon: CheckSquare },
    { id: 'emergency', name: 'Emergency', icon: Heart },
  ];

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'checklist': return <CheckSquare className="h-4 w-4" />;
      case 'template': return <BookOpen className="h-4 w-4" />;
      case 'guide': return <BookOpen className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-700';
      case 'checklist': return 'bg-green-100 text-green-700';
      case 'template': return 'bg-purple-100 text-purple-700';
      case 'guide': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Maternal Health Resource Center
        </h1>
        <p className="text-lg text-gray-600">
          Expert guides, tips, and resources for your pregnancy journey - created by Nigerian healthcare professionals
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
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="aspect-video bg-gradient-to-br from-teal-50 to-emerald-50 rounded-t-lg flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                {getTypeIcon(resource.type)}
              </div>
            </div>
            
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-lg leading-tight flex-1">{resource.title}</CardTitle>
                <Badge variant="outline" className={`text-xs ml-2 ${getTypeColor(resource.type)}`}>
                  {resource.type}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 mr-1" />
                  <span>{resource.rating}</span>
                </div>
                <span>•</span>
                <span>{resource.author}</span>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{resource.summary}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>
                    {resource.readTime || resource.duration || `${resource.items} items`}
                  </span>
                </div>
                {resource.downloadable && (
                  <Badge variant="secondary" className="text-xs">
                    Downloadable
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {resource.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button variant="outline" size="sm" className="w-full group-hover:bg-teal-50 group-hover:border-teal-300">
                {resource.type === 'video' ? 'Watch Video' : 
                 resource.type === 'checklist' ? 'View Checklist' : 
                 resource.type === 'template' ? 'Download Template' :
                 resource.type === 'guide' ? 'Read Guide' : 'Read Article'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Expert Section */}
      <div className="mt-16 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <Heart className="h-12 w-12 text-teal-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Personalized Support?
          </h2>
          <p className="text-gray-600 mb-6">
            Connect with our maternal health experts for personalized guidance throughout your pregnancy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
              Chat with Expert
            </Button>
            <Button size="lg" variant="outline" className="border-teal-300 text-teal-700 hover:bg-teal-50">
              Join Support Group
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <Users className="h-8 w-8 text-teal-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Expert Network</h3>
            <p className="text-sm text-gray-600">50+ certified specialists</p>
          </div>
          <div className="text-center">
            <Clock className="h-8 w-8 text-teal-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">24/7 Support</h3>
            <p className="text-sm text-gray-600">Always available when needed</p>
          </div>
          <div className="text-center">
            <Heart className="h-8 w-8 text-teal-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Personalized Care</h3>
            <p className="text-sm text-gray-600">Tailored to your journey</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCenter;
