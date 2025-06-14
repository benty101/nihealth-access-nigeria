
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, CheckCircle } from 'lucide-react';

interface Checklist {
  id: number;
  title: string;
  description: string;
  items: number;
  downloads: number;
  category: string;
  isPopular: boolean;
}

interface ResourceChecklistsProps {
  checklists: Checklist[];
  searchTerm: string;
}

const ResourceChecklists = ({ checklists, searchTerm }: ResourceChecklistsProps) => {
  const filteredChecklists = checklists.filter(checklist =>
    checklist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    checklist.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    checklist.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredChecklists.map((checklist) => (
        <Card key={checklist.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <Badge variant="secondary">{checklist.category}</Badge>
              {checklist.isPopular && (
                <Badge className="bg-emerald-100 text-emerald-700">Popular</Badge>
              )}
            </div>
            <CardTitle className="text-lg leading-tight">{checklist.title}</CardTitle>
            <p className="text-sm text-gray-600">{checklist.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                {checklist.items} items
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Download className="h-4 w-4 mr-1" />
                {checklist.downloads.toLocaleString()} downloads
              </div>

              <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700">
                <Download className="h-4 w-4 mr-2" />
                Download Checklist
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResourceChecklists;
