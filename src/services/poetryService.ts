import { GoogleGenAI, Type } from "@google/genai";

let _ai: GoogleGenAI | null = null;

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

// Retry helper with exponential backoff for 503 / 429 errors
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelayMs: number = 2000
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      const msg = err?.message || "";
      const isRetryable =
        msg.includes("503") ||
        msg.includes("429") ||
        msg.includes("UNAVAILABLE") ||
        msg.includes("RESOURCE_EXHAUSTED") ||
        msg.includes("high demand") ||
        err?.status === 503 ||
        err?.status === 429;

      if (!isRetryable || attempt === maxRetries) {
        // For quota exhausted, give a user-friendly message
        if (msg.includes("RESOURCE_EXHAUSTED") || msg.includes("quota")) {
          throw new Error(
            "API quota exhausted. Please get a new API key from https://aistudio.google.com/apikey or wait for your daily quota to reset, then update your .env file."
          );
        }
        throw err;
      }

      // Try to extract server-suggested retry delay
      const retryMatch = msg.match(/retry in ([\d.]+)s/i);
      const delay = retryMatch
        ? Math.ceil(parseFloat(retryMatch[1]) * 1000)
        : baseDelayMs * Math.pow(2, attempt);

      console.warn(
        `Gemini API rate limited (attempt ${attempt + 1}/${maxRetries + 1}). Retrying in ${Math.round(delay / 1000)}s...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw lastError;
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

export async function explainPoetry(
  poem: string,
  targetLanguage: string = "English"
): Promise<PoetryAnalysis> {
  const response = await withRetry(() =>
    getAI().models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: `Analyze the following poem. Provide a detailed explanation, translation to ${targetLanguage} (if the poem is not in ${targetLanguage}), word dictionary for difficult words (including pronunciation if possible), context about the poet (era, bio, why they chose this form), themes, literary devices, and potential study sources.

Poem:
${poem}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
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
        }
      }
    })
  );

  // ✅ SAFE parsing (fixes your TS error)
  const text = response.text;

  if (!text) {
    throw new Error("Empty response from Gemini API");
  }

  try {
    return JSON.parse(text) as PoetryAnalysis;
  } catch (err) {
    console.error("Invalid JSON from Gemini:", text);
    throw new Error("Failed to parse AI response");
  }
}

export async function chatAboutPoetry(
  poem: string,
  history: { role: "user" | "model"; text: string }[],
  message: string
) {
  const chat = getAI().chats.create({
    model: "gemini-2.0-flash-lite",
    config: {
      systemInstruction: `You are an expert poetry guide. The user is asking questions about the following poem:
      
${poem}

Be insightful, encouraging, and academic yet accessible. Use literary terms where appropriate.`
    }
  });

  const response = await withRetry(() =>
    chat.sendMessage({
      message
    })
  );

  // ✅ handle undefined safely
  if (!response.text) {
    throw new Error("Empty response from chat API");
  }

  return response.text;
}