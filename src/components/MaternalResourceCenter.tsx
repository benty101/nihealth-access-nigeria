
import React, { useState } from 'react';
import MaternalResourceHeader from '@/components/maternal-resources/MaternalResourceHeader';
import MaternalResourceSearch from '@/components/maternal-resources/MaternalResourceSearch';
import MaternalResourceCategories from '@/components/maternal-resources/MaternalResourceCategories';
import QuickAccessTools from '@/components/maternal-resources/QuickAccessTools';
import FeaturedResources from '@/components/maternal-resources/FeaturedResources';
import EmergencyResources from '@/components/maternal-resources/EmergencyResources';

const MaternalResourceCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="py-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MaternalResourceHeader />
        
        {/* Quick Access Tools */}
        <QuickAccessTools />
        
        {/* Emergency Resources Banner */}
        <EmergencyResources />
        
        {/* Search and Filters */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <MaternalResourceSearch 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Featured Resources */}
        <FeaturedResources />
        
        {/* Main Resource Categories */}
        <MaternalResourceCategories 
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
};

export default MaternalResourceCenter;
