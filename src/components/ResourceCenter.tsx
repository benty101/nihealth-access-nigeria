import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Apple, Shield, Brain, Activity, Heart, BookOpen, Users, Trophy } from 'lucide-react';
import ResourceArticles from '@/components/resources/ResourceArticles';
import ResourceVideos from '@/components/resources/ResourceVideos';
import ResourceChecklists from '@/components/resources/ResourceChecklists';
import ResourceHealthTips from '@/components/resources/ResourceHealthTips';
import ResourceGamification from '@/components/resources/ResourceGamification';
import ResourceExperts from '@/components/resources/ResourceExperts';
import ResourceEmergency from '@/components/resources/ResourceEmergency';

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
            <ResourceArticles articles={articles} searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <ResourceVideos videos={videos} searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="checklists" className="mt-6">
            <ResourceChecklists checklists={checklists} searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="health-tips" className="mt-6">
            <ResourceHealthTips healthTips={healthTips} searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="gamification" className="mt-6">
            <ResourceGamification milestones={gamificationMilestones} />
          </TabsContent>

          <TabsContent value="experts" className="mt-6">
            <ResourceExperts experts={experts} />
          </TabsContent>

          <TabsContent value="emergency" className="mt-6">
            <ResourceEmergency emergencyContacts={emergencyContacts} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResourceCenter;
