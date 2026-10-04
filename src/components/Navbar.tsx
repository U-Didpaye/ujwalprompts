import React, { useState } from 'react';
import { Target, History, Sparkles, PlusCircle, HelpCircle, ShieldCheck } from 'lucide-react';
import { WorkflowStep } from '../types/decision';
import { DEMO_SCENARIOS } from '../data/demoDecisions';

interface NavbarProps {
  activeStep: WorkflowStep;
  onStepChange: (step: WorkflowStep) => void;
  onSelectDemo: (demoId: string) => void;
  onOpenHistory: () => void;
  onNewDecision: () => void;
  historyCount: number;
  onToggleHelp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeStep,
  onStepChange,
  onSelectDemo,
  onOpenHistory,
  onNewDecision,
  historyCount,
  onToggleHelp
}) => {
  const [showDemoDropdown, setShowDemoDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onStepChange('landing')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                BlindSpot
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                AI Intelligence Lab
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden md:block">
              It doesn't decide for you. It makes your thinking better.
            </p>
          </div>
        </div>

        {/* Center Actions / Demo Presets */}
        <div className="hidden sm:flex items-center space-x-2">
          {/* Demo Preset Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDemoDropdown(!showDemoDropdown)}
              className="flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-all shadow-sm"
              title="Try a pre-loaded real-world decision scenario"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>Explore Demo Scenarios</span>
            </button>

            {showDemoDropdown && (
              <div 
                className="absolute top-full mt-2 left-0 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setShowDemoDropdown(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 mb-1">
                  1-Click Real-World Scenarios
                </div>
                {DEMO_SCENARIOS.map(demo => (
                  <button
                    key={demo.id}
                    onClick={() => {
                      onSelectDemo(demo.id);
                      setShowDemoDropdown(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group flex flex-col space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">
                        {demo.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {demo.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{demo.subtitle}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onNewDecision}
            className="flex items-center space-x-1.5 text-xs font-medium px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Start Thinking</span>
          </button>
        </div>

        {/* Right Menu Controls */}
        <div className="flex items-center space-x-2">
          
          <button
            onClick={onToggleHelp}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title="Vision & Principles"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="relative flex items-center space-x-1.5 text-xs font-medium px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            title="View Saved Decisions"
          >
            <History className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-indigo-500 text-white">
                {historyCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
};
