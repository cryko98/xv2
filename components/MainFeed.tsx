
import React, { useState, useEffect, useCallback } from 'react';
import { Image, ListIcon, Smile, Calendar, MapPin, Sparkles } from 'lucide-react';
import { supabase } from '../supabaseClient';
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
      // Fallback data for preview if Supabase is not configured
      setTweets([
        {
          id: '1',
          user_id: 'mock',
          content: 'Xv2 is looking amazing! 🚀 Built with React and Supabase.',
          created_at: new Date().toISOString(),
          likes_count: 42,
          retweets_count: 12,
          profiles: {
            id: 'mock',
            username: 'elonmusk',
            full_name: 'Elon Musk',
            avatar_url: 'https://picsum.photos/seed/elon/100'
          }
        },
        {
          id: '2',
          user_id: 'mock2',
          content: 'Can\'t wait for the community to try this out. Simple, fast, and secure.',
          created_at: new Date(Date.now() - 3600000).toISOString(),
          likes_count: 156,
          retweets_count: 24,
          profiles: {
            id: 'mock2',
            username: 'XV2_Official',
            full_name: 'Xv2 Admin',
            avatar_url: 'https://picsum.photos/seed/xv2/100'
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTweets();
    
    // Subscribe to new tweets
    const subscription = supabase
      .channel('public:tweets')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tweets' }, () => {
        fetchTweets();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [fetchTweets]);

  const handlePost = async () => {
    if (!content.trim() || !user) return;
    
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
      // Even if it fails (e.g. mock environment), clear it for UI feel
      setContent('');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-[#2f3336]">
        <h1 className="text-xl font-bold px-4 py-3">Home</h1>
        <div className="flex w-full border-b border-[#2f3336]">
          <button className="flex-1 py-4 hover:bg-[#181818] transition-colors relative">
            <span className="font-bold">For you</span>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-[#1d9bf0] rounded-full"></div>
          </button>
          <button className="flex-1 py-4 hover:bg-[#181818] transition-colors text-[#71767b]">
            <span>Following</span>
          </button>
        </div>
      </div>

      {/* Tweet Input Area */}
      <div className="p-4 border-b border-[#2f3336] flex gap-3">
        <img 
          src={user?.user_metadata?.avatar_url || `https://picsum.photos/seed/${user?.id}/100`} 
          alt="User avatar" 
          className="h-10 w-10 rounded-full bg-gray-600 object-cover flex-shrink-0"
        />
        <div className="flex flex-col w-full">
          <textarea
            placeholder="What is happening?!"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-transparent text-xl outline-none resize-none min-h-[50px] mt-1 placeholder:text-[#71767b]"
            rows={2}
          />
          <div className="flex items-center justify-between mt-4 border-t border-[#2f3336] pt-3">
            <div className="flex items-center gap-1 text-[#1d9bf0]">
              <button className="p-2 hover:bg-[#1d9bf01a] rounded-full transition-colors"><Image size={20} /></button>
              <button className="p-2 hover:bg-[#1d9bf01a] rounded-full transition-colors"><ListIcon size={20} /></button>
              <button className="p-2 hover:bg-[#1d9bf01a] rounded-full transition-colors"><Smile size={20} /></button>
              <button className="p-2 hover:bg-[#1d9bf01a] rounded-full transition-colors"><Calendar size={20} /></button>
              <button className="p-2 hover:bg-[#1d9bf01a] rounded-full transition-colors"><MapPin size={20} /></button>
            </div>
            <button
              disabled={!content.trim() || isPosting}
              onClick={handlePost}
              className="bg-[#1d9bf0] hover:bg-[#1a8cd8] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-full transition-colors"
            >
              {isPosting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>

      {/* Feed List */}
      <div className="flex flex-col">
        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1d9bf0]"></div>
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
