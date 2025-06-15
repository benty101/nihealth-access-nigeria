
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Shield, MapPin, Heart, Video, AlertTriangle, TestTube, Pill, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const quickLinks = [
  {
    label: 'Family Health',
    description: 'Manage family records',
    icon: Heart,
    color: 'bg-red-500',
    path: '/records',
  },
  {
    label: 'Pediatric Care',
    description: 'Child health services',
    icon: Shield,
    color: 'bg-violet-500',
    path: '/resources',
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
    path: '/diagnostics',
  },
  {
    label: 'Find Hospital',
    description: 'Nearby facilities',
    icon: MapPin,
    color: 'bg-blue-500',
    path: '/hospitals',
  },
];

const QuickLinks = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleQuickLinkClick = (label: string, path: string) => {
    console.log(`[QuickLinks] User clicked '${label}': Navigating to ${path}`);

    // Try navigating, and if there is an error, show toast feedback
    try {
      navigate(path);
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
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {quickLinks.map(({ icon: Icon, label, description, color, path }) => (
        <button
          key={label}
          aria-label={label}
          className="w-full rounded-xl border bg-white shadow-sm p-4 flex items-center cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleQuickLinkClick(label, path)}
          type="button"
        >
          <span className={`flex items-center justify-center rounded-lg ${color} bg-opacity-20 h-12 w-12 mr-4`}>
            <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
          </span>
          <span className="flex flex-col items-start text-left">
            <span className="font-semibold text-base text-gray-900">{label}</span>
            <span className="text-sm text-gray-500">{description}</span>
          </span>
        </button>
      ))}
    </div>
  );
};

export default QuickLinks;

