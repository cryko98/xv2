
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { User } from './types';
import Sidebar from './components/Sidebar';
import MainFeed from './components/MainFeed';
import RightBar from './components/RightBar';
import Login from './components/Login';

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(session);
        setUser(session?.user as any || null);
      } catch (e: any) {
        console.error("Auth init error:", e.message);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user as any || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
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
