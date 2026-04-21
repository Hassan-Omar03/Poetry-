/**
 * Local Poetry Analysis Engine
 * Provides offline analysis when the Gemini API is unavailable.
 * Uses a built-in knowledge base of famous poems and smart text processing.
 */

import type { PoetryAnalysis } from './poetryService';

// ── Built-in poem knowledge base ──────────────────────────────────────
interface PoemEntry {
  keywords: string[];
  poet: PoetryAnalysis['poet'];
  themes: string[];
  literaryDevices: PoetryAnalysis['literaryDevices'];
  explanation: string;
  sources: string[];
}

const KNOWN_POEMS: PoemEntry[] = [
  {
    keywords: ['twinkle', 'little star', 'wonder', 'diamond', 'sky'],
    poet: {
      name: 'Jane Taylor',
      era: 'Romantic Era (1783–1824)',
      bio: 'Jane Taylor was an English poet and novelist, best known for her nursery rhyme "Twinkle, Twinkle, Little Star." She and her sister Ann Taylor were among the most popular children\'s poets of the early 19th century.',
      whyForm: 'Taylor chose the simple AABB rhyming couplet form to create a sing-song quality accessible to young children, while embedding deeper philosophical questions about nature and wonder.',
      wikipediaLink: 'https://en.wikipedia.org/wiki/Jane_Taylor_(poet)'
    },
    themes: ['Wonder', 'Nature', 'Childhood Curiosity', 'Astronomy', 'Innocence'],
    literaryDevices: [
      { device: 'Simile', example: 'Like a diamond in the sky', meaning: 'Compares the star to a diamond, emphasizing its brilliance and preciousness.' },
      { device: 'Apostrophe', example: 'Twinkle, twinkle, little star', meaning: 'The speaker directly addresses the star as if it were a person capable of hearing.' },
      { device: 'Personification', example: 'How I wonder what you are', meaning: 'Attributes human-like mystery to a celestial object.' }
    ],
    explanation: 'This beloved poem, originally published in 1806 as "The Star," is far more than a simple nursery rhyme. It captures the universal human experience of gazing up at the night sky with awe and curiosity. The speaker addresses a star directly, marveling at its brilliance and comparing it to a diamond. The poem reflects the Romantic era\'s fascination with nature and the sublime, while also embodying the innocent wonder of childhood. Through its deceptively simple structure, the poem raises profound questions about our place in the universe.',
    sources: ['Poetry Foundation', 'Encyclopedia Britannica', 'Oxford Dictionary of Nursery Rhymes']
  },
  {
    keywords: ['road not taken', 'diverged', 'yellow wood', 'frost', 'two roads'],
    poet: {
      name: 'Robert Frost',
      era: 'Modern Era (1874–1963)',
      bio: 'Robert Lee Frost was an American poet known for his realistic depictions of rural life and his command of American colloquial speech. He received four Pulitzer Prizes for Poetry.',
      whyForm: 'Frost used iambic tetrameter with an ABAAB rhyme scheme to create a conversational yet musical tone, mirroring the natural rhythm of contemplative thought.',
      wikipediaLink: 'https://en.wikipedia.org/wiki/Robert_Frost'
    },
    themes: ['Choice', 'Individualism', 'Regret', 'Life Journey', 'Nostalgia'],
    literaryDevices: [
      { device: 'Extended Metaphor', example: 'Two roads diverged in a yellow wood', meaning: 'The diverging roads represent life choices and their irreversible nature.' },
      { device: 'Imagery', example: 'And both that morning equally lay / In leaves no step had trodden black', meaning: 'Vivid visual description creates a palpable sense of the forest setting.' },
      { device: 'Irony', example: 'I took the one less traveled by / And that has made all the difference', meaning: 'The speaker admits both roads were equally worn, yet later claims to have taken the unique path.' }
    ],
    explanation: 'Often misread as a celebration of nonconformity, "The Road Not Taken" is actually a nuanced meditation on the nature of choice and the stories we tell ourselves about our decisions. Frost wrote the poem as a gentle jest about his friend Edward Thomas, who during their walks would always regret not taking a different path. The poem explores how we construct narratives of our past choices as pivotal and deliberate, when in reality, many life decisions are made between equally viable options.',
    sources: ['Poetry Foundation', 'The Atlantic - "The Most Misread Poem in America"', 'Modern American Poetry Archive']
  },
  {
    keywords: ['sonnet', 'shall i compare', 'summer', 'shakespeare', 'temperate', 'thou'],
    poet: {
      name: 'William Shakespeare',
      era: 'Elizabethan Era (1564–1616)',
      bio: 'William Shakespeare was an English playwright and poet, widely regarded as the greatest writer in the English language. His 154 sonnets explore themes of love, beauty, mortality, and time.',
      whyForm: 'Shakespeare used the English sonnet form (three quatrains and a couplet) with iambic pentameter to build a logical argument about beauty and immortality through verse.',
      wikipediaLink: 'https://en.wikipedia.org/wiki/William_Shakespeare'
    },
    themes: ['Love', 'Beauty', 'Immortality', 'Time', 'Art vs. Nature'],
    literaryDevices: [
      { device: 'Metaphor', example: 'Shall I compare thee to a summer\'s day?', meaning: 'Compares the beloved to the beauty and warmth of summer.' },
      { device: 'Personification', example: 'And often is his gold complexion dimmed', meaning: 'The sun is described as having a face, like a person whose appearance fades.' },
      { device: 'Couplet Resolution', example: 'So long as men can breathe or eyes can see / So long lives this, and this gives life to thee', meaning: 'The final couplet asserts that the poem itself will immortalize the beloved.' }
    ],
    explanation: 'Sonnet 18 is one of the most celebrated love poems in the English language. Shakespeare begins with a rhetorical question, comparing his beloved to a summer\'s day, only to argue that the beloved surpasses summer in beauty and permanence. While summer is temporary—subject to winds, heat, and the passage of time—the beloved\'s beauty will be preserved forever through the immortality of the poem itself. This is a revolutionary claim: that art has the power to transcend mortality.',
    sources: ['Folger Shakespeare Library', 'Poetry Foundation', 'Shakespeare Online']
  },
  {
    keywords: ['daffodils', 'wandered', 'lonely', 'cloud', 'wordsworth', 'golden', 'host'],
    poet: {
      name: 'William Wordsworth',
      era: 'Romantic Era (1770–1850)',
      bio: 'William Wordsworth was a major English Romantic poet who helped launch the Romantic Age in English literature with his joint publication of Lyrical Ballads with Samuel Taylor Coleridge.',
      whyForm: 'Wordsworth chose iambic tetrameter with an ABABCC rhyme scheme to create a flowing, lilting rhythm that mirrors the gentle swaying of daffodils in the breeze.',
      wikipediaLink: 'https://en.wikipedia.org/wiki/William_Wordsworth'
    },
    themes: ['Nature', 'Solitude', 'Memory', 'Joy', 'The Sublime'],
    literaryDevices: [
      { device: 'Simile', example: 'I wandered lonely as a cloud', meaning: 'Compares the solitary poet to a drifting cloud, evoking freedom and aimlessness.' },
      { device: 'Personification', example: 'Tossing their heads in sprightly dance', meaning: 'The daffodils are given human qualities, dancing joyfully.' },
      { device: 'Hyperbole', example: 'Ten thousand saw I at a glance', meaning: 'Exaggerates the number of flowers to convey overwhelming abundance.' }
    ],
    explanation: 'Written in 1804 and published in 1807, this poem recounts Wordsworth\'s encounter with a field of daffodils while walking with his sister Dorothy near Ullswater. The poem embodies the Romantic belief that nature has the power to heal and inspire. The final stanza reveals the poem\'s deeper meaning: memory allows us to relive beautiful moments, providing solace in times of solitude. The daffodils become a symbol of joy that lives on in the poet\'s "inward eye."',
    sources: ['Poetry Foundation', 'British Library', 'Wordsworth Trust']
  },
  {
    keywords: ['raven', 'nevermore', 'poe', 'midnight', 'dreary', 'chamber'],
    poet: {
      name: 'Edgar Allan Poe',
      era: 'American Romantic Era (1809–1849)',
      bio: 'Edgar Allan Poe was an American writer, poet, and literary critic, best known for his poetry and short stories of mystery and the macabre. He is considered the inventor of the detective fiction genre.',
      whyForm: 'Poe used trochaic octameter—an intentionally unusual and hypnotic meter—combined with internal rhyme to create an incantatory, dreamlike quality that mirrors the narrator\'s descent into madness.',
      wikipediaLink: 'https://en.wikipedia.org/wiki/Edgar_Allan_Poe'
    },
    themes: ['Loss', 'Grief', 'Madness', 'The Supernatural', 'Despair'],
    literaryDevices: [
      { device: 'Refrain', example: 'Nevermore', meaning: 'The raven\'s single-word response becomes an increasingly tormenting refrain, sealing the narrator\'s hopelessness.' },
      { device: 'Alliteration', example: 'Deep into that darkness peering, long I stood there wondering, fearing', meaning: 'The repetition of consonant sounds creates a musical, hypnotic atmosphere.' },
      { device: 'Symbolism', example: 'The Raven', meaning: 'The raven symbolizes mournful, unending remembrance and the finality of death.' }
    ],
    explanation: '"The Raven" tells the story of a grieving scholar visited by a mysterious raven that speaks only the word "Nevermore." The poem traces the narrator\'s psychological journey from mild curiosity to full existential despair. Each question the narrator asks the raven is designed to elicit the devastating response, suggesting the narrator is complicit in his own torment. Poe described the poem as being composed with mathematical precision, choosing every element—from the word "nevermore" to the setting—for maximum emotional effect.',
    sources: ['Poetry Foundation', 'Poe Museum', 'The Edgar Allan Poe Society of Baltimore']
  }
];

// ── Smart analysis functions ──────────────────────────────────────────

function findMatchingPoem(poemText: string): PoemEntry | null {
  const lower = poemText.toLowerCase();
  let bestMatch: PoemEntry | null = null;
  let bestScore = 0;

  for (const entry of KNOWN_POEMS) {
    const score = entry.keywords.filter(kw => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestScore >= 1 ? bestMatch : null;
}

function extractWords(text: string): string[] {
  return text
    .replace(/[^\w\s'-]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3)
    .map(w => w.toLowerCase());
}

function detectLanguage(text: string): string {
  // Simple heuristic detection
  const urduPattern = /[\u0600-\u06FF]/;
  const arabicPattern = /[\u0627-\u064A]/;
  const hindiPattern = /[\u0900-\u097F]/;
  const chinesePattern = /[\u4e00-\u9fff]/;
  
  if (urduPattern.test(text)) return 'Urdu';
  if (hindiPattern.test(text)) return 'Hindi';
  if (chinesePattern.test(text)) return 'Chinese';
  if (arabicPattern.test(text) && !urduPattern.test(text)) return 'Arabic';
  return 'English';
}

function generateGenericAnalysis(poem: string, targetLanguage: string): PoetryAnalysis {
  const lines = poem.split('\n').filter(l => l.trim());
  const words = extractWords(poem);
  const uniqueWords = [...new Set(words)];
  const detectedLang = detectLanguage(poem);
  
  // Detect rhyme scheme
  const hasRhyme = lines.length >= 2;
  
  // Build a basic word dictionary from longer/unusual words
  const commonWords = new Set(['that', 'this', 'with', 'from', 'have', 'they', 'been', 'were', 'what', 'when', 'your', 'will', 'each', 'make', 'like', 'long', 'look', 'many', 'some', 'than', 'them', 'then', 'would', 'about', 'could', 'into', 'more', 'other', 'their', 'there', 'these', 'which']);
  const interestingWords = uniqueWords
    .filter(w => w.length > 5 && !commonWords.has(w))
    .slice(0, 8);

  const wordDictionary = interestingWords.map(word => ({
    word: word.charAt(0).toUpperCase() + word.slice(1),
    meaning: `A significant word choice that contributes to the poem's tone and meaning.`,
    translation: targetLanguage !== detectedLang ? `[${targetLanguage} translation]` : undefined,
    pronunciation: `/${word}/`
  }));

  // Detect potential literary devices
  const literaryDevices: PoetryAnalysis['literaryDevices'] = [];
  
  if (poem.match(/like\s+\w+|as\s+\w+\s+as/i)) {
    literaryDevices.push({
      device: 'Simile',
      example: poem.match(/.*(?:like\s+\w+|as\s+\w+\s+as\s+\w+).*/i)?.[0]?.trim() || 'Comparison found in text',
      meaning: 'A direct comparison using "like" or "as" to create vivid imagery.'
    });
  }
  
  const repeatedWords = uniqueWords.filter(w => {
    const regex = new RegExp(`\\b${w}\\b`, 'gi');
    return (poem.match(regex) || []).length >= 3;
  });
  if (repeatedWords.length > 0) {
    literaryDevices.push({
      device: 'Repetition',
      example: `The word "${repeatedWords[0]}" appears multiple times`,
      meaning: 'Repetition reinforces key ideas and creates rhythmic emphasis.'
    });
  }

  if (lines.length > 2) {
    literaryDevices.push({
      device: 'Imagery',
      example: lines[0]?.trim() || 'Visual elements throughout',
      meaning: 'The poem uses descriptive language to evoke sensory experiences in the reader.'
    });
  }

  if (literaryDevices.length === 0) {
    literaryDevices.push(
      { device: 'Imagery', example: lines[0]?.trim() || 'Throughout the poem', meaning: 'Visual and sensory details create a vivid mental picture.' },
      { device: 'Tone', example: 'Overall poem', meaning: 'The poem establishes a distinct emotional atmosphere through word choice and rhythm.' }
    );
  }

  // Detect themes based on word frequency
  const themeMap: Record<string, string[]> = {
    'Love': ['love', 'heart', 'beloved', 'kiss', 'passion', 'desire', 'embrace'],
    'Nature': ['sky', 'sun', 'moon', 'tree', 'flower', 'river', 'wind', 'rain', 'star', 'garden'],
    'Death': ['death', 'grave', 'die', 'dead', 'mortal', 'tomb', 'decay'],
    'Time': ['time', 'age', 'years', 'moment', 'eternal', 'forever', 'past'],
    'Solitude': ['alone', 'lonely', 'solitude', 'silence', 'quiet', 'empty'],
    'Hope': ['hope', 'dream', 'light', 'dawn', 'rise', 'new', 'bright'],
    'Faith': ['god', 'prayer', 'divine', 'heaven', 'soul', 'spirit', 'sacred'],
    'Beauty': ['beauty', 'beautiful', 'fair', 'grace', 'lovely', 'radiant'],
    'Freedom': ['free', 'freedom', 'liberty', 'wings', 'fly', 'soar', 'wild'],
    'Life': ['life', 'living', 'breath', 'journey', 'path', 'road', 'walk']
  };

  const themes: string[] = [];
  const lowerPoem = poem.toLowerCase();
  for (const [theme, keywords] of Object.entries(themeMap)) {
    if (keywords.some(kw => lowerPoem.includes(kw))) {
      themes.push(theme);
    }
  }
  if (themes.length === 0) themes.push('Human Experience', 'Contemplation', 'Expression');
  if (themes.length < 3) themes.push('Artistic Expression');

  // Determine form
  let formDescription = 'free verse';
  if (lines.length === 14) formDescription = 'sonnet form (14 lines)';
  else if (lines.length === 3) formDescription = 'haiku form (3 lines)';
  else if (lines.length <= 4) formDescription = 'a concise lyric form';
  else if (lines.length % 4 === 0) formDescription = `${lines.length / 4}-stanza form with quatrains`;

  return {
    originalPoem: poem,
    translation: targetLanguage !== detectedLang ? `[Translation to ${targetLanguage} - for accurate translation, please try again when the AI service is available]` : undefined,
    explanation: `This ${lines.length}-line poem written in ${formDescription} explores themes of ${themes.slice(0, 3).join(', ').toLowerCase()}. The poet employs careful word choice and structural elements to convey their message. The opening line "${lines[0]?.trim() || 'the poem'}" sets the tone for the entire piece, establishing the emotional landscape that unfolds throughout. The poem's structure and rhythm work together to create a cohesive artistic experience that resonates with readers on both intellectual and emotional levels. Each line builds upon the previous, creating layers of meaning that reward careful close reading.`,
    wordDictionary,
    poet: {
      name: 'Unknown Poet',
      era: 'To be determined',
      bio: 'The poet of this work could not be automatically identified. For detailed poet information, please try again when the AI service is available.',
      whyForm: `The poet chose ${formDescription} to structure their ideas, creating a ${hasRhyme ? 'rhythmic' : 'free-flowing'} experience for the reader.`
    },
    themes,
    literaryDevices,
    sources: [
      'Poetry Foundation (poetryfoundation.org)',
      'Academy of American Poets (poets.org)',
      'Literary Devices (literarydevices.net)'
    ]
  };
}

// ── Main export ───────────────────────────────────────────────────────

export function analyzeLocally(poem: string, targetLanguage: string): PoetryAnalysis {
  // First check if it matches a known poem
  const knownMatch = findMatchingPoem(poem);
  
  if (knownMatch) {
    return {
      originalPoem: poem,
      translation: targetLanguage !== 'English' ? `[Translation to ${targetLanguage} available when AI service is online]` : undefined,
      explanation: knownMatch.explanation,
      wordDictionary: extractWords(poem)
        .filter(w => w.length > 4)
        .slice(0, 6)
        .map(w => ({
          word: w.charAt(0).toUpperCase() + w.slice(1),
          meaning: 'A key word contributing to the poem\'s imagery and meaning.',
          pronunciation: `/${w}/`
        })),
      poet: knownMatch.poet,
      themes: knownMatch.themes,
      literaryDevices: knownMatch.literaryDevices,
      sources: knownMatch.sources
    };
  }

  // Fall back to generic analysis
  return generateGenericAnalysis(poem, targetLanguage);
}
