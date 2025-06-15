
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { isSessionExpired, shouldShowWarning } from '@/lib/security';
import { SuperAdminSeeder } from '@/services/SuperAdminSeeder';
import { secureLogger } from '@/lib/secureLogger';

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { user, loading, lastActivity } = useAuth();
  const [showSessionWarning, setShowSessionWarning] = useState(false);

  // SECURITY: Super admin seeding is now disabled for production security
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const superAdminCreated = localStorage.getItem('superAdminCreated');
      
      if (!superAdminCreated) {
        SuperAdminSeeder.createSuperAdmin().then((result) => {
          if (result.success) {
            secureLogger.admin('super_admin_seeding_completed_securely');
            localStorage.setItem('superAdminCreated', 'true');
          } else {
            secureLogger.error('Super admin seeding failed securely', result.error);
          }
        });
      }
    }
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !loading) {
      secureLogger.auth('authenticated_user_secure_redirect', user.id);
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  // Enhanced session timeout monitoring
  useEffect(() => {
    if (!user) return;

    const checkSession = () => {
      if (isSessionExpired(lastActivity)) {
        setShowSessionWarning(false);
        secureLogger.auth('session_expired_security_logout', user.id);
        navigate('/auth');
        return;
      }

      if (shouldShowWarning(lastActivity)) {
        setShowSessionWarning(true);
        secureLogger.auth('session_warning_shown_security', user.id);
      } else {
        setShowSessionWarning(false);
      }
    };

    const interval = setInterval(checkSession, 60000);
    return () => clearInterval(interval);
  }, [user, lastActivity, navigate]);

  return {
    showSessionWarning
  };
};
