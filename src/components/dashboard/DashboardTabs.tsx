
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Calendar, FileText, MapPin, Shield, Users, Heart } from 'lucide-react';

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
    { path: '/records', label: 'Health Records', icon: FileText },
    { path: '/resources', label: 'Health Resources', icon: Heart },
    { path: '/telemedicine', label: 'Telemedicine', icon: Users },
    { path: '/emergency', label: 'Emergency SOS', icon: Heart },
    { path: '/pharmacy', label: 'Pharmacy', icon: Shield },
    { path: '/labs', label: 'Labs', icon: MapPin }
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
    <div className="flex items-center justify-between w-full px-4 py-2 bg-white border-b">
      <Tabs value={getCurrentTab()} onValueChange={handleTabChange} className="flex-1">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          {primaryTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="text-xs sm:text-sm">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="ml-4">
            More
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {secondaryItems.map((item) => (
            <DropdownMenuItem 
              key={item.path} 
              onClick={() => handleSecondaryNavigation(item.path)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DashboardTabs;
