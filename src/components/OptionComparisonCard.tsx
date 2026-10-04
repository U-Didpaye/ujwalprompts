import React from 'react';
import { DecisionOption } from '../types/decision';
import { Check, X, Layers, AlertCircle } from 'lucide-react';

interface OptionComparisonCardProps {
  options: DecisionOption[];
}

export const OptionComparisonCard: React.FC<OptionComparisonCardProps> = ({ options }) => {
  if (!options || options.length === 0) return null;

  return (
    <div className="glass-panel rounded-2xl p-6 space-y-4 border border-slate-800">
      <div className="flex items-center space-x-2">
        <Layers className="w-4 h-4 text-indigo-400" />
        <h3 className="text-base font-bold text-white">Executive Option Matrix</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((opt, i) => (
          <div key={opt.id || i} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">
                Option {String.fromCharCode(65 + i)}
              </span>
              <span className="text-xs font-bold text-white">{opt.title}</span>
            </div>

            {opt.description && (
              <p className="text-xs text-slate-300 italic">{opt.description}</p>
            )}

            {/* Pros */}
            {opt.pros && opt.pros.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-emerald-400">Upside Advantages</span>
                <ul className="space-y-1">
                  {opt.pros.map((p, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cons */}
            {opt.cons && opt.cons.length > 0 && (
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-bold uppercase text-rose-400">Downside & Friction</span>
                <ul className="space-y-1">
                  {opt.cons.map((c, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start space-x-1.5">
                      <X className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
