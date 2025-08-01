
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Stethoscope, Briefcase } from 'lucide-react';

export const useSuperAdminNavigation = () => {
  const getNavigationItems = () => {
    return [
      { path: '/admin', label: 'System Admin', icon: Shield },
      { path: '/telemedicine', label: 'Telemedicine', icon: Stethoscope },
      { path: '/broker-dashboard', label: 'Insurance Broker', icon: Briefcase },
    ];
  };

  return getNavigationItems();
};

interface SuperAdminNavigationProps {
  items: Array<{
    path: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
}

export const SuperAdminDesktopNavigation: React.FC<SuperAdminNavigationProps> = ({ items }) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex items-center space-x-1">
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2 rounded-md ${
            isActive(item.path)
              ? 'text-red-600 bg-red-50'
              : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
          }`}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </div>
  );
};
