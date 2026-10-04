import React from 'react';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square max-h-[320px] flex items-center justify-center pointer-events-none select-none">
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute inset-0 rounded-full bg-[#C7F36B]/5 blur-3xl" />

      {/* Thought Structure Geometric Lines */}
      <svg className="w-full h-full text-[#A4A7A3]/20" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="200" cy="200" r="100" stroke="rgba(199, 243, 107, 0.25)" strokeWidth="1" />
        <circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
        
        {/* Signal Lines */}
        <line x1="50" y1="200" x2="350" y2="200" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" />
        <line x1="200" y1="50" x2="200" y2="350" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" />
        <line x1="94" y1="94" x2="306" y2="306" stroke="rgba(199, 243, 107, 0.15)" strokeWidth="1" />
        
        {/* Nodes */}
        <circle cx="94" cy="94" r="4" fill="#C7F36B" />
        <circle cx="306" cy="306" r="4" fill="#A4A7A3" />
        <circle cx="200" cy="50" r="3" fill="#C7F36B" />
        <circle cx="350" cy="200" r="3" fill="#A4A7A3" />
      </svg>

      {/* Central Glass Intelligence Core */}
      <div className="absolute w-24 h-24 rounded-2xl bg-[#111313] border border-white/10 shadow-2xl flex items-center justify-center backdrop-blur-md">
        <div className="w-12 h-12 rounded-xl bg-[#151717] border border-[#C7F36B]/30 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-[#C7F36B] shadow-[0_0_15px_#C7F36B]" />
        </div>
      </div>
    </div>
  );
};
