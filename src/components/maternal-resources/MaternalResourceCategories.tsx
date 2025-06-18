
import React from 'react';
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
  // Filter which sections to show based on selected category
  const shouldShowSection = (category: string) => {
    return selectedCategory === 'all' || selectedCategory === category;
  };

  return (
    <div className="space-y-12">
      {shouldShowSection('pregnancy') && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <PregnancyCareResources searchTerm={searchTerm} />
        </div>
      )}

      {shouldShowSection('childbirth') && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <ChildbirthResources searchTerm={searchTerm} />
        </div>
      )}

      {shouldShowSection('newborn') && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <NewbornCareResources searchTerm={searchTerm} />
        </div>
      )}

      {shouldShowSection('nutrition') && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <NutritionResources searchTerm={searchTerm} />
        </div>
      )}

      {shouldShowSection('immunization') && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <ImmunizationResources searchTerm={searchTerm} />
        </div>
      )}

      {shouldShowSection('childhealth') && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <ChildDevelopmentResources searchTerm={searchTerm} />
        </div>
      )}
    </div>
  );
};

export default MaternalResourceCategories;
