import React from 'react';
import StandardPageLayout from '@/components/layout/StandardPageLayout';
import UserProfile from '@/components/UserProfile';

const Profile = () => {
  return (
    <StandardPageLayout 
      title="My Profile" 
      subtitle="Manage your personal information and health preferences"
      backgroundVariant="gradient"
    >
      <div className="max-w-4xl mx-auto">
        <UserProfile />
      </div>
    </StandardPageLayout>
  );
};

export default Profile;