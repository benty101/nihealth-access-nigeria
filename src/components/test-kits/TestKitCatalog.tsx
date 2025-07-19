import React, { useState, useEffect } from 'react';
import { HomeTestKitService, TestKitType } from '@/services/HomeTestKitService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TestTube, Clock, Droplet, ShoppingCart, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TestKitCatalogProps {
  onOrderKit: (kitType: TestKitType) => void;
}

export const TestKitCatalog: React.FC<TestKitCatalogProps> = ({ onOrderKit }) => {
  const [testKits, setTestKits] = useState<TestKitType[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadTestKits();
  }, []);

  const loadTestKits = async () => {
    try {
      const kits = await HomeTestKitService.getAvailableTestKits();
      setTestKits(kits);
    } catch (error) {
      console.error('Error loading test kits:', error);
      toast({
        title: "Error",
        description: "Failed to load test kits",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getKitTypeColor = (type: string): string => {
    const colors: Record<string, string> = {
      'blood_panel': 'bg-red-100 text-red-800',
      'genomic': 'bg-purple-100 text-purple-800',
      'hormone': 'bg-pink-100 text-pink-800',
      'maternal': 'bg-blue-100 text-blue-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getKitIcon = (type: string): React.ReactNode => {
    const icons: Record<string, React.ReactNode> = {
      'blood_panel': <Droplet className="h-5 w-5 text-red-600" />,
      'genomic': <TestTube className="h-5 w-5 text-purple-600" />,
      'hormone': <TestTube className="h-5 w-5 text-pink-600" />,
      'maternal': <TestTube className="h-5 w-5 text-blue-600" />
    };
    return icons[type] || <TestTube className="h-5 w-5" />;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-4 bg-gray-100 rounded"></div>
                <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Available Test Kits</h2>
        <p className="text-muted-foreground">
          Order convenient home test kits for comprehensive health insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testKits.map((kit) => (
          <Card key={kit.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getKitIcon(kit.type)}
                  <div>
                    <CardTitle className="text-lg">{kit.name}</CardTitle>
                    <Badge 
                      variant="secondary" 
                      className={getKitTypeColor(kit.type)}
                    >
                      {kit.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    ₦{kit.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">One-time payment</div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{kit.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-muted-foreground" />
                  <span>{kit.sample_type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{kit.turnaround_time}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Includes:</span>
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {kit.includes.slice(0, 3).map((item, index) => (
                    <div key={index} className="text-xs text-muted-foreground flex items-center">
                      <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                      {item}
                    </div>
                  ))}
                  {kit.includes.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{kit.includes.length - 3} more tests
                    </div>
                  )}
                </div>
              </div>

              <Button 
                onClick={() => onOrderKit(kit)} 
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Order Test Kit
              </Button>
            </CardContent>

            {/* Special badges */}
            {kit.type === 'genomic' && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                  Popular
                </Badge>
              </div>
            )}
            
            {kit.type === 'maternal' && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                  Maternal Focus
                </Badge>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};