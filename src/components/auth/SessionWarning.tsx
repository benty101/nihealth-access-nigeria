
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface SessionWarningProps {
  show: boolean;
}

const SessionWarning = ({ show }: SessionWarningProps) => {
  if (!show) return null;

  return (
    <Alert className="mb-4 border-yellow-200 bg-yellow-50">
      <AlertCircle className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="text-yellow-800">
        Your session will expire soon. Please save any work and refresh the page to continue.
      </AlertDescription>
    </Alert>
  );
};

export default SessionWarning;
