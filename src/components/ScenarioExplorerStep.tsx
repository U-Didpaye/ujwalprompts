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
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-3 border border-slate-800">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5 text-indigo-400" />
          <span>Step 5: Scenario Explorer & Control Matrix</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
          Explore Futures & Controllable Factors
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Examine Best, Base, and Worst case outcomes while separating factors you can influence from external uncertainties you cannot fully control.
        </p>
      </div>

      {/* 1. SCENARIO EXPLORER (Best / Base / Worst) */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <Compass className="w-4 h-4 text-indigo-400" />
          <span>Plauisble Scenarios (Best / Base / Worst)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map(sc => {
            const isBest = sc.type === 'best';
            const isWorst = sc.type === 'worst';

            return (
              <div
                key={sc.id}
                className={`glass-card rounded-2xl p-5 space-y-3 border ${
                  isBest ? 'border-emerald-500/30 bg-emerald-950/10' :
                  isWorst ? 'border-rose-500/30 bg-rose-950/10' :
                  'border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    isBest ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    isWorst ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                    'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {sc.type} Case
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white leading-snug">{sc.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{sc.description}</p>

                {sc.drivers && (
                  <div className="space-y-1 pt-1 text-[11px]">
                    <span className="font-semibold text-slate-400 uppercase text-[9px]">Key Drivers:</span>
                    <p className="text-slate-300">{sc.drivers.join(', ')}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. CONTROL VS NO-CONTROL MATRIX */}
      <div className="glass-card rounded-2xl p-6 space-y-4 border border-slate-800">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-indigo-400" />
          <span>Control vs Uncertainty Matrix</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* I CAN INFLUENCE */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2 text-xs">
            <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>I CAN INFLUENCE & CONTROL</span>
            </span>
            <ul className="space-y-1.5 text-slate-200">
              {controlMatrix.canInfluence.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* I CANNOT FULLY CONTROL */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2 text-xs">
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>I CANNOT FULLY CONTROL (External Uncertainty)</span>
            </span>
            <ul className="space-y-1.5 text-slate-200">
              {controlMatrix.cannotControl.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3. STAKEHOLDER & TEMPORAL PERSPECTIVES */}
      <div className="glass-card rounded-2xl p-6 space-y-4 border border-slate-800">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <Users className="w-4 h-4 text-violet-400" />
          <span>Stakeholder & Temporal Lenses</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stakeholderPerspectives.map(sp => (
            <div key={sp.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5 text-xs">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-violet-500/20 text-violet-300 border border-violet-500/30">
                Perspective: {sp.stakeholder}
              </span>
              <p className="font-semibold text-slate-200 pt-1">"{sp.viewpoint}"</p>
              {sp.concerns && (
                <p className="text-[11px] text-slate-400 italic">Primary Concern: {sp.concerns.join(', ')}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="pt-4 border-t border-slate-800 flex justify-end">
        <button
          type="button"
          onClick={onContinueToSynthesis}
          className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xl flex items-center space-x-2"
        >
          <span>View Final Thinking Map & Brief</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
