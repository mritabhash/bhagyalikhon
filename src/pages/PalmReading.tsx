import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Sun, Sparkles } from 'lucide-react'
import { PageHero } from './_shared'
import { Reveal, Kicker, Button, StepDots, ChoiceGroup, NumberTile, buttonClass } from '../components/ui'
import { AlponaDivider, InkStroke } from '../components/ornaments'
import { PalmRefine, HAND_CHOICES } from '../components/refine'
import { FileDrop, QualityCheck } from '../components/upload'
import { PalmLineViewer, PALM_LINES, MINOR_LINES } from '../components/palm'
import { ReportView, DownloadPdfButton, PrintDocument, ReportCover } from '../components/report'
import { ReadingLoader } from '../components/loader'
import { useStore } from '../lib/store'
import { generateFullReading } from '../lib/readings'
import type { Hand, NumerologyChart, FullReading } from '../lib/types'
import { uid, wordCount } from '../lib/utils'

const ALL_LINES = [...PALM_LINES, ...MINOR_LINES]
const LINE_BLURB: Record<string, string> = {
  life: 'Vitality, grounding, and the rhythm at which you meet the world — not length of years, but energy and resilience.',
  head: 'How your mind moves — learning style, focus, and the balance of logic and imagination in your decisions.',
  heart: 'Your emotional weather — how you attach, express affection, and hold or share what you feel.',
  fate: 'Your relationship with direction and responsibility — the thread of purpose running through your working life.',
  sun: 'Creativity, confidence, and your relationship with being seen — the warmth others notice and remember.',
  mercury: 'Communication, business instinct, and social intelligence — a quick read of people and exchange.',
  marriage: 'Union lines near the edge of the palm, traditionally linked to significant bonds and partnership.',
  bracelet: 'The rascettes at the wrist, read in tradition as markers of wellbeing and life’s broad chapters.',
}
const GUIDE = ['Use soft, natural light', 'Keep the palm open and relaxed', 'Show the full palm and fingers', 'Avoid harsh shadows and blur', 'Use a plain background', 'Remove rings if you can']
const STEPS = ['Hand', 'Upload', 'Quality', 'Lines', 'Refine', 'Report']

export default function PalmReading() {
  const { draft, setDraft, addToHistory } = useStore()
  const [step, setStep] = useState(0)
  const [image, setImage] = useState<string | null>(null)
  const [activeLine, setActiveLine] = useState<string | null>('life')
  const [generating, setGenerating] = useState(false)
  const [chart, setChart] = useState<NumerologyChart | null>(null)
  const [reading, setReading] = useState<FullReading | null>(null)
  const year = new Date().getFullYear()

  // auto-cycle the highlighted line during the reveal step
  useEffect(() => {
    if (step !== 3) return
    const id = window.setInterval(() => {
      setActiveLine((cur) => {
        const idx = ALL_LINES.findIndex((l) => l.id === cur)
        return ALL_LINES[(idx + 1) % ALL_LINES.length].id
      })
    }, 2600)
    return () => window.clearInterval(id)
  }, [step])

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1))
  const back = () => setStep((s) => Math.max(0, s - 1))

  const finish = () => {
    const hasDob = /^\d{4}-\d{2}-\d{2}$/.test(draft.dob)
    const input = { ...draft, imageProvided: !!image, currentYear: year, fullName: draft.fullName || 'Friend', dob: hasDob ? draft.dob : '1990-01-01' }
    const { chart: c, reading: r } = generateFullReading(input)
    setChart(c)
    setReading(r)
    setGenerating(false)
    setStep(5)
    addToHistory({ id: uid('palm'), createdAt: Date.now(), input, chart: c, wordCounts: { palm: wordCount(r.palm), numerology: wordCount(r.numerology), combined: wordCount(r.combined) } })
  }

  const activeInfo = ALL_LINES.find((l) => l.id === activeLine)

  return (
    <div className="min-h-screen pb-10">
      <AnimatePresence>{generating && <ReadingLoader duration={4000} onDone={finish} />}</AnimatePresence>

      <PageHero
        kicker="Palm Reading"
        title="The reading begins with your hand"
        intro="A gentle, guided ritual: choose a hand, share a photo if you like, watch the lines reveal themselves, then refine the reading until it feels like yours."
        divider={false}
      />

      {step < 5 && (
        <div className="container-page">
          <div className="mb-12"><StepDots steps={STEPS} current={step} /></div>
          <Reveal className="mx-auto max-w-4xl">
            <div className="card-paper p-6 sm:p-9">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>

                  {step === 0 && (
                    <div>
                      <Kicker>Step one · the hand</Kicker>
                      <h2 className="mt-3 font-serif text-2xl text-heading sm:text-3xl">Choose the hand to read</h2>
                      <p className="mt-3 max-w-2xl font-report text-ink-soft">In tradition, the <strong className="text-ritual">left</strong> can show inherited tendencies and inner patterns; the <strong className="text-ritual">right</strong>, active choices and your current direction; and <strong className="text-ritual">both</strong> together give a fuller, more layered reading.</p>
                      <div className="mt-6"><ChoiceGroup options={HAND_CHOICES} value={draft.hand} onChange={(v) => setDraft({ hand: v as Hand })} columns={3} /></div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
                      <div>
                        <Kicker>Step two · the photo</Kicker>
                        <h2 className="mt-3 font-serif text-2xl text-heading sm:text-3xl">Share a photo of your palm</h2>
                        <p className="mt-3 font-report text-ink-soft">Optional, but it makes the line-reveal more personal. Your image never leaves your device.</p>
                        <div className="mt-5">
                          <FileDrop preview={image} onFile={(_f, url) => { setImage(url); setDraft({ imageProvided: true }) }} onClear={() => { setImage(null); setDraft({ imageProvided: false }) }} />
                        </div>
                      </div>
                      <div className="rounded-2xl border border-parchment bg-ivory/50 p-6">
                        <div className="flex items-center gap-2 text-sindoor"><Sun size={16} /><span className="font-sans text-sm font-bold uppercase tracking-wide2">For the clearest reading</span></div>
                        <ul className="mt-4 space-y-2.5">
                          {GUIDE.map((g) => (
                            <li key={g} className="flex items-start gap-2 font-sans text-sm text-ink"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-marigold" />{g}</li>
                          ))}
                        </ul>
                        <p className="mt-5 border-t border-parchment pt-4 font-report text-sm text-ink-muted">No photo handy? You can still continue — you’ll refine the reading by hand in a moment.</p>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid gap-8 lg:grid-cols-2">
                      <div>
                        <Kicker>Step three · quality</Kicker>
                        <h2 className="mt-3 font-serif text-2xl text-heading sm:text-3xl">A gentle quality check</h2>
                        <p className="mt-3 font-report text-ink-soft">A simple, honest look at your photo — not a scientific verdict, just a sense of whether the major lines will read clearly.</p>
                        {image ? (
                          <div className="mt-6"><QualityCheck dataUrl={image} /></div>
                        ) : (
                          <p className="mt-6 rounded-2xl border border-dashed border-parchment bg-ivory/40 p-6 font-report text-ink-muted">No photo uploaded — and that is perfectly fine. Continue, and you’ll shape the reading by choosing the line types that match your hand.</p>
                        )}
                      </div>
                      <div className="mx-auto w-full max-w-xs">
                        <PalmLineViewer src={image} active={null} showMinor={false} />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="grid items-center gap-8 lg:grid-cols-2">
                      <div className="mx-auto w-full max-w-sm">
                        <PalmLineViewer src={image} active={activeLine} onLineClick={setActiveLine} />
                      </div>
                      <div>
                        <Kicker>Step four · the lines</Kicker>
                        <h2 className="mt-3 font-serif text-2xl text-heading sm:text-3xl">Watch the lines reveal</h2>
                        <p className="mt-3 font-report text-ink-soft">Each line glows in turn over your palm. Tap any line — on the image or below — to hold and read it.</p>
                        <div className="mt-6 min-h-[9.5rem] rounded-2xl border border-parchment bg-ivory/50 p-6">
                          <AnimatePresence mode="wait">
                            <motion.div key={activeLine ?? 'none'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                              <span className="font-serif text-xl" style={{ color: activeInfo?.color }}>{activeInfo?.label}</span>
                              <p className="mt-2 font-report leading-relaxed text-ink-soft">{activeLine ? LINE_BLURB[activeLine] : ''}</p>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {ALL_LINES.map((l) => (
                            <button key={l.id} type="button" onClick={() => setActiveLine(l.id)} className={`rounded-full border px-3 py-1.5 font-sans text-xs font-semibold transition-colors cursor-pointer ${activeLine === l.id ? 'border-sindoor bg-sindoor text-paper' : 'border-parchment bg-paper-50 text-ink-soft hover:border-marigold'}`}>{l.label}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      <Kicker>Step five · refine</Kicker>
                      <h2 className="mt-3 font-serif text-2xl text-heading sm:text-3xl">Refine your reading</h2>
                      <p className="mt-3 max-w-2xl font-report text-ink-soft">Match each feature to your own hand. Every choice shapes the words of your report — this is what makes the reading personal rather than generic. Defaults are fine if you’re unsure.</p>
                      <div className="mt-6"><PalmRefine palm={draft.palm} onChange={(p) => setDraft({ palm: { ...draft.palm, ...p } })} /></div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between border-t border-parchment pt-6">
                <Button variant="ghost" onClick={back} disabled={step === 0} magnetic={false}><ArrowLeft size={16} /> Back</Button>
                {step < 4 ? (
                  <Button onClick={next}>Continue <ArrowRight size={16} /></Button>
                ) : (
                  <Button onClick={() => setGenerating(true)} size="lg"><Sparkles size={16} /> Generate my reading</Button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      )}

      {step === 5 && chart && reading && (
        <div className="container-page">
          <ReportCover input={{ ...draft, fullName: draft.fullName || 'Friend', currentYear: year }} chart={chart} kind="Palm Reading" />

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.4fr]">
            <div className="self-start lg:sticky lg:top-24">
              <PalmLineViewer src={image} active={activeLine} onLineClick={setActiveLine} showMinor />
              <p className="mt-3 text-center font-sans text-xs text-ink-muted">Tap a line to revisit it while you read.</p>
            </div>
            <div>
              <ReportView sections={reading.palm} />
            </div>
          </div>

          <AlponaDivider className="my-14" />

          <Reveal className="mx-auto max-w-2xl text-center">
            <NumberTile value={chart.lifePath.value} label="Your Life Path" master={chart.lifePath.isMaster} className="mx-auto" />
            <h3 className="mt-6 font-serif text-2xl text-heading">Your palm is half the pattern</h3>
            <p className="mt-3 font-report text-ink-soft">Add your name and birth date, and Bhagyalikhon reads your numbers beside these lines — naming where they agree, and where they gently pull apart.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/combined" className={buttonClass('primary')}>See the combined reading</Link>
              <DownloadPdfButton name={draft.fullName} label="Download PDF" />
            </div>
          </Reveal>

          <div className="no-print mt-8 text-center">
            <Button variant="ghost" onClick={() => { setStep(0) }}>Start a new palm reading</Button>
          </div>

          <PrintDocument input={{ ...draft, fullName: draft.fullName || 'Friend', currentYear: year }} chart={chart} reading={reading} />
        </div>
      )}
    </div>
  )
}
