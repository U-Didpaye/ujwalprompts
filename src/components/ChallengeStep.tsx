import React, { useState } from 'react';
import { AnalysisResult } from '../types/decision';
import { ShieldCheck, RefreshCw, ArrowRight, Sparkles, HelpCircle, CheckCircle2, RotateCcw } from 'lucide-react';

interface ChallengeStepProps {
  result: AnalysisResult;
  onAnswerChallengeQuestion: (questionId: string, answer: string) => void;
  onContinueToScenarios: () => void;
}

export const ChallengeStep: React.FC<ChallengeStepProps> = ({
  result,
  onAnswerChallengeQuestion,
  onContinueToScenarios
}) => {
  const { challengeQuestions, flipDecision, thinkingCompleteness } = result;
  const [showFlipDetails, setShowFlipDetails] = useState(true);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-3 border border-slate-800">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>Step 4: Challenge My Thinking & Flip Decision</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
          Stress-Test Your Core Reasoning
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          BlindSpot challenges your reasoning by probing disconfirming evidence and analyzing the opposite option. Answering these prompts elevates your Thinking Completeness score in real time.
        </p>

        <div className="pt-2 flex items-center space-x-2 text-xs text-indigo-300 font-medium">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Thinking Completeness: {thinkingCompleteness.score}% ({thinkingCompleteness.score >= 90 ? 'Comprehensive' : 'Examine prompts below to raise score'})</span>
        </div>
      </div>

      {/* Challenge My Thinking Questions */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span>Challenge My Thinking Prompts</span>
          </h3>
          <span className="text-xs text-slate-400">Probing Disconfirming Evidence</span>
        </div>

        <div className="space-y-4">
          {challengeQuestions.map((q, idx) => {
            const isAnswered = q.status === 'answered' || !!q.userAnswer;

            return (
              <div
                key={q.id}
                className={`glass-card rounded-2xl p-6 space-y-4 border transition-all ${
                  isAnswered ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400">
                      Challenge Prompt {idx + 1}
                    </span>
                    <h4 className="text-base font-bold text-white leading-snug">
                      {q.question}
                    </h4>
                    {q.context && (
                      <p className="text-xs text-slate-400 italic">Context: {q.context}</p>
                    )}
                  </div>

                  {isAnswered && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1 flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Evaluated</span>
                    </span>
                  )}
                </div>

                {/* 1-Click Option Pills */}
                {q.suggestedOptions && q.suggestedOptions.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                    {q.suggestedOptions.map((opt, oIdx) => {
                      const isSelected = q.userAnswer === opt;

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => onAnswerChallengeQuestion(q.id, opt)}
                          className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                              : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔄 FLIP THE DECISION SECTION */}
      {flipDecision && (
        <div className="glass-card rounded-2xl p-6 space-y-6 border border-violet-500/30 bg-gradient-to-br from-slate-900 via-slate-900/90 to-violet-950/20">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Flip The Decision</h3>
                <p className="text-xs text-slate-400">"What if I chose the opposite?"</p>
              </div>
            </div>

            <button
              onClick={() => setShowFlipDetails(!showFlipDetails)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700"
            >
              {showFlipDetails ? 'Minimize Analysis' : 'Expand Flip Analysis'}
            </button>
          </div>

          {showFlipDetails && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-violet-400 tracking-wider">Opposite Path Evaluated</span>
                <p className="text-sm font-bold text-white">{flipDecision.title}</p>
                <p className="text-xs text-slate-400">
                  Note: Analyzing the opposite option helps uncover trade-offs. BlindSpot does not declare the opposite choice better.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Overlooked Benefits */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2 text-xs">
                  <span className="font-bold text-emerald-400 uppercase text-[10px]">Overlooked Benefits of Opposite Path</span>
                  <ul className="space-y-1 text-slate-200">
                    {flipDecision.overlookedBenefits.map((b, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Overlooked Costs */}
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2 text-xs">
                  <span className="font-bold text-rose-400 uppercase text-[10px]">Overlooked Costs of Opposite Path</span>
                  <ul className="space-y-1 text-slate-200">
                    {flipDecision.overlookedCosts.map((c, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Success Conditions */}
              {flipDecision.conditionsForSuccess && (
                <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 space-y-1.5 text-xs">
                  <span className="font-bold text-indigo-300 uppercase text-[10px]">Conditions Required for Opposite Choice to Succeed</span>
                  <ul className="space-y-1 text-slate-200">
                    {flipDecision.conditionsForSuccess.map((cond, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <span className="text-indigo-400 font-bold">✓</span>
                        <span>{cond}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer Navigation */}
      <div className="pt-4 border-t border-slate-800 flex justify-end">
        <button
          type="button"
          onClick={onContinueToScenarios}
          className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xl flex items-center space-x-2"
        >
          <span>Explore Scenarios & Control Matrix</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
