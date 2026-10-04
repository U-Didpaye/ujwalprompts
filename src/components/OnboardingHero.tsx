import React, { useState } from 'react';
import { ShieldAlert, HelpCircle, Eye, ArrowRight, Sparkles, ChevronDown, ChevronUp, CheckCircle2, Zap } from 'lucide-react';

interface OnboardingHeroProps {
  onStartDemo: (demoId: string) => void;
}

export const OnboardingHero: React.FC<OnboardingHeroProps> = ({ onStartDemo }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-900 border border-indigo-500/20 shadow-xl mb-8 p-6 sm:p-8">
      {/* Background glow graphics */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header title */}
      <div className="flex items-start justify-between">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Decision Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            See What You Are Missing Before Making High-Stakes Decisions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            BlindSpot stress-tests your assumptions, uncovers cognitive biases, and identifies unexamined operational & financial risks in your career, business, or financial choices.
          </p>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 transition-colors"
        >
          <span>{isExpanded ? 'Minimize Guide' : 'How It Works'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Quick 10-Second Progressive Disclosure Grid */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            
            {/* Step 1 */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-xs">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[11px]">1</span>
                <span>What It Does</span>
              </div>
              <p className="text-xs text-slate-300">
                Stress-tests major choices to prevent costly cognitive traps and uncalculated surprises.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-xs">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[11px]">2</span>
                <span>What You Enter</span>
              </div>
              <p className="text-xs text-slate-300">
                Your decision title, context, competing options, key assumptions, and financial impact.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-xs">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[11px]">3</span>
                <span>What AI Analyzes</span>
              </div>
              <p className="text-xs text-slate-300">
                Anchoring bias, hidden liquidity gaps, execution bottlenecks, and unrecoverable costs.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-xs">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[11px]">4</span>
                <span>What Findings Mean</span>
              </div>
              <p className="text-xs text-slate-300">
                Severity-rated blind spot cards with clarity score (0-100%) & cognitive bias radar.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-xs">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[11px]">5</span>
                <span>What To Do Next</span>
              </div>
              <p className="text-xs text-slate-300">
                Challenge blind spots with counter-evidence, answer reflection questions, export plan.
              </p>
            </div>

          </div>

          {/* Quick Demo CTA Bar */}
          <div className="mt-5 pt-4 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Instant Judge Demo: Try a pre-filled decision in 1-click</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onStartDemo('career-startup')}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/20 flex items-center space-x-1"
              >
                <span>🚀 Startup Offer Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onStartDemo('saas-pivot')}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                💼 B2B SaaS Pivot Demo
              </button>
              <button
                onClick={() => onStartDemo('financial-property')}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                🏠 Rent vs Buy House Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
