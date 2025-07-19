import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Shield, Clock, Users, ChevronDown, Play, Star, Check, Baby, Stethoscope, Phone, Calendar } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ease-apple ${
        isScrolled ? 'backdrop-glass border-b border-border/50' : 'bg-transparent'
      }`}>
        <div className="content-width section-padding">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">MeddyPal</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="nav-link">Features</a>
              <a href="#services" className="nav-link">Services</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <Button onClick={() => navigate('/dashboard')} className="apple-button">
                  Dashboard
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => navigate('/auth')} className="press-effect">
                    Sign In
                  </Button>
                  <Button onClick={handleGetStarted} className="apple-button">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative section-margin mt-16">
        <div className="content-width section-padding">
          <div className="text-center max-w-4xl mx-auto">
            {/* Hero Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-8 animate-fade-in">
              <span className="text-base">🇳🇬</span>
              <span>Trusted Maternal Health Companion in Nigeria</span>
            </div>

            {/* Hero Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6 animate-fade-in delay-100">
              Empowering
              <span className="gradient-text block">Nigerian Mothers</span>
            </h1>

            {/* Hero Subtitle */}
            <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto animate-fade-in delay-200">
              Your comprehensive maternal and child health platform. From pregnancy to pediatric care, 
              we support Nigerian families with quality healthcare services and expert guidance.
            </p>

            {/* Hero CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in delay-300">
              <Button size="lg" onClick={handleGetStarted} className="apple-button text-lg px-8 py-4">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="ghost" className="press-effect text-lg px-8 py-4 group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in delay-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-primary border-2 border-background flex items-center justify-center text-white text-xs font-medium">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span>Trusted by 50,000+ Nigerian mothers</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span>4.8/5 rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-soft">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-margin bg-gradient-subtle">
        <div className="content-width section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Comprehensive <span className="gradient-text">Maternal Care</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Everything you need for a healthy pregnancy and beyond, designed specifically for Nigerian mothers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Baby,
                title: "Pregnancy Tracking",
                description: "Track your pregnancy journey with personalized insights, appointments, and milestone reminders.",
                color: "text-health-info"
              },
              {
                icon: Stethoscope,
                title: "Expert Consultations",
                description: "Connect with qualified Nigerian healthcare professionals for virtual and in-person consultations.",
                color: "text-health-success"
              },
              {
                icon: Shield,
                title: "Insurance Support",
                description: "Navigate Nigerian health insurance options and find coverage that works for your family.",
                color: "text-health-warning"
              },
              {
                icon: Heart,
                title: "Child Health Records",
                description: "Maintain digital health records for your children with vaccination tracking and growth monitoring.",
                color: "text-primary"
              },
              {
                icon: Calendar,
                title: "Appointment Booking",
                description: "Book appointments with top hospitals and clinics across Nigeria with ease.",
                color: "text-health-info"
              },
              {
                icon: Phone,
                title: "24/7 Support",
                description: "Access emergency support and health advice whenever you need it, day or night.",
                color: "text-health-success"
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className={`glass-card p-8 hover-lift animate-fade-in-up delay-${i * 100 + 100}`}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-6 ${feature.color}`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-balance">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-margin">
        <div className="content-width section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Comprehensive healthcare services tailored for Nigerian families.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  title: "Maternal Health Support",
                  description: "Comprehensive pregnancy care, prenatal support, and postnatal guidance from qualified professionals."
                },
                {
                  title: "Pediatric Care",
                  description: "Complete child health services including vaccinations, growth monitoring, and development tracking."
                },
                {
                  title: "Telemedicine",
                  description: "Virtual consultations with certified doctors, making quality healthcare accessible anywhere in Nigeria."
                },
                {
                  title: "Health Insurance",
                  description: "Expert guidance on Nigerian health insurance options to ensure your family is protected."
                }
              ].map((service, i) => (
                <div key={i} className={`flex gap-4 animate-fade-in-left delay-${i * 200 + 200}`}>
                  <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-balance">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative animate-fade-in-right delay-400">
              <div className="glass-card p-8 text-center">
                <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Made for Nigeria</h3>
                <p className="text-muted-foreground mb-6">
                  Built specifically for Nigerian healthcare needs, with local partnerships and culturally sensitive care.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium">
                  <span className="text-base">🇳🇬</span>
                  <span>Proudly Nigerian</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-margin bg-gradient-subtle">
        <div className="content-width section-padding text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            About <span className="gradient-text">MeddyPal</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8">
            MeddyPal is Nigeria's leading maternal and child health platform, connecting families with quality 
            healthcare services. We're committed to reducing maternal mortality and improving health outcomes 
            for Nigerian mothers and children.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { number: "50,000+", label: "Mothers Served" },
              { number: "500+", label: "Healthcare Partners" },
              { number: "36", label: "States Covered" }
            ].map((stat, i) => (
              <div key={i} className="glass-card p-6">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="section-margin bg-gradient-primary text-white">
        <div className="content-width section-padding text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl opacity-90 text-balance max-w-2xl mx-auto mb-8">
            Join thousands of Nigerian mothers who trust MeddyPal for their family's health needs.
          </p>
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            className="bg-white text-primary hover:bg-gray-50 text-lg px-8 py-4 hover-glow"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-margin bg-muted">
        <div className="content-width section-padding">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">MeddyPal</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Empowering Nigerian mothers with quality healthcare access and support.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="text-base">🇳🇬</span>
              <span>Made with ❤️ in Nigeria • MeddyPal © 2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;