
import React from 'react';
import { Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { SystemStats } from '@/services/AdminDataService';

interface ServiceStatusDetailsProps {
  stats: SystemStats;
}

const ServiceStatusDetails = ({ stats }: ServiceStatusDetailsProps) => {
  const services = [
    { name: 'Hospitals', key: 'hospitals', total: stats.totalHospitals, active: stats.activeHospitals },
    { name: 'Pharmacies', key: 'pharmacies', total: stats.totalPharmacies, active: stats.activePharmacies },
    { name: 'Medications', key: 'medications', total: stats.totalMedications, active: stats.activeMedications },
    { name: 'Laboratories', key: 'labs', total: stats.totalLabs, active: stats.activeLabs },
    { name: 'Test Catalog', key: 'lab_tests', total: stats.totalLabTests, active: stats.activeLabTests },
    { name: 'Insurance', key: 'insurance_plans', total: stats.totalInsurancePlans, active: stats.activeInsurancePlans },
    { name: 'Telemedicine', key: 'telemedicine_providers', total: stats.totalTelemedicineProviders, active: stats.activeTelemedicineProviders },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Live Frontend Data Status
        </CardTitle>
        <CardDescription>Real-time status reflecting all frontend listings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <div key={service.key} className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">{service.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {service.active}/{service.total} active
                </span>
                <Badge 
                  variant={stats.loadedServices.includes(service.key) ? "default" : "destructive"}
                  className="text-xs"
                >
                  {stats.loadedServices.includes(service.key) ? 'Synced' : 'Error'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceStatusDetails;
