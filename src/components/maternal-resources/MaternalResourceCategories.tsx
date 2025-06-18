
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
      <Tabs defaultValue="pregnancy" value={getActiveTab()} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8 bg-gray-50 p-1 rounded-lg h-12">
          <TabsTrigger 
            value="pregnancy" 
            className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm transition-all duration-200 hover:bg-gray-100"
          >
            Pregnancy Care
          </TabsTrigger>
          <TabsTrigger 
            value="childbirth" 
            className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm transition-all duration-200 hover:bg-gray-100"
          >
            Childbirth
          </TabsTrigger>
          <TabsTrigger 
            value="newborn" 
            className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm transition-all duration-200 hover:bg-gray-100"
          >
            Newborn Care
          </TabsTrigger>
          <TabsTrigger 
            value="nutrition" 
            className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm transition-all duration-200 hover:bg-gray-100"
          >
            Nutrition
          </TabsTrigger>
          <TabsTrigger 
            value="immunization" 
            className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm transition-all duration-200 hover:bg-gray-100"
          >
            Immunization
          </TabsTrigger>
          <TabsTrigger 
            value="childhealth" 
            className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm transition-all duration-200 hover:bg-gray-100"
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
