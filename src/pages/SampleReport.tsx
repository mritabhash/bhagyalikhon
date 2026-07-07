import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from './_shared'
import { Reveal, Kicker, NumberTile, Tabs, Accordion, buttonClass } from '../components/ui'
import { AlponaDivider, InkStroke, AlponaCorner } from '../components/ornaments'
import { ReportView, DownloadPdfButton, PrintDocument, ReportCover } from '../components/report'
import { generateFullReading } from '../lib/readings'
import { SAMPLE_INPUT } from '../data/sampleReading'
import { cn } from '../lib/utils'

export default function SampleReport() {
  const { chart, reading } = useMemo(() => generateFullReading(SAMPLE_INPUT), [])
  const cores = [chart.lifePath, chart.expression, chart.soulUrge, chart.personality, chart.birthday, chart.personalYear]
  const highlight = reading.combined.filter((s) =>
    ['combined-strengths', 'combined-challenges', 'combined-career', 'combined-relationships', 'current-cycle', 'combined-guidance'].includes(s.id),
  )

  return (
    <div className="min-h-screen pb-10">
      <PageHero
        kicker="Sample Report · example data"
        title="See the depth before you begin"
        intro="This is a complete example reading for a fictional person, Ananya. It shows exactly how a Bhagyalikhon report is structured — long, layered, and yours to keep as a premium PDF."
      >
        <div className="flex flex-wrap justify-center gap-3">
          <DownloadPdfButton name={SAMPLE_INPUT.fullName} label="Download this sample" />
          <Link to="/combined" className={cn(buttonClass('primary'))}>Create your own</Link>
        </div>
      </PageHero>

      <div className="container-page">
        <ReportCover input={SAMPLE_INPUT} chart={chart} kind="Combined Life Pattern · Sample" />

        {/* Executive summary */}
        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-[1.4rem] border border-gold-antique/50 bg-ivory/60 p-8 shadow-paper sm:p-10">
            <AlponaCorner className="absolute right-3 top-3 -scale-x-100" />
            <Kicker>Executive summary</Kicker>
            <p className="mt-4 font-report text-lg leading-relaxed text-ink">{reading.combined[0].paragraphs[0]}</p>
            <p className="mt-3 font-report leading-relaxed text-ink-soft">{reading.combined[0].paragraphs[1]}</p>
          </div>
        </Reveal>

        {/* Chart tiles */}
        <Reveal className="mt-12 text-center">
          <Kicker className="justify-center">The chart</Kicker>
          <h2 className="mt-3 font-serif text-3xl text-heading">Ananya’s core numbers</h2>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-6">
            {cores.map((r) => (
              <NumberTile key={r.key} value={r.value} label={r.label} master={r.isMaster} karmic={r.karmicDebt} />
            ))}
          </div>
        </Reveal>

        <AlponaDivider className="my-14" />

        {/* Full report in tabs */}
        <Reveal className="text-center">
          <Kicker className="justify-center">The full reading</Kicker>
          <h2 className="mt-3 font-serif text-3xl text-heading sm:text-4xl">Every section, in full</h2>
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

        <AlponaDivider className="my-14" />

        {/* Highlighted accordion */}
        <Reveal className="mx-auto max-w-3xl">
          <div className="text-center">
            <Kicker className="justify-center">Quick glance</Kicker>
            <h2 className="mt-3 font-serif text-3xl text-heading">Strengths, challenges &amp; guidance</h2>
          </div>
          <div className="mt-8">
            <Accordion
              items={highlight.map((s) => ({
                id: s.id,
                title: s.title,
                kicker: s.kicker,
                content: (
                  <div className="report-prose">
                    {s.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                    {s.bullets && (
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {s.bullets.map((b, i) => (
                          <li key={i} className="rounded-xl border border-parchment bg-paper-50 p-3">
                            <span className="block font-serif text-ritual">{b.heading}</span>
                            <span className="text-sm text-ink-soft">{b.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ),
              }))}
            />
          </div>
        </Reveal>

        <div className="no-print mt-12 flex flex-wrap items-center justify-center gap-3">
          <DownloadPdfButton name={SAMPLE_INPUT.fullName} label="Download the sample PDF" />
          <Link to="/combined" className={cn(buttonClass('primary'))}>Begin your own reading</Link>
        </div>

        <p className="mt-6 text-center font-sans text-xs text-ink-muted">Sample data for illustration only. Readings are for reflection and cultural tradition, not prediction or professional advice.</p>

        <PrintDocument input={SAMPLE_INPUT} chart={chart} reading={reading} />
      </div>
    </div>
  )
}
