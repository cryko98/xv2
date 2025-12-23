
import { createClient } from '@supabase/supabase-js';

// Közvetlen elérés a process.env-ből, mert a platformok többsége ide injektálja
// @ts-ignore
const supabaseUrl = (typeof process !== 'undefined' ? process.env?.SUPABASE_URL : '') || '';
// @ts-ignore
const supabaseAnonKey = (typeof process !== 'undefined' ? process.env?.SUPABASE_ANON_KEY : '') || '';

export const isSupabaseConfigured = !!supabaseUrl && supabaseUrl.startsWith('http');

// Ha nincs konfigurálva, egy érvénytelen URL-t adunk meg, de a kliens ne crasheljen
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://missing.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'missing-key'
);

export const signInWithTwitter = async () => {
  if (!isSupabaseConfigured) {
    alert('Hiba: Supabase nincs konfigurálva!');
    return;
  }
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'twitter',
    options: { redirectTo: window.location.origin }
  });
  if (error) console.error(error);
};

export const signOut = async () => {
  await supabase.auth.signOut();
  window.location.reload();
};
