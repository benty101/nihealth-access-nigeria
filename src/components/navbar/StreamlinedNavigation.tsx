
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Building2, 
  TrendingUp, 
  Calendar, 
  FileText, 
  MapPin,
  Heart,
  ChevronDown,
  Users,
  Settings,
  TestTube,
  Pill,
  Baby,
  Video
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const useStreamlinedNavigation = () => {
  const { role } = useUserRole();

  const getPrimaryItems = () => {
    const items = [
      { path: '/dashboard', label: 'Dashboard', icon: Settings },
      { path: '/appointments', label: 'Book Care', icon: Calendar },
      { path: '/insurance', label: 'Insurance', icon: Shield },
      { path: '/hospitals', label: 'Find Care', icon: MapPin }
    ];

    // Add role-specific primary items for admins
    if (role === 'super_admin') {
      items.push({ path: '/admin', label: 'Admin', icon: Shield });
    }
    if (role === 'hospital_admin' || role === 'super_admin') {
      items.push({ path: '/hospital', label: 'Hospital', icon: Building2 });
    }

    return items;
  };

  const getSecondaryItems = () => {
    return [
      { path: '/labs', label: 'Book Lab Test', icon: TestTube },
      { path: '/pharmacy', label: 'Buy Medicine', icon: Pill },
      { path: '/pediatric', label: 'Mother & Child', icon: Baby },
      { path: '/telemedicine', label: 'Telemedicine', icon: Video },
      { path: '/records', label: 'Health Records', icon: FileText },
      { path: '/resources', label: 'Health Resources', icon: Heart },
      { path: '/emergency', label: 'Emergency SOS', icon: Shield }
    ];
  };

  return { primaryItems: getPrimaryItems(), secondaryItems: getSecondaryItems() };
};

interface StreamlinedNavigationProps {
  primaryItems: Array<{
    path: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  secondaryItems: Array<{
    path: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
}

export const StreamlinedDesktopNavigation: React.FC<StreamlinedNavigationProps> = ({ 
  primaryItems, 
  secondaryItems 
}) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex items-center space-x-1">
      {/* Primary Navigation Items */}
      {primaryItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2 rounded-md ${
            isActive(item.path)
              ? 'text-teal-600 bg-teal-50'
              : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
          }`}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}

      {/* More Menu for Secondary Items */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 flex items-center gap-1"
          >
            More Services
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white border shadow-lg z-50">
          <DropdownMenuItem asChild>
            <Link to="/labs" className="flex items-center gap-3 w-full cursor-pointer hover:bg-teal-50">
              <TestTube className="h-4 w-4 text-orange-600" />
              Book Lab Test
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/pharmacy" className="flex items-center gap-3 w-full cursor-pointer hover:bg-teal-50">
              <Pill className="h-4 w-4 text-green-600" />
              Buy Medicine
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/pediatric" className="flex items-center gap-3 w-full cursor-pointer hover:bg-teal-50">
              <Baby className="h-4 w-4 text-pink-600" />
              Mother & Child Care
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/telemedicine" className="flex items-center gap-3 w-full cursor-pointer hover:bg-teal-50">
              <Video className="h-4 w-4 text-purple-600" />
              Telemedicine
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/records" className="flex items-center gap-3 w-full cursor-pointer hover:bg-teal-50">
              <FileText className="h-4 w-4 text-blue-600" />
              Health Records
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/resources" className="flex items-center gap-3 w-full cursor-pointer hover:bg-teal-50">
              <Heart className="h-4 w-4 text-red-600" />
              Health Resources
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/emergency" className="flex items-center gap-3 w-full cursor-pointer hover:bg-teal-50">
              <Shield className="h-4 w-4 text-red-500" />
              Emergency SOS
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
