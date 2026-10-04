import React, { useEffect, useState } from 'react';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'hidden' | 'pulse' | 'reveal' | 'done'>('hidden');

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Short 1.8 second opening sequence
    const timer1 = setTimeout(() => setPhase('pulse'), 200);
    const timer2 = setTimeout(() => setPhase('reveal'), 900);
    const timer3 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#090A0A] flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
      
      {/* Background Layer Grid Lines */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg className="w-full max-w-xl h-auto text-[#C7F36B]" viewBox="0 0 400 400" fill="none">
          {/* Subtle thought layers separating */}
          <line 
            x1="50" y1="200" x2="350" y2="200" 
            stroke="currentColor" strokeWidth="1" 
            className={`transition-all duration-700 ease-out ${
              phase === 'pulse' ? 'scale-x-125 opacity-100' : phase === 'reveal' ? 'scale-x-100 opacity-40' : 'opacity-0'
            }`} 
          />
          <circle 
            cx="200" cy="200" r="80" 
            stroke="#C7F36B" strokeWidth="1" strokeDasharray="4 4"
            className={`transition-all duration-1000 ease-in-out ${
              phase === 'pulse' ? 'rotate-180 scale-110 opacity-80' : phase === 'reveal' ? 'rotate-360 scale-100 opacity-30' : 'opacity-0'
            }`} 
          />
        </svg>
      </div>

      {/* Electric Lime Signal Pulse */}
      <div className={`w-3 h-3 rounded-full bg-[#C7F36B] shadow-[0_0_30px_#C7F36B] transition-all duration-700 ${
        phase === 'pulse' ? 'scale-150 opacity-100' : 'scale-50 opacity-20'
      }`} />

      {/* Typography Reveal */}
      <div className={`mt-6 text-center space-y-2 transition-all duration-700 ${
        phase === 'reveal' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <h1 className="text-3xl sm:text-4xl font-black tracking-widest text-[#F3F2EC] uppercase font-mono">
          BLINDSPOT
        </h1>
        <p className="text-xs font-semibold tracking-widest text-[#C7F36B] uppercase">
          SEE WHAT YOU'RE MISSING.
        </p>
      </div>

    </div>
  );
};
