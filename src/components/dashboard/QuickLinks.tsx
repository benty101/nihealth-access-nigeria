
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
    label: 'Pediatric Care',
    description: 'Child health services',
    icon: Baby,
    color: 'bg-blue-500',
    path: '/pediatric',
  },
  {
    label: 'Order Medicine',
    description: 'Pharmacy delivery',
    icon: Pill,
    color: 'bg-green-500',
    path: '/pharmacy',
  },
  {
    label: 'Book Lab Test',
    description: 'Diagnostic services',
    icon: TestTube,
    color: 'bg-orange-500',
    path: '/labs',
  },
  {
    label: 'Find Hospitals',
    description: 'Nearby facilities',
    icon: MapPin,
    color: 'bg-purple-500',
    path: '/hospitals',
  },
];

const QuickLinks = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleQuickLinkClick = (label: string, path: string) => {
    console.log(`[QuickLinks] Clicking ${label}, navigating to: ${path}`);
    
    // Direct navigation without try-catch to avoid suppressing errors
    navigate(path);
    
    toast({
      title: "Navigating",
      description: `Opening ${label}`,
      duration: 2000,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {quickLinks.map(({ icon: Icon, label, description, color, path }) => (
          <button
            key={label}
            className="w-full rounded-lg border bg-white shadow-sm p-4 flex items-center text-left cursor-pointer hover:shadow-md hover:border-teal-300 transition-all duration-200 hover:-translate-y-1"
            onClick={() => handleQuickLinkClick(label, path)}
            type="button"
          >
            <span className={`flex items-center justify-center rounded-lg ${color} bg-opacity-20 h-12 w-12 mr-4 flex-shrink-0`}>
              <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
            </span>
            <div className="flex-1">
              <span className="font-medium text-sm text-gray-900 block">{label}</span>
              <span className="text-xs text-gray-500">{description}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
