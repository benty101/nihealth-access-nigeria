import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUserRole } from '@/hooks/useUserRole';
import {
  Activity,
  Calendar,
  Shield,
  Building2,
  MessageCircle,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface MobileNavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface MobileBottomNavigationProps {
  onMenuToggle: () => void;
}

const MobileBottomNavigation: React.FC<MobileBottomNavigationProps> = ({ onMenuToggle }) => {
  const { role } = useUserRole();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Primary mobile navigation items (max 5 for optimal UX)
  const getPrimaryNavItems = (): MobileNavItem[] => {
    const baseItems: MobileNavItem[] = [
      {
        label: 'Health',
        path: '/dashboard',
        icon: Activity
      },
      {
        label: 'Book Care',
        path: '/appointments',
        icon: Calendar
      },
      {
        label: 'Insurance',
        path: '/insurance',
        icon: Shield
      },
      {
        label: 'Hospitals',
        path: '/hospitals',
        icon: Building2
      },
      {
        label: 'AI Chat',
        path: '/ai-chat',
        icon: MessageCircle,
        badge: 'AI'
      }
    ];

    // Adjust for admin users
    if (role === 'super_admin') {
      return [
        baseItems[0], // Health
        baseItems[1], // Book Care
        {
          label: 'Admin',
          path: '/admin',
          icon: Shield
        },
        baseItems[3], // Hospitals
        baseItems[4]  // AI Chat
      ];
    }

    if (role === 'hospital_admin') {
      return [
        baseItems[0], // Health
        {
          label: 'Hospital',
          path: '/hospital',
          icon: Building2
        },
        baseItems[1], // Book Care
        baseItems[2], // Insurance
        baseItems[4]  // AI Chat
      ];
    }

    return baseItems;
  };

  const navItems = getPrimaryNavItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Bottom Navigation Bar */}
      <div className="bg-card/95 backdrop-blur-md border-t border-border shadow-2xl">
        <div className="grid grid-cols-5 gap-0">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const itemIsActive = isActive(item.path);
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex flex-col items-center justify-center py-2 px-1 min-h-[60px] transition-all duration-200 relative",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground active:bg-muted/50"
                )}
              >
                <div className="relative">
                  <Icon className={cn(
                    "h-5 w-5 mb-1 transition-all duration-200",
                    itemIsActive && "scale-110"
                  )} />
                  {item.badge && (
                    <Badge 
                      className="absolute -top-2 -right-2 h-4 min-w-[16px] px-1 text-[10px] bg-primary text-primary-foreground border-0"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className={cn(
                  "text-[10px] font-medium leading-tight text-center transition-all duration-200",
                  itemIsActive ? "text-primary font-semibold" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
                {itemIsActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-b-full" />
                )}
              </NavLink>
            );
          })}
          
          {/* Menu Button */}
          <button
            onClick={onMenuToggle}
            className="flex flex-col items-center justify-center py-2 px-1 min-h-[60px] text-muted-foreground active:bg-muted/50 transition-all duration-200"
          >
            <Menu className="h-5 w-5 mb-1" />
            <span className="text-[10px] font-medium leading-tight">More</span>
          </button>
        </div>
      </div>
      
      {/* Safe area spacer for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-card/95" />
    </div>
  );
};

export default MobileBottomNavigation;