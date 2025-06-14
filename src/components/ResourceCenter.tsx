import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  BookOpen, 
  Video, 
  Download, 
  Calendar,
  Users,
  Heart,
  Baby,
  Shield,
  AlertCircle,
  CheckCircle,
  Phone,
  Clock,
  MapPin,
  Star,
  FileText,
  Stethoscope,
  User,
  Apple,
  Activity,
  Brain,
  Trophy,
  Gift
} from 'lucide-react';

const ResourceCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const articles = [
    {
      id: 1,
      title: 'Complete Guide to Antenatal Care in Nigeria',
      description: 'Everything you need to know about prenatal checkups, tests, and what to expect during each trimester.',
      category: 'Pregnancy Care',
      readTime: '8 min read',
      author: 'Dr. Adunni Okafor',
      rating: 4.9,
      downloads: 15420,
      isPopular: true,
      tags: ['Antenatal', 'Pregnancy', 'Healthcare', 'Nigeria']
    },
    {
      id: 2,
      title: 'Understanding NHIS Coverage for Maternal Health',
      description: 'A comprehensive breakdown of what the National Health Insurance Scheme covers for pregnant mothers.',
      category: 'Insurance',
      readTime: '6 min read',
      author: 'Dr. Kemi Adeleke',
      rating: 4.7,
      downloads: 12080,
      isPopular: true,
      tags: ['NHIS', 'Insurance', 'Coverage', 'Maternal Health']
    },
    {
      id: 3,
      title: 'Nutrition During Pregnancy: Nigerian Foods for Healthy Babies',
      description: 'Local Nigerian foods that provide essential nutrients for pregnant mothers and developing babies.',
      category: 'Nutrition',
      readTime: '10 min read',
      author: 'Nutritionist Fatima Hassan',
      rating: 4.8,
      downloads: 18750,
      isPopular: true,
      tags: ['Nutrition', 'Local Foods', 'Pregnancy Diet', 'Nigerian Cuisine']
    },
    {
      id: 4,
      title: 'Managing Pregnancy Complications in Rural Areas',
      description: 'How to recognize warning signs and access care when living in remote areas of Nigeria.',
      category: 'Emergency Care',
      readTime: '12 min read',
      author: 'Dr. Ibrahim Musa',
      rating: 4.6,
      downloads: 9650,
      isPopular: false,
      tags: ['Rural Health', 'Complications', 'Emergency', 'Access to Care']
    },
    {
      id: 5,
      title: 'Postpartum Care: The First 40 Days After Birth',
      description: 'Essential care guidelines for new mothers in the critical weeks following delivery.',
      category: 'Postpartum',
      readTime: '9 min read',
      author: 'Midwife Grace Okonkwo',
      rating: 4.8,
      downloads: 11200,
      isPopular: false,
      tags: ['Postpartum', 'New Mothers', 'Recovery', 'Baby Care']
    },
    {
      id: 6,
      title: 'Birth Planning: Traditional vs Modern Approaches',
      description: 'Balancing cultural traditions with modern medical practices for a safe delivery experience.',
      category: 'Birth Planning',
      readTime: '7 min read',
      author: 'Dr. Chioma Okwu',
      rating: 4.5,
      downloads: 8900,
      isPopular: false,
      tags: ['Birth Planning', 'Cultural Health', 'Traditional Medicine', 'Modern Medicine']
    },
    {
      id: 7,
      title: 'Mental Health During Pregnancy and Beyond',
      description: 'Addressing maternal mental health, postpartum depression, and available support in Nigeria.',
      category: 'Mental Health',
      readTime: '11 min read',
      author: 'Dr. Aisha Bakare',
      rating: 4.7,
      downloads: 7650,
      isPopular: false,
      tags: ['Mental Health', 'Depression', 'Support', 'Wellbeing']
    },
    {
      id: 8,
      title: 'Breastfeeding Success: Nigerian Mothers\' Guide',
      description: 'Practical tips for successful breastfeeding, including cultural considerations and local support.',
      category: 'Breastfeeding',
      readTime: '8 min read',
      author: 'Lactation Consultant Bisi Adebayo',
      rating: 4.9,
      downloads: 14300,
      isPopular: true,
      tags: ['Breastfeeding', 'Infant Nutrition', 'Support', 'New Mothers']
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'Antenatal Exercise Routines for Nigerian Mothers',
      description: 'Safe exercises during pregnancy adapted for Nigerian climate and culture.',
      duration: '25 minutes',
      instructor: 'Fitness Coach Amaka Eze',
      views: 45000,
      rating: 4.8,
      category: 'Exercise',
      thumbnail: '/api/placeholder/320/180',
      isPopular: true
    },
    {
      id: 2,
      title: 'Understanding Labor and Delivery Process',
      description: 'What to expect during labor, breathing techniques, and when to go to the hospital.',
      duration: '18 minutes',
      instructor: 'Dr. Folake Adebisi',
      views: 62000,
      rating: 4.9,
      category: 'Birth Preparation',
      thumbnail: '/api/placeholder/320/180',
      isPopular: true
    },
    {
      id: 3,
      title: 'Newborn Care Basics for First-Time Parents',
      description: 'Essential skills for caring for your newborn in the first weeks.',
      duration: '30 minutes',
      instructor: 'Pediatric Nurse Joy Okafor',
      views: 38000,
      rating: 4.7,
      category: 'Newborn Care',
      thumbnail: '/api/placeholder/320/180',
      isPopular: false
    },
    {
      id: 4,
      title: 'Pregnancy Nutrition with Local Nigerian Foods',
      description: 'How to maintain a healthy pregnancy diet using affordable local ingredients.',
      duration: '22 minutes',
      instructor: 'Dietitian Sarah Mohammed',
      views: 29000,
      rating: 4.6,
      category: 'Nutrition',
      thumbnail: '/api/placeholder/320/180',
      isPopular: false
    },
    {
      id: 5,
      title: 'Managing Pregnancy Symptoms Naturally',
      description: 'Natural remedies for common pregnancy discomforts using traditional Nigerian methods.',
      duration: '15 minutes',
      instructor: 'Traditional Medicine Practitioner Mama Tunde',
      views: 21000,
      rating: 4.5,
      category: 'Natural Remedies',
      thumbnail: '/api/placeholder/320/180',
      isPopular: false
    },
    {
      id: 6,
      title: 'Partner Support During Pregnancy and Birth',
      description: 'How partners can provide emotional and practical support throughout the journey.',
      duration: '20 minutes',
      instructor: 'Family Counselor Dr. John Okechukwu',
      views: 16000,
      rating: 4.4,
      category: 'Partner Support',
      thumbnail: '/api/placeholder/320/180',
      isPopular: false
    }
  ];

  const checklists = [
    {
      id: 1,
      title: 'Hospital Bag Checklist for Nigerian Mothers',
      description: 'Complete list of items to pack for your hospital stay, including cultural considerations.',
      items: 42,
      downloads: 28000,
      category: 'Birth Preparation',
      isPopular: true
    },
    {
      id: 2,
      title: 'Antenatal Appointment Schedule and Questions',
      description: 'Track your appointments and important questions to ask your healthcare provider.',
      items: 35,
      downloads: 19000,
      category: 'Antenatal Care',
      isPopular: true
    },
    {
      id: 3,
      title: 'Baby-Proofing Your Nigerian Home',
      description: 'Safety checklist adapted for typical Nigerian home environments.',
      items: 28,
      downloads: 15000,
      category: 'Safety',
      isPopular: false
    },
    {
      id: 4,
      title: 'Postpartum Recovery Milestones',
      description: 'Track your recovery progress and know when to seek medical attention.',
      items: 24,
      downloads: 12000,
      category: 'Recovery',
      isPopular: false
    },
    {
      id: 5,
      title: 'Emergency Contact List Template',
      description: 'Comprehensive emergency contacts including local hospitals and helplines.',
      items: 18,
      downloads: 22000,
      category: 'Emergency',
      isPopular: true
    },
    {
      id: 6,
      title: 'Breastfeeding Troubleshooting Guide',
      description: 'Common breastfeeding challenges and solutions for Nigerian mothers.',
      items: 31,
      downloads: 17000,
      category: 'Breastfeeding',
      isPopular: false
    }
  ];

  const experts = [
    {
      id: 1,
      name: 'Dr. Adunni Okafor',
      specialty: 'Maternal-Fetal Medicine',
      hospital: 'Lagos University Teaching Hospital',
      experience: '15 years',
      consultations: 2500,
      rating: 4.9,
      location: 'Lagos State',
      languages: ['English', 'Yoruba'],
      availability: 'Available for consultations',
      image: '/api/placeholder/80/80'
    },
    {
      id: 2,
      name: 'Dr. Kemi Adeleke',
      specialty: 'Obstetrics & Gynecology',
      hospital: 'University College Hospital Ibadan',
      experience: '12 years',
      consultations: 1800,
      rating: 4.8,
      location: 'Oyo State',
      languages: ['English', 'Yoruba'],
      availability: 'Available for consultations',
      image: '/api/placeholder/80/80'
    },
    {
      id: 3,
      name: 'Dr. Ibrahim Musa',
      specialty: 'High-Risk Pregnancy',
      hospital: 'National Hospital Abuja',
      experience: '18 years',
      consultations: 3200,
      rating: 4.9,
      location: 'FCT Abuja',
      languages: ['English', 'Hausa'],
      availability: 'Available for consultations',
      image: '/api/placeholder/80/80'
    },
    {
      id: 4,
      name: 'Dr. Chioma Okwu',
      specialty: 'Reproductive Health',
      hospital: 'University of Nigeria Teaching Hospital',
      experience: '10 years',
      consultations: 1500,
      rating: 4.7,
      location: 'Enugu State',
      languages: ['English', 'Igbo'],
      availability: 'Available for consultations',
      image: '/api/placeholder/80/80'
    },
    {
      id: 5,
      name: 'Dr. Aisha Bakare',
      specialty: 'Maternal Mental Health',
      hospital: 'Ahmadu Bello University Teaching Hospital',
      experience: '8 years',
      consultations: 1200,
      rating: 4.6,
      location: 'Kaduna State',
      languages: ['English', 'Hausa'],
      availability: 'Available for consultations',
      image: '/api/placeholder/80/80'
    },
    {
      id: 6,
      name: 'Dr. Folake Adebisi',
      specialty: 'Neonatology',
      hospital: 'Lagos State University Teaching Hospital',
      experience: '14 years',
      consultations: 2100,
      rating: 4.8,
      location: 'Lagos State',
      languages: ['English', 'Yoruba'],
      availability: 'Available for consultations',
      image: '/api/placeholder/80/80'
    }
  ];

  const emergencyContacts = [
    {
      id: 1,
      name: 'National Emergency Number',
      number: '199',
      description: 'General emergency services across Nigeria',
      available: '24/7',
      type: 'Emergency'
    },
    {
      id: 2,
      name: 'Lagos State Emergency Response',
      number: '767',
      description: 'Lagos State emergency medical services',
      available: '24/7',
      type: 'State Emergency'
    },
    {
      id: 3,
      name: 'Maternal Health Helpline',
      number: '+234 800 MOTHER',
      description: 'Dedicated maternal health emergency and advice line',
      available: '24/7',
      type: 'Maternal Health'
    },
    {
      id: 4,
      name: 'FCT Emergency Services',
      number: '+234 9 461 2000',
      description: 'Abuja FCT emergency medical services',
      available: '24/7',
      type: 'State Emergency'
    },
    {
      id: 5,
      name: 'Nigerian Red Cross',
      number: '+234 9 523 3640',
      description: 'Emergency medical assistance and ambulance services',
      available: '24/7',
      type: 'NGO'
    },
    {
      id: 6,
      name: 'NHIS Helpline',
      number: '+234 9 291 7092',
      description: 'National Health Insurance Scheme support and queries',
      available: 'Mon-Fri 8AM-5PM',
      type: 'Insurance'
    }
  ];

  const healthTips = [
    {
      id: 1,
      title: 'Nigerian Superfoods for Pregnancy',
      description: 'Discover local foods like garden eggs, moringa leaves, and palm fruit that boost maternal health.',
      category: 'Nutrition',
      icon: Apple,
      tips: [
        'Garden eggs provide folate and fiber essential for fetal development',
        'Moringa leaves are rich in iron, calcium, and vitamins A & C',
        'Palm fruit oil contains vitamin A crucial for baby\'s vision development',
        'Bitter leaf helps regulate blood sugar during pregnancy'
      ],
      isPopular: true,
      region: 'All Nigeria'
    },
    {
      id: 2,
      title: 'Nigerian Vaccination Schedule',
      description: 'Complete immunization calendar following Nigerian health ministry guidelines.',
      category: 'Vaccination',
      icon: Shield,
      tips: [
        'BCG vaccine at birth protects against tuberculosis',
        'Polio drops at birth, 6, 10, and 14 weeks',
        'Pentavalent vaccine at 6, 10, and 14 weeks',
        'Measles vaccine at 9 months, Yellow fever at 9-12 months'
      ],
      isPopular: true,
      region: 'All Nigeria'
    },
    {
      id: 3,
      title: 'Managing Maternal Mental Health',
      description: 'Addressing postpartum depression and anxiety in Nigerian cultural context.',
      category: 'Mental Health',
      icon: Brain,
      tips: [
        'Join "omugwo" support circles with experienced mothers',
        'Practice deep breathing with traditional herbs like scent leaf',
        'Maintain social connections through family visits',
        'Seek help from community health workers if feeling overwhelmed'
      ],
      isPopular: true,
      region: 'All Nigeria'
    },
    {
      id: 4,
      title: 'Seasonal Health Preparation',
      description: 'Preparing for harmattan, rainy season health challenges.',
      category: 'Seasonal Care',
      icon: Activity,
      tips: [
        'Stock up on vitamin C-rich fruits during harmattan',
        'Maintain clean water sources during rainy season',
        'Use mosquito nets to prevent malaria year-round',
        'Keep oral rehydration salts for diarrhea management'
      ],
      isPopular: false,
      region: 'Northern Nigeria'
    },
    {
      id: 5,
      title: 'Traditional Medicine Integration',
      description: 'Safely combining traditional remedies with modern healthcare.',
      category: 'Traditional Care',
      icon: Heart,
      tips: [
        'Always inform your doctor about herbal remedies you\'re taking',
        'Use ginger tea for morning sickness (consult first)',
        'Palm kernel oil massage for stretch mark prevention',
        'Avoid self-medication with unknown traditional mixtures'
      ],
      isPopular: false,
      region: 'All Nigeria'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'antenatal',
      title: 'Antenatal Check-up Reminder',
      message: 'Your 28-week check-up is scheduled for tomorrow at 10:00 AM',
      time: '1 day',
      priority: 'high',
      actionRequired: true
    },
    {
      id: 2,
      type: 'medication',
      title: 'Iron Supplement Reminder',
      message: 'Time to take your iron tablets - maintaining healthy blood levels!',
      time: '2 hours',
      priority: 'medium',
      actionRequired: true
    },
    {
      id: 3,
      type: 'wellness',
      title: 'Wellness Check Milestone',
      message: 'Congratulations! You\'ve completed 8 out of 10 recommended check-ups',
      time: '3 hours',
      priority: 'low',
      actionRequired: false
    },
    {
      id: 4,
      type: 'vaccination',
      title: 'Baby Vaccination Due',
      message: 'Your baby\'s 6-week vaccination is due next week',
      time: '5 days',
      priority: 'high',
      actionRequired: true
    }
  ];

  const gamificationMilestones = [
    {
      id: 1,
      title: 'First Trimester Champion',
      description: 'Completed all first trimester check-ups on time',
      icon: Trophy,
      achieved: true,
      points: 100,
      badge: 'gold'
    },
    {
      id: 2,
      title: 'Nutrition Ninja',
      description: 'Logged healthy meals for 30 consecutive days',
      icon: Apple,
      achieved: true,
      points: 75,
      badge: 'silver'
    },
    {
      id: 3,
      title: 'Exercise Enthusiast',
      description: 'Completed 20 antenatal exercise sessions',
      icon: Activity,
      achieved: false,
      points: 50,
      badge: 'bronze',
      progress: 15
    },
    {
      id: 4,
      title: 'Health Education Hero',
      description: 'Read 10 health articles and watched 5 educational videos',
      icon: BookOpen,
      achieved: false,
      points: 60,
      badge: 'bronze',
      progress: 8
    },
    {
      id: 5,
      title: 'Community Connector',
      description: 'Participated in 5 support group sessions',
      icon: Users,
      achieved: false,
      points: 40,
      badge: 'bronze',
      progress: 2
    }
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredChecklists = checklists.filter(checklist =>
    checklist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    checklist.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    checklist.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTips = healthTips.filter(tip =>
    tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tip.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tip.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Maternal Health Resource Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive resources, expert guidance, and support for Nigerian mothers
          </p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search resources..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="checklists">Checklists</TabsTrigger>
            <TabsTrigger value="health-tips">Health Tips</TabsTrigger>
            <TabsTrigger value="gamification">Milestones</TabsTrigger>
            <TabsTrigger value="experts">Expert Network</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      {article.isPopular && (
                        <Badge className="bg-emerald-100 text-emerald-700">Popular</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                    <p className="text-sm text-gray-600">{article.description}</p>
                  </CardHeader>
                  <CardContent>
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
                        {article.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Read Article
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
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
          </TabsContent>

          <TabsContent value="checklists" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChecklists.map((checklist) => (
                <Card key={checklist.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{checklist.category}</Badge>
                      {checklist.isPopular && (
                        <Badge className="bg-emerald-100 text-emerald-700">Popular</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg leading-tight">{checklist.title}</CardTitle>
                    <p className="text-sm text-gray-600">{checklist.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {checklist.items} items
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Download className="h-4 w-4 mr-1" />
                        {checklist.downloads.toLocaleString()} downloads
                      </div>

                      <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700">
                        <Download className="h-4 w-4 mr-2" />
                        Download Checklist
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="health-tips" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTips.map((tip) => {
                const IconComponent = tip.icon;
                return (
                  <Card key={tip.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary">{tip.category}</Badge>
                        {tip.isPopular && (
                          <Badge className="bg-emerald-100 text-emerald-700">Popular</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-teal-600" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg leading-tight">{tip.title}</CardTitle>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{tip.description}</p>
                      <Badge variant="outline" className="text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        {tip.region}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 mb-2">Key Tips:</h4>
                        <div className="space-y-2">
                          {tip.tips.map((item, idx) => (
                            <div key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="gamification" className="mt-6">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-6 border border-teal-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Your Health Journey Progress</h3>
                <p className="text-gray-600 mb-4">Track your milestones and earn points for healthy habits!</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Total Points: 175</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Gift className="h-5 w-5 text-purple-500" />
                    <span className="font-medium">Achievements: 2/5</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gamificationMilestones.map((milestone) => {
                  const IconComponent = milestone.icon;
                  return (
                    <Card key={milestone.id} className={`transition-all ${milestone.achieved ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200' : 'hover:shadow-md'}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            milestone.achieved 
                              ? 'bg-gradient-to-br from-emerald-500 to-teal-600' 
                              : 'bg-gray-100'
                          }`}>
                            <IconComponent className={`h-6 w-6 ${milestone.achieved ? 'text-white' : 'text-gray-400'}`} />
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-bold ${milestone.achieved ? 'text-emerald-600' : 'text-gray-500'}`}>
                              {milestone.points} pts
                            </div>
                            <Badge variant={milestone.achieved ? "default" : "outline"} className={
                              milestone.achieved 
                                ? milestone.badge === 'gold' ? 'bg-yellow-500' : milestone.badge === 'silver' ? 'bg-gray-400' : 'bg-orange-500'
                                : ''
                            }>
                              {milestone.badge}
                            </Badge>
                          </div>
                        </div>
                        <CardTitle className={`text-lg ${milestone.achieved ? 'text-emerald-900' : 'text-gray-900'}`}>
                          {milestone.title}
                        </CardTitle>
                        <p className={`text-sm ${milestone.achieved ? 'text-emerald-700' : 'text-gray-600'}`}>
                          {milestone.description}
                        </p>
                      </CardHeader>
                      <CardContent>
                        {milestone.achieved ? (
                          <div className="flex items-center space-x-2 text-emerald-600">
                            <CheckCircle className="h-5 w-5" />
                            <span className="font-medium">Completed!</span>
                          </div>
                        ) : milestone.progress ? (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{milestone.progress}/{milestone.id === 3 ? 20 : milestone.id === 4 ? 15 : 5}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-teal-600 h-2 rounded-full transition-all" 
                                style={{ 
                                  width: `${(milestone.progress / (milestone.id === 3 ? 20 : milestone.id === 4 ? 15 : 5)) * 100}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">
                            Get started to unlock this milestone!
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="experts" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experts.map((expert) => (
                <Card key={expert.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full flex items-center justify-center">
                        <Stethoscope className="h-8 w-8 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{expert.name}</CardTitle>
                        <p className="text-sm text-gray-600">{expert.specialty}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm">{expert.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm text-gray-600">
                        <strong>Hospital:</strong> {expert.hospital}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {expert.location}
                      </div>

                      <div className="text-sm text-gray-600">
                        <strong>Experience:</strong> {expert.experience}
                      </div>

                      <div className="text-sm text-gray-600">
                        <strong>Consultations:</strong> {expert.consultations.toLocaleString()}+
                      </div>

                      <div className="text-sm text-gray-600">
                        <strong>Languages:</strong> {expert.languages.join(', ')}
                      </div>

                      <div className="flex items-center text-sm text-emerald-600">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {expert.availability}
                      </div>

                      <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700">
                        <Phone className="h-4 w-4 mr-2" />
                        Book Consultation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="emergency" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {emergencyContacts.map((contact) => (
                <Card key={contact.id} className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <Phone className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{contact.name}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {contact.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600">{contact.number}</div>
                        <div className="text-sm text-gray-500">{contact.available}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{contact.description}</p>
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold text-red-900">Emergency Warning Signs</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-red-800">
                <div>
                  <h4 className="font-medium mb-2">During Pregnancy:</h4>
                  <ul className="space-y-1">
                    <li>• Severe abdominal pain</li>
                    <li>• Heavy bleeding</li>
                    <li>• Severe headaches</li>
                    <li>• Vision changes</li>
                    <li>• Decreased fetal movement</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">During Labor/After Birth:</h4>
                  <ul className="space-y-1">
                    <li>• Heavy bleeding</li>
                    <li>• High fever</li>
                    <li>• Severe abdominal pain</li>
                    <li>• Difficulty breathing</li>
                    <li>• Signs of infection</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResourceCenter;
