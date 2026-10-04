import React from 'react';
import { HeroVisual } from './HeroVisual';
import { Sparkles, ArrowRight, ShieldCheck, Eye, Layers, Brain, Compass } from 'lucide-react';
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
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Thinking Companion • Not a Chatbot</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
            SEE WHAT YOU'RE <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-200 bg-clip-text text-transparent">MISSING.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            An AI thinking companion that stress-tests your reasoning, exposes hidden assumptions, and helps you examine the decision before you make it.
          </p>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-indigo-500/20 text-indigo-200 text-xs font-medium space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-white">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Core Philosophy</span>
            </div>
            <p className="text-slate-300 italic">
              "BlindSpot doesn't make the decision for you. It makes your thinking better."
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onStartThinking}
              className="px-8 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-2xl shadow-indigo-600/30 ring-1 ring-white/20 transform hover:-translate-y-0.5 transition-all flex items-center space-x-2"
            >
              <span>START THINKING</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onStartDemo(DEMO_SCENARIOS[0].id)}
              className="px-6 py-4 rounded-2xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>EXPLORE A DEMO</span>
            </button>
          </div>

        </div>

        {/* Right Column Abstract Sculptural Intelligence Visual */}
        <div className="lg:col-span-5 flex justify-center">
          <HeroVisual />
        </div>

      </div>

      {/* 4 Signature Product Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
        
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Eye className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">1. Decision X-Ray</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Separates explicitly stated FACTS from unexamined ASSUMPTIONS and critical UNKNOWNS.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <Brain className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">2. Blind Spots & Signals</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Uncovers hidden execution risks and possible cognitive-bias signals before you decide.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">3. Challenge & Flip</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Stress-tests assumptions with counter-evidence and analyzes "What if I chose the opposite?"
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Compass className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">4. Before/After Map</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Visualizes how your reasoning evolved from initial thoughts to comprehensive clarity.
          </p>
        </div>

      </div>

    </div>
  );
};
