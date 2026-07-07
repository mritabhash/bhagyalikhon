import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { PageHero } from './_shared'
import { Reveal, Kicker } from '../components/ui'
import { useStore } from '../lib/store'
import { formatLongDate, firstName, cn } from '../lib/utils'

function Toggle({ on, onChange, label, hint }: { on: boolean; onChange: (v: boolean) => void; label: string; hint: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="font-sans font-semibold text-ink">{label}</p>
        <p className="mt-0.5 font-sans text-sm text-ink-muted">{hint}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => onChange(!on)}
        className={cn('relative h-7 w-12 shrink-0 rounded-full border transition-colors duration-300 cursor-pointer', on ? 'border-sindoor bg-sindoor' : 'border-parchment bg-parchment/60')}
      >
        <span className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-paper shadow transition-all duration-300', on ? 'left-6' : 'left-0.5')} />
      </button>
    </div>
  )
}

export default function Settings() {
  const { prefs, setPrefs, history, removeFromHistory, clearHistory } = useStore()
  return (
    <div className="min-h-screen pb-10">
      <PageHero kicker="Preferences" title="Shape the experience" intro="Bhagyalikhon should feel the way you want it to. Adjust motion, atmosphere, and manage the readings kept privately on this device." />
      <div className="container-page grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="card-paper p-7">
            <Kicker>Motion &amp; atmosphere</Kicker>
            <div className="mt-3 divide-y divide-parchment/70">
              <Toggle on={prefs.motion === 'full'} onChange={(v) => setPrefs({ motion: v ? 'full' : 'reduced' })} label="Cinematic motion" hint="Palm drift, scroll reveals, and ink transitions. Turn off for a calmer, still experience." />
              <Toggle on={prefs.cursorGlow} onChange={(v) => setPrefs({ cursorGlow: v })} label="Candle-glow cursor" hint="A soft warm glow that follows your pointer on desktop." />
              <Toggle on={prefs.particles} onChange={(v) => setPrefs({ particles: v })} label="Floating marigold" hint="Occasional drifting petals in key sections. Subtle by design." />
              <div className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="font-sans font-semibold text-ink">Report typeface</p>
                  <p className="mt-0.5 font-sans text-sm text-ink-muted">How the long readings are set.</p>
                </div>
                <div className="flex overflow-hidden rounded-full border border-parchment">
                  {(['serif', 'sans'] as const).map((f) => (
                    <button key={f} type="button" onClick={() => setPrefs({ reportFont: f })} className={cn('px-4 py-2 text-sm font-semibold capitalize transition-colors cursor-pointer', prefs.reportFont === f ? 'bg-sindoor text-paper' : 'text-ink-soft hover:bg-ivory')}>{f}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card-paper p-7">
            <div className="flex items-center justify-between">
              <Kicker>Your readings</Kicker>
              {history.length > 0 && (
                <button type="button" onClick={clearHistory} className="font-sans text-xs font-semibold text-alta hover:text-sindoor cursor-pointer">Clear all</button>
              )}
            </div>
            {history.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-parchment bg-ivory/40 p-8 text-center">
                <p className="font-report text-ink-soft">No readings saved yet. Your generated readings will appear here, kept only on this device.</p>
                <Link to="/combined" className="mt-3 inline-block font-sans text-sm font-semibold text-sindoor hover:underline">Create your first reading →</Link>
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {history.map((r) => (
                  <li key={r.id} className="flex items-center justify-between gap-3 rounded-2xl border border-parchment bg-paper-50 p-4">
                    <div>
                      <p className="font-serif text-lg text-heading">{firstName(r.input.fullName)}’s reading</p>
                      <p className="font-sans text-xs text-ink-muted">{formatLongDate(r.input.dob)} · Life Path {r.chart.lifePath.value} · {new Date(r.createdAt).toLocaleDateString()}</p>
                    </div>
                    <button type="button" onClick={() => removeFromHistory(r.id)} aria-label="Delete reading" className="grid h-9 w-9 place-items-center rounded-full border border-parchment text-alta hover:bg-alta/10 cursor-pointer"><Trash2 size={15} /></button>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-5 font-sans text-xs text-ink-muted">Readings and preferences are stored only in this browser. See <Link to="/privacy" className="text-sindoor hover:underline">Privacy</Link> for details.</p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
