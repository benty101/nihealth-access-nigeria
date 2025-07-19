import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Heart, 
  Brain, 
  Bone, 
  Eye, 
  Stethoscope,
  Activity,
  Star,
  Clock
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number; // in minutes
  isActive: boolean;
  doctorsAssigned: number;
}

interface HospitalServicesProps {
  hospitalId: string;
}

const HospitalServices: React.FC<HospitalServicesProps> = ({ hospitalId }) => {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'General Consultation',
      category: 'General Medicine',
      description: 'Comprehensive health checkup and consultation',
      price: 5000,
      duration: 30,
      isActive: true,
      doctorsAssigned: 5
    },
    {
      id: '2',
      name: 'Cardiology Consultation',
      category: 'Cardiology',
      description: 'Heart-related medical consultation and diagnosis',
      price: 12000,
      duration: 45,
      isActive: true,
      doctorsAssigned: 2
    },
    {
      id: '3',
      name: 'Orthopedic Surgery',
      category: 'Orthopedics',
      description: 'Bone and joint surgical procedures',
      price: 150000,
      duration: 120,
      isActive: true,
      doctorsAssigned: 3
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const categories = ['General Medicine', 'Cardiology', 'Orthopedics', 'Neurology', 'Dermatology', 'Pediatrics', 'Emergency'];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Cardiology': return Heart;
      case 'Neurology': return Brain;
      case 'Orthopedics': return Bone;
      case 'Dermatology': return Eye;
      default: return Stethoscope;
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ServiceForm = ({ service, onSave, onCancel }: { 
    service?: Service; 
    onSave: (service: Partial<Service>) => void; 
    onCancel: () => void; 
  }) => {
    const [formData, setFormData] = useState({
      name: service?.name || '',
      category: service?.category || '',
      description: service?.description || '',
      price: service?.price || 0,
      duration: service?.duration || 30,
      isActive: service?.isActive ?? true
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Service Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., General Consultation"
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the service..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price (₦)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
              placeholder="0"
              required
            />
          </div>
          <div>
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 30 })}
              placeholder="30"
              required
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {service ? 'Update Service' : 'Add Service'}
          </Button>
        </DialogFooter>
      </form>
    );
  };

  const handleAddService = (serviceData: Partial<Service>) => {
    const newService: Service = {
      id: Date.now().toString(),
      ...serviceData as Service,
      doctorsAssigned: 0
    };
    setServices([...services, newService]);
    setIsAddDialogOpen(false);
  };

  const handleEditService = (serviceData: Partial<Service>) => {
    if (editingService) {
      setServices(services.map(s => 
        s.id === editingService.id ? { ...s, ...serviceData } : s
      ));
      setEditingService(null);
    }
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter(s => s.id !== serviceId));
  };

  const toggleServiceStatus = (serviceId: string) => {
    setServices(services.map(s => 
      s.id === serviceId ? { ...s, isActive: !s.isActive } : s
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Hospital Services</h2>
          <p className="text-muted-foreground">Manage your medical services and specialties</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>
                Create a new medical service for your hospital
              </DialogDescription>
            </DialogHeader>
            <ServiceForm 
              onSave={handleAddService}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const CategoryIcon = getCategoryIcon(service.category);
          
          return (
            <Card key={service.id} className={`${!service.isActive ? 'opacity-60' : ''}`}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CategoryIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {service.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingService(service)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteService(service.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{service.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span>₦{service.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{service.duration} mins</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="h-4 w-4" />
                    <span>{service.doctorsAssigned} doctors</span>
                  </div>
                  
                  <Button
                    variant={service.isActive ? "outline" : "default"}
                    size="sm"
                    onClick={() => toggleServiceStatus(service.id)}
                  >
                    {service.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update the service details
            </DialogDescription>
          </DialogHeader>
          {editingService && (
            <ServiceForm 
              service={editingService}
              onSave={handleEditService}
              onCancel={() => setEditingService(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HospitalServices;