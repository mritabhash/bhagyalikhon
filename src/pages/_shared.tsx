import type { ReactNode } from 'react'
import { Reveal, Kicker, RevealText } from '../components/ui'
import { AlponaDivider } from '../components/ornaments'
import { cn } from '../lib/utils'

export function PageHero({
  kicker,
  title,
  intro,
  children,
  divider = true,
}: {
  kicker: string
  title: string
  intro?: string
  children?: ReactNode
  divider?: boolean
}) {
  return (
    <section className="container-page pt-32 pb-8 text-center sm:pt-40">
      <Reveal><Kicker className="justify-center">{kicker}</Kicker></Reveal>
      <RevealText as="h1" text={title} className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] text-heading sm:text-6xl" />
      {intro && (
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-report text-lg leading-relaxed text-ink-soft">{intro}</p>
        </Reveal>
      )}
      {children && <Reveal delay={0.18} className="mt-8">{children}</Reveal>}
      {divider && <AlponaDivider className="mt-12" />}
    </section>
  )
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('report-prose mx-auto max-w-prose2', className)}>{children}</div>
}

export function LegalShell({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="min-h-screen pb-10">
      <PageHero kicker="Bhagyalikhon" title={title} intro={`Last updated ${updated}. Written to be calm, clear, and human.`} />
      <div className="container-page">
        <div className="mx-auto max-w-prose2 space-y-5 font-report leading-relaxed text-ink">{children}</div>
      </div>
    </div>
  )
}
