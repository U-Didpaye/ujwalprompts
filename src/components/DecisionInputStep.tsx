import React, { useState } from 'react';
import { DecisionInput, CategoryType, DecisionOption } from '../types/decision';
import { Sparkles, Plus, Trash2, ArrowRight, Lightbulb, Layers, DollarSign, Clock, AlertCircle } from 'lucide-react';

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
  onStartAnalysis
}) => {
  const [newAssumption, setNewAssumption] = useState('');

  const handleFieldChange = (field: keyof DecisionInput, value: any) => {
    onChange({
      ...input,
      [field]: value,
      updatedAt: new Date().toISOString()
    });
  };

  const handleAddOption = () => {
    const nextChar = String.fromCharCode(65 + input.options.length);
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

  const isValid = input.title.trim().length >= 5 && input.currentContext.trim().length >= 10;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Primary Input Card */}
      <div className="obsidian-panel rounded-2xl p-6 sm:p-8 space-y-6">
        
        {/* Title & Category Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label htmlFor="decision-title" className="text-xs font-bold uppercase tracking-wider text-[#C7F36B] flex items-center space-x-2">
              <span>Step 1: Define Decision Context</span>
            </label>

            {/* Category Selector Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-[#A4A7A3] mr-1 hidden sm:inline">Domain:</span>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleFieldChange('category', cat)}
                  className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all ${
                    input.category === cat
                      ? 'bg-[#C7F36B] text-[#090A0A] border-[#C7F36B] font-bold shadow-sm'
                      : 'bg-[#151717] text-[#A4A7A3] border-white/5 hover:text-[#F3F2EC]'
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
            className="w-full text-lg sm:text-xl font-bold bg-[#090A0A] border border-white/10 rounded-xl px-4 py-3 text-[#F3F2EC] placeholder:text-[#6B7280] focus:border-[#C7F36B] transition-colors"
          />

          {/* Context Input */}
          <div className="space-y-2">
            <label htmlFor="decision-context" className="text-xs font-semibold text-[#F3F2EC] flex items-center justify-between">
              <span>Current Context & Background</span>
              <span className="text-[11px] text-[#A4A7A3]">State compensation, constraints, roles, or liquid cash reserves</span>
            </label>
            <textarea
              id="decision-context"
              rows={4}
              value={input.currentContext}
              onChange={e => handleFieldChange('currentContext', e.target.value)}
              placeholder="Describe your current situation, key numbers (compensation, cash balance, timeline), team dynamics, or constraints..."
              className="w-full text-sm bg-[#090A0A] border border-white/10 rounded-xl px-4 py-3 text-[#F3F2EC] placeholder:text-[#6B7280] focus:border-[#C7F36B] transition-colors"
            />
          </div>
        </div>

        {/* Options Comparison Section */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#F3F2EC] flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#C7F36B]" />
                <span>Options Being Evaluated ({input.options.length})</span>
              </h3>
              <p className="text-xs text-[#A4A7A3]">Compare Option A vs Option B or add custom choices</p>
            </div>

            <button
              type="button"
              onClick={handleAddOption}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#1A1D1D] hover:bg-[#242828] text-[#C7F36B] border border-[#C7F36B]/30 transition-colors flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Option</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {input.options.map((option, idx) => (
              <div key={option.id} className="p-4 rounded-xl bg-[#090A0A] border border-white/10 space-y-3 relative group">
                {input.options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(option.id)}
                    className="absolute top-3 right-3 p-1 rounded-md text-[#A4A7A3] hover:text-[#E55353] transition-colors"
                    title="Remove Option"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#C7F36B]">Option {idx + 1}</span>
                  <input
                    type="text"
                    value={option.title}
                    onChange={e => handleOptionChange(option.id, 'title', e.target.value)}
                    placeholder={`Option ${idx + 1} Title`}
                    className="w-full text-sm font-bold bg-[#151717] border border-white/10 rounded-lg px-3 py-1.5 text-[#F3F2EC] focus:border-[#C7F36B]"
                  />
                </div>

                <textarea
                  rows={2}
                  value={option.description}
                  onChange={e => handleOptionChange(option.id, 'description', e.target.value)}
                  placeholder="Key characteristics or overview of this path..."
                  className="w-full text-xs bg-[#151717] border border-white/10 rounded-lg px-3 py-1.5 text-[#A4A7A3] placeholder:text-[#6B7280] focus:border-[#C7F36B]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Key Assumptions & Parameters */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-sm font-bold text-[#F3F2EC] flex items-center space-x-2">
            <Lightbulb className="w-4 h-4 text-[#D6A84F]" />
            <span>Key Assumptions You Are Making</span>
          </h3>

          <div className="space-y-2">
            {input.keyAssumptions.map((asm, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-[#090A0A] border border-white/10 text-xs text-[#F3F2EC]">
                <span className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]" />
                  <span>{asm}</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveAssumption(idx)}
                  className="text-[#A4A7A3] hover:text-[#E55353] p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newAssumption}
                onChange={e => setNewAssumption(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddAssumption())}
                placeholder="e.g. Startup cash runway is 18 months; my family can absorb a salary dip..."
                className="flex-1 text-xs bg-[#090A0A] border border-white/10 rounded-lg px-3 py-2 text-[#F3F2EC] focus:border-[#C7F36B]"
              />
              <button
                type="button"
                onClick={handleAddAssumption}
                className="btn-secondary text-xs px-3 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Additional Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#F3F2EC] flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C7F36B]" />
              <span>Timeframe / Deadline</span>
            </label>
            <input
              type="text"
              value={input.timeframe}
              onChange={e => handleFieldChange('timeframe', e.target.value)}
              placeholder="e.g. Decision needed within 7 days"
              className="w-full text-xs bg-[#090A0A] border border-white/10 rounded-lg px-3 py-2 text-[#F3F2EC] focus:border-[#C7F36B]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#F3F2EC] flex items-center space-x-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#C7F36B]" />
              <span>Financial Variance / Cash Impact</span>
            </label>
            <input
              type="text"
              value={input.financialImpact}
              onChange={e => handleFieldChange('financialImpact', e.target.value)}
              placeholder="e.g. -$45k cash salary diff vs 0.8% equity grant"
              className="w-full text-xs bg-[#090A0A] border border-white/10 rounded-lg px-3 py-2 text-[#F3F2EC] focus:border-[#C7F36B]"
            />
          </div>
        </div>

        {/* Primary Action CTA */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#A4A7A3] flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-[#C7F36B] flex-shrink-0" />
            <span>BlindSpot AI will perform a multi-factor stress test on your parameters.</span>
          </div>

          <button
            type="button"
            disabled={!isValid}
            onClick={onStartAnalysis}
            className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all ${
              isValid
                ? 'btn-lime'
                : 'bg-[#1A1D1D] text-[#6B7280] cursor-not-allowed border border-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#090A0A]" />
            <span>START BLINDSPOT ANALYSIS</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

      </div>
    </div>
  );
};
