import { DecisionInput, AnalysisResult } from '../types/decision';

export interface DemoScenario {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  input: DecisionInput;
  defaultResult: AnalysisResult;
}

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'career-startup',
    badge: 'Career Decision',
    title: 'Accept Lead Engineer Offer at Series A AI Startup',
    subtitle: 'Choosing between steady BigTech career progression vs high-equity early stage startup risk.',
    input: {
      id: 'demo-career-1',
      title: 'Should I leave BigTech to join an 18-person AI startup as Lead Engineer?',
      category: 'Career',
      currentContext: 'I currently have 6 years at a Fortune 500 tech firm with $230k total compensation, great stability, and predictable 40-hour workweeks. I received an offer from an 18-person AI startup for $185k base + 0.8% equity vesting over 4 years. The founder was previously VP of Product at Stripe.',
      options: [
        {
          id: 'opt-1',
          title: 'Option A: Accept Series A Startup Offer',
          description: 'Higher equity upside, lead architecture decisions, fast pace, building core product from scratch.',
          pros: ['High equity upside if valuation grows', 'Direct influence on product architecture', 'Accelerated leadership experience'],
          cons: ['Lower cash salary ($45k drop)', 'Longer work hours (55+ hrs/week)', 'High startup failure risk within 24 months']
        },
        {
          id: 'opt-2',
          title: 'Option B: Stay at BigTech & Target Promotion',
          description: 'Keep steady high cash compensation, standard benefits, seek senior manager track.',
          pros: ['Predictable income and stock grants', 'Work-life balance and stability', 'Strong brand on resume'],
          cons: ['Slower career progression', 'Hierarchical approval processes', 'Boredom with incremental product updates']
        }
      ],
      keyAssumptions: [
        'The startup has 18+ months of cash runway based on their recent $12M Series A.',
        'My spouse/family can comfortably adjust to a $45k drop in base cash compensation.',
        'The startup equity will be worth significantly more than the cash difference within 3 years.'
      ],
      timeframe: 'Decision needed within 7 days',
      financialImpact: '$45,000 cash salary difference per year, offset by 0.8% equity grant',
      mainConcerns: 'Startup burn rate, valuation dilution in future funding rounds, lost work-life balance.',
      updatedAt: new Date().toISOString()
    },
    defaultResult: {
      thinkingCompleteness: {
        score: 84,
        breakdown: {
          assumptions: 90,
          evidence: 75,
          risks: 88,
          alternatives: 80,
          stakeholders: 85,
          tradeOffs: 92,
          scenarios: 78
        },
        explanation: 'Thinking Completeness measures how many essential analytical dimensions have been examined. This does not indicate whether your decision is correct.'
      },
      riskIndicator: 58,
      executiveSummary: 'Your decision framework heavily anchors on immediate title equity upside and founder prestige, while under-analyzing cash flow buffers, liquidation preferences, and realistic equity dilution across Series B/C rounds.',
      facts: [
        { id: 'f-1', text: 'Current BigTech compensation is $230,000 total comp with 40-hour workweek stability.', category: 'Financial & Role' },
        { id: 'f-2', text: 'Startup offer is $185,000 base salary + 0.8% equity vesting over 4 years.', category: 'Offer Terms' },
        { id: 'f-3', text: 'Founder is ex-VP of Product at Stripe; company recently raised $12M Series A.', category: 'Company Profile' }
      ],
      assumptions: [
        { id: 'a-1', text: 'The startup cash runway is at least 18 months based on $12M Series A.', riskLevel: 'high', status: 'unexamined' },
        { id: 'a-2', text: 'Family finances can easily absorb a $45,000 annual reduction in liquid cash.', riskLevel: 'medium', status: 'unexamined' },
        { id: 'a-3', text: '0.8% equity will monetize within 3 years without major preference dilution.', riskLevel: 'high', status: 'unexamined' }
      ],
      unknowns: [
        { id: 'u-1', question: 'What is the startup\'s monthly net cash burn rate and GPU compute expenditure?', whyCritical: 'Directly dictates actual runway duration before next required round.', verificationStep: 'Ask founder for monthly burn rate and runway projections.' },
        { id: 'u-2', question: 'What preference liquidation terms (1x non-participating vs senior) exist in Series A term sheet?', whyCritical: 'Determines whether common option holders receive $0 in a sub-$50M acquisition.', verificationStep: 'Request Cap Table summary and Liquidation Preference clause.' },
        { id: 'u-3', question: 'What is the post-termination option exercise window (PTEW)?', whyCritical: 'Standard 90 days requires out-of-pocket cash to buy options if you leave early.', verificationStep: 'Check option plan agreement for 90-day vs 7-year exercise window.' }
      ],
      hypotheticals: [
        { id: 'h-1', title: 'The Series B Delay', premise: 'Macro venture market tightens and Series B takes 14 months instead of 8.', potentialOutcome: 'Startup institutes hiring freeze; compensation unadjusted for 2+ years.' },
        { id: 'h-2', title: 'Accelerated Promotion at BigTech', premise: 'Promoting to Staff Engineer at BigTech yields $310k total comp in 12 months.', potentialOutcome: 'Provides $80k additional cash/year to invest independently in venture assets.' }
      ],
      evidenceGaps: [
        { id: 'eg-1', claim: 'Startup has 18 months of runway', status: 'UNSUPPORTED', verificationAction: 'Verify monthly GPU compute cost vs enterprise SaaS ARR.' },
        { id: 'eg-2', claim: '0.8% equity is worth more than $45k/yr salary drop', status: 'UNKNOWN', verificationAction: 'Model exit payout at $30M, $75M, and $150M valuations after 2 dilution rounds.' },
        { id: 'eg-3', claim: 'Spouse/family comfortable with income drop', status: 'SUBJECTIVE', verificationAction: 'Conduct formal household budget stress-test for 12-month horizon.' }
      ],
      blindSpots: [
        {
          id: 'bs-1',
          category: 'Financial Uncertainty',
          severity: 'high',
          title: 'Unmodeled Option Dilution & Liquidation Preference',
          summary: 'Your equity expectation (0.8%) does not account for 20-30% dilution per future funding round or participating preference shares.',
          whyItMatters: 'If the company raises Series B and C at standard terms, your 0.8% will dilute to ~0.45%. In an acquisition under $50M, preferred stock investors get paid first, potentially leaving common options worth $0.',
          whatIsUnknown: 'Whether the Series A term sheet contains 1x non-participating preferred liquidation rights or senior preference multiples.',
          reflectionQuestion: 'Have you explicitly calculated what payout you receive if the startup exits for $30M vs $150M after 2 future rounds of funding?',
          confidenceScore: 88,
          status: 'active'
        },
        {
          id: 'bs-2',
          category: 'Cognitive Bias Signal',
          severity: 'high',
          title: 'Possible Anchoring Signal on Founder Pedigree',
          summary: 'You are assigning high weight to the founder being an ex-Stripe VP, treating past executive affiliation as a primary proxy for venture success.',
          whyItMatters: 'Over 65% of venture-backed startups founded by ex-BigTech executives still fail to reach Series B due to PMF struggles, regardless of pedigree.',
          whatIsUnknown: 'The actual customer retention metrics (Net Revenue Retention) and organic acquisition cost for the startup product.',
          reflectionQuestion: 'If this startup were led by a first-time founder with identical metrics, how would your confidence level change?',
          confidenceScore: 92,
          status: 'active'
        },
        {
          id: 'bs-3',
          category: 'Timeline & Execution',
          severity: 'medium',
          title: 'Burn Rate & Runway Volatility in H2',
          summary: 'An 18-month stated runway easily shrinks to 11-13 months if hiring accelerates or AI API infrastructure costs scale rapidly.',
          whyItMatters: 'If runway drops below 6 months in a tough fundraising market, team focus pivots from building features to survival fundraising or down rounds.',
          whatIsUnknown: 'Monthly AI compute / GPU server burn rate relative to recurring enterprise revenue.',
          reflectionQuestion: 'Are you prepared to assist in fundraising or endure a hiring freeze if runway shortens next quarter?',
          confidenceScore: 78,
          status: 'active'
        }
      ],
      cognitiveBiasSignals: [
        {
          id: 'bias-1',
          name: 'Anchoring Signal',
          signalMessage: 'Possible confirmation-bias signal on founder prestige',
          description: 'Over-weighting initial impressive facts (founder pedigree, initial $12M raise) when evaluating probability of payout.',
          mitigation: 'Focus on raw unit economics, gross margins, and customer churn metrics rather than brand names.',
          score: 85
        },
        {
          id: 'bias-2',
          name: 'Planning Fallacy Signal',
          signalMessage: 'Optimism bias regarding liquidity horizon',
          description: 'Assuming best-case timeline for equity liquidity (3 years) versus venture average (6-8 years).',
          mitigation: 'Model a realistic 7-year horizon where option strike price and tax liabilities must be paid out-of-pocket.',
          score: 72
        }
      ],
      challengeQuestions: [
        {
          id: 'q-1',
          question: 'What if your strongest assumption (18-month runway) is wrong and runway is actually 10 months?',
          context: 'Assessing personal liquidity resilience during career transitions.',
          suggestedOptions: [
            'Acceptable: 6+ months cash buffer saved to handle transition',
            'Moderate: Would cause high household stress but manage',
            'Critical Risk: Under 3 months savings (High vulnerability)'
          ],
          status: 'unanswered'
        },
        {
          id: 'q-2',
          question: 'Have you verified whether option exercise windows are extended (e.g. 7-10 years post-departure) or standard 90 days?',
          context: 'Crucial for tax and golden handcuff considerations if you leave the startup early.',
          suggestedOptions: [
            'Standard 90-day PTEW (Must buy options right after leaving)',
            'Extended 5-10 year PTEW',
            'I have not asked HR about exercise window yet'
          ],
          status: 'unanswered'
        }
      ],
      scenarios: [
        {
          id: 'sc-best',
          type: 'best',
          title: 'Best Case: Rapid Product-Market Fit & Series B Valuation',
          description: 'Startup hits $5M ARR in 18 months; Series B values firm at $120M. Equity value expands 4x.',
          drivers: ['Strong enterprise AI adoption', 'Zero key employee churn'],
          controllableFactors: ['High execution quality as Lead Engineer'],
          unknowns: ['Macro enterprise software spending trend']
        },
        {
          id: 'sc-base',
          type: 'base',
          title: 'Base Case: Moderate Growth & 6-Year Exit Horizon',
          description: 'Steady incremental revenue growth. Equity realizes value in Year 6 exit at $60M.',
          drivers: ['Product delivers steady value', 'Normal venture dilution'],
          controllableFactors: ['Managing architecture tech debt'],
          unknowns: ['Competitor AI pricing pressures']
        },
        {
          id: 'sc-worst',
          type: 'worst',
          title: 'Worst Case: Down Round or 14-Month Shutdown',
          description: 'Runway shortens due to GPU API costs; company struggles to raise Series B in tough market.',
          drivers: ['High customer churn', 'Shortened runway'],
          controllableFactors: ['Maintaining household liquid cash buffer'],
          unknowns: ['Venture capital market sentiment']
        }
      ],
      stakeholderPerspectives: [
        { id: 'sp-1', stakeholder: 'Me', viewpoint: 'Excited for technical autonomy, building core AI product, leadership growth.', concerns: ['Long hours', 'Workplace stress'] },
        { id: 'sp-2', stakeholder: 'Family', viewpoint: 'Supports career ambition but requires financial stability and predictable family time.', concerns: ['Decreased liquid savings buffer', 'Increased weekend work'] },
        { id: 'sp-3', stakeholder: '1 Year From Now', viewpoint: 'Reflecting on whether learning velocity compensated for salary drop.', concerns: ['Was the equity trade-off worth the stress?'] },
        { id: 'sp-4', stakeholder: '5 Years From Now', viewpoint: 'Evaluates whether this move elevated career trajectory regardless of startup outcome.', concerns: ['Resume signaling vs capital accumulation'] }
      ],
      controlMatrix: {
        canInfluence: [
          'Engineering execution quality & architecture scalability',
          'Negotiating signing bonus or option exercise window',
          'Setting household liquid cash savings reserves'
        ],
        cannotControl: [
          'Venture capital macroeconomic fundraising environment',
          'Startup preference share liquidation terms from Series A investors',
          'Competitor feature releases and AI API pricing changes'
        ]
      },
      missingChecklist: [
        { id: 'mc-1', item: 'Request Cap Table summary showing total fully diluted share count', category: 'Equity Terms', isChecked: false },
        { id: 'mc-2', item: 'Verify Post-Termination Option Exercise Window (PTEW) duration in offer letter', category: 'Contract Terms', isChecked: false },
        { id: 'mc-3', item: 'Ask founder directly for monthly cash burn rate and cash runway timeline', category: 'Company Health', isChecked: false },
        { id: 'mc-4', item: 'Stress-test household budget for 12 months at $185k base salary', category: 'Personal Finance', isChecked: false }
      ],
      flipDecision: {
        title: 'What if I chose Option B: Stay at BigTech?',
        overlookedBenefits: [
          'Guaranteed liquid cash accumulation of $45,000/yr surplus to invest in liquid assets',
          'Work-life balance allowing time for side projects, open-source AI, or angel investing',
          'Internal promotion track to Staff Engineer elevates base compensation to $310k+'
        ],
        overlookedCosts: [
          'Possible career boredom with legacy codebases',
          'Missed opportunity to lead early product architecture from scratch'
        ],
        risks: [
          'Organizational restructuring or team reshuffles at BigTech'
        ],
        conditionsForSuccess: [
          'Aligning with Director on explicit 12-month promotion milestones',
          'Using spare time to build independent AI side projects'
        ]
      },
      beforeAfterMap: {
        initialThinking: 'I should accept the startup offer because the founder is impressive and 0.8% equity has huge upside.',
        whatBlindSpotRevealed: [
          'Unanalyzed liquidation preferences & option dilution in future funding rounds',
          'Unverified 18-month cash runway claim vs GPU compute burn rate',
          'Anchoring bias on founder pedigree rather than customer retention metrics'
        ],
        updatedUnderstanding: 'I need to verify the exact Cap Table terms and runway before deciding, while ensuring my household maintains a 6-month liquid cash buffer.'
      },
      recommendations: [
        'Request the Cap Table summary: Ask for total fully diluted share count and latest preference terms before signing.',
        'Negotiate a signing bonus or early acceleration clause to bridge the $45k cash gap.',
        'Set a 12-month re-evaluation milestone: Check product retention metrics and runway before vesting anniversary.'
      ],
      alternativeScenarios: [
        'Negotiate a 4-day fractional contract or advisory role with the startup while retaining your main job.',
        'Target Series B or C startups ($50M+ ARR) where equity has proven valuation and salary matches your current level.'
      ],
      analyzedAt: new Date().toISOString()
    }
  },
  {
    id: 'saas-pivot',
    badge: 'Business Strategy',
    title: 'Pivot B2B DevTool to Enterprise AI Workflow',
    subtitle: 'Evaluating strategic product pivot from developer CLI tools to enterprise business team workflow automation.',
    input: {
      id: 'demo-saas-1',
      title: 'Should we pivot our B2B SaaS from Developer CI/CD to Enterprise AI Workflows?',
      category: 'Business',
      currentContext: 'Our developer product has reached $25k ARR with 1,200 active devs, but conversion from free to paid tier is under 1.4%. Enterprise buyers are asking for AI automation tools for compliance and operations teams, offering larger contract potential ($30k-$80k ACV).',
      options: [
        {
          id: 'opt-p1',
          title: 'Pivot fully to Enterprise AI Workflows',
          description: 'Reposition core tech stack for non-technical enterprise teams, hire 2 sales reps, sunset free dev tool.',
          pros: ['10x higher average contract value ($50k ACV)', 'Clear enterprise budget allocation for AI'],
          cons: ['Alienates existing 1,200 dev user base', 'Longer sales cycle (6-9 months)', 'Requires SOC2 compliance & security spend']
        },
        {
          id: 'opt-p2',
          title: 'Dual Product Strategy (Maintain DevTool + Add AI Add-on)',
          description: 'Keep developer tool running while building enterprise AI extension as a premium module.',
          pros: ['Retain community goodwill & developer feedback', 'De-risked migration path'],
          cons: ['Splits lean engineering team focus', 'Slower speed to market against native AI competitors']
        }
      ],
      keyAssumptions: [
        'Enterprise buyers will complete security reviews within 90 days.',
        'Our existing core backend architecture can be repurposed without full rewrite.',
        'Current $400k cash balance gives us 10 months runway to complete the pivot.'
      ],
      timeframe: 'Executive meeting in 2 weeks',
      financialImpact: 'Burn rate increases from $35k/mo to $55k/mo due to enterprise sales hires',
      mainConcerns: 'Running out of runway before closing first 3 enterprise contracts.',
      updatedAt: new Date().toISOString()
    },
    defaultResult: {
      thinkingCompleteness: {
        score: 79,
        breakdown: {
          assumptions: 85,
          evidence: 70,
          risks: 82,
          alternatives: 75,
          stakeholders: 78,
          tradeOffs: 88,
          scenarios: 75
        },
        explanation: 'Thinking Completeness measures how many essential analytical dimensions have been examined. This does not indicate whether your decision is correct.'
      },
      riskIndicator: 72,
      executiveSummary: 'The proposed full pivot underestimates the capital requirements and time lag of enterprise B2B sales cycles, creating an acute runway crunch around month 7.',
      facts: [
        { id: 'fp-1', text: 'Current dev tool has $25k ARR with 1,200 active users and 1.4% conversion.', category: 'Baseline Performance' },
        { id: 'fp-2', text: 'Current cash balance is $400k; burn increases from $35k to $55k/mo upon pivot.', category: 'Financial Runway' }
      ],
      assumptions: [
        { id: 'ap-1', text: 'Enterprise sales cycles will close within 90 days.', riskLevel: 'high', status: 'unexamined' },
        { id: 'ap-2', text: 'Core backend engine requires zero rewrite for non-technical users.', riskLevel: 'medium', status: 'unexamined' }
      ],
      unknowns: [
        { id: 'up-1', question: 'What is the actual sales cycle length for target $50k ACV enterprise buyers?', whyCritical: 'If sales cycle is 7.5 months, cash depletes before deal collection.', verificationStep: 'Interview 5 enterprise buyer IT security officers.' }
      ],
      hypotheticals: [
        { id: 'hp-1', title: 'SOC 2 Audit Delay', premise: 'Security audit takes 5 months instead of 2.', potentialOutcome: 'Deals stall in legal review while sales reps draw cash salaries.' }
      ],
      evidenceGaps: [
        { id: 'egp-1', claim: 'Enterprise buyers will buy within 90 days', status: 'UNSUPPORTED', verificationAction: 'Obtain signed Letters of Intent (LOIs) with target pricing.' }
      ],
      blindSpots: [
        {
          id: 'bs-p1',
          category: 'Operational Risk',
          severity: 'high',
          title: 'The Enterprise Procurement & Security Chasm',
          summary: 'Selling $50k ACV software to enterprise legal/IT requires SOC2, SSO, RBAC, and data privacy indemnifications that slow deals by 4-6 months.',
          whyItMatters: 'If deal cycles stretch to 8 months, your 10-month runway leaves zero buffer for delayed cash collection or lost deals.',
          whatIsUnknown: 'Whether enterprise prospects have pre-approved budget for non-compliant beta vendors.',
          reflectionQuestion: 'What is your plan if enterprise deals take 9 months instead of 3 to close and collect cash?',
          confidenceScore: 90,
          status: 'active'
        }
      ],
      cognitiveBiasSignals: [
        {
          id: 'bias-p1',
          name: 'Grass is Greener Fallacy',
          signalMessage: 'Possible status-quo aversion signal',
          description: 'Assuming enterprise buyers are easier to convert than developers without testing sales friction.',
          mitigation: 'Run 10 paid design partner LOIs before executing code rewrite.',
          score: 88
        }
      ],
      challengeQuestions: [
        {
          id: 'qp-1',
          question: 'Do you have written Letters of Intent (LOIs) with binding pricing from at least 3 enterprise target buyers?',
          context: 'Validating real enterprise intent vs casual interest in survey interviews.',
          suggestedOptions: ['Yes, 3+ signed LOIs with target pricing', 'Verbal expressions of interest only', 'No buyer conversations yet'],
          status: 'unanswered'
        }
      ],
      scenarios: [
        {
          id: 'sc-p-best',
          type: 'best',
          title: 'Best Case: 3 Enterprise Pilots Close in Q2',
          description: 'Design partners convert to $50k annual contracts, extending runway indefinitely.',
          drivers: ['Pre-existing buyer relationships'],
          controllableFactors: ['Sales demo quality'],
          unknowns: ['Procurement approval speed']
        },
        {
          id: 'sc-p-base',
          type: 'base',
          title: 'Base Case: Sales Cycle Takes 7 Months',
          description: 'First contract closes in Month 7; cash buffer drops to under $50k before collection.',
          drivers: ['Standard legal review speed'],
          controllableFactors: ['Managing burn rate'],
          unknowns: ['SOC 2 auditor availability']
        },
        {
          id: 'sc-p-worst',
          type: 'worst',
          title: 'Worst Case: Deals Stalled in Security Review',
          description: 'Runway expires while enterprise buyers demand custom feature compliance.',
          drivers: ['Complex IT requirements'],
          controllableFactors: ['Preserving dev tool revenue'],
          unknowns: ['Enterprise IT budget freezes']
        }
      ],
      stakeholderPerspectives: [
        { id: 'sp-p1', stakeholder: 'Me', viewpoint: 'Eager for higher revenue metrics and larger customer deal sizes.', concerns: ['Sales execution risk'] },
        { id: 'sp-p2', stakeholder: 'Employer / Team', viewpoint: 'Engineering team concerned about throwing away developer tool codebase.', concerns: ['Technical debt & morale'] }
      ],
      controlMatrix: {
        canInfluence: ['Engineering speed for enterprise features', 'Controlling monthly burn rate'],
        cannotControl: ['Enterprise legal procurement timelines', 'Corporate IT budget freezing']
      },
      missingChecklist: [
        { id: 'mc-p1', item: 'Secure 3 signed Letters of Intent (LOIs) with enterprise price tags', category: 'Sales Validation', isChecked: false },
        { id: 'mc-p2', item: 'Audit SOC 2 Type II compliance costs and timeline with auditor', category: 'Compliance', isChecked: false }
      ],
      flipDecision: {
        title: 'What if I chose Option B: Maintain DevTool + Add AI Extension?',
        overlookedBenefits: ['Preserves 1,200 developer community feedback loop', 'De-risks cash runway'],
        overlookedCosts: ['Slower growth rate compared to pure enterprise play'],
        risks: ['Team bandwidth splits between two products'],
        conditionsForSuccess: ['Hiring fractional sales lead instead of 2 full-time reps']
      },
      beforeAfterMap: {
        initialThinking: 'We should pivot immediately because enterprise buyers pay $50k ACV while devs convert slowly.',
        whatBlindSpotRevealed: [
          'Enterprise sales cycles take 7+ months including SOC 2 legal checks',
          'Burn rate jump from $35k to $55k/mo creates runway crunch at Month 7'
        ],
        updatedUnderstanding: 'We must validate enterprise demand via paid LOIs before increasing burn rate or sunsetting our developer tool.'
      },
      recommendations: [
        'Secure 3 pre-paid enterprise pilot commitments ($10k each) BEFORE committing engineering team to full pivot.',
        'Hire a fractional Enterprise Sales VP rather than 2 full-time reps to preserve cash runway.',
        'Maintain dev tool in maintenance mode rather than outright sunsetting to protect baseline SEO.'
      ],
      alternativeScenarios: [
        'Launch enterprise AI features as a paid plugin to existing dev tool (Developer-Led Enterprise Expansion).'
      ],
      analyzedAt: new Date().toISOString()
    }
  },
  {
    id: 'financial-property',
    badge: 'Personal Finance',
    title: 'Buy $750k Suburban House vs Rent & Invest Capital',
    subtitle: 'Analyzing total cost of home ownership vs flexible urban renting with equity market investment.',
    input: {
      id: 'demo-fin-1',
      title: 'Should I buy a $750,000 suburban house or continue renting and invest $180,000 in index funds?',
      category: 'Financial',
      currentContext: 'We have $200k in liquid savings. We are considering putting $150k down on a $750k home at 6.8% mortgage rate. Monthly payment (mortgage + property tax + HOA + insurance) would be $5,200/mo. Current apartment rent is $3,100/mo.',
      options: [
        {
          id: 'opt-f1',
          title: 'Buy $750k Suburban Home',
          description: 'Build home equity, stability for growing family, fixed long-term housing costs.',
          pros: ['Build equity over 30 years', 'Tax deductions for mortgage interest', 'Space and backyard'],
          cons: ['High monthly outlay ($5,200/mo)', 'Property tax, maintenance, HOA fees are unrecoverable costs', 'Illiquid capital locked in real estate']
        },
        {
          id: 'opt-f2',
          title: 'Rent & Invest $180k Capital in S&P 500',
          description: 'Lower monthly payment ($3,100), full liquid flexibility, compounding market returns.',
          pros: ['Keep $2,100/mo surplus investing in index funds', 'High liquidity', 'Zero maintenance costs'],
          cons: ['Rent increases over time', 'No physical asset ownership']
        }
      ],
      keyAssumptions: [
        'Home value will appreciate at least 4.5% annually.',
        'S&P 500 returns 8-9% average annual return.',
        'Maintenance costs will stay under 1% of home value annually.'
      ],
      timeframe: 'Pre-approval expires in 30 days',
      financialImpact: '$150,000 cash outlay down payment + $2,100/mo additional cash commitment',
      mainConcerns: 'Interest rate risk, maintenance surprises, tied down location.',
      updatedAt: new Date().toISOString()
    },
    defaultResult: {
      thinkingCompleteness: {
        score: 88,
        breakdown: {
          assumptions: 92,
          evidence: 85,
          risks: 90,
          alternatives: 82,
          stakeholders: 88,
          tradeOffs: 94,
          scenarios: 85
        },
        explanation: 'Thinking Completeness measures how many essential analytical dimensions have been examined. This does not indicate whether your decision is correct.'
      },
      riskIndicator: 52,
      executiveSummary: 'Your comparison treats monthly rent as "money thrown away" while ignoring unrecoverable home costs (interest, tax, HOA, maintenance) which total $3,800/mo of your $5,200 payment at 6.8%.',
      facts: [
        { id: 'ff-1', text: 'Down payment is $150,000; total home payment is $5,200/mo at 6.8% mortgage rate.', category: 'Housing Outlay' },
        { id: 'ff-2', text: 'Current rent is $3,100/mo; monthly savings differential is $2,100/mo.', category: 'Cash Differential' }
      ],
      assumptions: [
        { id: 'af-1', text: 'Unrecoverable home maintenance will remain under 1% annually.', riskLevel: 'medium', status: 'unexamined' }
      ],
      unknowns: [
        { id: 'uf-1', question: 'What is the age and remaining lifespan of roof, HVAC, and plumbing systems?', whyCritical: 'Major replacements cost $15k-$30k out of pocket within 3 years.', verificationStep: 'Request full seller property disclosure & professional home inspection.' }
      ],
      hypotheticals: [
        { id: 'hf-1', title: 'Interest Rate Drop in 3 Years', premise: 'Mortgage rates drop to 5.0% and refinancing lowers payment by $900/mo.', potentialOutcome: 'Refinancing costs $6,000 upfront but improves long-term cash flow.' }
      ],
      evidenceGaps: [
        { id: 'egf-1', claim: 'Renting is wasting money', status: 'UNSUPPORTED', verificationAction: 'Compare unrecoverable rent ($3,100) vs unrecoverable mortgage interest & tax ($3,800).' }
      ],
      blindSpots: [
        {
          id: 'bs-f1',
          category: 'Financial Uncertainty',
          severity: 'high',
          title: 'Unrecoverable Housing Cost Misconception',
          summary: 'Comparing $3,100 rent to $5,200 mortgage ignores that $3,800 of the mortgage payment goes to interest, insurance, and taxes with zero equity value created.',
          whyItMatters: 'Buying actually increases unrecoverable monthly expense by $700/mo in the first 7 years under a 6.8% interest rate.',
          whatIsUnknown: 'The age of major home systems (roof, HVAC, plumbing) in target property.',
          reflectionQuestion: 'Did you know that renting is currently $700/mo cheaper in unrecoverable expenses than buying this specific home?',
          confidenceScore: 94,
          status: 'active'
        }
      ],
      cognitiveBiasSignals: [
        {
          id: 'bias-f1',
          name: 'Status Quo & Cultural Myth Signal',
          signalMessage: 'Possible cultural myth signal on homeownership',
          description: 'Belief that renting is always wasting money regardless of mortgage interest rates.',
          mitigation: 'Calculate exact Net Present Value (NPV) comparing unrecoverable rent vs unrecoverable mortgage interest.',
          score: 76
        }
      ],
      challengeQuestions: [
        {
          id: 'qf-1',
          question: 'How long do you realistically plan to live in this specific home before moving?',
          context: 'Closing costs (6% seller fee) require minimum 7-year stay to break even on transaction costs.',
          suggestedOptions: ['10+ years', '5-7 years', 'Under 5 years (High risk of net loss)'],
          status: 'unanswered'
        }
      ],
      scenarios: [
        {
          id: 'sc-f-best',
          type: 'best',
          title: 'Best Case: Home Appreciates 6%/yr & Rates Drop',
          description: 'Property appreciates to $950k in 5 years; refinancing at 4.8% lowers payment.',
          drivers: ['Suburban population inflow'],
          controllableFactors: ['Home improvements'],
          unknowns: ['Fed interest rate trajectory']
        },
        {
          id: 'sc-f-base',
          type: 'base',
          title: 'Base Case: Moderate 3.5% Growth & Constant Rate',
          description: 'Equity builds steadily over 10 years; maintenance averages $8,000/yr.',
          drivers: ['Inflation alignment'],
          controllableFactors: ['Preventative maintenance'],
          unknowns: ['Property tax rate hikes']
        },
        {
          id: 'sc-f-worst',
          type: 'worst',
          title: 'Worst Case: Job Relocation within 4 Years',
          description: 'Forced sale requires paying 6% realtor commission ($45k), erasing equity gains.',
          drivers: ['Career relocation need'],
          controllableFactors: ['Holding minimum 7-year timeline'],
          unknowns: ['Local housing market liquidity']
        }
      ],
      stakeholderPerspectives: [
        { id: 'sp-f1', stakeholder: 'Me', viewpoint: 'Desire for stability, space, and home ownership milestone.', concerns: ['High monthly outlay'] },
        { id: 'sp-f2', stakeholder: 'Family', viewpoint: 'Values yard and quiet neighborhood for children.', concerns: ['Commute time'] }
      ],
      controlMatrix: {
        canInfluence: ['Down payment percentage', 'Negotiating seller concessions for rate buydown'],
        cannotControl: ['Suburban property tax assessment increases', 'Federal Reserve interest rate decisions']
      },
      missingChecklist: [
        { id: 'mc-f1', item: 'Request seller disclosures on roof, HVAC, and foundation history', category: 'Property Inspection', isChecked: false },
        { id: 'mc-f2', item: 'Calculate Net Present Value (NPV) of $180k invested at 8% vs home equity at 4%', category: 'Financial Modeling', isChecked: false }
      ],
      flipDecision: {
        title: 'What if I chose Option B: Continue Renting & Invest $180k Capital?',
        overlookedBenefits: ['Keeps $180k fully liquid in index funds compounding at 8-9%', 'Saves $2,100/mo in cash flow'],
        overlookedCosts: ['Rent will increase by ~3-4% annually over 10 years'],
        risks: ['Landlord may choose not to renew lease'],
        conditionsForSuccess: ['Disciplined monthly investing of the $2,100 surplus']
      },
      beforeAfterMap: {
        initialThinking: 'Renting is throwing away $3,100/mo while buying builds equity immediately.',
        whatBlindSpotRevealed: [
          'At 6.8% interest, $3,800 out of $5,200 monthly home payment is unrecoverable interest & tax',
          'Renting is actually $700/mo cheaper in unrecoverable costs than buying this specific home'
        ],
        updatedUnderstanding: 'I will only buy if we plan to stay at least 7+ years to amortize closing costs, or negotiate a rate buydown with the seller.'
      },
      recommendations: [
        'Run a precise Rent vs Buy spreadsheet accounting for 6.8% interest amortizations and HOA fees.',
        'Consider seller concessions or temporary rate buydowns (2-1 buydown) to lower first 2 years interest rate.'
      ],
      alternativeScenarios: [
        'Buy a multi-family duplex (House Hacking) where rental unit subsidizes the mortgage payment.'
      ],
      analyzedAt: new Date().toISOString()
    }
  }
];
