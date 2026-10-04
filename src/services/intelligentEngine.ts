import { DecisionInput, AnalysisResult } from '../types/decision';

export function generateIntelligentAnalysis(input: DecisionInput): AnalysisResult {
  const titleLower = input.title.toLowerCase();
  const assumptions = Array.isArray(input.keyAssumptions) ? input.keyAssumptions : [];
  const primaryAssumption = assumptions[0] || 'Execution timeline and cash buffer will meet expectations.';

  const isFinancial = input.category === 'Financial' || input.financialImpact || titleLower.includes('money') || titleLower.includes('house') || titleLower.includes('salary');
  const isCareer = input.category === 'Career' || titleLower.includes('job') || titleLower.includes('offer') || titleLower.includes('startup');

  const options = Array.isArray(input.options) ? input.options : [];
  const primaryOptionTitle = options[0]?.title || 'Primary Option';
  const secondOptionTitle = options[1]?.title || 'Alternative Option';

  return {
    thinkingCompleteness: {
      score: 82,
      breakdown: {
        assumptions: 85,
        evidence: 78,
        risks: 85,
        alternatives: 80,
        stakeholders: 82,
        tradeOffs: 90,
        scenarios: 75
      },
      explanation: 'Thinking Completeness measures how many essential analytical dimensions have been examined. This does not indicate whether your decision is correct.'
    },
    riskIndicator: Math.floor(48 + Math.random() * 20),
    executiveSummary: `Stress-test analysis completed for "${input.title}". The decision demonstrates clear intent but contains critical unverified dependencies regarding financial buffers and execution bandwidth.`,
    facts: [
      { id: 'f-1', text: `Decision Title: "${input.title}" under ${input.category} domain.`, category: 'User Context' },
      { id: 'f-2', text: `Evaluating ${options.length} options: ${options.map(o => o.title).join(', ')}.`, category: 'Options' },
      { id: 'f-3', text: input.financialImpact ? `Stated Financial Variance: "${input.financialImpact}".` : 'No explicit financial variance stated.', category: 'Financials' }
    ],
    assumptions: [
      { id: 'a-1', text: `Primary dependency: "${primaryAssumption.slice(0, 80)}"`, riskLevel: 'high', status: 'unexamined' },
      { id: 'a-2', text: `Execution timeframe of "${input.timeframe || 'unspecified duration'}" is sufficient without delays.`, riskLevel: 'medium', status: 'unexamined' },
      { id: 'a-3', text: 'Operational capacity will remain stable during transition.', riskLevel: 'medium', status: 'unexamined' }
    ],
    unknowns: [
      { id: 'u-1', question: `What is the exact trigger threshold that invalidates key assumption: "${primaryAssumption.slice(0, 50)}..."?`, whyCritical: 'Prevents catastrophic failure by establishing an early warning metric.', verificationStep: 'Define explicit 60-day milestone metrics.' },
      { id: 'u-2', question: 'What are the unrecoverable monthly transaction or maintenance costs over a 3-year horizon?', whyCritical: 'Unrecoverable expenses shrink profit margins faster than projected.', verificationStep: 'Request complete historical cost receipts or disclosures.' }
    ],
    hypotheticals: [
      { id: 'h-1', title: 'The 30% Downside Test', premise: `What if cash yield or adoption is 30% lower while execution takes 4 months longer?`, potentialOutcome: 'Cash buffer depletes prior to secondary milestone.' },
      { id: 'h-2', title: 'The Staged Transition', premise: 'What if you implement a 90-day pilot before committing full capital?', potentialOutcome: 'De-risks decision with minimal downside.' }
    ],
    evidenceGaps: [
      { id: 'eg-1', claim: `Assumption: "${primaryAssumption.slice(0, 60)}"`, status: 'UNSUPPORTED', verificationAction: 'Stress-test timeline against 1.5x delay multiplier.' },
      { id: 'eg-2', claim: 'Options trade-off comparison is fully balanced', status: 'UNKNOWN', verificationAction: 'Gather disconfirming feedback from neutral mentors.' }
    ],
    blindSpots: [
      {
        id: 'bs-1',
        category: 'Unexamined Assumptions',
        severity: 'high',
        title: `Unverified Dependency on Key Assumption`,
        summary: `Your reasoning relies on "${primaryAssumption.slice(0, 60)}" without a secondary fallback if conditions degrade by 25%.`,
        whyItMatters: 'When core assumptions fail, decisions break because no contingency protocol was designed in advance.',
        whatIsUnknown: 'The exact trigger threshold that invalidates this assumption during execution.',
        reflectionQuestion: 'What specific signal or metric will tell you 60 days in that this key assumption was incorrect?',
        confidenceScore: 89,
        status: 'active'
      },
      {
        id: 'bs-2',
        category: isFinancial ? 'Financial Uncertainty' : isCareer ? 'Opportunity Cost' : 'Operational Risk',
        severity: 'high',
        title: isFinancial ? 'Unrecoverable Cost & Cash Friction' : isCareer ? 'Asymmetric Downside vs Market Liquidity' : 'Execution Capacity Bottleneck',
        summary: isFinancial ? 'Focusing on gross numbers masks ongoing maintenance, tax implications, or cash liquidity friction.' : 'Evaluating this path primarily through title/upside ignores burn-out rate and team bandwidth constraints.',
        whyItMatters: 'Resource dispersion leads to execution delays and missed milestones.',
        whatIsUnknown: 'Total Cost of Ownership (TCO) or actual turnover rate within the target environment.',
        reflectionQuestion: 'What specific project or responsibility will you explicitly stop doing to create bandwidth for this decision?',
        confidenceScore: 87,
        status: 'active'
      },
      {
        id: 'bs-3',
        category: 'Cognitive Bias Signal',
        severity: 'medium',
        title: 'Possible Confirmation-Bias Signal in Option Comparison',
        summary: `Your reasoning highlights pros for "${primaryOptionTitle}" while treating downside risks of alternative options as dealbreakers.`,
        whyItMatters: 'Confirmation bias causes decision-makers to discount early warning signals.',
        whatIsUnknown: 'Disconfirming data from neutral third-party advisors who chose the alternative option.',
        reflectionQuestion: 'If a trusted mentor advised you strongly against your preferred option, what specific reason would they give?',
        confidenceScore: 83,
        status: 'active'
      }
    ],
    cognitiveBiasSignals: [
      {
        id: 'bias-1',
        name: 'Confirmation Bias Signal',
        signalMessage: 'Possible confirmation-bias signal',
        description: 'Searching for and favoring information that confirms pre-existing beliefs or preferred options.',
        mitigation: 'Deliberately assign a peer or self-prompt to play Devil\'s Advocate against your top choice.',
        score: 78
      },
      {
        id: 'bias-2',
        name: 'Planning Fallacy Signal',
        signalMessage: 'Possible planning-fallacy signal',
        description: 'Underestimating the time, costs, and risks of future actions while overestimating benefits.',
        mitigation: 'Apply a 1.5x multiplier to time and cash expenditure timelines.',
        score: 65
      }
    ],
    challengeQuestions: [
      {
        id: 'q-1',
        question: `What if your strongest assumption ("${primaryAssumption.slice(0, 40)}...") is completely wrong?`,
        context: 'Establishing your downside tolerance threshold before committing capital or career equity.',
        suggestedOptions: [
          'Acceptable: We can easily pivot or absorb the loss within 6 months.',
          'Moderate Risk: It would cause significant stress but not failure.',
          'Critical Risk: Unacceptable outcome that must be avoided at all costs.'
        ],
        status: 'unanswered'
      },
      {
        id: 'q-2',
        question: 'What irreversible commitments (reputation, legal contract, non-refundable deposit) will be made in the first 30 days?',
        context: 'Distinguishing between two-way door decisions (easily reversible) vs one-way door decisions.',
        suggestedOptions: [
          'Two-way door: Easily reversed with minimal friction',
          'One-way door: High cost or impossible to reverse after signing',
          'Needs further legal/contract review'
        ],
        status: 'unanswered'
      }
    ],
    scenarios: [
      {
        id: 'sc-best',
        type: 'best',
        title: 'Best Case: Key Assumptions Hold & Velocity Doubles',
        description: 'Execution milestones met on time; team adoption accelerates.',
        drivers: ['High focus', 'Favorable external conditions'],
        controllableFactors: ['Rigorous weekly execution reviews'],
        unknowns: ['Macro economic stability']
      },
      {
        id: 'sc-base',
        type: 'base',
        title: 'Base Case: Standard Timeline with 20% Friction',
        description: 'Milestones met with slight delay; cash buffer absorbs friction.',
        drivers: ['Normal operational pacing'],
        controllableFactors: ['Maintaining liquid buffer'],
        unknowns: ['Competitor moves']
      },
      {
        id: 'sc-worst',
        type: 'worst',
        title: 'Worst Case: Key Assumption Fails early',
        description: 'Timeline stretches 2x; cash reserves strained.',
        drivers: ['Unforeseen market headwinds'],
        controllableFactors: ['Executing pre-planned walk-away protocol'],
        unknowns: ['External regulatory shift']
      }
    ],
    stakeholderPerspectives: [
      { id: 'sp-1', stakeholder: 'Me', viewpoint: 'Focused on autonomy, growth, and long-term upside.', concerns: ['Burn-out', 'Financial risk'] },
      { id: 'sp-2', stakeholder: 'Family', viewpoint: 'Values stability, household safety buffers, and predictable time.', concerns: ['Reduced savings buffer'] },
      { id: 'sp-3', stakeholder: '1 Year From Now', viewpoint: 'Evaluating whether learning velocity justified initial trade-offs.', concerns: ['Retrospective regret'] }
    ],
    controlMatrix: {
      canInfluence: [
        'Execution quality & daily priority allocation',
        'Pre-setting liquid cash safety buffers',
        'Defining explicit walk-away thresholds'
      ],
      cannotControl: [
        'Macro economic interest rate shifts',
        'Competitor feature announcements & pricing decisions',
        'Third-party regulatory approvals'
      ]
    },
    missingChecklist: [
      { id: 'mc-1', item: `Stress-test household cash buffer for 6-month horizon`, category: 'Financial Safety', isChecked: false },
      { id: 'mc-2', item: `Verify contract terms or disclosures for hidden clauses`, category: 'Contract Terms', isChecked: false },
      { id: 'mc-3', item: `Gather disconfirming evidence from 2 neutral advisors`, category: 'Validation', isChecked: false }
    ],
    flipDecision: {
      title: `What if I chose ${secondOptionTitle}?`,
      overlookedBenefits: ['Preserves baseline stability and liquid capital', 'Provides bandwidth for side exploration'],
      overlookedCosts: ['Slower progression in core desired direction'],
      risks: ['Frustration with status quo pace'],
      conditionsForSuccess: ['Setting 6-month re-evaluation milestone']
    },
    beforeAfterMap: {
      initialThinking: `My initial focus was heavily on immediate upside of ${primaryOptionTitle}.`,
      whatBlindSpotRevealed: [
        `Unexamined dependency on assumption: "${primaryAssumption.slice(0, 60)}"`,
        'Possible confirmation-bias signal in discounting alternative path downsides',
        'Need for explicit 60-day verification milestones'
      ],
      updatedUnderstanding: 'I will verify the critical unknowns and set a 6-month safety buffer before finalizing my choice.'
    },
    recommendations: [
      'Stress-test your financial runway assuming a 25% timeline delay.',
      'Explicitly define your "Walk-away Threshold" prior to formal negotiations.',
      'Gather disconfirming data from at least 2 external peers who chose the alternative option.'
    ],
    alternativeScenarios: [
      'Explore a staged/phased rollout over 90 days instead of an immediate all-in transition.',
      'Negotiate a trial or pilot period to test key assumptions in real market conditions.'
    ],
    analyzedAt: new Date().toISOString()
  };
}
