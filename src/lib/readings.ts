import type {
  ReadingInput, ReadingSection, HandElement, NumerologyChart, FullReading, PalmIndicators,
} from './types'
import { loreFor, HAND_ELEMENTS, PALM_FRAGMENTS, MOUNTS } from './content'
import { buildChart } from './numerology'
import { firstName } from './utils'

export function handElement(shape: PalmIndicators['shape'], fingers: PalmIndicators['fingerLength']): HandElement {
  const map: Record<string, HandElement> = {
    'square:short': 'earth', 'square:balanced': 'earth', 'square:long': 'air',
    'rectangular:short': 'fire', 'rectangular:balanced': 'fire', 'rectangular:long': 'water',
    'long:short': 'fire', 'long:balanced': 'water', 'long:long': 'water',
    'broad:short': 'earth', 'broad:balanced': 'fire', 'broad:long': 'air',
  }
  return map[`${shape}:${fingers}`] ?? 'earth'
}

function pf(palm: PalmIndicators, key: keyof PalmIndicators): string {
  return PALM_FRAGMENTS[`${key}:${palm[key]}`] ?? ''
}
function mountText(level: 'high' | 'balanced' | 'low', key: string): string {
  const m = MOUNTS.find((x) => x.key === key)
  return m ? m[level] : ''
}
function venusLevel(v: PalmIndicators['venus']): 'high' | 'balanced' | 'low' {
  return v === 'full' ? 'high' : v === 'soft' ? 'low' : 'balanced'
}
function mountLevel(v: 'low' | 'balanced' | 'prominent'): 'high' | 'balanced' | 'low' {
  return v === 'prominent' ? 'high' : v === 'low' ? 'low' : 'balanced'
}

export function generatePalmReading(input: ReadingInput): ReadingSection[] {
  const name = firstName(input.fullName)
  const palm = input.palm
  const el = handElement(palm.shape, palm.fingerLength)
  const element = HAND_ELEMENTS[el]
  const handLabel = input.hand === 'both' ? 'both hands' : `the ${input.hand} hand`
  const s: ReadingSection[] = []

  s.push({
    id: 'impression',
    title: 'Overall Palm Impression',
    kicker: 'First reading of the hand',
    paragraphs: [
      `We begin, ${name}, with the hand as a whole — before any single line is traced. Read from ${handLabel}, the first impression is of ${element.title}: ${element.essence}. In traditional palmistry the shape of the palm and the length of the fingers are read together as the temperament of the whole person — the vessel every line then colours.`,
      `${element.traits} This is the ground note beneath everything that follows: the natural key your character is written in.`,
      `The balance of your hand suggests a person whose outward manner and inner life are woven from the same thread, even when the two do not always agree. Hold this whole-hand impression lightly as we move into the individual lines, each of which refines and occasionally complicates the picture.`,
    ],
  })

  s.push({
    id: 'handtype',
    title: 'Hand Type & Elemental Nature',
    kicker: element.title.replace(/^an? /, ''),
    paragraphs: [
      `Your hand reads most strongly as ${element.title} — ${element.essence}. ${element.traits}`,
      el === 'earth'
        ? `Earth-handed people are the steady centre others gather around. You are likely happiest when your days have shape and your work has weight you can feel. The reflective caution is only this: make room for the unplanned, so steadiness does not quietly become a wall.`
        : el === 'air'
          ? `Air-handed people live close to language and idea. You likely think by talking, connect by conversing, and grow restless without stimulation. The gentle reminder is to return, now and then, from the head into the body and the present moment.`
          : el === 'fire'
            ? `Fire-handed people move on instinct and warmth. You likely act first and reflect after, lead by enthusiasm, and light a room without trying. The quiet counsel is to give your fire a hearth — a channel — so its heat builds rather than scatters.`
            : `Water-handed people feel their way through life. You likely absorb the mood of a room before a word is spoken, create from feeling, and need gentleness to flourish. The reflective note is to build small boundaries, so sensitivity becomes a gift you carry rather than a tide that carries you.`,
    ],
  })

  s.push({
    id: 'lifeline',
    title: 'The Life Line',
    kicker: 'Vitality · grounding · rhythm',
    paragraphs: [
      `The Life Line curves around the base of the thumb, and despite its name it speaks less of length of years than of vitality, grounding, and the rhythm at which you meet the world. ${pf(palm, 'lifeDepth')}`,
      `${pf(palm, 'lifeCurve')} Taken together, these traditionally describe how you recover, where you draw your energy, and how you carry family and roots within you.`,
      `Under pressure this suggests a person who ${palm.lifeDepth === 'deep' ? 'steadies and endures, drawing on real reserves and often becoming the calm others borrow' : palm.lifeDepth === 'faint' ? 'feels the strain early and does best by pacing effort, resting deliberately, and protecting their energy rather than spending it all at once' : 'meets difficulty in waves — able to push hard, but needing genuine recovery afterwards to return to themselves'}. Your comfort zone is real and worth honouring; it is the place you return to in order to go out again.`,
    ],
  })

  s.push({
    id: 'headline',
    title: 'The Head Line',
    kicker: 'Thinking · learning · decisions',
    paragraphs: [
      `The Head Line runs across the centre of the palm and describes how your mind moves — how you learn, decide, focus, and solve. ${pf(palm, 'headStyle')}`,
      palm.headStyle === 'straight'
        ? `You likely learn best through clear structure and worked examples, decide by weighing evidence, and trust what can be demonstrated. Your mental strength is clarity; your growth edge is to leave room for the intuitive leap that logic alone cannot reach.`
        : palm.headStyle === 'sloping'
          ? `You likely learn through image, story, and association, decide partly by feel, and think in possibilities. Your strength is imagination; your growth edge is to anchor those flights in a few practical checkpoints so good ideas actually land.`
          : palm.headStyle === 'forked'
            ? `You likely see several sides at once and can argue any of them — a genuinely balanced mind. Your strength is perspective; your growth edge is decisiveness, since seeing every angle can quietly delay the choice.`
            : `You likely blend logic and imagination fluidly, learning by connecting ideas across domains. Your strength is versatility; your growth edge is depth — following one thread all the way down rather than gathering many halfway.`,
    ],
  })

  s.push({
    id: 'heartline',
    title: 'The Heart Line',
    kicker: 'Feeling · attachment · love',
    paragraphs: [
      `The Heart Line, uppermost of the major lines, describes your emotional weather — how you love, attach, and show or withhold feeling. ${pf(palm, 'heartStyle')}`,
      `In relationship this points toward ${palm.heartStyle === 'straight' || palm.heartStyle === 'short' ? 'loyalty expressed through steadiness and action rather than open display — a heart that shows love by turning up, not by performing it' : palm.heartStyle === 'chained' ? 'deep sensitivity and a heart that feels everything keenly — capable of great tenderness, and needing a gentle, trustworthy climate to open fully' : 'warmth offered readily and affection that is easy to see — an expressive heart that gives openly and hopes to be met in kind'}.`,
      `Your emotional boundaries and your love language both flow from this line. Knowing its shape is less about labelling yourself than about recognising the climate in which your heart does its best growing.`,
    ],
  })

  s.push({
    id: 'fateline',
    title: 'The Fate Line',
    kicker: 'Direction · responsibility · path',
    paragraphs: [
      `The Fate Line rises up the centre of the palm toward the fingers, and traditionally describes your relationship with direction, responsibility, and the sense of a thread running through your working life. ${pf(palm, 'fate')}`,
      palm.fate === 'clear'
        ? `A defined path like this often belongs to people who feel called toward something and organise their lives around it. The reflective caution is to check, now and then, that the path is still yours and not merely one you were handed.`
        : palm.fate === 'broken'
          ? `Reinvention is written into your working life. In a reflective reading the breaks are not misfortune but pivots — the several distinct chapters of a life that refused to stay in one shape.`
          : `Yours is largely the self-directed path — less a track laid down for you than a road you make by walking. This asks more of your own choices, and rewards you with unusual freedom to redraw your direction as you grow.`,
    ],
  })

  s.push({
    id: 'sunline',
    title: 'The Sun Line',
    kicker: 'Creativity · recognition · confidence',
    paragraphs: [
      `The Sun Line, when present, rises toward the ring finger and speaks of creativity, confidence, and your relationship with being seen. ${pf(palm, 'sun')}`,
      palm.sun === 'clear'
        ? `A bright Sun Line suggests a natural glow — a capacity to be noticed and remembered for what you make or how you carry yourself. The gentle counsel is to let recognition be a welcome guest rather than the host, so your worth rests on your own foundations.`
        : palm.sun === 'absent'
          ? `A quiet Sun Line is not the absence of gifts, only of the need for applause. You may find your deepest satisfaction in work done for its own sake, and in a life measured by private lights rather than public ones.`
          : `A developing Sun Line suggests a creative warmth that grows brighter the more you honour it. Treat your expressive gifts as worth practising, and this line tends to strengthen across a life.`,
    ],
  })

  s.push({
    id: 'mercuryline',
    title: 'The Mercury Line',
    kicker: 'Communication · instinct · exchange',
    paragraphs: [
      `The Mercury Line relates to communication, business instinct, social intelligence, and — in the old readings, without any medical claim — a general awareness of one's own wellbeing. ${pf(palm, 'mercury')}`,
      palm.mercury === 'clear'
        ? `This is the communicator's signature — a quick read of people and situations, and a persuasive, adaptable way with words. Used well it is a gift for connection; the only caution is sincerity, so cleverness always serves truth.`
        : `Your communication tends toward the sincere and unshowy — presence felt more than performed. This is its own quiet strength: people trust what is not trying to sell them, and steadiness persuades in the long run where flash does not.`,
    ],
  })

  s.push({
    id: 'mounts',
    title: 'The Mounts of the Palm',
    kicker: 'The fleshy rises beneath the fingers',
    paragraphs: [
      `Beneath the fingers and around the palm sit the mounts — soft rises named for the old planets, each a reservoir of a particular quality. Read together they show where your energy naturally pools. In your hand, the pattern reads as follows.`,
    ],
    bullets: [
      { heading: 'Venus', text: mountText(venusLevel(palm.venus), 'venus') },
      { heading: 'Jupiter', text: mountText(mountLevel(palm.jupiter), 'jupiter') },
      { heading: 'Saturn', text: mountText('balanced', 'saturn') },
      { heading: 'Apollo', text: mountText('balanced', 'apollo') },
      { heading: 'Mercury', text: mountText(palm.mercury === 'clear' ? 'high' : palm.mercury === 'absent' ? 'low' : 'balanced', 'mercury') },
      { heading: 'Mars', text: mountText('balanced', 'mars') },
      { heading: 'Moon', text: mountText(mountLevel(palm.moon), 'moon') },
      { heading: 'Neptune', text: mountText('balanced', 'neptune') },
    ],
  })

  s.push({
    id: 'fingers',
    title: 'Fingers & Thumb',
    kicker: 'Will · discipline · social nature',
    paragraphs: [
      `The fingers and thumb refine everything the palm has said. ${pf(palm, 'fingerLength')} ${pf(palm, 'thumb')}`,
      `The thumb is traditionally read as the seat of will. Yours suggests ${palm.thumb === 'firm' ? 'a strong, self-governing will — once you decide, you hold, and your word tends to be good' : palm.thumb === 'flexible' ? 'an adaptable, generous will — you bend to keep harmony, which serves relationships but sometimes asks you to guard against being over-swayed' : 'a balanced will — able to stand firm or yield as the moment truly requires'}. Finger spacing and set add the social note: whether you meet the world open-handed or hold a little back until trust is earned.`,
      `Together, fingers and thumb speak to independence, discipline, and the way you handle detail. They are the fine print of the hand — the place where willpower and craft are written.`,
    ],
  })

  s.push({
    id: 'palm-strengths',
    title: 'Strengths Written in the Hand',
    kicker: 'What your hand does naturally well',
    paragraphs: [
      `Gathering the threads, ${name}, several strengths repeat across your hand — the qualities it returns to when you are most yourself.`,
    ],
    bullets: [
      { heading: el === 'earth' ? 'Steadiness' : el === 'air' ? 'Clarity of mind' : el === 'fire' ? 'Warmth & drive' : 'Emotional depth', text: element.traits },
      { heading: palm.thumb === 'firm' ? 'Strong will' : palm.thumb === 'flexible' ? 'Adaptability' : 'Balanced resolve', text: `Your thumb suggests ${palm.thumb === 'firm' ? 'a will that holds under pressure and keeps its promises' : palm.thumb === 'flexible' ? 'a generous flexibility that keeps relationships warm and doors open' : 'the rarer gift of knowing when to bend and when to stand'}.` },
      { heading: 'A working mind', text: `Your ${palm.headStyle} Head Line gives you ${palm.headStyle === 'straight' ? 'clear, dependable reasoning' : palm.headStyle === 'sloping' ? 'a genuinely imaginative intelligence' : palm.headStyle === 'forked' ? 'the ability to hold several truths at once' : 'a flexible, connecting intelligence'} — a real asset in work and life.` },
      { heading: 'Capacity to love', text: `Your Heart Line points to ${palm.heartStyle === 'chained' || palm.heartStyle === 'long' ? 'a deep, devoted emotional nature' : palm.heartStyle === 'curved' ? 'open, expressive warmth' : 'steady, loyal affection'} — the ground of lasting bonds.` },
    ],
  })

  s.push({
    id: 'palm-challenges',
    title: 'Challenges & Blind Spots',
    kicker: 'Held kindly, as growth edges',
    paragraphs: [
      `No hand is without its tensions, and naming them gently is part of an honest reading. For you, the growth edges gather around a few familiar places.`,
      el === 'earth'
        ? `There can be a resistance to change even when change would be kind — a comfort in the known that occasionally hardens into a rut.`
        : el === 'air'
          ? `There can be a tendency to live in the head — to analyse a feeling rather than feel it, and to scatter attention across too many ideas at once.`
          : el === 'fire'
            ? `There can be impatience and a scattering of energy — many fires lit, not all tended, and a restlessness with slow-burning things.`
            : `There can be an over-absorption of others' moods and a difficulty with boundaries — feeling so much that you lose the edges of yourself.`,
      `${palm.headStyle === 'forked' || palm.headStyle === 'curved' ? 'Because your mind sees many sides, decisions can quietly stall while you weigh them; trusting a good-enough choice is part of your path. ' : ''}${palm.heartStyle === 'chained' || palm.heartStyle === 'straight' ? 'Emotionally, you may carry things silently, holding hurt inside rather than speaking it; letting trusted people in is where much of your ease lives. ' : ''}None of this is a flaw to fix so much as a pattern to befriend — the friction that, worked with, becomes character.`,
    ],
  })

  s.push({
    id: 'palm-career',
    title: 'Career & Purpose Themes',
    kicker: 'How you are built to work',
    paragraphs: [
      `Your hand suggests work that ${el === 'earth' ? 'lets you build something solid and see the results of your effort — structure, stewardship, craft' : el === 'air' ? 'engages your mind and your voice — ideas, communication, teaching, design' : el === 'fire' ? 'gives your energy a real channel — leading, creating, starting things, inspiring others' : 'lets you work from feeling and imagination — the arts, care, or any craft with a soul'}.`,
      `${palm.fate === 'clear' ? 'Your clear Fate Line suggests you do best with a discernible direction to organise your effort around — a mission, a craft, a long project.' : palm.fate === 'broken' ? 'Your shifting Fate Line suggests a career of chapters rather than a single straight climb — reinvention is a strength, not a setback.' : 'Your self-made path suggests you do best with the freedom to shape your own direction rather than fit a fixed track.'} ${palm.sun === 'clear' ? 'Your bright Sun Line adds a capacity for recognition and creative visibility.' : 'Recognition matters less to you than doing work you can respect.'}`,
      `Your leadership style leans ${palm.thumb === 'firm' ? 'decisive and steady — you can hold a line and be relied upon' : palm.thumb === 'flexible' ? 'collaborative and warm — you lead by keeping people with you' : 'balanced — firm when it counts, flexible when it helps'}. The long-term direction the hand keeps pointing toward is work where your natural temperament is allowed to operate rather than suppressed.`,
    ],
  })

  s.push({
    id: 'palm-relationships',
    title: 'Relationships & Emotional Life',
    kicker: 'How you bond, trust, and love',
    paragraphs: [
      `In love and friendship your Heart Line and Mount of Venus set the tone. ${mountText(venusLevel(palm.venus), 'venus')} Your ${palm.heartStyle} Heart Line adds that you ${palm.heartStyle === 'curved' || palm.heartStyle === 'long' ? 'give warmth openly and hope to be met with the same openness' : palm.heartStyle === 'chained' ? 'feel deeply and need a gentle, trustworthy climate before you fully open' : 'show love through loyalty and steadiness more than open display'}.`,
      `Trust, for you, is ${palm.heartStyle === 'straight' || palm.heartStyle === 'short' ? 'earned slowly and then held firmly — you commit carefully but deeply' : 'offered relatively readily, though your feelings run deeper than they may first appear'}. Your emotional boundaries are ${el === 'water' ? 'the growth edge — learning where you end and another begins' : 'reasonably clear, though the people closest to you see the tender centre few others reach'}.`,
      `The reflective note is that closeness asks of you ${palm.heartStyle === 'chained' || palm.heartStyle === 'straight' ? 'the courage to speak what you feel rather than carry it silently' : 'the patience to let others love you at their own pace, not only at yours'}. Compatibility, traditionally, favours a partner who understands your rhythm and gives your particular kind of heart room to breathe.`,
    ],
  })

  s.push({
    id: 'palm-timing',
    title: 'Timing & Life Phases',
    kicker: 'Broad seasons, not fixed dates',
    paragraphs: [
      `Traditional palmistry reads the lines as slow seasons rather than calendar dates, and this reading holds to that spirit: what follows is reflective, not predictive. In an early phase, your hand suggests a person shaped strongly by ${el === 'earth' || el === 'water' ? 'family, roots, and the emotional climate of home' : 'ideas, encounters, and a restless early search for the right direction'} — the raw material later worked into character.`,
      `In the current development of your life, the ${palm.fate === 'clear' ? 'clarity of your Fate Line traditionally points toward a phase of consolidating direction — deepening rather than scattering' : palm.fate === 'broken' ? 'movement in your Fate Line traditionally points toward a phase of transition — an old shape loosening so a truer one can form' : 'openness of your path traditionally points toward a phase of authorship — you are writing the direction as you go'}. This may suggest a season for patient, deliberate steps rather than dramatic leaps.`,
      `Looking toward future growth, the hand keeps returning to the same quiet theme: that your strength matures through ${el === 'fire' || el === 'air' ? 'learning to focus and finish — turning many sparks into a few real fires' : 'learning to trust your own timing — letting depth and steadiness become confidence'}. This pattern can indicate a life that grows more, not less, itself with time.`,
    ],
  })

  s.push({
    id: 'palm-guidance',
    title: 'Guidance',
    kicker: 'Practical, grounded, yours to weigh',
    paragraphs: [
      `If this reading offers one practical thread to carry, ${name}, let it be this: your hand is not a verdict but a map of tendencies, and tendencies can be worked with. The invitation is to lean into your natural strength — ${el === 'earth' ? 'your steadiness' : el === 'air' ? 'your clarity' : el === 'fire' ? 'your warmth' : 'your depth'} — while gently tending the one growth edge that keeps recurring.`,
      `In practice, that might mean ${el === 'earth' ? 'deliberately saying yes to one unplanned thing, so your steadiness stays alive rather than rigid' : el === 'air' ? 'returning regularly from thought into the body — walking, making, simply being present' : el === 'fire' ? 'choosing one fire to tend all the way through before lighting the next' : 'building small, kind boundaries so your sensitivity becomes a gift you own'}. Small, repeated choices in that direction are how a hand's promise is actually kept.`,
      `Hold all of this lightly. It is offered for reflection and self-understanding in a long cultural tradition — a mirror to think beside, never a fence around your future. The last word about your life is always yours to write.`,
    ],
  })

  return s
}

// ─────────────────────────────────────────────────────────────
// NUMEROLOGY READING
// ─────────────────────────────────────────────────────────────
export function generateNumerologyReading(input: ReadingInput, chart: NumerologyChart): ReadingSection[] {
  const name = firstName(input.fullName)
  const s: ReadingSection[] = []
  const lp = loreFor(chart.lifePath.value)
  const ex = loreFor(chart.expression.value)
  const su = loreFor(chart.soulUrge.value)
  const pe = loreFor(chart.personality.value)
  const bd = loreFor(chart.birthday.value)
  const mt = loreFor(chart.maturity.value)
  const py = loreFor(chart.personalYear.value)

  s.push({
    id: 'num-summary',
    title: 'Core Numerology Summary',
    kicker: 'The shape of your chart',
    paragraphs: [
      `Your name and birth date, ${name}, resolve into a small constellation of numbers, each describing a different layer of you. At the centre sits your Life Path ${chart.lifePath.value} — ${lp.essence}. Around it, your Expression ${chart.expression.value} describes your outward gifts, your Soul Urge ${chart.soulUrge.value} your inner motive, and your Personality ${chart.personality.value} the face you show the world.`,
      `Read together, the chart tells a coherent story: a person whose core direction (${chart.lifePath.value}, ${lp.keyword}) is expressed through ${ex.keyword}, driven quietly from within by a hunger for ${su.keyword}, and met by others first as ${pe.keyword}. ${chart.masterNumbers.length ? `You also carry the master vibration${chart.masterNumbers.length > 1 ? 's' : ''} ${chart.masterNumbers.join(' and ')}, a heightened current we will honour carefully below.` : ''} ${chart.karmicDebts.length ? `The chart also shows the karmic-debt number${chart.karmicDebts.length > 1 ? 's' : ''} ${chart.karmicDebts.join(', ')}, read here as an area of concentrated learning rather than any kind of punishment.` : ''}`,
      `What follows walks each number in turn — its gift, its shadow, and its lesson — before drawing them back together into practical reflection. Hold it as a symbolic mirror, offered in a long tradition, for thinking about yourself with a little more depth and kindness.`,
    ],
  })

  s.push({
    id: 'num-lifepath',
    title: `Life Path Number — ${chart.lifePath.value}${chart.lifePath.isMaster ? ' (Master)' : ''}`,
    kicker: `${lp.title} · ${lp.keyword}`,
    paragraphs: [
      `Calculated from the whole of your birth date, the Life Path is the main road of your life — its purpose, its natural grain. Yours reduces to ${chart.lifePath.value}, ${lp.title}: ${lp.essence}.`,
      `As a life direction this tends to draw you toward a particular way of being in the world. Your natural strengths here include ${lp.strengths.join(', ')}. These are not achievements to earn so much as tendencies to recognise and lean into — the places where life feels least like swimming upstream.`,
      `Every Life Path carries its shadow, and yours is honest about ${lp.shadows.join(', ')}. ${lp.lesson} In love, ${lp.love.charAt(0).toLowerCase() + lp.love.slice(1)} In work and vocation, ${lp.work.charAt(0).toLowerCase() + lp.work.slice(1)}`,
      `${chart.lifePath.karmicDebt ? `Because this number arrived by way of ${chart.lifePath.karmicDebt}, there is an added thread of concentrated learning here — traditionally a lesson around ${chart.lifePath.karmicDebt === 13 ? 'discipline and honest effort' : chart.lifePath.karmicDebt === 14 ? 'freedom, moderation, and focus' : chart.lifePath.karmicDebt === 16 ? 'ego, love, and rebuilding after loss' : 'independence and integrity'} — offered gently, as growth rather than fate.` : `The Life Path is the number to return to whenever the smaller numbers seem to pull in different directions; it is the through-line of the whole chart.`}`,
    ],
  })

  s.push({
    id: 'num-expression',
    title: `Expression / Destiny Number — ${chart.expression.value}${chart.expression.isMaster ? ' (Master)' : ''}`,
    kicker: `${ex.title} · ${ex.keyword}`,
    paragraphs: [
      `Drawn from every letter of your full birth name, the Expression Number describes your natural talents and the way you are built to act in the world — your destiny in the older sense of the shape you are here to grow into. Yours is ${chart.expression.value}, ${ex.title}: ${ex.essence}.`,
      `This points toward outward gifts of ${ex.strengths.join(', ')}. Where the Life Path is the road, the Expression is the vehicle — the set of abilities you travel in. ${ex.work}`,
      `Its shadow side can show as ${ex.shadows.join(', ')}, especially when the gift is used to perform rather than to serve. ${ex.lesson} The invitation is to develop this number deliberately, since talents left unpractised tend to sit quietly rather than ripen.`,
    ],
  })

  s.push({
    id: 'num-soulurge',
    title: `Soul Urge Number — ${chart.soulUrge.value}${chart.soulUrge.isMaster ? ' (Master)' : ''}`,
    kicker: `${su.title} · ${su.keyword}`,
    paragraphs: [
      `Calculated from the vowels of your name — the soft, sounded heart of it — the Soul Urge describes what you want underneath what you do: your private motive, the hunger that moves you when no one is watching. Yours is ${chart.soulUrge.value}, ${su.title}: at heart you long for ${su.keyword}.`,
      `${su.love} This is the number of your inner weather. When your outer life honours it, you feel quietly whole; when it is ignored for too long, a restlessness or flatness sets in that no achievement quite cures.`,
      `The shadow here is ${su.shadows[0]}${su.shadows[1] ? ' and ' + su.shadows[1] : ''} — the way a deep desire can distort when it goes unmet or unspoken. ${su.lesson} Knowing this number is knowing what actually feeds you, which is worth more than knowing what merely impresses.`,
    ],
  })

  s.push({
    id: 'num-personality',
    title: `Personality Number — ${chart.personality.value}${chart.personality.isMaster ? ' (Master)' : ''}`,
    kicker: `${pe.title} · ${pe.keyword}`,
    paragraphs: [
      `Drawn from the consonants of your name — its outward, spoken shell — the Personality Number is the first impression you make, the doorway others come through before they reach the rooms inside. Yours is ${chart.personality.value}, ${pe.title}, so people tend to meet you first as ${pe.keyword}.`,
      `This is the social mask in the neutral sense — not a falseness but a filter, the edited version the world sees before it earns the rest. Others likely read you as ${pe.strengths.slice(0, 3).join(', ')}. ${chart.personality.value !== chart.soulUrge.value ? `Notice the gap between this and your Soul Urge ${chart.soulUrge.value}: what you show and what you want are not identical, and that distance is worth understanding.` : `Here your outer face and inner motive share the same number — an unusual transparency, where what people see is close to what you feel.`}`,
    ],
  })

  s.push({
    id: 'num-birthday',
    title: `Birthday Number — ${chart.birthday.value}${chart.birthday.isMaster ? ' (Master)' : ''}`,
    kicker: `${bd.title} · a natural gift`,
    paragraphs: [
      `The day of the month you were born carries a specific, almost instinctive talent — a skill you seem to arrive already holding. Yours reduces to ${chart.birthday.value}, lending a natural gift for ${bd.keyword}: ${bd.essence}.`,
      `Think of this as a supporting instrument rather than the melody — a colour that tints the larger numbers. In everyday life it shows as ${bd.strengths.slice(0, 2).join(' and ')}, an early-life imprint that tends to stay with you as a quiet competence others notice before you do.`,
    ],
  })

  s.push({
    id: 'num-maturity',
    title: `Maturity Number — ${chart.maturity.value}${chart.maturity.isMaster ? ' (Master)' : ''}`,
    kicker: `${mt.title} · who you grow into`,
    paragraphs: [
      `The Maturity Number — your Life Path and Expression added and reduced — describes the person you ripen into in the second half of life, once the early experiments have taught their lessons. Yours is ${chart.maturity.value}, ${mt.title}: increasingly, ${mt.essence}.`,
      `This is less about who you are now than who you are quietly becoming. As you mature, life tends to draw you toward ${mt.strengths.slice(0, 3).join(', ')}. ${mt.lesson} Many people feel this number switch on around midlife, like a second wind that finally makes sense of the first.`,
    ],
  })

  s.push({
    id: 'num-personalyear',
    title: `Personal Year Number — ${chart.personalYear.value}`,
    kicker: `${chart.currentYear} · your current season`,
    paragraphs: [
      `Numerology reads life in nine-year cycles, and your Personal Year places you within that rhythm for ${chart.currentYear}. Yours is ${chart.personalYear.value}, traditionally ${py.year}.`,
      `The recommended focus for a year like this is to move with its grain rather than against it: ${chart.personalYear.value === 1 ? 'plant, begin, and take initiative' : chart.personalYear.value === 2 ? 'be patient, nurture partnerships, and let things ripen' : chart.personalYear.value === 3 ? 'express, create, and reconnect socially' : chart.personalYear.value === 4 ? 'build, organise, and do the steady work' : chart.personalYear.value === 5 ? 'welcome change and stay adaptable' : chart.personalYear.value === 6 ? 'tend home, love, and responsibility' : chart.personalYear.value === 7 ? 'rest, study, and go inward' : chart.personalYear.value === 8 ? 'step into responsibility and let effort be rewarded' : 'complete, release, and make space for what is next'}. What to avoid is forcing the opposite season — pushing hard in a year meant for rest, or hiding in a year meant for action.`,
    ],
  })

  if (chart.masterNumbers.length || chart.karmicDebts.length) {
    s.push({
      id: 'num-master',
      title: 'Master & Karmic Numbers',
      kicker: 'The heightened threads',
      paragraphs: [
        chart.masterNumbers.length
          ? `Your chart carries the master number${chart.masterNumbers.length > 1 ? 's' : ''} ${chart.masterNumbers.join(' and ')}. Master numbers are not badges of specialness but higher-voltage currents: ${chart.masterNumbers.includes(11) ? '11 brings heightened intuition and inspiration, and with them a nervous sensitivity that asks to be grounded; ' : ''}${chart.masterNumbers.includes(22) ? '22 brings the power to build large and lasting things, and with it real inner pressure; ' : ''}${chart.masterNumbers.includes(33) ? '33 brings a devotional, healing warmth, and with it the risk of giving past your own limits; ' : ''}each can also simply operate as its reduced digit on ordinary days. The work is to carry the higher charge without being burned by it.`
          : `Your chart does not carry a master number, which is entirely common and in no way a lack — most charts express their gifts through the single digits one to nine.`,
        chart.karmicDebts.length
          ? `You also carry the karmic-debt number${chart.karmicDebts.length > 1 ? 's' : ''} ${chart.karmicDebts.join(' and ')}. Read kindly and without drama, these mark areas of concentrated learning — ${chart.karmicDebts.includes(13) ? '13 asks for discipline and honest, patient effort; ' : ''}${chart.karmicDebts.includes(14) ? '14 asks for moderation and focused freedom; ' : ''}${chart.karmicDebts.includes(16) ? '16 asks for humility in love and the courage to rebuild; ' : ''}${chart.karmicDebts.includes(19) ? '19 asks for independence balanced with genuine care for others; ' : ''}not debts owed to fate, but invitations to grow where growth is most fruitful.`
          : `No karmic-debt numbers appear in your chart — again, common, and simply one fewer concentrated lesson to name.`,
      ],
    })
  }

  s.push({
    id: 'num-career',
    title: 'Career Reading',
    kicker: 'Work through the numbers',
    paragraphs: [
      `Reading your numbers together for work: your Life Path ${chart.lifePath.value} sets the direction — ${lp.work.charAt(0).toLowerCase() + lp.work.slice(1)} Your Expression ${chart.expression.value} adds the toolkit — ${ex.work.charAt(0).toLowerCase() + ex.work.slice(1)}`,
      `Your Birthday ${chart.birthday.value} lends a natural instinct for ${bd.keyword}, and your Maturity ${chart.maturity.value} suggests that, over time, you grow toward ${mt.keyword}-centred work. Best environments tend to be ones that let your Soul Urge ${chart.soulUrge.value} breathe — you do your finest work where there is room for ${su.keyword}.`,
      `Leadership style, risk appetite, and ideal roles all follow from this weave. The honest caution is only to watch the shadow of your strongest number — ${lp.shadows[0]} — which tends to surface most under work stress. Choose roles that use your gift and forgive your shadow, and the numbers suggest work becomes a place of growth rather than depletion.`,
    ],
  })

  s.push({
    id: 'num-relationship',
    title: 'Relationship Reading',
    kicker: 'Love through the numbers',
    paragraphs: [
      `In relationships your Soul Urge ${chart.soulUrge.value} is the number that matters most, because it names what you actually need to feel loved: ${su.love.charAt(0).toLowerCase() + su.love.slice(1)}`,
      `Your Life Path ${chart.lifePath.value} shapes how you show up in partnership — ${lp.love.charAt(0).toLowerCase() + lp.love.slice(1)} Your Personality ${chart.personality.value} governs first impressions, so new connections tend to meet your ${pe.keyword} before they meet your depths.`,
      `The tender spots are usually where a number's shadow meets intimacy: for you, ${su.shadows[0]} and ${lp.shadows[0]} are worth watching, since these are where closeness can quietly strain. Named and understood, they become manageable weather rather than storms. Compatibility, in this tradition, is less about matching numbers than about two people understanding each other's rhythms with patience.`,
    ],
  })

  s.push({
    id: 'num-strengths',
    title: 'Strengths & Shadows',
    kicker: 'A balanced ledger',
    paragraphs: [
      `Gathering your numbers into a single honest ledger, your gifts and your growth-areas are two sides of the same coins.`,
    ],
    bullets: [
      { heading: `Core gift (Life Path ${chart.lifePath.value})`, text: `${lp.strengths.slice(0, 3).join(', ')} — ${lp.keyword} as your through-line.` },
      { heading: `Outward talent (Expression ${chart.expression.value})`, text: `${ex.strengths.slice(0, 3).join(', ')}.` },
      { heading: `Inner strength (Soul Urge ${chart.soulUrge.value})`, text: `a deep, renewing pull toward ${su.keyword}.` },
      { heading: `Shadow to tend`, text: `${lp.shadows[0]}, and at times ${ex.shadows[0]} — most visible under pressure, and workable once named.` },
    ],
  })

  s.push({
    id: 'num-guidance',
    title: 'Practical Guidance',
    kicker: 'What to do with all this',
    paragraphs: [
      `If the whole chart offered you one sentence, ${name}, it might be this: build a life that lets your Life Path ${chart.lifePath.value} lead, your Expression ${chart.expression.value} act, and your Soul Urge ${chart.soulUrge.value} be quietly fed. When those three agree, you tend to feel both effective and at peace.`,
      `Practically, that could mean choosing work and relationships by a simple test — do they use your ${lp.keyword}, express your ${ex.keyword}, and honour your need for ${su.keyword}? Where the answer is yes across all three, the numbers suggest you will flourish. Where it is no, expect friction, and read the friction as information rather than failure.`,
      `And take the current season into account: this is, for you, ${py.year}. Move with it. As with the whole of this reading, hold these numbers as a reflective tradition — a thoughtful mirror, not a measurement. What you do with what you see is entirely, and rightly, your own.`,
    ],
  })

  return s
}

// ─────────────────────────────────────────────────────────────
// COMBINED READING — synthesis of palm + numerology
// ─────────────────────────────────────────────────────────────
export function generateCombinedReading(input: ReadingInput, chart: NumerologyChart): ReadingSection[] {
  const name = firstName(input.fullName)
  const palm = input.palm
  const el = handElement(palm.shape, palm.fingerLength)
  const element = HAND_ELEMENTS[el]
  const lpv = chart.lifePath.value
  const lp = loreFor(lpv)
  const ex = loreFor(chart.expression.value)
  const su = loreFor(chart.soulUrge.value)
  const pe = loreFor(chart.personality.value)

  // Derived agreement / tension signals
  const creativePalm = palm.headStyle === 'sloping' || palm.headStyle === 'curved' || palm.sun !== 'absent'
  const creativeNum = [3].includes(chart.expression.value) || [3, 5].includes(chart.soulUrge.value) || chart.masterNumbers.includes(11) || chart.masterNumbers.includes(33)
  const responsiblePalm = palm.fate === 'clear'
  const responsibleNum = [4, 6, 8, 22].includes(lpv)
  const deepEmotionPalm = palm.heartStyle === 'chained' || palm.heartStyle === 'long' || palm.venus === 'full'
  const deepEmotionNum = [2, 6, 9, 11, 33].includes(chart.soulUrge.value)
  const freedomPull = el === 'fire' || el === 'air' || [3, 5].includes(lpv) || chart.soulUrge.value === 5
  const securityPull = el === 'earth' || [4, 6, 8].includes(lpv) || palm.fate === 'clear'
  const s: ReadingSection[] = []

  s.push({
    id: 'core-pattern',
    title: 'Your Core Pattern',
    kicker: 'Where the hand and the numbers meet',
    paragraphs: [
      `This is where the two readings become one, ${name}. Palmistry has shown us the visible map — the temperament worn into your hand, the way you actually move through days. Numerology has shown us the symbolic map — the direction, motive, and timing written in your name and birth date. Laid over each other, they rhyme more often than they clash, and the rhyme is your core pattern.`,
      `At the centre of both maps sits a single figure: ${element.title.replace(/^an? /, '')} by temperament, ${lp.title} (${lpv}) by direction. In plain terms, you are someone whose hands say "${el === 'earth' ? 'steady and practical' : el === 'air' ? 'thoughtful and communicative' : el === 'fire' ? 'warm and driven' : 'sensitive and imaginative'}" while your numbers say "here to move through life by way of ${lp.keyword}." Hold those two phrases together and you have the seed of everything below.`,
      `The reading that follows does not simply place palm beside numbers; it looks for where they agree (and so speak with double weight), where they pull against each other (and so name an inner tension), and what theme keeps surfacing no matter which map we read. That is the real gift of a combined reading — not more information, but a truer, rounder portrait.`,
    ],
  })

  s.push({
    id: 'inner-outer',
    title: 'Inner Nature vs Outer Life',
    kicker: 'Soul Urge · Personality · palm shape',
    paragraphs: [
      `Every person lives on two levels — the self they feel inside and the self the world receives — and here the hand and numbers describe both. Your inner nature is drawn by your Soul Urge ${chart.soulUrge.value} toward ${su.keyword}, while your outer life is met first through your Personality ${chart.personality.value} as ${pe.keyword}, and carried in a hand that reads as ${el}.`,
      chart.soulUrge.value === chart.personality.value
        ? `Unusually, your inner motive and outer face share a number — a rare transparency. What people meet is close to what you actually are, and your palm's ${el} tone reinforces it. The gift is authenticity; the only caution is that you have little armour, so choosing safe company matters.`
        : `There is a real distance between what you want (${su.keyword}) and what you show (${pe.keyword}). Your ${el} hand ${(el === 'water' || el === 'earth') ? 'tends to keep the inner life private, so few see the whole of you at once' : 'tends to bridge the two fairly openly, though the depths still take time to reach'}. This gap is not dishonesty; it is the ordinary space between heart and face, and knowing its size helps you feel less misread.`,
      `Your Head Line and thumb add the finishing note: a ${palm.headStyle} mind and a ${palm.thumb} will mean you ${palm.thumb === 'firm' ? 'govern the boundary between inner and outer deliberately' : palm.thumb === 'flexible' ? 'let the boundary flex with the people around you' : 'hold that boundary with a balanced hand'}. The aim, over time, is for inner and outer to serve each other rather than hide from each other.`,
    ],
  })

  s.push({
    id: 'emotional-pattern',
    title: 'Emotional Pattern',
    kicker: 'Heart Line · Venus · Soul Urge · Life Path',
    paragraphs: [
      `Your emotional life is described twice over — by the Heart Line and Mount of Venus in the hand, and by the Soul Urge and Life Path in the numbers — and the two accounts ${deepEmotionPalm === deepEmotionNum ? 'agree strongly' : 'differ in an interesting way'}.`,
      deepEmotionPalm && deepEmotionNum
        ? `Both maps point the same direction: a deep, much-feeling heart. Your ${palm.heartStyle} Heart Line and your Soul Urge ${chart.soulUrge.value} together describe someone who loves with real depth and feels things keenly. This double weight means emotion is central to who you are — a strength, and a sensitivity to protect. The repeated theme is loyalty and depth, sometimes carried more quietly than it is felt.`
        : deepEmotionPalm || deepEmotionNum
          ? `Here the maps diverge gently: one shows more emotional depth than the other. ${deepEmotionPalm ? 'Your hand feels more than your numbers let on — a chained or generous Heart Line beneath cooler numbers' : 'Your numbers long for more closeness than your hand openly shows — a warm Soul Urge beneath a more reserved Heart Line'}. In practice this often means your feelings run deeper than your expression of them, and people may underestimate how much you care. Naming this to those close to you dissolves a lot of quiet misunderstanding.`
          : `Both maps agree on a more contained emotional style: feeling that is real but measured, offered to a chosen few rather than broadcast. This is not coldness but economy — you invest your heart carefully. The growth edge is simply to make sure the few you choose truly know they are chosen.`,
      `Whatever the balance, your emotional pattern rewards the same practice: letting trusted people past the first gate, and speaking feeling rather than only carrying it. Your Life Path ${lpv} adds that ${lp.love.charAt(0).toLowerCase() + lp.love.slice(1)}`,
    ],
  })

  s.push({
    id: 'mind-decisions',
    title: 'Mind & Decision-Making',
    kicker: 'Head Line · fingers · Expression · Personality',
    paragraphs: [
      `How you think and decide is written in your ${palm.headStyle} Head Line and ${palm.fingerLength} fingers on the hand's side, and in your Expression ${chart.expression.value} and Personality ${chart.personality.value} on the numbers' side.`,
      creativePalm && creativeNum
        ? `Both maps agree on a creative, associative intelligence. Your Head Line and your numbers both lean toward imagination and connection over pure linear logic — so this is a genuine signature, not a mood. You likely decide well when you trust the intuitive leap, and worst when you force yourself into someone else's rigid method. The repeated theme is creative thinking, and it deserves to be built around rather than apologised for.`
        : !creativePalm && !creativeNum
          ? `Both maps agree on a practical, grounded intelligence. Hand and numbers alike favour clarity, structure, and demonstrable reasoning. You decide best with facts in front of you and time to weigh them, and you can trust that steadiness — it is a real strength in a distractible world.`
          : `The maps mix here, and it is one of your more interesting tensions: ${creativePalm ? 'a hand that thinks in images and possibility paired with numbers that value clear outward form' : 'imaginative numbers paired with a more linear, practical hand'}. In practice you likely do your best work where structure and imagination are allowed to coexist — a framework loose enough to dream inside. Forced to choose only one mode, you tend to feel half-used.`,
      `Your ${palm.thumb} thumb governs how you commit to a decision once made: ${palm.thumb === 'firm' ? 'firmly, sometimes stubbornly' : palm.thumb === 'flexible' ? 'lightly, with room to revise' : 'with a workable balance of resolve and openness'}. Knowing your true decision-style lets you stop borrowing methods that were never built for your mind.`,
    ],
  })

  s.push({
    id: 'combined-career',
    title: 'Career & Purpose',
    kicker: 'Fate & Sun lines · Jupiter · Life Path · Expression · Maturity',
    paragraphs: [
      `For work and vocation, five signals converge: your Fate and Sun lines and Mount of Jupiter in the hand, and your Life Path ${lpv}, Expression ${chart.expression.value}, and Maturity ${chart.maturity.value} in the numbers.`,
      responsiblePalm && responsibleNum
        ? `Hand and numbers agree loudly here: both your clear Fate Line and your Life Path ${lpv} point toward responsibility, direction, and the long game. This doubled signal traditionally marks someone built for sustained, meaningful work — the discipline to carry something for years. The repeated theme is long-term discipline, and it is one of your surest strengths.`
        : `Your working nature blends a ${palm.fate === 'clear' ? 'defined outer direction' : 'self-made, improvised path'} with numbers that call you toward ${lp.keyword}. This means purpose, for you, is ${palm.fate === 'clear' ? 'something you commit to and deepen' : 'something you author and re-author as you grow'} — and either way it is happiest when it serves your ${lp.keyword}.`,
      `Your Expression ${chart.expression.value} supplies the tools (${ex.strengths.slice(0, 2).join(', ')}), your ${palm.sun === 'clear' ? 'bright Sun Line adds real creative visibility' : 'quieter Sun Line suggests fulfilment measured inwardly more than by recognition'}, and your Maturity ${chart.maturity.value} promises that the work grows richer with time. The through-line: choose vocation that lets your temperament operate openly, and let purpose be a direction rather than a single fixed destination.`,
    ],
  })

  s.push({
    id: 'combined-relationships',
    title: 'Relationships',
    kicker: 'Heart Line · Venus · Moon · Soul Urge · Personality · Life Path',
    paragraphs: [
      `In love, the hand's Heart Line, Mount of Venus, and Mount of Moon meet the numbers' Soul Urge ${chart.soulUrge.value}, Personality ${chart.personality.value}, and Life Path ${lpv} — six witnesses to how you bond.`,
      `What you need underneath is ${su.keyword} (Soul Urge ${chart.soulUrge.value}); what you first show is ${pe.keyword} (Personality ${chart.personality.value}); and how you commit is shaped by a Life Path that ${lp.love.charAt(0).toLowerCase() + lp.love.slice(1)} Your ${palm.heartStyle} Heart Line and ${palm.venus} Venus mount ${deepEmotionPalm ? 'confirm a deep, devoted capacity for love' : 'suggest affection that is real but measured, given to a trusted few'}.`,
      `The practical wisdom: the people who love you well are the ones who learn your rhythm — who understand that your ${pe.keyword} exterior opens onto a ${su.keyword}-seeking heart, and who give that heart time and safety. And the reflective caution, as ever, is to speak your needs rather than expect them to be guessed. Compatibility here is a matter of understood rhythm far more than matched numbers.`,
    ],
  })

  s.push({
    id: 'current-cycle',
    title: 'Current Life Cycle',
    kicker: `Personal Year ${chart.personalYear.value} · ${chart.currentYear}`,
    paragraphs: [
      `Timing draws the two maps together one more time. Your Personal Year ${chart.personalYear.value} places ${chart.currentYear} as ${loreFor(chart.personalYear.value).year}. The palm's timing themes — read as slow seasons rather than dates — ${palm.fate === 'broken' ? 'echo this sense of transition, a shape loosening to reform' : palm.fate === 'clear' ? 'echo this as a phase for deepening a direction already chosen' : 'echo this as a phase of authorship, writing your direction as you walk'}.`,
      `Guidance for the season, then, is to align your outer choices with this inner rhythm: ${chart.personalYear.value <= 3 ? 'this is a building-and-beginning stretch — plant, express, and let new things take root' : chart.personalYear.value <= 6 ? 'this is a consolidating stretch — steady work, home, and responsibility reward you now' : 'this is an inward, completing stretch — rest, reflect, finish, and clear space for what comes next'}. Read any friction this year as a signal about timing, not a verdict about worth.`,
    ],
  })

  s.push({
    id: 'combined-strengths',
    title: 'Strengths',
    kicker: 'Doubled by two systems',
    paragraphs: [
      `These strengths are the ones both maps confirm — which is why they can be trusted as more than a single reading's flattery.`,
    ],
    bullets: [
      { heading: `${element.title.replace(/^an? /, '')} + Life Path ${lpv}`, text: `Your temperament and your direction reinforce each other: a naturally ${el} nature moving through life by way of ${lp.keyword}.` },
      { heading: 'Your working gift', text: `${ex.strengths.slice(0, 2).join(' and ')}, carried by ${palm.thumb === 'firm' ? 'a strong will' : palm.thumb === 'flexible' ? 'a warm adaptability' : 'a balanced resolve'}.` },
      { heading: 'Your relational gift', text: `${deepEmotionPalm || deepEmotionNum ? 'a real capacity for depth and loyalty in love' : 'a steady, dependable warmth offered to those you choose'}.` },
      { heading: 'Your quiet superpower', text: `${creativePalm && creativeNum ? 'creative thinking that both hand and numbers insist on' : responsiblePalm && responsibleNum ? 'long-term discipline written twice over' : 'the ability to hold steadiness and change in a workable balance'}.` },
    ],
  })

  s.push({
    id: 'combined-challenges',
    title: 'Challenges',
    kicker: 'Growth edges, not fears',
    paragraphs: [
      `Named without drama, these are the places both maps suggest you will do your growing — not warnings, but the honest friction that becomes character when it is worked with rather than feared.`,
      `The strongest of them is the shadow your Life Path shares with your temperament: ${lp.shadows[0]}. Under stress this is where you tend to catch — ${el === 'earth' ? 'digging into the known when change is called for' : el === 'air' ? 'retreating into analysis instead of feeling or acting' : el === 'fire' ? 'scattering across too many fires' : 'absorbing others until you lose your own edges'}.`,
      `A second, quieter challenge is ${su.shadows[0]} — the shadow of your inner desire, which surfaces when that desire goes unspoken or unmet. Neither of these is a flaw to erase; both are patterns to befriend. The whole point of naming them is that a challenge seen clearly is already half-managed.`,
    ],
  })

  s.push({
    id: 'repeated-themes',
    title: 'Repeated Themes',
    kicker: 'What both maps keep saying',
    paragraphs: [
      `Step back from the detail and a few themes appear in both the hand and the numbers — and repetition, in a combined reading, is the closest thing to emphasis. These are the notes your whole chart keeps sounding:`,
      `${[creativePalm && creativeNum ? 'a creative, associative intelligence' : '', responsiblePalm && responsibleNum ? 'a pull toward responsibility and the long game' : '', deepEmotionPalm && deepEmotionNum ? 'an emotional depth carried loyally' : '', `a ${el} way of meeting the world coloured by ${lp.keyword}`].filter(Boolean).join('; ')}. Where a theme appears in both maps, treat it as doubly true — a genuine signature rather than a passing mood.`,
      `The single loudest theme for you is ${creativePalm && creativeNum ? 'that your best life makes room for imagination as a serious, structured practice' : responsiblePalm && responsibleNum ? 'that you are built to carry meaningful things over the long haul, and are happiest when you do' : deepEmotionPalm && deepEmotionNum ? 'that emotional depth is central to you, and thrives when it is spoken as well as felt' : 'that you hold apparent opposites — steadiness and change, head and heart — and are at your best when both are allowed to coexist'}.`,
    ],
  })

  s.push({
    id: 'tensions',
    title: 'Tensions & Contradictions',
    kicker: 'The productive friction inside you',
    paragraphs: [
      `No real person is all of one thing, and a combined reading is honest about the places where your maps pull in different directions. These tensions are not problems to solve so much as the inner dialogue that keeps you alive and growing.`,
      freedomPull && securityPull
        ? `The clearest tension in your chart is between freedom and security. Part of you (${el === 'fire' || el === 'air' ? 'your ' + el + ' temperament' : 'your numbers'}) wants movement, openness, and room; another part (${securityPull && el === 'earth' ? 'that same grounded hand' : 'your steadier numbers and clear direction'}) wants roots, structure, and safety. You may desire freedom and also need security — and swing between them. The resolution is rarely to pick one; it is to build a life with a stable base you can adventure out from and return to.`
        : freedomPull
          ? `Your chart leans toward freedom and movement across nearly every signal — a consistent love of openness and change. The subtle tension is internal: freedom sought reactively (fleeing) versus freedom chosen (moving toward). The growth is to make sure your freedom is a yes to something, not only a no to being held.`
          : `Your chart leans toward steadiness and security across most signals. The subtle tension is between safety and stagnation — the same love of the known that grounds you can, unwatched, become a wall. Your growth is to choose small, deliberate adventures so steadiness stays alive.`,
      `A second possible tension sits between head and heart: ${creativePalm !== creativeNum ? 'your thinking style and your outward numbers do not fully agree, so you may feel pulled between imagination and practicality' : deepEmotionPalm !== deepEmotionNum ? 'your shown feeling and your felt feeling differ, so you may seem cooler (or warmer) than you are' : 'these are fairly well aligned in you, which is its own quiet gift'}. Held consciously, such tensions are not weaknesses — they are the range you can play across, and the source of much of your depth.`,
    ],
  })

  s.push({
    id: 'future-growth',
    title: 'Future Growth Direction',
    kicker: 'Where this all points',
    paragraphs: [
      `Reading both maps forward — the palm as slow seasons, the numbers as cycles — the direction of your growth becomes fairly clear, and it is hopeful without being a promise. Over time, you appear to grow toward your Maturity number ${chart.maturity.value} (${loreFor(chart.maturity.value).keyword}), while your temperament ${el === 'fire' || el === 'air' ? 'learns focus and follow-through' : 'learns to trust its own timing and let depth become confidence'}.`,
      `The recurring lesson across both systems is the same one your Life Path names: ${lp.lesson.charAt(0).toLowerCase() + lp.lesson.slice(1)} This is not a hurdle to clear once but a spiral you return to at deeper levels — and each return leaves you more yourself.`,
      `If you keep only one sense of direction from this whole reading, let it be that your two maps agree on your becoming: a person who ${creativePalm && creativeNum ? 'turns imagination into something real and lasting' : responsiblePalm && responsibleNum ? 'carries meaningful things with a steadiness others come to rely on' : 'holds their opposites gracefully and grows more whole with time'}.`,
    ],
  })

  s.push({
    id: 'combined-guidance',
    title: 'Detailed Personal Guidance',
    kicker: 'A closing reflection',
    paragraphs: [
      `So we arrive, ${name}, at the quiet centre of the whole reading. You are, in the language of the hand, ${element.title} — ${el === 'earth' ? 'steady, practical, and grounding' : el === 'air' ? 'thoughtful, communicative, and curious' : el === 'fire' ? 'warm, instinctive, and inspiring' : 'sensitive, imaginative, and deep'}. You are, in the language of the numbers, a Life Path ${lpv}, here to move through life by way of ${lp.keyword}, expressing ${ex.keyword} outwardly while your heart quietly seeks ${su.keyword}. Both maps, read together, describe one recognisable person — and, we hope, a person you recognise.`,
      `The practical guidance that falls out of all this is gentle and specific. Build your days so your ${lp.keyword} can lead and your need for ${su.keyword} is fed. Lean on your doubled strength — ${creativePalm && creativeNum ? 'creative thinking' : responsiblePalm && responsibleNum ? 'long-term discipline' : deepEmotionPalm && deepEmotionNum ? 'emotional depth' : 'your balance of steadiness and change'} — and tend, without shame, the shadow both maps name: ${lp.shadows[0]}. When freedom and security argue inside you, refuse the false choice and build a base you can adventure from. When head and heart disagree, let them talk rather than letting one silence the other.`,
      `And hold every word of this the way it is meant: as reflection, tradition, and a mirror for self-understanding — never as prophecy, diagnosis, or a fence around what you may become. Palmistry and numerology are old, human ways of thinking about a life with attention and care. They can name your patterns beautifully. What you do with them — that has always been, and remains, entirely yours to write. That, after all, is the meaning of your name.`,
    ],
  })

  return s
}

// ─────────────────────────────────────────────────────────────
// ASSEMBLER
// ─────────────────────────────────────────────────────────────
export function generateFullReading(input: ReadingInput): {
  chart: NumerologyChart
  reading: FullReading
} {
  const year = input.currentYear ?? new Date().getFullYear()
  const chart = buildChart(input.fullName, input.dob, year)
  return {
    chart,
    reading: {
      palm: generatePalmReading(input),
      numerology: generateNumerologyReading(input, chart),
      combined: generateCombinedReading(input, chart),
    },
  }
}
