
import { User, Session } from '@supabase/supabase-js';

export interface AuthContextType {
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

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthError {
  message: string;
}

export interface AuthResult {
  error: AuthError | null;
}
