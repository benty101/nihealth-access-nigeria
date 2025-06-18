
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PregnancyCareResources from '@/components/maternal-resources/categories/PregnancyCareResources';
import ChildbirthResources from '@/components/maternal-resources/categories/ChildbirthResources';
import NewbornCareResources from '@/components/maternal-resources/categories/NewbornCareResources';
import NutritionResources from '@/components/maternal-resources/categories/NutritionResources';
import ImmunizationResources from '@/components/maternal-resources/categories/ImmunizationResources';
import ChildDevelopmentResources from '@/components/maternal-resources/categories/ChildDevelopmentResources';

interface MaternalResourceCategoriesProps {
  searchTerm: string;
  selectedCategory: string;
}

const MaternalResourceCategories = ({ searchTerm, selectedCategory }: MaternalResourceCategoriesProps) => {
  const getActiveTab = () => {
    if (selectedCategory === 'all') return 'pregnancy';
    return selectedCategory;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <Tabs value={getActiveTab()} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8 bg-gray-100 p-1 rounded-md h-10">
          <TabsTrigger 
            value="pregnancy" 
            className="text-sm font-medium"
          >
            Pregnancy Care
          </TabsTrigger>
          <TabsTrigger 
            value="childbirth" 
            className="text-sm font-medium"
          >
            Childbirth
          </TabsTrigger>
          <TabsTrigger 
            value="newborn" 
            className="text-sm font-medium"
          >
            Newborn Care
          </TabsTrigger>
          <TabsTrigger 
            value="nutrition" 
            className="text-sm font-medium"
          >
            Nutrition
          </TabsTrigger>
          <TabsTrigger 
            value="immunization" 
            className="text-sm font-medium"
          >
            Immunization
          </TabsTrigger>
          <TabsTrigger 
            value="childhealth" 
            className="text-sm font-medium"
          >
            Child Development
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pregnancy" className="mt-6">
          <PregnancyCareResources searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="childbirth" className="mt-6">
          <ChildbirthResources searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="newborn" className="mt-6">
          <NewbornCareResources searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="nutrition" className="mt-6">
          <NutritionResources searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="immunization" className="mt-6">
          <ImmunizationResources searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="childhealth" className="mt-6">
          <ChildDevelopmentResources searchTerm={searchTerm} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaternalResourceCategories;
