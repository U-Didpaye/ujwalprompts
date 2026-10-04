import React from 'react';
import { WorkflowStep } from '../types/decision';
import { Check, Edit3, Cpu, Eye, AlertTriangle, ShieldCheck, Compass, FileCheck } from 'lucide-react';

interface StepProgressProps {
  currentStep: WorkflowStep;
  onStepClick: (step: WorkflowStep) => void;
  isAnalysisComplete: boolean;
}

interface StepConfig {
  id: WorkflowStep;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const STEPS: StepConfig[] = [
  { id: 'decision', label: '1. Context', icon: Edit3, description: 'Define options & assumptions' },
  { id: 'xray', label: '2. X-Ray', icon: Eye, description: 'Facts vs Assumptions & Unknowns' },
  { id: 'blindspots', label: '3. Blind Spots', icon: AlertTriangle, description: 'Severity cards & Bias Signals' },
  { id: 'challenge', label: '4. Challenge', icon: ShieldCheck, description: 'Flip Decision & Counter-Evidence' },
  { id: 'scenarios', label: '5. Scenarios', icon: Compass, description: 'Best/Worst & Control Matrix' },
  { id: 'reflection', label: '6. Synthesis', icon: FileCheck, description: 'Before/After Map & Brief' }
];

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  onStepClick,
  isAnalysisComplete
}) => {
  if (currentStep === 'landing' || currentStep === 'analysis') return null;

  const currentIndex = STEPS.findIndex(s => s.id === currentStep);

  return (
    <nav aria-label="Progress Stepper" className="w-full mb-8">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 backdrop-blur-md shadow-lg">
        <ol className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isCurrent = step.id === currentStep;
            const isPast = index < currentIndex;
            const isClickable = isPast || (index === 0) || (isAnalysisComplete && index > 0);

            return (
              <li key={step.id} className="relative">
                <button
                  type="button"
                  disabled={!isClickable && !isCurrent}
                  onClick={() => onStepClick(step.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md ring-1 ring-indigo-500/30'
                      : isPast
                      ? 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                      : 'bg-slate-950/40 border-slate-900 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold transition-colors ${
                      isCurrent
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : isPast
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {isPast ? <Check className="w-3.5 h-3.5" /> : index + 1}
                    </span>

                    <Icon className={`w-3.5 h-3.5 ${
                      isCurrent ? 'text-indigo-400' : isPast ? 'text-emerald-400' : 'text-slate-600'
                    }`} />
                  </div>

                  <div>
                    <div className={`text-xs font-bold truncate ${
                      isCurrent ? 'text-indigo-300' : isPast ? 'text-slate-200' : 'text-slate-500'
                    }`}>
                      {step.label}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate hidden md:block">
                      {step.description}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};
