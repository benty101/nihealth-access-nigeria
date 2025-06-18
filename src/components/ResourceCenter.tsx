
import React, { useState } from 'react';
import ResourceHeader from '@/components/resources/ResourceHeader';
import ResourceSearch from '@/components/resources/ResourceSearch';
import ResourceTabs from '@/components/resources/ResourceTabs';

const ResourceCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ResourceHeader />
        <ResourceSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ResourceTabs searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default ResourceCenter;
