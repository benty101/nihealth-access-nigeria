import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Brain, 
  Shield, 
  Microscope, 
  Users, 
  Award,
  Stethoscope,
  Activity,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Globe,
  Search,
  Baby,
  Bone,
  Eye,
  Zap,
  Play,
  ChevronRight,
  Calendar,
  MessageCircle,
  UserCheck,
  Sparkles
} from 'lucide-react';

const FramerTemplate = () => {
  const [doctorSearch, setDoctorSearch] = useState('');
  const [activeTab, setActiveTab] = useState('emergency');

  const handleDoctorSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search doctor:', doctorSearch);
  };

  const stats = [
    { number: '98%', label: 'Satisfaction rate' },
    { number: '30+', label: 'Years of experience' },
    { number: '1000+', label: 'Patients Treated' },
    { number: '80', label: 'Expert Doctors' }
  ];

  const visionPoints = [
    {
      title: 'Patient-Centered Care',
      description: 'We prioritize patient needs and preferences, ensuring personalized treatment.',
      icon: Heart
    },
    {
      title: 'Innovative Health Solutions',
      description: 'We leverage cutting-edge technology and research to deliver healthcare services.',
      icon: Zap
    },
    {
      title: 'Holistic Wellness',
      description: 'We focus on care that nurtures both physical and mental well-being for a community.',
      icon: Shield
    }
  ];

  const serviceCategories = {
    emergency: [
      {
        title: 'Emergency Care',
        description: '24/7 emergency services with rapid response and critical care.',
        icon: Heart,
        color: 'from-red-500 to-pink-600',
        link: '/emergency'
      },
      {
        title: 'Urgent Consultations',
        description: 'Same-day virtual consultations for urgent health concerns.',
        icon: Stethoscope,
        color: 'from-orange-500 to-red-500',
        link: '/telemedicine'
      },
      {
        title: 'Lab Results Fast-Track',
        description: 'Priority lab testing with results within 2-4 hours.',
        icon: Microscope,
        color: 'from-blue-500 to-purple-600',
        link: '/labs'
      }
    ],
    specialized: [
      {
        title: 'AI Health Assistant',
        description: 'Personalized health insights powered by advanced AI technology.',
        icon: Brain,
        color: 'from-purple-500 to-violet-600',
        link: '/health-intelligence'
      },
      {
        title: 'Genomic Analysis',
        description: 'Comprehensive genetic testing and personalized medicine recommendations.',
        icon: Microscope,
        color: 'from-green-500 to-emerald-600',
        link: '/genomics'
      },
      {
        title: 'Maternal Care',
        description: 'Complete pregnancy and maternal health monitoring services.',
        icon: Baby,
        color: 'from-pink-500 to-rose-600',
        link: '/pediatric'
      }
    ],
    primary: [
      {
        title: 'General Medicine',
        description: 'Comprehensive primary care for all your health needs.',
        icon: UserCheck,
        color: 'from-teal-500 to-cyan-600',
        link: '/consultations'
      },
      {
        title: 'Preventive Screening',
        description: 'Regular health check-ups and preventive care programs.',
        icon: Shield,
        color: 'from-blue-500 to-indigo-600',
        link: '/appointments'
      },
      {
        title: 'Pharmacy Services',
        description: 'Prescription management and medication delivery.',
        icon: Activity,
        color: 'from-green-500 to-teal-600',
        link: '/pharmacy'
      }
    ]
  };

  const doctors = [
    {
      name: 'Dr. Adebayo Johnson',
      specialty: 'Gastroenterologist',
      image: '/placeholder.svg',
      experience: '15+ years'
    },
    {
      name: 'Dr. Kemi Oladele',
      specialty: 'Dermatologist',
      image: '/placeholder.svg',
      experience: '12+ years'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Patient',
      content: 'The care I received was exceptional. The doctors were thorough and compassionate.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Patient',
      content: 'Outstanding service and cutting-edge medical technology. Highly recommended.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 lg:px-20 py-6 bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">MeddyPal</span>
            <div className="text-xs text-gray-500 -mt-1">Your Health Companion</div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
            About
          </Link>
          <Link to="/telemedicine" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
            Services
          </Link>
          <Link to="/hospitals" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
            Doctors
          </Link>
          <Link to="/careers" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
            Careers
          </Link>
          <Search className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
        </div>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost"
            className="text-gray-700 hover:text-blue-600 transition-colors"
            asChild
          >
            <Link to="/auth">Sign In</Link>
          </Button>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <Link to="/dashboard">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-6 lg:px-20 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-gray-900 font-semibold">4.7</span>
                <span className="text-gray-500">| 3,460 Reviews</span>
              </div>
              
              {/* Hero Title */}
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-light leading-tight text-gray-900">
                  Your{' '}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent font-semibold">
                      intelligent
                    </span>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-700/20 rounded-lg blur"></div>
                  </span>
                </h1>
                <h1 className="text-5xl lg:text-7xl font-light leading-tight text-gray-900">
                  health companion
                </h1>
                <h1 className="text-5xl lg:text-7xl font-light leading-tight text-gray-900">
                  powered by{' '}
                  <span className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full">
                    <Sparkles className="w-6 h-6 text-green-600 mr-2" />
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-medium">AI & Genomics</span>
                  </span>
                </h1>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                  asChild
                >
                  <Link to="/appointments">
                    <Calendar className="w-5 h-5 mr-2 group-hover:rotate-6 transition-transform" />
                    Book Consultation
                  </Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-full backdrop-blur-sm"
                  asChild
                >
                  <Link to="/emergency">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    Emergency Care
                  </Link>
                </Button>
              </div>
            </div>

            {/* Hero Image & Interactive Cards */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 lg:p-12 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                
                <img 
                  src="/placeholder.svg" 
                  alt="Advanced Healthcare Technology"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                
                {/* AI Health Assistant Card */}
                <div className="absolute top-8 right-8 bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 max-w-xs">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mr-2">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">AI Health Assistant</h3>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span>24/7 Available</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>Personalized Insights</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      <span>Genomic Analysis</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg"
                    asChild
                  >
                    <Link to="/health-intelligence">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat Now
                    </Link>
                  </Button>
                </div>

                {/* Quick Actions Floating Card */}
                <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20">
                  <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                  <div className="flex space-x-3">
                    <Button size="sm" variant="outline" className="rounded-full" asChild>
                      <Link to="/emergency">
                        <Heart className="w-4 h-4 text-red-500" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-full" asChild>
                      <Link to="/pharmacy">
                        <Activity className="w-4 h-4 text-green-500" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-full" asChild>
                      <Link to="/labs">
                        <Microscope className="w-4 h-4 text-blue-500" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl lg:text-6xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="px-6 lg:px-20 py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">Our Vision</h2>
                <h3 className="text-xl lg:text-2xl text-gray-700 mb-8">
                  Finding health solutions with top Experts
                </h3>
                <Button 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  asChild
                >
                  <Link to="/about">About Us</Link>
                </Button>
              </div>
            </div>

            <div className="space-y-8">
              {visionPoints.map((point, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <point.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{point.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="px-6 lg:px-20 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">Healthcare Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare solutions designed for modern life
            </p>
          </div>

          {/* Service Category Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/80 backdrop-blur-md rounded-full p-2 shadow-lg border border-gray-200">
              <div className="flex space-x-2">
                {[
                  { id: 'emergency', label: 'Emergency', icon: Heart },
                  { id: 'specialized', label: 'Specialized', icon: Brain },
                  { id: 'primary', label: 'Primary Care', icon: UserCheck }
                ].map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    className={`rounded-full px-6 py-2 transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories[activeTab as keyof typeof serviceCategories].map((service, index) => (
              <Link key={index} to={service.link} className="block">
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group border-0 bg-white/80 backdrop-blur-sm hover:bg-white h-full">
                  <CardContent className="p-8 text-center relative h-full flex flex-col">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-center text-blue-600 group-hover:text-purple-600 transition-colors mt-auto">
                      <span className="text-sm font-medium mr-2">Learn more</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="px-6 lg:px-20 py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">What Our Patients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from real patients who trust MeddyPal with their healthcare
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Blog/Insights Section */}
      <div className="px-6 lg:px-20 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">Latest Health Insights</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with the latest in healthcare innovation and wellness tips
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "10 Essential Health Screenings Every Adult Should Have",
                excerpt: "Learn about crucial health screenings that can help detect problems early and maintain optimal health.",
                date: "Dec 15, 2024",
                readTime: "5 min read",
                image: "/placeholder.svg"
              },
              {
                title: "The Future of Telemedicine in Nigeria",
                excerpt: "Exploring how digital health solutions are transforming healthcare accessibility across Nigeria.",
                date: "Dec 12, 2024",
                readTime: "7 min read",
                image: "/placeholder.svg"
              },
              {
                title: "Mental Health Awareness: Breaking the Stigma",
                excerpt: "Understanding mental health challenges and the importance of seeking professional help.",
                date: "Dec 10, 2024",
                readTime: "6 min read",
                image: "/placeholder.svg"
              }
            ].map((article, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-0">
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {article.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              asChild
            >
              <Link to="/insights">
                View All Articles <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative px-6 lg:px-20 py-24 overflow-hidden">
        {/* Background with glass effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        
        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <div className="mb-8">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-4">
              NABDA Certified • ISO 27001 Compliant
            </Badge>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-light mb-6 leading-tight">
            Transform Your{' '}
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent font-semibold">
              Healthcare Journey
            </span>
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Experience the future of healthcare with AI-powered insights, genomic analysis, and personalized care that adapts to your unique health profile.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold shadow-2xl hover:shadow-white/25 transition-all duration-300"
              asChild
            >
              <Link to="/appointments">
                <Calendar className="w-5 h-5 mr-2" />
                Book Free Consultation
              </Link>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-semibold transition-all duration-300"
              asChild
            >
              <Link to="/health-intelligence">
                <Brain className="w-5 h-5 mr-2" />
                Try AI Assistant
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-white mb-1">500K+</div>
              <div className="text-sm text-gray-300">Patients Served</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-white mb-1">98.5%</div>
              <div className="text-sm text-gray-300">Satisfaction Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-gray-300">Available Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">MeddyPal</span>
                  <div className="text-xs text-gray-500 -mt-1">Your Health Companion</div>
                </div>
              </div>
              <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
                Nigeria's leading AI-powered healthcare platform, combining advanced genomics, 
                personalized medicine, and compassionate care to transform health outcomes.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-sm text-gray-600 bg-white rounded-lg p-3 border">
                  <Award className="w-4 h-4 mr-2 text-blue-600" />
                  NABDA Certified
                </div>
                <div className="flex items-center text-sm text-gray-600 bg-white rounded-lg p-3 border">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  ISO 27001 Compliant
                </div>
                <div className="flex items-center text-sm text-gray-600 bg-white rounded-lg p-3 border">
                  <Shield className="w-4 h-4 mr-2 text-purple-600" />
                  GDPR Compliant
                </div>
                <div className="flex items-center text-sm text-gray-600 bg-white rounded-lg p-3 border">
                  <Globe className="w-4 h-4 mr-2 text-blue-600" />
                  24/7 Available
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h4>
              <ul className="space-y-3 text-gray-600">
                <li><Link to="/about" className="hover:text-gray-900 transition-colors">About Us</Link></li>
                <li><Link to="/services" className="hover:text-gray-900 transition-colors">Our Services</Link></li>
                <li><Link to="/doctors" className="hover:text-gray-900 transition-colors">Find a Doctor</Link></li>
                <li><Link to="/appointments" className="hover:text-gray-900 transition-colors">Book Appointment</Link></li>
                <li><Link to="/contact" className="hover:text-gray-900 transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Support</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-3" />
                  <span>+234 800 MEDDY PAL</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-3" />
                  <span>support@meddypal.ng</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3" />
                  <span>Lagos, Nigeria</span>
                </li>
                <li className="flex items-center">
                  <Clock className="w-4 h-4 mr-3" />
                  <span>24/7 Emergency Care</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              © 2024 MeddyPal. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-gray-700 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-gray-700 transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-gray-700 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FramerTemplate;