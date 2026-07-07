import { Link } from 'react-router-dom'
import { PageHero, Prose } from './_shared'
import { Reveal, Kicker, buttonClass } from '../components/ui'
import { AlponaDivider, InkStroke } from '../components/ornaments'
import { PalmArt } from '../components/palm'
import { cn } from '../lib/utils'

const BLOCKS = [
  {
    kicker: 'The hand',
    title: 'Palm Reading Method',
    body: 'Palmistry reads the hand as a whole before any single line. We consider the overall palm shape and elemental type, the length of the fingers and strength of the thumb, then the major and minor lines and the mounts — the soft rises named for the old planets.',
    points: ['Palm shape & elemental type', 'Finger length & thumb strength', 'Life, Head & Heart lines', 'Fate, Sun & Mercury lines', 'The mounts of the palm', 'Line depth, curve, breaks & balance'],
  },
  {
    kicker: 'The numbers',
    title: 'Numerology Method',
    body: 'We use the Pythagorean system, converting the letters of your full name and the digits of your birth date into numbers, then reducing them to a single digit — preserving the master numbers 11, 22 and 33, and noting the karmic-debt numbers 13, 14, 16 and 19 where they appear.',
    points: ['Life Path & Birthday', 'Expression / Destiny', 'Soul Urge & Personality', 'Maturity & Personal Year', 'Master numbers 11 · 22 · 33', 'Karmic debts 13 · 14 · 16 · 19'],
  },
  {
    kicker: 'The pattern',
    title: 'Combined Method',
    body: 'The combined reading does not simply place the two side by side; it looks for repeated themes between the hand and the numbers. Where both point the same way, the theme is emphasised. Where they differ, it is named as an inner tension — gently, and without alarm.',
    points: ['Head Line + Expression → creative thinking', 'Fate Line + Life Path → long-term discipline', 'Heart Line + Soul Urge → emotional depth', 'Agreements read as signatures', 'Differences read as inner tensions', 'A single, synthesised portrait'],
  },
]

export default function Method() {
  return (
    <div className="min-h-screen pb-10">
      <PageHero
        kicker="How the reading works"
        title="Two old languages, read with care"
        intro="Bhagyalikhon draws on two traditional systems — the map of the hand and the pattern of the numbers — and reads them together. Here is exactly how, and what it is and is not."
      />
      <div className="container-page grid gap-8 lg:grid-cols-3">
        {BLOCKS.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.08}>
            <div className="card-paper h-full p-7">
              <Kicker>{b.kicker}</Kicker>
              <h2 className="mt-3 font-serif text-2xl text-heading">{b.title}</h2>
              <InkStroke className="mt-3" />
              <p className="mt-4 font-report leading-relaxed text-ink-soft">{b.body}</p>
              <ul className="mt-5 space-y-2">
                {b.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 font-sans text-sm text-ink">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-marigold" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <AlponaDivider className="my-16" />

      <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <Reveal className="order-2 lg:order-1">
          <Kicker>What this is — and is not</Kicker>
          <h2 className="mt-3 font-serif text-3xl text-heading">Offered for reflection, not prediction</h2>
          <Prose className="mt-5 max-w-none">
            <p>This is a spiritual, cultural, and traditional experience for reflection and self-understanding. It is a mirror to think beside — warm, symbolic, and human.</p>
            <p>It is <strong>not</strong> a medical, legal, financial, or psychological diagnosis, and it makes no scientific claims and no guaranteed predictions. The language stays reflective on purpose: <em>this may suggest</em>, <em>this traditionally points toward</em>. Your choices, not your lines or numbers, write your life.</p>
          </Prose>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/combined" className={buttonClass('primary')}>Begin a Reading</Link>
            <Link to="/sample" className={cn(buttonClass('secondary'))}>See a Sample</Link>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="order-1 flex justify-center lg:order-2">
          <div className="relative">
            <div className="absolute inset-0 -z-10 bg-candle-glow blur-2xl" />
            <PalmArt className="h-[24rem] w-auto" />
          </div>
        </Reveal>
      </div>
    </div>
  )
}
