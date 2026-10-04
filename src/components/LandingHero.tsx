import React from 'react';
import { HeroVisual } from './HeroVisual';
import { Sparkles, ArrowRight, ShieldCheck, Eye, Brain, Compass } from 'lucide-react';
import { DEMO_SCENARIOS } from '../data/demoDecisions';

interface LandingHeroProps {
  onStartThinking: () => void;
  onStartDemo: (demoId: string) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartThinking,
  onStartDemo
}) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-300 py-4">
      
      {/* Main Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column Text & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1A1D1D] border border-white/10 text-[#C7F36B] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C7F36B]" />
            <span>AI Thinking Companion • Not a Chatbot</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F3F2EC] tracking-tight leading-[1.1]">
            SEE WHAT YOU'RE <span className="text-[#C7F36B]">MISSING.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#A4A7A3] font-normal leading-relaxed max-w-2xl">
            An AI thinking companion that stress-tests your reasoning, exposes hidden assumptions, and helps you examine the decision before you make it.
          </p>

          <div className="p-4 rounded-xl bg-[#111313] border border-white/10 text-xs font-medium space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-[#F3F2EC]">
              <ShieldCheck className="w-4 h-4 text-[#C7F36B]" />
              <span>Core Philosophy</span>
            </div>
            <p className="text-[#A4A7A3] italic">
              "BlindSpot doesn't make the decision for you. It makes your thinking better."
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onStartThinking}
              className="btn-lime px-8 py-4 rounded-xl text-sm flex items-center space-x-2"
            >
              <span>START THINKING</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onStartDemo(DEMO_SCENARIOS[0].id)}
              className="btn-secondary px-6 py-4 rounded-xl text-sm flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-[#C7F36B]" />
              <span>EXPLORE A DEMO</span>
            </button>
          </div>

        </div>

        {/* Right Column Abstract Visual */}
        <div className="lg:col-span-5 flex justify-center">
          <HeroVisual />
        </div>

      </div>

      {/* 4 Signature Product Experience Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-white/10">
        
        <div className="p-5 rounded-xl bg-[#111313] border border-white/10 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-[#1A1D1D] border border-white/10 flex items-center justify-center text-[#C7F36B]">
            <Eye className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-[#F3F2EC]">1. Decision X-Ray</h3>
          <p className="text-xs text-[#A4A7A3] leading-relaxed">
            Separates explicitly stated FACTS from unexamined ASSUMPTIONS and critical UNKNOWNS.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#111313] border border-white/10 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-[#1A1D1D] border border-white/10 flex items-center justify-center text-[#C7F36B]">
            <Brain className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-[#F3F2EC]">2. Blind Spots & Signals</h3>
          <p className="text-xs text-[#A4A7A3] leading-relaxed">
            Uncovers hidden execution risks and possible cognitive-bias signals before you decide.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#111313] border border-white/10 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-[#1A1D1D] border border-white/10 flex items-center justify-center text-[#C7F36B]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-[#F3F2EC]">3. Challenge & Flip</h3>
          <p className="text-xs text-[#A4A7A3] leading-relaxed">
            Stress-tests assumptions with counter-evidence and analyzes "What if I chose the opposite?"
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#111313] border border-white/10 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-[#1A1D1D] border border-white/10 flex items-center justify-center text-[#C7F36B]">
            <Compass className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-[#F3F2EC]">4. Before → After Map</h3>
          <p className="text-xs text-[#A4A7A3] leading-relaxed">
            Visualizes how your reasoning evolved from initial thoughts to comprehensive clarity.
          </p>
        </div>

      </div>

    </div>
  );
};
