import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { PageHero } from './_shared'
import { Reveal, Kicker, Button, Field, Input, NumberTile } from '../components/ui'
import { AlponaDivider, InkStroke } from '../components/ornaments'
import { ReadingLoader } from '../components/loader'
import { ReportView, DownloadPdfButton, PrintDocument, ReportCover } from '../components/report'
import { useStore } from '../lib/store'
import { buildChart } from '../lib/numerology'
import { generateNumerologyReading } from '../lib/readings'
import type { NumerologyChart, ReadingSection } from '../lib/types'
import { uid, wordCount } from '../lib/utils'

type Phase = 'form' | 'loading' | 'result'

function StepList({ steps }: { steps: { label: string; expression: string; value: number }[] }) {
  if (!steps.length) return null
  return (
    <ol className="mt-3 space-y-1.5">
      {steps.map((st, i) => (
        <li key={i} className="flex items-center gap-2 font-sans text-sm text-ink-soft">
          <span className="text-xs text-ink-muted">{st.label}</span>
          <span className="font-report text-ink">{st.expression}</span>
          <span className="text-ink-muted">=</span>
          <span className="font-serif font-semibold text-ritual">{st.value}</span>
        </li>
      ))}
    </ol>
  )
}

export default function Numerology() {
  const { draft, setDraft, addToHistory } = useStore()
  const [phase, setPhase] = useState<Phase>('form')
  const [chart, setChart] = useState<NumerologyChart | null>(null)
  const [sections, setSections] = useState<ReadingSection[]>([])
  const year = new Date().getFullYear()

  const canGo = draft.fullName.trim().length > 1 && /^\d{4}-\d{2}-\d{2}$/.test(draft.dob)

  const generate = () => {
    setPhase('loading')
  }
  const finish = () => {
    const c = buildChart(draft.fullName, draft.dob, year)
    const secs = generateNumerologyReading({ ...draft, currentYear: year }, c)
    setChart(c)
    setSections(secs)
    setPhase('result')
    addToHistory({
      id: uid('num'),
      createdAt: Date.now(),
      input: { ...draft, currentYear: year },
      chart: c,
      wordCounts: { palm: 0, numerology: wordCount(secs), combined: 0 },
    })
  }

  const cores = chart
    ? [
        { r: chart.lifePath, sub: 'from your birth date' },
        { r: chart.expression, sub: 'from your full name' },
        { r: chart.soulUrge, sub: 'from the vowels' },
        { r: chart.personality, sub: 'from the consonants' },
        { r: chart.birthday, sub: 'from your birth day' },
        { r: chart.maturity, sub: 'life path + expression' },
        { r: chart.personalYear, sub: `your ${year} cycle` },
      ]
    : []

  return (
    <div className="min-h-screen pb-10">
      <AnimatePresence>
        {phase === 'loading' && (
          <ReadingLoader steps={['Reading your name', 'Summoning the numbers', 'Reducing to their essence', 'Preparing your chart']} duration={3200} onDone={finish} />
        )}
      </AnimatePresence>

      <PageHero
        kicker="Numerology"
        title="The numbers beneath your name"
        intro="Your full name and birth date resolve, through the Pythagorean system, into a small constellation of numbers — each describing a different layer of you. Enter them below and watch the calculation unfold."
      />

      {phase !== 'result' && (
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl">
            <div className="card-paper p-7 sm:p-9">
              <Kicker>Your details</Kicker>
              <h2 className="mt-3 font-serif text-2xl text-heading">Enter your name &amp; birth date</h2>
              <p className="mt-2 font-report text-ink-soft">Use your full birth name — the one written when you were born — for the traditional calculation.</p>
              <div className="mt-6 grid gap-4">
                <Field label="Full birth name" htmlFor="fn">
                  <Input id="fn" value={draft.fullName} onChange={(e) => setDraft({ fullName: e.target.value })} placeholder="e.g. Anjali Sharma" autoComplete="name" />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Date of birth" htmlFor="dob">
                    <Input id="dob" type="date" value={draft.dob} onChange={(e) => setDraft({ dob: e.target.value })} />
                  </Field>
                  <Field label="Preferred name" optional htmlFor="pn">
                    <Input id="pn" value={draft.preferredName} onChange={(e) => setDraft({ preferredName: e.target.value })} placeholder="what you go by" />
                  </Field>
                </div>
                <Field label="Gender" optional htmlFor="g" hint="Never required — included only if you wish it noted.">
                  <Input id="g" value={draft.gender} onChange={(e) => setDraft({ gender: e.target.value })} placeholder="optional" />
                </Field>
              </div>
              <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-sans text-sm text-ink-muted">Current year auto-detected: <span className="font-semibold text-ritual">{year}</span></p>
                <Button onClick={generate} disabled={!canGo} magnetic>
                  <Sparkles size={16} /> Reveal my numbers
                </Button>
              </div>
              {!canGo && (draft.fullName || draft.dob) && (
                <p className="mt-3 font-sans text-xs text-alta">Please enter your full name and a valid date of birth to continue.</p>
              )}
            </div>
          </Reveal>
        </div>
      )}

      {phase === 'result' && chart && (
        <div className="container-page">
          <ReportCover input={{ ...draft, currentYear: year }} chart={chart} kind="Numerology Reading" />

          <Reveal className="mt-14 text-center">
            <Kicker className="justify-center">Your core numbers</Kicker>
            <h2 className="mt-3 font-serif text-3xl text-heading">The shape of your chart</h2>
            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 justify-items-center gap-6 sm:grid-cols-4">
              {cores.map(({ r, sub }) => (
                <NumberTile key={r.key} value={r.value} label={r.label} sub={sub} master={r.isMaster} karmic={r.karmicDebt} />
              ))}
            </div>
          </Reveal>

          <AlponaDivider className="my-14" />

          <Reveal>
            <div className="text-center">
              <Kicker className="justify-center">Step by step</Kicker>
              <h2 className="mt-3 font-serif text-3xl text-heading">How each number is found</h2>
              <p className="mx-auto mt-3 max-w-xl font-report text-ink-soft">Every value is reduced to a single digit, preserving the master numbers 11, 22 and 33. Here is the working, kept visible.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {cores.map(({ r }) => (
                <div key={r.key} className="rounded-2xl border border-parchment bg-paper-50 p-5 shadow-paper">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif text-lg text-heading">{r.label}</p>
                      <p className="font-sans text-xs text-ink-muted">raw total {r.rawTotal}{r.karmicDebt ? ` · karmic ${r.karmicDebt}` : ''}</p>
                    </div>
                    <NumberTile value={r.value} size="sm" master={r.isMaster} />
                  </div>
                  <StepList steps={r.steps} />
                </div>
              ))}
            </div>
          </Reveal>

          <AlponaDivider className="my-14" />

          <Reveal className="text-center">
            <Kicker className="justify-center">Your reading</Kicker>
            <h2 className="mt-3 font-serif text-3xl text-heading">What the numbers say</h2>
            <InkStroke className="mx-auto mt-3" />
          </Reveal>
          <div className="mt-10">
            <ReportView sections={sections} />
          </div>

          <div className="no-print mt-6 flex flex-wrap items-center justify-center gap-3">
            <DownloadPdfButton name={draft.fullName} />
            <Button variant="ghost" onClick={() => setPhase('form')}>Edit details</Button>
          </div>

          <PrintDocument input={{ ...draft, currentYear: year }} chart={chart} reading={{ palm: [], numerology: sections, combined: [] }} />
        </div>
      )}
    </div>
  )
}
