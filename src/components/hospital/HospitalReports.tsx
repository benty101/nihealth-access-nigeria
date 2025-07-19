import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign,
  Download,
  Filter,
  Activity,
  Clock,
  Target
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HospitalReportsProps {
  hospitalId: string;
}

const HospitalReports: React.FC<HospitalReportsProps> = ({ hospitalId }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

  const metrics = {
    totalPatients: 1247,
    totalConsultations: 892,
    revenue: 4500000,
    averageRating: 4.6,
    doctorUtilization: 78,
    patientSatisfaction: 92
  };

  const reportTypes = [
    { id: 'overview', name: 'Performance Overview' },
    { id: 'revenue', name: 'Revenue Analysis' },
    { id: 'patients', name: 'Patient Analytics' },
    { id: 'doctors', name: 'Doctor Performance' },
    { id: 'services', name: 'Service Utilization' }
  ];

  const periods = [
    { id: 'week', name: 'Last 7 Days' },
    { id: 'month', name: 'Last 30 Days' },
    { id: 'quarter', name: 'Last 3 Months' },
    { id: 'year', name: 'Last 12 Months' }
  ];

  const MetricCard = ({ icon: Icon, title, value, subtitle, trend }: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    value: string;
    subtitle: string;
    trend?: 'up' | 'down' | 'neutral';
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {trend && (
            <TrendingUp 
              className={`h-3 w-3 ${
                trend === 'up' ? 'text-green-500' : 
                trend === 'down' ? 'text-red-500 rotate-180' : 
                'text-gray-500'
              }`} 
            />
          )}
          <span>{subtitle}</span>
        </div>
      </CardContent>
    </Card>
  );

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          icon={Users}
          title="Total Patients"
          value={metrics.totalPatients.toLocaleString()}
          subtitle="+12% from last month"
          trend="up"
        />
        <MetricCard
          icon={Calendar}
          title="Consultations"
          value={metrics.totalConsultations.toLocaleString()}
          subtitle="+8% from last month"
          trend="up"
        />
        <MetricCard
          icon={DollarSign}
          title="Revenue"
          value={`₦${(metrics.revenue / 1000000).toFixed(1)}M`}
          subtitle="+15% from last month"
          trend="up"
        />
        <MetricCard
          icon={Target}
          title="Average Rating"
          value={metrics.averageRating.toString()}
          subtitle="Based on patient feedback"
          trend="neutral"
        />
        <MetricCard
          icon={Activity}
          title="Doctor Utilization"
          value={`${metrics.doctorUtilization}%`}
          subtitle="Average across all doctors"
          trend="up"
        />
        <MetricCard
          icon={Clock}
          title="Patient Satisfaction"
          value={`${metrics.patientSatisfaction}%`}
          subtitle="Positive feedback rate"
          trend="up"
        />
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Revenue chart will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patient Flow</CardTitle>
            <CardDescription>Daily patient appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Activity className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Patient flow chart will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Services */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Services</CardTitle>
          <CardDescription>Most booked services this {selectedPeriod}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'General Consultation', bookings: 156, revenue: 780000 },
              { name: 'Cardiology Consultation', bookings: 89, revenue: 1068000 },
              { name: 'Pediatric Care', bookings: 134, revenue: 670000 },
              { name: 'Emergency Care', bookings: 45, revenue: 900000 }
            ].map((service, index) => (
              <div key={service.name} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">#{index + 1}</Badge>
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">{service.bookings} bookings</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₦{service.revenue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'overview':
        return renderOverviewReport();
      case 'revenue':
        return (
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Revenue Analysis</h3>
            <p className="text-muted-foreground">Detailed revenue analytics coming soon</p>
          </div>
        );
      case 'patients':
        return (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Patient Analytics</h3>
            <p className="text-muted-foreground">Patient demographic and behavior analysis coming soon</p>
          </div>
        );
      case 'doctors':
        return (
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Doctor Performance</h3>
            <p className="text-muted-foreground">Individual doctor performance metrics coming soon</p>
          </div>
        );
      case 'services':
        return (
          <div className="text-center py-12">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Service Utilization</h3>
            <p className="text-muted-foreground">Service usage and performance analysis coming soon</p>
          </div>
        );
      default:
        return renderOverviewReport();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
          <p className="text-muted-foreground">Track your hospital's performance and insights</p>
        </div>
        
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        
        <Select value={selectedReport} onValueChange={setSelectedReport}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {reportTypes.map(type => (
              <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {periods.map(period => (
              <SelectItem key={period.id} value={period.id}>{period.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Report Content */}
      {renderReportContent()}
    </div>
  );
};

export default HospitalReports;