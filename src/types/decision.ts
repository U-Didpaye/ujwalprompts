export type CategoryType = 'Career' | 'Business' | 'Financial' | 'Personal' | 'Strategy';

export type SeverityType = 'high' | 'medium' | 'low';

export type BlindSpotCategory = 
  | 'Financial Uncertainty'
  | 'Operational Risk'
  | 'Cognitive Bias Signal'
  | 'Opportunity Cost'
  | 'Timeline & Execution'
  | 'Unexamined Assumptions'
  | 'Market & External';

export type WorkflowStep = 
  | 'landing'
  | 'decision'
  | 'analysis'
  | 'xray'       // Fact / Assumption / Unknown / Hypothetical breakdown
  | 'blindspots' // Blind Spots & Bias Signals
  | 'challenge'  // Challenge My Thinking & Flip Decision
  | 'scenarios'  // Scenarios, Stakeholders & Control Matrix
  | 'reflection' // Before vs After Thinking & Executive Brief

export interface DecisionOption {
  id: string;
  title: string;
  description: string;
  pros: string[];
  cons: string[];
}

export interface DecisionInput {
  id: string;
  title: string;
  category: CategoryType;
  currentContext: string;
  options: DecisionOption[];
  keyAssumptions: string[];
  timeframe: string;
  financialImpact: string;
  mainConcerns: string;
  updatedAt: string;
}

export interface FactItem {
  id: string;
  text: string;
  category: string;
}

export interface AssumptionItem {
  id: string;
  text: string;
  riskLevel: SeverityType;
  status: 'unexamined' | 'tested' | 'invalidated';
}

export interface UnknownItem {
  id: string;
  question: string;
  whyCritical: string;
  verificationStep: string;
}

export interface HypotheticalScenario {
  id: string;
  title: string;
  premise: string;
  potentialOutcome: string;
}

export interface EvidenceGapItem {
  id: string;
  claim: string;
  status: 'SUPPORTED' | 'UNSUPPORTED' | 'UNKNOWN' | 'SUBJECTIVE';
  verificationAction: string;
}

export interface BlindSpotItem {
  id: string;
  category: BlindSpotCategory;
  severity: SeverityType;
  title: string;
  summary: string;
  whyItMatters: string;
  whatIsUnknown: string;
  reflectionQuestion: string;
  confidenceScore: number;
  challengeNotes?: string;
  status: 'active' | 'challenged' | 'resolved';
}

export interface CognitiveBiasSignal {
  id: string;
  name: string;
  signalMessage: string;
  description?: string;
  explanation?: string;
  mitigation: string;
  score: number;
}

export interface ReflectionQuestionItem {
  id: string;
  question: string;
  context: string;
  suggestedOptions?: string[];
  userAnswer?: string;
  status: 'unanswered' | 'answered';
}

export interface ScenarioItem {
  id: string;
  type: 'best' | 'base' | 'worst';
  title: string;
  description: string;
  drivers: string[];
  controllableFactors: string[];
  unknowns: string[];
}

export interface StakeholderPerspective {
  id: string;
  stakeholder: 'Me' | 'Family' | 'Friend / Mentor' | 'Employer / Team' | '1 Year From Now' | '5 Years From Now';
  viewpoint: string;
  concerns: string[];
}

export interface ControlMatrix {
  canInfluence: string[];
  cannotControl: string[];
}

export interface MissingInfoChecklist {
  id: string;
  item: string;
  category: string;
  isChecked: boolean;
}

export interface ThinkingCompleteness {
  score: number;
  breakdown: {
    assumptions: number;
    evidence: number;
    risks: number;
    alternatives: number;
    stakeholders: number;
    tradeOffs: number;
    scenarios: number;
  };
  explanation: string;
}

export interface BeforeAfterThinking {
  initialThinking: string;
  whatBlindSpotRevealed: string[];
  updatedUnderstanding: string;
}

export interface OppositeOptionAnalysis {
  title: string;
  overlookedBenefits: string[];
  overlookedCosts: string[];
  risks: string[];
  conditionsForSuccess: string[];
}

export interface AnalysisResult {
  thinkingCompleteness: ThinkingCompleteness;
  riskIndicator: number;
  executiveSummary: string;
  facts: FactItem[];
  assumptions: AssumptionItem[];
  unknowns: UnknownItem[];
  hypotheticals: HypotheticalScenario[];
  evidenceGaps: EvidenceGapItem[];
  blindSpots: BlindSpotItem[];
  cognitiveBiasSignals: CognitiveBiasSignal[];
  challengeQuestions: ReflectionQuestionItem[];
  scenarios: ScenarioItem[];
  stakeholderPerspectives: StakeholderPerspective[];
  controlMatrix: ControlMatrix;
  missingChecklist: MissingInfoChecklist[];
  flipDecision: OppositeOptionAnalysis;
  beforeAfterMap: BeforeAfterThinking;
  recommendations: string[];
  alternativeScenarios: string[];
  isFallbackMode?: boolean;
  analyzedAt: string;
}

export interface DecisionRecord {
  input: DecisionInput;
  result: AnalysisResult;
  completed: boolean;
}
