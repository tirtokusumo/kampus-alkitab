import { createClient } from '@supabase/supabase-js';

// Load environment variables from Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fail gracefully if variables aren't provided yet
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase URL or Anon Key is missing. Using placeholder client. Authentication will not work properly.');
}

// Create real client if variables exist, else mock
export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : { 
        // Minimal mock to prevent instant crashing before setup
        auth: {
          getUser: async () => ({ data: { user: null }, error: null }),
          signInWithPassword: async () => ({ data: null, error: { message: "Supabase not configured yet. Please check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY." } }),
          signUp: async () => ({ data: null, error: { message: "Supabase not configured yet. Please check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY." } }),
          signOut: async () => ({ error: null }),
          onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
        },
        from: () => ({
          select: () => ({ data: [], error: null }),
          insert: () => ({ data: null, error: null })
        })
      };
