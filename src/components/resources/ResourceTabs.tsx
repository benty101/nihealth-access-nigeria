
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResourceHealthTips from '@/components/resources/ResourceHealthTips';
import ResourceArticles from '@/components/resources/ResourceArticles';
import ResourceVideos from '@/components/resources/ResourceVideos';
import ResourceChecklists from '@/components/resources/ResourceChecklists';
import ResourceExperts from '@/components/resources/ResourceExperts';
import ResourceGamification from '@/components/resources/ResourceGamification';
import ResourceEmergency from '@/components/resources/ResourceEmergency';
import {
  articles,
  videos,
  checklists,
  experts,
  emergencyContacts,
  healthTips,
  gamificationMilestones
} from '@/data/resourceData';

interface ResourceTabsProps {
  searchTerm: string;
}

const ResourceTabs = ({ searchTerm }: ResourceTabsProps) => {
  return (
    <Tabs defaultValue="health-tips" className="w-full">
      <TabsList className="grid w-full grid-cols-7">
        <TabsTrigger value="health-tips">Health Tips</TabsTrigger>
        <TabsTrigger value="articles">Articles</TabsTrigger>
        <TabsTrigger value="videos">Videos</TabsTrigger>
        <TabsTrigger value="checklists">Checklists</TabsTrigger>
        <TabsTrigger value="experts">Experts</TabsTrigger>
        <TabsTrigger value="milestones">Milestones</TabsTrigger>
        <TabsTrigger value="emergency">Emergency</TabsTrigger>
      </TabsList>

      <TabsContent value="health-tips" className="mt-6">
        <ResourceHealthTips healthTips={healthTips} searchTerm={searchTerm} />
      </TabsContent>

      <TabsContent value="articles" className="mt-6">
        <ResourceArticles articles={articles} searchTerm={searchTerm} />
      </TabsContent>

      <TabsContent value="videos" className="mt-6">
        <ResourceVideos videos={videos} searchTerm={searchTerm} />
      </TabsContent>

      <TabsContent value="checklists" className="mt-6">
        <ResourceChecklists checklists={checklists} searchTerm={searchTerm} />
      </TabsContent>

      <TabsContent value="experts" className="mt-6">
        <ResourceExperts experts={experts} />
      </TabsContent>

      <TabsContent value="milestones" className="mt-6">
        <ResourceGamification milestones={gamificationMilestones} />
      </TabsContent>

      <TabsContent value="emergency" className="mt-6">
        <ResourceEmergency emergencyContacts={emergencyContacts} />
      </TabsContent>
    </Tabs>
  );
};

export default ResourceTabs;
