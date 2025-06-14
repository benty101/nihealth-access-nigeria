
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/lib/security';
import { secureLogger } from '@/lib/secureLogger';
import { AuthContextType, AuthProviderProps } from '@/types/auth';
import { AuthService } from '@/services/authService';
import { AuthStorage } from '@/utils/authStorage';
import { ActivityTracker } from '@/utils/activityTracker';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const updateActivity = () => {
    setLastActivity(Date.now());
  };

  const clearAuthState = () => {
    setUser(null);
    setSession(null);
    setLastActivity(Date.now());
  };

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        secureLogger.info('Auth state change', { event, userId: session?.user?.id });
        
        if (event === 'SIGNED_OUT' || !session) {
          clearAuthState();
          secureLogger.auth('user_signed_out');
        } else {
          setSession(session);
          setUser(session?.user ?? null);
          updateActivity();
          secureLogger.auth('user_authenticated', session.user?.id);
        }
        
        setLoading(false);
        
        // Secure logging of auth events
        secureLog('Auth state change', { 
          event, 
          userId: session?.user?.id,
          timestamp: new Date().toISOString()
        });
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      secureLogger.info('Initial session check', { hasSession: !!session });
      
      if (session) {
        setSession(session);
        setUser(session?.user ?? null);
        updateActivity();
        secureLogger.auth('session_restored', session.user?.id);
      } else {
        clearAuthState();
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Activity tracking for session management
  useEffect(() => {
    const activityTracker = new ActivityTracker(updateActivity);
    activityTracker.startTracking();

    return () => {
      activityTracker.stopTracking();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string, phone: string) => {
    secureLogger.auth('signup_attempt', undefined, { email: email.substring(0, 3) + '***' });
    return AuthService.signUp(email, password, fullName, phone);
  };

  const signIn = async (email: string, password: string) => {
    secureLogger.auth('signin_attempt', undefined, { email: email.substring(0, 3) + '***' });
    return AuthService.signIn(email, password);
  };

  const signInWithGoogle = async () => {
    secureLogger.auth('google_oauth_attempt');
    return AuthService.signInWithGoogle();
  };

  const signOut = async () => {
    const currentUserId = user?.id;
    
    // Clear local state immediately to prevent UI issues
    clearAuthState();
    
    // Clear all authentication storage
    AuthStorage.clearAuthStorage();
    
    // Perform actual sign out
    await AuthService.signOut();
    
    secureLogger.auth('user_signed_out', currentUserId);
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    lastActivity,
    updateActivity
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
