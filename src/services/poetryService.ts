/**
 * Poetry Service
 * Free APIs only — no API keys, no downloads, no install required.
 *
 * Chain:
 *  1. Pollinations.ai  — free cloud AI (no key, no registration)
 *  2. PoetryDB         — free poem/author database
 *  3. Wikipedia        — free biography lookup
 *  4. Local engine     — offline pattern analysis
 */
import { analyzeLocally } from './localPoetryEngine';
import { chatLocally }    from './localChatEngine';
import { translateAnalysis } from './translationService';

/* ── Types ─────────────────────────────────────────────────────── */
export interface PoetryAnalysis {
  originalPoem: string;
  translation?: string;
  explanation: string;
  wordDictionary: { word: string; meaning: string; translation?: string; pronunciation?: string }[];
  poet: { name: string; era: string; bio: string; whyForm: string; wikipediaLink?: string };
  themes: string[];
  literaryDevices: { device: string; example: string; meaning: string }[];
  sources: string[];
}

/* ── Helpers ────────────────────────────────────────────────────── */
async function withTimeout<T>(fn: () => Promise<T>, ms = 30000): Promise<T> {
  return Promise.race([
    fn(),
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms)),
  ]);
}

/* ══════════════════════════════════════════════════════════════════
   LAYER 1 — Ollama  (local LLM, if installed — fastest, private)
   Install from ollama.ai, then: ollama pull llama3.2
══════════════════════════════════════════════════════════════════ */
const OLLAMA_URL    = 'http://localhost:11434';
const OLLAMA_MODELS = ['llama3.2', 'llama3', 'mistral', 'gemma2', 'phi3', 'qwen2.5'];

async function callOllama(poem: string, lang: string): Promise<PoetryAnalysis | null> {
  const prompt = buildAnalysisPrompt(poem, lang);
  for (const model of OLLAMA_MODELS) {
    try {
      console.log(`🦙 Ollama: ${model}`);
      const res = await withTimeout(() =>
        fetch(`${OLLAMA_URL}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model, prompt, stream: false, format: 'json', options: { temperature: 0.3 } }),
        }), 40000
      );
      if (!res.ok) continue;
      const data  = await res.json();
      const parsed = JSON.parse(data?.response ?? '{}') as PoetryAnalysis;
      if (parsed?.poet?.name && parsed?.explanation) {
        console.log(`✅ Ollama success: ${model} — ${parsed.poet.name}`);
        return { ...parsed, originalPoem: poem };
      }
    } catch (err: any) {
      console.warn(`❌ Ollama ${model}:`, err?.message);
      break; // If Ollama isn't running, skip all models immediately
    }
  }
  return null;
}

/* ══════════════════════════════════════════════════════════════════
   LAYER 2 — Pollinations.ai  (free cloud AI, no API key needed)
   OpenAI-compatible endpoint powered by GPT-4o-mini
══════════════════════════════════════════════════════════════════ */
const POLLINATIONS_URL = 'https://text.pollinations.ai/openai';

function buildAnalysisPrompt(poem: string, lang: string): string {
  const langNote = lang !== 'English'
    ? ` Write ALL analysis text in ${lang}. Keep poem text and poet name in original script.`
    : '';
  return `You are a world-class poetry scholar. Analyze this poem. Return ONLY a JSON object:
{
  "originalPoem": "full poem",
  "translation": "translation to ${lang} or null",
  "explanation": "detailed explanation 150+ words",
  "wordDictionary": [{"word":"","meaning":"","translation":"","pronunciation":""}],
  "poet": {
    "name": "REAL poet — NEVER Unknown Poet",
    "era": "era + birth-death years",
    "bio": "biography 150+ words",
    "whyForm": "why this form",
    "wikipediaLink": "https://en.wikipedia.org/wiki/Name"
  },
  "themes": ["theme1","theme2"],
  "literaryDevices": [{"device":"","example":"","meaning":""}],
  "sources": ["source1"]
}
Identify the REAL author from text, language, style, meter, cultural context.${langNote}
Poem:\n${poem}\nReturn ONLY JSON.`;
}

async function callPollinations(poem: string, lang: string): Promise<PoetryAnalysis | null> {
  const langNote = lang !== 'English'
    ? ` Write ALL analysis text in ${lang}. Keep poem text and poet name in original script.`
    : '';

  const systemPrompt = `You are a world-class poetry scholar with expertise in all global literary traditions. Return ONLY valid JSON — no prose, no markdown, no extra text.`;

  const userPrompt = `Analyze this poem. Return a single JSON object with this exact structure:
{
  "originalPoem": "full poem text",
  "translation": "translation to ${lang} or null if already in ${lang}",
  "explanation": "detailed scholarly explanation 150+ words",
  "wordDictionary": [{"word":"","meaning":"","translation":"","pronunciation":""}],
  "poet": {
    "name": "REAL poet full name — NEVER Unknown Poet",
    "era": "era + birth-death years",
    "bio": "biography 150+ words",
    "whyForm": "why the poet chose this form",
    "wikipediaLink": "https://en.wikipedia.org/wiki/Poet_Name"
  },
  "themes": ["theme1","theme2","theme3"],
  "literaryDevices": [{"device":"name","example":"quoted line","meaning":"explanation"}],
  "sources": ["source1","source2"]
}

CRITICAL: Identify the REAL author. Recognize the poem by its text, language, meter, imagery, and cultural context. For ANY well-known poem in ANY language, name the correct poet.${langNote}

Poem:
${poem}`;

  try {
    console.log('🌸 Trying Pollinations.ai...');
    const res = await withTimeout(() =>
      fetch(POLLINATIONS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'openai',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user',   content: userPrompt   },
          ],
          response_format: { type: 'json_object' },
          seed: 42,
        }),
      })
    );

    if (!res.ok) {
      const errText = await res.text().catch(() => res.statusText);
      throw new Error(`Pollinations ${res.status}: ${errText.substring(0, 100)}`);
    }

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) throw new Error('Empty response from Pollinations');

    const parsed = JSON.parse(text) as PoetryAnalysis;
    if (parsed?.poet?.name && parsed?.explanation) {
      console.log(`✅ Pollinations success — poet: ${parsed.poet.name}`);
      return { ...parsed, originalPoem: poem };
    }
    throw new Error('Invalid JSON structure from Pollinations');
  } catch (err: any) {
    console.warn('❌ Pollinations failed:', err?.message);
    return null;
  }
}

/* ══════════════════════════════════════════════════════════════════
   LAYER 2 — PoetryDB + Wikipedia  (free, no key, accurate)
   Best for classic English poems — returns real author data.
══════════════════════════════════════════════════════════════════ */
async function analyzeWithFallbackAPIs(poem: string, lang: string): Promise<PoetryAnalysis | null> {
  const local = analyzeLocally(poem, lang);
  let poetName: string | null  = null;
  let poemTitle: string | null = null;

  // PoetryDB — identify poem by matching its lines
  const lines = poem.split('\n').filter(l => l.trim().length > 3);
  for (const line of lines.slice(0, 3)) {
    try {
      const res  = await fetch(`https://poetrydb.org/lines/${encodeURIComponent(line.trim().substring(0, 60))}`);
      const data = await res.json();
      if (Array.isArray(data) && data[0]?.author) {
        poetName  = data[0].author;
        poemTitle = data[0].title;
        console.log(`✅ PoetryDB: "${poemTitle}" by ${poetName}`);
        break;
      }
    } catch { continue; }
  }

  if (!poetName) return null;

  // Wikipedia — full biography for identified poet
  let wikiData: { bio: string; era: string; link: string } | null = null;
  try {
    const res  = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(poetName)}`);
    const data = await res.json();
    if (data?.extract && data.type !== 'disambiguation') {
      wikiData = {
        bio:  data.extract,
        era:  data.description ?? 'Historical poet',
        link: data?.content_urls?.desktop?.page ?? `https://en.wikipedia.org/wiki/${encodeURIComponent(poetName)}`,
      };
      console.log(`✅ Wikipedia bio fetched for ${poetName}`);
    }
  } catch { /* ignore */ }

  const result: PoetryAnalysis = {
    ...local,
    poet: {
      name:         poetName,
      era:          wikiData?.era  ?? 'Historical poet',
      bio:          wikiData?.bio  ?? `${poetName} is a recognized poet in classical literary collections.`,
      whyForm:      `${poetName} crafted this work using a style consistent with their literary tradition${poemTitle ? `. "${poemTitle}" reflects` : ', reflecting'} their distinctive voice.`,
      wikipediaLink: wikiData?.link,
    },
    explanation: poemTitle ? `"${poemTitle}" — ${local.explanation}` : local.explanation,
  };

  if (lang !== 'English') {
    try { return await translateAnalysis(result, lang) as PoetryAnalysis; } catch { return result; }
  }
  return result;
}

/* ══════════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════════ */
export async function explainPoetry(poem: string, targetLanguage = 'English'): Promise<PoetryAnalysis> {
  // Layer 1: Ollama (local LLM — if installed & running)
  const ollamaResult = await callOllama(poem, targetLanguage);
  if (ollamaResult) return ollamaResult;

  // Layer 2: Pollinations.ai (free cloud AI — no API key)
  const aiResult = await callPollinations(poem, targetLanguage);
  if (aiResult) return aiResult;

  // Layer 2: PoetryDB + Wikipedia (classic English poems)
  console.warn('Pollinations unavailable. Trying PoetryDB + Wikipedia...');
  try {
    const fallback = await analyzeWithFallbackAPIs(poem, targetLanguage);
    if (fallback) return fallback;
  } catch (err) {
    console.warn('Fallback APIs failed:', err);
  }

  // Layer 3: Local engine only
  const local = analyzeLocally(poem, targetLanguage);
  return {
    ...local,
    poet: {
      name:    'AI temporarily unavailable',
      era:     'Poet could not be identified',
      bio:     'The AI service is temporarily unavailable. The analysis above is based on local text analysis. Please try again in a moment.',
      whyForm: local.poet.whyForm,
    },
  };
}

/* ── Wikipedia lookup by exact name (used by UI) ──────────────── */
export async function fetchPoetWikipedia(poetName: string): Promise<{
  bio: string; era: string; wikipediaLink: string; thumbnail?: string;
} | null> {
  if (!poetName || poetName.startsWith('AI ') || poetName.includes('unavailable')) return null;
  try {
    const res  = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(poetName)}`);
    const data = await res.json();
    if (!data?.extract || data.type === 'disambiguation') return null;
    return {
      bio:           data.extract,
      era:           data.description ?? '',
      wikipediaLink: data?.content_urls?.desktop?.page ?? `https://en.wikipedia.org/wiki/${encodeURIComponent(poetName)}`,
      thumbnail:     data?.thumbnail?.source,
    };
  } catch { return null; }
}

/* ── Chat  ─────────────────────────────────────────────────────── */
export async function chatAboutPoetry(
  poem: string,
  history: { role: 'user' | 'model'; text: string }[],
  message: string
): Promise<string> {
  try {
    const messages = [
      { role: 'system',    content: `You are an expert poetry guide who makes literature accessible and engaging.${poem ? `\n\nThe user is studying:\n${poem}` : ''}` },
      ...history.map(h => ({ role: h.role === 'model' ? 'assistant' : 'user', content: h.text })),
      { role: 'user', content: message },
    ];

    const res = await withTimeout(() =>
      fetch(POLLINATIONS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'openai', messages }),
      })
    );

    if (!res.ok) throw new Error(`Chat API ${res.status}`);
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    if (text) return text;
  } catch (err: any) {
    console.warn('Chat Pollinations failed:', err?.message);
  }

  return chatLocally(poem, message, history);
}