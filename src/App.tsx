import React, { useState, useEffect } from 'react';
import { WorkflowStep, DecisionInput, AnalysisResult, DecisionRecord, BlindSpotItem } from './types/decision';
import { DEMO_SCENARIOS } from './data/demoDecisions';
import { storageService } from './services/storageService';
import { aiService } from './services/aiService';

import { OpeningAnimation } from './components/OpeningAnimation';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { StepProgress } from './components/StepProgress';
import { DecisionInputStep } from './components/DecisionInputStep';
import { AnalysisLoadingStep } from './components/AnalysisLoadingStep';
import { XRayBreakdownStep } from './components/XRayBreakdownStep';
import { BlindSpotsResultsStep } from './components/BlindSpotsResultsStep';
import { ChallengeStep } from './components/ChallengeStep';
import { ScenarioExplorerStep } from './components/ScenarioExplorerStep';
import { FinalReflectionStep } from './components/FinalReflectionStep';

import { ChallengeModal } from './components/ChallengeModal';
import { DecisionHistoryDrawer } from './components/DecisionHistoryDrawer';
import { ExportModal } from './components/ExportModal';
import { ParticleBackground } from './components/ParticleBackground';

export type ThemeMode = 'obsidian' | 'deep-plum';

export const App: React.FC = () => {
  // Theme state persisted in localStorage
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('blindspot_theme_v2');
    if (saved === 'deep-plum' || saved === 'obsidian') return saved;
    return 'obsidian';
  });

  // Apply data-theme attribute on document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('blindspot_theme_v2', theme);
  }, [theme]);

  // Opening animation state
  const [showOpening, setShowOpening] = useState<boolean>(true);

  // Workflow step state defaults to landing
  const [activeStep, setActiveStep] = useState<WorkflowStep>('landing');
  
  // Decision Input state initialized with default draft or realistic demo
  const [input, setInput] = useState<DecisionInput>(() => {
    const draft = storageService.getActiveDraft();
    if (draft && draft.title) return draft as DecisionInput;
    return DEMO_SCENARIOS[0].input;
  });

  // Analysis result state
  const [result, setResult] = useState<AnalysisResult | null>(DEMO_SCENARIOS[0].defaultResult);

  // History state
  const [history, setHistory] = useState<DecisionRecord[]>(() => storageService.getHistory());
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Modals & Drawers state
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [challengeSpot, setChallengeSpot] = useState<BlindSpotItem | null>(null);

  // Save active draft on input change
  useEffect(() => {
    storageService.saveActiveDraft(input);
  }, [input]);

  // Handle 1-Click Demo scenario selection
  const handleSelectDemo = (demoId: string) => {
    const scenario = DEMO_SCENARIOS.find(d => d.id === demoId) || DEMO_SCENARIOS[0];
    setInput(scenario.input);
    setResult(scenario.defaultResult);
    setActiveStep('xray'); // Immediately jump to Decision X-Ray!
    setIsSaved(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset for a completely new decision
  const handleNewDecision = () => {
    const newId = `dec-${Date.now()}`;
    const freshInput: DecisionInput = {
      id: newId,
      title: '',
      category: 'Career',
      currentContext: '',
      options: [
        { id: `opt-${Date.now()}-1`, title: 'Option A', description: '', pros: [''], cons: [''] },
        { id: `opt-${Date.now()}-2`, title: 'Option B', description: '', pros: [''], cons: [''] }
      ],
      keyAssumptions: ['I expect execution timeline to be within 12 months.'],
      timeframe: 'Decision needed within 14 days',
      financialImpact: 'Unspecified cash variance',
      mainConcerns: '',
      updatedAt: new Date().toISOString()
    };
    setInput(freshInput);
    setResult(null);
    setActiveStep('decision');
    setIsSaved(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start AI analysis
  const handleStartAnalysis = async () => {
    setActiveStep('analysis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Called when progressive loading finishes
  const handleAnalysisCompleted = async () => {
    const res = await aiService.analyzeDecision(input);
    setResult(res);
    setActiveStep('xray');
    setIsSaved(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Challenge a specific blind spot
  const handleOpenChallenge = (blindSpotId: string) => {
    if (!result) return;
    const spot = result.blindSpots.find(b => b.id === blindSpotId);
    if (spot) {
      setChallengeSpot(spot);
    }
  };

  const handleSubmitChallenge = (blindSpotId: string, notes: string) => {
    if (!result) return;
    const updatedResult = aiService.reevaluateAnalysis(result, blindSpotId, notes);
    setResult(updatedResult);
    setChallengeSpot(null);
  };

  // Answer a challenge question
  const handleAnswerChallengeQuestion = (questionId: string, answer: string) => {
    if (!result) return;
    const updatedResult = aiService.reevaluateAnalysis(result, undefined, undefined, questionId, answer);
    setResult(updatedResult);
  };

  // Save current decision to history
  const handleSaveToHistory = () => {
    if (!result) return;
    const record: DecisionRecord = { input, result, completed: true };
    storageService.saveDecisionRecord(record);
    setHistory(storageService.getHistory());
    setIsSaved(true);
  };

  // Load a record from history
  const handleLoadRecord = (record: DecisionRecord) => {
    setInput(record.input);
    setResult(record.result);
    setActiveStep('reflection');
    setIsSaved(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete record from history
  const handleDeleteRecord = (id: string) => {
    storageService.deleteDecisionRecord(id);
    setHistory(storageService.getHistory());
  };

  // Clear all history
  const handleClearHistory = () => {
    storageService.clearHistory();
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-[#090A0A] text-[#F3F2EC] flex flex-col font-sans selection:bg-[#C7F36B] selection:text-black">
      
      {/* 1.8s Cinematic Opening Animation */}
      {showOpening && (
        <OpeningAnimation onComplete={() => setShowOpening(false)} />
      )}

      {/* Navigation Header */}
      <Navbar
        activeStep={activeStep}
        onStepChange={setActiveStep}
        onSelectDemo={handleSelectDemo}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onNewDecision={handleNewDecision}
        historyCount={history.length}
        onToggleHelp={() => setActiveStep('landing')}
        currentTheme={theme}
        onThemeChange={setTheme}
      />

      {/* Internal Screens Animated AI Particle Background (hidden on landing page) */}
      {activeStep !== 'landing' && (
        <ParticleBackground theme={theme} />
      )}

      {/* Main Content Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Stepper Progress Indicator */}
        <StepProgress
          currentStep={activeStep}
          onStepClick={setActiveStep}
          isAnalysisComplete={!!result}
        />

        {/* Dynamic Step View Rendering */}
        {activeStep === 'landing' && (
          <LandingHero
            onStartThinking={() => setActiveStep('decision')}
            onStartDemo={handleSelectDemo}
          />
        )}

        {activeStep === 'decision' && (
          <DecisionInputStep
            input={input}
            onChange={setInput}
            onStartAnalysis={handleStartAnalysis}
            onSelectDemoPreset={handleSelectDemo}
          />
        )}

        {activeStep === 'analysis' && (
          <AnalysisLoadingStep onComplete={handleAnalysisCompleted} />
        )}

        {activeStep === 'xray' && result && (
          <XRayBreakdownStep
            result={result}
            onContinueToBlindSpots={() => setActiveStep('blindspots')}
          />
        )}

        {activeStep === 'blindspots' && result && (
          <BlindSpotsResultsStep
            result={result}
            onChallengeBlindSpot={handleOpenChallenge}
            onContinueToChallenge={() => setActiveStep('challenge')}
            onEditContext={() => setActiveStep('decision')}
          />
        )}

        {activeStep === 'challenge' && result && (
          <ChallengeStep
            result={result}
            onAnswerChallengeQuestion={handleAnswerChallengeQuestion}
            onContinueToScenarios={() => setActiveStep('scenarios')}
          />
        )}

        {activeStep === 'scenarios' && result && (
          <ScenarioExplorerStep
            result={result}
            onContinueToSynthesis={() => setActiveStep('reflection')}
          />
        )}

        {activeStep === 'reflection' && result && (
          <FinalReflectionStep
            record={{ input, result, completed: true }}
            onOpenExport={() => setIsExportOpen(true)}
            onSaveToHistory={handleSaveToHistory}
            onNewDecision={handleNewDecision}
            isSaved={isSaved}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#090A0A] py-8 text-center text-xs text-[#A4A7A3]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-bold text-[#F3F2EC]">BlindSpot</span> — AI Decision Intelligence & Cognitive Bias Analyzer
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setActiveStep('landing')} className="hover:text-[#F3F2EC]">
              Product Philosophy
            </button>
            <button onClick={() => setIsHistoryOpen(true)} className="hover:text-[#F3F2EC]">
              Saved History ({history.length})
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <ChallengeModal
        blindSpot={challengeSpot}
        onClose={() => setChallengeSpot(null)}
        onSubmitChallenge={handleSubmitChallenge}
      />

      <DecisionHistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onLoadRecord={handleLoadRecord}
        onDeleteRecord={handleDeleteRecord}
        onClearAll={handleClearHistory}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        record={result ? { input, result, completed: true } : null}
      />

    </div>
  );
};
