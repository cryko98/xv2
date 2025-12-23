
import React from 'react';
import { signInWithTwitter } from '../supabaseClient';

const Login: React.FC = () => {
  return (
    <div className="flex h-screen bg-black text-white font-sans">
      {/* Left side: Large Logo */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 relative">
        <div className="relative">
          <svg viewBox="0 0 24 24" className="h-[380px] w-full text-white fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="absolute bottom-10 right-0 text-7xl font-black text-[#1d9bf0] tracking-tighter">v2</span>
        </div>
      </div>

      {/* Right side: Login forms */}
      <div className="flex flex-1 flex-col justify-center p-8 md:p-12 lg:p-24">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8 lg:hidden">
            <svg viewBox="0 0 24 24" className="h-12 w-12 text-white fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="text-3xl font-black text-[#1d9bf0]">v2</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-12 tracking-tight">Happening now</h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Join today.</h2>
        </div>

        <div className="max-w-[320px] space-y-4">
          {/* Main X Connect Button */}
          <button 
            onClick={() => signInWithTwitter()}
            className="w-full flex items-center justify-center gap-3 bg-[#1d9bf0] text-white py-3 rounded-full font-bold hover:bg-[#1a8cd8] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Connect with X account
          </button>

          <button 
            onClick={() => signInWithTwitter()}
            className="w-full flex items-center justify-center gap-2 bg-white text-black py-2.5 rounded-full font-bold hover:bg-gray-100 transition-colors"
          >
            <img src="https://www.google.com/favicon.ico" alt="google" className="h-4 w-4" />
            Sign up with Google
          </button>
          
          <button className="w-full flex items-center justify-center gap-2 bg-white text-black py-2.5 rounded-full font-bold hover:bg-gray-100 transition-colors">
            <svg viewBox="0 0 384 512" className="h-4 w-4 fill-current"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
            Sign up with Apple
          </button>

          <div className="flex items-center gap-2 py-2">
            <hr className="flex-1 border-gray-800" />
            <span className="text-gray-400">or</span>
            <hr className="flex-1 border-gray-800" />
          </div>

          <button 
            onClick={() => signInWithTwitter()}
            className="w-full border border-gray-700 text-white py-2.5 rounded-full font-bold hover:bg-[#080808] transition-colors"
          >
            Create account
          </button>

          <p className="text-[11px] text-[#71767b] leading-tight">
            By signing up, you agree to the <span className="text-[#1d9bf0]">Terms of Service</span> and <span className="text-[#1d9bf0]">Privacy Policy</span>, including <span className="text-[#1d9bf0]">Cookie Use</span>.
          </p>

          <div className="pt-10">
            <h3 className="font-bold mb-4">Already have an account?</h3>
            <button 
              onClick={() => signInWithTwitter()}
              className="w-full bg-black border border-gray-800 text-[#1d9bf0] py-2.5 rounded-full font-bold hover:bg-[#031018] transition-colors"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
