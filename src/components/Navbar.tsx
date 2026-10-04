import React, { useState } from 'react';
import { Target, History, Sparkles, PlusCircle, HelpCircle } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-[#090A0A]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onStepChange('landing')}>
          <div className="w-8 h-8 rounded-lg bg-[#C7F36B] flex items-center justify-center text-[#090A0A] font-extrabold shadow-sm">
            <Target className="w-5 h-5 text-[#090A0A]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-extrabold tracking-tight text-[#F3F2EC]">
                BlindSpot
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-[#C7F36B]/10 text-[#C7F36B] border border-[#C7F36B]/20">
                AI Lab
              </span>
            </div>
            <p className="text-[11px] text-[#A4A7A3] font-medium hidden md:block">
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
              className="flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-[#1A1D1D] hover:bg-[#242828] text-[#C7F36B] border border-[#C7F36B]/30 transition-all shadow-sm"
              title="Try a pre-loaded real-world decision scenario"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C7F36B]" />
              <span>Explore Demo Scenarios</span>
            </button>

            {showDemoDropdown && (
              <div 
                className="absolute top-full mt-2 left-0 w-80 bg-[#111313] border border-white/10 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in duration-150"
                onMouseLeave={() => setShowDemoDropdown(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#A4A7A3] border-b border-white/10 mb-1">
                  1-Click Real-World Demos
                </div>
                {DEMO_SCENARIOS.map(demo => (
                  <button
                    key={demo.id}
                    onClick={() => {
                      onSelectDemo(demo.id);
                      setShowDemoDropdown(false);
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[#1A1D1D] transition-colors group flex flex-col space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#F3F2EC] group-hover:text-[#C7F36B] transition-colors">
                        {demo.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1A1D1D] text-[#A4A7A3] border border-white/10">
                        {demo.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A4A7A3] line-clamp-1">{demo.subtitle}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onNewDecision}
            className="btn-secondary flex items-center space-x-1.5 text-xs px-3.5 py-2 rounded-xl"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#A4A7A3]" />
            <span>Start Thinking</span>
          </button>
        </div>

        {/* Right Menu Controls */}
        <div className="flex items-center space-x-2">
          
          <button
            onClick={onToggleHelp}
            className="p-2 rounded-xl text-[#A4A7A3] hover:text-[#F3F2EC] hover:bg-[#1A1D1D] transition-colors"
            title="Product Philosophy"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="relative flex items-center space-x-1.5 text-xs font-medium px-3.5 py-2 rounded-xl bg-[#111313] hover:bg-[#1A1D1D] text-[#F3F2EC] border border-white/10 transition-colors"
            title="View Saved Decisions"
          >
            <History className="w-3.5 h-3.5 text-[#A4A7A3]" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#C7F36B] text-[#090A0A]">
                {historyCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
};
