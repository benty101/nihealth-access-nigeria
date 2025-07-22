import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  Shield, 
  FileText, 
  Users, 
  Award,
  CheckCircle,
  Clock,
  AlertTriangle,
  ExternalLink,
  Globe,
  Heart
} from 'lucide-react';

export const GovernmentIntegrationPanel: React.FC = () => {
  const [nabdaStatus, setNabdaStatus] = useState('connected');
  const [governmentServices, setGovernmentServices] = useState([]);
  const [nationalHealthPrograms, setNationalHealthPrograms] = useState([]);

  useEffect(() => {
    // Mock government integration data
    setGovernmentServices([
      {
        id: 'nhis_enrollment',
        name: 'NHIS Enrollment',
        status: 'available',
        description: 'National Health Insurance Scheme registration',
        provider: 'NHIS',
        priority: 'high'
      },
      {
        id: 'birth_registration',
        name: 'Birth Certificate Services',
        status: 'connected',
        description: 'Birth registration and certificate services',
        provider: 'NPC',
        priority: 'medium'
      },
      {
        id: 'vaccination_records',
        name: 'National Immunization',
        status: 'available',
        description: 'Access national vaccination database',
        provider: 'NPHCDA',
        priority: 'high'
      },
      {
        id: 'health_card',
        name: 'Digital Health ID',
        status: 'pending',
        description: 'National digital health identification',
        provider: 'FMOH',
        priority: 'medium'
      }
    ]);

    setNationalHealthPrograms([
      {
        id: 'maternal_program',
        name: 'Maternal Health Initiative',
        description: 'Free maternal and child health services',
        eligibility: 'pregnant_women',
        benefits: ['Free antenatal care', 'Free delivery', 'Postnatal support'],
        status: 'eligible'
      },
      {
        id: 'genomics_program',
        name: 'NABDA Genomics Research',
        description: 'National genomics testing and research program',
        eligibility: 'all_citizens',
        benefits: ['Free genetic counseling', 'Subsidized testing', 'Research participation'],
        status: 'available'
      },
      {
        id: 'chronic_care',
        name: 'Chronic Disease Management',
        description: 'Government support for chronic conditions',
        eligibility: 'chronic_patients',
        benefits: ['Subsidized medications', 'Regular monitoring', 'Specialist access'],
        status: 'assess_eligibility'
      }
    ]);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'available': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'pending': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'eligible': return <Award className="w-4 h-4 text-blue-500" />;
      default: return <Shield className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'available': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'eligible': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* NABDA Partnership Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Building2 className="w-4 h-4 text-primary" />
            NABDA Partnership
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Connected</span>
            </div>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Partnership Level</span>
              <span className="font-medium">Tier 1 - Full Access</span>
            </div>
            <Progress value={100} className="h-1.5" />
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <Globe className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-blue-800">Government-Backed Platform</p>
                <p className="text-xs text-blue-600 mt-1">
                  Your health data is secured by Nigerian government standards and NABDA protocols.
                </p>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full">
            <ExternalLink className="w-3 h-3 mr-1" />
            Visit NABDA Portal
          </Button>
        </CardContent>
      </Card>

      {/* Government Services */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-primary" />
            Government Services
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {governmentServices.map((service) => (
            <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(service.status)}
                <div>
                  <p className="text-sm font-medium">{service.name}</p>
                  <p className="text-xs text-muted-foreground">{service.description}</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {service.provider}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <Badge className={getStatusColor(service.status)}>
                  {service.status}
                </Badge>
                <Button variant="ghost" size="sm" className="ml-2">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* National Health Programs */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Heart className="w-4 h-4 text-primary" />
            National Health Programs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {nationalHealthPrograms.map((program) => (
            <div key={program.id} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">{program.name}</h4>
                <Badge className={getStatusColor(program.status)}>
                  {program.status.replace('_', ' ')}
                </Badge>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2">{program.description}</p>
              
              {program.benefits && (
                <div className="space-y-1 mb-3">
                  <p className="text-xs font-medium">Benefits:</p>
                  {program.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-xs">{benefit}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-xs">
                  Learn More
                </Button>
                {program.status === 'eligible' && (
                  <Button size="sm" className="text-xs">
                    Apply Now
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Government Data Sharing */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <FileText className="w-6 h-6 text-blue-600 mx-auto" />
            <h4 className="text-sm font-semibold">Secure Data Sharing</h4>
            <p className="text-xs text-muted-foreground">
              Your anonymized health data contributes to national health research and policy
            </p>
            <div className="flex items-center justify-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-green-600" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3 text-blue-600" />
                <span>Research Impact</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full">
              Manage Data Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};