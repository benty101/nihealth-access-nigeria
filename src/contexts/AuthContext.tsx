
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeErrorMessage, RateLimiter, secureLog } from '@/lib/security';
import { sanitizeInput } from '@/lib/validation';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, phone: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  lastActivity: number;
  updateActivity: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

// Rate limiter for authentication attempts
const authRateLimiter = new RateLimiter();

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const updateActivity = () => {
    setLastActivity(Date.now());
  };

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        updateActivity();
        
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
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session) {
        updateActivity();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Activity tracking for session management
  useEffect(() => {
    const handleActivity = () => updateActivity();
    
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string, phone: string) => {
    try {
      // Rate limiting check
      if (!authRateLimiter.canAttempt(`signup_${email}`)) {
        const remainingTime = authRateLimiter.getRemainingTime(`signup_${email}`);
        secureLog('Signup rate limited', { email: email.substring(0, 3) + '***' });
        return { 
          error: { 
            message: `Too many signup attempts. Please try again in ${Math.ceil(remainingTime / 60000)} minutes.` 
          } 
        };
      }

      // Input sanitization
      const sanitizedEmail = sanitizeInput(email.toLowerCase().trim());
      const sanitizedFullName = sanitizeInput(fullName.trim());
      const sanitizedPhone = sanitizeInput(phone.trim());

      const redirectUrl = `${window.location.origin}/dashboard`;
      
      const { error } = await supabase.auth.signUp({
        email: sanitizedEmail,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: sanitizedFullName,
            phone: sanitizedPhone
          }
        }
      });

      if (error) {
        secureLog('Signup failed', { 
          email: email.substring(0, 3) + '***',
          errorType: error.message.substring(0, 20)
        });
      } else {
        secureLog('Signup successful', { 
          email: email.substring(0, 3) + '***'
        });
      }

      return { error: error ? { message: sanitizeErrorMessage(error) } : null };
    } catch (error) {
      secureLog('Signup error', { errorType: 'network_error' });
      return { error: { message: sanitizeErrorMessage(error) } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Rate limiting check
      if (!authRateLimiter.canAttempt(`signin_${email}`)) {
        const remainingTime = authRateLimiter.getRemainingTime(`signin_${email}`);
        secureLog('Signin rate limited', { email: email.substring(0, 3) + '***' });
        return { 
          error: { 
            message: `Too many login attempts. Please try again in ${Math.ceil(remainingTime / 60000)} minutes.` 
          } 
        };
      }

      // Input sanitization
      const sanitizedEmail = sanitizeInput(email.toLowerCase().trim());

      const { error } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
        password
      });

      if (error) {
        secureLog('Signin failed', { 
          email: email.substring(0, 3) + '***',
          errorType: error.message.substring(0, 20)
        });
      } else {
        secureLog('Signin successful', { 
          email: email.substring(0, 3) + '***'
        });
      }

      return { error: error ? { message: sanitizeErrorMessage(error) } : null };
    } catch (error) {
      secureLog('Signin error', { errorType: 'network_error' });
      return { error: { message: sanitizeErrorMessage(error) } };
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Rate limiting for OAuth attempts
      if (!authRateLimiter.canAttempt('google_oauth')) {
        const remainingTime = authRateLimiter.getRemainingTime('google_oauth');
        secureLog('Google OAuth rate limited');
        return { 
          error: { 
            message: `Too many OAuth attempts. Please try again in ${Math.ceil(remainingTime / 60000)} minutes.` 
          } 
        };
      }

      const redirectUrl = `${window.location.origin}/dashboard`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl
        }
      });

      if (error) {
        secureLog('Google OAuth failed', { errorType: error.message.substring(0, 20) });
      } else {
        secureLog('Google OAuth initiated');
      }

      return { error: error ? { message: sanitizeErrorMessage(error) } : null };
    } catch (error) {
      secureLog('Google OAuth error', { errorType: 'network_error' });
      return { error: { message: sanitizeErrorMessage(error) } };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      secureLog('User signed out');
    } catch (error) {
      secureLog('Signout error', { errorType: 'network_error' });
    }
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
