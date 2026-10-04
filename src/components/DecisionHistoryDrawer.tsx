import React from 'react';
import { DecisionRecord } from '../types/decision';
import { X, History, Trash2, ArrowRight, Calendar } from 'lucide-react';

interface DecisionHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: DecisionRecord[];
  onLoadRecord: (record: DecisionRecord) => void;
  onDeleteRecord: (id: string) => void;
  onClearAll: () => void;
}

export const DecisionHistoryDrawer: React.FC<DecisionHistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onLoadRecord,
  onDeleteRecord,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl p-6 flex flex-col justify-between space-y-4">
          
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <History className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white">Decision History</h2>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* History Records List */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {history.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <History className="w-10 h-10 text-slate-700 mx-auto" />
                <p className="text-xs text-slate-400">No saved decisions yet.</p>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                  Run a decision analysis and click "Save to History" to store your results locally.
                </p>
              </div>
            ) : (
              history.map(record => (
                <div
                  key={record.input.id}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5 hover:border-slate-700 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {record.input.category}
                    </span>

                    <span className="text-[10px] text-slate-500 flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(record.input.updatedAt).toLocaleDateString()}</span>
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                    {record.input.title}
                  </h3>

                  <div className="flex items-center justify-between pt-1">
                    <div className="text-[11px] text-slate-400">
                      Completeness: <span className="font-bold text-indigo-400">{record.result.thinkingCompleteness?.score || 82}%</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onDeleteRecord(record.input.id)}
                        className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          onLoadRecord(record);
                          onClose();
                        }}
                        className="text-xs font-bold px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center space-x-1"
                      >
                        <span>Load</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {history.length > 0 && (
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500">{history.length} saved</span>
              <button
                onClick={onClearAll}
                className="text-xs text-rose-400 hover:underline"
              >
                Clear History
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
