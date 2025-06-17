
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Shield, MapPin, Heart, TestTube, Pill, Baby, Syringe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const quickLinks = [
  {
    label: 'Family Health Records',
    description: 'Manage family health records',
    icon: Heart,
    color: 'bg-red-500',
    path: '/records',
  },
  {
    label: 'Mother & Child Care',
    description: 'Prenatal & pediatric services',
    icon: Baby,
    color: 'bg-pink-500',
    path: '/pediatric',
  },
  {
    label: 'Vaccination Schedule',
    description: 'Track immunizations',
    icon: Syringe,
    color: 'bg-blue-500',
    path: '/pediatric',
  },
  {
    label: 'Buy Medicine',
    description: 'Order from pharmacy',
    icon: Pill,
    color: 'bg-green-500',
    path: '/pharmacy',
  },
  {
    label: 'Book Lab Test',
    description: 'Schedule diagnostic tests',
    icon: TestTube,
    color: 'bg-orange-500',
    path: '/labs',
  },
  {
    label: 'Find Hospitals',
    description: 'Locate nearby facilities',
    icon: MapPin,
    color: 'bg-purple-500',
    path: '/hospitals',
  },
  {
    label: 'Health Resources',
    description: 'Educational content & tips',
    icon: FileText,
    color: 'bg-teal-500',
    path: '/resources',
  },
  {
    label: 'Emergency Services',
    description: 'Urgent medical assistance',
    icon: Shield,
    color: 'bg-red-600',
    path: '/emergency',
  },
];

const QuickLinks = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleQuickLinkClick = (label: string, path: string) => {
    console.log(`[QuickLinks] User clicked '${label}': Navigating to ${path}`);

    try {
      navigate(path);
      console.log(`[QuickLinks] Successfully navigated to ${path}`);
      
      toast({
        title: "Navigation Success",
        description: `Navigated to ${label}`,
      });
    } catch (error) {
      console.error(`[QuickLinks] Navigation to ${path} failed`, error);
      toast({
        title: "Navigation Error",
        description: `Could not navigate to "${label}".`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map(({ icon: Icon, label, description, color, path }) => (
          <button
            key={label}
            aria-label={label}
            className="w-full rounded-lg border bg-white shadow-sm p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-md hover:border-teal-300 transition-all duration-200 hover:-translate-y-1"
            onClick={() => handleQuickLinkClick(label, path)}
            type="button"
          >
            <span className={`flex items-center justify-center rounded-full ${color} bg-opacity-20 h-12 w-12 mb-3`}>
              <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
            </span>
            <span className="font-medium text-sm text-gray-900 mb-1">{label}</span>
            <span className="text-xs text-gray-500">{description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
