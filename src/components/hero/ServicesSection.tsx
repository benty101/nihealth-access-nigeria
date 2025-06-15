
import React from 'react';
import { Button } from '@/components/ui/button';
import { Baby, UserCheck, Shield, Calendar, Pill, FileText } from 'lucide-react';

interface ServicesSectionProps {
  onServiceNavigation: (path: string) => void;
}

const ServicesSection = ({ onServiceNavigation }: ServicesSectionProps) => {
  const services = [
    {
      icon: Baby,
      title: 'Maternal Care',
      description: 'Comprehensive antenatal care, delivery services, postnatal support, and maternal health monitoring.',
      path: '/hospitals',
      buttonText: 'Find Maternal Care',
      colorClass: 'teal'
    },
    {
      icon: UserCheck,
      title: 'Child Health & Vaccinations',
      description: 'Pediatric care, immunization schedules, growth monitoring, and child development tracking.',
      path: '/pediatric',
      buttonText: 'Book Vaccination',
      colorClass: 'emerald'
    },
    {
      icon: Shield,
      title: 'Maternal & Family Insurance',
      description: 'Specialized insurance plans covering pregnancy, childbirth, child health, and family wellness.',
      path: '/insurance',
      buttonText: 'Compare Plans',
      colorClass: 'teal'
    },
    {
      icon: Calendar,
      title: 'Specialist Appointments',
      description: 'Book with obstetricians, pediatricians, lactation consultants, and child development specialists.',
      path: '/appointments',
      buttonText: 'Book Now',
      colorClass: 'emerald'
    },
    {
      icon: Pill,
      title: 'Maternal & Child Pharmacy',
      description: 'Prenatal vitamins, children\'s medications, baby formula, and health supplements with delivery.',
      path: '/pharmacy',
      buttonText: 'Shop Now',
      colorClass: 'teal'
    },
    {
      icon: FileText,
      title: 'Family Health Records',
      description: 'Secure storage for pregnancy records, child immunization cards, growth charts, and family medical history.',
      path: '/records',
      buttonText: 'Manage Records',
      colorClass: 'emerald'
    }
  ];

  return (
    <div id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            Specialized Maternal & Child Healthcare Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in animation-delay-200">
            Everything mothers and children need for comprehensive healthcare management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.title}
                className={`group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-${service.colorClass}-200 transition-all duration-500 hover:-translate-y-3 transform animate-fade-in animation-delay-${300 + index * 100}`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br from-${service.colorClass}-100 to-${service.colorClass}-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`h-8 w-8 text-${service.colorClass}-600`} />
                </div>
                <h3 className={`text-xl font-bold mb-4 text-center group-hover:text-${service.colorClass}-600 transition-colors duration-300`}>
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="text-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onServiceNavigation(service.path)}
                    className={`text-${service.colorClass}-600 border-${service.colorClass}-600 hover:bg-${service.colorClass}-50 hover:scale-105 transition-all duration-300`}
                  >
                    {service.buttonText}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
