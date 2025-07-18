
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Shield, Clock, Users, ChevronDown, Play, Star, Check } from 'lucide-react';

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
              <a href="#how-it-works" className="nav-link">How it Works</a>
              <a href="#testimonials" className="nav-link">Stories</a>
              <a href="#pricing" className="nav-link">Pricing</a>
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
              <Star className="w-4 h-4" />
              <span>Your Complete Health Timeline - Finally</span>
            </div>

            {/* Hero Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6 animate-fade-in delay-100">
              Remember Every
              <span className="gradient-text block">Health Moment</span>
            </h1>

            {/* Hero Subtitle */}
            <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto animate-fade-in delay-200">
              Like a social timeline for your health. Never forget a symptom, appointment, or treatment again. 
              AI-powered insights connect the dots others miss.
            </p>

            {/* Hero CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in delay-300">
              <Button size="lg" onClick={handleGetStarted} className="apple-button text-lg px-8 py-4">
                Start Your Health Timeline
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
                <span>Trusted by 10,000+ users</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span>4.9/5 rating</span>
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
              Your Health, <span className="gradient-text">Reimagined</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Every interaction becomes part of your health story. AI connects patterns you never noticed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Health Timeline",
                description: "Every appointment, symptom, and treatment recorded chronologically. Never lose track of your health journey.",
                color: "text-health-info"
              },
              {
                icon: Shield,
                title: "AI Pattern Recognition",
                description: "Advanced AI spots connections between your past and present health events, providing insights doctors miss.",
                color: "text-health-success"
              },
              {
                icon: Users,
                title: "Genomics Integration",
                description: "Connect your DNA data with your health timeline for truly personalized healthcare insights.",
                color: "text-health-warning"
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

      {/* How It Works */}
      <section id="how-it-works" className="section-margin">
        <div className="content-width section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Three Steps to <span className="gradient-text">Better Health</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Getting started is as simple as posting on social media.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Record Everything",
                description: "Add symptoms, appointments, medications - everything gets timestamped in your personal health timeline."
              },
              {
                step: "02",
                title: "AI Analyzes Patterns",
                description: "Our advanced AI reviews your timeline, connecting dots between past and present health events."
              },
              {
                step: "03",
                title: "Get Insights",
                description: "Receive personalized health insights and recommendations based on your unique health journey."
              }
            ].map((step, i) => (
              <div key={i} className={`text-center animate-fade-in-up delay-${i * 200 + 200}`}>
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-balance">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-margin bg-gradient-primary text-white">
        <div className="content-width section-padding text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl opacity-90 text-balance max-w-2xl mx-auto mb-8">
            Join thousands who've already started their health journey with MeddyPal.
          </p>
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            className="bg-white text-primary hover:bg-gray-50 text-lg px-8 py-4 hover-glow"
          >
            Get Started Free
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
            <p className="text-muted-foreground">
              Your health timeline, powered by AI. Built in Nigeria, for the world.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
