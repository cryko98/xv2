
import React, { useState, useEffect, useCallback } from 'react';
import { Image, ListIcon, Smile, Calendar, MapPin, Sparkles } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { User, Tweet } from '../types';
import TweetCard from './Tweet';

interface MainFeedProps {
  user: User | null;
}

const MainFeed: React.FC<MainFeedProps> = ({ user }) => {
  const [content, setContent] = useState('');
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);

  const fetchTweets = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('tweets')
        .select(`
          *,
          profiles:user_id (id, username, full_name, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTweets(data || []);
    } catch (err) {
      console.error('Error fetching tweets:', err);
      // Fallback ha nincs tábla vagy hiba van
      setTweets([
        {
          id: '1',
          user_id: 'mock',
          content: 'Üdv az Xv2-n! 🚀 Ez a feed jelenleg demó üzemmódban fut, amíg az adatbázisod nem áll készen.',
          created_at: new Date().toISOString(),
          likes_count: 999,
          retweets_count: 123,
          profiles: {
            id: 'mock',
            username: 'elonmusk',
            full_name: 'Elon Musk',
            avatar_url: 'https://pbs.twimg.com/profile_images/1780044483309211648/00_S2_F2_400x400.jpg'
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTweets();
    
    if (isSupabaseConfigured) {
      const subscription = supabase
        .channel('public:tweets')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tweets' }, () => {
          fetchTweets();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [fetchTweets]);

  const handlePost = async () => {
    if (!content.trim() || !user || !isSupabaseConfigured) return;
    
    setIsPosting(true);
    try {
      const { error } = await supabase.from('tweets').insert([
        {
          user_id: user.id,
          content: content.trim(),
        },
      ]);

      if (error) throw error;
      setContent('');
      fetchTweets();
    } catch (err) {
      console.error('Error posting tweet:', err);
      alert("Nem sikerült a posztolás. Ellenőrizd az SQL táblákat!");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-[#2f3336]">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold">Home</h1>
        </div>
        <div className="flex w-full border-b border-[#2f3336]">
          <button className="flex-1 py-4 hover:bg-[#181818] transition-colors relative flex justify-center">
            <span className="font-bold text-[#e7e9ea]">For you</span>
            <div className="absolute bottom-0 w-14 h-1 bg-[#1d9bf0] rounded-full"></div>
          </button>
          <button className="flex-1 py-4 hover:bg-[#181818] transition-colors text-[#71767b] font-medium">
            Following
          </button>
        </div>
      </div>

      {/* Tweet Input */}
      <div className="p-4 border-b border-[#2f3336] flex gap-3">
        <img 
          src={user?.user_metadata?.avatar_url || `https://picsum.photos/seed/${user?.id}/100`} 
          alt="Avatar" 
          className="h-10 w-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex flex-col w-full">
          <textarea
            placeholder="What is happening?!"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-transparent text-[20px] leading-6 outline-none resize-none min-h-[50px] mt-2 placeholder:text-[#71767b]"
            rows={2}
          />
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#2f3336]">
            <div className="flex items-center gap-1 text-[#1d9bf0]">
              <button className="p-2 hover:bg-[#1d9bf01a] rounded-full transition-colors"><Image size={18} /></button>
              <button className="p-2 hover:bg-[#1d9bf01a] rounded-full transition-colors"><ListIcon size={18} /></button>
              <button className="p-2 hover:bg-[#1d9bf01a] rounded-full transition-colors"><Smile size={18} /></button>
              <button className="p-2 hover:bg-[#1d9bf01a] rounded-full transition-colors"><Calendar size={18} /></button>
              <button className="p-2 hover:bg-[#1d9bf01a] rounded-full transition-colors opacity-50"><MapPin size={18} /></button>
            </div>
            <button
              disabled={!content.trim() || isPosting}
              onClick={handlePost}
              className="bg-[#1d9bf0] hover:bg-[#1a8cd8] disabled:bg-[#1d9bf0]/50 disabled:text-white/50 text-white font-bold py-1.5 px-5 rounded-full transition-colors"
            >
              {isPosting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>

      {/* Tweets */}
      <div className="flex flex-col">
        {loading ? (
          <div className="p-12 flex justify-center">
            <div className="animate-spin rounded-full h-7 w-7 border-2 border-[#1d9bf0] border-t-transparent"></div>
          </div>
        ) : (
          tweets.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))
        )}
      </div>
    </div>
  );
};

export default MainFeed;
