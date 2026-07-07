import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react'
import { Reveal, Kicker, RevealText, Button, Field, Input, NumberTile, Tabs, ChoiceGroup, buttonClass } from '../components/ui'
import { AlponaDivider, InkStroke, MarigoldParticles, CandleGlow, AlponaMandala } from '../components/ornaments'
import { PalmArt } from '../components/palm'
import { HAND_CHOICES } from '../components/refine'
import { generateFullReading } from '../lib/readings'
import { SAMPLE_INPUT } from '../data/sampleReading'
import { useStore } from '../lib/store'
import type { Hand } from '../lib/types'
import { cn } from '../lib/utils'

const HOME_LINES = [
  { id: 'life', n: '01', label: 'Life Line', color: 'var(--sindoor)', art: '/art/palm_life_line_highlighted.png', blurb: 'Vitality, grounding, and the rhythm at which you meet the world — resilience, not merely length of years.' },
  { id: 'head', n: '02', label: 'Head Line', color: 'var(--alta)', art: '/art/palm_head_line_highlighted.png', blurb: 'How your mind moves — the balance of logic and imagination, and the way you learn and decide.' },
  { id: 'heart', n: '03', label: 'Heart Line', color: 'var(--ritual)', art: '/art/palm_heart_line_highlighted.png', blurb: 'Your emotional weather — how you attach, express affection, and hold or share what you feel.' },
  { id: 'fate', n: '04', label: 'Fate Line', color: 'var(--gold-deep)', art: '/art/palm_fate_line_highlighted.png', blurb: 'Your relationship with direction and responsibility — the thread of purpose in your working life.' },
  { id: 'sun', n: '05', label: 'Sun Line', color: 'var(--marigold)', art: '/art/palm_sun_line_highlighted.png', blurb: 'Creativity, confidence, and your relationship with being seen — the warmth others remember.' },
  { id: 'mercury', n: '06', label: 'Mercury Line', color: 'var(--turmeric)', art: '/art/palm_mercury_line_highlighted.png', blurb: 'Communication, business instinct, and social intelligence — a quick, shrewd read of people.' },
]

function StickyHand() {
  const [active, setActive] = useState('life')
  const info = HOME_LINES.find((l) => l.id === active)
  return (
    <section className="relative py-10 sm:py-16">
      <div className="container-page">
        <Reveal className="mb-4 text-center">
          <Kicker className="justify-center">The reading begins with your hand</Kicker>
          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-4xl leading-tight text-heading sm:text-5xl">Every line, a quiet language</h2>
        </Reveal>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="self-start lg:sticky lg:top-28">
            <div className="relative mx-auto max-w-sm">
              <CandleGlow className="inset-4" />
              {/* all six stacked so each is already loaded when its blurb scrolls in */}
              <div className="relative aspect-[1122/1402] w-full">
                {HOME_LINES.map((l) => (
                  <PalmArt
                    key={l.id}
                    src={l.art}
                    alt={`Illustrated palm with the ${l.label} highlighted`}
                    className={cn(
                      'absolute inset-0 h-full w-full transition-opacity duration-700 ease-out',
                      active === l.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="font-serif text-2xl" style={{ color: info?.color }}>{info?.label}</span>
            </div>
          </div>
          <div className="space-y-[36vh] py-[10vh]">
            {HOME_LINES.map((l) => (
              <motion.div key={l.id} onViewportEnter={() => setActive(l.id)} viewport={{ margin: '-45% 0px -45% 0px' }} className="max-w-md">
                <span className="font-serif text-5xl text-parchment-deep">{l.n}</span>
                <h3 className="mt-1 font-serif text-3xl text-heading">{l.label}</h3>
                <InkStroke className="mt-2" />
                <p className="mt-3 font-report text-lg leading-relaxed text-ink-soft">{l.blurb}</p>
              </motion.div>
            ))}
            <p className="max-w-md font-report text-ink-muted">…and beyond the lines, the <span className="text-ritual">mounts</span> of the palm, your <span className="text-ritual">finger proportions</span>, and the strength of the <span className="text-ritual">thumb</span> each add their own note to the reading.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { draft, setDraft } = useStore()
  const { scrollYProgress } = useScroll()
  const heroPalmY = useTransform(scrollYProgress, [0, 0.25], [0, -50])
  const sample = useMemo(() => generateFullReading(SAMPLE_INPUT), [])
  const canStart = draft.fullName.trim().length > 1 && /^\d{4}-\d{2}-\d{2}$/.test(draft.dob)

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28">
        <MarigoldParticles count={8} />
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 text-center lg:text-left">
            <Reveal><Kicker className="justify-center lg:justify-start">ভাগ্যলিখন · the writing of fate</Kicker></Reveal>
            <RevealText as="h1" text="Bhagyalikhon" className="mt-5 font-serif text-6xl font-semibold tracking-tight text-heading sm:text-8xl" />
            <Reveal delay={0.35}>
              <p className="mx-auto mt-6 max-w-xl font-report text-xl italic leading-relaxed text-ink-soft lg:mx-0">“Where your lines and numbers quietly reveal their pattern.”</p>
            </Reveal>
            <Reveal delay={0.5}>
              <p className="mx-auto mt-4 max-w-lg font-sans text-ink-muted lg:mx-0">A calm, traditional space for palm reading and numerology — read together into one detailed, personal life pattern.</p>
            </Reveal>
            <Reveal delay={0.7}>
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link to="/combined" className={buttonClass('primary', 'lg')}>Start Your Reading <ArrowRight size={18} /></Link>
                <Link to="/sample" className={buttonClass('secondary', 'lg')}>View Sample Report</Link>
              </div>
            </Reveal>
          </div>
          <motion.div style={{ y: heroPalmY }} className="relative order-first lg:order-last">
            <CandleGlow className="inset-0 scale-125" />
            <motion.div initial={{ opacity: 0, scale: 0.9, rotate: 6 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}>
              <div className="relative mx-auto w-[72%] max-w-[20rem] overflow-hidden rounded-[1.5rem] border border-gold-antique/45 shadow-paper-lg lg:max-w-none lg:w-full">
                <img src="/art/hero-poster.png" alt="Bengali palm reading — an illustrated open hand among jasmine flowers" className="h-auto w-full" />
                <span className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-gold-antique/30" />
              </div>
            </motion.div>
          </motion.div>
        </div>
        <motion.div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-1 text-ink-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}>
          <span className="font-sans text-[0.7rem] uppercase tracking-ritual">Scroll to begin</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}><ChevronDown size={18} /></motion.span>
        </motion.div>
      </section>

      <AlponaDivider className="my-4" />

      <StickyHand />

      {/* ── NUMBERS ── */}
      <section className="relative overflow-hidden py-20">
        <MarigoldParticles count={5} />
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Kicker>The numbers beneath the name</Kicker>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-heading sm:text-5xl">Your name & birth date, made visible</h2>
            <p className="mt-4 font-report text-lg leading-relaxed text-ink-soft">Where the palm shows the pattern you live, numerology reveals the one you carry — the direction, motive, and timing written in your full name and the day you were born.</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {['Life Path', 'Expression', 'Soul Urge', 'Personality', 'Birthday', 'Maturity', 'Personal Year', 'Master & Karmic'].map((n) => (
                <li key={n} className="flex items-center gap-2 font-sans text-sm text-ink"><span className="h-1.5 w-1.5 rounded-full bg-marigold" />{n}</li>
              ))}
            </ul>
            <Link to="/numerology" className={cn(buttonClass('secondary'), 'mt-7')}>Explore numerology <ArrowRight size={16} /></Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mx-auto grid max-w-md grid-cols-3 gap-5">
              {[sample.chart.lifePath, sample.chart.expression, sample.chart.soulUrge, sample.chart.personality, sample.chart.birthday, sample.chart.personalYear].map((r, i) => (
                <motion.div key={r.key} animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }} transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}>
                  <NumberTile value={r.value} label={r.label} master={r.isMaster} size="sm" />
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <AlponaDivider className="my-6" />

      {/* ── TWO SYSTEMS ── */}
      <section className="py-20">
        <Reveal className="container-page text-center">
          <Kicker className="justify-center">Two systems, one pattern</Kicker>
          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-4xl leading-tight text-heading sm:text-5xl">The hand and the numbers, woven together</h2>
          <p className="mx-auto mt-4 max-w-2xl font-report text-lg text-ink-soft">The palm is read as the visible map of lived patterns; numerology as the symbolic map of inner rhythm and timing. Bhagyalikhon reads them as one.</p>
        </Reveal>
        <div className="container-page mt-12 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <Reveal>
            <div className="card-paper flex h-full flex-col items-center p-8 text-center">
              <PalmArt className="h-40 w-auto" />
              <h3 className="mt-5 font-serif text-2xl text-heading">The visible map</h3>
              <p className="mt-2 font-report text-ink-soft">Temperament, emotion, and lived development — written into the hand and read directly from it.</p>
            </div>
          </Reveal>
          <div className="flex items-center justify-center"><AlponaMandala size={72} spin /></div>
          <Reveal delay={0.1}>
            <div className="card-paper flex h-full flex-col items-center p-8 text-center">
              <div className="grid grid-cols-3 gap-3">
                {[1, 7, 3, 9, 11, 5].map((n) => (
                  <span key={n} className="grid h-12 w-12 place-items-center rounded-xl border border-gold-antique/40 bg-paper-50 font-serif text-xl text-ritual">{n}</span>
                ))}
              </div>
              <h3 className="mt-5 font-serif text-2xl text-heading">The symbolic map</h3>
              <p className="mt-2 font-report text-ink-soft">Direction, motive, and timing — the inner rhythm drawn from your name and birth date.</p>
            </div>
          </Reveal>
        </div>
        <Reveal className="container-page mt-6">
          <div className="relative overflow-hidden rounded-[1.4rem] border border-gold-antique/50 bg-ivory/60 p-8 text-center shadow-paper">
            <CandleGlow className="left-1/2 top-0 h-40 w-80 -translate-x-1/2" />
            <p className="relative font-report text-lg text-ink">Where both maps point the same way, the theme is <span className="text-ritual">emphasised</span>. Where they differ, it is named — gently — as an <span className="text-ritual">inner tension</span>. The result is a single, woven reading.</p>
          </div>
        </Reveal>
      </section>

      {/* ── READING PREVIEW ── */}
      <section className="py-20">
        <Reveal className="container-page text-center">
          <Kicker className="justify-center">A glimpse of your report</Kicker>
          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-4xl leading-tight text-heading sm:text-5xl">Not a summary — a proper reading</h2>
          <p className="mx-auto mt-4 max-w-2xl font-report text-lg text-ink-soft">Each reading runs to thousands of words across layered sections. Here is a taste, drawn from the sample report.</p>
        </Reveal>
        <Reveal delay={0.1} className="container-page mx-auto mt-10 max-w-4xl">
          <div className="card-paper p-6 sm:p-9">
            <Tabs
              tabs={[
                { id: 'palm', label: 'Palm Reading', content: <Excerpt sec={pick(sample.reading.palm, 'impression')} /> },
                { id: 'num', label: 'Numerology', content: <Excerpt sec={pick(sample.reading.numerology, 'num-lifepath')} /> },
                { id: 'comb', label: 'Combined Pattern', content: <Excerpt sec={pick(sample.reading.combined, 'core-pattern')} /> },
                { id: 'career', label: 'Career', content: <Excerpt sec={pick(sample.reading.combined, 'combined-career')} /> },
                { id: 'love', label: 'Relationships', content: <Excerpt sec={pick(sample.reading.combined, 'combined-relationships')} /> },
                { id: 'guide', label: 'Guidance', content: <Excerpt sec={pick(sample.reading.combined, 'combined-guidance')} /> },
              ]}
            />
          </div>
        </Reveal>
      </section>

      <AlponaDivider className="my-6" />

      {/* ── METHOD ── */}
      <section className="py-20">
        <Reveal className="container-page text-center">
          <Kicker className="justify-center">The method</Kicker>
          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-4xl leading-tight text-heading sm:text-5xl">Old languages, read with care</h2>
        </Reveal>
        <div className="container-page mt-10 grid gap-6 md:grid-cols-3">
          {[
            { k: 'The hand', t: 'Palm reading', d: 'Palm shape, the major and minor lines, the mounts, and the fingers — read in a long traditional lineage.' },
            { k: 'The numbers', t: 'Numerology', d: 'The Pythagorean system: your full name and birth date reduced, with master and karmic numbers honoured.' },
            { k: 'The pattern', t: 'Combined', d: 'Repeated themes between hand and numbers are emphasised; differences are named gently as inner tensions.' },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 0.08}>
              <div className="card-paper h-full p-7">
                <Kicker>{b.k}</Kicker>
                <h3 className="mt-3 font-serif text-2xl text-heading">{b.t}</h3>
                <InkStroke className="mt-3" />
                <p className="mt-4 font-report leading-relaxed text-ink-soft">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 text-center">
          <Link to="/method" className={cn(buttonClass('ghost'))}>Read the full method <ArrowRight size={16} /></Link>
        </Reveal>
      </section>

      <AlponaDivider className="my-6" />

      {/* ── START ── */}
      <section className="py-20">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-[1.8rem] border border-gold-antique/50 bg-paper-50 p-8 shadow-paper-lg sm:p-12">
              <CandleGlow className="right-0 top-0 h-72 w-72" />
              <MarigoldParticles count={5} />
              <div className="relative grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <Kicker>Begin</Kicker>
                  <h2 className="mt-3 font-serif text-4xl leading-tight text-heading sm:text-5xl">Let the reading begin</h2>
                  <p className="mt-4 font-report text-lg text-ink-soft">Enter your name and birth date, choose a hand, and step into your combined reading — palm and numbers, woven into one.</p>
                  <ul className="mt-6 space-y-2">
                    {['Private — everything stays on your device', 'Free, full-depth demo', 'A detailed report, yours to download'].map((t) => (
                      <li key={t} className="flex items-center gap-2 font-sans text-sm text-ink"><span className="h-1.5 w-1.5 rounded-full bg-marigold" />{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-parchment bg-ivory/50 p-6">
                  <div className="grid gap-4">
                    <Field label="Full name" htmlFor="hn"><Input id="hn" value={draft.fullName} onChange={(e) => setDraft({ fullName: e.target.value })} placeholder="e.g. Anjali Sharma" /></Field>
                    <Field label="Date of birth" htmlFor="hd"><Input id="hd" type="date" value={draft.dob} onChange={(e) => setDraft({ dob: e.target.value })} /></Field>
                    <div>
                      <p className="mb-2 font-sans text-sm font-semibold text-ink">Which hand?</p>
                      <ChoiceGroup options={HAND_CHOICES} value={draft.hand} onChange={(v) => setDraft({ hand: v as Hand })} columns={3} size="sm" />
                    </div>
                  </div>
                  <Button onClick={() => navigate('/combined')} disabled={!canStart} className="mt-5 w-full"><Sparkles size={16} /> Start Your Reading</Button>
                  <p className="mt-3 text-center font-sans text-xs text-ink-muted">For reflection & tradition — not prediction or professional advice.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

function pick<T extends { id: string }>(arr: T[], id: string): T {
  return arr.find((s) => s.id === id) ?? arr[0]
}

function Excerpt({ sec }: { sec: { title: string; kicker?: string; paragraphs: string[] } }) {
  return (
    <div>
      {sec.kicker && <Kicker>{sec.kicker}</Kicker>}
      <h3 className="mt-2 font-serif text-2xl text-heading">{sec.title}</h3>
      <div className="report-prose mt-4">
        {sec.paragraphs.slice(0, 2).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <Link to="/sample" className="mt-4 inline-flex items-center gap-1 font-sans text-sm font-semibold text-sindoor hover:underline">
        Read the full sample report <ArrowRight size={14} />
      </Link>
    </div>
  )
}
