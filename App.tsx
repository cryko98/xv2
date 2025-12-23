
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
    // Ha 3 másodperc alatt nem kapunk választ a Supabase-től, 
    // akkor is megpróbáljuk elindítani az appot (hátha csak a hálózat lassú)
    const timeout = setTimeout(() => {
      if (loading) setLoading(false);
    }, 3000);

    if (!isSupabaseConfigured) {
      setLoading(false);
      clearTimeout(timeout);
      return;
    }

    const init = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(session);
        setUser(session?.user as any || null);
      } catch (e) {
        console.error("Auth initialization failed:", e);
      } finally {
        setLoading(false);
        clearTimeout(timeout);
      }
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user as any || null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <svg viewBox="0 0 24 24" className="h-12 w-12 text-white fill-current animate-pulse">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-10 text-center">
        <div className="max-w-md">
          <svg viewBox="0 0 24 24" className="h-16 w-16 text-[#1d9bf0] fill-current mx-auto mb-6">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <h1 className="text-3xl font-black mb-4 tracking-tight">Üdv az Xv2-ben!</h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            A folytatáshoz be kell állítanod a Supabase környezeti változókat a platformodon.
          </p>
          <div className="bg-[#16181c] p-6 rounded-2xl border border-[#2f3336] text-left">
            <p className="text-sm font-bold text-[#1d9bf0] mb-3 uppercase tracking-wider">Hiányzó adatok:</p>
            <ul className="space-y-2 text-sm font-mono text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> SUPABASE_URL
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> SUPABASE_ANON_KEY
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Login />;
  }

  return (
    <div className="flex justify-center min-h-screen bg-black">
      <div className="flex w-full max-w-[1300px]">
        {/* Sidebar - fixed width on desktop */}
        <div className="w-[80px] lg:w-[275px] h-screen sticky top-0 border-r border-[#2f3336]">
          <Sidebar user={user} />
        </div>
        
        {/* Main Feed */}
        <main className="flex-1 max-w-[600px] min-h-screen border-r border-[#2f3336]">
          <MainFeed user={user} />
        </main>
        
        {/* Right Bar - hidden on mobile/tablet */}
        <div className="hidden lg:block w-[350px] ml-4">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default App;
