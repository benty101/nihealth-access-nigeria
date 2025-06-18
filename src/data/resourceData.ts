
import { Apple, Shield, Brain, Activity, Heart, BookOpen, Users, Trophy } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface Article {
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

export interface Video {
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

export interface Checklist {
  id: number;
  title: string;
  description: string;
  items: number;
  downloads: number;
  category: string;
  isPopular: boolean;
}

export interface Expert {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  experience: string;
  consultations: number;
  rating: number;
  location: string;
  languages: string[];
  availability: string;
  image: string;
  hospitalType?: string;
  consultationFee?: string;
}

export interface EmergencyContact {
  id: number;
  name: string;
  number: string;
  description: string;
  available: string;
  type: string;
}

export interface HealthTip {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
  tips: string[];
  isPopular: boolean;
  region: string;
}

export interface GamificationMilestone {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  achieved: boolean;
  points: number;
  badge: string;
  progress?: number;
}

export const articles: Article[] = [
  {
    id: 1,
    title: 'Complete Guide to Antenatal Care in Nigeria',
    description: 'Everything you need to know about prenatal checkups, tests, and what to expect during each trimester in Nigerian hospitals.',
    category: 'Pregnancy Care',
    readTime: '8 min read',
    author: 'Dr. Adunni Okafor',
    rating: 4.9,
    downloads: 15420,
    isPopular: true,
    tags: ['Antenatal', 'Pregnancy', 'Healthcare', 'Nigeria'],
    location: 'Lagos State',
    imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=200&fit=crop'
  },
  {
    id: 2,
    title: 'Understanding NHIS Coverage for Maternal Health',
    description: 'A comprehensive breakdown of what the National Health Insurance Scheme covers for pregnant mothers across Nigerian states.',
    category: 'Insurance',
    readTime: '6 min read',
    author: 'Dr. Kemi Adeleke',
    rating: 4.7,
    downloads: 12080,
    isPopular: true,
    tags: ['NHIS', 'Insurance', 'Coverage', 'Maternal Health'],
    location: 'Federal Capital Territory'
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

export const videos: Video[] = [
  {
    id: 1,
    title: 'Antenatal Exercise Routines for Nigerian Mothers',
    description: 'Safe exercises during pregnancy adapted for Nigerian climate and culture, filmed at Lagos hospitals.',
    duration: '25 minutes',
    instructor: 'Fitness Coach Amaka Eze',
    views: 45000,
    rating: 4.8,
    category: 'Exercise',
    thumbnail: '/api/placeholder/320/180',
    isPopular: true,
    location: 'Lagos University Teaching Hospital',
    lowBandwidth: true
  },
  {
    id: 2,
    title: 'Understanding Labour and Delivery Process',
    description: 'What to expect during labour, breathing techniques, and when to go to hospital - Nigerian context.',
    duration: '18 minutes',
    instructor: 'Dr. Folake Adebisi',
    views: 62000,
    rating: 4.9,
    category: 'Birth Preparation',
    thumbnail: '/api/placeholder/320/180',
    isPopular: true,
    location: 'UCH Ibadan',
    lowBandwidth: false
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

export const checklists: Checklist[] = [
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

export const experts: Expert[] = [
  {
    id: 1,
    name: 'Dr. Adunni Okafor',
    specialty: 'Maternal-Fetal Medicine',
    hospital: 'Lagos University Teaching Hospital (LUTH)',
    experience: '15 years',
    consultations: 2500,
    rating: 4.9,
    location: 'Idi-Araba, Lagos State',
    languages: ['English', 'Yoruba'],
    availability: 'Available for consultations',
    image: '/api/placeholder/80/80',
    hospitalType: 'Federal Teaching Hospital',
    consultationFee: '₦15,000 - ₦25,000'
  },
  {
    id: 2,
    name: 'Dr. Kemi Adeleke',
    specialty: 'Obstetrics & Gynaecology',
    hospital: 'University College Hospital Ibadan',
    experience: '12 years',
    consultations: 1800,
    rating: 4.8,
    location: 'UCH Road, Ibadan, Oyo State',
    languages: ['English', 'Yoruba'],
    availability: 'Available for consultations',
    image: '/api/placeholder/80/80',
    hospitalType: 'Federal Teaching Hospital',
    consultationFee: '₦12,000 - ₦20,000'
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

export const emergencyContacts: EmergencyContact[] = [
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

export const healthTips: HealthTip[] = [
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
      'Bitter leaf helps regulate blood sugar during pregnancy',
      'Ugwu (fluted pumpkin) leaves are excellent sources of protein and iron',
      'Waterleaf contains omega-3 fatty acids for brain development'
    ],
    isPopular: true,
    region: 'All Nigeria'
  },
  {
    id: 2,
    title: 'Complete Nigerian Vaccination Schedule',
    description: 'Comprehensive immunization calendar following Nigerian health ministry guidelines.',
    category: 'Vaccination',
    icon: Shield,
    tips: [
      'BCG vaccine at birth protects against tuberculosis',
      'Polio drops at birth, 6, 10, and 14 weeks',
      'Pentavalent vaccine at 6, 10, and 14 weeks',
      'Measles vaccine at 9 months, Yellow fever at 9-12 months',
      'Pneumococcal vaccine at 6, 10, 14 weeks',
      'Rotavirus vaccine at 6, 10, 14 weeks',
      'IPV (Injectable Polio) at 14 weeks',
      'Vitamin A supplementation at 6 months and every 6 months after',
      'Meningitis A vaccine at 9-18 months in northern states'
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
      'Seek help from community health workers if feeling overwhelmed',
      'Use prayer and meditation as coping mechanisms',
      'Create a support network of new mothers in your area',
      'Don\'t hesitate to discuss feelings with healthcare providers',
      'Take advantage of family help during the first 40 days'
    ],
    isPopular: true,
    region: 'All Nigeria'
  },
  {
    id: 4,
    title: 'Seasonal Health Preparation in Nigeria',
    description: 'Preparing for harmattan, rainy season, and extreme weather health challenges.',
    category: 'Seasonal Care',
    icon: Activity,
    tips: [
      'Stock up on vitamin C-rich fruits during harmattan (oranges, guava)',
      'Use petroleum jelly to protect skin during dry season',
      'Maintain clean water sources during rainy season',
      'Use mosquito nets to prevent malaria year-round',
      'Keep oral rehydration salts for diarrhea management',
      'Ensure adequate ventilation to prevent respiratory infections',
      'Store medications in cool, dry places during hot season',
      'Increase fluid intake during harmattan to prevent dehydration'
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
      'Avoid self-medication with unknown traditional mixtures',
      'Research traditional medicines through verified sources',
      'Combine traditional and modern practices under medical supervision',
      'Keep records of traditional remedies and their effects',
      'Consult traditional medicine practitioners with proper credentials'
    ],
    isPopular: false,
    region: 'All Nigeria'
  },
  {
    id: 6,
    title: 'Breastfeeding Success in Nigeria',
    description: 'Comprehensive guide to successful breastfeeding in Nigerian context.',
    category: 'Breastfeeding',
    icon: Heart,
    tips: [
      'Start breastfeeding within one hour of birth',
      'Practice exclusive breastfeeding for first 6 months',
      'Eat nutritious local foods like beans, fish, and vegetables',
      'Drink plenty of fluids including zobo and kunun aya',
      'Get adequate rest and family support',
      'Learn proper latching techniques from healthcare workers',
      'Join local breastfeeding support groups',
      'Continue breastfeeding up to 2 years with complementary foods'
    ],
    isPopular: true,
    region: 'All Nigeria'
  },
  {
    id: 7,
    title: 'Child Nutrition (0-5 years)',
    description: 'Complete nutrition guide for Nigerian children using local foods.',
    category: 'Child Nutrition',
    icon: Apple,
    tips: [
      'Introduce complementary foods at 6 months',
      'Use iron-rich foods like beans, fish, and green vegetables',
      'Prepare enriched pap with groundnuts and fish',
      'Include fruits like banana, papaya, and orange daily',
      'Ensure adequate protein from eggs, beans, and fish',
      'Use iodized salt in food preparation',
      'Avoid giving honey to children under 1 year',
      'Practice good hygiene when preparing baby food'
    ],
    isPopular: true,
    region: 'All Nigeria'
  },
  {
    id: 8,
    title: 'Managing Malaria in Pregnancy',
    description: 'Prevention and treatment of malaria during pregnancy.',
    category: 'Disease Prevention',
    icon: Shield,
    tips: [
      'Sleep under insecticide-treated nets every night',
      'Take sulfadoxine-pyrimethamine (SP) as prescribed',
      'Attend all antenatal care appointments',
      'Report fever immediately to healthcare provider',
      'Use approved insect repellents on exposed skin',
      'Clear stagnant water around your home',
      'Wear long-sleeved clothes during peak mosquito hours',
      'Ensure early diagnosis and treatment if infected'
    ],
    isPopular: true,
    region: 'All Nigeria'
  },
  {
    id: 9,
    title: 'Hypertension Management',
    description: 'Managing high blood pressure with lifestyle and medication.',
    category: 'Chronic Conditions',
    icon: Heart,
    tips: [
      'Reduce salt intake and avoid excessive seasoning',
      'Exercise regularly - walking 30 minutes daily',
      'Eat potassium-rich foods like bananas and vegetables',
      'Limit alcohol consumption and avoid smoking',
      'Take medications as prescribed by your doctor',
      'Monitor blood pressure regularly at home',
      'Manage stress through relaxation techniques',
      'Maintain healthy weight through proper diet'
    ],
    isPopular: true,
    region: 'All Nigeria'
  },
  {
    id: 10,
    title: 'Diabetes Management in Nigeria',
    description: 'Living well with diabetes using local resources and foods.',
    category: 'Chronic Conditions',
    icon: Activity,
    tips: [
      'Choose complex carbohydrates like brown rice and yam',
      'Monitor blood sugar levels regularly',
      'Exercise daily - walking, swimming, or dancing',
      'Eat regular meals to maintain stable blood sugar',
      'Include fiber-rich foods like beans and vegetables',
      'Limit sugary drinks and processed foods',
      'Take medications exactly as prescribed',
      'Learn to recognize symptoms of high/low blood sugar'
    ],
    isPopular: true,
    region: 'All Nigeria'
  },
  {
    id: 11,
    title: 'Women\'s Health Essentials',
    description: 'Comprehensive women\'s health guide for all life stages.',
    category: 'Women\'s Health',
    icon: Heart,
    tips: [
      'Perform monthly breast self-examinations',
      'Get regular cervical cancer screening (Pap smear)',
      'Practice good menstrual hygiene',
      'Maintain healthy weight through balanced diet',
      'Take folic acid supplements if planning pregnancy',
      'Get regular check-ups for reproductive health',
      'Practice safe sex and use contraception if needed',
      'Stay up-to-date with HPV and other relevant vaccines'
    ],
    isPopular: true,
    region: 'All Nigeria'
  },
  {
    id: 12,
    title: 'Men\'s Health Essentials',
    description: 'Important health practices for Nigerian men.',
    category: 'Men\'s Health',
    icon: Activity,
    tips: [
      'Get regular prostate screenings after age 40',
      'Perform monthly testicular self-examinations',
      'Maintain healthy weight and exercise regularly',
      'Limit alcohol consumption and avoid smoking',
      'Manage stress through healthy outlets',
      'Get regular blood pressure and cholesterol checks',
      'Practice good hygiene and safe sexual practices',
      'Don\'t ignore unusual symptoms - seek medical help'
    ],
    isPopular: true,
    region: 'All Nigeria'
  },
  {
    id: 13,
    title: 'Mental Health Awareness',
    description: 'Understanding and maintaining good mental health.',
    category: 'Mental Health',
    icon: Brain,
    tips: [
      'Recognize signs of depression and anxiety',
      'Maintain social connections with family and friends',
      'Practice stress management techniques',
      'Get adequate sleep (7-9 hours nightly)',
      'Engage in regular physical activity',
      'Seek professional help when needed',
      'Avoid self-medication with alcohol or drugs',
      'Practice mindfulness and relaxation techniques'
    ],
    isPopular: true,
    region: 'All Nigeria'
  },
  {
    id: 14,
    title: 'Elderly Care and Health',
    description: 'Health maintenance for older adults in Nigeria.',
    category: 'Elderly Care',
    icon: Heart,
    tips: [
      'Get regular health screenings and check-ups',
      'Stay physically active with age-appropriate exercises',
      'Maintain social connections to prevent isolation',
      'Eat nutritious foods rich in calcium and vitamins',
      'Take medications as prescribed and avoid polypharmacy',
      'Ensure home safety to prevent falls',
      'Keep up with vaccinations including flu shots',
      'Monitor for signs of cognitive decline'
    ],
    isPopular: false,
    region: 'All Nigeria'
  },
  {
    id: 15,
    title: 'First Aid Essentials',
    description: 'Basic first aid knowledge every Nigerian should have.',
    category: 'Emergency Care',
    icon: Shield,
    tips: [
      'Learn CPR and basic life support techniques',
      'Know how to treat cuts, burns, and wounds',
      'Recognize signs of stroke and heart attack',
      'Keep a well-stocked first aid kit at home',
      'Know emergency contact numbers by heart',
      'Learn how to treat snake bites and insect stings',
      'Understand when to seek immediate medical help',
      'Practice the recovery position for unconscious victims'
    ],
    isPopular: true,
    region: 'All Nigeria'
  }
];

export const gamificationMilestones: GamificationMilestone[] = [
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
  },
  {
    id: 6,
    title: 'Wellness Warrior',
    description: 'Maintained consistent health metrics tracking for 90 days',
    icon: Heart,
    achieved: false,
    points: 150,
    badge: 'gold',
    progress: 45
  },
  {
    id: 7,
    title: 'Prevention Pioneer',
    description: 'Completed all recommended health screenings',
    icon: Shield,
    achieved: false,
    points: 80,
    badge: 'silver',
    progress: 3
  },
  {
    id: 8,
    title: 'Knowledge Keeper',
    description: 'Shared health tips with 10 community members',
    icon: Brain,
    achieved: false,
    points: 90,
    badge: 'silver',
    progress: 7
  }
];
