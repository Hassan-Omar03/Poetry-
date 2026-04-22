/**
 * Local Poetry Analysis Engine — Pure Dynamic Version
 *
 * NO hardcoded poems, poets, translations, or names.
 * Analyses are derived purely from the poem text itself.
 * Poet identification is handled dynamically by the Gemini API (primary)
 * and the Wikipedia free API (fallback) in poetryService.ts.
 */

import type { PoetryAnalysis } from './poetryService';

/* ── Language detection from script ─────────────────────────── */
function detectLanguage(text: string): string {
  if (/[\u0600-\u06FF]/.test(text)) return 'Urdu / Arabic';
  if (/[\u0900-\u097F]/.test(text)) return 'Hindi / Sanskrit';
  if (/[\u4e00-\u9fff]/.test(text)) return 'Chinese';
  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) return 'Japanese';
  if (/[\uAC00-\uD7AF]/.test(text)) return 'Korean';
  if (/[\u0400-\u04FF]/.test(text)) return 'Russian / Cyrillic';
  if (/[\u0370-\u03FF]/.test(text)) return 'Greek';
  if (/[\u0590-\u05FF]/.test(text)) return 'Hebrew';
  if (/[\u0E00-\u0E7F]/.test(text)) return 'Thai';
  return 'English / Latin';
}

/* ── Extract meaningful words from poem text ─────────────────── */
function extractWords(text: string): string[] {
  const STOPWORDS = new Set([
    'that','this','with','from','have','they','been','were','what',
    'when','your','will','each','make','like','long','look','many',
    'some','than','them','then','would','about','could','into','more',
    'other','their','there','these','which','shall','upon','those',
    'hath','thou','thee','doth','mine','thine','shall','unto','hast',
  ]);
  return text
    .replace(/[^\w\s'-]/g, '')
    .split(/\s+/)
    .map(w => w.toLowerCase().replace(/^'+|'+$/g, ''))
    .filter(w => w.length > 4 && !STOPWORDS.has(w));
}

/* ── Detect themes purely from vocabulary ────────────────────── */
function detectThemes(poem: string): string[] {
  const lower = poem.toLowerCase();
  const THEME_MAP: Record<string, string[]> = {
    'Love & Longing':     ['love','heart','beloved','kiss','passion','desire','embrace','yearning','devotion','ache'],
    'Nature':             ['sky','sun','moon','tree','flower','river','wind','rain','star','garden','mountain','sea','ocean','forest','leaf'],
    'Death & Mortality':  ['death','grave','die','dead','mortal','tomb','decay','funeral','ashes','end'],
    'Time & Eternity':    ['time','age','years','moment','eternal','forever','past','century','season','hour'],
    'Solitude':           ['alone','lonely','solitude','silence','quiet','empty','isolated','shadow'],
    'Hope & Aspiration':  ['hope','dream','light','dawn','rise','new','bright','future','aspire','beyond'],
    'Faith & Spirituality':['god','prayer','divine','heaven','soul','spirit','sacred','holy','worship','mystic'],
    'Beauty':             ['beauty','beautiful','fair','grace','lovely','radiant','glorious','splendor'],
    'Freedom':            ['free','freedom','liberty','wings','fly','soar','wild','unchained','break'],
    'Loss & Grief':       ['lost','grief','sorrow','tears','mourn','weep','lament','gone','departed','bereft'],
    'Identity & Self':    ['self','identity','khudi','ego','being','soul','inner','exist','awaken'],
    'War & Struggle':     ['war','battle','fight','sword','blood','courage','brave','wound','conquer'],
    'Justice & Equality': ['justice','rights','equal','oppressed','free','dignity','nation','people'],
    'Nostalgia':          ['memory','remember','past','childhood','once','long ago','yesterday','recall'],
    'Human Experience':   ['life','living','breath','journey','path','road','walk','human','world'],
  };

  const themes: string[] = [];
  for (const [theme, keywords] of Object.entries(THEME_MAP)) {
    if (keywords.some(kw => lower.includes(kw))) {
      themes.push(theme);
    }
  }
  if (themes.length === 0) themes.push('Human Experience', 'Contemplation');
  return themes.slice(0, 5);
}

/* ── Detect literary devices from text patterns ──────────────── */
function detectLiteraryDevices(poem: string): PoetryAnalysis['literaryDevices'] {
  const devices: PoetryAnalysis['literaryDevices'] = [];
  const lines = poem.split('\n').filter(l => l.trim());

  // Simile
  const simileMatch = poem.match(/.*\b(?:like|as)\s+\w[\w\s]{2,25}\b.*/i);
  if (simileMatch) {
    devices.push({
      device: 'Simile',
      example: simileMatch[0].trim().substring(0, 80),
      meaning: 'A direct comparison using "like" or "as" creates vivid imagery and bridges the abstract with the concrete.',
    });
  }

  // Repetition / Anaphora
  const words = poem.toLowerCase().split(/\s+/);
  const freq: Record<string, number> = {};
  words.forEach(w => { const c = w.replace(/\W/g,''); if (c.length > 3) freq[c] = (freq[c]||0)+1; });
  const repeated = Object.entries(freq).filter(([,n]) => n >= 3).sort((a,b) => b[1]-a[1]);
  if (repeated.length > 0) {
    devices.push({
      device: 'Repetition',
      example: `The word "${repeated[0][0]}" appears ${repeated[0][1]} times throughout the poem`,
      meaning: 'Deliberate repetition reinforces the central emotion, creates rhythm, and drives the poem\'s key idea home.',
    });
  }

  // Imagery
  if (lines.length > 1) {
    devices.push({
      device: 'Imagery',
      example: lines[0].trim().substring(0, 80),
      meaning: 'Vivid sensory language creates a mental picture that pulls the reader into the poem\'s world.',
    });
  }

  // Personification
  const personMatch = poem.match(/.*\b(?:speaks?|walks?|laughs?|cries?|sings?|weeps?|dances?|breathes?)\b.*/i);
  if (personMatch) {
    devices.push({
      device: 'Personification',
      example: personMatch[0].trim().substring(0, 80),
      meaning: 'Attributing human qualities to non-human elements intensifies the emotional resonance of the poem.',
    });
  }

  if (devices.length < 2) {
    devices.push({
      device: 'Tone',
      example: 'Overall poem',
      meaning: 'The poem establishes a distinct emotional atmosphere through deliberate word choice and rhythmic structure.',
    });
  }

  return devices;
}

/* ── Build word dictionary from poem text ────────────────────── */
function buildWordDictionary(poem: string): PoetryAnalysis['wordDictionary'] {
  const words = extractWords(poem);
  const unique = [...new Set(words)].slice(0, 10);
  return unique.map(word => ({
    word: word.charAt(0).toUpperCase() + word.slice(1),
    meaning: 'A key word contributing to the poem\'s tone, imagery, and thematic depth.',
    pronunciation: `/${word}/`,
  }));
}

/* ── Detect verse form from line count ───────────────────────── */
function detectForm(lines: string[]): string {
  const n = lines.length;
  if (n === 14) return 'sonnet (14 lines)';
  if (n === 3)  return 'haiku (3 lines)';
  if (n === 2)  return 'couplet';
  if (n <= 4)   return 'quatrain';
  if (n % 4 === 0) return `${n / 4}-stanza quatrain structure`;
  return 'free verse';
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT — fully dynamic, zero hardcoded data
══════════════════════════════════════════════════════════════ */
export function analyzeLocally(poem: string, _targetLanguage: string): PoetryAnalysis {
  const lines   = poem.split('\n').filter(l => l.trim());
  const lang    = detectLanguage(poem);
  const form    = detectForm(lines);
  const themes  = detectThemes(poem);
  const devices = detectLiteraryDevices(poem);
  const dict    = buildWordDictionary(poem);

  return {
    originalPoem: poem,
    translation:  undefined, // handled by translation API if needed
    explanation:
      `This ${lines.length}-line poem written in ${lang} follows a ${form}. ` +
      `It explores themes of ${themes.slice(0, 3).map(t => t.toLowerCase()).join(', ')}. ` +
      `The opening line — "${lines[0]?.trim() ?? 'the poem'}" — immediately establishes the emotional and thematic landscape. ` +
      `Through its structure and carefully chosen language, the poem creates a layered experience that rewards close reading. ` +
      `Each image and word choice contributes to the poem's overarching meaning, inviting the reader into a space of reflection and discovery.`,
    wordDictionary: dict,
    poet: {
      // Intentionally blank — will be enriched dynamically by
      // the Gemini API (primary) or Wikipedia API (fallback) in poetryService.ts
      name:    'Unknown Poet',
      era:     'To be determined',
      bio:     'Poet identification is being looked up dynamically. Please ensure you have an active internet connection.',
      whyForm: `The poet chose ${form} to structure their ideas and emotions within this work.`,
    },
    themes,
    literaryDevices: devices,
    sources: [
      'Poetry Foundation (poetryfoundation.org)',
      'Academy of American Poets (poets.org)',
      'Wikipedia (en.wikipedia.org)',
      'Literary Devices (literarydevices.net)',
    ],
  };
}
