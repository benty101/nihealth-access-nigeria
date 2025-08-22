import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/enhanced/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/enhanced/Card';
import { 
  Heart, 
  Shield, 
  Brain, 
  Users, 
  Smartphone,
  Clock,
  Star,
  Check,
  ArrowRight,
  Play,
  Sparkles,
  Activity,
  Calendar,
  Video,
  Bot,
  ChevronRight,
  Globe,
  Award,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: string;
  color: string;
}

const ModernLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const features: Feature[] = [
    {
      id: 'ai-powered',
      title: 'AI-Powered Health Intelligence',
      description: 'Advanced AI analyzes your health data to provide personalized insights and recommendations.',
      icon: Brain,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'comprehensive-care',
      title: 'Comprehensive Healthcare',
      description: 'Access to hospitals, labs, pharmacies, and telemedicine services all in one platform.',
      icon: Heart,
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      id: 'secure-records',
      title: 'Secure Health Records',
      description: 'Your medical data is encrypted and secure, with you maintaining complete control.',
      icon: Shield,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'family-care',
      title: 'Family Health Management',
      description: 'Manage health records for your entire family from a single, intuitive dashboard.',
      icon: Users,
      gradient: 'from-green-500 to-green-600'
    }
  ];

  const services: Service[] = [
    {
      id: 'ai-assistant',
      title: 'AI Health Assistant',
      description: 'Get instant health advice and symptom checking',
      icon: Bot,
      path: '/ai-assistant',
      badge: 'Smart',
      color: 'purple'
    },
    {
      id: 'appointments',
      title: 'Book Appointments',
      description: 'Schedule with top healthcare providers',
      icon: Calendar,
      path: '/appointments',
      badge: 'Popular',
      color: 'blue'
    },
    {
      id: 'telemedicine',
      title: 'Video Consultations',
      description: 'Connect with doctors online 24/7',
      icon: Video,
      path: '/telemedicine',
      badge: '24/7',
      color: 'green'
    },
    {
      id: 'health-tracking',
      title: 'Health Monitoring',
      description: 'Track vitals and health metrics',
      icon: Activity,
      path: '/dashboard',
      color: 'red'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Working Mother',
      content: 'MeddyPal has revolutionized how I manage my family\'s health. The AI insights are incredibly accurate and helpful.',
      rating: 5
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      role: 'Healthcare Provider',
      content: 'As a doctor, I appreciate how MeddyPal empowers patients with reliable health information and easy access to care.',
      rating: 5
    },
    {
      id: '3',
      name: 'Ahmed Okafor',
      role: 'Senior Citizen',
      content: 'The platform is so easy to use. I can book appointments, refill prescriptions, and track my health all in one place.',
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleLearnMore = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200/50">
        <div className="container-wide">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary-600">MeddyPal</h1>
                <p className="text-xs text-neutral-600">Your Health Companion</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-neutral-600 hover:text-primary-600 transition-colors">Features</a>
              <a href="#services" className="text-neutral-600 hover:text-primary-600 transition-colors">Services</a>
              <a href="#testimonials" className="text-neutral-600 hover:text-primary-600 transition-colors">Reviews</a>
              <Button variant="outline" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-purple-50/30 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5"></div>
        <div className="container-wide relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  <Sparkles className="h-4 w-4" />
                  AI-Powered Healthcare Platform
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                  Your Complete
                  <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent block">
                    Health Companion
                  </span>
                </h1>
                <p className="text-xl text-neutral-600 leading-relaxed max-w-lg">
                  Revolutionizing healthcare with AI-powered insights, comprehensive services, 
                  and seamless digital health management for you and your family.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={handleGetStarted}
                  leftIcon={<Heart className="h-5 w-5" />}
                  className="shadow-lg"
                >
                  Get Started Free
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleLearnMore}
                  leftIcon={<Play className="h-5 w-5" />}
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-neutral-900">50K+</p>
                  <p className="text-sm text-neutral-600">Active Users</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-neutral-900">1000+</p>
                  <p className="text-sm text-neutral-600">Healthcare Providers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-neutral-900">4.9★</p>
                  <p className="text-sm text-neutral-600">User Rating</p>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                <Card variant="glass" className="relative p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                        <Activity className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Health Dashboard</h3>
                        <p className="text-sm text-neutral-600">Real-time monitoring</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-xs text-green-600 font-medium">Heart Rate</p>
                        <p className="text-lg font-bold text-green-800">72 BPM</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs text-blue-600 font-medium">Blood Pressure</p>
                        <p className="text-lg font-bold text-blue-800">120/80</p>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-purple-600" />
                        <p className="text-xs text-purple-600 font-medium">AI Insight</p>
                      </div>
                      <p className="text-sm text-neutral-700">Your health metrics look great! Consider increasing daily water intake.</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-neutral-50">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Powerful Features for Better Health
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Experience the future of healthcare with our comprehensive platform designed 
              to keep you and your family healthy and informed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card
                key={feature.id}
                variant="interactive"
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br',
                      feature.gradient
                    )}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                      <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Complete Healthcare Services
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              From AI-powered diagnostics to telemedicine consultations, 
              we provide everything you need for comprehensive healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={service.id}
                variant="interactive"
                className="animate-fade-in text-center group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(service.path)}
              >
                <CardContent className="pt-6">
                  <div className={cn(
                    'w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-lg mb-4 bg-gradient-to-br transition-transform group-hover:scale-110',
                    service.color === 'purple' && 'from-purple-500 to-purple-600',
                    service.color === 'blue' && 'from-blue-500 to-blue-600',
                    service.color === 'green' && 'from-green-500 to-green-600',
                    service.color === 'red' && 'from-red-500 to-red-600'
                  )}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="font-semibold text-neutral-900">{service.title}</h3>
                      {service.badge && (
                        <span className="px-2 py-0.5 text-xs bg-primary-100 text-primary-700 rounded-full">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600">{service.description}</p>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-center text-primary-600 group-hover:text-primary-700">
                    <span className="text-sm font-medium">Learn More</span>
                    <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-primary-50 to-purple-50/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-neutral-600">
              See what our users are saying about their MeddyPal experience
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card variant="glass" className="p-8 shadow-2xl">
              <div className="text-center space-y-6">
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <blockquote className="text-xl text-neutral-700 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div>
                  <p className="font-semibold text-neutral-900">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-neutral-600">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={cn(
                    'w-3 h-3 rounded-full transition-colors',
                    index === currentTestimonial ? 'bg-primary-500' : 'bg-neutral-300'
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600">
        <div className="container-wide text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-primary-100">
              Join thousands of users who have already improved their health with MeddyPal. 
              Start your journey to better healthcare today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                variant="secondary"
                onClick={handleGetStarted}
                leftIcon={<Heart className="h-5 w-5" />}
                className="shadow-lg"
              >
                Start Free Today
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-600"
                leftIcon={<Smartphone className="h-5 w-5" />}
              >
                Download App
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-neutral-900 text-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">MeddyPal</h3>
              </div>
              <p className="text-neutral-400">
                Your trusted companion for comprehensive healthcare management and AI-powered health insights.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">AI Health Assistant</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Telemedicine</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Appointments</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Health Records</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
            <p>&copy; 2024 MeddyPal. All rights reserved. Built with ❤️ for better healthcare.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernLandingPage;