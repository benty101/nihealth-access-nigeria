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

  const services = [
    {
      title: 'Pediatrics',
      description: 'Monitor your child\'s growth and development to ensure their health at every stage.',
      icon: Baby,
      color: 'from-pink-400 to-rose-500'
    },
    {
      title: 'Orthopedics',
      description: 'We assess musculoskeletal health and provide comprehensive bone and joint care.',
      icon: Bone,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      title: 'Ophthalmology',
      description: 'Comprehensive eye care services from routine check-ups to advanced surgical procedures.',
      icon: Eye,
      color: 'from-green-400 to-emerald-500'
    },
    {
      title: 'Cardiology',
      description: 'Advanced heart care with state-of-the-art diagnostic and treatment capabilities.',
      icon: Heart,
      color: 'from-red-400 to-pink-500'
    },
    {
      title: 'Neurology',
      description: 'Specialized care for neurological conditions with cutting-edge treatment options.',
      icon: Brain,
      color: 'from-purple-400 to-violet-500'
    },
    {
      title: 'General Medicine',
      description: 'Comprehensive primary care services for all your general health needs.',
      icon: Stethoscope,
      color: 'from-teal-400 to-cyan-500'
    }
  ];

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
      <nav className="flex items-center justify-between px-6 lg:px-20 py-6 bg-white">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-900">MeddyPal</span>
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

        <Button 
          className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full"
          asChild
        >
          <Link to="/dashboard">Get Started</Link>
        </Button>
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
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-light leading-tight text-gray-900">
                  A modern{' '}
                  <span className="inline-flex items-center bg-blue-100 px-4 py-2 rounded-full">
                    <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
                    <span className="text-blue-600 font-medium">safe</span>
                  </span>{' '}
                  and
                </h1>
                <h1 className="text-5xl lg:text-7xl font-light leading-tight text-gray-900">
                  effective
                </h1>
                <h1 className="text-5xl lg:text-7xl font-light leading-tight text-gray-900">
                  approach to{' '}
                  <span className="inline-flex items-center bg-orange-100 px-4 py-2 rounded-full">
                    <Heart className="w-6 h-6 text-orange-600 mr-2" />
                    <span className="text-orange-600 font-medium">well being</span>
                  </span>
                </h1>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full"
                  asChild
                >
                  <Link to="/appointments">Book Now</Link>
                </Button>
                <Button 
                  size="lg"
                  variant="ghost"
                  className="text-gray-700 hover:text-gray-900 px-8 py-4"
                  asChild
                >
                  <Link to="/about">Learn more</Link>
                </Button>
              </div>
            </div>

            {/* Hero Image & Doctor Cards */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 lg:p-12">
                <img 
                  src="/placeholder.svg" 
                  alt="Doctor with stethoscope"
                  className="w-full h-96 object-cover rounded-2xl"
                />
                
                {/* Available Doctors Card */}
                <div className="absolute top-8 right-8 bg-white rounded-2xl p-4 shadow-lg max-w-xs">
                  <h3 className="font-semibold text-gray-900 mb-3">Available Doctors</h3>
                  <div className="space-y-3">
                    {doctors.map((doctor, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <img 
                          src={doctor.image} 
                          alt={doctor.name}
                          className="w-10 h-10 rounded-full bg-gray-200"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doctor.name}</p>
                          <p className="text-xs text-gray-500">{doctor.specialty}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Search Bar */}
                  <form onSubmit={handleDoctorSearch} className="mt-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search for a Doctor"
                        value={doctorSearch}
                        onChange={(e) => setDoctorSearch(e.target.value)}
                        className="pl-10 bg-gray-50 border-0 rounded-lg"
                      />
                    </div>
                  </form>
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
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Different types of department we have for your healthcare
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 bg-white"
              >
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
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
      <div className="px-6 lg:px-20 py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-light mb-6">
            Ready to Experience Better Healthcare?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of patients who trust MeddyPal with their health and wellness journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold"
              asChild
            >
              <Link to="/appointments">Book Appointment</Link>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold"
              asChild
            >
              <Link to="/telemedicine">Start Consultation</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">MeddyPal</span>
              </div>
              <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
                Your trusted healthcare partner, providing comprehensive medical services 
                with advanced technology and compassionate care across Nigeria.
              </p>
              <div className="flex items-center space-x-6">
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