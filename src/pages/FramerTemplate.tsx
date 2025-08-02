import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FramerTemplate = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribe:', email);
  };

  const journalEntries = [
    {
      id: '01',
      title: 'AI-Powered Health Diagnostics',
      description: 'Revolutionizing healthcare with artificial intelligence.',
      date: 'Dec 15, 2024',
      featured: false
    },
    {
      id: '02', 
      title: 'Genomics in Personalized Medicine',
      description: 'How genetic testing shapes treatment plans.',
      date: 'Dec 10, 2024',
      featured: false
    },
    {
      id: '03',
      title: 'Telemedicine Best Practices',
      description: 'Effective remote healthcare delivery strategies.',
      date: 'Dec 5, 2024',
      featured: false
    },
    {
      id: '06',
      title: 'The Future of Digital Health',
      description: 'Transforming healthcare through technology.',
      date: 'Dec 20, 2024',
      featured: true
    }
  ];

  const featuredEntry = journalEntries.find(entry => entry.featured);
  const regularEntries = journalEntries.filter(entry => !entry.featured);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f6f7f2' }}>
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="text-2xl font-bold text-gray-900">
          MeddyPal
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/insights" className="text-gray-700 hover:text-gray-900 transition-colors">
            Journal
          </Link>
          <Link to="/resources" className="text-gray-700 hover:text-gray-900 transition-colors">
            Resources
          </Link>
          <Link to="/profile" className="text-gray-700 hover:text-gray-900 transition-colors">
            About
          </Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 transition-colors">
            Contact
          </Link>
        </div>

        <Button 
          className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full"
          asChild
        >
          <Link to="/dashboard">Dashboard</Link>
        </Button>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-8 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-normal leading-tight text-gray-900">
            Healthcare by day
            <br />
            <span className="text-gray-700">and wellness by night.</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Hi, I'm MeddyPal — your comprehensive health companion, passionately 
            supporting your wellness journey with AI-powered insights and personalized care.
          </p>

          {/* Newsletter Signup */}
          <div className="max-w-md mx-auto mt-12">
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <Input
                type="email"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-full border-gray-300 bg-white/80 backdrop-blur-sm"
                required
              />
              <Button 
                type="submit"
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 rounded-full"
              >
                Subscribe
              </Button>
            </form>
            <p className="text-sm text-gray-500 mt-2">
              Subscribe to newsletter. Latest health insights.
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Featured Section */}
        {featuredEntry && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Featured</span>
              <Badge variant="outline" className="bg-orange-100 text-orange-600 border-orange-200">
                ✨
              </Badge>
            </div>
            
            <Card className="overflow-hidden bg-white/60 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-2">{featuredEntry.id}\</div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      {featuredEntry.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {featuredEntry.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{featuredEntry.date}</span>
                      <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                        Read more →
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Journal Section */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Health Insights</span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularEntries.map((entry) => (
              <Card 
                key={entry.id}
                className="overflow-hidden bg-white/60 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{entry.id}\</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {entry.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{entry.date}</span>
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                      Read more →
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              asChild
            >
              <Link to="/insights">Go to health insights →</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/40 backdrop-blur-sm mt-20">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>Powered by advanced AI and genomics technology</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FramerTemplate;