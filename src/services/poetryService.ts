import { GoogleGenAI, Type } from "@google/genai";
import { analyzeLocally } from "./localPoetryEngine";
import { chatLocally } from "./localChatEngine";
import { translateAnalysis } from "./translationService";

let _ai: GoogleGenAI | null = null;

// Multiple models to try — each has its OWN separate quota
const MODELS = [
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
];

function getAI(): GoogleGenAI {
  if (!_ai) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("VITE_GEMINI_API_KEY is not set. Please check your .env file.");
    }
    _ai = new GoogleGenAI({ apiKey });
  }
  return _ai;
}

async function tryWithTimeout<T>(fn: () => Promise<T>, timeoutMs: number = 15000): Promise<T> {
  return Promise.race([
    fn(),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeoutMs)
    )
  ]);
}

export interface PoetryAnalysis {
  originalPoem: string;
  translation?: string;
  explanation: string;
  wordDictionary: {
    word: string;
    meaning: string;
    translation?: string;
    pronunciation?: string;
  }[];
  poet: {
    name: string;
    era: string;
    bio: string;
    whyForm: string;
    wikipediaLink?: string;
  };
  themes: string[];
  literaryDevices: {
    device: string;
    example: string;
    meaning: string;
  }[];
  sources: string[];
}

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    originalPoem: { type: Type.STRING },
    translation: { type: Type.STRING },
    explanation: { type: Type.STRING },
    wordDictionary: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          meaning: { type: Type.STRING },
          translation: { type: Type.STRING },
          pronunciation: { type: Type.STRING }
        },
        required: ["word", "meaning"]
      }
    },
    poet: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        era: { type: Type.STRING },
        bio: { type: Type.STRING },
        whyForm: { type: Type.STRING },
        wikipediaLink: { type: Type.STRING }
      },
      required: ["name", "era", "bio", "whyForm"]
    },
    themes: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    literaryDevices: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          device: { type: Type.STRING },
          example: { type: Type.STRING },
          meaning: { type: Type.STRING }
        },
        required: ["device", "example", "meaning"]
      }
    },
    sources: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    }
  },
  required: [
    "originalPoem",
    "explanation",
    "wordDictionary",
    "poet",
    "themes",
    "literaryDevices",
    "sources"
  ]
};

export async function explainPoetry(
  poem: string,
  targetLanguage: string = "English"
): Promise<PoetryAnalysis> {
  // Build prompt — tell Gemini to return EVERYTHING in the target language
  const languageInstruction = targetLanguage !== "English"
    ? `\n\nIMPORTANT: Provide ALL your analysis in ${targetLanguage}. The explanation, poet bio, themes, literary device names and descriptions, word meanings — EVERYTHING must be written in ${targetLanguage}. Only keep the original poem text and poet name in their original language/script.`
    : '';

  const prompt = `Analyze the following poem. Provide a detailed explanation, translation to ${targetLanguage} (if the poem is not in ${targetLanguage}), word dictionary for difficult words (including pronunciation if possible), context about the poet (era, bio, why they chose this form), themes, literary devices, and potential study sources.${languageInstruction}

Poem:
${poem}`;

  // Try each model in sequence
  for (let i = 0; i < MODELS.length; i++) {
    const model = MODELS[i];
    try {
      console.log(`Trying model: ${model}...`);
      const response = await tryWithTimeout(() =>
        getAI().models.generateContent({
          model,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: RESPONSE_SCHEMA
          }
        })
      );

      const text = response.text;
      if (!text) throw new Error("Empty response");

      const result = JSON.parse(text) as PoetryAnalysis;
      console.log(`✅ Success with model: ${model}`);
      return result;
    } catch (err: any) {
      console.warn(`❌ Model ${model} failed:`, err?.message?.substring(0, 100));
    }
  }

  // All API models failed — use local engine + free translation API
  console.warn("All API models failed. Using local engine + translation API.");
  const localResult = analyzeLocally(poem, targetLanguage);
  
  // Translate the local result to target language using free API
  if (targetLanguage !== "English") {
    try {
      const translated = await translateAnalysis(localResult, targetLanguage);
      return translated as PoetryAnalysis;
    } catch (err) {
      console.warn("Translation API also failed, returning English results:", err);
    }
  }
  
  return localResult;
}

export async function chatAboutPoetry(
  poem: string,
  history: { role: "user" | "model"; text: string }[],
  message: string
): Promise<string> {
  for (let i = 0; i < MODELS.length; i++) {
    const model = MODELS[i];
    try {
      console.log(`Chat trying model: ${model}...`);
      const chat = getAI().chats.create({
        model,
        config: {
          systemInstruction: `You are an expert poetry guide. The user is asking questions about poetry.
${poem ? `\nThe user is currently studying this poem:\n${poem}` : ''}

Be insightful, encouraging, and academic yet accessible. Use literary terms where appropriate.
Format your responses with clear paragraphs. Use **bold** for key terms.
Keep responses focused and helpful.`
        }
      });

      const response = await tryWithTimeout(() =>
        chat.sendMessage({ message })
      );

      if (!response.text) throw new Error("Empty response");

      console.log(`✅ Chat success with model: ${model}`);
      return response.text;
    } catch (err: any) {
      console.warn(`❌ Chat model ${model} failed:`, err?.message?.substring(0, 100));
    }
  }

  // All models failed — use local chat engine
  console.warn("All chat models failed. Using local chat engine.");
  return chatLocally(poem, message, history);
}