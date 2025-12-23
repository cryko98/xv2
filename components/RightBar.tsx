
import React from 'react';
import { Search, MoreHorizontal } from 'lucide-react';

const RightBar: React.FC = () => {
  const trends = [
    { category: 'Technology · Trending', title: '#Xv2Launch', posts: '125K posts' },
    { category: 'Trending in Hungary', title: 'React 19', posts: '45.2K posts' },
    { category: 'Entertainment · Trending', title: 'Super Bowl LIX', posts: '2M posts' },
    { category: 'Business & Finance', title: '$TSLA', posts: '28.1K posts' },
    { category: 'News · Trending', title: 'Mars Mission', posts: '12K posts' },
  ];

  return (
    <div className="sticky top-0 py-2 space-y-4">
      {/* Search */}
      <div className="sticky top-0 bg-black pt-1 pb-3">
        <div className="relative group">
          <Search 
            size={18} 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71767b] group-focus-within:text-[#1d9bf0]" 
          />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-[#202327] rounded-full py-3 pl-12 pr-4 outline-none border border-transparent focus:border-[#1d9bf0] focus:bg-transparent transition-colors"
          />
        </div>
      </div>

      {/* Trending Box */}
      <div className="bg-[#16181c] rounded-2xl overflow-hidden">
        <h2 className="text-xl font-bold px-4 py-3">What's happening</h2>
        {trends.map((trend, i) => (
          <div 
            key={i} 
            className="px-4 py-3 hover:bg-[#1d1f23] transition-colors cursor-pointer flex justify-between group"
          >
            <div>
              <p className="text-xs text-[#71767b]">{trend.category}</p>
              <p className="font-bold">{trend.title}</p>
              <p className="text-xs text-[#71767b]">{trend.posts}</p>
            </div>
            <MoreHorizontal size={16} className="text-[#71767b] group-hover:text-[#1d9bf0]" />
          </div>
        ))}
        <button className="w-full text-left px-4 py-4 text-[#1d9bf0] hover:bg-[#1d1f23] transition-colors">
          Show more
        </button>
      </div>

      {/* Who to follow */}
      <div className="bg-[#16181c] rounded-2xl overflow-hidden">
        <h2 className="text-xl font-bold px-4 py-3">Who to follow</h2>
        {[1, 2, 3].map((num) => (
          <div key={num} className="px-4 py-3 hover:bg-[#1d1f23] transition-colors cursor-pointer flex items-center justify-between">
            <div className="flex gap-2">
              <img 
                src={`https://picsum.photos/seed/user${num}/100`} 
                alt="user" 
                className="h-10 w-10 rounded-full"
              />
              <div className="flex flex-col text-sm">
                <span className="font-bold hover:underline">User {num}</span>
                <span className="text-[#71767b]">@user_{num}</span>
              </div>
            </div>
            <button className="bg-white text-black font-bold py-1.5 px-4 rounded-full hover:bg-[#d7dbdc] transition-colors">
              Follow
            </button>
          </div>
        ))}
        <button className="w-full text-left px-4 py-4 text-[#1d9bf0] hover:bg-[#1d1f23] transition-colors">
          Show more
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 text-xs text-[#71767b] flex flex-wrap gap-2 leading-tight">
        <span>Terms of Service</span>
        <span>Privacy Policy</span>
        <span>Cookie Policy</span>
        <span>Accessibility</span>
        <span>Ads info</span>
        <span>More...</span>
        <span>© 2024 X Corp (Xv2 Clone)</span>
      </div>
    </div>
  );
};

export default RightBar;
