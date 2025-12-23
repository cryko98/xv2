
import { createClient } from '@supabase/supabase-js';

// @ts-ignore
const supabaseUrl = (typeof process !== 'undefined' ? process.env?.SUPABASE_URL : '') || '';
// @ts-ignore
const supabaseAnonKey = (typeof process !== 'undefined' ? process.env?.SUPABASE_ANON_KEY : '') || '';

export const isSupabaseConfigured = !!supabaseUrl && supabaseUrl.startsWith('http');

// Fallback URL, hogy a createClient ne dobjon hibát
const safeUrl = isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co';
const safeKey = isSupabaseConfigured ? supabaseAnonKey : 'placeholder';

export const supabase = createClient(safeUrl, safeKey);

export const signInWithTwitter = async () => {
  if (!isSupabaseConfigured) {
    alert('Hiba: Supabase URL vagy Kulcs nincs beállítva!');
    return;
  }
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'twitter',
    options: {
      redirectTo: window.location.origin,
    }
  });
  if (error) console.error("Sign in error:", error.message);
};

export const signOut = async () => {
  await supabase.auth.signOut();
  window.location.reload();
};
