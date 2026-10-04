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
  { id: 1, label: 'Examining core assumptions & cognitive biases...', detail: 'Detecting anchoring, confirmation bias, and sunk cost traps', icon: Brain },
  { id: 2, label: 'Looking for missing financial & operational factors...', detail: 'Calculating unrecoverable costs, cash buffers, and runway volatility', icon: Eye },
  { id: 3, label: 'Checking evidence gaps & edge cases...', detail: 'Identifying unverified dependencies and contract uncertainties', icon: ShieldCheck },
  { id: 4, label: 'Exploring alternative perspectives & counter-models...', detail: 'Modeling devil\'s advocate scenarios and staged options', icon: Compass },
  { id: 5, label: 'Preparing reflection questions & executive matrix...', detail: 'Synthesizing clarity index and customized action checklist', icon: Cpu }
];

export const AnalysisLoadingStep: React.FC<AnalysisLoadingStepProps> = ({ onComplete }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [progress, setProgress] = useState(5);

  useEffect(() => {
    // Total analysis animation duration: ~2.8 seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 300);
          return 100;
        }

        const next = prev + 5;
        // Update phase index dynamically based on percentage
        if (next >= 85) setActivePhaseIndex(4);
        else if (next >= 65) setActivePhaseIndex(3);
        else if (next >= 45) setActivePhaseIndex(2);
        else if (next >= 25) setActivePhaseIndex(1);

        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 text-center space-y-8 animate-in fade-in duration-300">
      
      {/* Animated AI Brain Glow Icon */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 animate-spin-slow opacity-30 blur-xl absolute" />
        <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-indigo-500/30 flex items-center justify-center shadow-2xl relative">
          <Sparkles className="w-10 h-10 text-indigo-400 animate-pulse" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          BlindSpot Deep Analysis in Progress
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Stress-testing your context against cognitive bias heuristics and risk models
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-1">
          <span>Analysis Progress</span>
          <span className="text-indigo-400 font-mono font-bold">{progress}%</span>
        </div>

        <div className="w-full h-2.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400 transition-all duration-150 ease-out shadow-lg shadow-indigo-500/50"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Phase Steps Checklist */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 text-left space-y-3.5">
        {PHASES.map((phase, idx) => {
          const Icon = phase.icon;
          const isDone = idx < activePhaseIndex;
          const isCurrent = idx === activePhaseIndex;

          return (
            <div
              key={phase.id}
              className={`flex items-start space-x-3.5 p-3 rounded-xl transition-all ${
                isCurrent 
                  ? 'bg-indigo-500/10 border border-indigo-500/30' 
                  : isDone 
                  ? 'opacity-80' 
                  : 'opacity-40'
              }`}
            >
              <div className="mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Icon className="w-4 h-4 text-indigo-400 animate-pulse" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700" />
                )}
              </div>

              <div>
                <div className={`text-xs font-bold ${isCurrent ? 'text-indigo-200' : isDone ? 'text-slate-300' : 'text-slate-500'}`}>
                  {phase.label}
                </div>
                {isCurrent && (
                  <div className="text-[11px] text-slate-400 mt-0.5 animate-pulse">
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
