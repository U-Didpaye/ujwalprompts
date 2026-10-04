import React from 'react';
import { AnalysisResult } from '../types/decision';
import { Eye, CheckCircle2, AlertCircle, HelpCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface XRayBreakdownStepProps {
  result: AnalysisResult;
  onContinueToBlindSpots: () => void;
}

export const XRayBreakdownStep: React.FC<XRayBreakdownStepProps> = ({
  result,
  onContinueToBlindSpots
}) => {
  const { facts, assumptions, unknowns, hypotheticals, evidenceGaps } = result;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-3 border border-slate-800">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Eye className="w-3.5 h-3.5 text-indigo-400" />
          <span>Decision X-Ray & Fact Audit</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
          Facts vs Assumptions vs Unknowns
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          BlindSpot explicitly separates what you actually know from what your decision depends upon, revealing critical evidence gaps before you decide.
        </p>
      </div>

      {/* 4 Quadrants: Facts, Assumptions, Unknowns, Hypotheticals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 📌 FACTS Card */}
        <div className="glass-card rounded-2xl p-5 space-y-4 border border-emerald-500/30">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified Facts ({facts.length})</span>
            </span>
            <span className="text-[10px] text-slate-400">Explicitly Provided</span>
          </div>

          <div className="space-y-2.5">
            {facts.map(fact => (
              <div key={fact.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200 space-y-1">
                <span className="text-[10px] font-semibold text-emerald-400 uppercase">{fact.category}</span>
                <p>{fact.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 💡 ASSUMPTIONS Card */}
        <div className="glass-card rounded-2xl p-5 space-y-4 border border-amber-500/30">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>Unexamined Assumptions ({assumptions.length})</span>
            </span>
            <span className="text-[10px] text-slate-400">Decision Dependencies</span>
          </div>

          <div className="space-y-2.5">
            {assumptions.map(asm => (
              <div key={asm.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase ${
                    asm.riskLevel === 'high' ? 'text-rose-400' : 'text-amber-400'
                  }`}>
                    {asm.riskLevel} Risk Dependency
                  </span>
                  <span className="text-[10px] text-slate-500 capitalize">{asm.status}</span>
                </div>
                <p>{asm.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ❓ UNKNOWNS Card */}
        <div className="glass-card rounded-2xl p-5 space-y-4 border border-indigo-500/30">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5">
              <HelpCircle className="w-4 h-4" />
              <span>Critical Unknowns ({unknowns.length})</span>
            </span>
            <span className="text-[10px] text-slate-400">Missing Information</span>
          </div>

          <div className="space-y-2.5">
            {unknowns.map(unk => (
              <div key={unk.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1.5">
                <p className="font-bold text-white">"{unk.question}"</p>
                <p className="text-[11px] text-slate-400">Why Critical: {unk.whyCritical}</p>
                <div className="text-[11px] text-indigo-300 bg-indigo-500/10 p-2 rounded-lg border border-indigo-500/20 font-medium">
                  🔍 Verification: {unk.verificationStep}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🔮 HYPOTHETICALS Card */}
        <div className="glass-card rounded-2xl p-5 space-y-4 border border-violet-500/30">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Hypothetical Scenarios ({hypotheticals.length})</span>
            </span>
            <span className="text-[10px] text-slate-400">Stress Test Premise</span>
          </div>

          <div className="space-y-2.5">
            {hypotheticals.map(hyp => (
              <div key={hyp.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1.5">
                <span className="font-bold text-violet-300">{hyp.title}</span>
                <p className="text-slate-300">Premise: {hyp.premise}</p>
                <p className="text-[11px] text-slate-400 italic">Potential Outcome: {hyp.potentialOutcome}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Evidence Gaps Verification Section */}
      <div className="glass-card rounded-2xl p-6 space-y-4 border border-slate-800">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>Evidence Gap Audit & Verification Actions</span>
        </h3>

        <div className="space-y-3">
          {evidenceGaps.map(gap => (
            <div key={gap.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{gap.claim}</span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                  gap.status === 'SUPPORTED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                  gap.status === 'UNSUPPORTED' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                  'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {gap.status}
                </span>
              </div>
              <p className="text-slate-400">Actionable Suggestion: {gap.verificationAction}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="pt-4 border-t border-slate-800 flex justify-end">
        <button
          onClick={onContinueToBlindSpots}
          className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xl flex items-center space-x-2"
        >
          <span>Examine Severity-Rated Blind Spots</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
