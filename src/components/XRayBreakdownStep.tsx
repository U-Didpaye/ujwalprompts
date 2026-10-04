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
      <div className="obsidian-panel rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1A1D1D] border border-white/10 text-[#C7F36B] text-xs font-semibold">
          <Eye className="w-3.5 h-3.5 text-[#C7F36B]" />
          <span>Decision X-Ray • Signature Fact Audit</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-[#F3F2EC] tracking-tight">
          Facts vs Assumptions vs Unknowns
        </h2>
        <p className="text-xs sm:text-sm text-[#A4A7A3] max-w-3xl leading-relaxed">
          BlindSpot explicitly separates what you actually know from what your decision depends upon, revealing critical evidence gaps before you decide.
        </p>
      </div>

      {/* 4 Quadrants: Facts, Assumptions, Unknowns, Hypotheticals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 📌 FACTS Card */}
        <div className="obsidian-card rounded-2xl p-5 space-y-4 border border-[#C7F36B]/30">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-bold text-[#C7F36B] uppercase tracking-wider flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified Facts ({facts.length})</span>
            </span>
            <span className="text-[10px] text-[#A4A7A3]">Explicitly Provided</span>
          </div>

          <div className="space-y-2.5">
            {facts.map(fact => (
              <div key={fact.id} className="p-3 rounded-xl bg-[#090A0A] border border-white/10 text-xs text-[#F3F2EC] space-y-1">
                <span className="text-[10px] font-semibold text-[#C7F36B] uppercase">{fact.category}</span>
                <p>{fact.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 💡 ASSUMPTIONS Card */}
        <div className="obsidian-card rounded-2xl p-5 space-y-4 border border-[#D6A84F]/30">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>Unexamined Assumptions ({assumptions.length})</span>
            </span>
            <span className="text-[10px] text-[#A4A7A3]">Decision Dependencies</span>
          </div>

          <div className="space-y-2.5">
            {assumptions.map(asm => (
              <div key={asm.id} className="p-3 rounded-xl bg-[#090A0A] border border-white/10 text-xs text-[#F3F2EC] space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase ${
                    asm.riskLevel === 'high' ? 'text-[#E55353]' : 'text-[#D6A84F]'
                  }`}>
                    {asm.riskLevel} Risk Dependency
                  </span>
                  <span className="text-[10px] text-[#A4A7A3] capitalize">{asm.status}</span>
                </div>
                <p>{asm.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ❓ UNKNOWNS Card */}
        <div className="obsidian-card rounded-2xl p-5 space-y-4 border border-white/20">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-bold text-[#F3F2EC] uppercase tracking-wider flex items-center space-x-1.5">
              <HelpCircle className="w-4 h-4 text-[#C7F36B]" />
              <span>Critical Unknowns ({unknowns.length})</span>
            </span>
            <span className="text-[10px] text-[#A4A7A3]">Missing Information</span>
          </div>

          <div className="space-y-2.5">
            {unknowns.map(unk => (
              <div key={unk.id} className="p-3 rounded-xl bg-[#090A0A] border border-white/10 text-xs space-y-1.5">
                <p className="font-bold text-[#F3F2EC]">"{unk.question}"</p>
                <p className="text-[11px] text-[#A4A7A3]">Why Critical: {unk.whyCritical}</p>
                <div className="text-[11px] text-[#C7F36B] bg-[#1A1D1D] p-2 rounded-lg border border-white/10 font-medium">
                  🔍 Verification: {unk.verificationStep}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🔮 HYPOTHETICALS Card */}
        <div className="obsidian-card rounded-2xl p-5 space-y-4 border border-white/20">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-bold text-[#F3F2EC] uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-[#C7F36B]" />
              <span>Hypothetical Scenarios ({hypotheticals.length})</span>
            </span>
            <span className="text-[10px] text-[#A4A7A3]">Stress Test Premise</span>
          </div>

          <div className="space-y-2.5">
            {hypotheticals.map(hyp => (
              <div key={hyp.id} className="p-3 rounded-xl bg-[#090A0A] border border-white/10 text-xs space-y-1.5">
                <span className="font-bold text-[#C7F36B]">{hyp.title}</span>
                <p className="text-[#F3F2EC]">Premise: {hyp.premise}</p>
                <p className="text-[11px] text-[#A4A7A3] italic">Potential Outcome: {hyp.potentialOutcome}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Evidence Gaps Verification Section */}
      <div className="obsidian-panel rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-[#F3F2EC] flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#C7F36B]" />
          <span>Evidence Gap Audit & Actionable Verification</span>
        </h3>

        <div className="space-y-3">
          {evidenceGaps.map(gap => (
            <div key={gap.id} className="p-4 rounded-xl bg-[#090A0A] border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#F3F2EC]">{gap.claim}</span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                  gap.status === 'SUPPORTED' ? 'bg-[#C7F36B]/20 text-[#C7F36B] border border-[#C7F36B]/30' :
                  gap.status === 'UNSUPPORTED' ? 'bg-[#E55353]/20 text-[#E55353] border border-[#E55353]/30' :
                  'bg-[#D6A84F]/20 text-[#D6A84F] border border-[#D6A84F]/30'
                }`}>
                  {gap.status}
                </span>
              </div>
              <p className="text-[#A4A7A3]">Actionable Verification: {gap.verificationAction}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="pt-4 border-t border-white/10 flex justify-end">
        <button
          onClick={onContinueToBlindSpots}
          className="btn-lime px-6 py-3.5 rounded-xl text-sm flex items-center space-x-2"
        >
          <span>Examine Severity-Rated Blind Spots</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
