import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Authentication will be mocked.');
}

// Create a singleton instance
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',  // Prevent empty string initialization
  supabaseAnonKey || 'placeholder',  // Prevent empty string initialization
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      debug: process.env.NODE_ENV === 'development'
    }
  }
);