import { DecisionInput, AnalysisResult } from '../types/decision';
import { generateIntelligentAnalysis } from './intelligentEngine';

export const aiService = {
  /**
   * Main entry point calling secure server API endpoint /api/analyze
   */
  async analyzeDecision(input: DecisionInput): Promise<AnalysisResult> {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.thinkingCompleteness) {
          return data as AnalysisResult;
        }
      }
    } catch (err) {
      console.warn('[BlindSpot Frontend] API endpoint unavailable, executing client fallback engine:', err);
    }

    // Client-side fallback engine if network fails
    const fallback = generateIntelligentAnalysis(input) as AnalysisResult;
    fallback.isFallbackMode = true;
    return fallback;
  },

  /**
   * Dynamic re-evaluation when user answers a question or challenges a blind spot
   */
  reevaluateAnalysis(
    currentResult: AnalysisResult,
    updatedBlindSpotId?: string,
    challengeNote?: string,
    answeredQuestionId?: string,
    userAnswer?: string
  ): AnalysisResult {
    const updatedBlindSpots = currentResult.blindSpots.map(bs => {
      if (bs.id === updatedBlindSpotId) {
        return {
          ...bs,
          status: 'challenged' as const,
          challengeNotes: challengeNote
        };
      }
      return bs;
    });

    const updatedQuestions = (currentResult.challengeQuestions || []).map(q => {
      if (q.id === answeredQuestionId) {
        return {
          ...q,
          userAnswer: userAnswer,
          status: 'answered' as const
        };
      }
      return q;
    });

    // Calculate score improvements
    const resolvedCount = updatedBlindSpots.filter(b => b.status === 'challenged' || b.status === 'resolved').length;
    const answeredCount = updatedQuestions.filter(q => q.status === 'answered').length;

    const completenessBoost = (resolvedCount * 5) + (answeredCount * 6);
    const initialScore = currentResult.thinkingCompleteness?.score || 80;
    const newCompletenessScore = Math.min(98, Math.max(20, initialScore + completenessBoost));
    const newRiskIndicator = Math.max(15, Math.min(92, currentResult.riskIndicator - (resolvedCount * 6 + answeredCount * 4)));

    // Update Before vs After Map
    const updatedBeforeAfter = {
      ...currentResult.beforeAfterMap,
      updatedUnderstanding: `Re-evaluated thinking: Incorporating your challenge input (${challengeNote || 'user reflection'}) has resolved unexamined assumptions, elevating overall Thinking Completeness to ${newCompletenessScore}%.`
    };

    return {
      ...currentResult,
      thinkingCompleteness: {
        ...currentResult.thinkingCompleteness,
        score: newCompletenessScore
      },
      riskIndicator: newRiskIndicator,
      blindSpots: updatedBlindSpots,
      challengeQuestions: updatedQuestions,
      beforeAfterMap: updatedBeforeAfter,
      executiveSummary: `Re-evaluated analysis: Incorporating your challenge inputs and reflection responses has elevated overall Thinking Completeness to ${newCompletenessScore}% and reduced analytical risk indicator to ${newRiskIndicator}%.`
    };
  }
};
