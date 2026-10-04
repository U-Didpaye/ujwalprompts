import React, { useState } from 'react';
import { DecisionRecord, MissingInfoChecklist } from '../types/decision';
import { OptionComparisonCard } from './OptionComparisonCard';
import { Download, Save, RefreshCw, CheckSquare, Square, Award, ShieldCheck, ArrowRight, Eye, Sparkles } from 'lucide-react';

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
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>Step 6: Executive Synthesis & Before/After Map</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              {input.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {result.executiveSummary}
            </p>
          </div>

          {/* Metrics */}
          <div className="flex items-center space-x-3">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 text-center min-w-[130px]">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Thinking Completeness</div>
              <div className="text-3xl font-extrabold text-indigo-400 font-mono mt-1">
                {thinkingCompleteness ? thinkingCompleteness.score : 82}%
              </div>
              <div className="text-[10px] text-indigo-300 mt-0.5">Coverage Index</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center min-w-[120px]">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Analytical Risk</div>
              <div className="text-3xl font-extrabold text-amber-400 font-mono mt-1">
                {riskIndicator}%
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Indicator</div>
            </div>
          </div>

        </div>

        {/* Quick Toolbar */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenExport}
              className="text-xs font-bold px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md flex items-center space-x-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Executive Report</span>
            </button>

            <button
              onClick={onSaveToHistory}
              disabled={isSaved}
              className={`text-xs font-semibold px-4 py-2.5 rounded-xl border transition-colors flex items-center space-x-1.5 ${
                isSaved 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaved ? 'Saved to History ✓' : 'Save to History'}</span>
            </button>
          </div>

          <button
            onClick={onNewDecision}
            className="text-xs font-semibold px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors flex items-center space-x-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Start Another Decision</span>
          </button>
        </div>
      </div>

      {/* 🗺️ BEFORE vs AFTER THINKING MAP */}
      {beforeAfterMap && (
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-indigo-500/30 bg-gradient-to-b from-slate-900 to-indigo-950/20">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Eye className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Before vs After Thinking Map</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Step 1: BEFORE */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                1. BEFORE THINKING
              </span>
              <h4 className="text-xs font-bold text-slate-200">What I Initially Thought</h4>
              <p className="text-xs text-slate-300 italic">"{beforeAfterMap.initialThinking}"</p>
            </div>

            {/* Step 2: WHAT BLINDSPOT REVEALED */}
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-2">
              <span className="text-[10px] uppercase font-extrabold text-indigo-400 tracking-wider">
                2. WHAT BLINDSPOT REVEALED
              </span>
              <h4 className="text-xs font-bold text-indigo-200">Unexamined Dimensions</h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {beforeAfterMap.whatBlindSpotRevealed.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step 3: AFTER */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
              <span className="text-[10px] uppercase font-extrabold text-emerald-400 tracking-wider">
                3. AFTER THINKING
              </span>
              <h4 className="text-xs font-bold text-emerald-200">Updated Understanding</h4>
              <p className="text-xs text-slate-200 font-medium">"{beforeAfterMap.updatedUnderstanding}"</p>
            </div>

          </div>
        </div>
      )}

      {/* Option Matrix Comparison */}
      <OptionComparisonCard options={input.options} />

      {/* BEFORE YOU DECIDE: MISSING INFORMATION CHECKLIST */}
      {checklist.length > 0 && (
        <div className="glass-card rounded-2xl p-6 space-y-4 border border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Before You Decide — Verification Checklist</span>
            </h3>
            <span className="text-xs text-slate-400">
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
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-400 line-through' 
                    : 'bg-slate-950/60 border-slate-800 text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="mt-0.5">
                  {chk.isChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-400 mr-2">{chk.category}</span>
                  <span>{chk.item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400 space-y-1">
        <p className="font-bold text-slate-300">The Final Decision Always Remains With You.</p>
        <p>BlindSpot provided the analysis to broaden your perspective. You retain full autonomy over your choices.</p>
      </div>

    </div>
  );
};
