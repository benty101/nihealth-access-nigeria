
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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <Tabs value={getActiveTab()} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="pregnancy" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white">
            Pregnancy Care
          </TabsTrigger>
          <TabsTrigger value="childbirth" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">
            Childbirth
          </TabsTrigger>
          <TabsTrigger value="newborn" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
            Newborn Care
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">
            Nutrition
          </TabsTrigger>
          <TabsTrigger value="immunization" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white">
            Immunization
          </TabsTrigger>
          <TabsTrigger value="childhealth" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
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
