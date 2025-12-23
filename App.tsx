
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
    let mounted = true;

    async function getInitialSession() {
      if (!isSupabaseConfigured) {
        if (mounted) setLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted) {
          setSession(session);
          setUser(session?.user as any || null);
        }
      } catch (err) {
        console.error("Auth session fetch error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session);
        setUser(session?.user as any || null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <svg viewBox="0 0 24 24" className="h-10 w-10 text-white fill-current animate-pulse">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6 text-center">
        <svg viewBox="0 0 24 24" className="h-12 w-12 text-[#1d9bf0] fill-current mb-6">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <h1 className="text-2xl font-black mb-2">Supabase konfiguráció szükséges</h1>
        <p className="text-gray-500 mb-8 max-w-sm">
          Az app futtatásához add meg a <b>SUPABASE_URL</b> és <b>SUPABASE_ANON_KEY</b> változókat!
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors"
        >
          Újratöltés
        </button>
      </div>
    );
  }

  if (!session) {
    return <Login />;
  }

  return (
    <div className="flex justify-center min-h-screen bg-black">
      <div className="flex w-full max-w-[1300px]">
        <div className="w-[70px] xl:w-[275px] h-screen sticky top-0 border-r border-[#2f3336]">
          <Sidebar user={user} />
        </div>
        <main className="flex-1 max-w-[600px] min-h-screen border-r border-[#2f3336]">
          <MainFeed user={user} />
        </main>
        <div className="hidden lg:block w-[350px] xl:w-[390px] ml-4">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default App;
