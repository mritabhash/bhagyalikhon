import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Sparkles, ChevronDown } from 'lucide-react'
import { PageHero } from './_shared'
import { Reveal, Kicker, Button, Field, Input, NumberTile, Tabs, buttonClass } from '../components/ui'
import { AlponaDivider, InkStroke } from '../components/ornaments'
import { PalmRefine, HAND_CHOICES } from '../components/refine'
import { ChoiceGroup } from '../components/ui'
import { ReadingLoader } from '../components/loader'
import { ReportView, DownloadPdfButton, PrintDocument, ReportCover } from '../components/report'
import { useStore } from '../lib/store'
import { generateFullReading } from '../lib/readings'
import type { NumerologyChart, FullReading, Hand } from '../lib/types'
import { uid, wordCount, cn } from '../lib/utils'
import { Link } from 'react-router-dom'

type Phase = 'form' | 'loading' | 'result'

export default function Combined() {
  const { draft, setDraft, addToHistory } = useStore()
  const [phase, setPhase] = useState<Phase>('form')
  const [chart, setChart] = useState<NumerologyChart | null>(null)
  const [reading, setReading] = useState<FullReading | null>(null)
  const [showRefine, setShowRefine] = useState(false)
  const year = new Date().getFullYear()

  const canGo = draft.fullName.trim().length > 1 && /^\d{4}-\d{2}-\d{2}$/.test(draft.dob)

  const finish = () => {
    const { chart: c, reading: r } = generateFullReading({ ...draft, currentYear: year })
    setChart(c)
    setReading(r)
    setPhase('result')
    addToHistory({
      id: uid('comb'),
      createdAt: Date.now(),
      input: { ...draft, currentYear: year },
      chart: c,
      wordCounts: { palm: wordCount(r.palm), numerology: wordCount(r.numerology), combined: wordCount(r.combined) },
    })
  }

  const cores = chart
    ? [chart.lifePath, chart.expression, chart.soulUrge, chart.personality, chart.personalYear]
    : []

  return (
    <div className="min-h-screen pb-10">
      <AnimatePresence>
        {phase === 'loading' && <ReadingLoader duration={4200} onDone={finish} />}
      </AnimatePresence>

      <PageHero
        kicker="Combined Reading · the core experience"
        title="Two systems, one pattern"
        intro="Here the hand and the numbers are read together — not side by side, but woven into a single portrait that names where they agree, where they pull apart, and what quietly repeats across both."
      />

      {phase !== 'result' && (
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl">
            <div className="card-paper p-7 sm:p-9">
              <Kicker>Begin your reading</Kicker>
              <h2 className="mt-3 font-serif text-2xl text-heading">Your name, date &amp; hand</h2>
              <div className="mt-6 grid gap-4">
                <Field label="Full birth name" htmlFor="cfn">
                  <Input id="cfn" value={draft.fullName} onChange={(e) => setDraft({ fullName: e.target.value })} placeholder="e.g. Anjali Sharma" autoComplete="name" />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Date of birth" htmlFor="cdob">
                    <Input id="cdob" type="date" value={draft.dob} onChange={(e) => setDraft({ dob: e.target.value })} />
                  </Field>
                  <Field label="Preferred name" optional htmlFor="cpn">
                    <Input id="cpn" value={draft.preferredName} onChange={(e) => setDraft({ preferredName: e.target.value })} placeholder="what you go by" />
                  </Field>
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-2 font-sans text-sm font-semibold text-ink">Which hand feels most like you?</p>
                <ChoiceGroup options={HAND_CHOICES} value={draft.hand} onChange={(v) => setDraft({ hand: v as Hand })} columns={3} />
              </div>

              <button
                type="button"
                onClick={() => setShowRefine((s) => !s)}
                className="mt-6 flex w-full items-center justify-between rounded-2xl border border-parchment bg-ivory/50 px-5 py-3.5 text-left transition-colors hover:bg-ivory cursor-pointer"
              >
                <span>
                  <span className="block font-sans font-semibold text-ink">Refine your palm reading</span>
                  <span className="font-sans text-sm text-ink-muted">Optional — match the line types to your own hand for a more personal reading.</span>
                </span>
                <ChevronDown size={20} className={cn('shrink-0 text-sindoor transition-transform', showRefine && 'rotate-180')} />
              </button>

              {showRefine && (
                <div className="mt-5 border-t border-parchment pt-6">
                  <PalmRefine palm={draft.palm} onChange={(p) => setDraft({ palm: { ...draft.palm, ...p } })} />
                </div>
              )}

              <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs font-sans text-sm text-ink-muted">We calculate your numbers precisely and read them beside your palm indicators.</p>
                <Button onClick={() => setPhase('loading')} disabled={!canGo} size="lg">
                  <Sparkles size={16} /> Reveal my pattern
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      )}

      {phase === 'result' && chart && reading && (
        <div className="container-page">
          <ReportCover input={{ ...draft, currentYear: year }} chart={chart} kind="Combined Life Pattern" />

          <Reveal className="mt-14 text-center">
            <Kicker className="justify-center">At a glance</Kicker>
            <h2 className="mt-3 font-serif text-3xl text-heading">Your central numbers</h2>
            <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-6">
              {cores.map((r) => (
                <NumberTile key={r.key} value={r.value} label={r.label} master={r.isMaster} karmic={r.karmicDebt} />
              ))}
            </div>
          </Reveal>

          <AlponaDivider className="my-14" />

          <Reveal className="text-center">
            <Kicker className="justify-center">Your reading</Kicker>
            <h2 className="mt-3 font-serif text-3xl text-heading sm:text-4xl">The woven pattern</h2>
            <p className="mx-auto mt-3 max-w-xl font-report text-ink-soft">Begin with the combined synthesis, then explore each system on its own. Every word is generated from your name, date, and palm indicators.</p>
            <InkStroke className="mx-auto mt-4" />
          </Reveal>

          <div className="mx-auto mt-10 max-w-4xl">
            <Tabs
              tabs={[
                { id: 'combined', label: 'Combined Pattern', content: <ReportView sections={reading.combined} /> },
                { id: 'palm', label: 'Palm Reading', content: <ReportView sections={reading.palm} /> },
                { id: 'numerology', label: 'Numerology', content: <ReportView sections={reading.numerology} /> },
              ]}
            />
          </div>

          <div className="no-print mt-8 flex flex-wrap items-center justify-center gap-3">
            <DownloadPdfButton name={draft.fullName} label="Download full PDF" />
            <Button variant="ghost" onClick={() => setPhase('form')}>Edit details</Button>
            <Link to="/sample" className={cn(buttonClass('secondary', 'md'))}>See a sample</Link>
          </div>

          <PrintDocument input={{ ...draft, currentYear: year }} chart={chart} reading={reading} />
        </div>
      )}
    </div>
  )
}
