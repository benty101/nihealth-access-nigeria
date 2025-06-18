
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, MapPin, Heart, TestTube, Pill, Baby, Video, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BookAppointmentModal from './BookAppointmentModal';

const enhancedQuickLinks = [
  {
    label: 'Book Appointment',
    description: 'Schedule with doctors',
    icon: Calendar,
    color: 'bg-teal-500',
    action: 'book_appointment',
  },
  {
    label: 'Health Records',
    description: 'View medical history',
    icon: FileText,
    color: 'bg-blue-500',
    path: '/records',
  },
  {
    label: 'Telemedicine',
    description: 'Online consultations',
    icon: Video,
    color: 'bg-purple-500',
    path: '/telemedicine',
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
    color: 'bg-red-500',
    path: '/hospitals',
  }
];

const EnhancedQuickLinks = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleQuickLinkClick = (label: string, path?: string, action?: string) => {
    console.log(`[EnhancedQuickLinks] Clicking ${label}`);
    
    if (action === 'book_appointment') {
      setIsBookingModalOpen(true);
      return;
    }

    if (path) {
      navigate(path);
      toast({
        title: "Navigating",
        description: `Opening ${label}`,
        duration: 2000,
      });
    }
  };

  const handleBookingSuccess = () => {
    toast({
      title: "Success",
      description: "Appointment booked successfully!",
    });
    // You could refresh appointments data here if needed
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {enhancedQuickLinks.map(({ icon: Icon, label, description, color, path, action }) => (
            <button
              key={label}
              className="w-full rounded-lg border bg-white shadow-sm p-4 flex items-center text-left cursor-pointer hover:shadow-md hover:border-teal-300 transition-all duration-200 hover:-translate-y-1"
              onClick={() => handleQuickLinkClick(label, path, action)}
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

      <BookAppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onSuccess={handleBookingSuccess}
      />
    </>
  );
};

export default EnhancedQuickLinks;
