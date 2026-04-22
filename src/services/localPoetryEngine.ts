/**
 * Local Poetry Analysis Engine
 * Provides offline analysis when the Gemini API is unavailable.
 * Uses a built-in knowledge base of famous poems and smart text processing.
 */

import type { PoetryAnalysis } from './poetryService';

// ── Built-in translations for known poems ─────────────────────────────
const TRANSLATIONS: Record<string, Record<string, string>> = {
  'twinkle': {
    'Arabic': 'تلألأ، تلألأ، أيها النجم الصغير،\nكم أتساءل ما أنت!\nفوق العالم عالياً جداً،\nكالماسة في السماء.',
    'Urdu': 'ٹمٹم کرو، ٹمٹم کرو، چھوٹے تارے،\nمیں حیران ہوں تم کیا ہو!\nدنیا سے بہت اوپر،\nآسمان میں ہیرے کی طرح.',
    'Hindi': 'टिमटिमाओ, टिमटिमाओ, छोटे तारे,\nमैं सोचता हूँ तुम क्या हो!\nदुनिया के ऊपर इतने ऊँचे,\nआसमान में हीरे की तरह.',
    'French': 'Scintille, scintille, petite étoile,\nComme je me demande ce que tu es !\nSi haut au-dessus du monde,\nComme un diamant dans le ciel.',
    'Spanish': 'Brilla, brilla, estrellita,\n¡Cómo me pregunto qué eres!\nTan alto sobre el mundo,\nComo un diamante en el cielo.',
    'German': 'Funkle, funkle, kleiner Stern,\nWie ich mich frage, was du bist!\nSo hoch über der Welt,\nWie ein Diamant am Himmel.',
    'Chinese (Simplified)': '一闪一闪小星星，\n我想知道你是什么！\n高高挂在世界上方，\n像天空中的钻石。',
    'Japanese': 'きらきら光る小さな星よ、\nあなたは何者なのかしら！\n世界のはるか上に、\n空のダイヤモンドのように。',
    'Korean': '반짝반짝 작은 별,\n넌 무엇인지 궁금해!\n세상 위 높이 떠서,\n하늘의 다이아몬드처럼.',
    'Turkish': 'Işılda, ışılda, küçük yıldız,\nNe olduğunu merak ediyorum!\nDünyanın çok üstünde,\nGökyüzünde bir elmas gibi.',
    'Russian': 'Мерцай, мерцай, маленькая звезда,\nКак я хочу знать, что ты такое!\nТак высоко над миром,\nКак бриллиант в небе.',
    'Portuguese': 'Brilha, brilha, estrelinha,\nComo me pergunto o que és!\nTão alto acima do mundo,\nComo um diamante no céu.',
    'Italian': 'Brilla, brilla, stellina,\nCome mi chiedo cosa sei!\nCosì in alto sopra il mondo,\nCome un diamante nel cielo.',
    'Persian': 'بدرخش، بدرخش، ستاره کوچک،\nچقدر حیرانم که تو چیستی!\nبالای دنیا آنقدر بلند،\nمثل الماسی در آسمان.',
    'Dutch': 'Twinkle, twinkle, kleine ster,\nIk vraag me af wat je bent!\nZo hoog boven de wereld,\nAls een diamant aan de hemel.',
    'Bengali': 'মিটমিট করো, মিটমিট করো, ছোট্ট তারা,\nআমি ভাবি তুমি কী!\nপৃথিবীর অনেক উপরে,\nআকাশে হীরার মতো.',
    'Malay': 'Berkelip, berkelip, bintang kecil,\nBetapa aku tertanya-tanya apa kamu!\nTinggi di atas dunia,\nBagai berlian di langit.',
    'Swedish': 'Blinka, blinka, lilla stjärna,\nVad jag undrar vad du är!\nSå högt ovanför världen,\nSom en diamant på himlen.',
    'Polish': 'Migocz, migocz, mała gwiazdko,\nJak się zastanawiam, czym jesteś!\nTak wysoko nad światem,\nJak diament na niebie.',
  },
  'road': {
    'Arabic': 'تفرّق طريقان في غابة صفراء،\nوآسف أنني لم أستطع السير في كليهما\nوأكون مسافراً واحداً، وقفت طويلاً\nونظرت في أحدهما بعيداً قدر ما استطعت.',
    'Urdu': 'دو راستے ایک زرد جنگل میں الگ ہوئے،\nاور افسوس کہ دونوں پر نہیں چل سکتا تھا\nایک مسافر ہو کر، میں کافی دیر کھڑا رہا\nاور ایک راستے کو دور تک دیکھتا رہا.',
    'Hindi': 'दो राहें एक पीले जंगल में अलग हुईं,\nऔर अफसोस कि दोनों पर नहीं चल सकता था\nएक यात्री होकर, मैं बहुत देर खड़ा रहा\nऔर एक राह को दूर तक देखता रहा.',
    'French': 'Deux chemins divergeaient dans un bois jaune,\nEt désolé de ne pouvoir les emprunter tous deux\nEt n\'être qu\'un voyageur, longtemps je restai debout\nEt regardai l\'un d\'eux aussi loin que je pus.',
    'Spanish': 'Dos caminos se bifurcaban en un bosque amarillo,\nY lamentando no poder recorrer ambos\nSiendo un solo viajero, me detuve largo rato\nY miré uno de ellos tan lejos como pude.',
    'German': 'Zwei Wege trennten sich in einem gelben Wald,\nUnd es tat mir leid, nicht beide gehen zu können\nAls ein Reisender, stand ich lange\nUnd blickte einen hinab, so weit ich konnte.',
    'Chinese (Simplified)': '两条路在一片黄色的树林中分岔，\n遗憾的是我不能同时走两条路\n作为一个旅行者，我久久地站着\n向其中一条路的尽头望去。',
    'Japanese': '黄色い森の中で二つの道が分かれていた、\n両方を歩けないことを残念に思いながら\n一人の旅人として、私は長く立ち止まり\n一方の道をできる限り遠くまで見つめた。',
    'Turkish': 'İki yol sarı bir ormanda ayrıldı,\nVe ikisine de gidemediğim için üzülerek\nTek bir yolcu olarak uzun süre durdum\nVe birini görebildiğim kadar uzağa baktım.',
    'Russian': 'Две дороги расходились в жёлтом лесу,\nИ жаль, что я не мог пройти по обеим\nБудучи одним путником, я долго стоял\nИ смотрел вдаль по одной из них.',
    'Korean': '노란 숲에서 두 갈래 길이 갈라졌다,\n두 길을 다 갈 수 없어 안타까워하며\n한 명의 나그네로서, 오래 서서\n하나의 길을 멀리까지 바라보았다.',
    'Portuguese': 'Dois caminhos divergiam num bosque amarelo,\nE lamentando não poder percorrer ambos\nSendo um só viajante, fiquei parado por muito tempo\nE olhei para um deles tão longe quanto pude.',
    'Italian': 'Due strade divergevano in un bosco giallo,\nE dispiaciuto di non poterle percorrere entrambe\nEssendo un solo viaggiatore, restai a lungo fermo\nE guardai una di esse fin dove potevo.',
    'Persian': 'دو راه در جنگلی زرد از هم جدا شدند،\nو افسوس که نمی‌توانستم هر دو را بروم\nیک مسافر بودم، مدت‌ها ایستادم\nو به یکی تا جایی که می‌توانستم نگاه کردم.',
  },
  'shakespeare': {
    'Arabic': 'هل أقارنك بيوم صيفي؟\nأنت أجمل وأكثر اعتدالاً.\nالرياح العاتية تهز براعم مايو الحبيبة،\nوعقد الصيف قصير الأجل جداً.',
    'Urdu': 'کیا میں تمہارا موازنہ گرمیوں کے دن سے کروں؟\nتم زیادہ خوبصورت اور معتدل ہو۔\nتیز ہوائیں مئی کی پیاری کلیوں کو ہلاتی ہیں،\nاور گرمیوں کا اجارہ بہت مختصر ہے۔',
    'Hindi': 'क्या मैं तुम्हारी तुलना गर्मी के दिन से करूँ?\nतुम अधिक सुंदर और सौम्य हो।\nतेज हवाएँ मई की प्यारी कलियों को हिलाती हैं,\nऔर गर्मी का किराया बहुत छोटा है।',
    'French': 'Dois-je te comparer à un jour d\'été ?\nTu es plus beau et plus tempéré.\nLes vents violents secouent les chers bourgeons de mai,\nEt le bail de l\'été est bien trop court.',
    'Spanish': '¿Te compararé con un día de verano?\nEres más hermoso y más templado.\nLos vientos fuertes sacuden los queridos brotes de mayo,\nY el plazo del verano es demasiado corto.',
    'German': 'Soll ich dich mit einem Sommertag vergleichen?\nDu bist lieblicher und sanfter.\nRauhe Winde schütteln die lieben Knospen des Mai,\nUnd des Sommers Frist ist allzu kurz.',
    'Chinese (Simplified)': '我是否可以将你比作夏日？\n你比夏日更可爱更温和。\n狂风摇动五月的娇蕾，\n夏天的期限太过短暂。',
    'Japanese': '君を夏の日にたとえようか？\n君はもっと美しく、もっと穏やかだ。\n荒い風が五月の愛らしい蕾を揺らし、\n夏の契約はあまりにも短い。',
    'Turkish': 'Seni bir yaz gününe benzeteyim mi?\nSen daha güzel ve daha ılımansın.\nSert rüzgarlar mayısın sevgili tomurcuklarını sallar,\nVe yazın süresi çok kısadır.',
    'Russian': 'Сравню ли я тебя с летним днём?\nТы прекраснее и мягче.\nГрубые ветра трясут нежные бутоны мая,\nИ лето слишком быстро проходит.',
    'Korean': '그대를 여름날에 비유할까?\n그대는 더 사랑스럽고 더 온화하다.\n거센 바람이 오월의 사랑스런 꽃봉오리를 흔들고,\n여름의 기한은 너무나 짧다.',
  },
  'daffodils': {
    'Arabic': 'تجولت وحيداً كسحابة\nتطفو عالياً فوق التلال والوديان،\nعندما رأيت فجأة حشداً،\nمجموعة من النرجس الذهبي.',
    'Urdu': 'میں ایک بادل کی طرح اکیلا گھومتا رہا\nجو پہاڑیوں اور وادیوں پر تیرتا ہے،\nجب اچانک میں نے ایک ہجوم دیکھا،\nسنہری نرگس کے پھولوں کا جھرمٹ۔',
    'Hindi': 'मैं एक बादल की तरह अकेला घूमता रहा\nजो पहाड़ियों और घाटियों पर तैरता है,\nजब अचानक मैंने एक भीड़ देखी,\nसुनहरे डैफ़ोडिल्स का झुंड।',
    'French': 'J\'errais solitaire comme un nuage\nQui flotte au-dessus des collines et des vallées,\nQuand soudain j\'aperçus une foule,\nUne multitude de jonquilles dorées.',
    'Spanish': 'Vagaba solitario como una nube\nQue flota sobre colinas y valles,\nCuando de repente vi una multitud,\nUna hueste de narcisos dorados.',
    'German': 'Ich wanderte einsam wie eine Wolke,\nDie hoch über Hügeln und Tälern schwebt,\nAls ich plötzlich eine Schar erblickte,\nEine Menge goldener Narzissen.',
    'Chinese (Simplified)': '我独自漫游，像一朵云\n飘浮在山丘和谷地之上，\n忽然间我看见一群，\n一大片金色的水仙花。',
    'Japanese': '私は雲のように孤独にさまよった\n丘や谷の上を漂いながら、\nすると突然、群れが目に入った、\n金色の水仙の花の群れが。',
    'Turkish': 'Bir bulut gibi yalnız dolaştım\nTepeler ve vadiler üzerinde süzülerek,\nBirden bir kalabalık gördüm,\nAltın rengi nergislerin topluluğu.',
    'Russian': 'Я бродил одинокий, как облако,\nЧто плывёт над холмами и долинами,\nКогда вдруг я увидел толпу,\nСкопление золотых нарциссов.',
    'Korean': '나는 구름처럼 외로이 떠돌았다\n언덕과 골짜기 위를 떠다니며,\n갑자기 한 무리가 보였다,\n황금빛 수선화의 무리가.',
  },
  'raven': {
    'Arabic': 'ذات منتصف ليل كئيب، بينما كنت أتأمل، ضعيفاً ومتعباً،\nفي كثير من المجلدات الغريبة والعجيبة من المعارف المنسية—\nبينما كنت أغفو، قريباً من النوم، فجأة جاء طرق خفيف.',
    'Urdu': 'ایک اداس آدھی رات، جب میں سوچ رہا تھا، کمزور اور تھکا ہوا،\nبھولی ہوئی معلومات کی بہت سی عجیب کتابوں پر—\nجب میں اونگھ رہا تھا، تقریباً سو رہا تھا، اچانک ایک دستک آئی۔',
    'Hindi': 'एक उदास आधी रात, जब मैं सोच रहा था, कमज़ोर और थका हुआ,\nभूले हुए ज्ञान के कई अजीब ग्रंथों पर—\nजब मैं ऊँघ रहा था, लगभग सो रहा था, अचानक एक दस्तक आई।',
    'French': 'Par une sombre nuit, tandis que je méditais, faible et fatigué,\nSur maint volume curieux et oublié de savoir ancien—\nTandis que je somnolais, presque endormi, soudain un tapotement se fit entendre.',
    'Spanish': 'Una lúgubre medianoche, mientras meditaba, débil y cansado,\nSobre muchos volúmenes curiosos de saber olvidado—\nMientras cabeceaba, casi dormido, de repente se oyó un golpeteo.',
    'German': 'An einem düsteren Mitternacht, als ich nachdachte, schwach und müde,\nÜber manch seltsamen Band vergessenen Wissens—\nWährend ich nickte, fast einschlafend, kam plötzlich ein Klopfen.',
    'Chinese (Simplified)': '在一个阴沉的午夜，当我沉思着，虚弱而疲倦，\n翻阅着许多奇异而好奇的被遗忘的知识卷册——\n当我打着瞌睡，几乎要睡着时，突然传来了敲门声。',
    'Turkish': 'Kasvetli bir gece yarısı, düşünürken, zayıf ve yorgun,\nUnutulmuş bilginin pek çok garip ve tuhaf cildini incelerken—\nUyuklamak üzereyken, neredeyse uyuyorken, aniden bir vurma sesi geldi.',
    'Russian': 'Однажды в тоскливую полночь, когда я размышлял, слабый и усталый,\nНад многими странными томами забытых знаний—\nКогда я дремал, почти засыпая, вдруг раздался стук.',
    'Korean': '음울한 한밤중, 내가 약하고 지쳐 곰곰이 생각하고 있을 때,\n잊혀진 학문의 기이하고 신기한 많은 책들을 넘기며—\n꾸벅꾸벅 졸다가, 거의 잠들 무렵, 갑자기 두드리는 소리가 들렸다.',
  }
};

// ── Built-in poem knowledge base ──────────────────────────────────────
interface PoemEntry {
  id: string; // Used to look up translations
  keywords: string[];
  poet: PoetryAnalysis['poet'];
  themes: string[];
  literaryDevices: PoetryAnalysis['literaryDevices'];
  explanation: string;
  sources: string[];
}

const KNOWN_POEMS: PoemEntry[] = [
  {
    id: 'twinkle',
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
    id: 'road',
    keywords: ['road not taken', 'diverged', 'yellow wood', 'frost', 'two roads', 'traveled'],
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
    id: 'shakespeare',
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
    id: 'daffodils',
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
    id: 'raven',
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

function getTranslation(poemId: string, targetLanguage: string): string | undefined {
  const poemTranslations = TRANSLATIONS[poemId];
  if (!poemTranslations) return undefined;
  return poemTranslations[targetLanguage] || undefined;
}

function extractWords(text: string): string[] {
  return text
    .replace(/[^\w\s'-]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3)
    .map(w => w.toLowerCase());
}

function detectLanguage(text: string): string {
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
  
  const hasRhyme = lines.length >= 2;
  
  const commonWords = new Set(['that', 'this', 'with', 'from', 'have', 'they', 'been', 'were', 'what', 'when', 'your', 'will', 'each', 'make', 'like', 'long', 'look', 'many', 'some', 'than', 'them', 'then', 'would', 'about', 'could', 'into', 'more', 'other', 'their', 'there', 'these', 'which']);
  const interestingWords = uniqueWords
    .filter(w => w.length > 5 && !commonWords.has(w))
    .slice(0, 8);

  const wordDictionary = interestingWords.map(word => ({
    word: word.charAt(0).toUpperCase() + word.slice(1),
    meaning: `A significant word choice that contributes to the poem's tone and meaning.`,
    pronunciation: `/${word}/`
  }));

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

  let formDescription = 'free verse';
  if (lines.length === 14) formDescription = 'sonnet form (14 lines)';
  else if (lines.length === 3) formDescription = 'haiku form (3 lines)';
  else if (lines.length <= 4) formDescription = 'a concise lyric form';
  else if (lines.length % 4 === 0) formDescription = `${lines.length / 4}-stanza form with quatrains`;

  return {
    originalPoem: poem,
    // No translation placeholder — only show if we actually have one
    translation: undefined,
    explanation: `This ${lines.length}-line poem written in ${formDescription} explores themes of ${themes.slice(0, 3).join(', ').toLowerCase()}. The poet employs careful word choice and structural elements to convey their message. The opening line "${lines[0]?.trim() || 'the poem'}" sets the tone for the entire piece, establishing the emotional landscape that unfolds throughout. The poem's structure and rhythm work together to create a cohesive artistic experience that resonates with readers on both intellectual and emotional levels. Each line builds upon the previous, creating layers of meaning that reward careful close reading.`,
    wordDictionary,
    poet: {
      name: 'Unknown Poet',
      era: 'To be determined',
      bio: 'The poet of this work could not be automatically identified. The analysis is based on the text structure and content of the poem itself.',
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
  const knownMatch = findMatchingPoem(poem);
  
  if (knownMatch) {
    // Get real translation if available
    const translation = targetLanguage !== 'English' 
      ? getTranslation(knownMatch.id, targetLanguage) 
      : undefined;

    return {
      originalPoem: poem,
      translation,
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

  return generateGenericAnalysis(poem, targetLanguage);
}
