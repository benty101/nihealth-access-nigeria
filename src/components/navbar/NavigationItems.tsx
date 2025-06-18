
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUserRole } from '@/hooks/useUserRole';
import { Shield, Building2, TrendingUp, Users, Activity, Calendar, FileText } from 'lucide-react';

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
        { path: '/admin', label: 'System Admin', icon: Shield },
        { path: '/hospital', label: 'Hospital Tools', icon: Building2 },
        { path: '/broker', label: 'Broker Dashboard', icon: TrendingUp },
        { path: '/patient-portal', label: 'Patient Portal', icon: Users }
      );
    }

    if (role === 'hospital_admin') {
      roleSpecificItems.push(
        { path: '/hospital', label: 'Hospital Dashboard', icon: Building2 }
      );
    }

    if (role === 'patient') {
      roleSpecificItems.push(
        { path: '/patient-portal', label: 'My Health Portal', icon: Activity }
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
    <div className="flex items-center space-x-1">
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2 rounded-md ${
            isActive(item.path)
              ? 'text-teal-600 bg-teal-50'
              : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
          }`}
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          {item.label}
        </Link>
      ))}
    </div>
  );
};
