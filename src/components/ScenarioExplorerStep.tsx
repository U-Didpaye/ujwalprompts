import React from 'react';
import { AnalysisResult } from '../types/decision';
import { Compass, Users, Sliders, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface ScenarioExplorerStepProps {
  result: AnalysisResult;
  onContinueToSynthesis: () => void;
}

export const ScenarioExplorerStep: React.FC<ScenarioExplorerStepProps> = ({
  result,
  onContinueToSynthesis
}) => {
  const { scenarios, stakeholderPerspectives, controlMatrix } = result;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="obsidian-panel rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1A1D1D] border border-white/10 text-[#C7F36B] text-xs font-semibold">
          <Compass className="w-3.5 h-3.5 text-[#C7F36B]" />
          <span>Step 5: Scenario Explorer & Control Matrix</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-[#F3F2EC] tracking-tight">
          Explore Futures & Controllable Factors
        </h2>
        <p className="text-xs sm:text-sm text-[#A4A7A3] max-w-3xl leading-relaxed">
          Examine Best, Base, and Worst case outcomes while separating factors you can influence from external uncertainties you cannot fully control.
        </p>
      </div>

      {/* 1. SCENARIO EXPLORER (Best / Base / Worst) */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#F3F2EC] flex items-center space-x-2">
          <Compass className="w-4 h-4 text-[#C7F36B]" />
          <span>Plausible Scenarios (Best / Base / Worst)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map(sc => {
            const isBest = sc.type === 'best';
            const isWorst = sc.type === 'worst';

            return (
              <div
                key={sc.id}
                className={`obsidian-card rounded-2xl p-5 space-y-3 border ${
                  isBest ? 'border-[#C7F36B]/30' :
                  isWorst ? 'border-[#E55353]/30' :
                  'border-white/10'
                }`}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    isBest ? 'bg-[#C7F36B]/20 text-[#C7F36B] border border-[#C7F36B]/30' :
                    isWorst ? 'bg-[#E55353]/20 text-[#E55353] border border-[#E55353]/30' :
                    'bg-[#1A1D1D] text-[#A4A7A3] border border-white/10'
                  }`}>
                    {sc.type} Case
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#F3F2EC] leading-snug">{sc.title}</h4>
                <p className="text-xs text-[#A4A7A3] leading-relaxed">{sc.description}</p>

                {sc.drivers && (
                  <div className="space-y-1 pt-1 text-[11px]">
                    <span className="font-semibold text-[#A4A7A3] uppercase text-[9px]">Key Drivers:</span>
                    <p className="text-[#F3F2EC]">{sc.drivers.join(', ')}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. CONTROL VS NO-CONTROL MATRIX */}
      <div className="obsidian-panel rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-[#F3F2EC] flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-[#C7F36B]" />
          <span>Control vs Uncertainty Matrix</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* I CAN INFLUENCE */}
          <div className="p-4 rounded-xl bg-[#090A0A] border border-[#C7F36B]/30 space-y-2 text-xs">
            <span className="font-bold text-[#C7F36B] uppercase tracking-wider text-[10px] flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C7F36B]" />
              <span>I CAN INFLUENCE & CONTROL</span>
            </span>
            <ul className="space-y-1.5 text-[#F3F2EC]">
              {controlMatrix.canInfluence.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-[#C7F36B] font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* I CANNOT FULLY CONTROL */}
          <div className="p-4 rounded-xl bg-[#090A0A] border border-[#D6A84F]/30 space-y-2 text-xs">
            <span className="font-bold text-[#D6A84F] uppercase tracking-wider text-[10px] flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>I CANNOT FULLY CONTROL (External Uncertainty)</span>
            </span>
            <ul className="space-y-1.5 text-[#F3F2EC]">
              {controlMatrix.cannotControl.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-[#D6A84F] font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3. STAKEHOLDER & TEMPORAL PERSPECTIVES */}
      <div className="obsidian-panel rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-[#F3F2EC] flex items-center space-x-2">
          <Users className="w-4 h-4 text-[#C7F36B]" />
          <span>Stakeholder & Temporal Lenses</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stakeholderPerspectives.map(sp => (
            <div key={sp.id} className="p-4 rounded-xl bg-[#090A0A] border border-white/10 space-y-1.5 text-xs">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-[#1A1D1D] text-[#C7F36B] border border-white/10">
                Perspective: {sp.stakeholder}
              </span>
              <p className="font-semibold text-[#F3F2EC] pt-1">"{sp.viewpoint}"</p>
              {sp.concerns && (
                <p className="text-[11px] text-[#A4A7A3] italic">Primary Concern: {sp.concerns.join(', ')}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="pt-4 border-t border-white/10 flex justify-end">
        <button
          type="button"
          onClick={onContinueToSynthesis}
          className="btn-lime px-6 py-3.5 rounded-xl text-sm flex items-center space-x-2"
        >
          <span>View Final Thinking Map & Brief</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
