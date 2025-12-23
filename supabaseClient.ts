
import { createClient } from '@supabase/supabase-js';

// Segédfüggvény a környezeti változók kinyeréséhez
const getEnv = (key: string) => {
  try {
    // @ts-ignore
    const value = typeof process !== 'undefined' ? process.env[key] : null;
    return value || '';
  } catch (e) {
    return '';
  }
};

const supabaseUrl = getEnv('SUPABASE_URL').trim();
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY').trim();

// Fix: Export a flag to check if Supabase is properly configured without accessing protected client properties
export const isSupabaseConfigured = !!supabaseUrl && !supabaseUrl.includes('missing-url');

// Ha hiányoznak a kulcsok, egy dummy klienst hozunk létre, de jelezzük a konzolon
if (!isSupabaseConfigured) {
  console.error("HIÁNYZÓ SUPABASE BEÁLLÍTÁSOK! Ellenőrizd a Vercel Environment Variables fület.");
}

export const supabase = createClient(
  supabaseUrl || 'https://missing-url.supabase.co', 
  supabaseAnonKey || 'missing-key'
);

export const signInWithTwitter = async () => {
  if (!isSupabaseConfigured) {
    alert('Hiba: A Supabase URL nincs beállítva! Kérlek add meg a Vercel-en a SUPABASE_URL változót.');
    return { error: new Error('Missing URL') };
  }
  
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
  return { error };
};
