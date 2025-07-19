import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import UserProfile from '@/components/UserProfile';

const Profile = () => {
  return (
    <PageLayout title="My Profile" showBreadcrumbs={true}>
      <div className="max-w-4xl mx-auto">
        <UserProfile />
      </div>
    </PageLayout>
  );
};

export default Profile;