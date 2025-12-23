
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
  const [configError, setConfigError] = useState(false);

  useEffect(() => {
    // Fix: Using the exported isSupabaseConfigured constant instead of accessing protected supabase.supabaseUrl
    if (!isSupabaseConfigured) {
      setConfigError(true);
      setLoading(false);
      return;
    }

    const initSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(session);
        setUser(session?.user as any || null);
      } catch (e: any) {
        console.error("Auth error:", e.message);
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
          <path d="M18.244 2.25h3.30