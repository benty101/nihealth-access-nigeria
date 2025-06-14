
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Smartphone, X, Download } from 'lucide-react';
import { usePWA } from '@/hooks/use-pwa';

interface PWAInstallBannerProps {
  onDismiss?: () => void;
}

const PWAInstallBanner = ({ onDismiss }: PWAInstallBannerProps) => {
  const { isInstallable, installApp } = usePWA();

  if (!isInstallable) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 p-4 bg-teal-50 border-teal-200 md:left-auto md:right-4 md:w-80">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
            <Smartphone className="h-5 w-5 text-teal-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-teal-900">Install MeddyPal</h3>
            <p className="text-sm text-teal-700">
              Get quick access and save data with our app
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="text-teal-600 hover:text-teal-700"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-3 flex gap-2">
        <Button
          onClick={installApp}
          className="flex-1 bg-teal-600 hover:bg-teal-700 text-sm"
        >
          <Download className="h-4 w-4 mr-2" />
          Install App
        </Button>
        <Button variant="outline" onClick={onDismiss} className="text-sm">
          Not Now
        </Button>
      </div>
    </Card>
  );
};

export default PWAInstallBanner;
