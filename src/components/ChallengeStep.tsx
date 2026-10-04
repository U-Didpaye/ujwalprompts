import React, { useState } from 'react';
import { AnalysisResult } from '../types/decision';
import { ShieldCheck, ArrowRight, Sparkles, HelpCircle, CheckCircle2, RotateCcw } from 'lucide-react';

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
      <div className="obsidian-panel rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1A1D1D] border border-white/10 text-[#C7F36B] text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C7F36B]" />
          <span>Step 4: Challenge My Thinking & Flip Decision</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-[#F3F2EC] tracking-tight">
          Stress-Test Your Core Reasoning
        </h2>
        <p className="text-xs sm:text-sm text-[#A4A7A3] max-w-3xl leading-relaxed">
          BlindSpot challenges your reasoning by probing disconfirming evidence and analyzing the opposite option. Answering these prompts elevates your Thinking Completeness score in real time.
        </p>

        <div className="pt-2 flex items-center space-x-2 text-xs text-[#C7F36B] font-medium">
          <Sparkles className="w-4 h-4 text-[#C7F36B] animate-pulse" />
          <span>Thinking Completeness: {thinkingCompleteness.score}% ({thinkingCompleteness.score >= 90 ? 'Comprehensive' : 'Examine prompts below to raise score'})</span>
        </div>
      </div>

      {/* Challenge My Thinking Questions */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#F3F2EC] flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-[#C7F36B]" />
            <span>Challenge My Thinking Prompts</span>
          </h3>
          <span className="text-xs text-[#A4A7A3]">Probing Disconfirming Evidence</span>
        </div>

        <div className="space-y-4">
          {challengeQuestions.map((q, idx) => {
            const isAnswered = q.status === 'answered' || !!q.userAnswer;

            return (
              <div
                key={q.id}
                className={`obsidian-card rounded-2xl p-6 space-y-4 border transition-all ${
                  isAnswered ? 'border-[#C7F36B]/40 bg-[#C7F36B]/5' : 'border-white/10'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C7F36B]">
                      Challenge Prompt {idx + 1}
                    </span>
                    <h4 className="text-base font-bold text-[#F3F2EC] leading-snug">
                      {q.question}
                    </h4>
                    {q.context && (
                      <p className="text-xs text-[#A4A7A3] italic">Context: {q.context}</p>
                    )}
                  </div>

                  {isAnswered && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#C7F36B]/20 text-[#C7F36B] border border-[#C7F36B]/30 flex items-center space-x-1 flex-shrink-0">
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
                              ? 'bg-[#C7F36B] text-[#090A0A] font-bold border-[#C7F36B] shadow-sm'
                              : 'bg-[#090A0A] text-[#F3F2EC] border-white/10 hover:bg-[#1A1D1D]'
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

      {/* 🔄 DECISION FLIP SECTION */}
      {flipDecision && (
        <div className="obsidian-card rounded-2xl p-6 space-y-6 border border-white/15">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-[#1A1D1D] border border-white/10 flex items-center justify-center text-[#C7F36B]">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F3F2EC]">Decision Flip</h3>
                <p className="text-xs text-[#A4A7A3]">"What if I chose the opposite path?"</p>
              </div>
            </div>

            <button
              onClick={() => setShowFlipDetails(!showFlipDetails)}
              className="btn-secondary text-xs px-3 py-1.5 rounded-lg"
            >
              {showFlipDetails ? 'Minimize Analysis' : 'Expand Flip Analysis'}
            </button>
          </div>

          {showFlipDetails && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-[#090A0A] border border-white/10 space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#C7F36B] tracking-wider">Opposite Path Evaluated</span>
                <p className="text-sm font-bold text-[#F3F2EC]">{flipDecision.title}</p>
                <p className="text-xs text-[#A4A7A3]">
                  Note: Analyzing the opposite option helps uncover trade-offs. BlindSpot does not declare the opposite choice better.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Overlooked Benefits */}
                <div className="p-4 rounded-xl bg-[#090A0A] border border-[#C7F36B]/30 space-y-2 text-xs">
                  <span className="font-bold text-[#C7F36B] uppercase text-[10px]">Overlooked Benefits of Opposite Path</span>
                  <ul className="space-y-1 text-[#F3F2EC]">
                    {flipDecision.overlookedBenefits.map((b, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-[#C7F36B] font-bold">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Overlooked Costs */}
                <div className="p-4 rounded-xl bg-[#090A0A] border border-[#E55353]/30 space-y-2 text-xs">
                  <span className="font-bold text-[#E55353] uppercase text-[10px]">Overlooked Costs of Opposite Path</span>
                  <ul className="space-y-1 text-[#F3F2EC]">
                    {flipDecision.overlookedCosts.map((c, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-[#E55353] font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Success Conditions */}
              {flipDecision.conditionsForSuccess && (
                <div className="p-4 rounded-xl bg-[#090A0A] border border-white/10 space-y-1.5 text-xs">
                  <span className="font-bold text-[#C7F36B] uppercase text-[10px]">Conditions Required for Opposite Choice to Succeed</span>
                  <ul className="space-y-1 text-[#F3F2EC]">
                    {flipDecision.conditionsForSuccess.map((cond, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <span className="text-[#C7F36B] font-bold">✓</span>
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
      <div className="pt-4 border-t border-white/10 flex justify-end">
        <button
          type="button"
          onClick={onContinueToScenarios}
          className="btn-lime px-6 py-3.5 rounded-xl text-sm flex items-center space-x-2"
        >
          <span>Explore Scenarios & Control Matrix</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
