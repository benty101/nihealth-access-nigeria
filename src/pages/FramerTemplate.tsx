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
  Globe
} from 'lucide-react';

const FramerTemplate = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribe:', email);
  };

  const healthInsights = [
    {
      id: '01',
      title: 'AI-Powered Genomic Analysis',
      description: 'Revolutionary precision medicine through genetic profiling and personalized treatment recommendations powered by advanced AI algorithms.',
      date: 'Dec 20, 2024',
      category: 'Genomics',
      readTime: '8 min read',
      featured: false,
      icon: Microscope,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: '02', 
      title: 'Preventive Care Revolution',
      description: 'How early detection and personalized health monitoring are transforming healthcare outcomes across Nigeria.',
      date: 'Dec 18, 2024',
      category: 'Prevention',
      readTime: '6 min read',
      featured: false,
      icon: Shield,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: '03',
      title: 'Telemedicine Excellence',
      description: 'Bridging healthcare gaps with world-class virtual consultations and remote patient monitoring systems.',
      date: 'Dec 15, 2024',
      category: 'Digital Health',
      readTime: '5 min read',
      featured: false,
      icon: Stethoscope,
      color: 'from-teal-500 to-cyan-600'
    },
    {
      id: '04',
      title: 'Mental Health Integration',
      description: 'Comprehensive mental wellness support integrated with physical health tracking for holistic patient care.',
      date: 'Dec 12, 2024',
      category: 'Mental Health',
      readTime: '7 min read',
      featured: false,
      icon: Brain,
      color: 'from-violet-500 to-purple-600'
    },
    {
      id: '05',
      title: 'Community Health Impact',
      description: 'Building healthier communities through data-driven insights and collaborative healthcare initiatives.',
      date: 'Dec 10, 2024',
      category: 'Public Health',
      readTime: '6 min read',
      featured: false,
      icon: Users,
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'FEATURED',
      title: 'The Future of Nigerian Healthcare',
      description: 'How MeddyPal is revolutionizing healthcare delivery through AI, genomics, and comprehensive digital health solutions.',
      date: 'Dec 22, 2024',
      category: 'Innovation',
      readTime: '12 min read',
      featured: true,
      icon: Heart,
      color: 'from-rose-500 to-pink-600'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Active Patients', icon: Users },
    { number: '1,200+', label: 'Healthcare Providers', icon: Stethoscope },
    { number: '98.5%', label: 'Patient Satisfaction', icon: Star },
    { number: '24/7', label: 'Emergency Support', icon: Clock }
  ];

  const services = [
    {
      title: 'AI Health Assistant',
      description: 'Personalized health insights powered by advanced artificial intelligence',
      icon: Brain,
      link: '/ai-chat'
    },
    {
      title: 'Genomic Analysis',
      description: 'Comprehensive genetic testing and personalized medicine recommendations',
      icon: Microscope,
      link: '/insights'
    },
    {
      title: 'Telemedicine',
      description: 'Connect with certified healthcare professionals from anywhere',
      icon: Stethoscope,
      link: '/telemedicine'
    },
    {
      title: 'Health Insurance',
      description: 'Comprehensive coverage options tailored to your needs',
      icon: Shield,
      link: '/insurance'
    },
    {
      title: 'Lab Testing',
      description: 'Advanced diagnostic services with rapid result delivery',
      icon: Activity,
      link: '/labs'
    },
    {
      title: 'Emergency Care',
      description: '24/7 emergency response and critical care coordination',
      icon: Heart,
      link: '/emergency'
    }
  ];

  const featuredEntry = healthInsights.find(entry => entry.featured);
  const regularEntries = healthInsights.filter(entry => !entry.featured);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f6f7f2' }}>
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white/60 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">MeddyPal</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/insights" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Health Insights
          </Link>
          <Link to="/telemedicine" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Services
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            About
          </Link>
          <Link to="/emergency" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Emergency
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-700" asChild>
            <Link to="/auth">Sign In</Link>
          </Button>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full shadow-lg"
            asChild
          >
            <Link to="/dashboard">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center space-y-8">
          <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-4 py-2 text-sm font-medium">
            🇳🇬 Powered by NABDA Partnership
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-light leading-tight text-gray-900 tracking-tight">
            Healthcare by day
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
              and wellness by night.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your comprehensive digital health companion, powered by AI and genomics. 
            Revolutionizing healthcare delivery across Nigeria with personalized medicine, 
            preventive care, and world-class medical services.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/80 rounded-xl mb-3">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-md mx-auto mt-16 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Informed</h3>
                <p className="text-sm text-gray-600">Get the latest health insights and platform updates</p>
              </div>
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-full border-gray-200 bg-white focus:border-blue-500"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 rounded-full"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white/40 backdrop-blur-sm border-y border-white/20 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI-powered diagnostics to genomic analysis, we provide end-to-end healthcare services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="overflow-hidden bg-white/60 backdrop-blur-sm border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0" asChild>
                    <Link to={service.link}>
                      Learn more <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Featured Section */}
        {featuredEntry && (
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Featured Insight</span>
              <Badge className="bg-gradient-to-r from-rose-500 to-pink-600 text-white">
                ✨ Latest
              </Badge>
            </div>
            
            <Card className="overflow-hidden bg-white/60 backdrop-blur-sm border-white/20 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 h-64 lg:h-auto bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                    <featuredEntry.icon className="w-16 h-16 text-white" />
                  </div>
                  <div className="lg:w-2/3 p-8 lg:p-12">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="outline" className="bg-rose-50 text-rose-600 border-rose-200">
                        {featuredEntry.category}
                      </Badge>
                      <span className="text-sm text-gray-500">{featuredEntry.readTime}</span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                      {featuredEntry.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {featuredEntry.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{featuredEntry.date}</span>
                      <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white">
                        Read Full Article <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Health Insights Grid */}
        <div>
          <div className="flex items-center gap-3 mb-12">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Health Insights</span>
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
              {regularEntries.length} Articles
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularEntries.map((entry) => (
              <Card 
                key={entry.id}
                className="overflow-hidden bg-white/60 backdrop-blur-sm border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <CardContent className="p-0">
                  <div className={`h-48 bg-gradient-to-br ${entry.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <entry.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {entry.category}
                      </Badge>
                      <span className="text-xs text-gray-500">{entry.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {entry.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{entry.date}</span>
                      <span className="text-sm text-blue-600 group-hover:text-blue-700 transition-colors font-medium">
                        Read more →
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full shadow-lg"
              asChild
            >
              <Link to="/insights">
                Explore All Health Insights <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Health Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Nigerians who have already revolutionized their healthcare experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-full font-semibold"
              asChild
            >
              <Link to="/dashboard">Start Your Journey</Link>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold"
              asChild
            >
              <Link to="/telemedicine">Book Consultation</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-white/20 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">MeddyPal</span>
              </div>
              <p className="text-gray-600 mb-6 max-w-md">
                Revolutionizing healthcare in Nigeria through AI-powered solutions, 
                genomic analysis, and comprehensive digital health services.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Award className="w-4 h-4 mr-2" />
                  NABDA Certified
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  ISO 27001 Compliant
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Services</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/telemedicine" className="hover:text-blue-600 transition-colors">Telemedicine</Link></li>
                <li><Link to="/labs" className="hover:text-blue-600 transition-colors">Lab Testing</Link></li>
                <li><Link to="/pharmacy" className="hover:text-blue-600 transition-colors">Pharmacy</Link></li>
                <li><Link to="/insurance" className="hover:text-blue-600 transition-colors">Health Insurance</Link></li>
                <li><Link to="/emergency" className="hover:text-blue-600 transition-colors">Emergency Care</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +234 800 MEDDY PAL
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  hello@meddypal.ng
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Lagos, Nigeria
                </li>
                <li className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  24/7 Support Available
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-500">
            <p>© 2024 MeddyPal. All rights reserved. Powered by advanced AI and genomics technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FramerTemplate;