import type { ReadingSection, NumerologyChart, ReadingInput } from '../lib/types'
import { Reveal, Kicker } from './ui'
import { InkStroke, AlponaDivider, AlponaCorner, AlponaMandala } from './ornaments'
import { asset, formatLongDate, firstName } from '../lib/utils'

export function ReportSectionView({ section, showDivider = true }: { section: ReadingSection; showDivider?: boolean }) {
  return (
    <Reveal as="section" className="avoid-break scroll-mt-28" >
      <div id={section.id}>
        {section.kicker && <Kicker>{section.kicker}</Kicker>}
        <h3 className="mt-3 font-serif text-2xl leading-tight text-heading sm:text-[2rem]">{section.title}</h3>
        <InkStroke className="mt-3" />
        <div className="report-prose mt-5">
          {section.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {section.bullets && section.bullets.length > 0 && (
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {section.bullets.map((b, i) => (
              <li key={i} className="rounded-2xl border border-parchment bg-paper-50 p-4 shadow-paper">
                <span className="block font-serif text-lg text-ritual">{b.heading}</span>
                <span className="mt-1 block font-report text-[0.95rem] leading-relaxed text-ink-soft">{b.text}</span>
              </li>
            ))}
          </ul>
        )}
        {showDivider && <AlponaDivider className="my-12 opacity-80" />}
      </div>
    </Reveal>
  )
}

export function ReportView({ sections }: { sections: ReadingSection[] }) {
  return (
    <div>
      {sections.map((s, i) => (
        <ReportSectionView key={s.id} section={s} showDivider={i < sections.length - 1} />
      ))}
    </div>
  )
}

// Sticky in-page navigation for long reports
export function ReportNav({ sections, activeId }: { sections: ReadingSection[]; activeId?: string }) {
  return (
    <nav className="no-scrollbar sticky top-24 max-h-[70vh] space-y-1 overflow-y-auto">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`block rounded-lg px-3 py-1.5 font-sans text-sm transition-colors ${activeId === s.id ? 'bg-ivory text-sindoor' : 'text-ink-muted hover:text-ritual'}`}
        >
          {s.title}
        </a>
      ))}
    </nav>
  )
}

// Decorative report cover header used on report pages + print
export function ReportCover({ input, chart, kind }: { input: ReadingInput; chart?: NumerologyChart; kind: string }) {
  return (
    <div className="relative overflow-hidden rounded-[1.6rem] border border-gold-antique/50 bg-paper-50 p-8 text-center shadow-paper-lg sm:p-12">
      <AlponaCorner className="absolute left-3 top-3" />
      <AlponaCorner className="absolute right-3 top-3 -scale-x-100" />
      <AlponaCorner className="absolute bottom-3 left-3 -scale-y-100" />
      <AlponaCorner className="absolute bottom-3 right-3 -scale-100" />
      <Kicker className="justify-center">{kind}</Kicker>
      <h2 className="mt-4 font-serif text-3xl text-heading sm:text-4xl">{firstName(input.fullName)}’s Reading</h2>
      <p className="mt-2 font-report text-ink-soft">
        {input.fullName || 'Full name'} · born {formatLongDate(input.dob) || '—'}
      </p>
      {chart && (
        <p className="mt-1 font-sans text-sm text-ink-muted">
          Life Path {chart.lifePath.value} · Expression {chart.expression.value} · Soul Urge {chart.soulUrge.value}
        </p>
      )}
      <AlponaDivider className="mt-6" />
    </div>
  )
}

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button } from './ui'
import { Download } from 'lucide-react'
import type { FullReading } from '../lib/types'

export function DownloadPdfButton({ name, label = 'Download PDF', className }: { name?: string; label?: string; className?: string }) {
  const onClick = () => {
    const prev = document.title
    document.title = `Bhagyalikhon — ${name || 'Reading'}`
    window.print()
    window.setTimeout(() => (document.title = prev), 800)
  }
  return (
    <Button variant="secondary" onClick={onClick} className={className}>
      <Download size={16} /> {label}
    </Button>
  )
}

// ── Print-only ornaments: static copies of the site's motifs (framer-motion
// whileInView animations never fire on paper, so these must not animate) ──

// The lotus mark from the navbar wordmark
function PrintBrandMark({ size = 44 }: { size?: number }) {
  return (
    <span
      className="grid place-items-center rounded-full border border-[color:var(--gold-antique)] bg-[color:var(--ivory)]"
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2 C15 8 15 8 12 12 C9 8 9 8 12 2Z" stroke="var(--sindoor)" strokeWidth="1.3" />
        <path d="M4 12 C10 9 14 9 20 12 C14 15 10 15 4 12Z" stroke="var(--sindoor)" strokeWidth="1.3" />
        <circle cx="12" cy="12" r="2" fill="var(--marigold)" />
        <circle cx="12" cy="20" r="1.3" fill="var(--gold)" />
      </svg>
    </span>
  )
}

// Static version of AlponaDivider
function PrintDivider({ className, width = 380 }: { className?: string; width?: number }) {
  return (
    <div className={`flex justify-center ${className ?? ''}`} aria-hidden="true">
      <svg viewBox="0 0 460 44" width={width} className="max-w-full" fill="none">
        <path d="M40 22 H196" stroke="var(--gold-antique)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M264 22 H420" stroke="var(--gold-antique)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M40 22 C28 22 26 14 34 12 C40 11 41 18 34 18" stroke="var(--alta)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M420 22 C432 22 434 14 426 12 C420 11 419 18 426 18" stroke="var(--alta)" strokeWidth="1.4" strokeLinecap="round" />
        {[110, 350].map((x) => (
          <path key={x} d={`M${x} 22 c-8 -7 -8 7 0 0 c8 -7 8 7 0 0`} stroke="var(--marigold)" strokeWidth="1.2" />
        ))}
        <path d="M230 6 C244 22 244 22 230 38 C216 22 216 22 230 6 Z" stroke="var(--sindoor)" strokeWidth="1.5" />
        <path d="M206 22 C222 12 238 12 254 22 C238 32 222 32 206 22 Z" stroke="var(--sindoor)" strokeWidth="1.5" />
        <circle cx="230" cy="22" r="3.4" stroke="var(--gold)" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

// The illustrated palm with the matching line highlighted, shown beside each line section
const PRINT_LINE_ART: Record<string, string> = {
  lifeline: asset('/art/palm_life_line_highlighted.png'),
  headline: asset('/art/palm_head_line_highlighted.png'),
  heartline: asset('/art/palm_heart_line_highlighted.png'),
  fateline: asset('/art/palm_fate_line_highlighted.png'),
  sunline: asset('/art/palm_sun_line_highlighted.png'),
  mercuryline: asset('/art/palm_mercury_line_highlighted.png'),
}

function PrintPart({ title, sections }: { title: string; sections: ReadingSection[] }) {
  return (
    <section className="page-break pt-6">
      <div className="flex items-center justify-center gap-3">
        <PrintBrandMark size={34} />
        <p className="font-sans text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[color:var(--sindoor)]">Bhagyalikhon</p>
      </div>
      <h2 className="mt-3 text-center font-serif text-3xl text-[color:var(--heading)]">{title}</h2>
      <PrintDivider className="mt-3" width={300} />
      <div className="mt-8 space-y-7">
        {sections.map((s) => {
          const art = PRINT_LINE_ART[s.id]
          return (
            <div key={s.id} className="avoid-break">
              {art && (
                <img
                  src={art}
                  alt={`Illustrated palm with the ${s.title} highlighted`}
                  className="float-right mb-2 ml-5 w-[36mm] rounded-xl border border-[color:var(--parchment)]"
                />
              )}
              <h3 className="font-serif text-xl text-[color:var(--ritual)]">{s.title}</h3>
              <svg width="96" height="10" viewBox="0 0 120 12" fill="none" aria-hidden="true" className="mt-1">
                <path d="M2 6 C30 2 40 10 60 6 C80 2 92 10 118 6" stroke="var(--alta)" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="60" cy="6" r="2" fill="var(--marigold)" />
              </svg>
              <div className="mt-2 space-y-2 font-report text-[0.92rem] leading-relaxed text-[color:var(--ink)]">
                {s.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {s.bullets?.map((b, i) => (
                  <p key={`b${i}`}>
                    <strong className="text-[color:var(--ritual)]">{b.heading}:</strong> {b.text}
                  </p>
                ))}
              </div>
              <div className="clear-both" />
            </div>
          )
        })}
      </div>
    </section>
  )
}

// Bordered tile row of the core numbers, printed on the cover and the numerology part
function PrintNumberStrip({ chart }: { chart: NumerologyChart }) {
  const nums = [chart.lifePath, chart.expression, chart.soulUrge, chart.personality, chart.birthday, chart.personalYear]
  return (
    <div className="flex flex-wrap items-start justify-center gap-3">
      {nums.map((n) => (
        <div key={n.key} className="w-[19mm] text-center">
          <div className="mx-auto grid h-[14mm] w-[14mm] place-items-center rounded-xl border-2 border-[color:var(--gold-antique)] bg-[color:var(--paper-50,#f7f0e0)]">
            <span className="font-serif text-2xl text-[color:var(--sindoor)]">{n.value}</span>
          </div>
          <p className="mt-1 font-sans text-[0.55rem] font-bold uppercase tracking-wider text-[color:var(--ink-muted)]">{n.label}</p>
        </div>
      ))}
    </div>
  )
}

// Full print-only document: cover, table of contents, all three readings.
// Rendered through a portal so the rest of the app can be hidden while printing.
export function PrintDocument({ input, chart, reading }: { input: ReadingInput; chart: NumerologyChart; reading: FullReading }) {
  useEffect(() => {
    document.body.classList.add('has-print-doc')
    return () => document.body.classList.remove('has-print-doc')
  }, [])

  const toc = [
    { title: 'Palm Reading', items: reading.palm },
    { title: 'Numerology Reading', items: reading.numerology },
    { title: 'Combined Life Pattern', items: reading.combined },
  ].filter((part) => part.items.length > 0)

  const doc = (
    <div className="hidden text-[color:var(--ink)] [print-color-adjust:exact] [-webkit-print-color-adjust:exact] print:block">
      {/* Repeating footer ornament on every printed page */}
      <div className="fixed bottom-0 left-0 right-0 hidden items-center justify-between px-2 pb-2 text-[0.6rem] text-[color:var(--ink-muted)] print:flex">
        <span className="font-bengali text-[color:var(--sindoor)]">ভাগ্যলিখন</span>
        <span>Bhagyalikhon · a reflective reading</span>
      </div>

      {/* Cover */}
      <section className="page-break relative flex min-h-[86vh] flex-col items-center justify-center overflow-hidden border-[3px] border-double border-[color:var(--gold-antique)] bg-[color:var(--ivory)] p-10 text-center">
        <AlponaCorner className="absolute left-4 top-4" />
        <AlponaCorner className="absolute right-4 top-4 -scale-x-100" />
        <AlponaCorner className="absolute bottom-4 left-4 -scale-y-100" />
        <AlponaCorner className="absolute bottom-4 right-4 -scale-100" />
        <PrintBrandMark size={52} />
        <p className="mt-3 font-sans text-[0.7rem] font-bold uppercase tracking-[0.35em] text-[color:var(--sindoor)]">Bhagyalikhon</p>
        <p className="font-bengali mt-1 text-lg text-[color:var(--sindoor)]">ভাগ্যলিখন</p>
        <img
          src={asset('/art/palm-hand.png')}
          alt="An illustrated open palm and its lines"
          className="mt-6 h-[68mm] w-auto"
        />
        <h1 className="mt-6 font-serif text-4xl text-[color:var(--heading)]">{firstName(input.fullName)}’s Reading</h1>
        <p className="mt-3 font-report text-[color:var(--ink-soft)]">{input.fullName} · born {formatLongDate(input.dob)}</p>
        <PrintDivider className="my-6" width={320} />
        <p className="max-w-md font-report italic text-[color:var(--ink-soft)]">“Where your lines and numbers quietly reveal their pattern.”</p>
        <p className="mt-8 font-sans text-sm text-[color:var(--ink-muted)]">Life Path {chart.lifePath.value} · Expression {chart.expression.value} · Soul Urge {chart.soulUrge.value} · Personal Year {chart.personalYear.value}</p>
      </section>

      {/* Table of contents */}
      <section className="page-break pt-8">
        <h2 className="text-center font-serif text-2xl text-[color:var(--heading)]">Table of Contents</h2>
        <PrintDivider className="mt-3" width={240} />
        <div className="mx-auto mt-8 max-w-md space-y-5">
          {toc.map((part) => (
            <div key={part.title}>
              <p className="font-serif text-lg text-[color:var(--ritual)]">{part.title}</p>
              <ul className="mt-1 columns-2 gap-6 font-report text-sm text-[color:var(--ink-soft)]">
                {part.items.map((s) => (
                  <li key={s.id}>{s.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <AlponaMandala size={90} />
        </div>
        <div className="mt-8">
          <PrintNumberStrip chart={chart} />
        </div>
      </section>

      {toc.map((part) => (
        <PrintPart key={part.title} title={part.title} sections={part.items} />
      ))}
    </div>
  )

  return createPortal(doc, document.body)
}
