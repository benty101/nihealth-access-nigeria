
import React, { useState } from 'react';
import MaternalResourceHeader from '@/components/maternal-resources/MaternalResourceHeader';
import MaternalResourceSearch from '@/components/maternal-resources/MaternalResourceSearch';
import MaternalResourceCategories from '@/components/maternal-resources/MaternalResourceCategories';
import FeaturedResources from '@/components/maternal-resources/FeaturedResources';

const MaternalResourceCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MaternalResourceHeader />
        
        {/* Search and Filters */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border p-6">
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
