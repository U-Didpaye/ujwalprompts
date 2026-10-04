import React, { useState } from 'react';
import { DecisionInput, CategoryType, DecisionOption } from '../types/decision';
import { Sparkles, Plus, Trash2, ArrowRight, Lightbulb, HelpCircle, Layers, DollarSign, Clock, AlertCircle } from 'lucide-react';

interface DecisionInputStepProps {
  input: DecisionInput;
  onChange: (updated: DecisionInput) => void;
  onStartAnalysis: () => void;
  onSelectDemoPreset: (demoId: string) => void;
}

const CATEGORIES: CategoryType[] = ['Career', 'Business', 'Financial', 'Personal', 'Strategy'];

export const DecisionInputStep: React.FC<DecisionInputStepProps> = ({
  input,
  onChange,
  onStartAnalysis,
  onSelectDemoPreset
}) => {
  const [newAssumption, setNewAssumption] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(true);

  // Field change helpers
  const handleFieldChange = (field: keyof DecisionInput, value: any) => {
    onChange({
      ...input,
      [field]: value,
      updatedAt: new Date().toISOString()
    });
  };

  // Add / Remove Options
  const handleAddOption = () => {
    const nextChar = String.fromCharCode(65 + input.options.length); // A, B, C...
    const newOpt: DecisionOption = {
      id: `opt-${Date.now()}`,
      title: `Option ${nextChar}: [Title]`,
      description: '',
      pros: [''],
      cons: ['']
    };
    handleFieldChange('options', [...input.options, newOpt]);
  };

  const handleRemoveOption = (id: string) => {
    if (input.options.length <= 1) return;
    handleFieldChange('options', input.options.filter(o => o.id !== id));
  };

  const handleOptionChange = (id: string, key: keyof DecisionOption, value: any) => {
    const updatedOpts = input.options.map(o => {
      if (o.id === id) {
        return { ...o, [key]: value };
      }
      return o;
    });
    handleFieldChange('options', updatedOpts);
  };

  // Add / Remove Key Assumptions
  const handleAddAssumption = () => {
    if (!newAssumption.trim()) return;
    handleFieldChange('keyAssumptions', [...input.keyAssumptions, newAssumption.trim()]);
    setNewAssumption('');
  };

  const handleRemoveAssumption = (index: number) => {
    handleFieldChange(
      'keyAssumptions',
      input.keyAssumptions.filter((_, i) => i !== index)
    );
  };

  // Form Validation check
  const isValid = input.title.trim().length >= 5 && input.currentContext.trim().length >= 10;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Primary Input Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
        
        {/* Title & Category Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label htmlFor="decision-title" className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center space-x-2">
              <span>Step 1: Define Your Decision</span>
            </label>

            {/* Category Selector Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Category:</span>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleFieldChange('category', cat)}
                  className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all ${
                    input.category === cat
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <input
            id="decision-title"
            type="text"
            value={input.title}
            onChange={e => handleFieldChange('title', e.target.value)}
            placeholder="e.g. Should I accept the Lead Engineer offer at a Series A startup vs stay at my current tech firm?"
            className="w-full text-lg sm:text-xl font-bold bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-500 transition-colors shadow-inner"
          />

          {/* Context Input */}
          <div className="space-y-2">
            <label htmlFor="decision-context" className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Current Context & Background</span>
              <span className="text-[11px] text-slate-500">Provide details on salary, roles, location, or constraints</span>
            </label>
            <textarea
              id="decision-context"
              rows={4}
              value={input.currentContext}
              onChange={e => handleFieldChange('currentContext', e.target.value)}
              placeholder="Describe your current situation, key numbers (compensation, cash balance, timeline), team dynamics, or constraints..."
              className="w-full text-sm bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 transition-colors shadow-inner"
            />
          </div>
        </div>

        {/* Options Comparison Section */}
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Options Being Evaluated ({input.options.length})</span>
              </h3>
              <p className="text-xs text-slate-400">Compare Option A vs Option B or add custom choices</p>
            </div>

            <button
              type="button"
              onClick={handleAddOption}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-colors flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Option</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {input.options.map((option, idx) => (
              <div key={option.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3 relative group">
                {input.options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(option.id)}
                    className="absolute top-3 right-3 p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors opacity-80 group-hover:opacity-100"
                    title="Remove Option"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">Option {idx + 1}</span>
                  <input
                    type="text"
                    value={option.title}
                    onChange={e => handleOptionChange(option.id, 'title', e.target.value)}
                    placeholder={`Option ${idx + 1} Title`}
                    className="w-full text-sm font-bold bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:border-indigo-500"
                  />
                </div>

                <textarea
                  rows={2}
                  value={option.description}
                  onChange={e => handleOptionChange(option.id, 'description', e.target.value)}
                  placeholder="Key characteristics or overview of this path..."
                  className="w-full text-xs bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-300 placeholder:text-slate-500 focus:border-indigo-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Key Assumptions & Parameters */}
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Key Assumptions You Are Making</span>
          </h3>

          {/* List of current assumptions */}
          <div className="space-y-2">
            {input.keyAssumptions.map((asm, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-200">
                <span className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{asm}</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveAssumption(idx)}
                  className="text-slate-500 hover:text-rose-400 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Add new assumption input */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newAssumption}
                onChange={e => setNewAssumption(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddAssumption())}
                placeholder="e.g. Startup cash runway is 18 months; my spouse can absorb a salary dip..."
                className="flex-1 text-xs bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddAssumption}
                className="text-xs font-semibold px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Additional Financial & Timeframe Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Timeframe / Deadline</span>
            </label>
            <input
              type="text"
              value={input.timeframe}
              onChange={e => handleFieldChange('timeframe', e.target.value)}
              placeholder="e.g. Decision needed within 7 days"
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Financial Impact / Cash Deficit</span>
            </label>
            <input
              type="text"
              value={input.financialImpact}
              onChange={e => handleFieldChange('financialImpact', e.target.value)}
              placeholder="e.g. -$45k cash salary diff vs 0.8% equity grant"
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Primary Action CTA */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span>BlindSpot AI will perform a multi-factor stress test on your parameters.</span>
          </div>

          <button
            type="button"
            disabled={!isValid}
            onClick={onStartAnalysis}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 shadow-xl transition-all ${
              isValid
                ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/25 ring-1 ring-white/20 transform hover:-translate-y-0.5'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-indigo-200 animate-pulse" />
            <span>Start BlindSpot Analysis</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

      </div>
    </div>
  );
};
