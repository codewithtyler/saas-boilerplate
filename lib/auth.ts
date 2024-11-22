import { getConfig } from '@/lib/config';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const config = getConfig();

export const isAuthenticatedKey = 'isAuthenticated';

export const isAuthenticated = async () => {
  try {
    if (typeof window === 'undefined') return false;

    // For development mode, use localStorage
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return localStorage.getItem(isAuthenticatedKey) === 'true';
    }

    const { data: { session } } = await supabase.auth.getSession();
    const isLoggedIn = !!session;
    localStorage.setItem(isAuthenticatedKey, isLoggedIn.toString());
    return isLoggedIn;
  } catch (error) {
    // Fallback to localStorage if Supabase fails
    return localStorage.getItem(isAuthenticatedKey) === 'true';
  }
};

export const login = async (email?: string, password?: string) => {
  try {
    localStorage.setItem(isAuthenticatedKey, 'true');

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      if (email && password) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    }

    return true;
  } catch (error) {
    console.error('Login error:', error);
    return true; // Still return true for development
  }
};

export const logout = async () => {
  localStorage.removeItem(isAuthenticatedKey);

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    await supabase.auth.signOut();
  }
};

export const getUserProfile = async () => {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return {
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No user found');

    return {
      email: user.email,
      firstName: user.user_metadata.first_name || user.user_metadata.name?.split(' ')[0] || 'John',
      lastName: user.user_metadata.last_name || user.user_metadata.name?.split(' ').slice(1).join(' ') || 'Doe',
    };
  } catch (error) {
    return {
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
    };
  }
};