import React, { useState } from 'react';
import { BlindSpotItem } from '../types/decision';
import { X, MessageSquarePlus, Sparkles, AlertTriangle } from 'lucide-react';

interface ChallengeModalProps {
  blindSpot: BlindSpotItem | null;
  onClose: () => void;
  onSubmitChallenge: (blindSpotId: string, challengeNotes: string) => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  blindSpot,
  onClose,
  onSubmitChallenge
}) => {
  if (!blindSpot) return null;

  const [notes, setNotes] = useState(blindSpot.challengeNotes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) return;
    onSubmitChallenge(blindSpot.id, notes.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold">
            <MessageSquarePlus className="w-3.5 h-3.5 text-indigo-400" />
            <span>Challenge Blind Spot Finding</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            {blindSpot.title}
          </h3>
          <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800 italic">
            "{blindSpot.summary}"
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 block">
              Provide Counter-Evidence or Mitigation Context:
            </label>
            <textarea
              rows={4}
              required
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. We have secured a $50k emergency cash line of credit, or the founder confirmed an extended 7-year option exercise window..."
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 shadow-inner"
            />
          </div>

          <div className="text-[11px] text-slate-400 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Submitting will recalculate decision risk and update clarity index.</span>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!notes.trim()}
              className="text-xs font-bold px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 transition-colors shadow-md"
            >
              Apply Challenge & Update AI Analysis
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
