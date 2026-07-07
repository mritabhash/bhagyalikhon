import type { HandElement } from './types'

// ─────────────────────────────────────────────────────────────
// NUMBER LORE — reflective, traditional interpretations (1–9, 11, 22, 33)
// ─────────────────────────────────────────────────────────────
export interface NumberLore {
  title: string
  keyword: string
  essence: string
  strengths: string[]
  shadows: string[]
  love: string
  work: string
  lesson: string
  year: string
}

export const NUMBER_LORE: Record<number, NumberLore> = {
  1: {
    title: 'The Initiator',
    keyword: 'independence',
    essence:
      'a current of self-direction — the wish to begin things, to stand on your own feet, and to follow an inner compass rather than borrowed maps',
    strengths: ['originality', 'courage to start', 'quiet determination', 'leadership that leads by doing'],
    shadows: ['a tendency to isolate', 'impatience with slower rhythms', 'difficulty asking for help'],
    love: 'This pattern traditionally points toward someone who loves loyally but needs room to breathe, and who respects a partner with a life of their own.',
    work: 'It suggests work where you can shape direction rather than only follow it — founding, pioneering, or carrying a vision others have not yet seen.',
    lesson: 'The old lesson here is to lead without shutting others out, and to let strength include the strength of leaning on people.',
    year: 'a year of beginnings and planted seeds — new doors, fresh identity, and the courage to take the first step alone if needed',
  },
  2: {
    title: 'The Peacemaker',
    keyword: 'harmony',
    essence:
      'a sensitivity to atmosphere and to the space between people — a gift for listening, pairing, and holding two sides in gentle balance',
    strengths: ['diplomacy', 'patience', 'emotional attunement', 'the quiet power of cooperation'],
    shadows: ['self-erasure to keep the peace', 'over-sensitivity to criticism', 'hesitation when a decision is yours alone'],
    love: 'This pattern often suggests deep devotion and a wish to be truly met — someone who gives generously, and who must learn to receive with the same openness.',
    work: 'It points toward roles of partnership, mediation, care, and craft — work done beautifully beside others rather than in solitary command.',
    lesson: 'The reflective lesson is to keep your own voice inside the harmony, so that peace is not bought with silence.',
    year: 'a slower, relational year — patience, quiet growth, partnerships ripening, and small things attended to with care',
  },
  3: {
    title: 'The Expressive',
    keyword: 'expression',
    essence:
      'a bright, communicative energy — imagination that wants a voice, and a natural warmth that lifts the rooms you enter',
    strengths: ['creativity', 'optimism', 'wit and warmth', 'the ability to inspire through words and images'],
    shadows: ['scattered focus', 'avoiding depth through lightness', 'moods that swing with the weather of feeling'],
    love: 'This traditionally suggests an affectionate, playful heart that needs conversation and delight, and that can wither in coldness or heavy silence.',
    work: 'It favours creative and communicative fields — writing, design, teaching, performance — anywhere feeling can be shaped into form.',
    lesson: 'The old teaching is to gather the scattered light into one steady flame, choosing depth without losing joy.',
    year: 'a year of expression and social bloom — creativity, visibility, friendships, and the return of playfulness',
  },
  4: {
    title: 'The Builder',
    keyword: 'foundation',
    essence:
      'a steady, grounded force — the patience to build things that last, and a respect for order, honesty, and honest work',
    strengths: ['discipline', 'reliability', 'practical wisdom', 'the endurance to finish what others abandon'],
    shadows: ['rigidity', 'over-work as identity', 'resistance to change even when change is kind'],
    love: 'This pattern points toward steadfast, dependable love — commitment shown through presence and provision more than through grand words.',
    work: 'It suits structure, systems, craftsmanship, and stewardship — work where care compounds over years into something solid.',
    lesson: 'The reflective lesson is to let the walls you build have windows, and to trust that rest is also a kind of work.',
    year: 'a year of foundations — effort, organisation, and the patient laying of stones you will stand on later',
  },
  5: {
    title: 'The Seeker',
    keyword: 'freedom',
    essence:
      'a restless, curious spirit — a love of movement, variety, and experience, and a nose for the wider world',
    strengths: ['adaptability', 'magnetism', 'quick learning', 'the courage to change course'],
    shadows: ['restlessness', 'difficulty committing', 'scattering energy across too many doors'],
    love: 'This traditionally suggests a passionate, freedom-loving heart that needs a partner who is an adventure, not a cage.',
    work: 'It favours variety, travel, communication, and change — work that keeps moving and rewards versatility.',
    lesson: 'The old lesson is that true freedom is chosen, not fled toward — depth can be its own adventure.',
    year: 'a year of change and momentum — new experiences, movement, and unexpected turns to say yes to wisely',
  },
}

Object.assign(NUMBER_LORE, {
  6: {
    title: 'The Nurturer',
    keyword: 'responsibility',
    essence:
      'a caring, protective warmth — a pull toward home, beauty, and the wellbeing of others, and a strong sense of duty',
    strengths: ['devotion', 'a healing presence', 'aesthetic sense', 'responsibility carried with grace'],
    shadows: ['over-giving', 'carrying what is not yours to carry', 'perfectionism about home and image'],
    love: 'This pattern points toward deeply committed, family-minded love — someone who protects and provides, and who must remember to be cared for too.',
    work: 'It suits healing, teaching, design, counsel, and service — work that tends and beautifies.',
    lesson: 'The reflective lesson is to give from fullness rather than obligation, and to let others hold you sometimes.',
    year: 'a year of home and heart — responsibility, relationships, family matters, and beauty made at home',
  },
  7: {
    title: 'The Contemplative',
    keyword: 'insight',
    essence:
      'an inward, searching mind — a hunger to understand what lies beneath appearances, and a need for solitude to hear yourself think',
    strengths: ['depth', 'analysis', 'intuition', 'a rare capacity for focused study'],
    shadows: ['withdrawal', 'over-thinking', 'trust that comes slowly and guardedly'],
    love: 'This traditionally suggests a private, discerning heart that loves few but deeply, and that needs a partner who honours its inner rooms.',
    work: 'It favours research, spirituality, analysis, and craft mastered in quiet — work that rewards patience and depth.',
    lesson: 'The old teaching is to let understanding become connection, so that wisdom does not harden into distance.',
    year: 'a reflective, inward year — study, rest, spiritual deepening, and answers that arrive in stillness',
  },
  8: {
    title: 'The Steward of Power',
    keyword: 'mastery',
    essence:
      'an ambitious, capable force — a feel for value, structure, and consequence, and the will to build something substantial',
    strengths: ['executive ability', 'resilience', 'vision for the long game', 'the strength to recover from setbacks'],
    shadows: ['work that eclipses life', 'control', 'measuring worth by outcome alone'],
    love: 'This pattern points toward protective, generous love expressed through providing and building a shared future, needing softness to balance its drive.',
    work: 'It suits leadership, enterprise, finance, and any arena where authority and endurance are rewarded.',
    lesson: 'The reflective lesson is that true power serves, and that strength is safest when it is kind.',
    year: 'a year of harvest and authority — effort rewarded, responsibility increased, and material matters coming to a head',
  },
  9: {
    title: 'The Humanitarian',
    keyword: 'compassion',
    essence:
      'a wide, generous heart — a feeling for the whole rather than only the self, and an old-soul sense that life is meant to be given back',
    strengths: ['compassion', 'artistry', 'breadth of understanding', 'the capacity to let go and forgive'],
    shadows: ['martyrdom', 'difficulty with endings', 'carrying an unspoken sorrow for the world'],
    love: 'This traditionally suggests a tender, idealistic heart that loves widely and must learn to be personal, present, and receiving.',
    work: 'It favours the arts, healing, teaching, and service to something larger — work that uplifts many.',
    lesson: 'The old lesson is completion — learning to release, to forgive, and to let each chapter close so the next can open.',
    year: 'a year of completion and release — endings honoured, clutter cleared, and space made for what comes next',
  },
})

Object.assign(NUMBER_LORE, {
  11: {
    title: 'The Illuminator (Master Number)',
    keyword: 'inspiration',
    essence:
      'the sensitivity of 2 raised to a higher charge — intuition, vision, and a luminous awareness that can inspire others or overwhelm the self',
    strengths: ['spiritual insight', 'inspiration', 'idealism', 'a channel for something larger than the ego'],
    shadows: ['anxiety and nervous tension', 'self-doubt beneath the gift', 'dreams that outrun the practical'],
    love: 'This master pattern suggests a soul that seeks meeting on a deep, almost telepathic level, and that must ground its intensity in ordinary tenderness.',
    work: 'It favours inspiration, teaching, the arts, and spiritual or visionary work — carrying light for others to see by.',
    lesson: 'The reflective teaching is to steady the current — to turn sensitivity into service without being consumed by it.',
    year: 'a heightened, intuitive year — insight and inspiration asking to be grounded gently',
  },
  22: {
    title: 'The Master Builder (Master Number)',
    keyword: 'manifestation',
    essence:
      'the discipline of 4 fused with the vision of 11 — the rare capacity to turn a large dream into a lasting, tangible structure',
    strengths: ['vision made practical', 'endurance', 'leadership of scale', 'the power to build for many'],
    shadows: ['immense inner pressure', 'fear of one’s own scale', 'burnout when vision meets resistance'],
    love: 'This master pattern suggests devoted, purpose-driven love — a partnership that can also be a shared building project across a lifetime.',
    work: 'It favours large undertakings — enterprises, institutions, works that outlast the maker and serve the many.',
    lesson: 'The old teaching is to honour the scale without being crushed by it, building one honest stone at a time.',
    year: 'a year of large foundations — the chance to build something lasting if effort is met with patience',
  },
  33: {
    title: 'The Master Teacher (Master Number)',
    keyword: 'devotion',
    essence:
      'the nurture of 6 lifted to a devotional key — a heart oriented toward healing and uplifting others through love made selfless',
    strengths: ['compassionate teaching', 'healing presence', 'selfless devotion', 'the gift of raising others'],
    shadows: ['self-sacrifice beyond wisdom', 'carrying too much for too many', 'losing the self inside the service'],
    love: 'This rare pattern suggests love as devotion and care, needing a partner who helps it stay whole while it gives.',
    work: 'It favours teaching, healing, and guidance — work where love becomes a practical force in others’ lives.',
    lesson: 'The reflective teaching is to serve from wholeness, remembering that the teacher must also be tended.',
    year: 'a devotional year — care, teaching, and healing offered, with attention paid to your own wellbeing',
  },
})

export function loreFor(n: number): NumberLore {
  return NUMBER_LORE[n] ?? NUMBER_LORE[9]
}

export const HAND_ELEMENTS: Record<
  HandElement,
  { title: string; essence: string; traits: string }
> = {
  earth: {
    title: 'an Earth hand',
    essence: 'a square palm with shorter fingers, traditionally read as grounded, practical, and steady',
    traits:
      'This points toward a temperament that trusts what can be touched and tested — reliable, hands-on, and most at ease when life has structure, rhythm, and honest work to lean into.',
  },
  air: {
    title: 'an Air hand',
    essence: 'a square palm with longer fingers, traditionally read as mental, communicative, and curious',
    traits:
      'This suggests a mind that lives partly in ideas and language — quick, sociable, and analytical, needing conversation and variety, and sometimes needing to return from the head into the body.',
  },
  fire: {
    title: 'a Fire hand',
    essence: 'a rectangular palm with shorter fingers, traditionally read as energetic, instinctive, and expressive',
    traits:
      'This points toward warmth, drive, and spontaneity — someone who acts on intuition and enthusiasm, who inspires others, and who does best when passion is given a real channel.',
  },
  water: {
    title: 'a Water hand',
    essence: 'a long palm with long fingers, traditionally read as sensitive, imaginative, and emotionally deep',
    traits:
      'This suggests a receptive, feeling nature — intuitive, creative, and attuned to atmosphere, needing gentleness and space, and flowering where it feels safe.',
  },
}

// Palm line + feature fragments keyed by indicator option
export const PALM_FRAGMENTS: Record<string, string> = {
  'lifeDepth:faint':
    'A finer, lighter Life Line traditionally speaks of a more sensitive vitality — energy that is real but wants pacing, rest, and gentleness rather than relentless push.',
  'lifeDepth:medium':
    'A clearly-drawn Life Line of moderate depth suggests a balanced vitality — resilience that renews itself, and a constitution that can meet effort and recovery in turn.',
  'lifeDepth:deep':
    'A deep, well-etched Life Line traditionally points toward strong physical vitality and stamina — a robust engine that thrives on activity and can carry others through hard seasons.',
  'lifeCurve:narrow':
    'Curving close to the thumb, it may suggest a more contained, self-protective energy — warmth offered carefully rather than spilled freely.',
  'lifeCurve:balanced':
    'Sweeping in a measured arc, it suggests a healthy balance between caution and openness — someone who engages with life without losing their footing.',
  'lifeCurve:wide':
    'Swinging generously across the palm, it traditionally points toward an expansive, adventurous appetite for life — warmth, travel, and a wide embrace of experience.',
  'headStyle:straight':
    'A straight Head Line suggests a logical, linear, practical mind — clear reasoning, directness, and a preference for facts over embellishment.',
  'headStyle:curved':
    'A gently curved Head Line points toward a flexible, creative intelligence — a mind that moves between logic and imagination and enjoys making connections.',
  'headStyle:sloping':
    'A Head Line sloping toward the Moon suggests a strongly imaginative, intuitive mind — someone who thinks in images, possibilities, and inner pictures.',
  'headStyle:forked':
    'A forked ending — the writer’s fork — traditionally marks a mind that holds two views at once, balancing practicality with imagination and seeing many sides.',
  'heartStyle:straight':
    'A straighter Heart Line suggests feelings held with some reserve — loyalty that is real but private, and love shown through steadiness more than open display.',
  'heartStyle:curved':
    'A curving Heart Line points toward warm, expressive emotion — someone who feels openly, shows affection readily, and leads with the heart.',
  'heartStyle:long':
    'A long Heart Line reaching across the palm suggests an idealistic, giving heart — deep devotion and high hopes for love and closeness.',
  'heartStyle:short':
    'A shorter Heart Line may point toward a more self-contained emotional world — intensity focused on a chosen few rather than spread widely.',
  'heartStyle:chained':
    'A chained or textured Heart Line traditionally speaks of a sensitive, much-feeling heart — one that has known tenderness and hurt, and loves with its whole nervous system.',
  'fate:absent':
    'A faint or absent Fate Line is not a lack — it often marks the self-made path, a life shaped by your own choices rather than a single fixed track laid down early.',
  'fate:faint':
    'A lightly-marked Fate Line suggests a direction still forming — a path found by walking it, with freedom to redraw the route as you grow.',
  'fate:clear':
    'A clear Fate Line traditionally points toward a strong sense of direction and responsibility — a life with a discernible thread of purpose running through it.',
  'fate:broken':
    'Breaks or shifts in the Fate Line often mark turning points — changes of course that, in a reflective reading, speak of reinvention rather than failure.',
  'sun:absent':
    'A quiet Sun Line suggests fulfilment sought inwardly rather than through visibility — worth measured by your own lights more than public recognition.',
  'sun:faint':
    'A faint Sun Line points toward a creative or expressive gift that is present and can be developed — a warmth that grows brighter as you honour it.',
  'sun:clear':
    'A clear Sun Line traditionally speaks of creativity, charisma, and a capacity for recognition — a natural glow that others notice and remember.',
  'mercury:absent':
    'A quiet Mercury Line suggests communication that is steady and unshowy — presence felt more than performed.',
  'mercury:faint':
    'A faint Mercury Line points toward developing gifts of communication, business sense, or healing instinct — talents that reward practice.',
  'mercury:clear':
    'A clear Mercury Line traditionally marks quick wit, persuasive speech, and a shrewd feel for people and exchange — the communicator’s signature.',
  'thumb:flexible':
    'A flexible thumb suggests adaptability and generosity — a will that bends to keep the peace, warm and accommodating, sometimes at the cost of holding a hard line.',
  'thumb:balanced':
    'A balanced thumb points toward measured willpower — the ability to stand firm or yield as wisdom requires, neither rigid nor easily moved.',
  'thumb:firm':
    'A firm, less-yielding thumb traditionally marks strong will and determination — someone who holds their ground, keeps their word, and can be immovable once decided.',
  'fingerLength:short':
    'Shorter fingers suggest a quick, big-picture instinct — someone who grasps the whole fast and prefers action to lingering over detail.',
  'fingerLength:balanced':
    'Balanced finger length suggests an even temper between the broad view and the fine detail — patience and speed held in workable proportion.',
  'fingerLength:long':
    'Longer fingers point toward a love of detail, patience, and craft — a mind that enjoys the fine grain of things and does careful, considered work.',
}

// Mount interpretations
export const MOUNTS: {
  key: string
  name: string
  ruler: string
  high: string
  balanced: string
  low: string
}[] = [
  {
    key: 'venus',
    name: 'Mount of Venus',
    ruler: 'love, vitality, and warmth',
    high: 'A full Mount of Venus traditionally speaks of strong warmth, sensuality, and love of life — generous affection and physical vitality.',
    balanced: 'A balanced Mount of Venus suggests healthy warmth and affection in good proportion — capable of love without being ruled by appetite.',
    low: 'A softer Mount of Venus may point toward affection that is selective and gentle — warmth offered to a trusted few rather than broadcast widely.',
  },
  {
    key: 'jupiter',
    name: 'Mount of Jupiter',
    ruler: 'ambition, confidence, and leadership',
    high: 'A prominent Mount of Jupiter marks natural confidence, ambition, and leadership — the wish to rise, guide, and expand.',
    balanced: 'A balanced Mount of Jupiter suggests healthy self-belief — ambition that neither shrinks nor overreaches.',
    low: 'A quieter Mount of Jupiter may point toward humility and a dislike of the spotlight — leadership offered through service more than command.',
  },
  {
    key: 'saturn',
    name: 'Mount of Saturn',
    ruler: 'discipline, wisdom, and responsibility',
    high: 'A strong Mount of Saturn speaks of seriousness, discipline, and a philosophical bent — a respect for time, study, and consequence.',
    balanced: 'A balanced Mount of Saturn suggests responsibility carried without heaviness — wisdom that keeps its sense of humour.',
    low: 'A lighter Mount of Saturn may point toward a preference for lightness over gravity — someone who resists being weighed down.',
  },
  {
    key: 'apollo',
    name: 'Mount of Apollo (Sun)',
    ruler: 'creativity, joy, and recognition',
    high: 'A strong Mount of Apollo marks creativity, charisma, and a love of beauty — a natural glow and an eye for art.',
    balanced: 'A balanced Mount of Apollo suggests creative warmth in proportion — expression enjoyed without dependence on applause.',
    low: 'A quieter Mount of Apollo may point toward creativity kept private — beauty made for its own sake rather than for an audience.',
  },
  {
    key: 'mercury',
    name: 'Mount of Mercury',
    ruler: 'communication, wit, and exchange',
    high: 'A strong Mount of Mercury speaks of eloquence, quick wit, and a shrewd feel for people, business, and healing.',
    balanced: 'A balanced Mount of Mercury suggests good communication and social intelligence in easy proportion.',
    low: 'A quieter Mount of Mercury may point toward communication that is understated — sincerity over showmanship.',
  },
  {
    key: 'mars',
    name: 'Mounts of Mars',
    ruler: 'courage, endurance, and composure',
    high: 'Strong Mars mounts traditionally mark courage, resilience, and the ability to hold steady under pressure — a fighter’s calm.',
    balanced: 'Balanced Mars mounts suggest measured courage — the capacity to assert or endure as each moment asks.',
    low: 'Softer Mars mounts may point toward a peace-preferring nature that must sometimes learn to hold its ground.',
  },
  {
    key: 'moon',
    name: 'Mount of Moon (Luna)',
    ruler: 'imagination, intuition, and feeling',
    high: 'A prominent Mount of Moon speaks of rich imagination, intuition, and emotional depth — a dreamer’s signature, and a love of the far and the mysterious.',
    balanced: 'A balanced Mount of Moon suggests imagination in healthy proportion — intuitive but grounded, feeling without being flooded.',
    low: 'A quieter Mount of Moon may point toward a practical bent that trusts the tangible over the dreamed.',
  },
  {
    key: 'neptune',
    name: 'Neptune area',
    ruler: 'the bridge between conscious and unconscious',
    high: 'A developed Neptune area (at the base, between Venus and Moon) traditionally links the practical and the intuitive — a natural presence and a feel for the unseen currents in a room.',
    balanced: 'A balanced Neptune area suggests instinct and reason meeting comfortably — grounded intuition.',
    low: 'A quieter Neptune area may point toward trust placed firmly in the visible and the proven.',
  },
]
