
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, TestTube, Pill, FileText, Heart, Users, Shield, Video, Baby } from 'lucide-react';

const DashboardTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const primaryTabs = [
    { value: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { value: 'appointments', label: 'Book Care', path: '/appointments' },
    { value: 'insurance', label: 'Insurance', path: '/insurance' },
    { value: 'hospitals', label: 'Find Care', path: '/hospitals' }
  ];

  const secondaryItems = [
    { path: '/labs', label: 'Book Lab Test', icon: TestTube },
    { path: '/pharmacy', label: 'Buy Medicine', icon: Pill },
    { path: '/records', label: 'Health Records', icon: FileText },
    { path: '/pediatric', label: 'Mother & Child', icon: Baby },
    { path: '/telemedicine', label: 'Telemedicine', icon: Video },
    { path: '/resources', label: 'Health Resources', icon: Heart },
    { path: '/emergency', label: 'Emergency SOS', icon: Shield },
  ];

  const getCurrentTab = () => {
    const currentPath = location.pathname;
    const tab = primaryTabs.find(tab => tab.path === currentPath);
    return tab ? tab.value : 'dashboard';
  };

  const handleTabChange = (value: string) => {
    const tab = primaryTabs.find(tab => tab.value === value);
    if (tab) {
      navigate(tab.path);
    }
  };

  const handleSecondaryNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex items-center justify-between w-full px-4 py-3 bg-white border-b shadow-sm">
      <Tabs value={getCurrentTab()} onValueChange={handleTabChange} className="flex-1">
        <TabsList className="grid w-full max-w-md grid-cols-4 bg-gray-50">
          {primaryTabs.map((tab) => (
            <TabsTrigger 
              key={tab.value} 
              value={tab.value} 
              className="text-xs sm:text-sm data-[state=active]:bg-teal-600 data-[state=active]:text-white"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="ml-4 border-teal-200 hover:bg-teal-50">
            More Services
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white border shadow-lg">
          <DropdownMenuItem 
            onClick={() => handleSecondaryNavigation('/labs')}
            className="flex items-center gap-3 cursor-pointer hover:bg-teal-50"
          >
            <TestTube className="h-4 w-4 text-orange-600" />
            Book Lab Test
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleSecondaryNavigation('/pharmacy')}
            className="flex items-center gap-3 cursor-pointer hover:bg-teal-50"
          >
            <Pill className="h-4 w-4 text-green-600" />
            Buy Medicine
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => handleSecondaryNavigation('/records')}
            className="flex items-center gap-3 cursor-pointer hover:bg-teal-50"
          >
            <FileText className="h-4 w-4 text-blue-600" />
            Health Records
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleSecondaryNavigation('/pediatric')}
            className="flex items-center gap-3 cursor-pointer hover:bg-teal-50"
          >
            <Baby className="h-4 w-4 text-pink-600" />
            Mother & Child Care
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleSecondaryNavigation('/telemedicine')}
            className="flex items-center gap-3 cursor-pointer hover:bg-teal-50"
          >
            <Video className="h-4 w-4 text-purple-600" />
            Telemedicine
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => handleSecondaryNavigation('/resources')}
            className="flex items-center gap-3 cursor-pointer hover:bg-teal-50"
          >
            <Heart className="h-4 w-4 text-red-600" />
            Health Resources
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleSecondaryNavigation('/emergency')}
            className="flex items-center gap-3 cursor-pointer hover:bg-teal-50"
          >
            <Shield className="h-4 w-4 text-red-500" />
            Emergency SOS
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DashboardTabs;
