import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { PageHero } from './_shared'
import { Reveal, Kicker, buttonClass } from '../components/ui'
import { AlponaCorner } from '../components/ornaments'
import { cn } from '../lib/utils'

const INCLUDED = [
  'Full palm reading (16 detailed sections)',
  'Complete Pythagorean numerology chart',
  'Combined life-pattern synthesis',
  'Step-by-step calculation breakdown',
  'Premium downloadable PDF report',
  'Private — everything stays on your device',
]

export default function Access() {
  return (
    <div className="min-h-screen pb-10">
      <PageHero
        kicker="Access"
        title="Freely offered, while the lamp is lit"
        intro="Bhagyalikhon is currently open as a full, free demo. Every reading — palm, numerology, and the combined pattern — is available in its complete, detailed form. No account, no payment, no catch."
      />
      <div className="container-page grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.6rem] border border-gold-antique/50 bg-paper-50 p-8 shadow-paper-lg sm:p-10">
            <AlponaCorner className="absolute right-4 top-4 -scale-x-100" />
            <Kicker>Complete reading</Kicker>
            <div className="mt-4 flex items-end gap-3">
              <span className="font-serif text-6xl text-heading">Free</span>
              <span className="mb-2 font-sans text-sm text-ink-muted">demo access · full depth</span>
            </div>
            <ul className="mt-7 space-y-3">
              {INCLUDED.map((f) => (
                <li key={f} className="flex items-start gap-3 font-sans text-ink">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-marigold/20 text-ritual"><Check size={13} /></span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/combined" className={buttonClass('primary', 'lg')}>Start Your Reading</Link>
              <Link to="/sample" className={cn(buttonClass('secondary', 'lg'))}>View Sample</Link>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="card-paper h-full p-8">
            <Kicker>The spirit of it</Kicker>
            <h2 className="mt-3 font-serif text-2xl text-heading">Why free, for now</h2>
            <div className="report-prose mt-4">
              <p>Some traditions are meant to be shared before they are sold. Bhagyalikhon is young, and while the lamp is lit we would rather you simply experience the reading in full.</p>
              <p>If a hosted version arrives later — one that saves your readings across devices — it will be offered transparently, with clear consent, and this demo will remain honest about what it is.</p>
            </div>
            <div className="mt-6 rounded-2xl border border-parchment bg-ivory/60 p-5">
              <p className="font-report text-sm text-ink-soft">A gentle reminder: these readings are for reflection and cultural tradition — not medical, legal, or financial advice, and not a prediction of your future.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
