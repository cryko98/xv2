
import { createClient } from '@supabase/supabase-js';

// Segédfüggvény az adatok biztonságos kinyeréséhez
const fetchEnv = (key: string): string => {
  try {
    // Először megnézzük a window.process-t
    // @ts-ignore
    const val = window.process?.env?.[key] || 
    // Aztán a globális process-t (ha van)
    // @ts-ignore
    (typeof process !== 'undefined' ? process.env?.[key] : '') || '';
    return val.trim();
  } catch (e) {
    return '';
  }
};

const supabaseUrl = fetchEnv('SUPABASE_URL');
const supabaseAnonKey = fetchEnv('SUPABASE_ANON_KEY');

export const isSupabaseConfigured = !!supabaseUrl && supabaseUrl.startsWith('http');

// Akkor is létrehozzuk a klienst, ha nincs adat, de placeholder-rel, hogy ne crasheljen
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-project.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export const signInWithTwitter = async () => {
  if (!isSupabaseConfigured) {
    alert('Konfigurációs hiba: A Supabase URL vagy Kulcs hiányzik!');
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
