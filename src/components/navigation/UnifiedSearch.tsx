import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Search,
  Clock,
  TrendingUp,
  Heart,
  Calendar,
  Pill,
  TestTube2,
  FileText,
  Video,
  MessageCircle,
  Shield,
  Building2,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  path: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  keywords: string[];
}

interface UnifiedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  placeholder?: string;
  className?: string;
}

const UnifiedSearch: React.FC<UnifiedSearchProps> = ({ 
  isOpen, 
  onClose, 
  placeholder = "Search health services, information...",
  className 
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  // Comprehensive search data
  const searchData: SearchResult[] = [
    // Health Dashboard & Records
    {
      id: 'dashboard',
      title: 'Health Dashboard',
      description: 'View your complete health overview',
      path: '/dashboard',
      category: 'My Health',
      icon: Heart,
      keywords: ['dashboard', 'health', 'overview', 'home', 'main']
    },
    {
      id: 'records',
      title: 'Medical Records',
      description: 'Access your medical history and documents',
      path: '/records',
      category: 'My Health',
      icon: FileText,
      keywords: ['records', 'medical', 'history', 'documents', 'files']
    },
    {
      id: 'timeline',
      title: 'Health Timeline',
      description: 'Track your health journey over time',
      path: '/health-timeline',
      category: 'My Health',
      icon: TrendingUp,
      keywords: ['timeline', 'history', 'journey', 'progress', 'tracking']
    },

    // Appointments & Care
    {
      id: 'appointments',
      title: 'Book Appointments',
      description: 'Schedule with healthcare providers',
      path: '/appointments',
      category: 'Care & Services',
      icon: Calendar,
      keywords: ['appointment', 'book', 'schedule', 'doctor', 'consultation']
    },
    {
      id: 'hospitals',
      title: 'Find Hospitals',
      description: 'Locate healthcare facilities near you',
      path: '/hospitals',
      category: 'Care & Services',
      icon: Building2,
      keywords: ['hospital', 'clinic', 'facility', 'find', 'locate', 'near']
    },
    {
      id: 'telemedicine',
      title: 'Telemedicine',
      description: 'Virtual consultations with doctors',
      path: '/telemedicine',
      category: 'Care & Services',
      icon: Video,
      badge: '24/7',
      keywords: ['telemedicine', 'virtual', 'online', 'consultation', 'video', 'remote']
    },

    // Tests & Pharmacy
    {
      id: 'labs',
      title: 'Book Lab Tests',
      description: 'Order diagnostic tests and screenings',
      path: '/labs',
      category: 'Care & Services',
      icon: TestTube2,
      badge: 'Popular',
      keywords: ['lab', 'test', 'diagnostic', 'blood', 'screening', 'sample']
    },
    {
      id: 'pharmacy',
      title: 'Online Pharmacy',
      description: 'Order medications and health products',
      path: '/pharmacy',
      category: 'Care & Services',
      icon: Pill,
      keywords: ['pharmacy', 'medicine', 'medication', 'drugs', 'prescription', 'order']
    },

    // Insurance
    {
      id: 'insurance',
      title: 'Health Insurance',
      description: 'Manage your health coverage and plans',
      path: '/insurance',
      category: 'Care & Services',
      icon: Shield,
      keywords: ['insurance', 'coverage', 'plan', 'health', 'policy', 'claim']
    },

    // AI & Tools
    {
      id: 'ai-chat',
      title: 'AI Health Chat',
      description: 'Chat with AI health assistant',
      path: '/ai-chat',
      category: 'AI Tools',
      icon: MessageCircle,
      badge: 'Smart',
      keywords: ['ai', 'chat', 'assistant', 'help', 'smart', 'artificial intelligence']
    },
    {
      id: 'symptom-checker',
      title: 'Symptom Checker',
      description: 'AI-powered symptom analysis',
      path: '/ai-assistant',
      category: 'AI Tools',
      icon: Search,
      badge: 'Free',
      keywords: ['symptom', 'checker', 'analysis', 'ai', 'diagnosis', 'health']
    },

    // Emergency & Support
    {
      id: 'emergency',
      title: 'Emergency Services',
      description: 'Emergency contacts and procedures',
      path: '/emergency',
      category: 'Emergency',
      icon: Heart,
      keywords: ['emergency', 'urgent', 'help', 'crisis', 'ambulance', 'sos']
    }
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('meddypal_recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(-1);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = searchData.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm)) ||
      item.category.toLowerCase().includes(searchTerm)
    );

    // Sort by relevance (exact matches first, then partial)
    filtered.sort((a, b) => {
      const aExact = a.title.toLowerCase().includes(searchTerm) ? 1 : 0;
      const bExact = b.title.toLowerCase().includes(searchTerm) ? 1 : 0;
      return bExact - aExact;
    });

    setResults(filtered.slice(0, 8)); // Limit results
    setSelectedIndex(-1);
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleSelectResult(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  // Handle result selection
  const handleSelectResult = (result: SearchResult) => {
    // Save to recent searches
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('meddypal_recent_searches', JSON.stringify(updated));

    // Navigate and close
    navigate(result.path);
    onClose();
    setQuery('');
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('meddypal_recent_searches');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Search Modal */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4 z-50">
        <div className="bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center p-4 border-b border-border">
            <Search className="h-5 w-5 text-muted-foreground mr-3" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="border-0 bg-transparent focus:ring-0 text-lg placeholder:text-muted-foreground"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="ml-2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.trim() ? (
              results.length > 0 ? (
                <div className="p-2">
                  {results.map((result, index) => {
                    const Icon = result.icon;
                    return (
                      <button
                        key={result.id}
                        onClick={() => handleSelectResult(result)}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                          index === selectedIndex ? "bg-muted" : "hover:bg-muted/50"
                        )}
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">{result.title}</span>
                            {result.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {result.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{result.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{result.category}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No results found for "{query}"</p>
                  <p className="text-sm text-muted-foreground mt-1">Try different keywords or browse categories</p>
                </div>
              )
            ) : (
              // Recent searches and suggestions
              <div className="p-4">
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-foreground">Recent Searches</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearRecentSearches}
                        className="text-xs h-6 px-2"
                      >
                        Clear
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setQuery(search)}
                          className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-sm hover:bg-muted/80 transition-colors"
                        >
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">Popular Searches</h3>
                  <div className="space-y-1">
                    {['Book appointment', 'Lab tests', 'Health insurance', 'AI chat', 'Emergency'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setQuery(suggestion)}
                        className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-muted/50 transition-colors text-left"
                      >
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UnifiedSearch;