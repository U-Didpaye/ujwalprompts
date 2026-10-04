import React from 'react';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square max-h-[340px] flex items-center justify-center pointer-events-none select-none">
      {/* Outer atmospheric glowing ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-600/20 via-violet-500/10 to-transparent blur-3xl animate-pulse-subtle" />

      {/* Orbiting Orbital Rings */}
      <svg className="w-full h-full text-indigo-500/30" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" className="animate-spin-slow origin-center" />
        <circle cx="200" cy="200" r="120" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="80" stroke="rgba(168, 85, 247, 0.5)" strokeWidth="1" strokeDasharray="4 4" />
        
        {/* Sculptural Nodes representing hidden variables */}
        <circle cx="200" cy="40" r="5" fill="#818cf8" className="animate-ping" />
        <circle cx="320" cy="200" r="4" fill="#a855f7" />
        <circle cx="80" cy="200" r="6" fill="#38bdf8" />
        <circle cx="200" cy="320" r="5" fill="#818cf8" />
        <line x1="80" y1="200" x2="320" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="200" y1="40" x2="200" y2="320" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      </svg>

      {/* Central Glass Intelligence Core */}
      <div className="absolute w-28 h-28 rounded-3xl bg-gradient-to-tr from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/40 shadow-2xl flex items-center justify-center backdrop-blur-xl group">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-400/40 flex items-center justify-center relative">
          {/* Eye / Prism Pupil */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 via-violet-400 to-indigo-600 shadow-lg shadow-indigo-500/50 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
