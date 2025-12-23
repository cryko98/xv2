
import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Set these in your Vercel Project Settings as Environment Variables:
// SUPABASE_URL
// SUPABASE_ANON_KEY

// Using placeholders to prevent the "supabaseUrl is required" crash if variables aren't set yet.
const supabaseUrl = (process.env.SUPABASE_URL || 'https://your-project-url.supabase.co').trim();
const supabaseAnonKey = (process.env.SUPABASE_ANON_KEY || 'your-anon-key').trim();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.warn("Supabase credentials missing. App is running with placeholders. Ensure SUPABASE_URL and SUPABASE_ANON_KEY are set in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Initiates Twitter (X) OAuth login flow.
 * Make sure you have Twitter provider enabled in Supabase Auth settings
 * and the callback URL is set to: https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
 */
export const signInWithTwitter = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'twitter',
    options: {
      redirectTo: window.location.origin,
    },
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Error signing out:", error.message);
  return { error };
};
