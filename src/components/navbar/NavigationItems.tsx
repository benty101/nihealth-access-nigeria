
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUserRole } from '@/hooks/useUserRole';
import { Shield, Building2, TrendingUp } from 'lucide-react';

export const useNavigationItems = () => {
  const { role } = useUserRole();

  const getNavigationItems = () => {
    const baseItems = [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/appointments', label: 'Appointments' },
      { path: '/records', label: 'Records' },
      { path: '/hospitals', label: 'Hospitals' },
      { path: '/insurance', label: 'Insurance' },
      { path: '/resources', label: 'Resources' }
    ];

    const roleSpecificItems = [];

    if (role === 'super_admin') {
      roleSpecificItems.push(
        { path: '/admin', label: 'Admin Panel', icon: Shield },
        { path: '/broker', label: 'Broker Dashboard', icon: TrendingUp }
      );
    }

    if (role === 'hospital_admin' || role === 'super_admin') {
      roleSpecificItems.push(
        { path: '/hospital', label: 'Hospital Dashboard', icon: Building2 }
      );
    }

    return [...roleSpecificItems, ...baseItems];
  };

  return getNavigationItems();
};

interface DesktopNavigationProps {
  items: Array<{
    path: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ items }) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden md:flex items-center space-x-8">
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`text-sm font-medium transition-colors flex items-center gap-2 ${
            isActive(item.path)
              ? 'text-teal-600 border-b-2 border-teal-600 pb-4'
              : 'text-gray-700 hover:text-teal-600'
          }`}
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          {item.label}
        </Link>
      ))}
    </div>
  );
};
