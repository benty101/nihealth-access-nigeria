
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroHeader from './hero/HeroHeader';
import ServicesSection from './hero/ServicesSection';
import CallToAction from './hero/CallToAction';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    console.log('Get Started clicked');
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    
    if (onboardingCompleted) {
      navigate('/dashboard');
    } else {
      navigate('/onboarding');
    }
  };

  const handleExploreServices = () => {
    console.log('Explore Services clicked');
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  return (
    <div className="relative overflow-hidden">
      <HeroHeader 
        onGetStarted={handleGetStarted}
        onExploreServices={handleExploreServices}
      />
      <ServicesSection 
        onServiceNavigation={handleServiceNavigation}
      />
      <CallToAction 
        onGetStarted={handleGetStarted}
      />
    </div>
  );
};

export default Hero;
