import React from 'react';
import { WorkflowStep } from '../types/decision';
import { Check, Edit3, Eye, AlertTriangle, ShieldCheck, Compass, FileCheck } from 'lucide-react';

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
  { id: 'decision', label: '1. Context', icon: Edit3, description: 'Options & assumptions' },
  { id: 'xray', label: '2. X-Ray', icon: Eye, description: 'Facts, assumptions & unknowns' },
  { id: 'blindspots', label: '3. Blind Spots', icon: AlertTriangle, description: 'Risks & Bias signals' },
  { id: 'challenge', label: '4. Challenge', icon: ShieldCheck, description: 'Flip choice & counter-evidence' },
  { id: 'scenarios', label: '5. Scenarios', icon: Compass, description: 'Futures & Control matrix' },
  { id: 'reflection', label: '6. Synthesis', icon: FileCheck, description: 'Before/After thinking map' }
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
      <div className="bg-[#111313] border border-white/10 rounded-2xl p-2.5 sm:p-3 backdrop-blur-md shadow-md">
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
                  className={`w-full text-left p-2 sm:p-2.5 rounded-xl border transition-all duration-150 flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-[#1A1D1D] border-[#C7F36B] text-[#F3F2EC] shadow-sm'
                      : isPast
                      ? 'bg-[#151717] border-white/5 text-[#A4A7A3] hover:bg-[#1A1D1D] hover:border-white/10'
                      : 'bg-[#090A0A]/50 border-transparent text-[#6B7280] cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold transition-colors ${
                      isCurrent
                        ? 'bg-[#C7F36B] text-[#090A0A]'
                        : isPast
                        ? 'bg-[#C7F36B]/20 text-[#C7F36B] border border-[#C7F36B]/30'
                        : 'bg-[#1A1D1D] text-[#6B7280]'
                    }`}>
                      {isPast ? <Check className="w-3 h-3" /> : index + 1}
                    </span>

                    <Icon className={`w-3.5 h-3.5 ${
                      isCurrent ? 'text-[#C7F36B]' : isPast ? 'text-[#C7F36B]' : 'text-[#6B7280]'
                    }`} />
                  </div>

                  <div>
                    <div className={`text-xs font-bold truncate ${
                      isCurrent ? 'text-[#F3F2EC]' : isPast ? 'text-[#A4A7A3]' : 'text-[#6B7280]'
                    }`}>
                      {step.label}
                    </div>
                    <div className="text-[10px] text-[#A4A7A3] truncate hidden md:block">
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
