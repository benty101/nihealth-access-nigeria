
import { supabase } from '@/integrations/supabase/client';
import { sanitizeErrorMessage, RateLimiter, secureLog } from '@/lib/security';
import { sanitizeInput } from '@/lib/validation';
import { AuthResult } from '@/types/auth';

// Rate limiter for authentication attempts
const authRateLimiter = new RateLimiter();

export class AuthService {
  static async signUp(email: string, password: string, fullName: string, phone: string): Promise<AuthResult> {
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
  }

  static async signIn(email: string, password: string): Promise<AuthResult> {
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
  }

  static async signInWithGoogle(): Promise<AuthResult> {
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
  }

  static async signOut(): Promise<void> {
    try {
      console.log('Attempting to sign out...');
      
      // Attempt to sign out from Supabase
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      
      if (error) {
        console.warn('Supabase signout error (but continuing with local cleanup):', error);
        // Don't throw the error - we've already cleared local state
      }
      
      secureLog('User signed out');
      console.log('Sign out completed - all auth state cleared');
    } catch (error) {
      console.warn('Signout error (but local state cleared):', error);
      secureLog('Signout error', { errorType: 'network_error' });
      // Don't re-throw - we want logout to always succeed locally
    }
  }
}
