import React from 'react';
import { DecisionOption } from '../types/decision';
import { Check, X, Layers } from 'lucide-react';

interface OptionComparisonCardProps {
  options: DecisionOption[];
}

export const OptionComparisonCard: React.FC<OptionComparisonCardProps> = ({ options }) => {
  if (!options || options.length === 0) return null;

  return (
    <div className="obsidian-panel rounded-2xl p-6 space-y-4">
      <div className="flex items-center space-x-2">
        <Layers className="w-4 h-4 text-[#C7F36B]" />
        <h3 className="text-base font-bold text-[#F3F2EC]">Executive Option Matrix</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((opt, i) => (
          <div key={opt.id || i} className="p-4 rounded-xl bg-[#090A0A] border border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#C7F36B]">
                Option {String.fromCharCode(65 + i)}
              </span>
              <span className="text-xs font-bold text-[#F3F2EC]">{opt.title}</span>
            </div>

            {opt.description && (
              <p className="text-xs text-[#A4A7A3] italic">{opt.description}</p>
            )}

            {/* Pros */}
            {opt.pros && opt.pros.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#C7F36B]">Upside Advantages</span>
                <ul className="space-y-1">
                  {opt.pros.map((p, idx) => (
                    <li key={idx} className="text-xs text-[#F3F2EC] flex items-start space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-[#C7F36B] flex-shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cons */}
            {opt.cons && opt.cons.length > 0 && (
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-bold uppercase text-[#E55353]">Downside & Friction</span>
                <ul className="space-y-1">
                  {opt.cons.map((c, idx) => (
                    <li key={idx} className="text-xs text-[#F3F2EC] flex items-start space-x-1.5">
                      <X className="w-3.5 h-3.5 text-[#E55353] flex-shrink-0 mt-0.5" />
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
