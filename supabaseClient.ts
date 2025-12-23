
import { createClient } from '@supabase/supabase-js';

// Biztonságos elérés
const getEnvVar = (name: string): string => {
  try {
    // @ts-ignore
    return (window.process?.env?.[name] || '').trim();
  } catch (e) {
    return '';
  }
};

const supabaseUrl = getEnvVar('SUPABASE_URL');
const supabaseAnonKey = getEnvVar('SUPABASE_ANON_KEY');

export const isSupabaseConfigured = !!supabaseUrl && supabaseUrl.startsWith('http');

if (!isSupabaseConfigured) {
  console.warn("Xv2: Supabase URL vagy API kulcs hiányzik. Kérlek ellenőrizd a beállításokat!");
}

// Inicializálás dummy értékekkel, ha hiányozna, hogy ne szálljon el a kód
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

export const signInWithTwitter = async () => {
  if (!isSupabaseConfigured) {
    alert('Nincs beállítva a Supabase! Kérlek add meg a SUPABASE_URL és SUPABASE_ANON_KEY változókat.');
    return;
  }
  return await supabase.auth.signInWithOAuth({
    provider: 'twitter',
    options: { redirectTo: window.location.origin }
  });
};

export const signOut = async () => {
  await supabase.auth.signOut();
  window.location.reload();
};
