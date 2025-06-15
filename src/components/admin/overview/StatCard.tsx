
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  icon: LucideIcon;
  total: number;
  active: number;
  description: string;
}

const StatCard = ({ title, icon: Icon, total, active, description }: StatCardProps) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{active.toLocaleString()}</div>
      <p className="text-xs text-muted-foreground mb-2">
        {description} ({total.toLocaleString()} total)
      </p>
      <div className="flex items-center gap-2">
        <Badge variant={active > 0 ? "default" : "secondary"} className="text-xs">
          {active > 0 ? 'Active' : 'None Active'}
        </Badge>
        <span className="text-xs text-gray-500">
          {total > 0 ? `${Math.round((active/total) * 100)}% active` : 'No data'}
        </span>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;
