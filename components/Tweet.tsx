
import React from 'react';
import { MessageCircle, Repeat2, Heart, Share, BarChart2, MoreHorizontal } from 'lucide-react';
import { Tweet } from '../types';

interface TweetProps {
  tweet: Tweet;
}

const TweetCard: React.FC<TweetProps> = ({ tweet }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="p-4 border-b border-[#2f3336] hover:bg-[#080808] transition-colors cursor-pointer group">
      <div className="flex gap-3">
        {/* Profile Pic */}
        <div className="flex-shrink-0">
          <img 
            src={tweet.profiles?.avatar_url || `https://picsum.photos/seed/${tweet.profiles?.username}/100`} 
            alt="avatar" 
            className="h-10 w-10 rounded-full bg-gray-600 object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="font-bold hover:underline text-[#e7e9ea]">
                {tweet.profiles?.full_name || 'User'}
              </span>
              <span className="text-[#71767b]">
                @{tweet.profiles?.username || 'user'} · {formatDate(tweet.created_at)}
              </span>
            </div>
            <button className="p-2 hover:bg-[#1d9bf01a] hover:text-[#1d9bf0] rounded-full transition-colors">
              <MoreHorizontal size={16} className="text-[#71767b]" />
            </button>
          </div>

          <p className="mt-1 text-[#e7e9ea] whitespace-pre-wrap leading-tight">
            {tweet.content}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-3 text-[#71767b] -ml-2">
            <div className="flex items-center gap-1 group/reply hover:text-[#1d9bf0] transition-colors p-2 rounded-full cursor-pointer">
              <div className="p-1 group-hover/reply:bg-[#1d9bf01a] rounded-full transition-colors">
                <MessageCircle size={18} />
              </div>
              <span className="text-xs">0</span>
            </div>
            <div className="flex items-center gap-1 group/rt hover:text-[#00ba7c] transition-colors p-2 rounded-full cursor-pointer">
              <div className="p-1 group-hover/rt:bg-[#00ba7c1a] rounded-full transition-colors">
                <Repeat2 size={18} />
              </div>
              <span className="text-xs">{tweet.retweets_count || 0}</span>
            </div>
            <div className="flex items-center gap-1 group/like hover:text-[#f91880] transition-colors p-2 rounded-full cursor-pointer">
              <div className="p-1 group-hover/like:bg-[#f918801a] rounded-full transition-colors">
                <Heart size={18} />
              </div>
              <span className="text-xs">{tweet.likes_count || 0}</span>
            </div>
            <div className="flex items-center gap-1 group/stat hover:text-[#1d9bf0] transition-colors p-2 rounded-full cursor-pointer">
              <div className="p-1 group-hover/stat:bg-[#1d9bf01a] rounded-full transition-colors">
                <BarChart2 size={18} />
              </div>
              <span className="text-xs">1.2K</span>
            </div>
            <div className="flex items-center group/share hover:text-[#1d9bf0] transition-colors p-2 rounded-full cursor-pointer">
              <div className="p-1 group-hover/share:bg-[#1d9bf01a] rounded-full transition-colors">
                <Share size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
