/**
 * Free Translation Service
 * Uses MyMemory Translation API (free, no API key required)
 * Limit: 5000 chars/day without key, more with free email registration
 */

const MYMEMORY_API = 'https://api.mymemory.translated.net/get';

// Language code mapping for MyMemory API
const LANG_CODES: Record<string, string> = {
  'Arabic': 'ar', 'Urdu': 'ur', 'Hindi': 'hi', 'French': 'fr', 'Spanish': 'es',
  'German': 'de', 'Chinese (Simplified)': 'zh-CN', 'Chinese (Traditional)': 'zh-TW',
  'Japanese': 'ja', 'Korean': 'ko', 'Turkish': 'tr', 'Russian': 'ru',
  'Portuguese': 'pt', 'Italian': 'it', 'Persian': 'fa', 'Dutch': 'nl',
  'Bengali': 'bn', 'Malay': 'ms', 'Swedish': 'sv', 'Polish': 'pl',
  'Indonesian': 'id', 'Thai': 'th', 'Vietnamese': 'vi', 'Romanian': 'ro',
  'Greek': 'el', 'Czech': 'cs', 'Hungarian': 'hu', 'Finnish': 'fi',
  'Danish': 'da', 'Norwegian': 'no', 'Hebrew': 'he', 'Ukrainian': 'uk',
  'Bulgarian': 'bg', 'Croatian': 'hr', 'Slovak': 'sk', 'Slovenian': 'sl',
  'Serbian': 'sr', 'Catalan': 'ca', 'Galician': 'gl', 'Basque': 'eu',
  'Estonian': 'et', 'Latvian': 'lv', 'Lithuanian': 'lt', 'Albanian': 'sq',
  'Macedonian': 'mk', 'Azerbaijani': 'az', 'Georgian': 'ka', 'Armenian': 'hy',
  'Gujarati': 'gu', 'Kannada': 'kn', 'Malayalam': 'ml', 'Marathi': 'mr',
  'Nepali': 'ne', 'Punjabi': 'pa', 'Sinhala': 'si', 'Tamil': 'ta',
  'Telugu': 'te', 'Swahili': 'sw', 'Afrikaans': 'af', 'Filipino': 'tl',
  'Haitian Creole': 'ht', 'Icelandic': 'is', 'Irish': 'ga', 'Welsh': 'cy',
  'Maltese': 'mt', 'Bosnian': 'bs', 'Mongolian': 'mn', 'Pashto': 'ps',
  'Kurdish (Kurmanji)': 'ku', 'Somali': 'so', 'Yoruba': 'yo', 'Zulu': 'zu',
  'Amharic': 'am', 'Corsican': 'co', 'Esperanto': 'eo', 'Frisian': 'fy',
  'Hausa': 'ha', 'Hawaiian': 'haw', 'Hmong': 'hmn', 'Igbo': 'ig',
  'Javanese': 'jw', 'Kazakh': 'kk', 'Khmer': 'km', 'Lao': 'lo',
  'Latin': 'la', 'Luxembourgish': 'lb', 'Myanmar (Burmese)': 'my',
  'Odia (Oriya)': 'or', 'Samoan': 'sm', 'Scots Gaelic': 'gd',
  'Sesotho': 'st', 'Shona': 'sn', 'Sindhi': 'sd', 'Sundanese': 'su',
  'Tajik': 'tg', 'Uzbek': 'uz', 'Xhosa': 'xh', 'Yiddish': 'yi',
  'English': 'en',
};

function getLangCode(language: string): string | null {
  return LANG_CODES[language] || null;
}

/**
 * Translate a single string using MyMemory API
 */
async function translateSingle(text: string, targetLang: string): Promise<string> {
  if (!text || text.trim().length === 0) return text;
  
  const langCode = getLangCode(targetLang);
  if (!langCode || langCode === 'en') return text;

  // MyMemory has a 500 char limit per request, split if needed
  if (text.length > 450) {
    const chunks = splitIntoChunks(text, 450);
    const translated = await Promise.all(
      chunks.map(chunk => translateChunk(chunk, langCode))
    );
    return translated.join(' ');
  }

  return translateChunk(text, langCode);
}

function splitIntoChunks(text: string, maxLen: number): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    if ((current + ' ' + sentence).length > maxLen && current.length > 0) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current = current ? current + ' ' + sentence : sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.length > 0 ? chunks : [text];
}

async function translateChunk(text: string, langCode: string): Promise<string> {
  try {
    const url = `${MYMEMORY_API}?q=${encodeURIComponent(text)}&langpair=en|${langCode}`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();
    
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      const translated = data.responseData.translatedText;
      // MyMemory sometimes returns the original text in caps when it can't translate
      if (translated === text.toUpperCase()) return text;
      return translated;
    }
    
    return text;
  } catch (err) {
    console.warn('Translation chunk failed:', err);
    return text;
  }
}

/**
 * Translate all fields of a PoetryAnalysis object
 */
export async function translateAnalysis(
  analysis: any,
  targetLanguage: string
): Promise<any> {
  if (targetLanguage === 'English') return analysis;
  
  const langCode = getLangCode(targetLanguage);
  if (!langCode) return analysis;

  try {
    // Translate all fields in parallel for speed
    const [
      explanation,
      poetBio,
      poetWhyForm,
      poetEra,
    ] = await Promise.all([
      translateSingle(analysis.explanation, targetLanguage),
      translateSingle(analysis.poet?.bio, targetLanguage),
      translateSingle(analysis.poet?.whyForm, targetLanguage),
      translateSingle(analysis.poet?.era, targetLanguage),
    ]);

    // Translate themes
    const translatedThemes = await Promise.all(
      (analysis.themes || []).map((t: string) => translateSingle(t, targetLanguage))
    );

    // Translate literary devices
    const translatedDevices = await Promise.all(
      (analysis.literaryDevices || []).map(async (d: any) => ({
        device: await translateSingle(d.device, targetLanguage),
        example: d.example, // Keep examples in original
        meaning: await translateSingle(d.meaning, targetLanguage),
      }))
    );

    // Translate word dictionary meanings
    const translatedWords = await Promise.all(
      (analysis.wordDictionary || []).map(async (w: any) => ({
        ...w,
        meaning: await translateSingle(w.meaning, targetLanguage),
        translation: await translateSingle(w.word, targetLanguage),
      }))
    );

    return {
      ...analysis,
      explanation,
      wordDictionary: translatedWords,
      poet: {
        ...analysis.poet,
        bio: poetBio,
        whyForm: poetWhyForm,
        era: poetEra,
      },
      themes: translatedThemes,
      literaryDevices: translatedDevices,
    };
  } catch (err) {
    console.warn('Full translation failed, returning partial:', err);
    return analysis;
  }
}

export { getLangCode };
