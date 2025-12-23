
import React from 'react';
import { 
  Home, 
  Search, 
  Bell, 
  Mail, 
  SquarePlus, 
  User as UserIcon, 
  Ellipsis
} from 'lucide-react';
import { User } from '../types';
import { signOut } from '../supabaseClient';

interface SidebarProps {
  user: User | null;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const navItems = [
    { name: 'Home', icon: Home, active: true },
    { name: 'Explore', icon: Search },
    { name: 'Notifications', icon: Bell },
    { name: 'Messages', icon: Mail },
    { name: 'Profile', icon: UserIcon },
    { name: 'More', icon: Ellipsis },
  ];

  return (
    <nav className="sticky top-0 h-screen flex flex-col items-center lg:items-start p-2 lg:px-4">
      {/* Logo with v2 */}
      <div className="p-3 mb-2 rounded-full hover:bg-[#181818] cursor-pointer transition-colors w-fit flex items-center gap-1">
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-white fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span className="text-xl font-black text-[#1d9bf0] hidden lg:inline tracking-tighter">v2</span>
      </div>

      {/* Nav Links */}
      <div className="space-y-1 w-full">
        {navItems.map((item) => (
          <div 
            key={item.name} 
            className="flex items-center gap-5 p-3 rounded-full hover:bg-[#181818] cursor-pointer transition-colors w-fit lg:w-full group"
          >
            <item.icon className={`h-7 w-7 ${item.active ? 'text-white' : 'text-[#e7e9ea]'}`} />
            <span className={`hidden lg:block text-xl ${item.active ? 'font-bold' : 'font-normal'}`}>
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Post Button */}
      <button className="mt-4 bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white font-bold py-3 px-8 rounded-full w-fit lg:w-full transition-colors flex items-center justify-center">
        <span className="hidden lg:block">Post</span>
        <SquarePlus className="lg:hidden h-6 w-6" />
      </button>

      {/* User Profile / Logout */}
      <div className="mt-auto mb-4 w-full">
        <button 
          onClick={() => signOut()}
          className="flex items-center gap-3 p-3 rounded-full hover:bg-[#181818] cursor-pointer transition-colors w-full group overflow-hidden"
        >
          <img 
            src={user?.user_metadata?.avatar_url || `https://picsum.photos/seed/${user?.id}/100`} 
            alt="avatar" 
            className="h-10 w-10 rounded-full bg-gray-600 object-cover flex-shrink-0"
          />
          <div className="hidden lg:flex flex-col items-start truncate text-sm">
            <span className="font-bold text-[#e7e9ea] truncate max-w-[120px]">
              {user?.user_metadata?.full_name || 'X User'}
            </span>
            <span className="text-[#71767b] truncate max-w-[120px]">
              @{user?.user_metadata?.user_name || 'user'}
            </span>
          </div>
          <Ellipsis className="hidden lg:block h-5 w-5 text-[#e7e9ea] ml-auto" />
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
