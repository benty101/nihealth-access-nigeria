
import React from 'react';
import { Users, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useUserManagement } from '@/hooks/useUserManagement';
import UserListItem from './UserListItem';
import UserFilters from './UserFilters';

interface UserManagementProps {
  onStatsChange?: () => Promise<void>;
}

const UserManagement = ({ onStatsChange }: UserManagementProps) => {
  const {
    users,
    loading,
    error,
    searchTerm,
    roleFilter,
    setSearchTerm,
    setRoleFilter,
    loadUsers,
    updateUserRole
  } = useUserManagement({ onStatsChange });

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading users...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          User Management
        </CardTitle>
        <CardDescription>
          Manage user roles and permissions across the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={loadUsers}
                className="ml-2 text-red-600 hover:text-red-700"
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <UserFilters
          searchTerm={searchTerm}
          roleFilter={roleFilter}
          onSearchChange={setSearchTerm}
          onRoleFilterChange={setRoleFilter}
        />

        <div className="space-y-4">
          {users.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              onRoleUpdate={updateUserRole}
            />
          ))}
        </div>

        {users.length === 0 && !error && (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No users found matching your criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserManagement;
