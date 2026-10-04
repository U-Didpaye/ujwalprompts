import React, { useState } from 'react';
import { DecisionRecord, MissingInfoChecklist } from '../types/decision';
import { OptionComparisonCard } from './OptionComparisonCard';
import { Download, Save, RefreshCw, CheckSquare, Square, Award, ShieldCheck, Eye } from 'lucide-react';

interface FinalReflectionStepProps {
  record: DecisionRecord;
  onOpenExport: () => void;
  onSaveToHistory: () => void;
  onNewDecision: () => void;
  isSaved: boolean;
}

export const FinalReflectionStep: React.FC<FinalReflectionStepProps> = ({
  record,
  onOpenExport,
  onSaveToHistory,
  onNewDecision,
  isSaved
}) => {
  const { input, result } = record;
  const { beforeAfterMap, missingChecklist, thinkingCompleteness, riskIndicator } = result;

  const [checklist, setChecklist] = useState<MissingInfoChecklist[]>(missingChecklist || []);

  const toggleCheck = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, isChecked: !item.isChecked } : item));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Executive Decision Brief Header */}
      <div className="obsidian-panel rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1A1D1D] border border-white/10 text-[#C7F36B] text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-[#C7F36B]" />
              <span>Step 6: Executive Synthesis & Before/After Map</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#F3F2EC] tracking-tight">
              {input.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#A4A7A3] leading-relaxed">
              {result.executiveSummary}
            </p>
          </div>

          {/* Metrics */}
          <div className="flex items-center space-x-3">
            <div className="p-4 rounded-xl bg-[#090A0A] border border-[#C7F36B]/30 text-center min-w-[140px]">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#A4A7A3]">Thinking Completeness</div>
              <div className="text-3xl font-extrabold text-[#C7F36B] font-mono mt-1">
                {thinkingCompleteness ? thinkingCompleteness.score : 82}%
              </div>
              <div className="text-[10px] text-[#C7F36B] mt-0.5">Coverage Index</div>
            </div>

            <div className="p-4 rounded-xl bg-[#090A0A] border border-white/10 text-center min-w-[120px]">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#A4A7A3]">Analytical Risk</div>
              <div className="text-3xl font-extrabold text-[#D6A84F] font-mono mt-1">
                {riskIndicator}%
              </div>
              <div className="text-[10px] text-[#A4A7A3] mt-0.5">Indicator</div>
            </div>
          </div>

        </div>

        {/* Quick Toolbar */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenExport}
              className="btn-lime text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Executive Report</span>
            </button>

            <button
              onClick={onSaveToHistory}
              disabled={isSaved}
              className={`text-xs font-semibold px-4 py-2.5 rounded-xl border transition-colors flex items-center space-x-1.5 ${
                isSaved 
                  ? 'bg-[#C7F36B]/10 text-[#C7F36B] border-[#C7F36B]/30' 
                  : 'btn-secondary'
              }`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaved ? 'Saved to History ✓' : 'Save to History'}</span>
            </button>
          </div>

          <button
            onClick={onNewDecision}
            className="btn-secondary text-xs px-4 py-2.5 rounded-xl flex items-center space-x-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Start Another Decision</span>
          </button>
        </div>
      </div>

      {/* 🗺️ BEFORE → AFTER THINKING MAP */}
      {beforeAfterMap && (
        <div className="obsidian-card rounded-2xl p-6 sm:p-8 space-y-6 border border-white/15">
          <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
            <Eye className="w-5 h-5 text-[#C7F36B]" />
            <h3 className="text-lg font-bold text-[#F3F2EC]">Before → After Thinking Map</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Step 1: BEFORE */}
            <div className="p-4 rounded-xl bg-[#090A0A] border border-white/10 space-y-2">
              <span className="text-[10px] uppercase font-extrabold text-[#A4A7A3] tracking-wider">
                1. BEFORE THINKING
              </span>
              <h4 className="text-xs font-bold text-[#F3F2EC]">What I Initially Thought</h4>
              <p className="text-xs text-[#A4A7A3] italic">"{beforeAfterMap.initialThinking}"</p>
            </div>

            {/* Step 2: WHAT BLINDSPOT REVEALED */}
            <div className="p-4 rounded-xl bg-[#090A0A] border border-[#C7F36B]/30 space-y-2">
              <span className="text-[10px] uppercase font-extrabold text-[#C7F36B] tracking-wider">
                2. WHAT BLINDSPOT REVEALED
              </span>
              <h4 className="text-xs font-bold text-[#C7F36B]">Unexamined Dimensions</h4>
              <ul className="space-y-1 text-xs text-[#F3F2EC]">
                {beforeAfterMap.whatBlindSpotRevealed.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-[#C7F36B] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step 3: AFTER */}
            <div className="p-4 rounded-xl bg-[#090A0A] border border-[#C7F36B]/40 space-y-2">
              <span className="text-[10px] uppercase font-extrabold text-[#C7F36B] tracking-wider">
                3. AFTER THINKING
              </span>
              <h4 className="text-xs font-bold text-[#F3F2EC]">Updated Understanding</h4>
              <p className="text-xs text-[#F3F2EC] font-medium">"{beforeAfterMap.updatedUnderstanding}"</p>
            </div>

          </div>
        </div>
      )}

      {/* Option Matrix Comparison */}
      <OptionComparisonCard options={input.options} />

      {/* BEFORE YOU DECIDE: MISSING INFORMATION CHECKLIST */}
      {checklist.length > 0 && (
        <div className="obsidian-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#F3F2EC] flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#C7F36B]" />
              <span>Before You Decide — Verification Checklist</span>
            </h3>
            <span className="text-xs text-[#A4A7A3]">
              {checklist.filter(c => c.isChecked).length} of {checklist.length} Verified
            </span>
          </div>

          <div className="space-y-2.5">
            {checklist.map(chk => (
              <div
                key={chk.id}
                onClick={() => toggleCheck(chk.id)}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start space-x-3 ${
                  chk.isChecked 
                    ? 'bg-[#090A0A] border-[#C7F36B]/40 text-[#A4A7A3] line-through' 
                    : 'bg-[#090A0A] border-white/10 text-[#F3F2EC] hover:border-white/20'
                }`}
              >
                <div className="mt-0.5">
                  {chk.isChecked ? (
                    <CheckSquare className="w-4 h-4 text-[#C7F36B]" />
                  ) : (
                    <Square className="w-4 h-4 text-[#6B7280]" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#C7F36B] mr-2">{chk.category}</span>
                  <span>{chk.item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Disclaimer */}
      <div className="p-4 rounded-xl bg-[#111313] border border-white/10 text-center text-xs text-[#A4A7A3] space-y-1">
        <p className="font-bold text-[#F3F2EC]">The Final Decision Always Remains With You.</p>
        <p>BlindSpot provided the analysis to broaden your perspective. You retain full autonomy over your choices.</p>
      </div>

    </div>
  );
};
