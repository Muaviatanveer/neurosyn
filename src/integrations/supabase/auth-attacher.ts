import { createMiddleware } from '@tanstack/react-start'

// Attaches bearer token to serverFn RPCs if Supabase is configured and session exists
export const attachSupabaseAuth = createMiddleware({ type: 'function' }).client(
  async ({ next }) => {
    try {
      const SUPABASE_URL =
        (typeof import.meta !== 'undefined' && import.meta.env?.['VITE_SUPABASE_URL']) ||
        (typeof process !== 'undefined' ? process.env?.['SUPABASE_URL'] : undefined);
      const SUPABASE_KEY =
        (typeof import.meta !== 'undefined' && import.meta.env?.['VITE_SUPABASE_PUBLISHABLE_KEY']) ||
        (typeof process !== 'undefined' ? process.env?.['SUPABASE_PUBLISHABLE_KEY'] : undefined);

      if (!SUPABASE_URL || !SUPABASE_KEY) {
        return next();
      }

      const { supabase } = await import('./client');
      const { data } = await supabase.auth.getSession();
      const token = data?.session?.access_token;
      return next({
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
    } catch (e) {
      // Gracefully continue without auth header if session retrieval fails
      return next();
    }
  },
)

