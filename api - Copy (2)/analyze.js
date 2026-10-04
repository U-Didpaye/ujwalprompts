import { generateIntelligentAnalysis } from '../server/intelligentEngine.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  let input = req.body;
  if (typeof input === 'string') {
    try {
      input = JSON.parse(input);
    } catch (e) {
      input = {};
    }
  }

  const sanitizedInput = {
    title: (input?.title || 'Decision Analysis').slice(0, 300),
    category: input?.category || 'General',
    currentContext: (input?.currentContext || '').slice(0, 2500),
    options: Array.isArray(input?.options) ? input.options.slice(0, 5) : [],
    keyAssumptions: Array.isArray(input?.keyAssumptions) ? input.keyAssumptions.slice(0, 10) : [],
    timeframe: (input?.timeframe || '').slice(0, 100),
    financialImpact: (input?.financialImpact || '').slice(0, 200),
    mainConcerns: (input?.mainConcerns || '').slice(0, 500)
  };

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_server_side')) {
    const fallbackResult = generateIntelligentAnalysis(sanitizedInput);
    fallbackResult.isFallbackMode = true;
    res.status(200).json(fallbackResult);
    return;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are BlindSpot AI. Perform cognitive bias and decision intelligence analysis on: ${JSON.stringify(sanitizedInput)}`
            }]
          }]
        })
      }
    );

    if (response.ok) {
      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        const parsed = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
        parsed.isFallbackMode = false;
        res.status(200).json(parsed);
        return;
      }
    }
  } catch (err) {
    console.warn('[Vercel Serverless] Gemini API call error, using intelligent engine fallback:', err);
  }

  const fallbackResult = generateIntelligentAnalysis(sanitizedInput);
  fallbackResult.isFallbackMode = true;
  res.status(200).json(fallbackResult);
}
