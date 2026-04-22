/**
 * Local Chat Engine
 * Provides intelligent poetry chat responses when the Gemini API is unavailable.
 * Uses pattern matching, keyword detection, and a knowledge base.
 */

// ── Poetry knowledge base for chat ────────────────────────────────────
const POETRY_KNOWLEDGE: Record<string, string[]> = {
  metaphor: [
    "A **metaphor** is a figure of speech that directly compares two unlike things without using 'like' or 'as'. For example, Shakespeare's 'All the world's a stage' compares life to theatrical performance.",
    "Metaphors work by transferring qualities from one thing to another. When we say 'Time is a thief,' we're not saying time literally steals — we're saying it takes things away from us, much like a thief would.",
    "**Extended metaphors** (also called conceits) carry a metaphor throughout an entire poem. John Donne's 'A Valediction: Forbidding Mourning' uses a compass as an extended metaphor for the connection between lovers."
  ],
  simile: [
    "A **simile** compares two things using 'like' or 'as'. Unlike metaphors, similes make the comparison explicit. Robert Burns' 'O my Luve is like a red, red rose' is among the most famous examples.",
    "Similes are powerful because they invite the reader to see familiar things in new ways. When Homer describes the sea as 'wine-dark,' he creates an image that has captivated readers for millennia."
  ],
  rhyme: [
    "**Rhyme** creates musical quality in poetry and helps with memorability. Common types include: **end rhyme** (rhyming at line ends), **internal rhyme** (within a line), and **slant rhyme** (near-rhyme, like 'moon/bone').",
    "Rhyme schemes are labeled with letters: ABAB means alternating rhymes, AABB means consecutive couplets, and ABBAABBA is the Petrarchan octave pattern.",
    "Not all great poetry rhymes! **Free verse** abandoned traditional rhyme schemes in favor of natural speech rhythms. Walt Whitman pioneered this form in 'Leaves of Grass.'"
  ],
  meter: [
    "**Meter** is the rhythmic pattern of stressed and unstressed syllables. The most common in English is **iambic pentameter** (da-DUM × 5), used by Shakespeare and Milton.",
    "Types of metrical feet: **Iamb** (da-DUM), **Trochee** (DUM-da), **Anapest** (da-da-DUM), **Dactyl** (DUM-da-da), **Spondee** (DUM-DUM).",
    "When a poet breaks the established meter, it's called a **substitution** — this creates emphasis and surprise, drawing attention to key moments."
  ],
  sonnet: [
    "The **sonnet** is a 14-line poem with a specific rhyme scheme. There are two main types:\n\n• **Petrarchan (Italian)**: Octave (ABBAABBA) + Sestet (CDCDCD or CDECDE)\n• **Shakespearean (English)**: Three quatrains + couplet (ABAB CDCD EFEF GG)",
    "The **volta** (or 'turn') is a crucial element of the sonnet — it's the moment where the poem shifts in argument, tone, or perspective. In Petrarchan sonnets, it occurs between the octave and sestet; in Shakespearean sonnets, it often comes at the final couplet."
  ],
  imagery: [
    "**Imagery** refers to language that appeals to the five senses: sight (visual), sound (auditory), touch (tactile), taste (gustatory), and smell (olfactory).",
    "Strong imagery makes poetry vivid and immersive. Consider Keats' 'Season of mists and mellow fruitfulness' — you can almost see the autumn fog, taste the ripened fruit, and feel the mellow warmth."
  ],
  symbolism: [
    "**Symbolism** is when an object, person, or event represents something beyond its literal meaning. In poetry, common symbols include:\n\n• **Water** → purification, life, change\n• **Darkness** → death, ignorance, evil\n• **Light** → knowledge, hope, divinity\n• **Seasons** → cycles of life\n• **Birds** → freedom, the soul",
    "A symbol differs from a metaphor in that it accumulates meaning throughout a poem (or across an entire body of work), rather than making a single comparison."
  ],
  alliteration: [
    "**Alliteration** is the repetition of initial consonant sounds in neighboring words. Example: 'Peter Piper picked a peck of pickled peppers.'",
    "In poetry, alliteration creates rhythm, draws attention to phrases, and can evoke specific sounds. Poe's 'silken, sad, uncertain rustling' uses the 's' sounds to mimic a whisper."
  ],
  theme: [
    "A **theme** is the central idea or underlying meaning of a poem. Common themes in poetry include:\n\n• **Love** — passionate, unrequited, familial\n• **Death & Mortality** — the inevitability of death, legacy\n• **Nature** — beauty, power, transience\n• **Identity** — self-discovery, belonging\n• **Time** — its passage, nostalgia, memory\n• **Freedom** — political, personal, spiritual",
    "Themes are different from subjects. The **subject** is what the poem is about on the surface; the **theme** is the deeper truth the poet explores through that subject."
  ],
  poet: [
    "Some of the most influential poets in history include:\n\n• **William Shakespeare** (1564–1616) — Master of the English sonnet\n• **Emily Dickinson** (1830–1886) — Pioneer of slant rhyme and unconventional punctuation\n• **Walt Whitman** (1819–1892) — Father of free verse\n• **Robert Frost** (1874–1963) — Nature poet with philosophical depth\n• **Maya Angelou** (1928–2014) — Voice of African American experience\n• **Rumi** (1207–1273) — Persian mystic poet of divine love",
  ],
  form: [
    "Poetry comes in many **forms**, each with its own rules and traditions:\n\n• **Sonnet** — 14 lines, specific rhyme schemes\n• **Haiku** — 3 lines (5-7-5 syllables), Japanese origin\n• **Limerick** — 5 lines, humorous, AABBA rhyme\n• **Villanelle** — 19 lines with repeating refrains (like Dylan Thomas' 'Do Not Go Gentle')\n• **Ode** — Formal address to a subject, celebratory\n• **Elegy** — Mourning poem for the dead\n• **Free Verse** — No fixed meter or rhyme scheme",
  ],
  analyze: [
    "To analyze a poem effectively, follow these steps:\n\n1. **Read it aloud** — hear the rhythm and music\n2. **Identify the form** — sonnet, free verse, haiku, etc.\n3. **Note the imagery** — what senses does it engage?\n4. **Find literary devices** — metaphors, similes, alliteration\n5. **Consider the speaker** — who is talking? To whom?\n6. **Determine the theme** — what deeper truth is explored?\n7. **Research the context** — when was it written? what was happening?\n8. **Examine word choice (diction)** — why these specific words?",
  ],
};

// ── Contextual responses based on the poem being discussed ────────────
function getPoemSpecificResponse(poem: string, question: string): string | null {
  const lower = question.toLowerCase();
  const poemLower = poem.toLowerCase();

  // If they're asking about meaning/explanation
  if (lower.includes('mean') || lower.includes('about') || lower.includes('explain') || lower.includes('interpret')) {
    return `Great question! Let me break down the meaning:\n\nThe poem you're studying uses rich language to convey its themes. Here's how to approach it:\n\n1. **Surface Level**: Read the poem literally first — what is physically happening?\n2. **Figurative Level**: Look for metaphors and symbols — what do they represent?\n3. **Emotional Level**: What feelings does the poem evoke? How does the poet achieve this?\n4. **Historical Context**: Consider when this was written and what influenced the poet.\n\nLook for **key images** that repeat or transform throughout the poem — these often hold the deepest meaning. What specific lines are you curious about?`;
  }

  // If they're asking about the poet
  if (lower.includes('who wrote') || lower.includes('poet') || lower.includes('author') || lower.includes('wrote this')) {
    return `To identify the poet, look at structural and stylistic clues:\n\n• **Rhyme scheme** — Shakespearean, Petrarchan, or free verse?\n• **Era indicators** — archaic language ('thee', 'thou') suggests older periods\n• **Subject matter** — nature themes often point to Romantic poets\n• **Tone** — dark/gothic may suggest Poe; transcendent may suggest Whitman\n\nIf you paste a specific poem in the Dashboard analysis tool, I can identify the poet automatically with detailed biographical context!`;
  }

  // If they're asking about literary devices
  if (lower.includes('device') || lower.includes('technique') || lower.includes('figure of speech')) {
    return `Here are the **literary devices** to look for in any poem:\n\n• **Metaphor** — direct comparison ("life is a journey")\n• **Simile** — comparison using like/as ("brave as a lion")\n• **Personification** — giving human traits to non-human things\n• **Alliteration** — repetition of initial consonants\n• **Assonance** — repetition of vowel sounds\n• **Enjambment** — sentence running across line breaks\n• **Caesura** — a pause in the middle of a line\n• **Hyperbole** — exaggeration for effect\n• **Irony** — saying the opposite of what is meant\n\nWould you like me to explain any of these in more detail?`;
  }

  return null;
}

// ── Main chat function ────────────────────────────────────────────────
export function chatLocally(
  poem: string,
  message: string,
  history: { role: string; text: string }[]
): string {
  const lower = message.toLowerCase().trim();

  // Check for poem-specific context first
  if (poem && poem.length > 20) {
    const contextual = getPoemSpecificResponse(poem, message);
    if (contextual) return contextual;
  }

  // Check against knowledge base
  for (const [topic, responses] of Object.entries(POETRY_KNOWLEDGE)) {
    if (lower.includes(topic)) {
      // Pick a response (rotate based on history length for variety)
      const idx = history.length % responses.length;
      return responses[idx];
    }
  }

  // Check for common question patterns
  if (lower.includes('help') || lower.includes('what can you')) {
    return `I'm your **Poetry Counselor**! Here's what I can help with:\n\n🔍 **Analyze poems** — paste any poem for deep analysis\n📚 **Literary devices** — metaphors, similes, symbolism, etc.\n🎭 **Poetry forms** — sonnets, haiku, villanelle, and more\n✍️ **Famous poets** — biographies and their signature styles\n📖 **Themes** — love, death, nature, identity, and beyond\n🎵 **Meter & Rhyme** — understanding rhythm in poetry\n\nJust ask me anything about poetry! For example:\n• "What is a metaphor?"\n• "Explain iambic pentameter"\n• "Tell me about Shakespeare's sonnets"`;
  }

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return `Hello! 👋 Welcome to the Poetry Counselor. I'm here to help you explore the wonderful world of poetry.\n\nYou can ask me about:\n• **Literary devices** (metaphors, similes, imagery)\n• **Poetry forms** (sonnets, haiku, free verse)\n• **Famous poets** and their works\n• **How to analyze** a poem\n\nWhat would you like to explore today?`;
  }

  if (lower.includes('thank')) {
    return `You're welcome! 🌟 Poetry is a journey of discovery, and every question brings you closer to deeper understanding. Feel free to ask anything else — I'm always here to help you explore the infinite world of verse.`;
  }

  // Specific poem-related questions
  if (lower.includes('favorite') || lower.includes('best') || lower.includes('recommend')) {
    return `Here are some timeless poems I'd recommend for study:\n\n📜 **For beginners:**\n• *"The Road Not Taken"* — Robert Frost (accessible yet deep)\n• *"Still I Rise"* — Maya Angelou (powerful and inspiring)\n• *"Twinkle, Twinkle, Little Star"* — Jane Taylor (deceptively profound)\n\n📖 **For intermediate readers:**\n• *Sonnet 18* — William Shakespeare (the art of immortality)\n• *"I Wandered Lonely as a Cloud"* — Wordsworth (nature's healing power)\n• *"The Raven"* — Edgar Allan Poe (mastery of atmosphere)\n\n🎓 **For advanced study:**\n• *"The Waste Land"* — T.S. Eliot (modernist masterpiece)\n• *"Paradise Lost"* — John Milton (epic poetry at its finest)\n• *"Howl"* — Allen Ginsberg (revolutionary Beat poetry)\n\nWant me to analyze any of these? Paste it into the Dashboard!`;
  }

  if (lower.includes('write') || lower.includes('how to') || lower.includes('tips')) {
    return `Here are some **tips for writing poetry**:\n\n1. **Read extensively** — absorb different styles and voices\n2. **Write regularly** — treat it like a muscle that needs exercise\n3. **Show, don't tell** — use concrete images instead of abstract statements\n4. **Play with sound** — read your work aloud; poetry is musical\n5. **Embrace revision** — first drafts are never finished poems\n6. **Break rules intentionally** — learn the forms, then experiment\n7. **Be specific** — "a red 1957 Chevy" is more vivid than "a car"\n8. **Use line breaks meaningfully** — each break creates a pause and emphasis\n\n*"Poetry is not a turning loose of emotion, but an escape from emotion."* — T.S. Eliot`;
  }

  // Default intelligent response
  return `That's a thought-provoking question! Let me share some insights:\n\nPoetry is fundamentally about **compression of meaning** — saying the most with the fewest words. Every element in a poem serves a purpose: the rhythm mirrors emotion, the imagery creates experience, and the structure guides understanding.\n\nHere are some angles to consider:\n\n• **Close reading** — examine individual word choices and their connotations\n• **Contextual reading** — consider the historical and personal context\n• **Comparative reading** — how does this relate to other works?\n\nCould you tell me more about what specific aspect you'd like to explore? I can discuss metaphors, symbolism, poetic forms, famous poets, or help analyze a specific poem.`;
}
