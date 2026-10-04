import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Eye, Compass, Brain, Cpu } from 'lucide-react';

interface AnalysisLoadingStepProps {
  onComplete: () => void;
}

interface AnalysisPhase {
  id: number;
  label: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PHASES: AnalysisPhase[] = [
  { id: 1, label: 'Mapping decision context & core options...', detail: 'Classifying facts, assumptions, and explicit parameters', icon: Eye },
  { id: 2, label: 'Examining unexamined dependencies & bias signals...', detail: 'Detecting anchoring signals, status quo bias, and planning fallacy', icon: Brain },
  { id: 3, label: 'Auditing evidence gaps & critical unknowns...', detail: 'Calculating unrecoverable costs, runway volatility, and liquidity windows', icon: ShieldCheck },
  { id: 4, label: 'Analyzing opposite path & scenario futures...', detail: 'Modeling best, base, and worst case outcomes', icon: Compass },
  { id: 5, label: 'Synthesizing Thinking Completeness & Before/After Map...', detail: 'Building structured decision brief', icon: Cpu }
];

export const AnalysisLoadingStep: React.FC<AnalysisLoadingStepProps> = ({ onComplete }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [progress, setProgress] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 300);
          return 100;
        }

        const next = prev + 5;
        if (next >= 85) setActivePhaseIndex(4);
        else if (next >= 65) setActivePhaseIndex(3);
        else if (next >= 45) setActivePhaseIndex(2);
        else if (next >= 25) setActivePhaseIndex(1);

        return next;
      });
    }, 110);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 text-center space-y-8 animate-in fade-in duration-300">
      
      {/* Animated AI Core */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-20 h-20 rounded-2xl bg-[#111313] border border-[#C7F36B]/40 flex items-center justify-center shadow-2xl relative">
          <Sparkles className="w-10 h-10 text-[#C7F36B] animate-pulse" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-[#F3F2EC] tracking-tight">
          BlindSpot Stress-Test Analysis in Progress
        </h2>
        <p className="text-xs sm:text-sm text-[#A4A7A3]">
          Examining assumptions, risk indicators, and cognitive bias signals
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-[#A4A7A3] px-1">
          <span>Analysis Progress</span>
          <span className="text-[#C7F36B] font-mono font-bold">{progress}%</span>
        </div>

        <div className="w-full h-2 rounded-full bg-[#111313] border border-white/10 overflow-hidden">
          <div 
            className="h-full rounded-full bg-[#C7F36B] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Phase Steps Checklist */}
      <div className="obsidian-panel rounded-2xl p-4 sm:p-6 text-left space-y-3">
        {PHASES.map((phase, idx) => {
          const Icon = phase.icon;
          const isDone = idx < activePhaseIndex;
          const isCurrent = idx === activePhaseIndex;

          return (
            <div
              key={phase.id}
              className={`flex items-start space-x-3.5 p-3 rounded-xl transition-all ${
                isCurrent 
                  ? 'bg-[#1A1D1D] border border-[#C7F36B]/40' 
                  : isDone 
                  ? 'opacity-80' 
                  : 'opacity-40'
              }`}
            >
              <div className="mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-[#C7F36B]" />
                ) : isCurrent ? (
                  <Icon className="w-4 h-4 text-[#C7F36B] animate-pulse" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-[#A4A7A3]/30" />
                )}
              </div>

              <div>
                <div className={`text-xs font-bold ${isCurrent ? 'text-[#C7F36B]' : isDone ? 'text-[#F3F2EC]' : 'text-[#6B7280]'}`}>
                  {phase.label}
                </div>
                {isCurrent && (
                  <div className="text-[11px] text-[#A4A7A3] mt-0.5 animate-pulse">
                    {phase.detail}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
