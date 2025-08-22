import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/enhanced/Button';
import { Card } from '@/components/ui/enhanced/Card';
import {
  Heart,
  Activity,
  Calendar,
  Brain,
  Shield,
  Building2,
  TestTube2,
  Pill,
  Video,
  Search,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
  Sparkles,
  Zap,
  Home,
  FileText,
  TrendingUp,
  MessageCircle,
  Phone,
  Baby,
  BookOpen,
  BarChart3,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  badge?: string;
  urgent?: boolean;
  category: string;
}

const ModernNavigation: React.FC = () => {
  const { user, signOut } = useAuth();
  const { role } = useUserRole();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('my-health');

  const navigationItems: NavigationItem[] = [
    // My Health Category
    {
      id: 'health-hub',
      label: 'Health Hub',
      path: '/health-hub',
      icon: Sparkles,
      description: 'AI-powered health intelligence center',
      badge: 'Smart',
      category: 'my-health'
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: Activity,
      description: 'Your complete health overview',
      category: 'my-health'
    },
    {
      id: 'health-timeline',
      label: 'Health Timeline',
      path: '/timeline',
      icon: TrendingUp,
      description: 'Track your health journey',
      category: 'my-health'
    },
    {
      id: 'records',
      label: 'Medical Records',
      path: '/records',
      icon: FileText,
      description: 'Access your medical history',
      category: 'my-health'
    },
    {
      id: 'profile',
      label: 'My Profile',
      path: '/profile',
      icon: User,
      description: 'Manage personal information',
      category: 'my-health'
    },

    // Care & Services Category
    {
      id: 'appointments',
      label: 'Appointments',
      path: '/appointments',
      icon: Calendar,
      description: 'Schedule healthcare visits',
      badge: '3 upcoming',
      category: 'services'
    },
    {
      id: 'telemedicine',
      label: 'Telemedicine',
      path: '/telemedicine',
      icon: Video,
      description: 'Virtual consultations',
      badge: '24/7',
      category: 'services'
    },
    {
      id: 'hospitals',
      label: 'Hospitals',
      path: '/hospitals',
      icon: Building2,
      description: 'Find healthcare facilities',
      category: 'services'
    },
    {
      id: 'labs',
      label: 'Lab Tests',
      path: '/labs',
      icon: TestTube2,
      description: 'Order diagnostic tests',
      badge: 'Popular',
      category: 'services'
    },
    {
      id: 'pharmacy',
      label: 'Pharmacy',
      path: '/pharmacy',
      icon: Pill,
      description: 'Order medications',
      badge: '2 refills due',
      category: 'services'
    },
    {
      id: 'insurance',
      label: 'Insurance',
      path: '/insurance',
      icon: Shield,
      description: 'Manage your coverage',
      category: 'services'
    },
    {
      id: 'emergency',
      label: 'Emergency',
      path: '/emergency',
      icon: Phone,
      description: 'Emergency services',
      urgent: true,
      category: 'services'
    },

    // AI & Tools Category
    {
      id: 'ai-chat',
      label: 'AI Health Chat',
      path: '/ai-chat',
      icon: MessageCircle,
      description: 'Chat with AI assistant',
      badge: 'Smart',
      category: 'ai-tools'
    },
    {
      id: 'symptom-checker',
      label: 'Symptom Checker',
      path: '/ai-assistant',
      icon: Brain,
      description: 'AI-powered analysis',
      badge: 'Free',
      category: 'ai-tools'
    },
    {
      id: 'medical-search',
      label: 'Medical Search',
      path: '/medical-search',
      icon: Search,
      description: 'Search medical knowledge',
      category: 'ai-tools'
    },
    {
      id: 'health-insights',
      label: 'Health Insights',
      path: '/insights',
      icon: TrendingUp,
      description: 'Personalized analytics',
      badge: 'AI',
      category: 'ai-tools'
    },
    {
      id: 'resources',
      label: 'Health Resources',
      path: '/resources',
      icon: BookOpen,
      description: 'Educational content',
      category: 'ai-tools'
    }
  ];

  // Add role-specific items
  if (role === 'super_admin') {
    navigationItems.push(
      {
        id: 'admin-dashboard',
        label: 'Admin Dashboard',
        path: '/admin',
        icon: Settings,
        description: 'System administration',
        category: 'admin'
      },
      {
        id: 'ml-analytics',
        label: 'ML Analytics',
        path: '/ml-analytics',
        icon: BarChart3,
        description: 'Machine learning insights',
        category: 'admin'
      }
    );
  }

  const categories = [
    { id: 'my-health', label: 'My Health', icon: Heart },
    { id: 'services', label: 'Services', icon: Building2 },
    { id: 'ai-tools', label: 'AI & Tools', icon: Brain },
    ...(role === 'super_admin' ? [{ id: 'admin', label: 'Admin', icon: Settings }] : [])
  ];

  const filteredItems = navigationItems.filter(item => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full bg-white/95 backdrop-blur-md border-r border-neutral-200/50 z-50 transition-all duration-300 ease-in-out",
        isOpen ? "w-80" : "w-0 lg:w-80",
        "lg:relative lg:z-auto overflow-hidden"
      )}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-primary-600">MeddyPal</h1>
              <p className="text-xs text-neutral-600">Your Health Companion</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Emergency Quick Access */}
        <div className="p-4 border-b border-neutral-200/50">
          <Button
            variant="destructive"
            fullWidth
            size="sm"
            leftIcon={<Zap className="h-4 w-4" />}
            onClick={() => navigate('/emergency')}
            className="shadow-lg"
          >
            Emergency SOS
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-neutral-200/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search health services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto p-4 border-b border-neutral-200/50 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                activeCategory === category.id
                  ? 'bg-primary-100 text-primary-700 shadow-sm'
                  : 'text-neutral-600 hover:bg-neutral-100'
              )}
            >
              <category.icon className="h-4 w-4" />
              {category.label}
            </button>
          ))}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive: linkIsActive }) => cn(
                'group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 relative',
                linkIsActive
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                  : item.urgent
                  ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                  : 'text-neutral-700 hover:bg-neutral-100'
              )}
            >
              <div className={cn(
                'p-2 rounded-lg transition-all',
                isActive(item.path)
                  ? 'bg-white/20'
                  : item.urgent
                  ? 'bg-red-100'
                  : 'bg-neutral-100 group-hover:bg-neutral-200'
              )}>
                <item.icon className={cn(
                  'h-5 w-5',
                  isActive(item.path)
                    ? 'text-white'
                    : item.urgent
                    ? 'text-red-600'
                    : 'text-neutral-600'
                )} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium truncate">{item.label}</span>
                  {item.badge && (
                    <span className={cn(
                      'px-2 py-0.5 text-xs rounded-full font-medium',
                      isActive(item.path)
                        ? 'bg-white/20 text-white'
                        : item.urgent
                        ? 'bg-red-200 text-red-800'
                        : 'bg-primary-100 text-primary-700'
                    )}>
                      {item.badge}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className={cn(
                    'text-xs truncate mt-0.5',
                    isActive(item.path)
                      ? 'text-white/80'
                      : 'text-neutral-500'
                  )}>
                    {item.description}
                  </p>
                )}
              </div>
              
              <ChevronRight className={cn(
                'h-4 w-4 transition-transform group-hover:translate-x-1',
                isActive(item.path) ? 'text-white' : 'text-neutral-400'
              )} />
            </NavLink>
          ))}
        </div>

        {/* User Profile & Actions */}
        <div className="border-t border-neutral-200/50 p-4 space-y-3">
          {user && (
            <Card className="p-3 bg-gradient-to-r from-primary-50 to-purple-50 border-primary-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-sm font-bold text-white">
                    {user.email?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {user.email?.split('@')[0]}
                  </p>
                  <p className="text-xs text-primary-600 capitalize">{role}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon-sm">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <Button
            variant="ghost"
            fullWidth
            onClick={handleSignOut}
            leftIcon={<LogOut className="h-4 w-4" />}
            className="justify-start text-neutral-600 hover:text-red-600 hover:bg-red-50"
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-lg"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  );
};

export default ModernNavigation;