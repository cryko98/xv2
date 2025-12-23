
import { createClient } from '@supabase/supabase-js';

// Vercel környezeti változók kezelése biztonságosan
const getEnv = (key: string) => {
  try {
    // @ts-ignore
    return (typeof process !== 'undefined' && process.env && process.env[key]) || '';
  } catch (e) {
    return '';
  }
};

const supabaseUrl = getEnv('SUPABASE_URL').trim() || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY').trim() || 'placeholder-key';

// Csak akkor inicializálunk, ha érvényesnek tűnnek a kulcsok
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signInWithTwitter = async () => {
  if (supabaseUrl.includes('placeholder')) {
    alert('Hiba: Supabase URL nincs beállítva a Vercel-en!');
    return { error: new Error('Missing Supabase URL') };
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
  if (error) console.error("Error signing out:", error.message);
  return { error };
};
