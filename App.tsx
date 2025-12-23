
import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { User } from './types';
import Sidebar from './components/Sidebar';
import MainFeed from './components/MainFeed';
import RightBar from './components/RightBar';
import Login from './components/Login';

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user as any || null);
      } catch (e) {
        console.error("Auth error:", e);
      } finally {
        setLoading(false);
      }
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user as any || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <svg viewBox="0 0 24 24" className="h-12 w-12 text-[#1d9bf0] fill-current animate-pulse">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
    );
  }

  // Ha nincs konfigurálva, mutassunk egy barátságos hibaüzenetet a fekete kép helyett
  if (!isSupabaseConfigured) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-10 text-center">
        <div className="mb-6">
           <svg viewBox="0 0 24 24" className="h-16 w-16 text-red-500 fill-current mx-auto mb-4">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <h1 className="text-3xl font-bold mb-2">Konfigurációs hiba</h1>
          <p className="text-gray-400">A SUPABASE_URL vagy a SUPABASE_ANON_KEY hiányzik a környezeti változók közül.</p>
        </div>
        <div className="bg-[#16181c] p-6 rounded-2xl border border-gray-800 max-w-lg text-left">
          <p className="text-sm mb-2 font-bold text-[#1d9bf0]">Mit tegyél?</p>
          <ol className="list-decimal list-inside text-sm text-gray-300 space-y-2">
            <li>Menj a Vercel/Platform <b>Settings</b> menüjébe.</li>
            <li>Keresd az <b>Environment Variables</b> fület.</li>
            <li>Add hozzá: <code>SUPABASE_URL</code></li>
            <li>Add hozzá: <code>SUPABASE_ANON_KEY</code></li>
            <li>Indítsd újra a <b>Deployment</b>-et!</li>
          </ol>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Login />;
  }

  return (
    <div className="flex flex-col md:flex-row justify-center min-h-screen bg-black max-w-7xl mx-auto">
      <div className="w-full md:w-auto md:flex-1 lg:max-w-[275px] border-r border-[#2f3336]">
        <Sidebar user={user} />
      </div>
      <main className="w-full md:w-[600px] border-r border-[#2f3336]">
        <MainFeed user={user} />
      </main>
      <div className="hidden lg:block w-[350px] pl-8">
        <RightBar />
      </div>
    </div>
  );
};

export default App;
