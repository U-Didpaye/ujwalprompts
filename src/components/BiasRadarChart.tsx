import React from 'react';
import { CognitiveBiasSignal } from '../types/decision';
import { ShieldAlert } from 'lucide-react';

interface BiasRadarChartProps {
  biases: CognitiveBiasSignal[];
}

export const BiasRadarChart: React.FC<BiasRadarChartProps> = ({ biases }) => {
  if (!biases || biases.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-5 space-y-4 border border-slate-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-slate-200">Cognitive Bias Signals</h3>
        </div>
        <span className="text-[11px] font-medium text-slate-400">
          {biases.length} Signals
        </span>
      </div>

      <div className="space-y-3">
        {biases.map(bias => {
          const isHigh = bias.score >= 75;
          const isMedium = bias.score >= 50 && bias.score < 75;

          return (
            <div key={bias.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-200">{bias.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold ${
                  isHigh ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                  isMedium ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                }`}>
                  {bias.score}% Signal Intensity
                </span>
              </div>

              <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    isHigh ? 'bg-rose-500' : isMedium ? 'bg-amber-500' : 'bg-sky-500'
                  }`}
                  style={{ width: `${bias.score}%` }}
                />
              </div>

              <p className="text-[11px] font-medium text-indigo-300">"{bias.signalMessage}"</p>
              {bias.description && <p className="text-[11px] text-slate-400">{bias.description}</p>}
              {bias.explanation && <p className="text-[11px] text-slate-400">{bias.explanation}</p>}

              {bias.mitigation && (
                <div className="text-[11px] text-indigo-300 bg-indigo-500/10 p-2 rounded-lg border border-indigo-500/20 font-medium">
                  💡 Mitigation: {bias.mitigation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
