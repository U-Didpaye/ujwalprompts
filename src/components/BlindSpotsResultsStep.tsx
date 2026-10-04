import React, { useState } from 'react';
import { AnalysisResult, SeverityType } from '../types/decision';
import { BiasRadarChart } from './BiasRadarChart';
import { AlertTriangle, ChevronDown, ChevronUp, Sparkles, ArrowRight, CheckCircle2, MessageSquarePlus, RefreshCw, Info, Cpu } from 'lucide-react';

interface BlindSpotsResultsStepProps {
  result: AnalysisResult;
  onChallengeBlindSpot: (blindSpotId: string) => void;
  onContinueToChallenge: () => void;
  onEditContext: () => void;
}

export const BlindSpotsResultsStep: React.FC<BlindSpotsResultsStepProps> = ({
  result,
  onChallengeBlindSpot,
  onContinueToChallenge,
  onEditContext
}) => {
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityType | 'all'>('all');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(result.blindSpots[0]?.id || null);

  const filteredSpots = result.blindSpots.filter(spot => {
    if (selectedSeverity === 'all') return true;
    return spot.severity === selectedSeverity;
  });

  const toggleExpand = (id: string) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  const completeness = result.thinkingCompleteness;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Fallback Mode Indicator Banner */}
      {result.isFallbackMode && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-amber-400" />
            <span>Analysis generated using BlindSpot Deterministic Reasoning Engine (Offline/Fallback Mode).</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-amber-400">Deterministic Engine Active</span>
        </div>
      )}

      {/* Executive Score Dashboard Banner */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Step 3: Blind Spots & Cognitive Bias Signals</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              {result.blindSpots.length} Unexamined Risks & Signals Identified
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {result.executiveSummary}
            </p>
          </div>

          {/* Metric Badges */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Thinking Completeness Index */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 text-center min-w-[140px] relative group">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center justify-center space-x-1">
                <span>Thinking Completeness</span>
                <Info className="w-3 h-3 text-indigo-400" />
              </div>
              <div className="text-3xl font-extrabold text-indigo-400 font-mono mt-1">
                {completeness ? completeness.score : 82}%
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Coverage Index</div>

              {/* Tooltip explaining completeness */}
              <div className="absolute top-full mt-2 right-0 w-64 p-2.5 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl text-[11px] text-slate-300 hidden group-hover:block z-50 text-left">
                {completeness ? completeness.explanation : 'Measures how many analytical dimensions have been examined.'}
              </div>
            </div>

            {/* Analytical Risk Indicator */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center min-w-[140px] relative group">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center justify-center space-x-1">
                <span>Analytical Risk</span>
                <Info className="w-3 h-3 text-amber-400" />
              </div>
              <div className={`text-3xl font-extrabold font-mono mt-1 ${
                result.riskIndicator >= 60 ? 'text-rose-400' : result.riskIndicator >= 40 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {result.riskIndicator}%
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Unmitigated Risk</div>

              <div className="absolute top-full mt-2 right-0 w-64 p-2.5 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl text-[11px] text-slate-300 hidden group-hover:block z-50 text-left">
                An analytical indicator based on the risks and uncertainties identified in this analysis. It is not a probability of failure.
              </div>
            </div>

          </div>

        </div>

        {/* Thinking Completeness Dimensions Breakdown */}
        {completeness && completeness.breakdown && (
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">Examined Thinking Dimensions:</span>
            <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
              {Object.entries(completeness.breakdown).map(([key, val]) => (
                <div key={key} className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 capitalize">{key}</div>
                  <div className="text-xs font-bold text-slate-200 font-mono">{val}%</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Blind Spots Cards (Left) vs Cognitive Bias Signals (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Blind Spot Cards List */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Blind Spots ({filteredSpots.length})</span>
            </span>

            {/* Severity Filter Pills */}
            <div className="flex items-center space-x-1.5">
              {(['all', 'high', 'medium', 'low'] as const).map(sev => (
                <button
                  key={sev}
                  onClick={() => setSelectedSeverity(sev)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg capitalize border transition-colors ${
                    selectedSeverity === sev
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {filteredSpots.map(spot => {
              const isExpanded = expandedCardId === spot.id;
              const isChallenged = spot.status === 'challenged';

              return (
                <div
                  key={spot.id}
                  className={`glass-card rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isChallenged
                      ? 'border-emerald-500/40 bg-emerald-950/10'
                      : spot.severity === 'high'
                      ? 'border-rose-500/30 hover:border-rose-500/50'
                      : spot.severity === 'medium'
                      ? 'border-amber-500/30 hover:border-amber-500/50'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Card Header */}
                  <div className="p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        {/* Severity Badge */}
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          spot.severity === 'high' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                          spot.severity === 'medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                          'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                        }`}>
                          {spot.severity} Severity
                        </span>

                        {/* Category Badge */}
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                          {spot.category}
                        </span>
                      </div>

                      {/* Status pill if challenged */}
                      {isChallenged && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Challenged</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white tracking-tight">
                      {spot.title}
                    </h3>

                    {/* Scannable Summary */}
                    <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                      "{spot.summary}"
                    </p>

                    {/* Action Toolbar */}
                    <div className="flex flex-wrap items-center justify-between pt-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onChallengeBlindSpot(spot.id)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all flex items-center space-x-1.5 ${
                          isChallenged
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500 shadow-md'
                        }`}
                      >
                        <MessageSquarePlus className="w-3.5 h-3.5" />
                        <span>{isChallenged ? 'Update Counter-Evidence' : 'Challenge This'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleExpand(spot.id)}
                        className="text-xs font-semibold text-slate-400 hover:text-white flex items-center space-x-1 px-2.5 py-1 rounded-lg hover:bg-slate-800 transition-colors"
                      >
                        <span>{isExpanded ? 'Hide Details' : 'Expand Details'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Deep Detail Section */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-3 border-t border-slate-800/80 bg-slate-950/60 space-y-3 text-xs animate-in fade-in duration-200">
                      
                      <div className="space-y-1">
                        <span className="font-bold text-indigo-300 uppercase tracking-wider text-[10px]">Why This Matters</span>
                        <p className="text-slate-300 leading-relaxed">{spot.whyItMatters}</p>
                      </div>

                      <div className="space-y-1">
                        <span className="font-bold text-amber-300 uppercase tracking-wider text-[10px]">What Is Unknown / Unverified</span>
                        <p className="text-slate-300 leading-relaxed">{spot.whatIsUnknown}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 space-y-1">
                        <span className="font-bold text-indigo-400 text-[10px] uppercase tracking-wider">Reflection Prompt</span>
                        <p className="text-slate-200 font-medium italic">"{spot.reflectionQuestion}"</p>
                      </div>

                      {spot.challengeNotes && (
                        <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 space-y-1">
                          <span className="font-bold text-emerald-400 text-[10px] uppercase tracking-wider">Your Counter-Evidence Notes</span>
                          <p className="text-slate-200">{spot.challengeNotes}</p>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Cognitive Bias Signals & Recommendations */}
        <div className="space-y-6">
          <BiasRadarChart biases={result.cognitiveBiasSignals || []} />

          {/* Strategic Recommendations Card */}
          <div className="glass-card rounded-2xl p-5 space-y-4 border border-slate-800">
            <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Recommended Counter-Measures</span>
            </h3>

            <ul className="space-y-2.5">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start space-x-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Footer Navigation Toolbar */}
      <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onEditContext}
          className="text-xs font-semibold px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center space-x-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refine Decision Input</span>
        </button>

        <button
          type="button"
          onClick={onContinueToChallenge}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xl shadow-indigo-600/25 ring-1 ring-white/20 transition-all flex items-center justify-center space-x-2"
        >
          <span>Proceed to Challenge & Flip Decision</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
